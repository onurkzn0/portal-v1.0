// Form yönetimi ve geçişler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const resetForm = document.getElementById('resetForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const createAccountLink = document.getElementById('createAccountLink');
    const backToLoginLink = document.getElementById('backToLoginLink');
    const formTitle = document.getElementById('formTitle');
    const formDescription = document.getElementById('formDescription');
    
    // Özel uyarı kutusu elementleri
    const customAlert = document.getElementById('customAlert');
    const alertTitle = document.getElementById('alertTitle');
    const alertMessage = document.getElementById('alertMessage');
    const alertIcon = document.getElementById('alertIcon');
    const alertButton = document.getElementById('alertButton');
    const alertClose = document.querySelector('.alert-close');
    
    // Özel uyarı gösterme fonksiyonu
    function showAlert(title, message, type) {
        alertTitle.textContent = title;
        alertMessage.textContent = message;
        
        if (type === 'success') {
            alertIcon.className = 'alert-icon success';
            alertIcon.innerHTML = '✓';
        } else if (type === 'error') {
            alertIcon.className = 'alert-icon error';
            alertIcon.innerHTML = '✕';
        }
        
        customAlert.style.display = 'flex';
    }
    
    // Uyarı kutusunu kapatma
    alertButton.addEventListener('click', function() {
        customAlert.style.display = 'none';
    });
    
    alertClose.addEventListener('click', function() {
        customAlert.style.display = 'none';
    });
    
    // Şifremi unuttum linkine tıklama
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        hideAllForms();
        resetForm.classList.add('active-form');
        resetForm.classList.remove('hidden-form');
        formTitle.textContent = 'Şifremi Unuttum';
        formDescription.textContent = 'Şifre sıfırlama bağlantısı almak için e-posta adresinizi girin';
        toggleLinks(true);
    });
    
    // Hesap oluştur linkine tıklama
    createAccountLink.addEventListener('click', function(e) {
        e.preventDefault();
        hideAllForms();
        registerForm.classList.add('active-form');
        registerForm.classList.remove('hidden-form');
        formTitle.textContent = 'Hesap Oluştur';
        formDescription.textContent = 'Yeni bir hesap oluşturmak için bilgilerinizi girin';
        toggleLinks(true);
    });
    
    // Girişe dön linkine tıklama
    backToLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        hideAllForms();
        loginForm.classList.add('active-form');
        loginForm.classList.remove('hidden-form');
        formTitle.textContent = 'Portal Girişi';
        formDescription.textContent = 'Lütfen hesabınıza erişmek için giriş yapın';
        toggleLinks(false);
    });
    
    // Tüm formları gizleme fonksiyonu
    function hideAllForms() {
        loginForm.classList.remove('active-form');
        loginForm.classList.add('hidden-form');
        resetForm.classList.remove('active-form');
        resetForm.classList.add('hidden-form');
        registerForm.classList.remove('active-form');
        registerForm.classList.add('hidden-form');
    }
    
    // Link görünürlüğünü değiştirme
    function toggleLinks(isAlternativeForm) {
        if (isAlternativeForm) {
            forgotPasswordLink.classList.add('hidden-link');
            createAccountLink.classList.add('hidden-link');
            backToLoginLink.classList.remove('hidden-link');
            backToLoginLink.classList.add('visible-link');
        } else {
            forgotPasswordLink.classList.remove('hidden-link');
            createAccountLink.classList.remove('hidden-link');
            backToLoginLink.classList.remove('visible-link');
            backToLoginLink.classList.add('hidden-link');
        }
    }
    
    // Giriş formu gönderimi
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username.trim() === '') {
                showAlert('Hata', 'Lütfen kullanıcı adınızı giriniz.', 'error');
                return;
            }
            
            if (password.trim() === '') {
                showAlert('Hata', 'Lütfen şifrenizi giriniz.', 'error');
                return;
            }
            
            // Test kullanıcı bilgileri
            const testUsername = "onur";
            const testPassword = "1234";
            
            if (username === testUsername && password === testPassword) {
                // Başarılı giriş
                showAlert('Başarılı', 'Giriş işlemi başarılı! Yönlendiriliyorsunuz...', 'success');
                
                // 2 saniye sonra ana sayfaya yönlendirme simülasyonu
                setTimeout(function() {
                    // Burada normalde yönlendirme yapılır
                    console.log('Giriş başarılı, yönlendiriliyor...');
                    // window.location.href = "ana-sayfa.html";
                }, 2000);
            } else {
                // Hatalı giriş
                showAlert('Hata', 'Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.', 'error');
            }
            
            // Formu temizle
            this.reset();
        });
    }
    
    // Şifre sıfırlama formu gönderimi
    if (resetForm) {
        resetForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            
            if (email.trim() === '') {
                showAlert('Hata', 'Lütfen e-posta adresinizi giriniz.', 'error');
                return;
            }
            
            // Email formatı kontrolü (basit)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Hata', 'Lütfen geçerli bir e-posta adresi giriniz.', 'error');
                return;
            }
            
            // Burada normalde şifre sıfırlama isteği için sunucuya istek atılır
            console.log('Şifre sıfırlama isteği:', { email });
            showAlert('Başarılı', 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!', 'success');
            
            // Formu temizle
            this.reset();
        });
    }
    // Kayıt formu gönderimi
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.getElementById('regUsername').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const passwordConfirm = document.getElementById('regPasswordConfirm').value;
            
            if (username.trim() === '') {
                showAlert('Hata', 'Lütfen kullanıcı adınızı giriniz.', 'error');
                return;
            }
            
            if (email.trim() === '') {
                showAlert('Hata', 'Lütfen e-posta adresinizi giriniz.', 'error');
                return;
            }
            
            // Email formatı kontrolü (basit)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Hata', 'Lütfen geçerli bir e-posta adresi giriniz.', 'error');
                return;
            }
            
            if (password.trim() === '') {
                showAlert('Hata', 'Lütfen şifrenizi giriniz.', 'error');
                return;
            }
            
            if (password !== passwordConfirm) {
                showAlert('Hata', 'Girdiğiniz şifreler eşleşmiyor.', 'error');
                return;
            }
            
            // Burada normalde kayıt işlemi için sunucuya istek atılır
            console.log('Kayıt işlemi:', { username, email, password });
            showAlert('Başarılı', 'Kayıt işlemi başarılı! Giriş sayfasına yönlendiriliyorsunuz.', 'success');
            
            // Formu temizle ve giriş sayfasına dön
            setTimeout(() => {
                this.reset();
                backToLoginLink.click();
            }, 2000);
        });
    }
});