import { printLine } from './modules/print';
import { translatePage } from './modules/translate';

console.log('Content script works!');

printLine("Using the 'printLine' function from the Print Module");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    switch (msg.type) {
        case 'translatePage':
            console.log(msg.lang);
            sendResponse('recieved msg');
            Promise.resolve()
                .then(translatePage(msg.scope, msg.lang))
                .catch((err) => console.log(err));
            break;
    }
});
