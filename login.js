var loginTab = document.getElementById("logintab");
var signupTab = document.getElementById("signuptab");
var loginForm = document.getElementById("loginForm");
var signupForm = document.getElementById("signupForm");
var messageBox = document.getElementById("message");
function showMessage(text, isError) {
    messageBox.textContent = text;
    messageBox.className = isError ? "msg error" : "msg success";
}
function showLogin() {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    messageBox.className = "msg hidden";
}

function showSignup() {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    messageBox.className = "msg hidden";
}

loginTab.addEventListener("click", showLogin);
signupTab.addEventListener("click", showSignup);
signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("signupName").value.trim();
    var email = document.getElementById("signupEmail").value.trim().toLowerCase();
    var password = document.getElementById("signupPassword").value;
    var confirm = document.getElementById("signupConfirm").value;

    if (password.length < 6) {
        showMessage("Password must be at least 6 characters long.", true);
        return;
    }
    if (password !== confirm) {
        showMessage("Both passwords are not the same.", true);
        return;
    }
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            showLogin();
            document.getElementById("loginEmail").value = email;
            showMessage("This email already has an account. Please login.", true);
            return;
        }
    }
    users.push({ name: name, email: email, password: password });
    saveUsers(users);
    localStorage.setItem("vertoLoggedIn", email);

    showMessage("Account created! Taking you to the home page...", false);
    setTimeout(function () {
        window.location.href = "index.html";
    }, 1200);
});
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("loginEmail").value.trim().toLowerCase();
    var password = document.getElementById("loginPassword").value;

    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            if (users[i].password === password) {
                localStorage.setItem("vertoLoggedIn", email);
                showMessage("Login successful! Taking you to the home page...", false);
                setTimeout(function () {
                    window.location.href = "index.html";
                }, 1000);
            } else {
                showMessage("Wrong password. Please try again.", true);
            }
            return;
        }
    }

    showMessage("No account found with this email. Please create an account.", true);
});
