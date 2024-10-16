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
  }
};


document.addEventListener('DOMContentLoaded', () => {

  $('.ui-select, .ui-checkbox').styler();

  // клик по карточке продукта
  (function () { 
    const productCards = document.querySelectorAll('.products-card');

    productCards.forEach(card => {
      card.addEventListener('click', (event) => {
        if (!event.target.closest('.products-card-like') && !event.target.closest('.products-card-basket')) {
          const href = card.dataset.href;

          if (href) {
            window.location.href = href;
          }
        }
      });
    });  
  })();

  // бургер-меню
  (function() {
    const burgerBtn = document.querySelector('.burger-btn');
    const burgerBtnIcon = document.querySelector('.burger-btn span');
    const headerNav = document.querySelector('.header-nav-wrapper');

    if(!burgerBtn) return

    burgerBtn.addEventListener('click', () => {
      if(burgerBtnIcon && headerNav) {
        burgerBtnIcon.classList.toggle('active');
        headerNav.classList.toggle('active');
        document.querySelector('.wrapper').classList.toggle('non-scroll');
      }
      
    })
  })();
  
  // навигация планшет и мобайл
  (function() {
    const items = document.querySelectorAll('.header-nav > ul > li');
    const btn = document.querySelector('.header-full');
    
    function handleNavigation() {
      if (window.innerWidth < 1140) {
        items.forEach(item => {
          item.addEventListener('click', toggleNavigation);
        });
      } else {
        items.forEach(item => {
          item.removeEventListener('click', toggleNavigation);
          item.classList.remove('active', 'hidden');
        });
        btn.classList.remove('hidden');
      }
    }

    function toggleNavigation() {     
      this.classList.toggle('active');
      btn.classList.toggle('hidden');
      items.forEach(otherItem => {
        if (otherItem !== this) {
          otherItem.classList.toggle('hidden');
        }
      });
    }

    handleNavigation();
    window.addEventListener('resize', handleNavigation);
  })();

  // отображение фильтров каталога на мобильном разрешении
  (function() {
    const button = document.querySelector('.catalog-filter-select.more');
    const filters = document.querySelector('.filters');
    const close = document.querySelector('.filters-close');

    if(!button || !filters || !close) return

    button.addEventListener('click', () => {
      filters.classList.add('show');
    })

    close.addEventListener('click', () => {
      filters.classList.remove('show');
    })

  })();

 // скрытие/раскрытие фильтра
  (function() {
    const triggers = document.querySelectorAll('.filters-item-trigger');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {      
        const body = trigger.parentElement.querySelector('.filters-item-body'); 
        const isExpanded = trigger.classList.contains('show');

        trigger.classList.toggle('show');
        body.classList.toggle('show');

        // Обновляем aria-expanded для доступности
        trigger.setAttribute('aria-expanded', !isExpanded);
        
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
  (function() {
    const searchInput = document.querySelector('.filters-item-search .ui-input__search');
    const filterPositions = document.querySelectorAll('.filters-item-position');

    if(!searchInput) return
  
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
  
      filterPositions.forEach(position => {
        const text = position.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          position.style.display = '';
        } else {
          position.style.display = 'none';
        }
      });
  
      // Обновляем высоту родительского элемента для корректной анимации
      const filtersItemBody = this.closest('.filters-item-body');
      if (filtersItemBody.classList.contains('show')) {
        filtersItemBody.style.maxHeight = filtersItemBody.scrollHeight + "px";
      }
    });
  
    // Добавляем обработчик для кнопки поиска
    const searchButton = document.querySelector('.filters-item-search .search-btn');

    if(!searchButton) return

    searchButton.addEventListener('click', function(e) {
      e.preventDefault(); // Предотвращаем отправку формы
      searchInput.dispatchEvent(new Event('input')); // Вызываем событие input для обновления результатов
    });
  })();

  // очистить все чекбоксы в фильтре
  (function() {
    const clearButton = document.querySelector('.filters-clear');

    if(!clearButton) return
    
    clearButton.addEventListener('click', function() {
      const checkboxes = document.querySelectorAll('.filters-item-position .ui-checkbox');
      
      checkboxes.forEach(checkbox => {
        // Снимаем выделение с чекбокса
        checkbox.checked = false;
        
        // Обновляем состояние в Form Styler
        if ($.fn.styler) {
          $(checkbox).trigger('refresh');
        }
      });
    });
    
  })();

  (function() {
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
      }
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
      }
    });  
    
  })();

  // Табы
  (function() {    
    const tabContainers = document.querySelectorAll('.ui-tabs');
  
    tabContainers.forEach(container => {
      const tabs = container.querySelectorAll('.ui-tab');
      const tabsWrapper = container.nextElementSibling;
      const tabContents = tabsWrapper.querySelectorAll('.ui-tabs-content');
  
      tabs.forEach(tab => {
        tab.addEventListener('click', function() {      
          tabs.forEach(t => t.classList.remove('active'));         

          this.classList.add('active');  

          tabContents.forEach(content => {
            content.style.opacity = '0';
            content.style.display = 'none';
          });  

          const targetContent = tabsWrapper.querySelector(`.ui-tabs-content[data-id="${this.id}"]`);
          
          // Показываем нужный контент с анимацией
          if (targetContent) {
            targetContent.style.display = 'block';
            setTimeout(() => {
              targetContent.style.opacity = '1';
            }, 50);
          }
        });
      });
  
      // Активируем первый таб в каждом контейнере при загрузке страницы
      tabs[0].click();
    });
   

  })();

  // Поделиться
  (function() {
   
      const shareInput = document.querySelector('.plan-share .ui-input');

      if(!shareInput) return
      
      // Установка текущего URL в поле ввода
      shareInput.value = window.location.href;
      
      // Обработчик клика для копирования ссылки
      shareInput.addEventListener('click', function() {
        this.select();
        document.execCommand('copy');
        
        // Опционально: показать уведомление о копировании
        // alert('Ссылка скопирована в буфер обмена');
      });
   
  })();

  // слайдер новостей
  (function() {
    if (!document.querySelector('.recommended-slider')) return
  
    var swiper = new Swiper('.recommended-slider', {   
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
      }
    });  
  })();

  // выбрать все
  (function() {    
      const selectAllLabel = document.querySelector('.shopping-cart-item-position');
      const selectAllCheckbox = selectAllLabel.querySelector('.ui-checkbox');
      const itemCheckboxes = document.querySelectorAll('.shopping-cart-item-checkbox');
      
      if(!selectAllLabel || !selectAllCheckbox) {    
        return;
      }
      
      selectAllLabel.addEventListener('click', function(e) { 
        e.preventDefault();        
      
        selectAllCheckbox.checked = !selectAllCheckbox.checked;
        const isChecked = selectAllCheckbox.checked;     
        
        // Обновляем все чекбоксы товаров
        itemCheckboxes.forEach(checkbox => {
          checkbox.checked = isChecked;                  
          
          if ($.fn.styler) {
            $(checkbox).trigger('refresh');
          }
        });        
       
        if ($.fn.styler) {
          $(selectAllCheckbox).trigger('refresh');
        }
      });
      
      // Обновление состояния "Select all" при изменении отдельных чекбоксов
      itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectAllState);
      });
    
      function updateSelectAllState() {
        const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
        selectAllCheckbox.checked = allChecked;
        
        if ($.fn.styler) {
          $(selectAllCheckbox).trigger('refresh');
        }       
      }  
  })();

});



