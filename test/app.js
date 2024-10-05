let intervalChronograph, realTimeInterval;
let chronographSeconds = 0;
let chronographMinutes = 0;

// Get all elements for interaction
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');
const resetButton = document.getElementById('reset-btn');

// Hands for the main dial
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const mainSecondHand = document.querySelector('.main-second-hand');
const chronoMinuteHand = document.querySelector('.chrono-minute-hand');
const dial = document.querySelector('.dial');

// Hand for the real-time seconds sub-dial
const subSecondHand = document.querySelector('.sub-second-hand');

// Start the real-time second hand
function startRealTimeSecondHand() {
  const realTime = new Date();
  const ms = realTime.getMilliseconds();
  const roundedResult = Math.round((ms / 1000) * 4) / 4;

  const seconds = realTime.getSeconds();
  const realSecondDegrees = ((seconds + roundedResult) / 60) * 360;
  subSecondHand.style.transform = `rotate(${realSecondDegrees}deg)`;
  const minutes = realTime.getMinutes();
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
  const hours = realTime.getHours();
  const hourDegrees = ((hours + minutes / 60) / 12) * 360;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

// Start the real-time sub-second dial
realTimeInterval = setInterval(() => {
  startRealTimeSecondHand();
}, 250);

// Start the chronograph timer
startButton.addEventListener('click', () => {
  if (!intervalChronograph) {
    intervalChronograph = setInterval(startChronograph, 250);
  }
});

// Stop the chronograph timer
stopButton.addEventListener('click', () => {
  clearInterval(intervalChronograph);
  intervalChronograph = null;
});

// Reset the chronograph timer
resetButton.addEventListener('click', () => {
  clearInterval(intervalChronograph);
  intervalChronograph = null;
  chronographSeconds = 0;
  chronographMinutes = 0;
  updateHands();
});

// Chronograph function for main second hand
function startChronograph() {
  chronographSeconds++;
  if (chronographSeconds / 4 === 60) {
    chronographSeconds = 0;
    chronographMinutes++;
  }

  if (chronographMinutes === 30) {
    chronographMinutes = 0;
  }

  updateHands();
}

// Update the hands on the main dial
function updateHands() {
  const secondDegrees = (chronographSeconds / 60 / 4) * 360;
  const chronoMinuteDegree = (chronographMinutes / 30) * 360;

  mainSecondHand.style.transform = `rotate(${secondDegrees}deg)`;
  chronoMinuteHand.style.transform = `rotate(${chronoMinuteDegree}deg)`;
}
function createHourMarks() {
  for (let i = 0; i < 12; i++) {
    const hourMark = document.createElement('div');
    hourMark.classList.add('hour-mark');

    // Calculate the angle for each hour mark
    const angle = i * 30; // 360 degrees / 12 hours = 30 degrees per hour

    // Set the rotation and translation for the hour mark
    hourMark.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translate(0, -132.5px)`;

    // Append the hour mark to the clock
    dial.appendChild(hourMark);
  }
}

// Call the function to create hour marks
createHourMarks();

const subMinuteDial = document.querySelector('.sub-minute-dial');
const subMinuteDialRadius = 35; // Adjust based on your sub-dial size
const labelDistance = subMinuteDialRadius - 10; // Adjust for label placement

function createSubDialNumbers() {
  const labelsData = [
    { angle: 0, text: '30' },
    { angle: 120, text: '10' },
    { angle: 240, text: '20' },
  ];

  labelsData.forEach((labelData) => {
    // Create the label element
    const label = document.createElement('div');
    label.classList.add('sub-dial-number');
    label.textContent = labelData.text;

    // Set the transformation
    label.style.transform = `
      translate(-50%, -50%)
      rotate(${labelData.angle}deg)
      translate(0, -${labelDistance}px)
      rotate(-${labelData.angle}deg)
    `;

    // Append the label to the sub-dial
    subMinuteDial.appendChild(label);
  });
}

// Call the function to create and position sub-dial numbers
createSubDialNumbers();

const subSecondDial = document.querySelector('.real-time-second-dial');

function createSecondDialNumbers() {
  const labelsData = [
    { angle: 0, text: '60' },
    { angle: 90, text: '15' },
    { angle: 180, text: '30' },
    { angle: 270, text: '45' },
  ];

  labelsData.forEach((labelData) => {
    // Create the label element
    const label = document.createElement('div');
    label.classList.add('sub-dial-number');
    label.textContent = labelData.text;

    // Set the transformation
    label.style.transform = `
      translate(-50%, -50%)
      rotate(${labelData.angle}deg)
      translate(0, -${labelDistance}px)
      rotate(-${labelData.angle}deg)
    `;

    // Append the label to the sub-dial
    subSecondDial.appendChild(label);
  });
}

// Call the function to create and position sub-dial numbers
createSecondDialNumbers();
