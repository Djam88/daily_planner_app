document.addEventListener("DOMContentLoaded", function () {
  // Display the current day at the top of the calendar
  var currentDate = dayjs().format("dddd, D MMMM , YYYY");
  var currentDayElement = document.getElementById("currentDay");
  currentDayElement.textContent = currentDate;

  // Create timeblocks for standard business hours
  var businessHours = [
    { hour: 9, label: "9 AM" },
    { hour: 10, label: "10 AM" },
    { hour: 11, label: "11 AM" },
    { hour: 12, label: "12 PM" },
    { hour: 13, label: "1 PM" },
    { hour: 14, label: "2 PM" },
    { hour: 15, label: "3 PM" },
    { hour: 16, label: "4 PM" },
    { hour: 17, label: "5 PM" },
  ];

  var currentHour = dayjs().hour();

  // Loop through each timeblock and create HTML elements
  var container = document.querySelector(".container");
  for (var i = 0; i < businessHours.length; i++) {
    var timeblock = document.createElement("div");
    timeblock.classList.add("time-block", "row");

    var hour = document.createElement("div");
    hour.classList.add("col-2", "hour");
    hour.textContent = businessHours[i].label;

    var eventInput = document.createElement("textarea");
    eventInput.classList.add("col-8", "description");

    // current hour based on past present and future
    if (businessHours[i].hour < currentHour) {
      eventInput.classList.add("past");
    } else if (businessHours[i].hour === currentHour) {
      eventInput.classList.add("present");
    } else {
      eventInput.classList.add("future");
    }

    var saveBtn = document.createElement("button");
    saveBtn.classList.add("col-2", "saveBtn");
    saveBtn.innerHTML = '<i class="fas fa-save"></i>';
    saveBtn.setAttribute("data-hour", businessHours[i].hour);

    // Load saved event from local storage
    var savedEvent = localStorage.getItem("event_" + businessHours[i].hour);
    eventInput.value = savedEvent;

    // Add event listener to save button
    saveBtn.addEventListener("click", function () {
      var hourValue = this.getAttribute("data-hour");
      var eventText = this.previousElementSibling.value;
      localStorage.setItem("event_" + hourValue, eventText);
    });
    // Append through children

    timeblock.appendChild(hour);
    timeblock.appendChild(eventInput);
    timeblock.appendChild(saveBtn);
    container.appendChild(timeblock);
  }
});
