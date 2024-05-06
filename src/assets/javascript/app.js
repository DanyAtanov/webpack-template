import "./global/base";
import './global/sprite';

let loading = () => {
  import("./components").then(() => {
    /*    import("./global/animation").then(({ animation }) => {
      animation();
    }); */
  });
};

document.addEventListener('DOMContentLoaded', () => {
	loading();
});
