//put back scroll bar
window.onload = function () {
  window.scrollTo(0, -1);
};

// nav backgorund
let navLogo = document.querySelector(".nav_container");
let headerBackground = document.querySelector(".nav_container");

function turnDark() {
  if (window.pageYOffset) {
    navLogo.classList.add("turnblack");
    navLogo.classList.add("active");
    headerBackground.style =
      "background-color:rgba(0,0,0,0.3); box-shadow: 0 8px 6px -6px rgba(0,0,0,0.3);";
  } else {
    navLogo.classList.remove("turnblack");
    navLogo.classList.remove("active");
    headerBackground.style = "";
  }
}

window.addEventListener("scroll", turnDark);

// menutoggle
let menuToggle = document.querySelector(".menuToggle");
let navigation = document.querySelector(".nav_switch_container");
let navigationContent = document.querySelector(".nav_content_container");

menuToggle.addEventListener("click", (e) => {
  navigation.classList.toggle("active");
  navigationContent.classList.toggle("show-menu");
});

//hide menu
const navLink = document.querySelectorAll(".nav_link");

function linkAction() {
  const navMenu = document.querySelector(".nav_content_container");
  navMenu.classList.remove("show-menu");
  navigation.classList.toggle("active");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*Scroll section and avtive link mixed*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(
          ".nav_content_container a[href*=" + sectionId + "] .nav_icon"
        )
        .classList.add("active-link");
      document
        .querySelector(
          ".nav_content_container a[href*=" + sectionId + "] .nav_text"
        )
        .classList.add("active-link");
    } else {
      document
        .querySelector(
          ".nav_content_container a[href*=" + sectionId + "] .nav_icon"
        )
        .classList.remove("active-link");
      document
        .querySelector(
          ".nav_content_container a[href*=" + sectionId + "] .nav_text"
        )
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// Progress button
const progressBar = document.querySelector(".progress_bar");
const halfCircles = document.querySelectorAll(".half_circle");
const halfCircleTop = document.querySelector(".half_circle_top");
const progressBarCircle = document.querySelector(".progress_bar_circle");

function progressBarSet() {
  const pageHeight = document.documentElement.scrollHeight;
  const pageViewportHeight = window.innerHeight;
  const scrolledPortion = window.pageYOffset;

  if (scrolledPortion >= 750) {
    progressBar.style.bottom = `29.5%`;
  } else {
    progressBar.style.bottom = `-20%`;
  }

  const scrolledPortionDegree =
    (scrolledPortion / (pageHeight - pageViewportHeight)) * 360;

  if (scrolledPortionDegree >= 359) {
    progressBarCircle.classList.add("progress_turn_up");
  } else {
    progressBarCircle.classList.remove("progress_turn_up");
  }

  halfCircles.forEach((el) => {
    el.style.transform = `rotate(${scrolledPortionDegree}deg)`;

    if (scrolledPortionDegree >= 180) {
      halfCircles[0].style.transform = `rotate(180deg)`;
      halfCircleTop.style.opacity = "0";
    } else {
      halfCircleTop.style.opacity = "1";
    }
  });
}

document.addEventListener("scroll", progressBarSet);

//experience
let firstPart = document.querySelector(".experience_content_first");
let secondtPart = document.querySelector(".experience_content_second");
let education = document.querySelector(".education");
let work = document.querySelector(".work");

education.classList.add("orange_color");

education.addEventListener("click", () => {
  secondtPart.classList.add("hide_exp");
  firstPart.classList.remove("hide_exp");
  education.classList.add("orange_color");
  work.classList.remove("orange_color");
});

work.addEventListener("click", () => {
  firstPart.classList.add("hide_exp");
  secondtPart.classList.remove("hide_exp");
  education.classList.remove("orange_color");
  work.classList.add("orange_color");
});

// portfolio
const container = document.querySelector(".container");
const projects = document.querySelectorAll(".project");
const hideIframe = document.querySelector(".hide_iframe");

projects.forEach((project) => {
  // inside
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight
    }px`;
  });

  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });

  // outside
  project.addEventListener("click", () => {
    if (window.innerWidth > 1100) {
      //iFrame
      const ImageWrapper = document.createElement("div");
      ImageWrapper.className = "project_img_wrapper";
      container.appendChild(ImageWrapper);

      // iImage;
      const InwrapperImg = document.createElement("img");
      InwrapperImg.className = "project_img";

      // find img path and set it in InwrapperImg
      const imgPath = project.firstElementChild
        .getAttribute("src")
        .split(".")[1];
      InwrapperImg.setAttribute("src", `.${imgPath}-big.jpg`);
      ImageWrapper.appendChild(InwrapperImg);

      //hide body scroll bar
      document.body.style.overflow = "hidden";

      // hide entire iframe and show back body scroll bar
      hideIframe.classList.add("show_close_button");

      hideIframe.onclick = () => {
        hideIframe.classList.remove("show_close_button");
        ImageWrapper.remove();
        document.body.style.overflow = "scroll";
      };
    }
  });
});

//contact
let myName = document.querySelector(".my_name");
let myNumber = document.querySelector(".my_number");
let myEmail = document.querySelector(".myemail");
let sendButton = document.querySelector(".send_button");

myName.addEventListener("input", (a) => {});

myNumber.addEventListener("input", (b) => {});

myEmail.addEventListener("input", (c) => {});

sendButton.addEventListener("click", (d) => {
  let first = myName.value;
  const nameRules = /^[a-zA-Zéèêëíìîïúùûüóòôöõœøáàâäãæå+\-+\s]+$/;
  let second = myNumber.value;
  const numberRules = /^[0-9\s]+$/;
  let third = myEmail.value;
  let mailMarker = third.indexOf("@");
  let mailPoint = third.indexOf(".");
  let empty = "";
  if (
    myName.value === empty ||
    myNumber.value === empty ||
    myEmail.value === empty
  ) {
    d.preventDefault();
    alert("Votre formulaire est vide");
  } else if (nameRules.test(first) == false) {
    d.preventDefault();
    alert("Seulement des lettres et tirets dans le champs de nom");
  } else if (numberRules.test(second) == false) {
    d.preventDefault();
    alert("Seulement des nombres dans le champs de numéro");
  } else if (mailMarker == -1 || mailPoint == -1) {
    d.preventDefault();
    alert(
      "Dans le champs adresse email il faut verifier si l'adresse email a un '@' et un '.'"
    );
  }
});
