// Intentionally empty. `AspectRatio` is recipe-free: the ratio is a runtime value
// (set inline) and the static frame is authored with `css()` in the component.
// A recipe named `aspectRatio` would collide with PandaCSS's built-in
// `aspectRatio` *pattern*, so this slot is left unregistered (not re-exported
// from `recipes/index.ts`). See registry/ui/aspect-ratio.ts (`recipes: []`).
export {}
