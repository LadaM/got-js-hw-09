'use strict'

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`
}

const startButton = document.querySelector('[data-start]')
const stopButton = document.querySelector('[data-stop]')
let colorInterval = null

function toggleButtonDisabled() {
    startButton.disabled = !startButton.disabled
    stopButton.disabled = !stopButton.disabled
}

const startColorSwitching = () => {
    if (colorInterval) return // Prevent multiple intervals from being set
    colorInterval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000)
    toggleButtonDisabled()
}

const stopColorSwitching = () => {
    clearInterval(colorInterval)
    colorInterval = null
    toggleButtonDisabled()
}

startButton.addEventListener('click', startColorSwitching)
stopButton.addEventListener('click', stopColorSwitching)
