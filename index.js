const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

var timer;

const formatTime = (time) =>
    `${time.hour < 10 ? "0" + time.hour : time.hour}:${
        time.minute < 10 ? "0" + time.minute : time.minute
    }:${time.second < 10 ? "0" + time.second : time.second}`;

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
    return (seconds) => {
        const time = {
            hour: 0,
            minute: 0,
            second: 0,
        };
        time.hour = Math.floor(seconds / 3600);
        time.minute = Math.floor((seconds - time.hour * 3600) / 60);
        time.second = seconds % 60;
        timerEl.innerText = formatTime(time);

        timer = setInterval(() => {
            time.second -= 1;
            if (time.second < 0) {
                time.second = 59;
                time.minute -= 1;
            }
            if (time.minute < 0) {
                time.minute = 59;
                time.hour -= 1;
            }
            if (time.hour === 0 && time.minute === 0 && time.second === 0)
                clearInterval(timer);
            timerEl.innerText = formatTime(time);
        }, 1000);
    };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
    // Очистите input так, чтобы в значении
    // оставались только числа
    inputEl.value = inputEl.value.replace(/\D/g, "");
});

buttonEl.addEventListener("click", () => {
    const seconds = Number(inputEl.value);

    clearInterval(timer);

    animateTimer(seconds);

    inputEl.value = "";
});
