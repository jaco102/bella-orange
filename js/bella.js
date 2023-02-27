/**
 *
 * @param {string} selector
 * @param {IntersectionObserverInit & {cb:(el:HTMLElement)=>void;className:string}} options
 */
function scrollTrigger(selector, options) {
  let els = document.querySelectorAll(selector);
  els = Array.from(els);
  els.forEach((el) => {
    addObserver(el, options, options.className);
  });
}

/**
 *
 * @param {HTMLElement} el
 * @param {IntersectionObserverInit & {cb:(el:HTMLElement)=>void}} options
 * @param {string} className
 */
function addObserver(el, options, className) {
  if (!('IntersectionObserver' in window)) {
    if (options.cb) {
      options.cb(el);
    } else {
      entry.target.classList.add(className);
    }
    return;
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (options.cb) {
          options.cb(el);
        } else {
          entry.target.classList.add(className);
        }
        observer.unobserve(entry.target);
      }
    });
  }, options);

  observer.observe(el);
}

scrollTrigger('.container > div:nth-child(5) > div:last-child > div:first-child', {
  rootMargin: '-100px',
  className: 'slide-left',
});

scrollTrigger('.container > div:nth-child(6) > div:first-child > div:first-child ', {
  rootMargin: '-100px',
  className: 'slide-right',
});

scrollTrigger('.container > div:nth-child(5) > div:last-child > div:last-child', {
  rootMargin: '-150px',
  className: 'slide-bottom',
});

scrollTrigger('.container > div:nth-child(6) > div:first-child > div:last-child', {
  rootMargin: '-150px',
  className: 'slide-bottom',
});
