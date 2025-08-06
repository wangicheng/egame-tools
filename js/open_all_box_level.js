{
  'use strict';

  // 1. 將所有 "魔法字串" 和設定值提取為常數
  // ----------------------------------------------------
  // 這樣做可以方便未來統一修改，並增加程式碼的可讀性。
  const CONFIG = {
    OBSERVER: { attributes: false, childList: true, subtree: true },
    URL_PREFIX: '#dojo/myDojo/view/',
    URL_NO_REGEX: /dojo\/myDojo\/view\/([1-5])/,
    EDIT_URL_TEMPLATE: '/auth/main/redirect?a=toEditDojo&dojoSn={dojoSn}&no={no}&boxLevelId={boxLevelId}'
  };

  const SELECTORS = {
    originalLevelSelector: 'div[data-bind="visible:!myDojo.isOpen(),foreach:{data:boxLevelList,as:\'boxLevel\'}"]',
    currentLevelSpan: 'span[data-bind="text:myDojo.levelName"]',
    originalEditButton: 'div[data-bind="visible:!myDojo.isOpen(),click:edit"]',
    dojoIdSpan: 'span[data-bind="text:myDojo._id"]'
  };

  const IDS = {
    customLevelSelector: 'custom-box-level-selector'
  };

  const BOX_LEVELS = [
    { id: '1', label: '基礎積木包' },
    { id: '2', label: '教練積木包' },
    { id: '3', label: '大師積木包' },
    { id: '4', label: '傳奇積木包' },
    { id: '5', label: '無限積木包' }
  ];

  /**
   * 2. 創建一個函數來生成積木包等級選擇器 UI
   * @param {string} currentLevelName - 當前選擇的等級名稱
   * @returns {HTMLElement} - 包含 radio buttons 的 div 元素
   */
  function createLevelSelector(currentLevelName) {
    const container = document.createElement('div');
    container.id = IDS.customLevelSelector;

    // 3. 使用數據驅動的方式生成 HTML，而不是硬編碼
    // 這樣未來要增減等級時，只需要修改 BOX_LEVELS 陣列即可。
    const itemsHtml = BOX_LEVELS.map(level => {
      const inputId = `custom-box-level-input-${level.id}`;
      // 4. 使用數據屬性 (data-*) 來儲存等級 ID，而不是從 ID 字串中解析。
      // 這種方法更穩健，不受 ID 命名規則變化的影響。
      // 5. 比較 label 來決定預設選項，而不是用 innerText.includes()。
      const isChecked = currentLevelName === level.label ? 'checked' : '';
      return `
        <div>
          <input type="radio" name="customBoxLevel" style="cursor:pointer"
                 id="${inputId}" data-level-id="${level.id}" ${isChecked}>
          <label style="cursor:pointer" for="${inputId}">&nbsp;${level.label}</label>
        </div>
      `;
    }).join('');

    container.innerHTML = itemsHtml;
    return container;
  }

  /**
   * 6. 創建一個函數來生成自訂的 "編輯" 按鈕
   * @param {string} dojoSn - Dojo 的唯一序號
   * @returns {HTMLElement} - 自訂的 "編輯" 按鈕元素
   */
  function createCustomEditButton(dojoSn) {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = "position: relative; width: 169px; height: 82px; cursor: pointer;";
    buttonContainer.innerHTML = `
      <img src="/images/dotCodeIsland/dojo2/btn_play.png" alt="編輯">
      <p style="position:absolute; top:30px; width:100%; text-align:center; color:white; font-size:20px">編輯</p>
    `;

    buttonContainer.addEventListener('click', () => handleEditClick(dojoSn));
    return buttonContainer;
  }

  /**
   * 7. 將點擊事件的處理邏輯獨立成一個函數
   * @param {string} dojoSn - Dojo 的唯一序號
   */
  function handleEditClick(dojoSn) {
    const noMatch = location.href.match(CONFIG.URL_NO_REGEX);
    if (!noMatch) {
      console.error('無法從 URL 中解析 dojo number。');
      return;
    }
    const no = noMatch[1];

    const checkedInput = document.querySelector('input[name="customBoxLevel"]:checked');
    if (!checkedInput) {
      alert('請先選擇一個積木包等級！');
      return;
    }
    // 從 data-level-id 獲取 ID，更安全可靠
    const boxLevelId = checkedInput.dataset.levelId;

    const url = CONFIG.EDIT_URL_TEMPLATE
      .replace('{dojoSn}', dojoSn)
      .replace('{no}', no)
      .replace('{boxLevelId}', boxLevelId);

    location.href = url;
  }

  /**
   * 8. 主邏輯函數：當 DOM 發生變化時觸發
   */
  function onDomChange(mutationList, observer) {
    // 條件檢查，讓邏輯更清晰
    if (!location.hash.startsWith(CONFIG.URL_PREFIX)) {
      return;
    }
    // 如果自訂 UI 已存在，則不重複執行
    if (document.getElementById(IDS.customLevelSelector)) {
      return;
    }

    // 9. 將 DOM 元素查找集中在一起
    const elements = {
      originalLevelSelector: document.querySelector(SELECTORS.originalLevelSelector),
      currentLevelSpan: document.querySelector(SELECTORS.currentLevelSpan),
      originalEditButton: document.querySelector(SELECTORS.originalEditButton),
      dojoIdSpan: document.querySelector(SELECTORS.dojoIdSpan)
    };

    // 確保所有需要的元素都已載入
    if (Object.values(elements).every(el => el !== null)) {
      // 暫停觀察，進行 DOM 操作，避免觸發無限循環
      observer.disconnect();

      // 隱藏原始 UI
      elements.originalLevelSelector.style.display = 'none';

      // 創建並插入自訂 UI
      const currentLevelName = elements.currentLevelSpan.textContent.trim();
      const dojoSn = elements.dojoIdSpan.textContent.trim();

      const customLevelSelector = createLevelSelector(currentLevelName);
      elements.originalLevelSelector.parentElement.appendChild(customLevelSelector);

      const customEditButton = createCustomEditButton(dojoSn);
      elements.originalEditButton.parentElement.insertAdjacentElement('afterbegin', customEditButton);
      
      // 重新啟用觀察
      observer.observe(document.body, CONFIG.OBSERVER);
    }
  }

  // 10. 啟動 MutationObserver
  const observer = new MutationObserver(onDomChange);
  observer.observe(document.body, CONFIG.OBSERVER);

}