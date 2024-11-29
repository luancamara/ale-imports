import type { Components, Theme } from '@mui/material/styles'

import { accordionClasses } from '@mui/material/Accordion'
import { accordionSummaryClasses } from '@mui/material/AccordionSummary'
import { typographyClasses } from '@mui/material/Typography'

// ----------------------------------------------------------------------

const MuiAccordion: Components<Theme>['MuiAccordion'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    root: ({ theme }) => ({
      [`&.${accordionClasses.disabled}`]: { backgroundColor: 'transparent' },
      [`&.${accordionClasses.expanded}`]: {
        backgroundColor: (theme.vars || theme).palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.customShadows.z8
      },
      backgroundColor: 'transparent'
    })
  }
}

// ----------------------------------------------------------------------

const MuiAccordionSummary: Components<Theme>['MuiAccordionSummary'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    expandIconWrapper: { color: 'inherit' },
    root: ({ theme }) => ({
      [`&.${accordionSummaryClasses.disabled}`]: {
        [`& .${typographyClasses.root}`]: { color: 'inherit' },
        color: (theme.vars || theme).palette.action.disabled,
        opacity: 1
      },
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    })
  }
}

// ----------------------------------------------------------------------

export const accordion = { MuiAccordion, MuiAccordionSummary }
