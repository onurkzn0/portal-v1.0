// İletişim Sayfası JavaScript Kodları - Güncellenmiş
document.addEventListener('DOMContentLoaded', function() {
    console.log('İletişim sayfası yüklendi');
    
    // Tab geçişleri
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Aktif tabı değiştir
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // İletişim formu elementleri
    const contactForm = document.getElementById('communicationForm');
    const formTitle = document.getElementById('formTitle');
    const messageType = document.getElementById('messageType');
    const subjectField = document.getElementById('subject');
    const descriptionField = document.getElementById('description');
    const urgencyField = document.getElementById('urgency');
    const fileUploadBtn = document.getElementById('fileUploadBtn');
    const attachmentsField = document.getElementById('attachments');
    const fileNames = document.getElementById('fileNames');
    const contactFormContainer = document.getElementById('contactForm');
    const cancelBtn = document.getElementById('cancelBtn');
    
    // İletişim yöntemleri butonları
    const supportBtn = document.getElementById('supportBtn');
    const suggestionBtn = document.getElementById('suggestionBtn');
    const complaintBtn = document.getElementById('complaintBtn');
    
    // Formu başlangıçta gizle
    contactFormContainer.style.display = 'none';
    
    // Teknik destek butonu
    if (supportBtn) {
        supportBtn.addEventListener('click', function() {
            showContactForm('Teknik Destek Talebi', 'support');
        });
    }
    
    // Öneri butonu
    if (suggestionBtn) {
        suggestionBtn.addEventListener('click', function() {
            showContactForm('Öneri Bildirimi', 'suggestion');
        });
    }
    
    // Şikayet butonu
    if (complaintBtn) {
        complaintBtn.addEventListener('click', function() {
            showContactForm('Şikayet Bildirimi', 'complaint');
        });
    }
    
    // İptal butonu
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            contactFormContainer.style.display = 'none';
        });
    }
    
    // Dosya yükleme butonu
    if (fileUploadBtn && attachmentsField) {
        fileUploadBtn.addEventListener('click', function() {
            attachmentsField.click();
        });
        
        attachmentsField.addEventListener('change', function() {
            if (this.files.length > 0) {
                let names = '';
                for (let i = 0; i < this.files.length; i++) {
                    if (i > 0) names += ', ';
                    names += this.files[i].name;
                }
                fileNames.textContent = names;
            } else {
                fileNames.textContent = 'Dosya seçilmedi';
            }
        });
    }
    
    // Form gönderimi
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(this);
            const data = {
                type: formData.get('messageType'),
                subject: formData.get('subject'),
                description: formData.get('description'),
                urgency: formData.get('urgency'),
                attachments: attachmentsField.files
            };
            
            // Burada API'ye istek atılabilir
            console.log('İletişim formu gönderildi:', data);
            
            // Başarılı mesajı göster
            alert('Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapılacaktır.');
            
            // Formu sıfırla ve gizle
            this.reset();
            fileNames.textContent = 'Dosya seçilmedi';
            contactFormContainer.style.display = 'none';
            
            // Talepler listesini güncelle
            updateRequestsBadge();
        });
    }
    
    // Form gösterimi fonksiyonu
    function showContactForm(title, type) {
        formTitle.innerHTML = `<i class="fas fa-edit"></i> ${title}`;
        messageType.value = type;
        
        // Form alanlarını tipine göre özelleştir
        if (type === 'support') {
            subjectField.placeholder = 'Teknik sorununuzun konusunu yazın';
            descriptionField.placeholder = 'Sorununuzu detaylı bir şekilde açıklayın. Hata mesajları, adımlar vb. ekleyin.';
            urgencyField.style.display = 'block';
            document.querySelector('label[for="urgency"]').style.display = 'block';
        } else if (type === 'suggestion') {
            subjectField.placeholder = 'Önerinizin konusunu yazın';
            descriptionField.placeholder = 'Önerinizi detaylı bir şekilde açıklayın. Nasıl bir fayda sağlayacağını belirtin.';
            urgencyField.style.display = 'none';
            document.querySelector('label[for="urgency"]').style.display = 'none';
        } else if (type === 'complaint') {
            subjectField.placeholder = 'Şikayetinizin konusunu yazın';
            descriptionField.placeholder = 'Şikayetinizi detaylı bir şekilde açıklayın. Tarih, saat ve ilgili kişileri belirtin.';
            urgencyField.style.display = 'none';
            document.querySelector('label[for="urgency"]').style.display = 'none';
        }
        
        // Formu göster
        contactFormContainer.style.display = 'block';
        
        // Sayfayı forma kaydır
        contactFormContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Talepler listesi filtreleme
    const statusFilter = document.getElementById('statusFilter');
    const refreshBtn = document.getElementById('refreshBtn');
    const requestItems = document.querySelectorAll('.request-item');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterRequests(this.value);
        });
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            // Talepleri yenile
            alert('Talepler listesi yenileniyor...');
            // Burada API'den güncel veriler çekilebilir
        });
    }
    
    // Talepleri filtreleme fonksiyonu
    function filterRequests(status) {
        requestItems.forEach(item => {
            if (status === 'all' || item.getAttribute('data-status') === status) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Talep detay modal işlemleri
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const requestModal = document.getElementById('requestModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const detailSubject = document.getElementById('detailSubject');
    const detailType = document.getElementById('detailType');
    const detailDate = document.getElementById('detailDate');
    const detailStatus = document.getElementById('detailStatus');
    const responseForm = document.getElementById('responseForm');
    
    // Talep detaylarını görüntüleme
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const requestId = this.getAttribute('data-id');
            showRequestDetails(requestId);
        });
    });
    
    // Modal kapatma
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            requestModal.style.display = 'none';
        });
    }
    
    // Modal dışına tıklanınca kapat
    window.addEventListener('click', function(e) {
        if (e.target === requestModal) {
            requestModal.style.display = 'none';
        }
    });
    
    // Yanıt formu gönderimi
    if (responseForm) {
        responseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const responseMessage = document.getElementById('responseMessage').value;
            
            if (responseMessage.trim() === '') {
                alert('Lütfen bir mesaj yazın.');
                return;
            }
            
            // Burada API'ye yanıt gönderilebilir
            console.log('Yanıt gönderildi:', responseMessage);
            alert('Yanıtınız gönderildi!');
            
            // Formu temizle
            this.reset();
        });
    }
    
    // Talep detaylarını gösterme fonksiyonu
    function showRequestDetails(requestId) {
        // Burada API'den talep detayları çekilebilir
        // Şimdilik örnek verilerle çalışıyoruz
        
        const requestData = {
            '122': {
                subject: '#TK-2023-00122 - Mobil uyumluluk sorunu',
                type: 'Şikayet',
                date: '18 Eyl 2023, 16:45',
                status: 'Çözüldü',
                statusClass: 'status-resolved'
            },
            '123': {
                subject: '#TK-2023-00123 - Raporlama özelliği önerisi',
                type: 'Öneri',
                date: '19 Eyl 2023, 10:15',
                status: 'Açık',
                statusClass: 'status-open'
            },
            '124': {
                subject: '#TK-2023-00124 - Login sorunu',
                type: 'Teknik Destek',
                date: '20 Eyl 2023, 14:30',
                status: 'Yanıt Bekliyor',
                statusClass: 'status-answered'
            }
        };
        
        const data = requestData[requestId];
        
        if (data) {
            detailSubject.textContent = data.subject;
            detailType.textContent = data.type;
            detailDate.textContent = data.date;
            detailStatus.textContent = data.status;
            detailStatus.className = 'request-detail-status ' + data.statusClass;
            
            modalTitle.textContent = data.subject;
            requestModal.style.display = 'block';
        }
    }
    
    // Talepler badge güncelleme
    function updateRequestsBadge() {
        const badge = document.querySelector('.badge');
        if (badge) {
            const currentCount = parseInt(badge.textContent);
            badge.textContent = (currentCount + 1).toString();
        }
    }
    
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
    
    // Rastgele talep numarası oluştur
    function generateTicketNumber() {
        const randomNum = Math.floor(Math.random() * 1000) + 1;
        const ticketElement = document.getElementById('ticketNumber');
        if (ticketElement) {
            ticketElement.textContent = randomNum.toString().padStart(5, '0');
        }
    }
    
    generateTicketNumber();
});