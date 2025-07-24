{
  let hintText = '';
  let editorContainer;
  let editorTextarea;
  let toggleButton; // 新增的開關按鈕

  function initializeEditorAndButton() {
    // --- 創建編輯器容器 ---
    editorContainer = document.createElement('div');
    editorContainer.id = 'editorContainer';
    editorContainer.classList.add('editorContainer-hidden'); // 預設隱藏

    editorTextarea = document.createElement('textarea');
    editorTextarea.id = 'editorTextarea';
    editorTextarea.placeholder = '自訂提示...';
    editorContainer.appendChild(editorTextarea);

    const cancelBtn = document.createElement('button');
    cancelBtn.id = 'cancelBtn';
    cancelBtn.textContent = '取消';
    editorContainer.appendChild(cancelBtn);

    const saveBtn = document.createElement('button');
    saveBtn.id = 'saveBtn';
    saveBtn.textContent = '儲存';
    editorContainer.appendChild(saveBtn);

    document.body.appendChild(editorContainer);

    // --- 創建切換編輯器顯示的按鈕 ---
    const menu = document.querySelector("div#menu");
    toggleButton = document.createElement('button');
    toggleButton.innerText = '編輯提示';
    toggleButton.title = '編輯提示。';
    // 將按鈕添加到 body 的適當位置，例如頂部角落
    menu.insertAdjacentElement('afterbegin', toggleButton);

    // --- 添加事件監聽器 ---
    saveBtn.addEventListener('click', () => {
      const content = editorTextarea.value.trim();
      hintText = content;
      hideEditor();
    });

    cancelBtn.addEventListener('click', () => {
      editorTextarea.value = '';
      hideEditor();
    });

    document.querySelector('#dialogShadow').addEventListener('click', (event) => {
      if (editorContainer.classList.contains('editorContainer-hidden')) {
        return; // 如果編輯器已經隱藏，則不處理點擊事件
      }
      hideEditor();
    });

    toggleButton.addEventListener('click', () => {
      showEditor();
    });
  }

  function showEditor() {
    const shadow = document.getElementById('dialogShadow');
    shadow.style.visibility = 'visible';
    shadow.style.opacity = 0.5;
    editorContainer.classList.remove('editorContainer-hidden');
    editorTextarea.value = hintText;
    editorTextarea.focus();
  }

  function hideEditor() {
    const shadow = document.getElementById('dialogShadow');
    shadow.style.opacity = 0;
    window.setTimeout(() => shadow.style.visibility = 'hidden', 175);
    editorContainer.classList.add('editorContainer-hidden');
  }

  // 在 codeButton 出現後初始化所有元素和事件
  const observer = new MutationObserver(function (mutationList, observer) {
    const codeButton = document.querySelector("#codeButton");
    if (!codeButton) {
      return;
    }
    observer.disconnect();

    initializeEditorAndButton();
  });
  observer.observe(document.documentElement, { attributes: false, childList: true, subtree: true });
  
  // 克隆 saveButton 元素以替換 click 事件為自訂行為
  const observer2 = new MutationObserver(function (mutationList, observer) {
    const saveForm = document.querySelector("#saveForm");
    if (!saveForm) {
      return;
    }
    observer2.disconnect();

    const submitFunction = saveForm.submit;
    saveForm.submit = function() {
      const makerAnswer = document.querySelector('#makerAnswer');
      console.log(hintText);
      if(hintText) {
        makerAnswer.value += `\n// custom hint\ncontainerHint.innerHTML = ${JSON.stringify(hintText)};`;
      }
      submitFunction.apply(this);
    }
  });
  observer2.observe(document.documentElement, { attributes: false, childList: true, subtree: true });
}