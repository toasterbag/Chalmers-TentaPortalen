export const useTheme = () => ({
  get: (name: string) =>
    window
      .getComputedStyle(document.querySelector("[theme]") as any)
      .getPropertyValue(`--${name}`),
  toggleLightMode: () => {},
});
