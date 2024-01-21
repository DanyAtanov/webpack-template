import "./global/base";
import "./global/sprite";

let loading = () => {
  import("./components").then(() => {
    /*    import("./global/animation").then(({ animation }) => {
      animation();
    }); */
  });
};

if (window.addEventListener) window.addEventListener("load", loading, false);
else if (window.attachEvent) window.attachEvent("onload", loading);
else window.onload = loading;
