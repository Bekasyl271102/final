let usrs = JSON.parse(localStorage.getItem("Users"))
if (usrs != null){
    let admin = usrs.find(a => a.email === "admin@gmail.com")
    if (admin == null){
        let admin = {
            email: "admin@gmail.com",
            password: "admin",
            isAdmin: true,
            isBanned: false
        }
    
        usrs.push(admin)
        localStorage.setItem("Users", JSON.stringify(usrs))
    }
}else {
    usrs = []
    let admin = {
        email: "admin@gmail.com",
        password: "admin",
        isAdmin: true,
        isBanned: false
    }

    usrs.push(admin)
    localStorage.setItem("Users", JSON.stringify(usrs))
}

function checkUser(email) {
    var users = JSON.parse(localStorage.getItem("Users"));
    if (users == null) {
        return true;
    }

    foundUser = users.find(x => x.email === email);

    if (foundUser != null) {
        return false;
    }

    return true;
}
    

function Register() {
    var login = document.getElementById("registerE").value;
    var password = document.getElementById("registerP").value;
 

    if (checkUser(login) == false) {
        document.getElementById("err_msg").innerHTML = "User already exists";
        return
    }

    document.getElementById("err_msg").innerHTML = "";
    
    var user = {
        email: login,
        password: password,
        isBanned: false,
        isAdmin: false
    };

    storeUser(user);
    window.location = "./index.html"
    location.reload()
}


function storeUser(user) {
    var users = JSON.parse(localStorage.getItem("Users"));
    if (users != null) {
        users.push(user);
        localStorage.setItem("Users", JSON.stringify(users));
        return
    }else {
        var users = [];
        users.push(user);
        localStorage.setItem("Users", JSON.stringify(users));
    }
    return
}

function Authorize() {
    var login = document.getElementById("email").value;
    var password = document.getElementById("password").value;

   var users = JSON.parse(localStorage.getItem("Users"));

    if (users == null) {
        alert("No users were registered")
        return
    }

    foundUser = users.find(x => x.email === login);

    if (foundUser == null) {
        alert("Didnt find user")
        return
    }

    if (foundUser.password === password) {
        if (!foundUser.isBanned) {
            localStorage.setItem("ActiveUser", JSON.stringify(foundUser));
    
            if (foundUser.isAdmin) {
                // window.location = "./admin.html
                window.open("admin.html", "_self")
                return
            }

            if (!foundUser.isAdmin) {
              window.location = "./index.html"
            }

            return
        }
    
        alert("Sorry your account:\t" + foundUser.login + " is banned");
    
        return
    }

    alert("Incorrect password");
    return
}