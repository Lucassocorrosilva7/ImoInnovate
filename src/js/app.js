 var swiper = new Swiper(".mySwiper", {
        effect: "cards",
        grabCursor: true
      });

const year = document.querySelector('.year');

const date = new Date();

year.innerHTML = date.getFullYear();