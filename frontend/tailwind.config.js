/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // used https://material-foundation.github.io/material-theme-builder/ to have access to same colors set primary color match to #ffb3b1
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ffb3b1',
          on: '#571d1f',
        },
        secondary: {
          DEFAULT: '#e6bdbb',
          on: '#442929',
        },
        surface: {
          DEFAULT: '#1a1111',
          on: '#f0dedd',
          container: {
            DEFAULT: '#271d1d',
            highest: {
              DEFAULT: '#3d3232',
            },
          },
        },
        tertiary: {
          DEFAULT: '#e4c18d',
          on: '#412d05',
        },
        // #region 12 months colors
        lapis: {
          DEFAULT: '#2832c2',
        },
        blue: {
          DEFAULT: '#3944bc',
        },
        parakeet: {
          DEFAULT: '#03c04a',
        },
        shamrock: {
          DEFAULT: '#03ac13',
        },
        green: {
          DEFAULT: '#3cb043',
        },
        macaroon: {
          DEFAULT: '#f9e076',
        },
        granola: {
          DEFAULT: '#d6b85a',
        },
        indianYellow: {
          DEFAULT: '#e3a857',
        },
        sandstone: {
          DEFAULT: '#d67229',
        },
        squash: {
          DEFAULT: '#c95b0c',
        },
        spice: {
          DEFAULT: '#7a3803',
        },
        azure: {
          DEFAULT: '#1520a6',
        },
        // #endregion
      }
    },
  },
  plugins: [],
}

