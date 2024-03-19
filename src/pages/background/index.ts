import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

const isProd = process.env.NODE_ENV === 'production';
const devUrl = 'http://localhost:3000/auth/login';
const prodUrl = 'http://google.com/';
const authUrl = isProd ? prodUrl : devUrl;

let isInitialized = false;

if (!isInitialized) {
  isInitialized = true;
  initialize();
}

function initialize() {
  chrome.action.setBadgeText({ text: 'OFF' });
  chrome.action.setBadgeBackgroundColor({ color: '#888' });

  chrome.tabs.getCurrent().then(tab => {
    tab?.id && chrome.tabs.sendMessage(tab.id, { type: 'toggleOff' });
  });
}

chrome.runtime.onStartup.addListener(initialize);
chrome.runtime.onInstalled.addListener(initialize);

chrome.action.onClicked.addListener(async tab => {
  const tabId = tab.id;
  if (!tabId) {
    return;
  }
  const tabText = await chrome.action.getBadgeText({ tabId });
  switch (tabText) {
    case 'ON':
      chrome.action.setBadgeText({ text: 'OFF' });
      chrome.action.setBadgeBackgroundColor({ color: '#888' });
      // chrome.tabs.sendMessage(tabId, { type: 'toggleOff' });

      chrome.storage.sync.set({ foo: 'hello', bar: 'hi', isOn: false }, function () {
        console.log('Settings saved');
      });

      chrome.storage.sync.get(
        ['foo', 'bar', 'ld_user_context', 'isOn', 'currentTheme', 'theme-storage-key'],
        function (items) {
          // message('Settings retrieved', items);
          console.log('Settings retrieved', items);
        },
      );

      break;
    case 'OFF':
      chrome.action.setBadgeText({ text: 'ON' });
      chrome.action.setBadgeBackgroundColor({ color: '#4688F1' });
      // chrome.tabs.sendMessage(tabId, { type: 'toggleOn' });

      chrome.storage.sync.set({ foo: 'hello', bar: 'hi', isOn: true }, function () {
        console.log('Settings saved');
      });

      const cookies = await chrome.cookies.getAll({ domain: 'www.localhost' });

      console.log('cookies', cookies);

      break;
    default:
      break;
  }
});
