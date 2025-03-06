const modal = document.getElementById("loginModal");

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header-main");
    const main = document.querySelector("main");

    function updateMainPadding() {
        const headerHeight = header.offsetHeight;
        main.style.paddingTop = headerHeight + "px";
    }

    updateMainPadding();
    window.addEventListener("resize", updateMainPadding);
});

document.addEventListener("DOMContentLoaded", function () {
    let btn = document.querySelector(".login-btn");
    let closeBtn = document.querySelector(".close");

    /*btn.addEventListener("click", function () {
        modal.style.display = "block";
    });*/

    btn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let btn = document.querySelector(".login-btn");
    let closeBtn = document.querySelector(".close");

    btn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});



// Перевірка форми перед відправкою
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let login = document.getElementById("login");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let role = document.getElementById("role");

    let loginError = document.getElementById("loginError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let roleError = document.getElementById("roleError");

    let isValid = true;

    // Очистка попередніх помилок
    loginError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    roleError.textContent = "";

    // Перевірка логіну
    if (login.value.trim().length < 3) {
        loginError.textContent = "Логін повинен містити щонайменше 3 символи.";
        loginError.style.display = "block";
        isValid = false;
    } else {
        loginError.style.display = "none";
    }

    // Перевірка email
    let emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Введіть правильну адресу електронної пошти.";
        emailError.style.display = "block";
        isValid = false;
    } else {
        emailError.style.display = "none";
    }

    // Перевірка пароля
    if (password.value.trim().length < 6) {
        passwordError.textContent = "Пароль повинен містити щонайменше 6 символів.";
        passwordError.style.display = "block";
        isValid = false;
    } else {
        passwordError.style.display = "none";
    }

    // Перевірка ролі
    if (role.value === "") {
        roleError.textContent = "Оберіть вашу роль.";
        roleError.style.display = "block";
        isValid = false;
    } else {
        roleError.style.display = "none";
    }

    // Якщо форма пройшла валідацію
    if (isValid) {
        alert("Успішний вхід!");
        modal.style.display = "none";

        login.value = "";
        email.value = "";
        password.value = "";
        role.selectedIndex = 0;
    }
});
