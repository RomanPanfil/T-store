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
  

});