import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

createApp(App).mount("#app");

window.showLoading = (isShow: boolean) => {
  let loadingEl = document.querySelector(".m-icon-loading") as HTMLDivElement;
  if (loadingEl.className.indexOf("hide") > -1 && isShow) return;
  isShow ? (loadingEl.style.display = "block") : (loadingEl.style.display = "none");
};
