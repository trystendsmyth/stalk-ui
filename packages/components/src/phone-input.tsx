import { forwardRef } from 'react'
import { defaultCountries, parseCountry, usePhoneInput } from 'react-international-phone'
import { css } from 'styled-system/css'

import { Input } from './input'
import { Select } from './select'

import type { InputSize } from './input'
import type { CSSProperties, InputHTMLAttributes } from 'react'
import type { CountryIso2 } from 'react-international-phone'

// Derive a flag emoji from the ISO-3166 alpha-2 code (regional indicator
// symbols) so we avoid bundling the library's image/CSS assets.
const flagEmoji = (iso2: string): string =>
  iso2.toUpperCase().replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)))

// Reset the Select trigger to a borderless flag+chevron control so it reads as
// one cell of the surrounding input rather than a nested bordered select. Inline
// so it reliably overrides the select recipe.
const triggerResetStyle: CSSProperties = {
  background: 'transparent',
  border: 'none',
  boxShadow: 'none',
  flex: '0 0 auto',
  height: 'auto',
  minWidth: 0,
  paddingInline: 0,
  width: 'auto',
}

// The trigger sits inside the input's inline padding; offset the dropdown back
// by that padding so its left edge lines up with the input's border.
const triggerInsetBySize: Record<InputSize, number> = { sm: 12, md: 16, lg: 20 }

const triggerClass = css({ flexShrink: '0', gap: '4' })
const flagClass = css({ fontSize: 'lg', lineHeight: '1' })
const dividerClass = css({
  alignSelf: 'stretch',
  bgColor: 'border.default',
  flexShrink: '0',
  width: '1px',
})

export interface PhoneInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'size'
> {
  /** Phone value in E.164 format (controlled). */
  value?: string
  /** Initial country (ISO alpha-2), used until a number implies another. */
  defaultCountry?: CountryIso2
  /** Called with the E.164 phone string on every change. */
  onChange?: (phone: string) => void
  /** Accessible label for the country selector. */
  countryLabel?: string
  size?: InputSize
  invalid?: boolean
}

export const PhoneInput = /* @__PURE__ */ forwardRef<HTMLInputElement, PhoneInputProps>(
  function PhoneInput(
    {
      className,
      countryLabel = 'Country',
      defaultCountry = 'us',
      disabled = false,
      invalid = false,
      onChange,
      size = 'md',
      value,
      ...fieldProps
    },
    ref,
  ) {
    // Pass `value` only when controlled; otherwise the hook manages its own
    // state (and a constant `''` would freeze an uncontrolled field).
    const { inputValue, country, setCountry, handlePhoneValueChange, inputRef } = usePhoneInput({
      countries: defaultCountries,
      defaultCountry,
      onChange: (data) => onChange?.(data.phone),
      ...(value === undefined ? {} : { value }),
    })

    const setRefs = (node: HTMLInputElement | null) => {
      inputRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref !== null) {
        ref.current = node
      }
    }

    return (
      <Input.Root className={className} disabled={disabled} invalid={invalid} size={size}>
        <Select.Root
          disabled={disabled}
          value={country.iso2}
          onValueChange={(iso2) => {
            setCountry(iso2)
          }}
        >
          <Select.Trigger
            aria-label={countryLabel}
            size={size}
            className={triggerClass}
            style={triggerResetStyle}
          >
            <span aria-hidden className={flagClass}>
              {flagEmoji(country.iso2)}
            </span>
          </Select.Trigger>
          <Select.Content
            align="start"
            alignOffset={-triggerInsetBySize[size]}
            style={{ minWidth: '16rem' }}
          >
            {defaultCountries.map((countryData) => {
              const parsed = parseCountry(countryData)
              return (
                <Select.Item
                  key={parsed.iso2}
                  value={parsed.iso2}
                  endContent={`+${parsed.dialCode}`}
                >
                  <span aria-hidden className={flagClass}>
                    {flagEmoji(parsed.iso2)}
                  </span>{' '}
                  {parsed.name}
                </Select.Item>
              )
            })}
          </Select.Content>
        </Select.Root>
        <span aria-hidden className={dividerClass} />
        <Input.Field
          ref={setRefs}
          type="tel"
          value={inputValue}
          onChange={handlePhoneValueChange}
          {...fieldProps}
        />
      </Input.Root>
    )
  },
)
