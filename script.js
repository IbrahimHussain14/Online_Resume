const CONTACT_EMAIL = your.email@example.com; // Replace with your real email address

 

const menuBtn = document.getElementById("menuBtn");

const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => navMenu.classList.toggle("open"));

 

navMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navMenu.classList.remove("open")));

 

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if(entry.isIntersecting){ entry.target.classList.add("visible"); }

  });

}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));

 

const filters = document.querySelectorAll(".filter");

const cards = document.querySelectorAll(".project-card");

filters.forEach(btn => {

  btn.addEventListener("click", () => {

    filters.forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    const value = btn.dataset.filter;

    cards.forEach(card => {

      card.style.display = value === "all" || card.dataset.category === value ? "block" : "none";

    });

  });

});

 

const modal = document.getElementById("projectModal");

const modalImg = document.getElementById("modalImg");

const modalTitle = document.getElementById("modalTitle");

const modalDesc = document.getElementById("modalDesc");

const modalClose = document.getElementById("modalClose");

 

cards.forEach(card => {

  card.addEventListener("click", () => {

    modalImg.src = card.dataset.img;

    modalTitle.textContent = card.dataset.title;

    modalDesc.textContent = card.dataset.desc;

    modal.classList.add("show");

    modal.setAttribute("aria-hidden", "false");

  });

});

 

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });

document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

function closeModal(){ modal.classList.remove("show"); modal.setAttribute("aria-hidden", "true"); }

 

const form = document.getElementById("contactForm");

const note = document.getElementById("formNote");

form.addEventListener("submit", e => {

  e.preventDefault();

  const name = document.getElementById("name").value.trim();

  const email = document.getElementById("email").value.trim();

  const message = document.getElementById("message").value.trim();

  if(!name || !email || !message){ note.textContent = "Please fill all fields."; return; }

  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);

  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  note.textContent = "Opening your email app with the message ready to send.";

});
