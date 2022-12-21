function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function checkCookies() {
  let cookieNote = document.querySelector(".cookie-notification");
  let cookieBtnAccept = cookieNote.querySelector(".cookie-notification__btn");

  // Если куки cookies_policy нет или она просрочена, то показываем уведомление
  if (!getCookie("cookies_policy")) {
    cookieNote.style.display = "flex";
  }

  // При клике на кнопку устанавливаем куку cookies_policy на один год
  cookieBtnAccept.addEventListener("click", function () {
    setCookie("cookies_policy", "true", 1);
    cookieNote.style.display = "none";
  });
}
