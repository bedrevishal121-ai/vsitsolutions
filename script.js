const canvas = document.getElementById("cyberCanvas");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas && !reducedMotion) {
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    const scale = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    const count = Math.min(55, Math.floor(window.innerWidth / 24));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.5
    }));
  }

  function drawParticles() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(103, 212, 255, 0.28)";
      ctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  drawParticles();
  window.addEventListener("resize", resizeCanvas, { passive: true });
}

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar?.classList.toggle("scrolled", window.scrollY > 25);
}, { passive: true });

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});
navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}));

const clients = [
  { name: "Smart Solutions Inc.", image: "pic3.png", review: "Networking आणि server support अतिशय व्यवस्थित आणि व्यावसायिक पद्धतीने मिळाला." },
  { name: "Corporate Client", image: "pic3.png", review: "CCTV आणि IT infrastructure सेवा वेळेत आणि समाधानकारकरीत्या पूर्ण झाली." }
];

const clientDisplay = document.getElementById("clientDisplay");
if (clientDisplay) {
  clientDisplay.innerHTML = clients.map((client) => `
    <article class="client-card">
      <img src="${client.image}" alt="${client.name}" loading="lazy" onerror="this.src='pic3.png'">
      <div>
        <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“${client.review}”</p>
        <h4>${client.name}</h4>
      </div>
    </article>`).join("");
}

const serviceForm = document.getElementById("serviceForm");
serviceForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!serviceForm.reportValidity()) return;

  const name = document.getElementById("custName").value.trim();
  const mobile = document.getElementById("custMobile").value.trim();
  const service = document.getElementById("serviceType").value;
  const issue = document.getElementById("custIssue").value.trim();
  const message = [
    "*NEW VS IT SOLUTIONS INQUIRY*",
    `*Name:* ${name}`,
    `*Phone:* ${mobile}`,
    `*Service:* ${service}`,
    `*Requirement:* ${issue}`
  ].map(encodeURIComponent).join("%0A");

  window.open(`https://wa.me/919730080768?text=${message}`, "_blank", "noopener,noreferrer");
  serviceForm.reset();
});

if (window.ScrollReveal) {
  ScrollReveal().reveal(".reveal", { distance: "28px", duration: 800, interval: 100, easing: "cubic-bezier(.25,.46,.45,.94)", reset: false });
}

document.getElementById("currentYear").textContent = new Date().getFullYear();
