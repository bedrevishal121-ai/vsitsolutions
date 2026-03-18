// --- 1. Background (Original Effect) ---
const canvas = document.getElementById('cyberCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function setCanvasSize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', setCanvasSize);
setCanvasSize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 1.5;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}
function init() { for (let i = 0; i < 85; i++) particles.push(new Particle()); }
function connect() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 160) {
                ctx.strokeStyle = `rgba(56, 189, 248, ${1 - distance/160})`;
                ctx.lineWidth = 0.6; ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y); ctx.stroke();
            }
        }
    }
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
}
init(); animate();

// --- 2. Client Management ---
const defaultClients = [
    { name: "John Doe", img: "pic3.png", review: "Professional networking setup. Highly recommended!", stars: 5 },
    { name: "Smart Solutions Inc", img: "pic3.png", review: "Best server management in CBD Belapur.", stars: 5 }
];

function loadClients() {
    let clients = JSON.parse(localStorage.getItem('myClients')) || defaultClients;
    const display = document.getElementById('clientDisplay');
    const adminList = document.getElementById('adminList');
    if(!display) return;
    display.innerHTML = '';
    if(adminList) adminList.innerHTML = '';

    clients.forEach((c, index) => {
        let stars = '<div style="margin-bottom:10px;">' + '<i class="fas fa-star" style="color:#FFD700; font-size:12px;"></i>'.repeat(5) + '</div>';
        display.innerHTML += `
            <div class="client-card reveal">
                <div class="client-pic-frame" style="width:110px; height:110px; margin:0 auto 20px; border-radius:50%; padding:4px; background:linear-gradient(45deg, #0ea5e9, #22d3ee);">
                    <img src="${c.img}" onerror="this.src='pic3.png'" style="width:100%; height:100%; border-radius:50%; object-fit:cover; border:4px solid #020617;">
                </div>
                ${stars}
                <p style="font-style:italic; color:#94a3b8; font-size:14px; margin-bottom:15px;">"${c.review}"</p>
                <h4 style="color:#0ea5e9; font-family:'Outfit'; text-transform:uppercase; letter-spacing:1px;">${c.name}</h4>
            </div>`;
        if(adminList) {
            adminList.innerHTML += `
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; padding:10px; background:rgba(255,255,255,0.05); border-radius:10px;">
                    <span style="font-size:13px;">${c.name}</span>
                    <button onclick="removeClient(${index})" style="color:red; background:none; border:none; cursor:pointer;">Delete</button>
                </div>`;
        }
    });
}

function checkPass() {
    if(document.getElementById('adminPass').value === "vikram123") {
        document.getElementById('adminControls').style.display = 'block';
        document.getElementById('loginArea').style.display = 'none';
    } else { alert("Wrong Password!"); }
}

function openAdmin() { document.getElementById('adminModal').style.display = 'flex'; }
function closeAdmin() { document.getElementById('adminModal').style.display = 'none'; }

function addClient() {
    const name = document.getElementById('newClientName').value;
    const review = document.getElementById('newClientReview').value;
    if(!name || !review) return alert("Fill Name and Review!");
    let clients = JSON.parse(localStorage.getItem('myClients')) || defaultClients;
    clients.push({ name, img: document.getElementById('newClientImg').value || "pic3.png", review, stars: 5 });
    localStorage.setItem('myClients', JSON.stringify(clients));
    loadClients();
    alert("Review Added!");
}

function removeClient(index) {
    if(confirm("Remove review?")) {
        let clients = JSON.parse(localStorage.getItem('myClients')) || defaultClients;
        clients.splice(index, 1);
        localStorage.setItem('myClients', JSON.stringify(clients));
        loadClients();
    }
}

// --- 3. UI Init ---
document.getElementById('serviceForm').onsubmit = (e) => {
    e.preventDefault();
    const msg = `*NEW INQUIRY*%0AName: ${document.getElementById('custName').value}%0AService: ${document.getElementById('serviceType').value}`;
    window.open(`https://wa.me/919730080768`, '_blank');
};

document.addEventListener('DOMContentLoaded', () => {
    loadClients();
    ScrollReveal().reveal('.reveal', { distance: '50px', duration: 1000, interval: 200 });
});
function loadClients() {
    let clients = JSON.parse(localStorage.getItem('myClients')) || defaultClients;
    const display = document.getElementById('clientDisplay');
    const adminList = document.getElementById('adminList');
    
    if(!display) return;
    display.innerHTML = '';
    if(adminList) adminList.innerHTML = '';

    // We repeat the array once to create the infinite loop effect
    const scrollData = [...clients, ...clients]; 

    scrollData.forEach((c, index) => {
        let stars = '<div style="margin-bottom:10px;">' + '<i class="fas fa-star" style="color:#FFD700; font-size:12px;"></i>'.repeat(5) + '</div>';
        
        display.innerHTML += `
            <div class="client-card">
                <div class="client-pic-frame" style="width:200px; height:200px; margin:0 auto 20px; border-radius:50%; padding:4px; background:linear-gradient(45deg, #0ea5e9, #22d3ee);">
                    <img src="${c.img}" onerror="this.src='pic3.png'" style="width:100%; height:100%; border-radius:50%; object-fit:cover; border:4px solid #020617;">
                </div>
                ${stars}
                <p style="font-style:italic; color:#94a3b8; font-size:14px; margin-bottom:15px;">"${c.review}"</p>
                <h4 style="color:#0ea5e9; font-family:'Outfit'; text-transform:uppercase;">${c.name}</h4>
            </div>`;
    });

    // Only original clients show in Admin List for deletion
    clients.forEach((c, index) => {
        if(adminList) {
            adminList.innerHTML += `
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; padding:10px; background:rgba(255,255,255,0.05); border-radius:10px;">
                    <span style="font-size:13px;">${c.name}</span>
                    <button onclick="removeClient(${index})" style="color:red; background:none; border:none; cursor:pointer;">Delete</button>
                </div>`;
        }
    });
}
