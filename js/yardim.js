// Yardım Sayfası JavaScript Kodları
document.addEventListener('DOMContentLoaded', function() {
    console.log('Yardım sayfası yüklendi');
    
    // SSS açılır kapanır
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Tüm cevapları kapat
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });
            
            // Tüm soruları pasif yap
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });
            
            // Eğer tıklanan zaten aktif değilse, aç
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
    
    // SSS filtreleme
    const faqTabs = document.querySelectorAll('.faq-tab');
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            
            // Aktif tabı değiştir
            faqTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Soruları filtrele
            faqItems.forEach(item => {
                const categories = item.getAttribute('data-categories');
                
                if (category === 'all' || categories.includes(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Arama işlevi
    const helpSearch = document.getElementById('helpSearch');
    const searchButton = document.querySelector('.search-container .btn');
    
    if (helpSearch && searchButton) {
        const performSearch = () => {
            const searchTerm = helpSearch.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Arama kutusu boşsa tüm soruları göster
                faqItems.forEach(item => {
                    item.style.display = 'block';
                });
                return;
            }
            
            // Sorularda arama yap
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    
                    // Eğer cevap içinde geçiyorsa, soruyu aç
                    if (answer.includes(searchTerm) && !item.querySelector('.faq-question').classList.contains('active')) {
                        item.querySelector('.faq-question').click();
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        };
        
        helpSearch.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        searchButton.addEventListener('click', performSearch);
    }
    
    // Canlı sohbet butonu
    const chatButton = document.querySelector('.support-option .btn-primary');
    if (chatButton) {
        chatButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Canlı sohbet başlatılıyor... Lütfen bekleyin.');
            // Gerçek uygulamada burada sohbet entegrasyonu olacak
        });
    }
    
    // Telefon butonu
    const phoneButton = document.querySelector('.support-option .btn-outline');
    if (phoneButton && phoneButton.textContent.trim() === 'Ara') {
        phoneButton.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.closest('.support-option').querySelector('p').textContent;
            alert(`${phoneNumber} numarası aranıyor...`);
            // Gerçek uygulamada tel: linki açılacak
        });
    }
    
    // Video kartları tıklama
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoTitle = this.querySelector('h3').textContent;
            alert(`"${videoTitle}" videosu açılıyor...`);
            // Gerçek uygulamada video oynatıcı açılacak
        });
    });
    
    // Kategori kartları
    const categoryCards = document.querySelectorAll('.category-card .btn-outline');
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.closest('.category-card').querySelector('h3').textContent;
            
            // İlgili SSS bölümüne kaydır
            document.getElementById('sss').scrollIntoView({ behavior: 'smooth' });
            
            // İlgili kategori sekmesini aktif et
            const categoryMap = {
                'Giriş & Hesap': 'giris',
                'Ayarlar & Tercihler': 'hesap',
                'Dosya Yönetimi': 'dosya',
                'Kullanıcı İşlemleri': 'teknik',
                'Raporlama': 'teknik',
                'Mobil Uygulama': 'teknik'
            };
            
            const tabCategory = categoryMap[category] || 'all';
            const tab = document.querySelector(`.faq-tab[data-category="${tabCategory}"]`);
            
            if (tab) {
                tab.click();
            }
        });
    });
    
    // Kullanıcı menüsü
    const userDropdown = document.querySelector('.nav-user');
    const userMenu = document.querySelector('.user-menu');
    
    if (userDropdown) {
        userDropdown.addEventListener('click', function(e) {
            if (e.target.closest('.user-dropdown') || e.target.closest('.user-avatar')) {
                userMenu.classList.toggle('active');
                e.stopPropagation();
            }
        });
    }
    
    // Dışarı tıklandığında menüyü kapat
    document.addEventListener('click', function(e) {
        if (userMenu && userMenu.classList.contains('active') && !e.target.closest('.nav-user')) {
            userMenu.classList.remove('active');
        }
    });
    
    // Çıkış butonu
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
                window.location.href = 'index.html';
            }
        });
    }
    
    // Sidebar toggle (mobil)
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Sayfa yüklendiğinde hash değerine göre scroll
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Eğer bir SSS elementiyse, aç
                if (targetElement.classList.contains('faq-item')) {
                    targetElement.querySelector('.faq-question').click();
                }
            }, 500);
        }
    }
});