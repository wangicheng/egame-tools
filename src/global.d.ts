declare global {
  interface Window {
    dojoInfo: {
      no: number;
      boxLevel: {
        idealBlockNumGrade: any[];
        images: any[];
        idealBlockNum: number;
        initLocation: number[];
        levelName: string;
        title: string;
        requiredBlocks: string;
        requiredColours: {
          required: number;
          color: string;
        };

        mission: string;
        answer: string;
        levelId: number;
        hint: string;
        startBlocks: string;
        toolbox: string;
        makerId: number;
        noCheck: boolean;
        makerAnswer: string;
        makerIdealBlockNum: number;
        makerBlocks: string;
        makerGraphic: string;
      };
      boxLevelId: number;
      makerGraphic: string;
      roleId: number;
      makerAnswer: string;
      makerIdealBlockNum: number;
      dojoSn: number;
      makerBlocks: string;
      route: string;
    };
    Blockly: any;
    BlocklyApps: {
      LANGUAGE_NAME: any;
      LANGUAGE_RTL: string[];
      LANGUAGE_PACK: {
        [key: string]: string;
      };
      LANG: string;
      LANGUAGES: string[];
      DOUBLE_CLICK_TIME: number;
      isDialogVisible_: boolean;
      dialogOrigin_: any;
      dialogDispose_: any[];
      dialogStartX_: number;
      dialogStartY_: number;
      MODE_ENUM: {
        NORMAL: number;
        ADAPTIVE: number;
      };
      CHECK_FOR_EMPTY_BLOCKS: boolean;
      IDEAL_BLOCK_NUM: number;
      REQUIRED_BLOCKS: any[];
      NUM_REQUIRED_BLOCKS_TO_FLAG: number;
      DISPLAY_NAV: boolean;
      levelComplete: any;
      log: any;
      ticks: any;
      LEVEL_ID: number;
      errorVersionMap_: any;
      TIMER: number;
      FREE_BLOCKS: string;
      IDEAL_BLOCK_NUM_GRADE: any[];
      setSaveCode: any;
    };
    register: any;
    Turtle: any;
  }
}

export {};
