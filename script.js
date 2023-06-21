document.addEventListener("DOMContentLoaded", function () {
  // Start the eye tracking
  webgazer.setRegression('ridge')
    .setTracker('clmtrackr')
    .begin();

  // Track eye movement and change focus accordingly
  const buttons = document.getElementsByClassName("app");

  function highlightNearestButton(x, y) {
    let minDistance = Number.MAX_VALUE;
    let nearestButton = null;

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

      if (distance < minDistance) {
        minDistance = distance;buttons
        nearestButton = button;
      }
    }

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.transform = "scale(1)";
    }

    if (nearestButton) {
      nearestButton.style.transform = "scale(1.1)";
    }
  }

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
    });

    buttons[i].addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  }

  webgazer.setGazeListener(function (data, elapsedTime) {
    if (data) {
      const x = data.x;
      const y = data.y;
      highlightNearestButton(x, y);
    }
  }).begin();
});