sessionStorage.setItem("Testmode",0) // change in GITHUB
// gss: Get Session Storage
// sss: Set Session Storage
// 1: Testmode  2: ISADMIN  3: User
window.c = console.log
window.getel = function getel(el) {return document.getElementById(el)}


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
setTimeout(() => {
    window.app = initializeApp(firebaseConfig);
    window.db = getDatabase(app);
}, 300);


window.gss = function gss(type) {
    if (type==1){return(Number(sessionStorage.getItem("Testmode")))}
    if (type==2){return(Number(sessionStorage.getItem("ISADMIN")))}
    if (type==3){return(sessionStorage.getItem("User"))}
}
window.sss = function sss(type, set) {
    if (type==1){return(sessionStorage.setItem("Testmode", set))}
    if (type==2){return(sessionStorage.setItem("ISADMIN", set))}
    if (type==3){return(sessionStorage.setItem("User", set))}
}

let TopBar
let TopBar1
let TopBar2
let TopBar3

document.addEventListener("DOMContentLoaded", () => {
    const segments = document.querySelectorAll(".segment");

    segments.forEach((segment, index) => {
        segment.addEventListener("click", () => {
            document.querySelector(".segment.active")
                .classList.remove("active");
            segment.classList.add("active");
            if (index==0) {window.location.href = "Calendar.html"}
            if (index==1) {window.location.href = "index.html"}
            if (index==2) {window.location.href = "Games.html"}
        });
    });

    if (gss(2) === 0) {
        if (gss(1)==1){sss(2, 1)} else {sss(2, 0)}
        if (gss(1)==1){sss(3, "Admin")} else {sss(3, 0)}
    }
    if (gss(3) != 0 && gss(3) != "") {localStorage.setItem("UserLocal", gss(3))}

    TopBar = document.createElement("div");
    TopBar.className = "TopBar"
    document.body.appendChild(TopBar);
    if (gss(2) === null) {
        if (gss(1)==1){sss(2, 1)} else {sss(2, 0)}
        if (gss(1)==1){sss(3, "Admin")} else {sss(3, 0)}
    }
    setTimeout(()=> {
        if (gss(1)===null) {
            sss(1, 0)
        }if (gss(2)===null) {
            sss(2, 0)
        }if (gss(3)===null || gss(3) == 0) {
            sss(3, localStorage.getItem("UserLocal") || 0)
        }
    }, 1000)
    Loop()
})

window.NotLoggedIn = NotLoggedIn;
function NotLoggedIn() {
    if (gss(3)==0) {
        getel("LogInBg").hidden = false
    } else {
        getel("LogOut").hidden = !getel("LogOut").hidden
    }
}
window.LogIn = LogIn;
function LogIn() {
    let uservalue = getel("UserInput").value
    if (uservalue != "Admin" && uservalue != "" && getel("PasswordInput").value != "") {
        const dbRef = ref(db);
        get(child(dbRef, `${uservalue}/Profile/Password`)).then((pass) => {
            if (pass.val() == getel("PasswordInput").value || !pass.exists()) {
                password = getel("PasswordInput").value;
                getel("LogInBg").hidden = true
                sss(3, getel("UserInput").value)
                getel("LoggedIn").innerText = "Logged: "+gss(3);
                localStorage.setItem("UserLocal", gss(3))
                StartLoad()
            } else {
                getel("PasswordInput").value = ""
                getel("PasswordInput").placeholder = "Incorrect Password"
            } 
        })
    }
}
window.CancelLogIn = CancelLogIn;
function CancelLogIn() {
    getel("LogInBg").hidden = true
}
window.LogOut = LogOut;
function LogOut() {
    localStorage.setItem("UserLocal", 0); sss(3, 0); sss(2, 0);
    TDList = {}; loadTDL();
    dayStates = {}; buildCalendar()
    getel("LogOut").hidden = true
}

function Loop() {
    if (window.location.href == "Calendar.html") { //also the function addeventlistener("click", (e)) has restriction to login for Cal only
        if (getel("LogInBg").hidden == false) {
            if (getel("UserInput").value != "" && getel("PasswordInput").value != "") {
                getel("LogIn").setAttribute("Ready","1")}
            else {getel("LogIn").setAttribute("Ready","0")}
        }
        if (gss(3)!="" && gss(3) != 0) {
            getel("LoggedIn").innerHTML = "Logged In: <b>"+gss(3)
            if (gss(3) == "Admin") {
                getel("LoggedIn").innerHTML = "Welcome back Riley"
            }
        } else {
            getel("LoggedIn").innerHTML = "Not Loggen In"
        }
        if (gss(1)==1) {getel("LoggedIn").innerText = "In Test Mode"}
    }
    setTimeout(Loop, 400)
}

document.addEventListener("click", (e) => {
    if (window.location.href == "Calendar.html") {
        const mousex = e.pageX;
        const mousey = e.pageY;
        if (e.target === document.body || e.target === document.documentElement) {
            getel("LogOut").hidden = true
        }
    }
})


window.firebaseConfig = {
    apiKey: "AIzaSyBVOC6RVvQw2V7YSN8MF24kM0p9N1tcfTo",
    authDomain: "calendar-5487e.firebaseapp.com",
    databaseURL: "https://calendar-5487e-default-rtdb.firebaseio.com",
    projectId: "calendar-5487e",
    storageBucket: "calendar-5487e.firebasestorage.app",
    messagingSenderId: "705086479682",
    appId: "1:705086479682:web:5511ad5b3e00921947bcdb",
    measurementId: "G-CGMRRC6B0B"
};
window.app = initializeApp(firebaseConfig);
window.db = getDatabase(app);
