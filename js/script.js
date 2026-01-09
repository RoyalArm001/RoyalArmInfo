document.addEventListener("DOMContentLoaded", function () {
  const nameElement = document.getElementById("typed-name");
  const cursorElement = document.getElementById("cursor");
  const nameToType = "Sipan Danielyan";
  let index = 0;

  const typingSpeed = 150; // Milliseconds per character
  const erasingSpeed = 100; // Milliseconds per character during erasing
  const delayBeforeErase = 2000; // Delay before erasing starts (2 seconds)
  const delayBeforeType = 500; // Delay before typing starts again (0.5 seconds)

  function typeWriter() {
    cursorElement.classList.remove("cursor-hidden");
    cursorElement.style.animation = "blink 1s step-end infinite";

    if (index < nameToType.length) {
      nameElement.textContent += nameToType.charAt(index);
      index++;
      setTimeout(typeWriter, typingSpeed);
    } else {
      cursorElement.classList.add("cursor-hidden");
      cursorElement.style.animation = "none";
      setTimeout(eraseName, delayBeforeErase);
    }
  }

  function eraseName() {
    cursorElement.classList.remove("cursor-hidden");
    cursorElement.style.animation = "blink 1s step-end infinite";

    if (nameElement.textContent.length > 0) {
      nameElement.textContent = nameElement.textContent.slice(0, -1);
      setTimeout(eraseName, erasingSpeed);
    } else {
      cursorElement.classList.add("cursor-hidden");
      cursorElement.style.animation = "none";
      index = 0;
      setTimeout(typeWriter, delayBeforeType);
    }
  }

  setTimeout(typeWriter, 1000); // Start after 1 second
});


document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    once: true,
  });

  lottie.loadAnimation({
    container: document.getElementById("bubble-lottie"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "https://assets4.lottiefiles.com/packages/lf20_tll0j4bb.json",
  });

  lottie.loadAnimation({
    container: document.getElementById("bubble-lottie"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "https://assets7.lottiefiles.com/packages/lf20_HpFqiS.json",
  });
});
