import "./style.css";

/** ------ VUE 模式 start ------ */
import { createApp } from "vue";
import App from "./App.vue";
createApp(App).mount("#app");
/** ------ VUE 模式 end ------ */

import { delay, getImg } from "senyou-tool";
import gsap from "gsap";

const getAssetsFile = (url: string) => {
  return new URL(`./assets/${url}`, import.meta.url).href;
};

const preLoadImg = (imgs: any) => {
  imgs.forEach((ele: any) => {
    getImg(ele);
  });
};

window.showLoading = (isShow: boolean) => {
  let loadingEl = document.querySelector(".m-icon-loading") as HTMLDivElement;
  if (loadingEl.className.indexOf("hide") > -1 && isShow) return;
  isShow ? (loadingEl.style.display = "block") : (loadingEl.style.display = "none");
};
