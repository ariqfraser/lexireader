/* global chrome */
import React from 'react';
import { useState } from 'react';
import './Panel.css';
const axios = require('axios');

const Panel: React.FC = () => {
  const [devLog, setDevLog] = useState('aaa')
  const [syncLang, setSyncLang] = useState('')
  const [syncScope, setSyncScope] = useState('')
  const [axiosStatus, setAxiosStatus] = useState()

  const getScope = () => {
    setDevLog('Getting scope...')
    chrome.storage.sync.get('LR_scope', function (result) {
      setSyncScope(JSON.stringify(result))
      setDevLog(JSON.stringify(result))
    });
  }

  const getLang = () => {
    setDevLog('Getting lang...')
    chrome.storage.sync.get('LR_lang', function (result: any) {
      setSyncLang(JSON.stringify(result))
      setDevLog(JSON.stringify(result))
    });
  }

  getScope

  async function getVoices() {
    try {
      const response = await axios.get('http://localhost:8080/voices');
      console.log(response);
      setAxiosStatus(response)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <h1>Dev Tools Panel</h1>
      <h2>scope: {syncScope}</h2><br />
      <h2>lang: {syncLang}</h2><br />
      <button onClick={getScope}>Get scope</button>
      <button onClick={getLang}>Get lang</button>
      <br />
      <p>{devLog}</p>

      <button onClick={getVoices}>get voices</button><br />
      {JSON.stringify(axiosStatus)}
    </div>
  );
};

export default Panel;
