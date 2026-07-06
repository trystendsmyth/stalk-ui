import { Check, ChevronsUpDown } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { cx } from 'styled-system/css'
import { combobox as comboboxRecipe } from 'styled-system/recipes'

import { Button } from './button'
import { Command } from './command'
import { Popover } from './popover'

import type { ButtonSize } from './button'

const styles = /* @__PURE__ */ comboboxRecipe()

export interface ComboboxOption {
  label: string
  value: string
  disabled?: boolean
}

interface ComboboxBaseProps {
  options: ComboboxOption[]
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  size?: ButtonSize
  className?: string
  'aria-label'?: string
}

export interface ComboboxSingleProps extends ComboboxBaseProps {
  multiple?: false
  /** Selected option value (controlled). */
  value?: string | undefined
  onChange?: (value: string) => void
}

export interface ComboboxMultipleProps extends ComboboxBaseProps {
  /** Select many: toggling keeps the list open; the trigger summarizes. */
  multiple: true
  /** Selected option values (controlled). */
  value?: readonly string[] | undefined
  onChange?: (value: string[]) => void
  /** Labels shown verbatim before collapsing to "+n" (default 2). */
  maxDisplayed?: number
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps

const summarize = (
  options: ComboboxOption[],
  selected: readonly string[],
  maxDisplayed: number,
) => {
  const labels = options
    .filter((option) => selected.includes(option.value))
    .map((option) => option.label)

  if (labels.length <= maxDisplayed) {
    return labels.join(', ')
  }

  return `${labels.slice(0, maxDisplayed).join(', ')} +${String(labels.length - maxDisplayed)}`
}

export const Combobox = /* @__PURE__ */ forwardRef<HTMLButtonElement, ComboboxProps>(
  function Combobox(props, ref) {
    const {
      options,
      placeholder = props.multiple === true ? 'Select options…' : 'Select an option…',
      searchPlaceholder = 'Search…',
      emptyText = 'No results found.',
      disabled = false,
      size = 'md',
      className,
      'aria-label': ariaLabel,
    } = props
    const [open, setOpen] = useState(false)

    const selectedValues: readonly string[] =
      props.multiple === true ? (props.value ?? []) : props.value === undefined ? [] : [props.value]
    const isSelected = (value: string) => selectedValues.includes(value)

    const triggerLabel =
      props.multiple === true
        ? selectedValues.length > 0
          ? summarize(options, selectedValues, props.maxDisplayed ?? 2)
          : placeholder
        : (options.find((option) => option.value === props.value)?.label ?? placeholder)

    const handleSelect = (value: string) => {
      if (props.multiple === true) {
        const next = isSelected(value)
          ? selectedValues.filter((existing) => existing !== value)
          : [...selectedValues, value]
        props.onChange?.([...next])
        return
      }

      props.onChange?.(value)
      setOpen(false)
    }

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Button
            ref={ref}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-label={ariaLabel}
            variant="outline"
            size={size}
            disabled={disabled}
            className={cx(styles.trigger, className)}
          >
            <span className={styles.value}>{triggerLabel}</span>
            <ChevronsUpDown size={16} className={styles.icon} aria-hidden />
          </Button>
        </Popover.Trigger>
        <Popover.Content className={styles.content}>
          <Command>
            <Command.Input aria-label={searchPlaceholder} placeholder={searchPlaceholder} />
            <Command.List>
              <Command.Empty>{emptyText}</Command.Empty>
              <Command.Group>
                {options.map((option) => (
                  <Command.Item
                    key={option.value}
                    value={option.value}
                    keywords={[option.label]}
                    disabled={option.disabled ?? false}
                    onSelect={() => {
                      handleSelect(option.value)
                    }}
                  >
                    {option.label}
                    {isSelected(option.value) ? (
                      <Check size={16} className={styles.itemIndicator} aria-hidden />
                    ) : null}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </Popover.Content>
      </Popover.Root>
    )
  },
)
