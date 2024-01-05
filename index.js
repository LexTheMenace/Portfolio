const hamburger = document.querySelector(
  ".header .nav-bar .nav-list .hamburger"
);
const mobile_menu = document.querySelector(".header .nav-bar .nav-list ul");
const menu_item = document.querySelectorAll(
  ".header .nav-bar .nav-list ul li a"
);
const header = document.querySelector(".header.container");
const email_form = document.querySelector("#email-form");
const year = document.querySelector("#date");
year.innerHTML = new Date().getFullYear();

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobile_menu.classList.toggle("active");
});

document.addEventListener("scroll", () => {
  var scroll_position = window.scrollY;
  if (scroll_position > 250) {
    header.style.backgroundColor = "#29323c";
  } else {
    header.style.backgroundColor = "transparent";
  }
});

menu_item.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobile_menu.classList.toggle("active");
  });
});

email_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formValue = {};
  for (let el of e.target.elements) {
    if (el.value && el.name) {
      formValue[[el.name]] = el.value;
    }
  }
  for (let el of e.target.children) {
    el.setAttribute("disabled", true);
  }
  document.querySelector(".loading").style.display = "block";
  email_form.style.display = "none";

  const loadingInt = setInterval(function () {
    var wait = document.getElementById("wait");
    if (wait.innerHTML.length > 3) wait.innerHTML = "";
    else wait.innerHTML += ".";
  }, 100);
  fetch("https://formsubmit.co/el/goteru", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValue),
  })
    .then((res) => {
      clearInterval(loadingInt);
      email_form.style.display = "block";

      document.querySelector(".loading").style.display = "none";

      for (let el of e.target.elements) {
        if (el.value && el.name) {
          el.value = "";
        }
      }
    })
    .catch((err) => {
      clearInterval(loadingInt);
      email_form.style.display = "block";
      document.querySelector(".loading").style.display = "none";
    });
});
