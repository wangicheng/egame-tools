function removeSpecificIdAttributes(str: string) {
  // 這個正規表達式會匹配 id=" 後面跟著正好 20 個非引號字元，然後是引號的部分。
  // g 旗標表示全域匹配，會找到所有符合的模式，而不是只找到第一個。
  const regex = /id="[^"]{20}"/g;
  return str.replace(regex, '');
}
const copyToClipBoard = function (a: any) {
  const text = new XMLSerializer().serializeToString(window.Blockly.Xml.blockToDom(a));
  navigator.clipboard.writeText(removeSpecificIdAttributes(text));
};

const copyWorkspaceToClipboard = function () {
  const text = window.Blockly.Xml.workspaceToDom(window.Blockly.mainWorkspace).innerHTML;
  navigator.clipboard.writeText(removeSpecificIdAttributes(text));
};

const pasteFromClipboard = function () {
  navigator.clipboard.readText().then((xmlText) => {
    const xmlDom = window.Blockly.Xml.textToDom(`<xml>${xmlText}</xml>`);
    const workspace = window.Blockly.getMainWorkspace();
    window.Blockly.Xml.domToWorkspace(workspace, xmlDom);
  });
};

const interval = setInterval(() => {
  if (!window.Blockly || !window.Blockly.copy_) {
    return;
  }
  clearInterval(interval);
  const copyFunction = window.Blockly.copy_;
  window.Blockly.copy_ = function (a: any) {
    copyToClipBoard(a);
    return copyFunction(a);
  };
}, 200);

const observer = new MutationObserver(function (mutationList, observer) {
  const pointerButton = document.querySelector('#pointerButton');
  if (!pointerButton) {
    return;
  }
  observer.disconnect();
  const copyButton = document.createElement('button');
  copyButton.id = 'copyButton';
  copyButton.classList.add('top-right-button-small');
  copyButton.title = '複製所有積木至剪貼簿。';

  copyButton.addEventListener('click', () => copyWorkspaceToClipboard());
  pointerButton.parentElement!.appendChild(copyButton);

  const pasteButton = document.createElement('button');
  pasteButton.id = 'pasteButton';
  pasteButton.classList.add('top-right-button-small');
  pasteButton.title = '從剪貼簿貼上積木。';

  pasteButton.addEventListener('click', () => pasteFromClipboard());
  pointerButton.parentElement!.appendChild(pasteButton);
});
observer.observe(document.documentElement, { attributes: false, childList: true, subtree: true });
