document.addEventListener('DOMContentLoaded', () => {
  // Табы
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    })

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    })
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade')
    tabsContent[i].classList.remove('hide')
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;

    if(target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if(target == item) {
          hideTabContent();
          showTabContent(i);
        }
      })
    }
  })

  // Таймер

  const deadline = '2024-11-11';

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;

    const t = Date.parse(endtime) - Date.parse(new Date());

    if(t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);
    }

    return {
      'total': t,
      days,
      hours,
      minutes,
      seconds
    }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds');

    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if(t.total <= 0) clearInterval(timeInterval);
    }
  }

  setClock('.timer', deadline);

   // Modal

   const modal = document.querySelector('.modal');
   const openBtns = document.querySelectorAll('[data-modal]');

   function openModal() {
     modal.classList.add('show');
     modal.classList.remove('hide');
     document.body.style.overflow = 'hidden';

     clearInterval(modalTimerId);
   };

   function closeModal() {
     modal.classList.add('hide');
     modal.classList.remove('show');
     document.body.style.overflow = '';
   };

   openBtns.forEach(btn => {
     btn.addEventListener('click', openModal)
   });

   modal.addEventListener('click', (e) => {
     if(e.target == modal || e.target.getAttribute('data-close') == '') closeModal();
   });

   document.addEventListener('keydown', (e) => {
     if(e.code === 'Escape' && modal.classList.contains('show')) closeModal();
   });

   // Функционал по открыванию модалки после прокрутки

   const modalTimerId = setTimeout(openModal, 50000);

   // function showModalByScroll() {
   //   if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
   //     openModal();
   //     window.removeEventListener('scroll', showModalByScroll);
   //   }
   // }

   // Скролл выключен, так как он багован
   // window.addEventListener('scroll', showModalByScroll);
})