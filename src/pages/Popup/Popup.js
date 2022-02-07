/* global chrome */
/* global farewell */
import React from 'react';
import { useState } from 'react';
import './Popup.css';
import { MenuOptn, MenuBtnBlue, BlueBtn } from './components'
import { lightBlue } from '@mui/material/colors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Logo from '../../assets/img/logo';

function Popup() {
  const [langScope, setLangScope] = useState(100)

  const clicked = () => {
    chrome.storage.sync.set({
      'LR_scope': langScope
    });
  }

  return (
    <div className="App">
      <Logo width="26px" m='12px 0 0 0' />
      <header>
        <h1><span style={{ color: lightBlue[300] }}>Lexi</span>Reader</h1>
      </header>

      <MenuOptn variant="contained">Detected Lanugage</MenuOptn>
      <MenuBtnBlue variant="contained" endIcon={<ChevronRightIcon />}>Language Select</MenuBtnBlue>

      <div className="sightword-variable btn">
        Top
        <input type="text" defaultValue={langScope} onChange={(e) => setLangScope(e.target.value)} />
        Words
      </div>
      <BlueBtn variant="contained" onClick={clicked}>Translate Page</BlueBtn>
    </div>

  );
}

export default Popup;
