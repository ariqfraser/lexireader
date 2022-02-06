/* global chrome */
import React from 'react';
import './Popup.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const BlueBtn = styled(Button)(({ theme }) => ({
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

const MenuBtnBlue = styled(Button)(() => ({
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
    marginLeft: 'auto'
  }
}));
const MenuOptn = styled(Button)(() => ({
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
    marginLeft: 'auto'
  }
}));

const clicked = () => {

}

function Popup() {
  return (
    <div className="App">
      <header>
        <h1><span style={{ color: lightBlue[300] }}>Lexi</span>Reader</h1>
      </header>

      <MenuOptn variant="contained">Detected Lanugage</MenuOptn>
      <MenuBtnBlue variant="contained" endIcon={<ChevronRightIcon />}>Language Select</MenuBtnBlue>

      <div className="sightword-variable btn">
        Top
        <input type="text" defaultValue={100}></input>
        Words
      </div>
      <BlueBtn variant="contained" onClick={clicked}>Translate Page</BlueBtn>
    </div>

  );
}

export default Popup;
