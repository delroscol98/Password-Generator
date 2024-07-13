const rangeInput = document.querySelector(".characterLength__range");
const rangeNumber = document.querySelector(".characterLength__number");

const rangeInputHandler = () => {
  const sliderVal = rangeInput.value;
  rangeInput.style.background = `linear-gradient(to right, #a4ffaf ${
    sliderVal * 5
  }%, #18171f ${sliderVal * 5}%)`;
  rangeNumber.innerText = sliderVal;
};

rangeInput.addEventListener("input", rangeInputHandler);
