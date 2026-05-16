import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { avatar as avatarRecipe } from 'styled-system/recipes'

import type { Tone } from './tones'
import type { ComponentPropsWithoutRef, ComponentRef, ReactNode } from 'react'

export type AvatarSize = (typeof avatarRecipe.variantMap.size)[number]
export type AvatarRadius = (typeof avatarRecipe.variantMap.radius)[number]
export type AvatarTone = Tone

export interface AvatarRootProps extends Omit<
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
  'color'
> {
  radius?: AvatarRadius
  size?: AvatarSize
  /** Selects the semantic color palette used as the fallback background. */
  tone?: AvatarTone
}

export const AvatarRoot = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof AvatarPrimitive.Root>,
  AvatarRootProps
>(function AvatarRoot({ className, radius = 'full', size = 'md', tone = 'accent', ...props }, ref) {
  const styles = avatarRecipe({ radius, size })
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cx(styles.root, css({ colorPalette: tone }), className)}
      {...props}
    />
  )
})

export type AvatarImageProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>

export const AvatarImage = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(function AvatarImage({ className, ...props }, ref) {
  const styles = avatarRecipe()
  return <AvatarPrimitive.Image ref={ref} className={cx(styles.image, className)} {...props} />
})

export interface AvatarFallbackProps extends ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Fallback
> {
  /** Match the size on the parent `AvatarRoot` so fallback text scales correctly. */
  size?: AvatarSize
}

export const AvatarFallback = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(function AvatarFallback({ className, size = 'md', ...props }, ref) {
  const styles = avatarRecipe({ size })
  return (
    <AvatarPrimitive.Fallback ref={ref} className={cx(styles.fallback, className)} {...props} />
  )
})

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  const first = parts[0] ?? ''
  const last = parts[parts.length - 1] ?? ''
  if (parts.length === 1) return first.slice(0, 2)
  return `${first[0] ?? ''}${last[0] ?? ''}`
}

export interface AvatarProps extends AvatarRootProps {
  /** Image source. When omitted or fails to load, falls back to initials / `fallback`. */
  src?: string
  /** Alt text for the image; also used to derive initials when `name` is not set. */
  alt?: string
  /** Name used to derive 2-letter initials. Falls back to `alt`. */
  name?: string
  /** Custom fallback content (icon, custom initials, etc.). Overrides derived initials. */
  fallback?: ReactNode
  /** Delay (ms) before showing the fallback while the image loads. Defaults to 600. */
  fallbackDelay?: number
  /** Native `loading` attribute on the underlying image. */
  loading?: 'eager' | 'lazy'
  /** Called when the image's loading state changes. */
  onLoadingStatusChange?: AvatarImageProps['onLoadingStatusChange']
}

export const Avatar = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(function Avatar(
  {
    alt,
    className,
    fallback,
    fallbackDelay = 600,
    loading,
    name,
    onLoadingStatusChange,
    radius = 'full',
    size = 'md',
    src,
    tone = 'accent',
    ...rootProps
  },
  ref,
) {
  const styles = avatarRecipe({ radius, size })
  const initialsSource = name ?? alt ?? ''
  const derivedInitials = initialsSource ? getInitials(initialsSource) : ''
  const fallbackContent = fallback ?? derivedInitials

  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cx(styles.root, css({ colorPalette: tone }), className)}
      {...rootProps}
    >
      {src ? (
        <>
          <AvatarPrimitive.Image
            alt={alt ?? name ?? ''}
            className={styles.image}
            src={src}
            {...(loading !== undefined ? { loading } : {})}
            {...(onLoadingStatusChange ? { onLoadingStatusChange } : {})}
          />
          <AvatarPrimitive.Fallback className={styles.fallback} delayMs={fallbackDelay}>
            {fallbackContent}
          </AvatarPrimitive.Fallback>
        </>
      ) : (
        <span className={styles.fallback}>{fallbackContent}</span>
      )}
    </AvatarPrimitive.Root>
  )
})
