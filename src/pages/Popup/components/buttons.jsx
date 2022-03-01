import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';

export const BlueBtn = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(lightBlue[300]),
  backgroundColor: lightBlue[300],
  '&:hover': {
    backgroundColor: lightBlue[500],
    color: theme.palette.getContrastText(lightBlue[500]),
  },
  borderRadius: 0,
  padding: '8px 24px',
  width: '100%',
}));

export const MenuBtnBlue = styled(Button)(() => ({
  color: lightBlue[300],
  backgroundColor: 'var(--grey)',
  '&:hover': {
    backgroundColor: '#212121',
  },
  borderRadius: 0,
  boxShadow: 'none',
  width: '100%',
  fontWeight: 500,
  textAlign: 'left',
  justifyContent: 'left',
  padding: '8px 32px',
  '& > span': {
    marginLeft: 'auto',
  },
}));
export const MenuOptn = styled(Button)(() => ({
  color: '#fff',
  backgroundColor: 'var(--grey)',
  '&:hover': {
    backgroundColor: '#212121',
  },
  borderRadius: 0,
  boxShadow: 'none',
  width: '100%',
  fontWeight: 500,
  textAlign: 'left',
  justifyContent: 'left',
  padding: '8px 32px',
  '&>*': {
    marginLeft: 'auto',
  },
}));
