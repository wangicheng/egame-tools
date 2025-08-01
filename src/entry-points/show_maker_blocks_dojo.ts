{
  const observer = new MutationObserver(function (mutationList, observer) {
    const hintButton = document.querySelector('#hintButton');
    if (!hintButton) {
      return;
    }
    observer.disconnect();
    const showMakerBlocksButton = hintButton.cloneNode(false) as HTMLButtonElement;
    showMakerBlocksButton.textContent = '答案';
    showMakerBlocksButton.id = 'showMakerBlocksButton';
    showMakerBlocksButton.title = '顯示武館的答案。';
    showMakerBlocksButton.addEventListener('click', () => {
      const xmlText = window.Turtle.level.json.makerBlocks;
      const xmlDom = window.Blockly.Xml.textToDom(`<xml>${xmlText}</xml>`);
      const workspace = window.Blockly.getMainWorkspace();
      workspace.clear();
      window.Blockly.Xml.domToWorkspace(workspace, xmlDom);
    });
    hintButton.parentElement!.insertAdjacentElement('afterbegin', showMakerBlocksButton);
  });
  observer.observe(document.documentElement, { attributes: false, childList: true, subtree: true });
}
