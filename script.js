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

// --- ADMIN PANEL FIXES ---

// 1. लॉगिन चेक करणे
window.checkPass = function() {
    const password = document.getElementById('adminPass').value;
    if(password === "vikram123") {
        document.getElementById('adminControls').style.display = 'block';
        document.getElementById('loginArea').style.display = 'none';
    } else { 
        alert("चुकीचा पासवर्ड! कृपया पुन्हा प्रयत्न करा."); 
    }
};

// 2. ॲडमिन विंडो उघडणे आणि बंद करणे
window.openAdmin = function() { 
    document.getElementById('adminModal').style.display = 'flex'; 
};

window.closeAdmin = function() { 
    document.getElementById('adminModal').style.display = 'none';
    // रिसेट लॉगिन एरिया
    document.getElementById('adminControls').style.display = 'none';
    document.getElementById('loginArea').style.display = 'block';
    document.getElementById('adminPass').value = '';
};

// 3. नवीन क्लायंट/रिव्ह्यू ॲड करणे
window.addClient = function() {
    const name = document.getElementById('newClientName').value;
    const review = document.getElementById('newClientReview').value;
    const imgInput = document.getElementById('newClientImg');
    
    if(!name || !review) {
        return alert("कृपया नाव आणि रिव्ह्यू दोन्ही भरा!");
    }

    // LocalStorage मधून जुना डेटा मिळवा
    let clients = JSON.parse(localStorage.getItem('myClients')) || [];

    if (imgInput.files && imgInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newClient = {
                name: name,
                img: e.target.result, // Base64 इमेज डेटा
                review: review
            };
            clients.push(newClient);
            saveAndRefresh(clients);
        };
        reader.readAsDataURL(imgInput.files[0]);
    } else {
        // जर इमेज नसेल तर डिफॉल्ट इमेज
        clients.push({ name, img: 'pic3.png', review });
        saveAndRefresh(clients);
    }
};

// 4. डेटा सेव्ह आणि रिफ्रेश करणे
function saveAndRefresh(clients) {
    localStorage.setItem('myClients', JSON.stringify(clients));
    loadClients(); // UI अपडेट करा
    
    // इनपुट्स रिकामे करा
    document.getElementById('newClientName').value = '';
    document.getElementById('newClientReview').value = '';
    document.getElementById('newClientImg').value = '';
    alert("क्लायंट यशस्वीरित्या ॲड झाला!");
}

// 5. रिव्ह्यू डिलीट करणे
window.removeClient = function(index) {
    if(confirm("हा रिव्ह्यू कायमचा काढून टाकायचा का?")) {
        let clients = JSON.parse(localStorage.getItem('myClients')) || [];
        clients.splice(index, 1);
        localStorage.setItem('myClients', JSON.stringify(clients));
        loadClients();
    }
};


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
