// Portal ana sayfa JavaScript kodları
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portal ana sayfa yüklendi');
    
    // Kullanıcı menüsü
    const userDropdown = document.querySelector('.nav-user');
    const userMenu = document.querySelector('.user-menu');
    
    if (userDropdown) {
        userDropdown.addEventListener('click', function(e) {
            // Sadece dropdown ikonuna veya avatar'a tıklandığında menüyü aç
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
    
    // Mobil slider işlevselliği
    const dashboardGrid = document.getElementById('dashboardGrid');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    
    if (dashboardGrid && indicators.length > 0) {
        // İndikatör tıklama olayları
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // Kaydırma olayını dinle
        let isDown = false;
        let startX;
        let scrollLeft;
        
        dashboardGrid.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - dashboardGrid.offsetLeft;
            scrollLeft = dashboardGrid.scrollLeft;
        });
        
        dashboardGrid.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        dashboardGrid.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        dashboardGrid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - dashboardGrid.offsetLeft;
            const walk = (x - startX) * 2;
            dashboardGrid.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        dashboardGrid.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - dashboardGrid.offsetLeft;
            scrollLeft = dashboardGrid.scrollLeft;
        }, { passive: true });
        
        dashboardGrid.addEventListener('touchmove', (e) => {
            if (e.touches.length !== 1) return;
            const x = e.touches[0].pageX - dashboardGrid.offsetLeft;
            const walk = (x - startX) * 2;
            dashboardGrid.scrollLeft = scrollLeft - walk;
        }, { passive: true });
        
        // Scroll sonrası aktif slaytı güncelle
        dashboardGrid.addEventListener('scroll', () => {
            const scrollPos = dashboardGrid.scrollLeft;
            const slideWidth = dashboardGrid.offsetWidth;
            currentSlide = Math.round(scrollPos / slideWidth);
            updateIndicators();
        });
        
        // Belirli bir slayta git
        function goToSlide(index) {
            const slideWidth = dashboardGrid.offsetWidth;
            dashboardGrid.scrollTo({
                left: index * slideWidth,
                behavior: 'smooth'
            });
            currentSlide = index;
            updateIndicators();
        }
        
        // İndikatörleri güncelle
        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
    }
    
    // Widget sürükle bırak özelliği (masaüstü için)
    let draggedItem = null;
    
    if (dashboardGrid) {
        const widgets = dashboardGrid.querySelectorAll('.widget');
        
        widgets.forEach(widget => {
            // Sürükleme başladığında
            widget.addEventListener('dragstart', function() {
                if (window.innerWidth > 768) { // Sadece masaüstünde
                    draggedItem = this;
                    setTimeout(() => this.classList.add('dragging'), 0);
                }
            });
            
            // Sürükleme bittiğinde
            widget.addEventListener('dragend', function() {
                this.classList.remove('dragging');
                draggedItem = null;
            });
        });
        
        // Sürükleme sırasında
        dashboardGrid.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        // Üzerine bırakıldığında
        dashboardGrid.addEventListener('drop', function(e) {
            if (window.innerWidth > 768) { // Sadece masaüstünde
                e.preventDefault();
                if (draggedItem) {
                    // En yakın widget'ı bul
                    const afterElement = getDragAfterElement(dashboardGrid, e.clientY);
                    
                    if (afterElement) {
                        dashboardGrid.insertBefore(draggedItem, afterElement);
                    } else {
                        dashboardGrid.appendChild(draggedItem);
                    }
                    
                    // Sıralama değişikliğini kaydet
                    saveWidgetOrder();
                }
            }
        });
        
        // Sürükleme sonrası en yakın elementi bulma
        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll('.widget:not(.dragging)')];
            
            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        }
        
        // Widget sıralamasını kaydet
        function saveWidgetOrder() {
            const widgetOrder = [];
            dashboardGrid.querySelectorAll('.widget').forEach((widget, index) => {
                widgetOrder.push(widget.querySelector('h3').textContent);
            });
            
            localStorage.setItem('widgetOrder', JSON.stringify(widgetOrder));
            console.log('Widget sıralaması kaydedildi:', widgetOrder);
        }
        
        // Widget sıralamasını yükle
        function loadWidgetOrder() {
            const savedOrder = JSON.parse(localStorage.getItem('widgetOrder'));
            if (savedOrder && savedOrder.length > 0) {
                const widgets = Array.from(dashboardGrid.querySelectorAll('.widget'));
                
                savedOrder.forEach(title => {
                    const widget = widgets.find(w => w.querySelector('h3').textContent === title);
                    if (widget) {
                        dashboardGrid.appendChild(widget);
                    }
                });
            }
        }
        
        // Sayfa yüklendiğinde sıralamayı yükle
        if (window.innerWidth > 768) {
            loadWidgetOrder();
        }
    }
    
    // Hava durumu bilgilerini al
    function getWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    
                    // OpenWeatherMap API (ücretsiz sürüm)
                    const apiKey = 'c1c41eb8ff8ea5d8ec1a3e25aab44c5f'; // API anahtarınızı buraya yazın
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=tr`;
                    
                    // API'ye istek at
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            updateWeatherUI(data);
                        })
                        .catch(error => {
                            console.error('Hava durumu alınamadı:', error);
                            showDefaultWeather();
                        });
                },
                error => {
                    console.error('Konum alınamadı:', error);
                    showDefaultWeather();
                }
            );
        } else {
            console.error('Tarayıcı konum bilgisini desteklemiyor');
            showDefaultWeather();
        }
    }
    
    // Hava durumu bilgilerini arayüze yansıt
    function updateWeatherUI(data) {
        const weatherIcon = document.getElementById('weatherIcon');
        const weatherTemp = document.getElementById('weatherTemp');
        const weatherDesc = document.getElementById('weatherDesc');
        const weatherLocation = document.getElementById('weatherLocation');
        const weatherHumidity = document.getElementById('weatherHumidity');
        const weatherWind = document.getElementById('weatherWind');
        
        // Hava durumu ikonunu belirle
        const iconMap = {
            '01d': 'fa-sun',
            '01n': 'fa-moon',
            '02d': 'fa-cloud-sun',
            '02n': 'fa-cloud-moon',
            '03d': 'fa-cloud',
            '03n': 'fa-cloud',
            '04d': 'fa-cloud',
            '04n': 'fa-cloud',
            '09d': 'fa-cloud-rain',
            '09n': 'fa-cloud-rain',
            '10d': 'fa-cloud-sun-rain',
            '10n': 'fa-cloud-moon-rain',
            '11d': 'fa-bolt',
            '11n': 'fa-bolt',
            '13d': 'fa-snowflake',
            '13n': 'fa-snowflake',
            '50d': 'fa-smog',
            '50n': 'fa-smog'
        };
        
        const iconCode = data.weather[0].icon;
        weatherIcon.className = `fas ${iconMap[iconCode] || 'fa-cloud'}`;
        
        // Diğer bilgileri güncelle
        weatherTemp.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDesc.textContent = data.weather[0].description;
        weatherLocation.textContent = data.name;
        weatherHumidity.textContent = `${data.main.humidity}%`;
        weatherWind.textContent = `${Math.round(data.wind.speed * 3.6)} km/s`;
    }
    
    // Varsayılan hava durumu bilgisi (konum alınamazsa)
    function showDefaultWeather() {
        const weatherIcon = document.getElementById('weatherIcon');
        const weatherTemp = document.getElementById('weatherTemp');
        const weatherDesc = document.getElementById('weatherDesc');
        const weatherLocation = document.getElementById('weatherLocation');
        const weatherHumidity = document.getElementById('weatherHumidity');
        const weatherWind = document.getElementById('weatherWind');
        
        weatherIcon.className = 'fas fa-cloud';
        weatherTemp.textContent = '24°C';
        weatherDesc.textContent = 'Parçalı bulutlu';
        weatherLocation.textContent = 'İstanbul';
        weatherHumidity.textContent = '65%';
        weatherWind.textContent = '12 km/s';
    }
    
    // Hava durumu bilgilerini al
    getWeather();
    
    // Tablo satır tıklama olayları
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            if (!e.target.classList.contains('icon-btn')) {
                const projectName = this.cells[0].textContent;
                alert(`${projectName} projesinin detay sayfası açılacak`);
            }
        });
    });
    
    // Widget menü butonları
    const widgetActions = document.querySelectorAll('.widget-actions');
    widgetActions.forEach(action => {
        action.addEventListener('click', function() {
            const widgetTitle = this.parentElement.querySelector('h3').textContent;
            alert(`${widgetTitle} widget için menü açılacak`);
        });
    });
    
    // Sayfa yüklendiğinde istatistikleri güncelle (simülasyon)
    function updateStats() {
        const contentValues = document.querySelectorAll('.content-value');
        
        contentValues.forEach(value => {
            const currentValue = parseInt(value.textContent);
            const newValue = currentValue + Math.floor(Math.random() * 5);
            value.textContent = newValue;
        });
    }
    
    // İstatistikleri her 60 saniyede bir güncelle
    setInterval(updateStats, 60000);
    
    // Pencere boyutu değiştiğinde
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            // Mobil modda slider yapısını etkinleştir
            dashboardGrid.style.display = 'flex';
            dashboardGrid.style.overflowX = 'auto';
            dashboardGrid.style.scrollSnapType = 'x mandatory';
        } else {
            // Masaüstü modda grid yapısını geri yükle
            dashboardGrid.style.display = 'grid';
            dashboardGrid.style.overflowX = 'visible';
            dashboardGrid.style.scrollSnapType = 'none';
        }
    });
    
    // Responsive tablo için ek işlevler
    function initResponsiveTable() {
        const table = document.querySelector('.data-table');
        if (!table) return;
        
        // Küçük ekranlarda tablo başlıklarını optimize et
        function optimizeTableForMobile() {
            if (window.innerWidth < 400) {
                // Sadece gerekli sütunları göster
                const headers = table.querySelectorAll('th');
                const cells = table.querySelectorAll('td');
                
                // İlk iki ve son iki sütunu göster, diğerlerini gizle
                headers.forEach((header, index) => {
                    if (index >= 2 && index <= 3) {
                        header.style.display = 'none';
                    }
                });
                
                cells.forEach((cell, index) => {
                    const columnIndex = index % 6; // 6 sütun olduğunu varsayıyoruz
                    if (columnIndex >= 2 && columnIndex <= 3) {
                        cell.style.display = 'none';
                    }
                });
            } else {
                // Tüm sütunları göster
                const headers = table.querySelectorAll('th');
                const cells = table.querySelectorAll('td');
                
                headers.forEach(header => {
                    header.style.display = '';
                });
                
                cells.forEach(cell => {
                    cell.style.display = '';
                });
            }
        }
        
        // Sayfa yüklendiğinde ve boyut değiştiğinde kontrol et
        optimizeTableForMobile();
        window.addEventListener('resize', optimizeTableForMobile);
    }
    
    // Sayfa yüklendiğinde responsive tabloyu başlat
    initResponsiveTable();
    
    // Mobil cihazlarda tablo kaydırma deneyimini iyileştir
    const tableSection = document.querySelector('.table-section');
    if (tableSection && window.innerWidth <= 768) {
        tableSection.style.overflowX = 'auto';
    }
});

// Pozisyon alanını tamamen değiştirilemez yap
document.addEventListener('DOMContentLoaded', function() {
    const positionField = document.getElementById('position');
    
    if (positionField) {
        // Sadece salt okunur yap
        positionField.readOnly = true;
        
        // Klavye ile değişiklik yapılmasını engelle
        positionField.addEventListener('keydown', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Sağ tık menüsünü engelle
        positionField.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Tooltip için ek işlevsellik
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.addEventListener('click', function() {
                alert('Pozisyonunuzu değiştirmek için yöneticinizle iletişime geçin.');
            });
        }
    }
});