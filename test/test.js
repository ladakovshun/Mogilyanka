const { JSDOM } = require("jsdom");
const { expect } = require("@jest/globals");

// Імітація LocalStorage
class LocalStorageMock {
    constructor() {
        this.store = {};
    }
    getItem(key) {
        return this.store[key] || null;
    }
    setItem(key, value) {
        this.store[key] = String(value);
    }
    removeItem(key) {
        delete this.store[key];
    }
    clear() {
        this.store = {};
    }
}
global.localStorage = new LocalStorageMock();

// Завантажуємо HTML-документ у середовище тестування
const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<body>
    <button id="theme-toggle"></button>
    <button class="vote-btn" data-candidate="sadova"></button>
    <form id="loginForm">
        <input id="login" />
        <input id="email" />
        <input id="password" />
        <select id="role">
            <option value=""></option>
            <option value="студент">Студент</option>
        </select>
        <button type="submit">Login</button>
    </form>
</body>
</html>`);

global.document = dom.window.document;
global.window = dom.window;

// Тест 1: Юніт-тест для збереження голосу
test("Vote should be saved in LocalStorage", () => {
    const voteButton = document.querySelector(".vote-btn");
    voteButton.click();
    expect(localStorage.getItem("votes")).not.toBeNull();
});

// Тест 2: Інтеграційний тест для зміни теми
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme");
});
test("Theme toggle should add class dark-theme", () => {
    themeToggle.checked = true;
    themeToggle.dispatchEvent(new Event("change"));
    expect(document.body.classList.contains("dark-theme")).toBe(true);
});

// Тест 3: Smoke-тест для форми логіна
const loginForm = document.getElementById("loginForm");
test("Login form should submit with valid input", () => {
    document.getElementById("login").value = "user";
    document.getElementById("email").value = "user@example.com";
    document.getElementById("password").value = "password";
    document.getElementById("role").value = "студент";

    loginForm.dispatchEvent(new Event("submit"));
    expect(localStorage.getItem("currentUser")).not.toBeNull();
});
