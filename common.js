function getUsers() {
    var data = localStorage.getItem("vertoUsers");
    if (data === null) {
        return [];
    }
    return JSON.parse(data);
}

function saveUsers(users) {
    localStorage.setItem("vertoUsers", JSON.stringify(users));
}

function getLoggedInUser() {
    var email = localStorage.getItem("vertoLoggedIn");
    if (email === null) {
        return null;
    }
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return users[i];
        }
    }
    return null;
}

function logout() {
    localStorage.removeItem("vertoLoggedIn");
    window.location.href = "index.html";
}

function updateMenu() {
    var user = getLoggedInUser();
    var link = document.getElementById("loginlink");
    if (user !== null && link !== null) {
        var firstName = user.name.split(" ")[0];
        link.textContent = "Logout (" + firstName + ")";
        link.href = "#";
        link.addEventListener("click", function (event) {
            event.preventDefault();
            logout();
        });
    }
}

function showLoginPopup() {
    if (document.getElementById("loginpopup") !== null) {
        return;
    }

    var overlay = document.createElement("div");
    overlay.id = "loginpopup";
    overlay.className = "overlay";
    overlay.innerHTML =
        '<div class="thankcard">' +
        '<p class="thankhead">Oh oh! 😕</p>' +
        '<p class="thanktext">Looks like you are not signed in.</p>' +
        '<p class="thanktext">Please sign in to continue.</p>' +
        '<div class="popupbtns">' +
        '<button type="button" id="popupsignin" class="thankbtn">Sign in</button>' +
        '<button type="button" id="popupcancel" class="thankbtn cancelbtn">Cancel</button>' +
        '</div>' +
        '</div>';
    document.body.appendChild(overlay);

    function closePopup() {
        overlay.remove();
    }

    document.getElementById("popupsignin").addEventListener("click", function () {
        window.location.href = "login.html";
    });
    document.getElementById("popupcancel").addEventListener("click", closePopup);
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closePopup();
        }
    });
}

updateMenu();
