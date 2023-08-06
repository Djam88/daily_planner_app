document.addEventListener("DOMContentLoaded", function () {
  // Display the current day at the top of the calendar
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
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

   