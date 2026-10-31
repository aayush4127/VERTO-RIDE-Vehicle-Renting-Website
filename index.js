var vehicles = {
    bike: ["Honda", "Pulsar", "Royal Enfield", "Yamaha"],
    scooty: ["TVS", "Activa", "Ather"],
    suv: ["Mahindra", "Scorpio", "Bolero", "Baleno", "Creta", "Kia"],
    sedan: ["Maruti Swift Dzire", "Skoda", "Hyundai"]
};
var prices = {
    bike: { "Honda": 30, "Pulsar": 45, "Yamaha": 60, "Royal Enfield": 75 },
    scooty: { "TVS": 15, "Activa": 20, "Ather": 30 },
    suv: { "Baleno": 130, "Bolero": 150, "Scorpio": 180, "Creta": 200, "Mahindra": 220, "Kia": 250 },
    sedan: { "Maruti Swift Dzire": 90, "Hyundai": 120, "Skoda": 150 }
};

var hoursPerDay = 24;
var form = document.getElementById("bookingForm");
var nameBox = document.getElementById("name");
var phoneBox = document.getElementById("phone");
var typeSelect = document.getElementById("vehicleType");
var modelSelect = document.getElementById("vehicleName");
var dateFrom = document.getElementById("datei");
var dateTo = document.getElementById("datef");
var signinBtn = document.getElementById("signinbtn");
var submitBtn = document.getElementById("submitbtn");
var locationSelect = document.getElementById("locationselect");
var priceBox = document.getElementById("pricebox");
var thankBox = document.getElementById("thankbox");
var totalCost = 0;
function fillVehicles(type) {
    modelSelect.innerHTML = "";

    var first = document.createElement("option");
    first.value = "";
    first.disabled = true;
    first.selected = true;

    if (type === "") {
        first.textContent = "First select vehicle type";
        modelSelect.appendChild(first);
        return;
    }

    first.textContent = "Select Vehicle";
    modelSelect.appendChild(first);

    var list = vehicles[type];
    for (var i = 0; i < list.length; i++) {
        var option = document.createElement("option");
        option.value = list[i];
        option.textContent = list[i];
        modelSelect.appendChild(option);
    }
}

typeSelect.addEventListener("change", function () {
    fillVehicles(typeSelect.value);
});

var bookButtons = document.querySelectorAll(".btn1");
for (var i = 0; i < bookButtons.length; i++) {
    bookButtons[i].addEventListener("click", function () {
        typeSelect.value = this.getAttribute("data-type");
        fillVehicles(typeSelect.value);
        updatePrice();
        document.getElementById("booking").scrollIntoView();
    });
}
function todayString() {
    var now = new Date();
    var month = String(now.getMonth() + 1).padStart(2, "0");
    var day = String(now.getDate()).padStart(2, "0");
    return now.getFullYear() + "-" + month + "-" + day;
}

dateFrom.min = todayString();
dateTo.min = todayString();

dateFrom.addEventListener("change", function () {
    dateTo.min = dateFrom.value;
    if (dateTo.value !== "" && dateTo.value < dateFrom.value) {
        dateTo.value = dateFrom.value;
    }
});
function updatePrice() {
    var type = typeSelect.value;
    var model = modelSelect.value;

    if (type === "" || model === "" || dateFrom.value === "" || dateTo.value === "" || locationSelect.value === "") {
        priceBox.classList.add("hidden");
        totalCost = 0;
        return;
    }
    var from = new Date(dateFrom.value);
    var to = new Date(dateTo.value);
    var days = Math.round((to - from) / 86400000) + 1;
    if (days < 1) {
        priceBox.classList.add("hidden");
        totalCost = 0;
        return;
    }

    var perHour = prices[type][model];
    totalCost = perHour * hoursPerDay * days;

    document.getElementById("pricerate").textContent = "₹" + perHour;
    document.getElementById("pricedays").textContent = days + (days === 1 ? " day" : " days");
    document.getElementById("pricetotal").textContent = "₹" + totalCost.toLocaleString("en-IN");
    priceBox.classList.remove("hidden");
}
typeSelect.addEventListener("change", updatePrice);
modelSelect.addEventListener("change", updatePrice);
dateFrom.addEventListener("change", updatePrice);
dateTo.addEventListener("change", updatePrice);
locationSelect.addEventListener("change", updatePrice);
var user = getLoggedInUser();
if (user !== null) {
    signinBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
    nameBox.value = user.name;
}

signinBtn.addEventListener("click", function (event) {
    event.preventDefault();
    showLoginPopup();
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (getLoggedInUser() === null) {
        showLoginPopup();
        return;
    }

    document.getElementById("thankname").textContent = nameBox.value;
    document.getElementById("thanktype").textContent = typeSelect.options[typeSelect.selectedIndex].text;
    document.getElementById("thankmodel").textContent = modelSelect.value;
    document.getElementById("thankphone").textContent = phoneBox.value;
    document.getElementById("thankprice").textContent = "₹" + totalCost.toLocaleString("en-IN");

    thankBox.classList.remove("hidden");
});
document.getElementById("thankclose").addEventListener("click", function () {
    thankBox.classList.add("hidden");
    form.reset();
    fillVehicles("");
    updatePrice();
    var loggedUser = getLoggedInUser();
    if (loggedUser !== null) {
        nameBox.value = loggedUser.name;
    }
});
