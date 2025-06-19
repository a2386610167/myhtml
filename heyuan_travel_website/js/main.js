// Main JavaScript for Heyuan Travel Website

// Global variables
let travelData = null;
let currentHotelView = 'cards';

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Heyuan Travel Website...');
    
    // Load travel data
    loadTravelData();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize hotel view toggles
    initializeHotelViews();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize back to top button
    initializeBackToTop();
});

// Load travel data from JSON file
async function loadTravelData() {
    try {
        const response = await fetch('data/travel_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        travelData = await response.json();
        console.log('Travel data loaded successfully:', travelData);
        
        // Populate all sections with data
        populateHotelsSection();
        populateItinerarySection();
        populateAttractionsSection();
        
    } catch (error) {
        console.error('Error loading travel data:', error);
        // Fallback to inline data if fetch fails
        loadFallbackData();
    }
}

// Fallback data in case JSON fetch fails
function loadFallbackData() {
    console.log('Loading fallback data...');
    travelData = {
        hotels: [
            {
                id: "meiju",
                name: "河源万绿湖渼居空中汤泉酒店",
                type: "4星级温泉酒店",
                highlights: ["空中温泉", "粉红沙滩", "亲子友好"],
                features: {
                    "核心特色": "空中温泉体验，特色中药泡池、艾草桑拿，独特的粉红沙滩",
                    "房型": "标准房、亲子房、主题房，房间面积28-60㎡",
                    "餐饮": "1间自助西餐厅",
                    "免费设施": ["儿童乐园", "儿童俱乐部", "健身房"],
                    "收费设施": ["空中温泉", "桑拿", "水上乐园"]
                },
                price: "中高档，性价比相对较高",
                suitable: "追求新鲜感、注重温泉体验的家庭",
                image: "images/meiju_hotel.jpg"
            },
            {
                id: "lanputao",
                name: "河源春沐源蓝葡萄酒店",
                type: "高端度假酒店",
                highlights: ["别墅套房", "一站式度假", "丰富娱乐"],
                features: {
                    "核心特色": "坐拥整个春沐源小镇的旅游资源，一站式满足家庭度假的所有需求",
                    "房型": "全为多卧套房/别墅，面积巨大（105-110㎡）",
                    "餐饮": "2间特色餐厅（中/日料）、咖啡厅、小食吧等",
                    "免费设施": ["无边际泳池", "健身房", "多种球场", "图书馆", "家庭影院", "儿童乐园", "种植采摘"],
                    "收费设施": ["温泉（酒店外）", "皮划艇", "钓鱼", "KTV", "模拟高尔夫"]
                },
                price: "高端，总价较高，但人均成本可能更合理",
                suitable: "注重住宿品质和娱乐多样性的大家庭",
                image: "images/lanputao_hotel.jpg"
            }
        ],
        itinerary: [
            {
                day: 1,
                date: "6月21日（周五）",
                title: "出发、温泉初体验 & 湖畔悠闲",
                activities: [
                    {
                        time: "14:00-16:30",
                        activity: "深圳出发，自驾前往河源",
                        location: "深圳 → 河源",
                        notes: "长深高速(G25)为主，错开下班高峰"
                    },
                    {
                        time: "19:00-21:00",
                        activity: "核心体验：空中温泉 & 粉红沙滩",
                        location: "酒店2楼",
                        notes: "必体验项目，拍照打卡"
                    }
                ]
            }
        ],
        attractions: [
            {
                name: "万绿湖风景区",
                level: "5A",
                description: "华南第一湖，乘船游览湖中岛屿",
                highlights: ["水月湾", "龙凤岛", "恐龙步道"],
                price: "1号线 198元/人",
                duration: "4-5小时",
                image: "images/wanlvhu_boat.jpg"
            }
        ]
    };
    
    populateHotelsSection();
    populateItinerarySection();
    populateAttractionsSection();
}

// Initialize navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('nav-link-active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('nav-link-active');
            }
        });
    });
}



// Initialize hotel view toggles
function initializeHotelViews() {
    const cardsViewBtn = document.getElementById('hotel-view-cards');
    const compareViewBtn = document.getElementById('hotel-view-compare');
    const cardsContainer = document.getElementById('hotels-cards');
    const comparisonContainer = document.getElementById('hotels-comparison');
    
    if (cardsViewBtn && compareViewBtn) {
        cardsViewBtn.addEventListener('click', function() {
            currentHotelView = 'cards';
            updateHotelViewButtons();
            showHotelCards();
        });
        
        compareViewBtn.addEventListener('click', function() {
            currentHotelView = 'compare';
            updateHotelViewButtons();
            showHotelComparison();
        });
    }
}

// Update hotel view button states
function updateHotelViewButtons() {
    const cardsViewBtn = document.getElementById('hotel-view-cards');
    const compareViewBtn = document.getElementById('hotel-view-compare');
    
    if (currentHotelView === 'cards') {
        cardsViewBtn.classList.add('bg-lake-blue', 'text-white');
        cardsViewBtn.classList.remove('text-gray-600', 'hover:bg-gray-100');
        compareViewBtn.classList.remove('bg-lake-blue', 'text-white');
        compareViewBtn.classList.add('text-gray-600', 'hover:bg-gray-100');
    } else {
        compareViewBtn.classList.add('bg-lake-blue', 'text-white');
        compareViewBtn.classList.remove('text-gray-600', 'hover:bg-gray-100');
        cardsViewBtn.classList.remove('bg-lake-blue', 'text-white');
        cardsViewBtn.classList.add('text-gray-600', 'hover:bg-gray-100');
    }
}

// Show hotel cards view
function showHotelCards() {
    document.getElementById('hotels-cards').classList.remove('hidden');
    document.getElementById('hotels-comparison').classList.add('hidden');
}

// Show hotel comparison view
function showHotelComparison() {
    document.getElementById('hotels-cards').classList.add('hidden');
    document.getElementById('hotels-comparison').classList.remove('hidden');
}

// Populate hotels section
function populateHotelsSection() {
    if (!travelData || !travelData.hotels) {
        console.error('No hotels data available');
        return;
    }
    
    populateHotelCards();
    populateHotelComparison();
}

// Populate hotel cards
function populateHotelCards() {
    const container = document.getElementById('hotels-cards');
    if (!container) return;
    
    container.innerHTML = travelData.hotels.map(hotel => `
        <div class="hotel-card bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="relative h-64">
                <img src="${hotel.image}" alt="${hotel.name}" 
                     class="w-full h-full object-cover"
                     onerror="this.src='https://via.placeholder.com/800x400/0ea5e9/ffffff?text=${encodeURIComponent(hotel.name)}'">
                <div class="absolute top-4 right-4">
                    <span class="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                        ${hotel.type}
                    </span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${hotel.name}</h3>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${hotel.highlights.map(highlight => 
                        `<span class="feature-tag">${highlight}</span>`
                    ).join('')}
                </div>
                <p class="text-gray-600 mb-4">${hotel.features['核心特色']}</p>
                <div class="space-y-2 text-sm">
                    <div class="flex items-start">
                        <i class="fas fa-bed text-lake-blue mr-2 mt-0.5"></i>
                        <span><strong>房型:</strong> ${hotel.features['房型']}</span>
                    </div>
                    <div class="flex items-start">
                        <i class="fas fa-utensils text-lake-blue mr-2 mt-0.5"></i>
                        <span><strong>餐饮:</strong> ${hotel.features['餐饮']}</span>
                    </div>
                    <div class="flex items-start">
                        <i class="fas fa-tag text-lake-blue mr-2 mt-0.5"></i>
                        <span><strong>价格:</strong> ${hotel.price}</span>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-100">
                    <p class="text-sm text-gray-600">
                        <i class="fas fa-users text-lake-blue mr-1"></i>
                        <strong>适合:</strong> ${hotel.suitable}
                    </p>
                </div>
            </div>
        </div>
    `).join('');
}

// Populate hotel comparison
function populateHotelComparison() {
    const container = document.getElementById('hotels-comparison');
    if (!container || !travelData.hotels || travelData.hotels.length < 2) return;
    
    const hotel1 = travelData.hotels[0];
    const hotel2 = travelData.hotels[1];
    
    container.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="comparison-table w-full">
                <table class="w-full">
                    <thead>
                        <tr>
                            <th class="w-1/3">对比维度</th>
                            <th class="w-1/3">${hotel1.name}</th>
                            <th class="w-1/3">${hotel2.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-medium">酒店类型</td>
                            <td>${hotel1.type}</td>
                            <td>${hotel2.type}</td>
                        </tr>
                        <tr>
                            <td class="font-medium">核心特色</td>
                            <td>${hotel1.features['核心特色']}</td>
                            <td>${hotel2.features['核心特色']}</td>
                        </tr>
                        <tr>
                            <td class="font-medium">房型</td>
                            <td>${hotel1.features['房型']}</td>
                            <td>${hotel2.features['房型']}</td>
                        </tr>
                        <tr>
                            <td class="font-medium">餐饮</td>
                            <td>${hotel1.features['餐饮']}</td>
                            <td>${hotel2.features['餐饮']}</td>
                        </tr>
                        <tr>
                            <td class="font-medium">免费设施</td>
                            <td>
                                <div class="flex flex-wrap gap-1">
                                    ${hotel1.features['免费设施'].map(facility => 
                                        `<span class="feature-tag free">${facility}</span>`
                                    ).join('')}
                                </div>
                            </td>
                            <td>
                                <div class="flex flex-wrap gap-1">
                                    ${hotel2.features['免费设施'].map(facility => 
                                        `<span class="feature-tag free">${facility}</span>`
                                    ).join('')}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="font-medium">收费设施</td>
                            <td>
                                <div class="flex flex-wrap gap-1">
                                    ${hotel1.features['收费设施'].map(facility => 
                                        `<span class="feature-tag paid">${facility}</span>`
                                    ).join('')}
                                </div>
                            </td>
                            <td>
                                <div class="flex flex-wrap gap-1">
                                    ${hotel2.features['收费设施'].map(facility => 
                                        `<span class="feature-tag paid">${facility}</span>`
                                    ).join('')}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="font-medium">价格定位</td>
                            <td>${hotel1.price}</td>
                            <td>${hotel2.price}</td>
                        </tr>
                        <tr>
                            <td class="font-medium">适合人群</td>
                            <td>${hotel1.suitable}</td>
                            <td>${hotel2.suitable}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Populate itinerary section
function populateItinerarySection() {
    if (!travelData || !travelData.itinerary) {
        console.error('No itinerary data available');
        return;
    }
    
    const container = document.getElementById('itinerary-timeline');
    if (!container) return;
    
    container.innerHTML = travelData.itinerary.map((day, dayIndex) => `
        <div class="timeline-item mb-12 ${dayIndex % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'}">
            <div class="bg-white rounded-xl shadow-lg p-6 ml-8">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-lake-blue to-nature-green rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        ${day.day}
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-800">${day.title}</h3>
                        <p class="text-lake-blue font-medium">${day.date}</p>
                    </div>
                </div>
                <div class="space-y-4">
                    ${day.activities.map(activity => `
                        <div class="activity-card p-4 bg-gray-50 rounded-lg">
                            <div class="flex items-start justify-between mb-2">
                                <div class="flex items-center">
                                    <i class="fas fa-clock text-lake-blue mr-2"></i>
                                    <span class="font-medium text-gray-800">${activity.time}</span>
                                </div>
                                <span class="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                                    <i class="fas fa-map-marker-alt mr-1"></i>
                                    ${activity.location}
                                </span>
                            </div>
                            <h4 class="font-medium text-gray-800 mb-1">${activity.activity}</h4>
                            <p class="text-sm text-gray-600">${activity.notes}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Populate attractions section
function populateAttractionsSection() {
    if (!travelData || !travelData.attractions) {
        console.error('No attractions data available');
        return;
    }
    
    const container = document.getElementById('attractions-grid');
    if (!container) return;
    
    container.innerHTML = travelData.attractions.map(attraction => `
        <div class="attraction-card bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="relative h-48">
                <img src="${attraction.image}" alt="${attraction.name}" 
                     class="w-full h-full object-cover"
                     onerror="this.src='https://via.placeholder.com/400x300/22c55e/ffffff?text=${encodeURIComponent(attraction.name)}'">
                <div class="absolute top-4 left-4">
                    <span class="bg-gradient-to-r from-warm-orange to-soft-pink text-white px-3 py-1 rounded-full text-sm font-bold">
                        ${attraction.level}级景区
                    </span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${attraction.name}</h3>
                <p class="text-gray-600 mb-4">${attraction.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${attraction.highlights.map(highlight => 
                        `<span class="bg-nature-green/10 text-nature-green px-2 py-1 rounded text-sm">${highlight}</span>`
                    ).join('')}
                </div>
                <div class="space-y-2 text-sm">
                    <div class="flex items-center">
                        <i class="fas fa-ticket-alt text-warm-orange mr-2"></i>
                        <span><strong>票价:</strong> ${attraction.price}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-clock text-warm-orange mr-2"></i>
                        <span><strong>游玩时长:</strong> ${attraction.duration}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
}

// Initialize smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
    }).format(amount);
}

// Utility function to create skeleton loading elements
function createSkeletonElement(className = '') {
    const skeleton = document.createElement('div');
    skeleton.className = `skeleton ${className}`;
    return skeleton;
}

// Error handling for images
function handleImageError(img) {
    const placeholderColor = img.closest('.hotel-card') ? '0ea5e9' : '22c55e';
    const text = encodeURIComponent(img.alt || '河源旅游');
    img.src = `https://via.placeholder.com/800x400/${placeholderColor}/ffffff?text=${text}`;
}

// Initialize back to top button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
            backToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });
    
    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced mobile menu with improved UX
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        let isMenuOpen = false;
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenuBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                document.body.style.overflow = '';
                isMenuOpen = false;
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target) && isMenuOpen) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                document.body.style.overflow = '';
                isMenuOpen = false;
            }
        });
        
        // Close mobile menu on window resize if screen becomes large
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768 && isMenuOpen) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                document.body.style.overflow = '';
                isMenuOpen = false;
            }
        });
    }
}

// Add loading animation for better UX
function showLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.className = 'fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50';
    loadingOverlay.innerHTML = `
        <div class="text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-lake-blue mx-auto mb-4"></div>
            <p class="text-lake-blue font-medium">正在加载河源旅游信息...</p>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay after content is loaded
    setTimeout(() => {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }
    }, 1500);
}

// Add global error handler for images
document.addEventListener('DOMContentLoaded', function() {
    // Show loading animation
    showLoadingAnimation();
    
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
});

console.log('Heyuan Travel Website JavaScript loaded successfully!');
