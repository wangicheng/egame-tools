{
  const copyToClipBoard = function(a) {
    const text = new XMLSerializer().serializeToString(Blockly.Xml.blockToDom(a));
    navigator.clipboard.writeText(text);
  }

  const pasteFromClipboard = function() {
    navigator.clipboard.readText().then((xmlText) => {
      const xmlDom = Blockly.Xml.textToDom(`<xml>${xmlText}</xml>`);
      const workspace = Blockly.getMainWorkspace();
      Blockly.Xml.domToWorkspace(workspace, xmlDom);
    });
  }
  
  const interval = setInterval(() => {
    if(!window.Blockly || !Blockly.copy_) {
      return;
    }
    clearInterval(interval);
    const copyFunction = Blockly.copy_;
    Blockly.copy_ = function(a) {
      copyToClipBoard(a);
      return copyFunction(a);
    };
  }, 200);

  const observer = new MutationObserver(function (mutationList, observer) {
    const pointerButton = document.querySelector("#pointerButton");
    if(!pointerButton) {
      return;
    }
    observer.disconnect();
    const parent = pointerButton.parentElement;
    const pasteButton = pointerButton.cloneNode(false);
    pasteButton.id = 'pasteButton';
    pasteButton.style = "width: 58px;height: 58px;text-indent: -10000px; vertical-align: middle;background-position: center;";
    pasteButton.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36px' height='36px' viewBox='0 0 384 512' fill='%236e2229'%3E%3Cpath d='M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z'/%3E%3C/svg%3E")`;

    pasteButton.addEventListener('click', () => pasteFromClipboard());
    parent.appendChild(pasteButton);
  });
  observer.observe(document.documentElement, { attributes: false, childList: true, subtree: true });
}