window.addEventListener("DOMContentLoaded", () => {
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

  function checkCookies() {
    let cookieNote = document.querySelector(".cookie-notification");
    let cookieBtnAccept = cookieNote.querySelector(".cookie-notification__btn");

    // Если куки cookies_policy нет или она просрочена, то показываем уведомление
    if (!getCookie("cookies_policy") && cookieNote) {
      cookieNote.style.display = "flex";
    }

    // При клике на кнопку устанавливаем куку cookies_policy на один год
    if (cookieBtnAccept) {
      cookieBtnAccept.addEventListener("click", function () {
        setCookie("cookies_policy", "true", 1);
        cookieNote.style.display = "none";
      });
    }
  }

  checkCookies();

  // Анимация появления слева
  let fadeInLeft = document.querySelectorAll(".fadeInLeft");
  let fadeInTop = document.querySelectorAll(".fadeInTop");
  let fadeInScale = document.querySelectorAll(".fadeInScale");

  function showElement(item) {
    item.style.opacity = "1";
    item.style.left = "0";
    item.style.top = "0";
  }
  // Моментальное срабатываение анимации вверху страницы
  let timer = 0;
  if (fadeInLeft) {
    fadeInLeft.forEach((item) => {
      if (item.classList.contains("fade--immediately")) {
        timer = timer + 500;
        setTimeout(() => {
          showElement(item);
        }, timer);
      }
    });
  }
  if (fadeInTop) {
    fadeInTop.forEach((item) => {
      if (item.classList.contains("fade--immediately")) {
        setTimeout(() => {
          showElement(item);
        }, timer);
      }
    });
  }
  if (fadeInScale) {
    fadeInScale.forEach((item) => {
      if (item.classList.contains("scale--immediately")) {
        item.style.transform = "scale(1)";
        item.style.opacity = "1";
      }
    });
  }
  // Срабатывание анимации на скролл
  window.addEventListener("scroll", () => {
    if (fadeInLeft) {
      fadeInLeft.forEach((item) => {
        let position = item.getBoundingClientRect().top;
        if (position <= window.innerHeight / 2) {
          showElement(item);
        }
      });
    }
    if (fadeInTop) {
      fadeInTop.forEach((item) => {
        let position = item.getBoundingClientRect().top;
        if (position <= window.innerHeight / 2) {
          showElement(item);
        }
      });
    }
    if (fadeInScale) {
      fadeInScale.forEach((item) => {
        let position = item.getBoundingClientRect().top;
        if (position <= window.innerHeight / 1.2) {
          item.style.transform = "scale(1)";
          item.style.opacity = "1";
        }
      });
    }
  });

  // Профиль в шапке
  let headerProfileMenu = document.querySelector(".header__top-panel");
  let headerOpenProfile = document.querySelector(".header__top-link--profile");

  if (headerOpenProfile && headerProfileMenu) {
    headerOpenProfile.addEventListener("click", () => {
      headerProfileMenu.classList.toggle("profile-panel--show");
      setTimeout(() => {
        headerProfileMenu.classList.remove("profile-panel--show");
      }, 20000);
    });
  }

  // Попап формы обратной связи
  let popupForm = document.querySelector(".popupForm");
  let popupClose = document.querySelector(".popupForm__close");

  let openPopup = document.querySelectorAll(".open-popup");

  function showPopup() {
    popupForm.style.display = "block";
    overlay.style.position = "fixed";
    overlay.style.display = "block";
    document.querySelector("body").style.overflowY = "hidden";
  }

  if (openPopup && popupClose) {
    openPopup.forEach((item) => {
      item.addEventListener("click", () => {
        showPopup();
      });
    });
  }

  if (popupForm && popupClose) {
    popupClose.addEventListener("click", () => {
      popupForm.style.display = "none";
      overlay.style.display = "none";
      document.querySelector("body").style.overflowY = "visible";
    });
  }

  // Бургер меню
  let openBurger = document.querySelector(".burger__icon");
  let burgerMenu = document.querySelector(".burger__menu");
  let closeBurger = document.querySelector(".burger__close");
  let overlay = document.querySelector(".overlay");

  if (openBurger && burgerMenu && closeBurger && overlay) {
    openBurger.addEventListener("click", () => {
      burgerMenu.style.display = "block";
      overlay.style.display = "block";
      document.querySelector("body").style.overflowY = "hidden";
    });
    closeBurger.addEventListener("click", () => {
      burgerMenu.style.display = "none";
      overlay.style.display = "none";
      document.querySelector("body").style.overflowY = "visible";
    });
    overlay.addEventListener("click", () => {
      burgerMenu.style.display = "none";
      overlay.style.display = "none";
      if (popupForm) {
        popupForm.style.display = "none";
      }
      document.querySelector("body").style.overflowY = "visible";
    });
  }

  // скрывать пункты меню в шапке
  let headerLinks = document.querySelectorAll(".header__bottom-link");
  let linksBtn = document.querySelector(".header__bottom-link-btn");
  let headerPopup = document.querySelector(".header__bottom-link-popup");

  if (headerLinks && linksBtn && headerPopup) {
    linksBtn.addEventListener("click", () => {
      headerPopup.style.display = "flex";
      setTimeout(() => {
        headerPopup.style.display = "none";
      }, 7000);
    });

    if (headerLinks.length > 7) {
      let count = headerLinks.length - 7;
      let rest = [];
      for (let i = 1; i <= count; i++) {
        rest.push(headerLinks[headerLinks.length - i]);
      }

      headerLinks.forEach((item, index) => {
        if (index > 6) {
          item.style.display = "none";
          item.parentNode.style.display = "none";

          let links = item.nextElementSibling.querySelectorAll("a");

          let newPopupItem = document.createElement("div");
          newPopupItem.classList.add("header__bottom-link-popup-item");
          headerPopup.appendChild(newPopupItem);

          let newElem = document.createElement("a");
          newElem.href = item.href;
          newElem.textContent = item.textContent;
          newElem.style.wordBreak = "break-word";
          newElem.classList.add("header__bottom-link-item");

          newPopupItem.appendChild(newElem);

          let newSubpopup = document.createElement("div");
          newSubpopup.classList.add("header__bottom-link-subpopup");

          newPopupItem.appendChild(newSubpopup);

          links.forEach((link) => {
            newSubpopup.appendChild(link);
          });
        }
      });
    }
  }

  let headerPopupList = document.querySelectorAll(".header__bottom-link-item");
  if (headerPopupList.length === 0 && headerPopupList) {
    headerPopup.textContent = "Пусто";
    headerPopup.style.color = "#ababab";
    headerPopup.style.justifyContent = "center";
  }

  // Слайдер До - После
  let otsFbSlider = document.querySelector(".outs-fb-projects__slider");
  let imgAfter = document.querySelector(".outs-fb-projects__slider-imgAfter");
  let otsSliderLine = document.querySelector(".outs-fb-projects__slider-line");

  if (otsFbSlider) {
    otsFbSlider.addEventListener("mousemove", (e) => {
      imgAfter.style.width = `${e.layerX}px`;
      otsSliderLine.style.left = `${e.layerX}px`;
    });
  }

  // Куки предупреждение
  let cookieNotification = document.querySelector(".cookie-notification");
  let cookieNotificationBtn = document.querySelector(".cookie-notification__btn");

  if (cookieNotification && cookieNotificationBtn) {
    cookieNotificationBtn.addEventListener("click", () => {
      cookieNotification.style.display = "none";
    });
  }

  // Трансляции
  let frameLinks = document.querySelectorAll(".examples__item-link");

  frameLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("examples__item")) {
        return;
      }
      let frame = e.target.parentNode.nextElementSibling;
      frame.style.display = "block";
      overlay.style.display = "block";
      document.querySelector("body").style.overflowY = "hidden";
      overlay.addEventListener("click", () => {
        frame.style.display = "none";
        document.querySelector("body").style.overflowY = "vissible";
      });
    });
  });

  // FAQ в Разработке сайтов
  let openQuestion = document.querySelectorAll(".web-faq__item-check");
  if (openQuestion) {
    openQuestion.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let answer;
        let node;
        if (e.target.classList.contains("web-faq__item-check")) {
          node = e.target.nextElementSibling;
        } else {
          node = e.target.parentNode.nextElementSibling;
        }

        answer = node.querySelector(".web-faq__item-text");

        answer.classList.toggle("web-faq__item-text--hide");
      });
    });
  }

  // Заказать звонок Виджет Битрикс24
  let orderCallButton = document.querySelectorAll(".open-sesame");
  let crmFormButton = document.querySelectorAll(".open-sesame-form");
  if (orderCallButton) {
    orderCallButton.forEach((item) => {
      item.onclick = () => {
        document.querySelector(".b24-widget-button-callback span").click();
      };
    });
  }
  if (crmFormButton) {
    crmFormButton.forEach((item) => {
      item.onclick = () => {
        document.querySelector(".b24-widget-button-crmform span").click();
      };
    });
  }
});
