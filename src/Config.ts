import { getImg } from "senyou-tool";
import { Howl, Howler } from "howler";
import bgmurl from "./assets/media/bgm.mp3?url";

window.showLoading = (isShow: boolean) => {
  let loadingEl = document.querySelector(".m-icon-loading") as HTMLDivElement;
  if (loadingEl.className.indexOf("hide") > -1 && isShow) return;
  isShow ? (loadingEl.style.display = "block") : (loadingEl.style.display = "none");
};

export const getAssetsFile = (url: string) => {
  return new URL(`./assets/${url}`, import.meta.url).href;
};

export const preLoadImg = (imgs: any) => {
  imgs.forEach((ele: any) => {
    getImg(ele);
  });
};

export const bgm = new Howl({
  src: bgmurl,
  loop: true,
  autoplay: true,
  onplay: () => {
    $(".top_btn_wrap .btn_music").addClass("on");
  },
});

// 页面前后台切换时
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    // 打开媒体
    if ($(".btn_music").hasClass("on")) {
      Howler.mute(false);
    }
  } else {
    // 关闭媒体
    Howler.mute(true);
  }
});
