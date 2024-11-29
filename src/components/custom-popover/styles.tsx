import type { PopoverArrow } from './types'

import { stylesMode, varAlpha } from '@/theme/styles'

import { styled } from '@mui/material/styles'
// ----------------------------------------------------------------------

export const StyledArrow = styled('span', {
  shouldForwardProp: prop => prop !== 'size' && prop !== 'placement' && prop !== 'offset'
})<PopoverArrow>(({
  theme,
  size = 0,
  offset = 0
}) => {
  const POSITION = -(size / 2) + 0.5

  const alignmentStyles = {
    bottom: { bottom: POSITION, transform: 'rotate(-45deg)' },
    hCenter: { left: 0, margin: 'auto', right: 0 },
    left: { left: POSITION, transform: 'rotate(45deg)' },
    right: { right: POSITION, transform: 'rotate(-135deg)' },
    top: { top: POSITION, transform: 'rotate(135deg)' },
    vCenter: { bottom: 0, margin: 'auto', top: 0 }
  }

  const backgroundStyles = (color: 'cyan' | 'red') => ({
    backgroundImage: `url(${'base-url'}/assets/${color}-blur.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${size * 3}px ${size * 3}px`,
    ...(color === 'cyan' && {
      backgroundPosition: 'top right'
    }),
    ...(color === 'red' && {
      backgroundPosition: 'bottom left'
    })
  })

  return {
    backdropFilter: '6px',
    backgroundColor: (theme.vars || theme).palette.background.paper,
    border: `solid 1px ${varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.12)}`,
    borderBottomLeftRadius: size / 4,
    clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
    height: size,
    position: 'absolute',

    [stylesMode.dark]: {
      border: `solid 1px ${varAlpha((theme.vars || theme).palette.common.blackChannel, 0.12)}`
    },

    width: size,

    variants: [{
      props: {
        placement: 'top-left'
      },

      style: {
        ...alignmentStyles.top,
        left: offset
      }
    }, {
      props: {
        placement: 'top-center'
      },

      style: {
        ...alignmentStyles.top,
        ...alignmentStyles.hCenter
      }
    }, {
      props: {
        placement: 'top-right'
      },

      style: {
        ...backgroundStyles('cyan'),
        ...alignmentStyles.top,
        right: offset
      }
    }, {
      props: {
        placement: 'bottom-left'
      },

      style: {
        ...backgroundStyles('red'),
        ...alignmentStyles.bottom,
        left: offset
      }
    }, {
      props: {
        placement: 'bottom-center'
      },

      style: {
        ...alignmentStyles.bottom,
        ...alignmentStyles.hCenter
      }
    }, {
      props: {
        placement: 'bottom-right'
      },

      style: {
        ...alignmentStyles.bottom,
        right: offset
      }
    }, {
      props: {
        placement: 'left-top'
      },

      style: {
        ...alignmentStyles.left,
        top: offset
      }
    }, {
      props: {
        placement: 'left-center'
      },

      style: {
        ...backgroundStyles('red'),
        ...alignmentStyles.left,
        ...alignmentStyles.vCenter
      }
    }, {
      props: {
        placement: 'left-bottom'
      },

      style: {
        ...backgroundStyles('red'),
        ...alignmentStyles.left,
        bottom: offset
      }
    }, {
      props: {
        placement: 'right-top'
      },

      style: {
        ...backgroundStyles('cyan'),
        ...alignmentStyles.right,
        top: offset
      }
    }, {
      props: {
        placement: 'right-center'
      },

      style: {
        ...backgroundStyles('cyan'),
        ...alignmentStyles.right,
        ...alignmentStyles.vCenter
      }
    }, {
      props: {
        placement: 'right-bottom'
      },

      style: {
        ...alignmentStyles.right,
        bottom: offset
      }
    }]
  }
})
