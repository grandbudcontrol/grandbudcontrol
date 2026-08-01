//========================
// BURGER MENU
//========================

const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");
const closeMenu = document.querySelector(".close-menu");

function openMenu() {
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function hideMenu() {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
}

burger.addEventListener("click", openMenu);

closeMenu.addEventListener("click", hideMenu);

overlay.addEventListener("click", hideMenu);

document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", hideMenu);

});

//========================
// MODAL
//========================

const modal = document.querySelector(".modal");

const consultationBtns = document.querySelectorAll(".consultation-btn");

const closeModal = document.querySelector(".close-modal");

consultationBtns.forEach(button => {

    button.addEventListener("click", () => {

        modal.classList.add("active");
        document.body.style.overflow = "hidden";

    });

});

closeModal.addEventListener("click", closePopup);

modal.addEventListener("click", e => {

    if (e.target === modal) {

        closePopup();

    }

});

function closePopup() {

    modal.classList.remove("active");
    document.body.style.overflow = "";

}

//========================
// ESC
//========================

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        closePopup();
        hideMenu();

    }

});

//========================
// SMOOTH SCROLL
//========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

//========================
// HEADER
//========================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.style.boxShadow = "0 15px 40px rgba(0,0,0,.08)";

    } else {

        header.style.boxShadow = "";

    }

});

//========================
// REVEAL ANIMATION
//========================

const revealElements = document.querySelectorAll(
    ".section-title,.service-card,.project-card,.experience-card,.number-item,.contact-info,.map,.about-image,.about-content,.cta-box"
);

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("fade-up");
            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .15

});

revealElements.forEach(el => {

    el.classList.add("fade-up");

    observer.observe(el);

});

//========================
// COUNTERS
//========================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = +counter.dataset.target;

        let value = 0;

        const speed = target / 90;

        const update = () => {

            value += speed;

            if (value < target) {

                counter.innerText = Math.floor(value) + "+";

                requestAnimationFrame(update);

            } else {

                counter.innerText = target + "+";

            }

        };

        update();

        counterObserver.unobserve(counter);

    });

}, {

    threshold: .5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});

//========================
// TELEGRAM FORM
//========================

const form = document.getElementById("telegramForm");
const phoneInput = document.getElementById("phone");

const mask = IMask(phoneInput, {
    mask: '+{380} (00) 000-00-00',
    lazy: true
});

mask.value = '+380 ';

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const digits = mask.unmaskedValue;

    // після +380 повинно бути 9 цифр
    if (digits.length !== 12) {
        alert("Введіть повний номер телефону.");
        phoneInput.focus();
        return;
    }

fetch("https://grandbudcontrol-bot.grandbudcontrol.workers.dev/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: form.name.value,
        phone: form.phone.value,
        service: form.service.value,
        message: form.message.value
    })
})
.then(response => response.json())
.then(data => {

    if (data.success) {

        alert("Дякуємо! Ваша заявка успішно відправлена. Наш менеджер зв'яжеться з Вами протягом кількох хвилин.");

        form.reset();
        mask.value = "+380 ";
        closePopup();

    } else {

        alert("Помилка при відправці заявки.");

    }

})
.catch(error => {

    console.error(error);
    alert("Помилка при відправці заявки.");

});

});

//========================
// ACTIVE MENU
//========================

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        if (window.scrollY >= top) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

//========================
// PRELOADER IMAGES
//========================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});