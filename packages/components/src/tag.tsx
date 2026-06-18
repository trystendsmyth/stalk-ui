import { createStyleContext } from '@stalk-ui/utils'
import { X } from 'lucide-react'
import { createContext, forwardRef, useContext, useMemo } from 'react'
import { css, cx } from 'styled-system/css'
import { tag as tagRecipe } from 'styled-system/recipes'

import type { Tone } from './tones'
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react'

export type TagSize = (typeof tagRecipe.variantMap.size)[number]
export type TagVariant = (typeof tagRecipe.variantMap.variant)[number]
export type TagRadius = (typeof tagRecipe.variantMap.radius)[number]
export type TagTone = Tone

const { StyleProvider, useSlotStyles, withContext } = /* @__PURE__ */ createStyleContext(
  tagRecipe,
  {
    name: 'Tag',
  },
)

// Behavioural context (separate from the slot-style context) so `Tag.Close`
// inherits the root's `onClose`/`closeAriaLabel`/`disabled` without prop drilling.
interface TagContextValue {
  closeAriaLabel: string
  disabled: boolean
  onClose: ((event: ReactMouseEvent<HTMLButtonElement>) => void) | undefined
}

const TagContext = /* @__PURE__ */ createContext<TagContextValue | null>(null)

const useTagContext = (): TagContextValue => {
  const ctx = useContext(TagContext)
  if (ctx === null) {
    throw new Error('Tag subcomponents must be rendered inside <Tag> (TagRoot).')
  }
  return ctx
}

export interface TagRootProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  /** Render a small leading dot in the palette's solid color. */
  dot?: boolean
  /** Disable interaction (click + close) and dim the chip. */
  disabled?: boolean
  /** Make the whole chip focusable/clickable with keyboard activation. */
  onClick?: (event: ReactMouseEvent<HTMLSpanElement>) => void
  /** Inherited by `Tag.Close`; called when the close button is activated. */
  onClose?: (event: ReactMouseEvent<HTMLButtonElement>) => void
  /** Accessible label for `Tag.Close`. Defaults to `Remove`. */
  closeAriaLabel?: string
  radius?: TagRadius
  size?: TagSize
  /** Selects the semantic color palette. Defaults to `accent`. */
  tone?: TagTone
  variant?: TagVariant
}

export const TagRoot = /* @__PURE__ */ forwardRef<HTMLSpanElement, TagRootProps>(function TagRoot(
  {
    children,
    className,
    closeAriaLabel = 'Remove',
    disabled = false,
    dot = false,
    onClick,
    onClose,
    onKeyDown,
    radius = 'full',
    size = 'md',
    tone = 'accent',
    variant = 'subtle',
    ...props
  },
  ref,
) {
  const interactive = onClick !== undefined && !disabled
  const styles = useMemo(
    () => tagRecipe({ disabled, dot, interactive, radius, size, variant }),
    [disabled, dot, interactive, radius, size, variant],
  )
  const ctx = useMemo<TagContextValue>(
    () => ({ closeAriaLabel, disabled, onClose }),
    [closeAriaLabel, disabled, onClose],
  )

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLSpanElement>) => {
    onKeyDown?.(event)
    // `interactive` is only true when `onClick` is defined (aliased condition).
    if (!interactive || event.defaultPrevented) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick(event as unknown as ReactMouseEvent<HTMLSpanElement>)
    }
  }

  const interactiveProps = interactive
    ? ({
        role: 'button',
        tabIndex: 0,
        onClick,
        onKeyDown: handleKeyDown,
      } as const)
    : {}

  return (
    <StyleProvider value={styles}>
      <TagContext.Provider value={ctx}>
        <span
          ref={ref}
          className={cx(styles.root, css({ colorPalette: tone }), className)}
          data-disabled={disabled ? '' : undefined}
          {...interactiveProps}
          {...props}
        >
          {children}
        </span>
      </TagContext.Provider>
    </StyleProvider>
  )
})

export interface TagAvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Image source; renders an `<img>` filling the avatar slot. */
  src?: string
  /** Alt text for the image (decorative by default). */
  alt?: string
  imgProps?: ImgHTMLAttributes<HTMLImageElement>
  /** Fallback content (e.g. initials) shown when no `src` is provided. */
  children?: ReactNode
}

export const TagAvatar = /* @__PURE__ */ forwardRef<HTMLSpanElement, TagAvatarProps>(
  function TagAvatar({ alt = '', className, imgProps, src, children, ...props }, ref) {
    const styles = useSlotStyles()
    return (
      <span ref={ref} className={cx(styles.avatar, className)} {...props}>
        {src ? <img alt={alt} src={src} {...imgProps} /> : children}
      </span>
    )
  },
)

export const TagIcon = /* @__PURE__ */ forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function TagIcon({ className, ...props }, ref) {
    const styles = useSlotStyles()
    return <span ref={ref} aria-hidden="true" className={cx(styles.icon, className)} {...props} />
  },
)

export const TagLabel = /* @__PURE__ */ withContext('span', 'label')

export const TagCount = /* @__PURE__ */ withContext('span', 'count')

export type TagCloseProps = ButtonHTMLAttributes<HTMLButtonElement>

export const TagClose = /* @__PURE__ */ forwardRef<HTMLButtonElement, TagCloseProps>(
  function TagClose(
    { 'aria-label': ariaLabel, className, disabled, onClick, type = 'button', ...props },
    ref,
  ) {
    const styles = useSlotStyles()
    const { closeAriaLabel, disabled: rootDisabled, onClose } = useTagContext()
    return (
      <button
        ref={ref}
        aria-label={ariaLabel ?? closeAriaLabel}
        className={cx(styles.close, className)}
        disabled={disabled ?? rootDisabled}
        type={type}
        onClick={(event) => {
          // Don't bubble to an interactive root (clickable chip).
          event.stopPropagation()
          onClick?.(event)
          onClose?.(event)
        }}
        {...props}
      >
        <X aria-hidden="true" />
      </button>
    )
  },
)

export const Tag = /* @__PURE__ */ Object.assign(TagRoot, {
  Avatar: TagAvatar,
  Close: TagClose,
  Count: TagCount,
  Icon: TagIcon,
  Label: TagLabel,
  Root: TagRoot,
})
