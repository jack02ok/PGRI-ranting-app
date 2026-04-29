import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
              "inverse-on-surface": "#f3f0f0",
              "surface": "#fbf9f8",
              "on-secondary-fixed": "#1c1b1b",
              "primary-container": "#cc0000",
              "surface-tint": "#c00000",
              "on-secondary-fixed-variant": "#474746",
              "surface-variant": "#e4e2e1",
              "secondary-fixed-dim": "#c8c6c5",
              "surface-container-highest": "#e4e2e1",
              "on-primary": "#ffffff",
              "surface-container": "#f0eded",
              "tertiary-fixed-dim": "#c6c6c7",
              "on-error-container": "#93000a",
              "on-tertiary-fixed": "#1a1c1c",
              "secondary-fixed": "#e5e2e1",
              "on-tertiary-container": "#e2e3e3",
              "surface-dim": "#dcd9d9",
              "on-tertiary": "#ffffff",
              "on-surface": "#1b1c1c",
              "on-surface-variant": "#5e3f3a",
              "tertiary-fixed": "#e2e2e2",
              "tertiary": "#4b4d4d",
              "outline-variant": "#e8bdb6",
              "tertiary-container": "#636565",
              "secondary": "#5f5e5e",
              "on-secondary-container": "#636262",
              "error-container": "#ffdad6",
              "inverse-primary": "#ffb4a8",
              "surface-container-low": "#f6f3f2",
              "on-background": "#1b1c1c",
              "on-primary-fixed": "#410000",
              "inverse-surface": "#303030",
              "secondary-container": "#e2dfde",
              "primary": "#9e0000",
              "surface-bright": "#fbf9f8",
              "on-primary-fixed-variant": "#930000",
              "on-secondary": "#ffffff",
              "surface-container-high": "#eae8e7",
              "primary-fixed": "#ffdad4",
              "error": "#ba1a1a",
              "primary-fixed-dim": "#ffb4a8",
              "outline": "#926e69",
              "on-error": "#ffffff",
              "on-primary-container": "#ffdad4",
              "surface-container-lowest": "#ffffff",
              "background": "#fbf9f8",
              "on-tertiary-fixed-variant": "#454747"
      },
      "borderRadius": {
              "DEFAULT": "0.125rem",
              "lg": "0.25rem",
              "xl": "0.5rem",
              "full": "0.75rem"
      },
      "spacing": {
              "lg": "24px",
              "gutter": "24px",
              "unit": "4px",
              "container-max": "1280px",
              "md": "16px",
              "sm": "8px",
              "xs": "4px",
              "xl": "48px"
      },
      "fontFamily": {
              "headline-lg": ["Public Sans", "sans-serif"],
              "label-md": ["Inter", "sans-serif"],
              "body-lg": ["Inter", "sans-serif"],
              "body-md": ["Inter", "sans-serif"],
              "headline-xl": ["Public Sans", "sans-serif"],
              "headline-md": ["Public Sans", "sans-serif"],
              "caption": ["Inter", "sans-serif"]
      },
      "fontSize": {
              "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
              "label-md": ["14px", {"lineHeight": "20px", "fontWeight": "600"}],
              "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
              "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
              "headline-xl": ["40px", {"lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
              "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
              "caption": ["12px", {"lineHeight": "16px", "fontWeight": "400"}]
      }
    },
  },
  plugins: [
    forms,
    containerQueries,
  ],
}