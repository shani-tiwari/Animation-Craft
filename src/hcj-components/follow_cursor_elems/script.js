// const cardsContainer = document.getElementById("cards");
// const cards = Array.from(document.querySelectorAll(".card"));

// function handleMouseMove(e) {
//   const rect = cardsContainer.getBoundingClientRect();
//   const centerX = rect.left + rect.width / 2;
//   const centerY = rect.top + rect.height / 2;

//   const deltaX = e.clientX - centerX;
//   const deltaY = e.clientY - centerY;

//   // movement factor: smaller = more subtle
//   const factor = -0.03; // negative -> opposite direction

//   cards.forEach((card, index) => {
//     const depth = 1 + index * 0.3; // slightly different per card
//     const moveX = deltaX * factor * depth;
//     const moveY = deltaY * factor * depth;

//     card.style.transform = `translate(${moveX}px, ${moveY}px)`;
//   });
// }

// function resetPositions() {
//   cards.forEach((card) => {
//     card.style.transform = "translate(0, 0)";
//   });
// }

// window.addEventListener("mousemove", handleMouseMove);
// window.addEventListener("mouseleave", resetPositions);


// second

const cards = Array.from(document.querySelectorAll(".card"));

// 1) Put cards in random positions on screen
function placeCardsRandomly() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  cards.forEach((card) => {
    const cardRect = card.getBoundingClientRect();
    const maxX = vw - cardRect.width;
    const maxY = vh - cardRect.height;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    card.style.position = "fixed";
    card.style.left = `${randomX}px`;
    card.style.top = `${randomY}px`;
  });
}

// 2) Mouse move parallax (opposite direction)
function handleMouseMove(e) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;

  const factor = -0.05;

  cards.forEach((card, index) => {
    const depth = 1 + index * 0.5;
    const moveX = deltaX * factor * depth;
    const moveY = deltaY * factor * depth;

    card.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
}

// 3) Reset transform when mouse leaves window (optional)
function resetPositions() {
  cards.forEach((card) => {
    card.style.transform = "translate(0, 0)";
  });
}

// 4) Init
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("mouseleave", resetPositions);
window.addEventListener("load", placeCardsRandomly);
window.addEventListener("resize", placeCardsRandomly);
