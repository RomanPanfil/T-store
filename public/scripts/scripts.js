const FARBA = {
  //lazy load для сторонних либ
  lazyLibraryLoad(scriptSrc, linkHref, callback) {
    let script;
    const domScript = document.querySelector(`script[src="${scriptSrc}"]`);
    const domLink = document.querySelector(`link[href="${linkHref}"]`);

    if (!domScript) {
      script = document.createElement("script");
      script.src = scriptSrc;
      document.querySelector("#wrapper").after(script);
    }

    if (linkHref !== "" && !domLink) {
      let style = document.createElement("link");
      style.href = linkHref;
      style.rel = "stylesheet";
      document.querySelector("link").before(style);
    }

    if (!domScript) {
      script.onload = callback;
    } else {
      domScript.onload = callback;
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  $(".ui-select, .ui-checkbox").styler();

  // клик по карточке продукта
  (function () {
    const productCards = document.querySelectorAll(".products-card");

    productCards.forEach((card) => {
      card.addEventListener("click", (event) => {
        if (
          !event.target.closest(".products-card-like") &&
          !event.target.closest(".products-card-basket")
        ) {
          const href = card.dataset.href;

          if (href) {
            window.location.href = href;
          }
        }
      });
    });
  })();

  // бургер-меню
  (function () {
    const burgerBtn = document.querySelector(".burger-btn");
    const burgerBtnIcon = document.querySelector(".burger-btn span");
    const headerNav = document.querySelector(".header-nav-wrapper");

    if (!burgerBtn) return;

    burgerBtn.addEventListener("click", () => {
      if (burgerBtnIcon && headerNav) {
        burgerBtnIcon.classList.toggle("active");
        headerNav.classList.toggle("active");
        document.querySelector(".wrapper").classList.toggle("non-scroll");
      }
    });
  })();

  // навигация планшет и мобайл
  (function () {
    const items = document.querySelectorAll(".header-nav > ul > li");
    const btn = document.querySelector(".header-full");

    function handleNavigation() {
      if (window.innerWidth < 1140) {
        items.forEach((item) => {
          item.addEventListener("click", toggleNavigation);
        });
      } else {
        items.forEach((item) => {
          item.removeEventListener("click", toggleNavigation);
          item.classList.remove("active", "hidden");
        });
        btn.classList.remove("hidden");
      }
    }

    function toggleNavigation() {
      this.classList.toggle("active");
      btn.classList.toggle("hidden");
      items.forEach((otherItem) => {
        if (otherItem !== this) {
          otherItem.classList.toggle("hidden");
        }
      });
    }

    handleNavigation();
    window.addEventListener("resize", handleNavigation);
  })();

  // отображение фильтров каталога на мобильном разрешении
  (function () {
    const button = document.querySelector(".catalog-filter-select.more");
    const filters = document.querySelector(".filters");
    const close = document.querySelector(".filters-close");

    if (!button || !filters || !close) return;

    button.addEventListener("click", () => {
      filters.classList.add("show");
    });

    close.addEventListener("click", () => {
      filters.classList.remove("show");
    });
  })();

  // скрытие/раскрытие фильтра
  (function () {
    const triggers = document.querySelectorAll(".filters-item-trigger");

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const body = trigger.parentElement.querySelector(".filters-item-body");
        const isExpanded = trigger.classList.contains("show");

        trigger.classList.toggle("show");
        body.classList.toggle("show");

        // Обновляем aria-expanded для доступности
        trigger.setAttribute("aria-expanded", !isExpanded);

        // Устанавливаем максимальную высоту для анимации
        if (!isExpanded) {
          body.style.maxHeight = body.scrollHeight + "px";
        } else {
          body.style.maxHeight = null;
        }
      });
    });
  })();

  // поиск в фильтре
  (function () {
    const searchInput = document.querySelector(
      ".filters-item-search .ui-input__search"
    );
    const filterPositions = document.querySelectorAll(".filters-item-position");

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase().trim();

      filterPositions.forEach((position) => {
        const text = position.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          position.style.display = "";
        } else {
          position.style.display = "none";
        }
      });

      // Обновляем высоту родительского элемента для корректной анимации
      const filtersItemBody = this.closest(".filters-item-body");
      if (filtersItemBody.classList.contains("show")) {
        filtersItemBody.style.maxHeight = filtersItemBody.scrollHeight + "px";
      }
    });

    // Добавляем обработчик для кнопки поиска
    const searchButton = document.querySelector(
      ".filters-item-search .search-btn"
    );

    if (!searchButton) return;

    searchButton.addEventListener("click", function (e) {
      e.preventDefault(); // Предотвращаем отправку формы
      searchInput.dispatchEvent(new Event("input")); // Вызываем событие input для обновления результатов
    });
  })();

  // очистить все чекбоксы в фильтре
  (function () {
    const clearButton = document.querySelector(".filters-clear");

    if (!clearButton) return;

    clearButton.addEventListener("click", function () {
      const checkboxes = document.querySelectorAll(
        ".filters-item-position .ui-checkbox"
      );

      checkboxes.forEach((checkbox) => {
        // Снимаем выделение с чекбокса
        checkbox.checked = false;

        // Обновляем состояние в Form Styler
        if ($.fn.styler) {
          $(checkbox).trigger("refresh");
        }
      });
    });
  })();

  (function () {
    var swiper = new Swiper(".planSwiperPreview", {
      loop: true,
      spaceBetween: 12,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      grabCursor: true,
      breakpoints: {
        600: {
          spaceBetween: 20,
        },
      },
    });
    var swiper2 = new Swiper(".planSwiper", {
      loop: true,
      spaceBetween: 12,
      grabCursor: true,
      thumbs: {
        swiper: swiper,
      },
      breakpoints: {
        600: {
          spaceBetween: 20,
        },
      },
    });
  })();

  // Табы
  (function () {
    const tabContainers = document.querySelectorAll(".ui-tabs");

    tabContainers.forEach((container) => {
      const tabs = container.querySelectorAll(".ui-tab");
      const tabsWrapper = container.nextElementSibling;
      const tabContents = tabsWrapper.querySelectorAll(".ui-tabs-content");

      tabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          tabs.forEach((t) => t.classList.remove("active"));

          this.classList.add("active");

          tabContents.forEach((content) => {
            content.style.opacity = "0";
            content.style.display = "none";
          });

          const targetContent = tabsWrapper.querySelector(
            `.ui-tabs-content[data-id="${this.id}"]`
          );

          // Показываем нужный контент с анимацией
          if (targetContent) {
            targetContent.style.display = "block";
            setTimeout(() => {
              targetContent.style.opacity = "1";
            }, 50);
          }
        });
      });

      // Активируем первый таб в каждом контейнере при загрузке страницы
      tabs[0].click();
    });
  })();

  // Поделиться
  (function () {
    const shareInput = document.querySelector(".plan-share .ui-input");

    if (!shareInput) return;

    // Установка текущего URL в поле ввода
    shareInput.value = window.location.href;

    // Обработчик клика для копирования ссылки
    shareInput.addEventListener("click", function () {
      this.select();
      document.execCommand("copy");

      // Опционально: показать уведомление о копировании
      // alert('Ссылка скопирована в буфер обмена');
    });
  })();

  // слайдер новостей
  (function () {
    if (!document.querySelector(".recommended-slider")) return;

    var swiper = new Swiper(".recommended-slider", {
      grabCursor: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20,
      // autoHeight: true,
      autoplay: true,
      loop: true,
      navigation: {
        nextEl: ".plan-products .slider-arrow__next",
        prevEl: ".plan-products .slider-arrow__prev",
      },
      breakpoints: {
        599: {
          slidesPerView: 2,
          spaceBetween: 20,
          autoplay: false,
          loop: false,
        },
        769: {
          slidesPerView: 3,
          spaceBetween: 20,
          autoplay: false,
          loop: false,
        },
        1025: {
          slidesPerView: 4,
          spaceBetween: 24,
          autoplay: false,
          loop: false,
        },
      },
    });
  })();

  // выбрать все
  (function () {
    const selectAllLabel = document.querySelector(
      ".shopping-cart-item-position"
    );
    const selectAllCheckbox = selectAllLabel?.querySelector(".ui-checkbox");
    const itemCheckboxes = document.querySelectorAll(
      ".shopping-cart-item-checkbox"
    );

    // if(!selectAllLabel || !selectAllCheckbox) {
    //   return;
    // }
    if (selectAllLabel && selectAllCheckbox) {
      selectAllLabel.addEventListener("click", function (e) {
        e.preventDefault();

        selectAllCheckbox.checked = !selectAllCheckbox.checked;
        const isChecked = selectAllCheckbox.checked;

        // Обновляем все чекбоксы товаров
        itemCheckboxes.forEach((checkbox) => {
          checkbox.checked = isChecked;

          if ($.fn.styler) {
            $(checkbox).trigger("refresh");
          }
        });

        if ($.fn.styler) {
          $(selectAllCheckbox).trigger("refresh");
        }
      });
    }

    // Обновление состояния "Select all" при изменении отдельных чекбоксов
    if (itemCheckboxes.length > 0) {
      itemCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", updateSelectAllState);
      });
    }

    function updateSelectAllState() {
      const allChecked = Array.from(itemCheckboxes).every((cb) => cb.checked);
      selectAllCheckbox.checked = allChecked;

      if ($.fn.styler) {
        $(selectAllCheckbox).trigger("refresh");
      }
    }

    const starFormArr = document.querySelectorAll('[data-controller="stars"]');
    starFormArr.forEach((f) => {
      const labels = f.querySelectorAll("label");
      const inChecked = f.querySelector("input:checked");

      if (inChecked) {
        for (let i = 1; i <= inChecked.value; i++) {
          labels[i - 1].classList.add("active");
        }
      }

      labels.forEach((label) => {
        label.addEventListener("click", (e) => {
          e.stopPropagation();
          const input = label.querySelector("input");
          input.checked = true;

          for (let i = 1; i <= 5; i++) {
            if (i <= input.value) labels[i - 1].classList.add("active");
            else labels[i - 1].classList.remove("active");
          }
        });

        label.addEventListener("mouseover", function (e) {
          const current = label.querySelector("input").value;
          for (let i = 1; i <= current; i++) {
            labels[i - 1].classList.add("active");
          }
        });

        label.addEventListener("mouseout", function (e) {
          const inputChecked = f.querySelector("input:checked");
          const checked = inputChecked ? inputChecked.value : 0;
          const current = label.querySelector("input").value;
          for (let i = 1; i <= current; i++) {
            if (i > checked) labels[i - 1].classList.remove("active");
          }
        });
      });
    });
  })();

  (function () {
    const cards = document.querySelectorAll(".mbrship-card");

    cards.forEach((card) => {
      const toggles = card.querySelectorAll(".ui-toggle");

      toggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
          // Удаляем класс active у всех переключателей в текущей карточке
          toggles.forEach((t) => t.classList.remove("active"));
          // Добавляем класс active к текущему переключателю
          toggle.classList.add("active");
        });
      });
    });
  })();

  (function () {
    const chatMessages = document.querySelector(".chat-messages");

    if (chatMessages) {
      // Прокрутка к последнему сообщению
      const scrollToLastMessage = () => {
        chatMessages.style.scrollBehavior = "unset";
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatMessages.style.scrollBehavior = "smooth";
        chatMessages.style.opacity = 1;
      };

      scrollToLastMessage();
    }
  })();

  // (function () {
  //   const stickyContainer = $(".ui-sticky");
  //   if (stickyContainer.length > 0) {
  //     const stickyNode = stickyContainer.find(".ui-sticky-element");

  //     const minBreakpoint = Number(
  //       stickyContainer.attr("data-minBreakpoint") ?? 0
  //     );
  //     const maxBreakpoint = Number(
  //       stickyContainer.attr("data-maxBreakpoint") ?? 9999999
  //     );

  //     const stickyScroll = () => {
  //       if (
  //         window.innerWidth >= minBreakpoint &&
  //         window.innerWidth <= maxBreakpoint
  //       ) {
  //         let stPosTop = stickyContainer.offset().top;
  //         let stPosBottom = stPosTop + stickyContainer.height();

  //         const scroll = window.scrollY;
  //         const height = stickyNode.height();
  //         if (scroll >= stPosTop && scroll + height <= stPosBottom)
  //           stickyNode.css("transform", `translateY(${scroll - stPosTop}px`);
  //         else if (scroll < stPosTop) {
  //           stickyNode.css("transform", `translateY(0px)`);
  //         } else if (scroll + height > stPosBottom) {
  //           stickyNode.css(
  //             "transform",
  //             `translateY(${stickyContainer.height() - height}px)`
  //           );
  //         }
  //       } else {
  //         stickyNode.css("transform", `translateY(0px)`);
  //       }
  //     };

  //     stickyScroll();
  //     document.addEventListener("scroll", () => stickyScroll());
  //     window.addEventListener("resize", () => stickyScroll());
  //   }
  // })();

  (function () {
    const planListToggles = document.querySelectorAll(
      ".mbrship-card-choice .ui-toggle"
    );
    planListToggles.forEach((toggle) =>
      toggle.addEventListener("click", () => {
        const card = toggle.closest(".mbrship-card");
        const costNode = card.querySelector(".mbrship-card-price");
        const cost = toggle.getAttribute("data-cost");
        const type = toggle.getAttribute("data-type");
        const spanType = document.createElement("span");
        spanType.innerHTML = `/ ${type}`;

        if (cost && spanType) {
          costNode.innerHTML = `${cost}`;
          costNode.append(spanType);
        }
      })
    );
  })();

  (function () {
    const chatForm = $(".chat-panel");

    if (chatForm.length > 0) {
      const chatInput = $(".chat-panel-input");
      const chatSmiles = chatForm.find(".chat-panel-smiles svg");
      let limit = 100;

      chatSmiles.click(() => {
        document.querySelector(".emojionearea-button-open").click();
      });

      const em = $(".chat-panel-smiles-hidden").emojioneArea({});

      em[0].emojioneArea.on("emojibtn.click", function (btn, event) {
        chatInput.select();
      });

      chatForm.on("click", () => chatInput.select());

      $('[name="emodji"]').on("change", function () {
        const val = chatInput.val();
        const emodji = document
          .querySelector(".emojionearea-editor > img:first-of-type")
          .getAttribute("alt");
        chatInput.val(val + emodji);
      });

      const checkEmptyText = () => {
        if (!chatInput.val()) chatInput.css("height", "unset");
      };

      const checkRows = () => {
        if (window.innerWidth < 360) {
          chatInput.attr("rows", 1);
        } else if (window.innerWidth < 480) {
          chatInput.attr("rows", 3);
        } else {
          chatInput.attr("rows", 1);
        }
      };

      chatInput.on("input", () => checkEmptyText());
      chatInput.on("change", () => checkEmptyText());

      chatInput.autoResize({
        onResize: function () {
          checkEmptyText();
        },
        animateCallback: function () {
          checkEmptyText();
        },
        limit: limit,
      });

      checkRows();
      window.addEventListener("resize", () => checkRows());
    }
  })();

  (function () {
    const showPopup = (url) => {
      $.magnificPopup.open({
        delegate: "a",
        removalDelay: 500,
        items: {
          src: `popups/${url}.html`,
        },
        type: "ajax",
        overflowY: "scroll",
        mainClass: "mfp-fade",
        ajax: {
          tError: "Error. Not valid url",
        },
      });
    };

    $("[data-modal]").click(function (e) {
      e.preventDefault();
      element = $(this);
      showPopup($(this).data("modal"));
    });
  })();

  $.validator.addMethod(
    "noDigits",
    function (value, element) {
      return this.optional(element) || !/\d/.test(value);
    },
    "You cannot enter numbers in this field."
  );

  if ($(".ui-sticky").length) {
    if ($(".ui-sticky-node").height() < $(".ui-sticky-element").height())
      $(".ui-sticky-node").height($(".ui-sticky-element").height());

    const stickyScroll = () => {
      var windowOffset = $(window).scrollTop(),
        floatOffset = $(".ui-sticky-node").offset().top,
        contentHeight = $(".ui-sticky").height(),
        floatHeight = $(".ui-sticky-element").height(),
        floatStop = floatOffset + contentHeight - floatHeight;

      if (windowOffset > floatOffset && windowOffset < floatStop) {
        $(".ui-sticky-element").addClass("float").removeClass("flip-bottom");
      } else {
        $(".ui-sticky-element").removeClass("float").addClass("flip-bottom");

        if (windowOffset < floatStop) {
          $(".ui-sticky-element").removeClass("flip-bottom");
        }
      }
    };
    $(window).on("scroll", () => stickyScroll());

    stickyScroll();
  } //if end
});
