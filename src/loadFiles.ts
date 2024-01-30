import { getAssetsFile } from "./Config";

const allFiles = import.meta.glob([
  "./assets/*.jpg",
  "./assets/*.png",
  // "../assets/images/*/*.jpg",
  // "../assets/images/*/*.png",
]);

const ImgList = Object.keys(allFiles).map((val) => {
  return getAssetsFile(val.replace("./assets/", ""));
});

let loadprogresscb: any;
// 完成加载图片数
var loadNum = 0;

function imgLoad(this: any) {
  if (loadNum >= ImgList.length) {
    return;
  }
  loadNum++;
  loadprogresscb?.(Math.floor((loadNum / ImgList.length) * 100));
  this.src = ImgList[loadNum - 1];
}

function loadFiles(loadprogress: any) {
  loadprogresscb = loadprogress;
  let imgLength = ImgList.length > 10 ? 10 : ImgList.length;
  for (let i = 0; i < imgLength; i++) {
    let imgEle = new Image();
    imgEle.onload = imgLoad;
    imgEle.onerror = imgLoad;
    imgEle.src = ImgList[i];
  }
}

export { loadFiles };
