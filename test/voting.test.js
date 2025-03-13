/**
 * @jest-environment jsdom
 */
import { jest } from "@jest/globals";

// Імпортуємо файл з кодом голосування
import "../src/voting";

describe("Тестування логіки голосування", () => {
    let voteButtons, chartCanvas;

    beforeEach(() => {
        // Імітуємо HTML-структуру
        document.body.innerHTML = `
            <canvas id="voteChart"></canvas>
            <button class="vote-btn" data-candidate="sadova">Голосувати за Садову</button>
            <button class="vote-btn" data-candidate="holovatenko">Голосувати за Головатенка</button>
        `;

        // Емуляція елементів
        voteButtons = document.querySelectorAll(".vote-btn");
        chartCanvas = document.getElementById("voteChart");

        // Очищуємо localStorage перед кожним тестом
        localStorage.clear();
    });

    test("Користувач може голосувати тільки один раз", () => {
        localStorage.setItem("hasVoted", "true"); // Симулюємо вже зроблене голосування

        const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

        voteButtons[0].click(); // Натискаємо кнопку голосування

        expect(alertMock).toHaveBeenCalledWith("Ви вже голосували!");
        expect(localStorage.getItem("votes")).toBeNull(); // Голоси не повинні оновитися

        alertMock.mockRestore();
    });

    test("Голос додається правильно", () => {
        const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

        voteButtons[0].click(); // Голос за Садову

        const votes = JSON.parse(localStorage.getItem("votes"));

        expect(votes.sadova).toBe(1);
        expect(votes.holovatenko).toBe(0);
        expect(localStorage.getItem("hasVoted")).toBe("true");

        alertMock.mockRestore();
    });

    test("Неголосуючий користувач отримує попередження", () => {
        // Симулюємо користувача, який не є студентом
        window.user = { isAuthenticated: true, role: "викладач" };

        const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

        voteButtons[1].click(); // Спроба голосувати

        expect(alertMock).toHaveBeenCalledWith("Голосувати можуть лише авторизовані студенти!");
        expect(localStorage.getItem("votes")).toBeNull(); // Голос не додається

        alertMock.mockRestore();
    });
});
