import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(error => console.error(error));

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == 'getCookie') {
    chrome.cookies.get({ url: request.details.url, name: request.details.name }, function (cookie) {
      if (cookie) {
        sendResponse({ cookieValue: cookie });
      } else {
        sendResponse({ cookieValue: null });
      }
    });
    if (request.type === 'highlightedText') {
      chrome.runtime.sendMessage({ type: 'highlightedText', text: request.text });
    }
    return true; // Indicates you wish to send a response asynchronously
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    chrome.runtime.sendMessage({ type: 'URL_CHANGE', url: changeInfo.url });
  }
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    chrome.runtime.sendMessage({ type: 'TAB_SWITCH', url: tab.url });
  });
});
