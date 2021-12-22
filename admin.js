$(document).ready(function() {
    let auth = JSON.parse(localStorage.getItem("ActiveUser"))
    if (auth == null) {
        window.open("./index.html", "_self")
        return
    }

    if (!auth.isAdmin) {
        alert("Access denied")
        window.open("./index.html", "_self")
        return
    }

    let users = JSON.parse(localStorage.getItem("Users"))
    
    let users_table = $('#usersTable')

    $.each(users, function(i, elem) {
            let tr = document.createElement("tr"),
            mail = document.createElement('td'),
            btn = document.createElement('button'),
            isAdmin = document.createElement('td')


            if (elem.isAdmin) {
                isAdmin.innerHTML = true
            }else {
                isAdmin.innerHTML = false
            }

            btn.classList.add('btn')
            if (!elem.isBanned) {
                btn.innerHTML = "Ban"
                btn.classList.add('ban')
                btn.classList.add('user_action')
            }else {
                btn.innerHTML = "Unban"
                btn.classList.add('unban')
                btn.classList.add('user_action')
            }
            mail.innerHTML = elem.email

            tr.appendChild(mail)
            tr.appendChild(isAdmin)
            tr.appendChild(btn)

            users_table.append(tr)
    })

    $('.user_action').click(function() {
        console.log($(this).hasClass('ban'))
        if ($(this).hasClass('ban')) {
            let index = $('.user_action').index(this)
            users = JSON.parse(localStorage.getItem("Users"))
            users[index].isBanned = true
            localStorage.setItem("Users", JSON.stringify(users))

            $(this).addClass('unban')
            $(this).removeClass('ban')

            $(this).text('Unban')
            location.reload()
        }else {
            let index = $('.user_action').index(this)
            users = JSON.parse(localStorage.getItem("Users"))
            users[index].isBanned = false
            console.log(index, users[index])

            localStorage.setItem("Users", JSON.stringify(users))

            $(this).addClass('ban')
            $(this).removeClass('unban')

            $(this).text('Ban')
            location.reload()
        }
    })


    $('#logout').click(function() {
        localStorage.removeItem("ActiveUser")
        location.reload()
    })
})

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

function addUser() {
    var login = document.getElementById("email").value;
    var password = document.getElementById("password").value;
 

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