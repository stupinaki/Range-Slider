const form = document.querySelector(".form");
const range = document.querySelector(".slider .progress");
const rangeInputs = document.querySelectorAll(".range-input input");
const numberInputs = document.querySelectorAll(".number-input input");

const minValue = 0;
const maxValue = 1000;

form.addEventListener('submit',  (e) => {
    e.preventDefault();
    postInputsValues();
    alert('Спасибо, что заполнили форму!')
})

function postInputsValues() {
    const range = {
        max: numberInputs[1].value,
        min: numberInputs[0].value,
    }
    fetch('some_url', {
        method: 'POST',
        body: JSON.stringify(range),
    })
}

rangeInputs.forEach(input => {
    input.addEventListener("input", onRangeInputChange);
});

numberInputs.forEach(input => {
    input.addEventListener('focus', onNumberInputFocus);
    input.addEventListener('blur', onNumberInputBlur);
    input.addEventListener('change', onNumberInputChange);
})

function onNumberInputChange() {
    const minCurrent = parseInt(numberInputs[0].value) || minValue;
    const maxCurrent = parseInt(numberInputs[1].value) || maxValue;
    onInputChange(minCurrent, maxCurrent);
}

function onRangeInputChange() {
    const minCurrent = parseInt(rangeInputs[0].value) || minValue;
    const maxCurrent = parseInt(rangeInputs[1].value) || maxValue;
    onInputChange(minCurrent, maxCurrent);
}

function onInputChange(minCurrent, maxCurrent) {
    numberInputs[0].value = setValidValue(minCurrent);
    numberInputs[1].value = setValidValue(maxCurrent);
    checkAndSwap(numberInputs[0], numberInputs[1]);

    rangeInputs[0].value = setValidValue(minCurrent);
    rangeInputs[1].value = setValidValue(maxCurrent);
    fillProgressBar(numberInputs[0].value, numberInputs[1].value);
}

function onNumberInputFocus(e) {
    e.target.select();
}

function onNumberInputBlur(e) {
    e.target.value = e.target.className === "input-min"
        ? (e.target.value || minValue)
        : (e.target.value || maxValue);
}

function setValidValue(current) {
    if (current < minValue) {
        return minValue;
    }
    return current > maxValue ? maxValue : current;
}

function checkAndSwap(numberInputMin, numberInputMax) {
    const minCurrent = parseInt(numberInputMin.value);
    const maxCurrent = parseInt(numberInputMax.value);
    const isNeedSwap = minCurrent > maxCurrent;

    if (isNeedSwap) {
        numberInputMin.value = maxCurrent;
        numberInputMax.value = minCurrent;
    }
}

function fillProgressBar(minInputValue, maxInputValue) {
    range.style.left = ((minInputValue / maxValue) * 100) + "%";
    range.style.right = (((maxValue - maxInputValue) / maxValue) * 100) + "%";
}






