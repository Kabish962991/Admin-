// Login system
function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (u === "9994995153" && p === "MUTHUCKP01") {
    window.location.href = "bookings.html";
  } else {
    alert("Invalid login");
  }
}

function logout() {
  window.location.href = "index.html";
}

// Save booking + Print slip
function saveBooking() {
  let data = {
    teamName: document.getElementById("teamName").value,
    mobile: document.getElementById("mobile").value,
    parking: document.getElementById("parking").value,
    hours: document.getElementById("hours").value,
    time: document.getElementById("time").value,
    date: document.getElementById("date").value,
    advance: document.getElementById("advance").value,
    beverages: document.getElementById("beverages").value
  };

  let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  bookings.push(data);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  alert("Booking Recorded!");
  printSlip(data);
  loadBookings();
}

// Load bookings
function loadBookings() {
  let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  let table = document.querySelector("#bookingTable tbody");
  table.innerHTML = "";
  bookings.forEach((b, i) => {
    let row = table.insertRow();
    row.innerHTML = `
      <td>${b.teamName}</td>
      <td>${b.mobile}</td>
      <td>${b.hours}</td>
      <td>${b.time}</td>
      <td>${b.date}</td>
      <td>${b.advance}</td>
      <td><button onclick="deleteBooking(${i})">Delete</button></td>`;
  });
}

// Delete booking
function deleteBooking(index) {
  let bookings = JSON.parse(localStorage.getItem("bookings"));
  bookings.splice(index, 1);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  loadBookings();
}

// Search booking
function searchBooking() {
  let q = document.getElementById("searchBox").value.toLowerCase();
  let table = document.querySelector("#bookingTable tbody");
  Array.from(table.rows).forEach(row => {
    row.style.display = row.cells[1].textContent.includes(q) ? "" : "none";
  });
}

// Print slip
function printSlip(data) {
  localStorage.setItem("currentSlip", JSON.stringify(data));
  window.open("slip.html");
}

// Load slip
if (document.getElementById("slipContent")) {
  let d = JSON.parse(localStorage.getItem("currentSlip"));
  document.getElementById("slipContent").innerHTML = `
    <p>Team: ${d.teamName}</p>
    <p>Mobile: ${d.mobile}</p>
    <p>Hours: ${d.hours}</p>
    <p>Time: ${d.time}</p>
    <p>Date: ${d.date}</p>
    <p>Advance: ${d.advance}</p>
    <p>Beverages: ${d.beverages}</p>
  `;
}

// Load bookings initially
if (document.querySelector("#bookingTable")) {
  loadBookings();
}
