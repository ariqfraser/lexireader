/* global chrome */
import React from 'react';
import { useState } from 'react';
import './Panel.css';

const Panel: React.FC = () => {

  const [lang, setLang] = useState('')
  const [scope, setScope] = useState('')
  const updateStorage = () => {
    chrome.storage.sync.set({
      'LR_lang': lang
    });
  }

  const getScope = () => {
    console.log('trying to get key...')
    // chrome.storage.sync.get('LR_scope', function (result) {
    //   setScope(JSON.stringify(result))
    //   return JSON.stringify(result)
    // });
  }

  getScope

  return (
    <div className="container">
      <h1>Dev Tools Panel</h1>
      <input type="text" name="lang" id="LR_lang" onChange={(e) => setLang(e.target.value)} />
      <button id="btn" onClick={updateStorage}>change lang</button>
      <br />
      <h2>{scope}</h2><button>Get scope</button>
    </div>
  );
};

export default Panel;
