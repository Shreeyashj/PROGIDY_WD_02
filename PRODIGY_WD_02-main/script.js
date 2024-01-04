document.addEventListener("DOMContentLoaded", function () {
    const minutesElement = document.querySelector(".minutes");
    const secondsElement = document.querySelector(".seconds");
    const milisecondsElement = document.querySelector(".miliseconds");
    const startButton = document.querySelector(".start");
    const resetButton = document.querySelector(".reset");
    const lapsButton = document.querySelector(".laps");
    const clearLapsButton = document.querySelector(".clear-laps");
    const lapsContainer = document.querySelector(".laps-container");

    let timer;
    let startTime;
    let isRunning = false;
    let pauseTime; 

    function updateTimer() {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;

        const minutes = Math.floor(elapsedTime / (60 * 1000));
        const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
        const miliseconds = Math.floor((elapsedTime % 1000) / 10);

        minutesElement.textContent = padNumber(minutes) + ":";
        secondsElement.textContent = padNumber(seconds) + ":";
        milisecondsElement.textContent = padNumber(miliseconds);
    }

    function padNumber(number) {
        return number < 10 ? "0" + number : number;
    }

    function startStopwatch() {
        if (!isRunning) {
            if (!startTime) {
                startTime = new Date().getTime();
            } else {
                const pausedTime = new Date().getTime() - pauseTime;
                startTime += pausedTime;
                pauseTime = null;
            }
    
            timer = setInterval(updateTimer, 10);
            isRunning = true;
            startButton.textContent = "Pause";
            resetButton.classList.remove("dont-show");
            lapsButton.classList.remove("dont-show");
        } else {
            clearInterval(timer);
            isRunning = false;
            startButton.textContent = "Resume";
            pauseTime = new Date().getTime(); 
        }
    }
    

    function resetStopwatch() {
        clearInterval(timer);
        isRunning = false;
        startButton.textContent = "Start";
        minutesElement.textContent = "00:";
        secondsElement.textContent = "00:";
        milisecondsElement.textContent = "00";
        resetButton.classList.add("dont-show");
        lapsButton.classList.add("dont-show");
        lapsContainer.innerHTML = "";
        startTime = null; 
        pauseTime = null;
    }

    function lapStopwatch() {
        const lapTime = `${minutesElement.textContent}${secondsElement.textContent}${milisecondsElement.textContent}`;
        const lapItem = document.createElement("div");
        lapItem.classList.add("lap-item");
    
        const lapNumber = document.createElement("span");
        lapNumber.classList.add("lap-number");
        lapNumber.textContent = lapsContainer.childElementCount + 1 + ". ";

        const lapTimeSpan = document.createElement("span");
        lapTimeSpan.textContent = lapTime;
    
        lapItem.appendChild(lapNumber);
        lapItem.appendChild(lapTimeSpan);
    
        lapsContainer.appendChild(lapItem);
    }

    function clearLaps() {
        const lapsItems = document.querySelectorAll(".lap-item");
            if (lapsItems.length > 0) {
            lapsItems[lapsItems.length - 1].remove();
        }
    }

    startButton.addEventListener("click", startStopwatch);
    resetButton.addEventListener("click", resetStopwatch);
    lapsButton.addEventListener("click", lapStopwatch);
    clearLapsButton.addEventListener("click", clearLaps);
});
