function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const updatePage = async (scope, langObj) => {
    // console.log('updatePage() running...');
    console.log(Object.keys(langObj), Object.keys(langObj).length);
    if (scope > Object.keys(langObj).length) return 'scope too long';

    const pTags = document.getElementsByTagName('p');
    const divTags = document.getElementsByTagName('div');
    const keys = Object.keys(langObj);
    //console.log(pTags);
    for (let ii = 0; ii < divTags.length; ii++) {
        for (let i = 0; i < scope; i++) {
            const expSpace = '\\b\\s' + keys[i] + '\\s\\b';
            const expPeriod = '\\b' + keys[i] + '\\.\\b';
            const expComma = '\\b' + keys[i] + ',\\b';
            const expFirstWord = '\\b>' + keys[i] + '\\s\\b';

            const word = langObj[keys[i]].word;
            const text = "<span class='lr-word'>" + word + ' </span>';
            divTags[ii].innerHTML = divTags[ii].innerHTML.replace(
                new RegExp(expSpace, 'giu'),
                ' ' + text + ' '
            );
            divTags[ii].innerHTML = divTags[ii].innerHTML.replace(
                new RegExp(expPeriod, 'giu'),
                text + '.'
            );
            divTags[ii].innerHTML = divTags[ii].innerHTML.replace(
                new RegExp(expComma, 'giu'),
                text + ','
            );
            divTags[ii].innerHTML = divTags[ii].innerHTML.replace(
                new RegExp(expFirstWord, 'giu'),
                '>' + text
            );
        }

        if (ii % 1 === 0) {
            await sleep(1e3);
        }
    }

    return 'success';
};

export const translatePage = async (scope, lang) => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
    .lr-word {
        color: red
    }
    `;

    styleElement.id = 'lrStyle';

    const styleExist = document.getElementById('lrStyle');
    if (styleExist === null) document.body.appendChild(styleElement);
    console.log('in promise created in translatePage()');
    Promise.resolve()
        .then(updatePage(scope, lang))
        .then((res) => console.log(res));
};
