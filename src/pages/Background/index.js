console.log('This is the background page.');


chrome.runtime.onInstalled.addListener(() => {
  console.log('INSTALLED LEXIREADER')
});

let LR_lang = 'spn';
let LR_scope = 100;

const setDefaultSettings = () => {
  chrome.storage.sync.set({
    'LR_lang': LR_lang,
    'LR_scope': LR_scope
  }, () => {
    console.log(`Language is set to ${LR_lang} and will translate ${LR_scope} of the most common words.`)
  });
}


chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, {
      oldValue,
      newValue
    }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});