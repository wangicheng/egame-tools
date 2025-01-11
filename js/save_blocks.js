{
  // store
  const observer = new MutationObserver(function (mutationList, observer) {
    const backButton = document.querySelector("#backButton");
    if(!backButton) {
      return;
    }
    observer.disconnect();
    const saveButton = backButton.cloneNode(false);
    saveButton.textContent = '儲存';
    saveButton.id = 'saveButton';
    saveButton.style.height = '48px';
    saveButton.style.width = '100px';
    saveButton.style.backgroundSize = '100% 100%';
    saveButton.title = '儲存積木。';
    saveButton.addEventListener('click', () => {
      const key = Turtle.sectionId + '';
      const value = Blockly.Xml.workspaceToDom(Turtle.workspace).innerHTML;
      console.log(window.cookie);
      localStorage.setItem(key, value);
      alert(`資料已儲存！\n${value}`);
    });
    backButton.parentElement.insertAdjacentElement('afterbegin', saveButton);
  });
  observer.observe(document.documentElement, { attributes: false, childList: true, subtree: true });

  // load
  const interval = setInterval(() => {
    if(!window.Blockly || !Blockly.mainWorkspace || !Blockly.mainWorkspace.clear) {
      return;
    }
    if(!window.BlocklyApps || !BlocklyApps.loadBlocks) {
      return;
    }
    if(!window.localStorage || !localStorage.getItem) {
      return;
    }
    clearInterval(interval);
    const key = Turtle.sectionId + '';
    const value = localStorage.getItem(key);
    if (value) {
      Blockly.mainWorkspace.clear();
      BlocklyApps.loadBlocks(`<xml>${value}</xml>`);
      // alert(`讀取的資料為：${value}`);
    } else {
      // alert("未找到對應的資料！");
    }
  });
}