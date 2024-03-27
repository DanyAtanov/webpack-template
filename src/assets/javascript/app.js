import "./global/base";

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
