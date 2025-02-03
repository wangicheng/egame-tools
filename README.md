# Egame Tools

Egame Tools 是一個 Chrome Extension，提供多種功能來提升您的遊戲體驗。這個專案主要使用 JavaScript 開發。

## 目錄

- [介紹](#介紹)
- [功能](#功能)
  - [copy_paste_blocks_xml.js](#copy_paste_blocks_xmljs)
  - [dojo_canvas_background.js](#dojo_canvas_backgroundjs)
  - [edit_dojo_after_designed.js](#edit_dojo_after_designedjs)
  - [fast_register.js](#fast_registerjs)
  - [free_dojo.js](#free_dojojs)
  - [hide_all_pass.css](#hide_all_passcss)
  - [keep_current_page.js](#keep_current_pagejs)
  - [remove_duck_statue.js](#remove_duck_statuejs)
  - [show_maker_blocks_dojo.js](#show_maker_blocks_dojojs)
  - [show_pixel_errors.js](#show_pixel_errorsjs)
  - [show_solution_button.js](#show_solution_buttonjs)
  - [skip_checkin.js](#skip_checkinjs)
  - [turtle_speedup.js](#turtle_speedupjs)
- [安裝](#安裝)
- [使用方法](#使用方法)
- [貢獻](#貢獻)
- [授權](#授權)
- [感謝](#感謝)

## 介紹

Egame Tools 是一個 Chrome Extension，提供多種工具來提升您的遊戲體驗。

## 功能

### copy_paste_blocks_xml.js

提供複製和貼上積木的功能。

- 複製：使用右鍵「複製」、「剪下」，或快捷鍵 `Ctrl`+`C`、`Ctrl`+`X` 時，會額外將積木以 xml 格式存於剪貼簿中。
- 貼上：點擊螢幕右上方具有貼上圖示的按鈕，可將剪貼簿中的積木添加到工作區塊內（如果有）。

![image](https://github.com/user-attachments/assets/d06aec1d-0966-4294-b88d-9b0e496c44bd)

### dojo_canvas_background.js

在武館中加入純色背景及黑色邊框，讓畫布更乾淨，其大小更能被辨識。

| Before | After  |
| :----- | :----- |
| ![Before Image](https://github.com/user-attachments/assets/720e76e6-a3d8-45bd-8be3-703a3e9dd387) | ![After Image](https://github.com/user-attachments/assets/d0ad5f50-3ed2-4900-ade9-ca3d9af01f74) |

背景可以透過按鈕切換。

![image](https://github.com/user-attachments/assets/56c24853-141c-4eff-ad1f-62e30f95b19f)

### edit_dojo_after_designed.js

允許編輯已上架的武館。

![image](https://github.com/user-attachments/assets/53a18b34-7017-463d-9c9b-f4dfeab45b19)

### fast_register.js

註冊新帳號時，點擊按鈕以自動填入隨機的帳號密碼及其他必要資訊，達到瞬間註冊的效果。

![image](https://github.com/user-attachments/assets/9b138de1-ab09-42ac-ae08-3fe5d75a8b35)

> [!NOTE]
> 此功能註冊的帳號為「民眾」身分。

### free_dojo.js

允許不消耗體力進出別人的武館。

![image](https://github.com/user-attachments/assets/d3d24b43-82dc-430c-a245-63d61e35016c)

### hide_all_pass.css

隱藏令人煩躁的吹牛圖片。

![image](https://github.com/user-attachments/assets/db0e1327-ab2e-436b-8ca0-cdf898444b5b)

### keep_current_page.js

返回關卡選單時，自動切換到上次的頁數，而不是每次都跳到最後一頁。

![image](https://github.com/user-attachments/assets/5729dc8e-cf49-4874-b270-b34162c76687)

### remove_duck_statue.js

以紅點取代阻擋視野的角色圖片。

![image](https://github.com/user-attachments/assets/6627757e-3057-49a6-a60c-5f775371ddef)

> [!TIP]
> 您同樣可以原來的方式將紅點隱藏。

### show_maker_blocks_dojo.js

顯示武館的答案。

![image](https://github.com/user-attachments/assets/c26cff3a-2196-454d-9137-e0abbf127b08)

### show_pixel_errors.js

顯示繪製圖形與正確圖形的差距。

- `pixelErrors`：繪製圖形與正確圖形的差距。
- `permittedErrors`：系統允許的最大差距。

![image](https://github.com/user-attachments/assets/3b11f9e8-5388-426f-a02a-a50962f8da0f)

> [!NOTE]
> pixelErrors 必須小於 permittedErrors 才能通關，一般關卡為 25，武館關卡為 30。

### show_solution_button.js

將一般關卡中顯示解答的按鈕顯示出來。

![image](https://github.com/user-attachments/assets/513e56b0-62cf-465e-bfd9-a73cc8f90af6)

> [!NOTE]
> 此功能原為 Egame 內建功能，後來遭到移除，因此 8-5 以後的關卡沒有官方解答。

### skip_checkin.js

跳過漫長的簽到動畫。

![image](https://github.com/user-attachments/assets/0835f4f1-df89-4db9-a579-fc1c16822a47)

### turtle_speedup.js

在執行按鈕左側新增「加速」按鈕，讓烏龜以極快的速度完成動作。

![image](https://github.com/user-attachments/assets/8829e09c-4356-4516-91f2-9d736f40048b)

> [!TIP]
> 若您的程式陷入無限循環，網頁會詢問您是否要執行。
> 
> 由於 E-game 最多只會執行數百萬個積木，您的程式通常能夠在數分鐘內執行完畢。

## 安裝

要安裝 Egame Tools Chrome Extension，請按照以下步驟操作：

1. 下載並解壓縮此倉庫：

   ```sh
   git clone https://github.com/wangicheng/egame-tools.git
   ```

2. 打開 Chrome 瀏覽器，進入擴充功能管理頁面：

   ```sh
   chrome://extensions/
   ```

3. 開啟右上角的「開發者模式」。
4. 點擊左上角的「載入未封裝項目」按鈕，然後選擇您剛剛解壓縮的專案目錄。

## 使用方法

1. 安裝完成後，Egame Tools 擴充功能會自動啟動。
2. 您可以在 Chrome 瀏覽器中看到 Egame Tools 的圖示，點擊圖示以打開擴充功能的界面。
3. 根據您需要的工具，選擇對應的功能按鈕來執行操作。

如果您需要更多詳細的使用說明，請參考每個 JavaScript 文件的具體描述和使用說明。

## 貢獻

歡迎貢獻！請隨時提交 pull request 或在 GitHub 上開啟 issue。

## 授權

此專案採用 MIT 授權。

## 感謝

特別感謝所有貢獻者及開源社群的支持。

您可以在 [js/ 目錄](/js) 查看更多文件。
