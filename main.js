const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

const tiltCards = document.querySelectorAll("[data-tilt]");

function handleTilt(event) {
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;
  const deltaX = (event.clientX - centerX) / bounds.width;
  const deltaY = (event.clientY - centerY) / bounds.height;

  const tiltX = deltaY * 10;
  const tiltY = -deltaX * 12;

  card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
}

function resetTilt(event) {
  event.currentTarget.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
}

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", handleTilt);
  card.addEventListener("mouseleave", resetTilt);
  card.addEventListener("blur", resetTilt);
});

const methodZoom = document.querySelector(".method-zoom");
const methodModal = document.querySelector("#method-modal");

if (methodZoom && methodModal) {
  const closeModal = () => {
    methodModal.classList.remove("open");
    methodModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
      if (window.location.hash === "#method-modal") {
        const base = window.location.pathname + window.location.search;
        history.replaceState(null, "", base);
      }
  };

    methodZoom.addEventListener("click", (event) => {
      event.preventDefault();
    methodModal.classList.add("open");
    methodModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });

  methodModal.addEventListener("click", closeModal);
    const modalClose = document.querySelector(".modal-close");
    if (modalClose) {
      modalClose.addEventListener("click", (event) => {
        event.preventDefault();
        closeModal();
      });
    }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && methodModal.classList.contains("open")) {
      closeModal();
    }
  });
}
