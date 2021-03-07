// ANCHOR -- Hide Toast Notification --
export const hideToast = () => {
  const el = document.querySelector(".toast");
  if (el) {
    el.parentElement.removeChild(el);
  }
};

// ANCHOR -- Show Toast --
// tpye is 'success' or 'error'
export const showToast = (type, message, time = 7) => {
  hideToast();
  const markup = `<div class="toast toast--${type}">${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideToast, time * 1000);
};
