/* global chrome */

import React from 'react';
import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import './Popup.css';
import { MenuOptn, MenuBtnBlue, BlueBtn } from './components/buttons';
import { lightBlue } from '@mui/material/colors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import Logo from '../../assets/logo';
import { ColumnContainer, Dropdown } from './components/containers';
import AutoDropdown from './components/AutoDropdown';
import axios from 'axios';

function Popup() {
    const [syncScope, setSyncScope] = useState(20);
    const [syncLang, setSyncLang] = useState('');
    const pageDefault = useRef();
    const pageLangSelect = useRef();
    const refScope = useRef();
    const appWrapper = useRef();

    const handleClick = () => {
        let err = 'Error: ';
        const inputLang = document.getElementById('language-selector').value;
        const inputScope = refScope.current.value;
        // Validate inputs
        if (inputLang === '') err += 'lang returned "". ';
        console.log(inputScope);
        if (inputScope < 1 || inputScope === null)
            err += 'refScope.current.value = ' + inputScope + '. ';
        if (err !== 'Error: ') return alert(err);

        chrome.storage.sync.set({
            LR_scope: inputScope,
            LR_lang: inputLang,
        });

        const endpoint = inputLang.split(', ');
        axios
            .get('http://localhost:8080/lang/' + endpoint[1])
            .then((res) => {
                let words = res.data;
                chrome.tabs.query(
                    { active: true, currentWindow: true },
                    (tabs) => {
                        chrome.tabs.sendMessage(
                            tabs[0].id,
                            {
                                type: 'translatePage',
                                lang: words,
                                scope: inputScope,
                            },
                            (response) => {
                                // alert(response);
                            }
                        );
                    }
                );
            })
            .catch((err) => {
                return err;
            });
    };

    useLayoutEffect(() => {
        chrome.storage.sync.get('LR_scope', (results) => {
            setSyncScope(results.LR_scope);
            console.log('got scope:', results.LR_scope);
            refScope.current.value = results.LR_scope;
        });

        chrome.storage.sync.get('LR_lang', (results) => {
            setSyncLang(results.LR_lang);
            console.log('got lang:', results.LR_lang);

            const inputLang =
                document.getElementById('language-selector').value;
            inputLang = results.LR_lang;
        });
    }, []);

    useEffect(() => {
        console.table({ state_scope: syncScope, state_lang: syncLang });
    }, [syncScope, syncLang]);

    return (
        <div ref={appWrapper} style={{ transition: '400ms ease-in-out' }}>
            <ColumnContainer ref={pageDefault} defaultStart={true}>
                <Logo width="26px" m="12px 0 0 0" />
                <header>
                    <h1>
                        <span style={{ color: lightBlue[300] }}>Lexi</span>
                        Reader
                    </h1>
                </header>
                <div>
                    <MenuOptn variant="contained">Detected Lanugage</MenuOptn>

                    <AutoDropdown
                        style={{ marginLeft: 10 }}
                        id="language-selector"
                        label="Language Select"
                        data={'sdas'}
                    />

                    <div className="sightword-variable btn">
                        Top
                        <input
                            type="number"
                            ref={refScope}
                            defaultValue={syncScope}
                        />
                        Words
                    </div>
                    <BlueBtn variant="contained" onClick={handleClick}>
                        Translate Page
                    </BlueBtn>
                </div>
            </ColumnContainer>

            <ColumnContainer ref={pageLangSelect}>
                <Dropdown>
                    <p>Hello</p>
                    <p>icon</p>
                </Dropdown>
            </ColumnContainer>
        </div>
    );
}

export default Popup;
