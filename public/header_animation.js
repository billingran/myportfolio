const lastWord = document.querySelector("#numa");
const animation = document.querySelector("div.animation");

lastWord.addEventListener("animationend", () => {
  animation.style = "transition:all 1s ease; opacity:0; pointer-events:none;";
});

if (window.innerWidth < 790) {
  animation.style =
    " height: 0vh; z-index: -1000; opacity:0; pointer-events:none;";
}
