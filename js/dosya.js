// Dosyalar Sayfası JavaScript Kodları
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dosyalar sayfası yüklendi');
    
    // Değişkenler
    const uploadArea = document.getElementById('uploadArea');
    const uploadBtn = document.getElementById('uploadBtn');
    const browseBtn = document.getElementById('browseBtn');
    const fileInput = document.getElementById('fileInput');
    const uploadModal = document.getElementById('uploadModal');
    const uploadModalClose = document.getElementById('uploadModalClose');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const startUploadBtn = document.getElementById('startUploadBtn');
    const modalBrowseBtn = document.getElementById('modalBrowseBtn');
    const modalFileInput = document.getElementById('modalFileInput');
    const modalDropZone = document.getElementById('modalDropZone');
    const fileSearch = document.getElementById('fileSearch');
    const sortSelect = document.getElementById('sortSelect');
    const viewButtons = document.querySelectorAll('.view-btn');
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');
    const categoryLinks = document.querySelectorAll('.category-link');
    const fileCards = document.querySelectorAll('.file-card');
    const fileRows = document.querySelectorAll('.files-table tbody tr');
    const selectAll = document.getElementById('selectAll');
    
    // Dosya Yükleme Modalını Aç
    if (uploadBtn && uploadModal) {
        uploadBtn.addEventListener('click', function() {
            uploadModal.style.display = 'block';
        });
    }
    
    // Modalı Kapat
    if (uploadModalClose) {
        uploadModalClose.addEventListener('click', function() {
            uploadModal.style.display = 'none';
        });
    }
    
    if (cancelUploadBtn) {
        cancelUploadBtn.addEventListener('click', function() {
            uploadModal.style.display = 'none';
        });
    }
    
    // Modal dışına tıklanınca kapat
    window.addEventListener('click', function(e) {
        if (e.target === uploadModal) {
            uploadModal.style.display = 'none';
        }
    });
    
    // Dosya Seçme
    if (browseBtn && fileInput) {
        browseBtn.addEventListener('click', function() {
            fileInput.click();
        });
    }
    
    if (modalBrowseBtn && modalFileInput) {
        modalBrowseBtn.addEventListener('click', function() {
            modalFileInput.click();
        });
    }
    
    // Dosya Yükleme İşlemi
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    if (modalFileInput) {
        modalFileInput.addEventListener('change', handleFileSelect);
    }
    
    function handleFileSelect(e) {
        const files = e.target.files;
        if (files.length > 0) {
            // Yükleme işlemini başlat
            startUploadBtn.disabled = false;
            alert(`${files.length} dosya seçildi. Yüklemek için "Yüklemeyi Başlat" butonuna tıklayın.`);
            
            // Gerçek uygulamada burada dosya yükleme işlemi başlatılır
        }
    }
    
    // Sürükle-Bırak Fonksiyonelliği
    if (modalDropZone) {
        modalDropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('active');
        });
        
        modalDropZone.addEventListener('dragleave', function() {
            this.classList.remove('active');
        });
        
        modalDropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('active');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                // Yükleme işlemini başlat
                startUploadBtn.disabled = false;
                alert(`${files.length} dosya bırakıldı. Yüklemek için "Yüklemeyi Başlat" butonuna tıklayın.`);
            }
        });
    }
    
    // Görünüm Değiştirme
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const viewType = this.getAttribute('data-view');
            
            // Aktif butonu değiştir
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Görünümü değiştir
            if (viewType === 'grid') {
                gridView.classList.add('active');
                listView.classList.remove('active');
            } else {
                gridView.classList.remove('active');
                listView.classList.add('active');
            }
        });
    });
    
    // Dosya Arama
    if (fileSearch) {
        fileSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // Grid görünümünde arama
            fileCards.forEach(card => {
                const fileName = card.querySelector('.file-name').textContent.toLowerCase();
                if (fileName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Liste görünümünde arama
            fileRows.forEach(row => {
                const fileName = row.querySelector('.col-name span').textContent.toLowerCase();
                if (fileName.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Sıralama
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            alert(`Dosyalar ${sortValue} seçeneğine göre sıralanacak.`);
            // Gerçek uygulamada burada sıralama işlemi yapılır
        });
    }
    
    // Kategori Filtreleme
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            // Aktif kategoriyi güncelle
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Dosyaları filtrele
            if (category === 'all') {
                fileCards.forEach(card => card.style.display = 'block');
                fileRows.forEach(row => row.style.display = '');
            } else {
                fileCards.forEach(card => {
                    if (card.getAttribute('data-type') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                fileRows.forEach(row => {
                    if (row.getAttribute('data-type') === category) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Tümünü Seç
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const isChecked = this.checked;
            
            // Grid görünümündeki checkbox'ları güncelle
            document.querySelectorAll('.file-checkbox input').forEach(checkbox => {
                checkbox.checked = isChecked;
            });
            
            // Liste görünümündeki checkbox'ları güncelle
            document.querySelectorAll('.files-table .col-checkbox input').forEach(checkbox => {
                checkbox.checked = isChecked;
            });
        });
    }
    
    // Dosya İndirme
    document.querySelectorAll('.action-btn[title="İndir"]').forEach(button => {
        button.addEventListener('click', function() {
            const fileName = this.closest('.file-card')?.querySelector('.file-name')?.textContent || 
                            this.closest('tr')?.querySelector('.col-name span')?.textContent;
            alert(`"${fileName}" dosyası indiriliyor...`);
        });
    });
    
    // Dosya Paylaşma
    document.querySelectorAll('.action-btn[title="Paylaş"]').forEach(button => {
        button.addEventListener('click', function() {
            const fileName = this.closest('.file-card')?.querySelector('.file-name')?.textContent || 
                            this.closest('tr')?.querySelector('.col-name span')?.textContent;
            alert(`"${fileName}" dosyası paylaşım seçenekleri gösterilecek.`);
        });
    });
    
    // Yeni Klasör Oluşturma
    const newFolderBtn = document.getElementById('newFolderBtn');
    if (newFolderBtn) {
        newFolderBtn.addEventListener('click', function() {
            const folderName = prompt('Yeni klasör adını girin:');
            if (folderName && folderName.trim() !== '') {
                alert(`"${folderName}" klasörü oluşturuldu.`);
                // Gerçek uygulamada burada klasör oluşturma işlemi yapılır
            }
        });
    }
    
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
    
    // Depolama arttırma butonu
    const storageUpgrade = document.querySelector('.storage-upgrade');
    if (storageUpgrade) {
        storageUpgrade.addEventListener('click', function() {
            alert('Depolama arttırma seçenekleri gösterilecek.');
        });
    }
});