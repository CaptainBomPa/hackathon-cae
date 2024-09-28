import { ToggleButton } from '@mui/material';
import { styled } from '@mui/system';

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#000000',
  },
}));

export default StyledToggleButton;
