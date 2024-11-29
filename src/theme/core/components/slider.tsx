import type { Components, Theme } from '@mui/material/styles'

import { sliderClasses } from '@mui/material/Slider'

import { stylesMode, varAlpha } from '../../styles'

// ----------------------------------------------------------------------

declare module '@mui/material/Slider' {
  interface SliderPropsColorOverrides {
    inherit: true
  }
}

// ----------------------------------------------------------------------

const SIZE = {
  mark: { medium: 6, small: 4 },
  rail: { medium: 10, small: 6 },
  thumb: { medium: 20, small: 16 }
}

const MuiSlider: Components<Theme>['MuiSlider'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: { size: 'small' },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    mark: ({ theme }) => ({
      '&[data-index="0"]': { display: 'none' },
      backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.48),
      height: SIZE.mark.medium,
      width: 1
    }),
    markActive: ({ theme }) => ({
      backgroundColor: varAlpha((theme.vars || theme).palette.common.whiteChannel, 0.64)
    }),
    markLabel: ({ theme }) => ({
      color: (theme.vars || theme).palette.text.disabled,
      fontSize: theme.typography.pxToRem(13)
    }),
    rail: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.grey[500],
      height: SIZE.rail.medium,
      opacity: 0.12
    }),
    root: ({ theme }) => ({
      [`& .${sliderClasses.thumb}`]: {
        '&::before': {
          backgroundImage: `linear-gradient(180deg, ${(theme.vars || theme).palette.grey[500]} 0%, ${varAlpha(
            (theme.vars || theme).palette.grey['500Channel'],
            0
          )} 100%)`,
          boxShadow: 'none',
          height: 'calc(100% - 4px)',
          opacity: 0.4,
          [stylesMode.dark]: { opacity: 0.8 },
          width: 'calc(100% - 4px)'
        },
        borderColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.08),
        borderStyle: 'solid',
        borderWidth: 1,
        boxShadow: theme.customShadows.z1,
        color: (theme.vars || theme).palette.common.white,
        height: SIZE.thumb.medium,
        width: SIZE.thumb.medium
      },

      variants: [
        /**
         * @color inherit
         */
        {
          props: ({ ownerState }) => ownerState.color === 'inherit',
          style: ({
            [`& .${sliderClasses.markActive}`]: {
              [stylesMode.dark]: {
                backgroundColor: varAlpha((theme.vars || theme).palette.grey['800Channel'], 0.48)
              }
            }
          })
        },
        /**
         * @state disabled
         */
        {
          props: ({ ownerState }) => !!ownerState.disabled,
          style: ({
            [`&.${sliderClasses.disabled}`]: {
              color: varAlpha(
                (theme.vars || theme).palette.grey['500Channel'],
                (theme.vars || theme).palette.action.disabledOpacity
              )
            }
          })
        }
      ]
    }),
    sizeSmall: {
      [`& .${sliderClasses.mark}`]: { height: SIZE.mark.small },
      [`& .${sliderClasses.rail}`]: { height: SIZE.rail.small },
      [`& .${sliderClasses.thumb}`]: { height: SIZE.thumb.small, width: SIZE.thumb.small },
      [`& .${sliderClasses.track}`]: { height: SIZE.rail.small }
    },
    track: { height: SIZE.rail.medium },
    valueLabel: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.grey[800],
      borderRadius: 8,
      [stylesMode.dark]: { backgroundColor: (theme.vars || theme).palette.grey[700] }
    })
  }
}

// ----------------------------------------------------------------------

export const slider = {
  MuiSlider
}
