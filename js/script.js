// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Donation form interactions
const donationTypes = document.querySelectorAll('.donation-type');
donationTypes.forEach(type => {
    type.addEventListener('click', function() {
        donationTypes.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('donationType').value = this.dataset.amount || 'one-time';
    });
});

const donationAmounts = document.querySelectorAll('.donation-amount');
donationAmounts.forEach(amount => {
    amount.addEventListener('click', function() {
        if (this.dataset.amount !== 'custom') {
            document.getElementById('amount').value = this.dataset.amount;
        }
        donationAmounts.forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});

// Prayer request follow-up toggle
document.getElementById('prayerFollowup').addEventListener('change', function() {
    document.getElementById('followupInfo').style.display = this.checked ? 'block' : 'none';
});

// Form submission handling
document.getElementById('donationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // In a real implementation, this would connect to a payment processor
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('donationType').value;
    const typeText = type === 'one-time' ? 'one-time' : type + ' recurring';
    
    alert(`Terima kasih atas donasi ${typeText} Anda sebesar Rp${amount}! Anda akan menerima email konfirmasi segera.`);
    this.reset();
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Pesan Anda telah berhasil dikirim! Tim kami akan merespons dalam waktu 24 jam.');
    this.reset();
});

document.getElementById('prayerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Terima kasih telah mengirimkan permohonan doa Anda. Tim doa kami akan mendoakan permohonan ini secara rahasia.');
    this.reset();
    document.getElementById('followupInfo').style.display = 'none';
    const modal = bootstrap.Modal.getInstance(document.getElementById('prayerModal'));
    modal.hide();
});

// Initialize Bootstrap tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});