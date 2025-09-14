// Ayarlar Sayfası JavaScript Kodları
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ayarlar sayfası yüklendi');
    
    // Tab geçişleri
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.settings-content');
    
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
    
    // Avatar yükleme
    const avatarUpload = document.getElementById('avatarUpload');
    const uploadTrigger = document.getElementById('uploadTrigger');
    const avatarPreview = document.getElementById('avatarPreview');
    
    if (uploadTrigger && avatarUpload) {
        uploadTrigger.addEventListener('click', () => {
            avatarUpload.click();
        });
        
        avatarUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    avatarPreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Şifre gücü kontrolü
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (newPassword) {
        newPassword.addEventListener('input', checkPasswordStrength);
    }
    
    if (confirmPassword && newPassword) {
        confirmPassword.addEventListener('input', () => {
            if (confirmPassword.value !== newPassword.value) {
                confirmPassword.setCustomValidity('Şifreler eşleşmiyor');
            } else {
                confirmPassword.setCustomValidity('');
            }
        });
    }
    
    function checkPasswordStrength() {
        const password = newPassword.value;
        let strength = 0;
        
        // Uzunluk kontrolü
        if (password.length > 5) strength += 20;
        if (password.length > 8) strength += 20;
        
        // Çeşitlilik kontrolü
        if (password.match(/[a-z]/)) strength += 20;
        if (password.match(/[A-Z]/)) strength += 20;
        if (password.match(/[0-9]/)) strength += 20;
        if (password.match(/[^a-zA-Z0-9]/)) strength += 20;
        
        // Güç çubuğunu güncelle
        strength = Math.min(strength, 100);
        strengthBar.style.width = `${strength}%`;
        
        // Güç metnini güncelle
        if (strength < 40) {
            strengthText.textContent = 'Zayıf';
            strengthBar.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        } else if (strength < 70) {
            strengthText.textContent = 'Orta';
            strengthBar.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
        } else {
            strengthText.textContent = 'Güçlü';
            strengthBar.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        }
    }
    
    // Tema seçimi
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            const theme = option.getAttribute('data-theme');
            // Tema değişikliğini uygula (gerçek uygulamada localStorage kullanılabilir)
            console.log(`Tema değiştirildi: ${theme}`);
        });
    });
    
    // Form gönderimleri
    const forms = document.querySelectorAll('.settings-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Burada API'ye istek atılabilir
            console.log('Form gönderildi:', data);
            
            // Başarılı mesajı göster
            alert('Değişiklikler başarıyla kaydedildi!');
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
});