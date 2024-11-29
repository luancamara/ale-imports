import type { SxProps, Theme } from '@mui/material/styles'

import { Iconify } from '@/components/iconify'

import { varAlpha } from '@/theme/styles'

import ButtonBase from '@mui/material/ButtonBase'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'

import { CustomPopover, usePopover } from '../custom-popover'

// ----------------------------------------------------------------------

interface Props {
  onChange: (newValue: string) => void,
  options: string[],
  slotProps?: {
    button?: SxProps<Theme>,
    popover?: SxProps<Theme>
  },
  value: string
}

export function ChartSelect({ onChange, options, slotProps, value, ...other }: Props) {
  const popover = usePopover()

  return (
    <>
      <ButtonBase
        onClick={popover.onOpen}
        sx={{
          border: theme => `solid 1px ${varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.24)}`,
          borderRadius: 1,
          gap: 1.5,
          height: 34,
          pl: 1.5,
          pr: 1,
          typography: 'subtitle2',
          ...slotProps?.button
        }}
        {...other}
      >
        {value}

        <Iconify
          icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
          width={16}
        />
      </ButtonBase>
      <CustomPopover anchorEl={popover.anchorEl} onClose={popover.onClose} open={popover.open}>
        <MenuList sx={slotProps?.popover}>
          {options.map(option => (
            <MenuItem
              key={option}
              onClick={() => {
                popover.onClose()
                onChange(option)
              }}
              selected={option === value}
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  )
}
