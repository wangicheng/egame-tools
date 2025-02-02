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
    const pasteButton = document.createElement('button');
    pasteButton.id = 'pasteButton';
    pasteButton.classList.add('top-right-button-small');
    pasteButton.title = '從剪貼簿貼上積木。';

    pasteButton.addEventListener('click', () => pasteFromClipboard());
    pointerButton.parentElement.appendChild(pasteButton);
  });
  observer.observe(document.documentElement, { attributes: false, childList: true, subtree: true });
}