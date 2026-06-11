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

export interface ComboboxProps {
  options: ComboboxOption[]
  /** Selected option value (controlled). */
  value?: string | undefined
  onChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  size?: ButtonSize
  className?: string
  'aria-label'?: string
}

export const Combobox = /* @__PURE__ */ forwardRef<HTMLButtonElement, ComboboxProps>(
  function Combobox(
    {
      options,
      value,
      onChange,
      placeholder = 'Select an option…',
      searchPlaceholder = 'Search…',
      emptyText = 'No results found.',
      disabled = false,
      size = 'md',
      className,
      'aria-label': ariaLabel,
    },
    ref,
  ) {
    const [open, setOpen] = useState(false)
    const selected = options.find((option) => option.value === value)

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
            <span className={styles.value}>{selected ? selected.label : placeholder}</span>
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
                      onChange?.(option.value)
                      setOpen(false)
                    }}
                  >
                    {option.label}
                    {option.value === value ? (
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
