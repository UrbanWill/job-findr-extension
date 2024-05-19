export default function App() {
  document.addEventListener('mouseup', function () {
    const selectedText = window?.getSelection()?.toString();
    if (selectedText !== '') {
      chrome.runtime?.sendMessage({ type: 'highlightedText', text: selectedText });
    }
  });

  return null;
}
