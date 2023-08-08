document.addEventListener("DOMContentLoaded", function () {
  // Display the current day at the top of the calendar
  var currentDate = dayjs().format("dddd,D MMMM , YYYY");
  currentDate = addOrdinalSuffix(currentDate);
  $("#currentDay").text(currentDate);
  var currentDayElement = document.getElementById("currentDay");
  currentDayElement.textContent = currentDate;
  // Helper function to add ordinal suffix to the day number
  function addOrdinalSuffix(dateString) {
    var day = parseInt(dateString.split(" ")[2]); // Extract the day number
    var suffix;

    // Determine the appropriate ordinal suffix based on the day number
    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    } else {
      suffix = "th";
    }

    // Add the ordinal suffix to the day number and return the updated date string
    return dateString.replace(/\b\d+\b/, function (match) {
      return match + suffix;
    });
  }
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

  // Loop through each timeblock
  var container = document.querySelector(".container");
  for (var i = 0; i < businessHours.length; i++) {
    var timeblock = document.createElement("div");
    timeblock.classList.add("time-block", "row");

    var hour = document.createElement("div");
    hour.classList.add("col-2", "hour");
    hour.textContent = businessHours[i].label;

    var eventInput = document.createElement("textarea");
    eventInput.classList.add("col-8", "description");

    // Add past, present, or future class based on current hour
    if (businessHours[i].hour < currentHour) {
      eventInput.classList.add("past");
    } else if (businessHours[i].hour === currentHour) {
      eventInput.classList.add("present");
    } else {
      eventInput.classList.add("future");
    }

    // save btn

    var saveBtn = document.createElement("button");
    saveBtn.classList.add("col-2", "saveBtn");
    saveBtn.innerHTML = '<i class="fas fa-save"></i>';
    saveBtn.setAttribute("data-hour", businessHours[i].hour);

    // Load saved event
    var savedEvent = localStorage.getItem("event_" + businessHours[i].hour);
    eventInput.value = savedEvent;

    // Add event listener to save button
    saveBtn.addEventListener("click", function () {
      var hourValue = this.getAttribute("data-hour");
      var eventText = this.previousElementSibling.value;
      localStorage.setItem("event_" + hourValue, eventText);
    });
    // Append through timeblock
    timeblock.appendChild(hour);
    timeblock.appendChild(eventInput);
    timeblock.appendChild(saveBtn);
    container.appendChild(timeblock);
  }
});
