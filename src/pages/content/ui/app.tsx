export default function App() {
  document.addEventListener('mouseup', function (event) {
    var selectedText = window?.getSelection()?.toString();
    if (selectedText !== '') {
      chrome.runtime.sendMessage({ type: 'highlightedText', text: selectedText });
    }
  });

  return null;
}
