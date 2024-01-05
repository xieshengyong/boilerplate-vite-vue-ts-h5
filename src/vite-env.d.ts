/// <reference types="vite/client" />

declare interface Window {
  PixiPlugin: any;
  dragonBones: any;
  webkitAudioContext: AudioContext;
  showMsg: any;
  showLoading: any;
}

// 统计相关
declare var _czc: any;
declare var _tdga: any;

declare var MMD: any;
declare var mediaURLData: any;

interface ZeptoCollection {
  fadeOut(num?: any, num2?: any): ZeptoCollection;
  fadeIn(num?: any, num2?: any): ZeptoCollection;
  selectModel(obj?: any): ZeptoCollection;
}
