// ANCHOR -- Hide Toast Notification --
export const removeToast = () => {
  const el = document.querySelector(".toast");
  el.classList.add("hide");
  setTimeout(() => {
    el.parentElement.removeChild(el);
  }, 500);
};

// ANCHOR -- Show Toast --
// tpye is 'success' or 'error'
export const showToast = (type, message, time = 2) => {
  const el = document.querySelector(".toast");
  if (el) removeToast();
  const markup = `<div class="toast toast--${type}">${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(removeToast, time * 1000);
};
