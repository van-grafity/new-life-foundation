document.addEventListener('DOMContentLoaded', function() {
    // Ambil parameter ID dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const resourceType = urlParams.get('type') || 'news';
    const contentId = parseInt(urlParams.get('id')) || 1;

    // Load data JSON
    fetch('../assets/resources.json')
        .then(response => response.json())
        .then(data => {
            let content;
            if (resourceType === 'worshipedia') {
                content = data.worshipedia.find(item => item.id === contentId);
                renderContent(content, true);
            } else {
                content = data.news.find(item => item.id === contentId);
                renderContent(content, false);
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
            document.getElementById('newsDetail').innerHTML = `
                <div class="alert alert-danger">
                    Gagal memuat konten. Silakan coba lagi nanti.
                </div>
            `;
        });

    function renderContent(content, isWorshipedia) {
        const newsDetail = document.getElementById('newsDetail');
        
        if (!content) {
            newsDetail.innerHTML = `
                <div class="alert alert-warning">
                    Konten tidak ditemukan.
                </div>
            `;
            return;
        }

        let imagesHTML = '';
        if (content.images && content.images.length > 0) {
            imagesHTML = `
                <div class="row mt-4">
                    ${content.images.map(img => `
                        <div class="col-md-6 mb-3">
                            <img src="${img}" class="img-fluid rounded" alt="Gallery Image">
                        </div>
                    `).join('')}
                </div>
            `;
        }

        let audioHTML = '';
        if (isWorshipedia && content.audio) {
            audioHTML = `
                <div class="mt-4">
                    <h4>Audio Pembahasan</h4>
                    <audio controls class="w-100 mt-2">
                        <source src="${content.audio}" type="audio/mpeg">
                        Browser Anda tidak mendukung elemen audio.
                    </audio>
                </div>
            `;
        }

        newsDetail.innerHTML = `
            <h1 class="mb-4">${content.title}</h1>
            
            <div class="news-meta mb-4">
                ${isWorshipedia ? `
                    <span class="author me-3"><i class="fas fa-user me-2"></i>${content.author}</span>
                ` : `
                    <span class="location me-3"><i class="fas fa-map-marker-alt me-2"></i>${content.location}</span>
                `}
                <span class="date"><i class="far fa-calendar-alt me-2"></i>${content.date}</span>
            </div>
            
            <img src="${content.image}" alt="${content.title}" class="img-fluid rounded mb-4">
            
            <div class="news-content">
                ${content.content.map(paragraph => `<p>${paragraph}</p>`).join('')}
                
                ${imagesHTML}
                ${audioHTML}
            </div>
            
            <div class="news-footer mt-5 pt-4 border-top">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="share-buttons">
                        <span class="me-2">Bagikan:</span>
                        <a href="#" class="btn btn-sm btn-outline-secondary me-2"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="btn btn-sm btn-outline-secondary me-2"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="btn btn-sm btn-outline-secondary me-2"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#" class="btn btn-sm btn-outline-secondary"><i class="fab fa-whatsapp"></i></a>
                    </div>
                    <a href="index.html#news" class="btn btn-outline-primary">Kembali ke Beranda</a>
                </div>
            </div>
        `;
    }
});