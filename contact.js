var contactForm = document.getElementById("contactForm");
var thankBox = document.getElementById("thankbox");
var user = getLoggedInUser();
if (user !== null) {
    document.getElementById("signinbtn").classList.add("hidden");
    document.getElementById("submitbtn").classList.remove("hidden");
    document.getElementById("cname").value = user.name;
    document.getElementById("cemail").value = user.email;
}

document.getElementById("signinbtn").addEventListener("click", function (event) {
    event.preventDefault();
    showLoginPopup();
});

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (getLoggedInUser() === null) {
        showLoginPopup();
        return;
    }

    var request = {
        name: document.getElementById("cname").value.trim(),
        phone: document.getElementById("cphone").value,
        email: document.getElementById("cemail").value.trim(),
        topic: document.getElementById("ctopic").value,
        message: document.getElementById("cmessage").value.trim(),
        time: new Date().toLocaleString()
    };

    var saved = localStorage.getItem("vertoContacts");
    var requests = saved === null ? [] : JSON.parse(saved);
    requests.push(request);
    localStorage.setItem("vertoContacts", JSON.stringify(requests));

    document.getElementById("thankname").textContent = request.name;
    document.getElementById("thankphone").textContent = request.phone;
    thankBox.classList.remove("hidden");
});

document.getElementById("thankclose").addEventListener("click", function () {
    thankBox.classList.add("hidden");
    contactForm.reset();
    var loggedUser = getLoggedInUser();
    if (loggedUser !== null) {
        document.getElementById("cname").value = loggedUser.name;
        document.getElementById("cemail").value = loggedUser.email;
    }
});
