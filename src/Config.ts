import { getImg } from "senyou-tool";
import { Howl, Howler } from "howler";
import gsap from "gsap";
import bgmurl from "./assets/media/bgm.mp3?url";

window.showLoading = (isShow: boolean) => {
  let loadingEl = document.querySelector(".m-icon-loading") as HTMLDivElement;
  if (loadingEl.className.indexOf("hide") > -1 && isShow) return;
  isShow ? (loadingEl.style.display = "block") : (loadingEl.style.display = "none");
};

/* 设置time就会自动消失，不设置就会需要用户点击才消失 */
window.showMsg = (msg: string, time?: number) => {
  let msgWrap = $(".m-msg");
  let msgEl = $(`<div class="item"><div class="content">${msg}</div></div>`);
  msgWrap.css("opacity") !== "1" && msgWrap.fadeIn(100);
  msgWrap.find(".container").append(msgEl);
  return new Promise((resolve, _reject) => {
    if (time) {
      msgEl.addClass("notips");
      setTimeout(() => {
        resolve(null);
        msgEl.remove();
        if (msgWrap.find(".container").children().length === 0) {
          msgWrap.fadeOut(100);
        }
      }, time);
    } else {
      msgWrap.one("click", () => {
        resolve(null);
        msgEl.remove();
        if (msgWrap.find(".container").children().length === 0) {
          msgWrap.fadeOut(100);
        }
      });
    }
  });
};

/** 解决ios12微信input软键盘收回时页面不回弹，兼容动态添加dom(腾讯登录组件)的情况 */
var resetScroll = (function () {
  var timeWindow = 500;
  var timeout: NodeJS.Timeout; // time in ms
  var functionName = function () {
    let inputEl = $("input, select, textarea");
    inputEl &&
      inputEl.on("blur", () => {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight, 0));
      });
  };

  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      functionName();
    }, timeWindow);
  };
})();
// $("body").on("DOMSubtreeModified", resetScroll);

export function setFontTo(name: string, path: string) {
  var newFontStyleSheet = document.createElement("style");
  newFontStyleSheet.textContent = `
                @font-face {
                  font-family: ${name};
                  src: url(${path});
                }
              `;
  document.head.appendChild(newFontStyleSheet);
}

export const getAssetsFile = (url: string) => {
  return new URL(`./assets/${url}`, import.meta.url).href;
};

export const preLoadImg = (imgs: any) => {
  let imgsLoader: any = [];
  imgs.forEach((ele: any) => {
    imgsLoader.push(getImg(ele));
  });
  return Promise.all(imgsLoader);
};

export const awaitTap = (ele: string, cb?: any) => {
  return new Promise((resolve, _reject) => {
    $(ele).one("pointerup", async (e) => {
      e.stopPropagation();
      await cb?.();
      resolve(null);
    });
  });
};

$(".active_js").on("touchstart", (e) => {
  gsap.to(e.target, {
    scale: 0.87,
    duration: 0.1,
  });
  // effect.play();
});
$(".active_js").on("touchend", (e) => {
  gsap.to(e.target, {
    scale: 1,
    duration: 0.1,
  });
});
$(".active_js").on("touchcancel", (e) => {
  gsap.to(e.target, {
    scale: 1,
    duration: 0.1,
  });
});

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
