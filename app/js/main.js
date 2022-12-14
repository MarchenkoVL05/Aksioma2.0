window.addEventListener("DOMContentLoaded", () => {
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
      headerProfileMenu.style.display = "flex";
      setTimeout(() => {
        headerProfileMenu.style.opacity = "1";
      }, 50);
      setTimeout(() => {
        headerProfileMenu.style.opacity = "0";
        setTimeout(() => {
          headerProfileMenu.style.display = "none";
        }, 500);
      }, 6000);
    });
  }

  // Попап формы обратной связи
  let popupForm = document.querySelector(".popupForm");
  let popupClose = document.querySelector(".popupForm__close");
  let dealBtn = document.querySelector(".deal__btn");
  let consultationBtn = document.querySelector(".consultation__btn");
  let outsourceServicesBtn = document.querySelector(".outs-services-bg__btn");

  function showPopup() {
    popupForm.style.display = "block";
    overlay.style.position = "fixed";
    overlay.style.display = "block";
    document.querySelector("body").style.overflowY = "hidden";
  }

  if (popupForm && popupClose) {
    popupClose.addEventListener("click", () => {
      popupForm.style.display = "none";
      overlay.style.display = "none";
      document.querySelector("body").style.overflowY = "visible";
    });
  }

  if (dealBtn) {
    dealBtn.addEventListener("click", () => {
      showPopup();
    });
  }

  if (consultationBtn) {
    consultationBtn.addEventListener("click", () => {
      showPopup();
    });
  }
  if (outsourceServicesBtn) {
    outsourceServicesBtn.addEventListener("click", () => {
      showPopup();
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
});
