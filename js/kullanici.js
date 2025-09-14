// Kullanıcılar Sayfası JavaScript Kodları
document.addEventListener('DOMContentLoaded', function() {
    console.log('Kullanıcılar sayfası yüklendi');
    
    // Kullanıcı verileri (gerçek uygulamada API'den çekilecek)
    const usersData = {
        '101': {
            name: 'Ahmet Yılmaz',
            position: 'Frontend Developer',
            department: 'Yazılım Geliştirme',
            email: 'ahmet.yilmaz@onurkazan.com.tr',
            phone: '+90 555 100 10 10',
            joinDate: '15 Mart 2022',
            location: 'İstanbul, Türkiye',
            status: 'online',
            stats: {
                projects: 12,
                tasks: 5,
                completion: 98
            }
        },
        '102': {
            name: 'Zeynep Kaya',
            position: 'UI/UX Designer',
            department: 'Tasarım',
            email: 'zeynep.kaya@onurkazan.com.tr',
            phone: '+90 555 200 20 20',
            joinDate: '22 Haziran 2021',
            location: 'Ankara, Türkiye',
            status: 'online',
            stats: {
                projects: 8,
                tasks: 3,
                completion: 92
            }
        },
        '103': {
            name: 'Mehmet Demir',
            position: 'Digital Marketing Specialist',
            department: 'Pazarlama',
            email: 'mehmet.demir@onurkazan.com.tr',
            phone: '+90 555 300 30 30',
            joinDate: '10 Ocak 2023',
            location: 'İzmir, Türkiye',
            status: 'busy',
            stats: {
                projects: 6,
                tasks: 12,
                completion: 85
            }
        },
        '104': {
            name: 'Ayşe Çelik',
            position: 'Sales Manager',
            department: 'Satış',
            email: 'ayse.celik@onurkazan.com.tr',
            phone: '+90 555 400 40 40',
            joinDate: '05 Eylül 2020',
            location: 'Bursa, Türkiye',
            status: 'offline',
            stats: {
                projects: 15,
                tasks: 7,
                completion: 78
            }
        },
        '105': {
            name: 'Ali Öztürk',
            position: 'Technical Support',
            department: 'Destek',
            email: 'ali.ozturk@onurkazan.com.tr',
            phone: '+90 555 500 50 50',
            joinDate: '18 Kasım 2022',
            location: 'Adana, Türkiye',
            status: 'away',
            stats: {
                projects: 23,
                tasks: 4,
                completion: 96
            }
        },
        '106': {
            name: 'Fatma Yıldız',
            position: 'Backend Developer',
            department: 'Yazılım Geliştirme',
            email: 'fatma.yildiz@onurkazan.com.tr',
            phone: '+90 555 600 60 60',
            joinDate: '30 Temmuz 2022',
            location: 'Kocaeli, Türkiye',
            status: 'online',
            stats: {
                projects: 9,
                tasks: 6,
                completion: 91
            }
        }
    };
    
    // Arama ve filtreleme
    const userSearch = document.getElementById('userSearch');
    const departmentFilter = document.getElementById('departmentFilter');
    const statusFilter = document.getElementById('statusFilter');
    const usersGrid = document.getElementById('usersGrid');
    const userCards = document.querySelectorAll('.user-card');
    
    // Arama işlevi
    if (userSearch) {
        userSearch.addEventListener('input', filterUsers);
    }
    
    if (departmentFilter) {
        departmentFilter.addEventListener('change', filterUsers);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterUsers);
    }
    
    // Kullanıcı filtreleme fonksiyonu
    function filterUsers() {
        const searchText = userSearch.value.toLowerCase();
        const departmentValue = departmentFilter.value;
        const statusValue = statusFilter.value;
        
        userCards.forEach(card => {
            const userName = card.querySelector('h3').textContent.toLowerCase();
            const userPosition = card.querySelector('p').textContent.toLowerCase();
            const userDepartment = card.getAttribute('data-department');
            const userStatus = card.getAttribute('data-status');
            
            const matchesSearch = userName.includes(searchText) || userPosition.includes(searchText);
            const matchesDepartment = departmentValue === 'all' || userDepartment === departmentValue;
            const matchesStatus = statusValue === 'all' || userStatus === statusValue;
            
            if (matchesSearch && matchesDepartment && matchesStatus) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Daha fazla yükle butonu
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Burada API'den daha fazla kullanıcı yüklenebilir
            alert('Daha fazla kullanıcı yükleniyor...');
        });
    }
    
    // Mesaj gönderme modalı
    const messageModal = document.getElementById('messageModal');
    const messageModalClose = document.getElementById('messageModalClose');
    const messageModalTitle = document.getElementById('messageModalTitle');
    const messageForm = document.getElementById('messageForm');
    const cancelMessageBtn = document.getElementById('cancelMessageBtn');
    
    // Mesaj butonları
    const messageButtons = document.querySelectorAll('.message-btn');
    
    messageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-userid');
            openMessageModal(userId);
        });
    });
    
    // Mesaj modalını açma fonksiyonu
    function openMessageModal(userId) {
        const userData = usersData[userId];
        
        if (userData) {
            // Modal içeriğini doldur
            document.getElementById('recipientName').textContent = userData.name;
            document.getElementById('recipientPosition').textContent = userData.position;
            document.getElementById('recipientAvatar').src = document.querySelector(`.message-btn[data-userid="${userId}"]`).closest('.user-card').querySelector('img').src;
            document.getElementById('recipientStatus').className = 'user-status ' + userData.status;
            
            // Modal başlığını güncelle
            messageModalTitle.textContent = `${userData.name} - Mesaj Gönder`;
            
            // Modalı göster
            messageModal.style.display = 'block';
        }
    }
    
    // Mesaj modalını kapatma
    if (messageModalClose) {
        messageModalClose.addEventListener('click', function() {
            messageModal.style.display = 'none';
        });
    }
    
    if (cancelMessageBtn) {
        cancelMessageBtn.addEventListener('click', function() {
            messageModal.style.display = 'none';
        });
    }
    
    // Mesaj formu gönderimi
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const subject = document.getElementById('messageSubject').value;
            const content = document.getElementById('messageContent').value;
            const recipient = document.getElementById('recipientName').textContent;
            
            if (!subject.trim() || !content.trim()) {
                alert('Lütfen konu ve mesaj içeriği girin.');
                return;
            }
            
            // Burada API'ye mesaj gönderilebilir
            console.log('Mesaj gönderiliyor:', { subject, content, recipient });
            alert(`Mesajınız ${recipient} kullanıcısına gönderildi!`);
            
            // Formu temizle ve modalı kapat
            this.reset();
            messageModal.style.display = 'none';
        });
    }
    
    // Profil görüntüleme modalı
    const profileModal = document.getElementById('profileModal');
    const profileModalClose = document.getElementById('profileModalClose');
    const profileModalTitle = document.getElementById('profileModalTitle');
    const profileMessageBtn = document.getElementById('profileMessageBtn');
    
    // Profil butonları
    const profileButtons = document.querySelectorAll('.profile-btn');
    
    profileButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-userid');
            openProfileModal(userId);
        });
    });
    
    // Profil modalını açma fonksiyonu
    function openProfileModal(userId) {
        const userData = usersData[userId];
        
        if (userData) {
            // Modal içeriğini doldur
            document.getElementById('profileName').textContent = userData.name;
            document.getElementById('profilePosition').textContent = userData.position;
            document.getElementById('profileDepartment').textContent = userData.department;
            document.getElementById('profileEmail').textContent = userData.email;
            document.getElementById('profilePhone').textContent = userData.phone;
            document.getElementById('profileJoinDate').textContent = userData.joinDate;
            document.getElementById('profileLocation').textContent = userData.location;
            document.getElementById('profileAvatar').src = document.querySelector(`.profile-btn[data-userid="${userId}"]`).closest('.user-card').querySelector('img').src;
            document.getElementById('profileStatus').className = 'user-status ' + userData.status;
            
            // İstatistikleri doldur
            document.getElementById('statProjects').textContent = userData.stats.projects;
            document.getElementById('statTasks').textContent = userData.stats.tasks;
            document.getElementById('statCompletion').textContent = userData.stats.completion + '%';
            
            // Modal başlığını güncelle
            profileModalTitle.textContent = `${userData.name} - Profil`;
            
            // Profil mesaj butonuna kullanıcı ID'sini ata
            profileMessageBtn.setAttribute('data-userid', userId);
            
            // Modalı göster
            profileModal.style.display = 'block';
        }
    }
    
    // Profil modalını kapatma
    if (profileModalClose) {
        profileModalClose.addEventListener('click', function() {
            profileModal.style.display = 'none';
        });
    }
    
    // Profilden mesaj gönderme
    if (profileMessageBtn) {
        profileMessageBtn.addEventListener('click', function() {
            const userId = this.getAttribute('data-userid');
            profileModal.style.display = 'none';
            openMessageModal(userId);
        });
    }
    
    // Modal dışına tıklanınca kapat
    window.addEventListener('click', function(e) {
        if (e.target === messageModal) {
            messageModal.style.display = 'none';
        }
        if (e.target === profileModal) {
            profileModal.style.display = 'none';
        }
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
});