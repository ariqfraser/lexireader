import { ConfirmationNumber } from '@mui/icons-material';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const getNodeList = async () => {
    console.time('getNodeList');
    let node,
        nodeList = [],
        nodeListTagNames = [],
        isConnected = [],
        walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    return (node.textContent.trim() !== '' &&
                        // node.parentElement.classList.value !== 'lr-word' &&
                        node.parentElement.tagName !== 'STYLE' &&
                        node.parentElement.tagName !== 'SPAN' &&
                        node.parentElement.nodeValue !== (null || undefined) &&
                        node.parentElement.tagName !== 'SCRIPT' &&
                        node.parentElement.tagName !== 'CODE') ||
                        node.parentElement.tagName.includes('H')
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_REJECT;
                },
            }
        );

    let prevNode = '';
    // update page
    while ((node = walker.nextNode())) {
        const currNode = walker.currentNode.parentElement.innerHTML;
        if (currNode === (null || undefined)) continue;
        if (prevNode === currNode) continue;
        isConnected.push(walker.currentNode.parentElement.isConnected);
        prevNode = currNode;
        nodeListTagNames.push(node.parentElement.tagName);
        nodeList.push(node.parentElement);
    }
    console.table(nodeList);
    console.table(isConnected);
    console.timeEnd('getNodeList');
    return nodeList;
};

const createStyleElement = () => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
        .lr-word {
            color: red
        }
        `;
    styleElement.id = 'lrStyle';

    const styleExist = document.getElementById('lrStyle');
    if (styleExist === null) {
        document.body.appendChild(styleElement);
        console.log('styling created');
    }
};

export const translatePage = async (scope, lang) => {
    createStyleElement();
    Promise.resolve()
        .then(() => getNodeList())
        .then((nodeList) => {
            console.time('updateNodeList');
            for (let [index, node] of nodeList.entries()) {
                console.log(index, node);
                console.log(node.innerHTML);
                // if (node.innerHTML === (undefined || null)) continue;
                // if (node.nodeValue === (null || undefined)) continue;
                let tempHTML = node.innerHTML.toString();

                for (let key in lang) {
                    if (parseInt(lang[key]['rank']) > scope) continue;
                    // console.log(key, lang[key]['word']);

                    const expressions = [
                            '\\b\\s' + key + '\\s\\b',
                            '\\b>\\s' + key + '\\s\\b',
                            '\\b' + key + '\\.\\b',
                            '\\b' + key + ',\\b',
                            '\\b>' + key + '\\s\\b',
                            "(<span class='lr-word'>" + key + '</span>)',
                            '\\b\\.\\s' + key + '\\s\\b',
                        ],
                        insert = [
                            " <span class='lr-word'>" +
                                lang[key]['word'] +
                                '</span> ',
                            "> <span class='lr-word'>" +
                                lang[key]['word'] +
                                '</span> ',
                            "<span class='lr-word'>" +
                                lang[key]['word'] +
                                '</span>.',
                            "<span class='lr-word'>" +
                                lang[key]['word'] +
                                ',</span>',
                            "><span class='lr-word'>" +
                                lang[key]['word'] +
                                '</span> ',
                            "<span class='lr-word'>" +
                                lang[key]['word'] +
                                '</span>',
                            ". <span class='lr-word'>" +
                                lang[key]['word'] +
                                '</span> ',
                        ];

                    for (let i in expressions) {
                        tempHTML = tempHTML.replace(
                            new RegExp(expressions[i], 'giu'),
                            insert[i]
                        );
                    }
                }

                node.innerHTML = tempHTML;
            }
            console.timeEnd('updateNodeList');
        })
        .catch((err) => console.log(err));
};
