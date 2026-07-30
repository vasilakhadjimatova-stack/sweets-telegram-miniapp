// Initialize Telegram WebApp SDK (guarded: SDK script may fail to load outside Telegram)
const tg = window.Telegram ? window.Telegram.WebApp : null;

// Tell Telegram that the Web App is ready and expand it
if (tg) {
    tg.ready();
    tg.expand();
    // Enable closing confirmation to prevent accidental closing
    if (tg.enableClosingConfirmation) {
        tg.enableClosingConfirmation();
    }
}

// Product Database
// Default Confectionery Database (5 products per category)
const defaultProductsList = [
    // --- CAKES ---
    {
        id: "choc_cake",
        category: "cakes",
        title: "Eksklyuziv Shokoladli Tort",
        price: 240000,
        description: "Eng sarxush shokoladli biskvit, oliy navli shokoladli ganash va tilla bargchalar (gold leaf) bilan bezatilgan premium darajadagi tort.",
        ingredients: "Belgiya shokoladi, sariyog', tuxum, un, shakar, tabiiy qaymoq, oltin zarralari, malina.",
        weight: "950 g",
        rating: 4.9,
        image: "assets/chocolate_cake.jpg",
        time: "1 kun"
    },
    {
        id: "red_velvet_cake",
        category: "cakes",
        title: "Qirollik Qizil Velvet Torti",
        price: 210000,
        description: "Yorqin qizil rangli mayin kakao biskviti va nozik qaymoqli krem-pishloq qorishmasidan iborat klassik desert.",
        ingredients: "Un, shakar, kakao, krem-pishloq, kefir, sariyog', tabiiy qizil rang beruvchi.",
        weight: "1 kg",
        rating: 4.8,
        image: "assets/red_velvet_cake.jpg",
        time: "1 kun"
    },
    {
        id: "medovik_cake",
        category: "cakes",
        title: "Klassik Asalli Tort (Medovik)",
        price: 180000,
        description: "Tabiiy tog' asali qo'shib tayyorlangan yupqa biskvit qavatlari va nozik smetana-qaymoqli krem uyg'unligi.",
        ingredients: "Tabiiy tog' asali, bug'doy uni, smetana, qaymoq, tuxum, shakar, sariyog'.",
        weight: "900 g",
        rating: 4.9,
        image: "assets/medovik_cake.jpg",
        time: "12 soat"
    },
    {
        id: "cheese_cake",
        category: "cakes",
        title: "San Sebastian Cheesecake",
        price: 195000,
        description: "Ispaniya an'analariga ko'ra pishirilgan, usti kuygan, ichi esa nozik va suyuqroq krem-pishloqli shirinlik.",
        ingredients: "Premium krem-pishloq, qaymoq, shakar, tuxum, makkajo'xori kraxmali.",
        weight: "850 g",
        rating: 4.7,
        image: "assets/cheese_cake.jpg",
        time: "Tezda"
    },
    {
        id: "pistachio_cake",
        category: "cakes",
        title: "Premium Pistali & Malinali Tort",
        price: 260000,
        description: "Haqiqiy Eron pistasi va nordon malina jeli bilan to'ldirilgan biskvitli ajoyib yozgi tort.",
        ingredients: "Pista pastasi, malina pyuresi, qaymoq, un, tuxum, shakar, pista donalari.",
        weight: "1 kg",
        rating: 5.0,
        image: "assets/pistachio_cake.jpg",
        time: "1.5 kun"
    },
    // --- CUPCAKES ---
    {
        id: "red_cupcake",
        category: "cupcakes",
        title: "Qizil Velvet Kapkeki",
        price: 32000,
        description: "Mayin qizil velvet biskviti va ustida qaymoqli krem-pishloqli shlyapa.",
        ingredients: "Kakaoli qizil biskvit, krem-pishloq, qaymoq, malina, vanil ekstrakti.",
        weight: "110 g",
        rating: 4.8,
        image: "assets/red_cupcake.jpg",
        time: "Tezda"
    },
    {
        id: "choco_cupcake",
        category: "cupcakes",
        title: "Shokoladli Fudg Kapkeki",
        price: 24000,
        description: "Boy shokoladli biskvit va shokoladli fudg jeli bilan to'ldirilgan shirinlik.",
        ingredients: "Kakao kukuni, shokolad tomchilari, sariyog', qaymoq, shakar.",
        weight: "115 g",
        rating: 4.7,
        image: "assets/choco_cupcake.jpg",
        time: "Tezda"
    },
    {
        id: "lemon_cupcake",
        category: "cupcakes",
        title: "Limonli & Merengali Kapkek",
        price: 26000,
        description: "Nordon limon kurdi bilan to'ldirilgan va ustida yengil yondirilgan shirin merenga bilan bezatilgan kapkek.",
        ingredients: "Limon sharbati, limon po'sti, tuxum oqi, shakar, biskvit xamiri.",
        weight: "110 g",
        rating: 4.8,
        image: "assets/lemon_cupcake.jpg",
        time: "Tezda"
    },
    {
        id: "caramel_cupcake",
        category: "cupcakes",
        title: "Karamel & Yong'oqli Kapkek",
        price: 25000,
        description: "Ichida suyuq sho'r karamel oqib turuvchi, ustida yong'oq bo'lakchalari bilan qoplangan shirinlik.",
        ingredients: "Sho'r karamel, maydalangan yong'oq, biskvit, vanilli krem.",
        weight: "120 g",
        rating: 4.9,
        image: "assets/caramel_cupcake.jpg",
        time: "Tezda"
    },
    {
        id: "berry_cupcake",
        category: "cupcakes",
        title: "Vanilli Rezavorli Kapkek",
        price: 23000,
        description: "Vanilli klassik xamir, o'rtasida qoraqat va qulupnayli jem, ustida nozik qaymoqli krem.",
        ingredients: "Qaymoq, meva jemi, vanil podasi, un, sariyog'.",
        weight: "110 g",
        rating: 4.6,
        image: "assets/berry_cupcake.jpg",
        time: "Tezda"
    },
    // --- DONUTS ---
    {
        id: "caramel_donut",
        category: "donuts",
        title: "Karamel va Yong'oqli Donat",
        price: 25000,
        description: "Yumshoq xamirli, usti yaltiroq karamel bilan qoplangan, maydalangan yong'oq va shokolad bo'lakchalari bilan bezatilgan donat.",
        ingredients: "Bug'doy uni, sut, xamirturush, sariyog', karamel glazuri, yong'oq.",
        weight: "120 g",
        rating: 4.7,
        image: "assets/caramel_donut.jpg",
        time: "Tezda"
    },
    {
        id: "choco_donut",
        category: "donuts",
        title: "Shokolad & Yong'oqli Donat",
        price: 28000,
        description: "Belgiya shokoladli glazur va maydalangan bodom yong'oqlari bilan bezatilgan donat.",
        ingredients: "Kakao, sut, un, shakar, Belgiya shokoladi, bodom.",
        weight: "125 g",
        rating: 4.8,
        image: "assets/choco_donut.jpg",
        time: "Tezda"
    },
    {
        id: "strawberry_donut",
        category: "donuts",
        title: "Pushti Qulupnayli Donat",
        price: 27000,
        description: "Pushti qulupnayli glazur va rangli shirinlik sepkichlari bilan bezatilgan shirin donat.",
        ingredients: "Qulupnay glazuri, un, tuxum, sut, rangli bezak sepkichlari.",
        weight: "115 g",
        rating: 4.6,
        image: "assets/strawberry_donut.jpg",
        time: "Tezda"
    },
    {
        id: "pistachio_donut",
        category: "donuts",
        title: "Pistali Premium Donat",
        price: 32000,
        description: "Nozik pista kremi bilan to'ldirilgan va usti yashil pista po'stlog'i kukunlari bilan qoplangan donat.",
        ingredients: "Pista pastasi, sutli krem, bug'doy uni, xamirturush.",
        weight: "130 g",
        rating: 4.9,
        image: "assets/pistachio_donut.jpg",
        time: "Tezda"
    },
    {
        id: "classic_donut",
        category: "donuts",
        title: "Klassik Glazurlangan Donat",
        price: 22000,
        description: "Yupqa va shaffof shakar glazuri bilan qoplangan, an'anaviy yumshoq donat.",
        ingredients: "Shakar glazuri, un, sut, tuxum, sariyog'.",
        weight: "100 g",
        rating: 4.5,
        image: "assets/classic_donut.jpg",
        time: "Tezda"
    },
    // --- MACARONS ---
    {
        id: "macarons_set",
        category: "macarons",
        title: "Premium Fransuz Makaronlari",
        price: 95000,
        description: "Bodom unidan tayyorlangan va nozik krem-pishloq bilan to'ldirilgan fransuzcha shirinlik to'plami.",
        ingredients: "Bodom uni, tuxum oqi, shakar upasi, tabiiy meva pyurelari, pista pastasi, krem-pishloq.",
        weight: "6 dona (150 g)",
        rating: 4.8,
        image: "assets/macarons.jpg",
        time: "Tezda"
    },
    {
        id: "rose_macarons",
        category: "macarons",
        title: "Malina va Atorgulli Makaronlar",
        price: 110000,
        description: "Atorgul suvi va nordon malina ganashi bilan to'ldirilgan nozik pushti makaronlar.",
        ingredients: "Bodom uni, atorgul ekstrakti, malina pyuresi, oq shokolad, qaymoq.",
        weight: "8 dona (200 g)",
        rating: 4.9,
        image: "assets/macarons.jpg",
        time: "Tezda"
    },
    {
        id: "pistachio_macarons",
        category: "macarons",
        title: "Pistali Lyuks Makaronlar",
        price: 105000,
        description: "Eron pistasi ganashi bilan to'ldirilgan yashil rangli ajoyib makaron to'plami.",
        ingredients: "Bodom uni, pista pastasi, sutli qaymoq, oq shokolad.",
        weight: "6 dona (150 g)",
        rating: 5.0,
        image: "assets/macarons.jpg",
        time: "Tezda"
    },
    {
        id: "dark_choc_macarons",
        category: "macarons",
        title: "Qora Shokoladli Makaronlar",
        price: 98000,
        description: "72% Belgiya qora shokoladli ganashi bilan to'ldirilgan hashamatli makaron shirinligi.",
        ingredients: "Bodom uni, kakao, 72% Belgiya shokoladi, qaymoq, sariyog'.",
        weight: "6 dona (150 g)",
        rating: 4.8,
        image: "assets/macarons.jpg",
        time: "Tezda"
    },
    {
        id: "coconut_macarons",
        category: "macarons",
        title: "Kokos & Mango Makaronlar",
        price: 115000,
        description: "Kokosli biskvitlar o'rtasida shirin mango va ehtiros mevasi (passion fruit) jeli to'ldirilgan ekzotik makaron.",
        ingredients: "Bodom uni, kokos qirindisi, mango jeli, passion fruit pyuresi, oq shokolad.",
        weight: "8 dona (200 g)",
        rating: 4.7,
        image: "assets/macarons.jpg",
        time: "Tezda"
    }
];

let products = [...defaultProductsList];
let cart = [];
let currentCategory = "all";
let currentCatalogCatId = null;
let searchQuery = "";
let selectedProduct = null;
let currentTab = "shop";
let activeOrder = null;
let discountPercent = 0;
let ordersList = [];
let adminSubtab = "dash";
let clientDeliveryType = "delivery";
let modalQty = 1; // Product modal quantity (reset each time the modal opens)

// Telegram user IDs allowed to see the "Boshqaruv" (admin) tab.
// Empty list = tab stays visible to everyone (fill with real IDs to lock it down).
const ADMIN_TG_IDS = [];

let categories = [
    { id: "cakes", name: "Tortlar" },
    { id: "cupcakes", name: "Kapkeklar" },
    { id: "donuts", name: "Donatlar" },
    { id: "macarons", name: "Makaronlar" }
];
let adminOrderFilter = "all";
let adminOrderSearchQuery = "";
let adminCatalogSearchQuery = "";
const DELIVERY_COST = 20000; // 20,000 UZS standard delivery fee

// Promo codes dictionary
const promoCodes = {
    "SWEET10": 10,
    "IMPULSE": 15,
    "TELEGRAM": 20
};

// DOM Elements
const productsGrid = document.getElementById("products-grid");
const categoriesList = document.getElementById("categories-list");
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search");
const floatingCart = document.getElementById("floating-cart");
const floatingCartCount = document.getElementById("floating-cart-count");
const navCartBadge = document.getElementById("nav-cart-badge");
const navOrdersDot = document.getElementById("nav-orders-dot");

// Modal Elements
const productModal = document.getElementById("product-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalImg = document.getElementById("modal-product-image");
const modalTitle = document.getElementById("modal-product-title");
const modalPrice = document.getElementById("modal-product-price");
const modalWeight = document.getElementById("modal-product-weight");
const modalRating = document.getElementById("modal-product-rating");
const modalDescription = document.getElementById("modal-product-description");
const modalIngredients = document.getElementById("modal-product-ingredients");
const modalQtyMinus = document.getElementById("modal-qty-minus");
const modalQtyPlus = document.getElementById("modal-qty-plus");
const modalQtyVal = document.getElementById("modal-qty-val");
const modalAddBtn = document.getElementById("modal-add-to-cart-btn");

// Cart Elements
const emptyCartView = document.getElementById("empty-cart");
const cartContentView = document.getElementById("cart-content");
const cartItemsList = document.getElementById("cart-items-list");
const promoInput = document.getElementById("promo-input");
const promoApplyBtn = document.getElementById("promo-apply-btn");
const promoStatusMsg = document.getElementById("promo-status");
const summarySubtotal = document.getElementById("summary-subtotal");
const summaryDelivery = document.getElementById("summary-delivery");
const summaryDiscountRow = document.getElementById("summary-discount-row");
const summaryDiscount = document.getElementById("summary-discount");
const summaryDiscountPercent = document.getElementById("discount-percent");
const summaryTotal = document.getElementById("summary-total");
// Checkout form lives in #checkout-modal-sheet (queried lazily — it sits after the script tag)

// Tracking Elements
const noActiveOrderView = document.getElementById("no-active-order");
const activeOrderTrackingView = document.getElementById("active-order-tracking");
const trackingOrderId = document.getElementById("tracking-order-id");
const trackingOrderDate = document.getElementById("tracking-order-date");
const trackingItemsList = document.getElementById("tracking-items");
const trackingTotalPrice = document.getElementById("tracking-total-price");
const trackingPaymentType = document.getElementById("tracking-payment-type");
const trackingAddress = document.getElementById("tracking-address");
const cancelOrderBtn = document.getElementById("cancel-order-btn");

// Success Overlay Elements
const successOverlay = document.getElementById("success-overlay");
const successDoneBtn = document.getElementById("success-done-btn");

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    // Load local storage data
    loadLocalStorage();
    
    // Render category buttons
    renderCategoryTabs();
    
    // Set User Profile from Telegram Info
    setupTelegramUser();
    
    // Render catalog items
    renderProducts();
    
    // Setup Event Listeners
    setupEventListeners();
    
    // Initial UI state updates
    updateCartUI();
    updateTrackingUI();
    
    // Start automated promo banner carousel slider
    startPromoSlider();

    // Hide the admin tab from non-admin users (active only once ADMIN_TG_IDS is filled)
    if (ADMIN_TG_IDS.length > 0) {
        const uid = (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) ? tg.initDataUnsafe.user.id : null;
        if (!ADMIN_TG_IDS.includes(uid)) {
            const adminNav = document.getElementById("nav-admin");
            if (adminNav) adminNav.style.display = "none";
        }
    }
});

// Setup Telegram User Profile
function setupTelegramUser() {
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        const name = [user.first_name, user.last_name].filter(Boolean).join(" ");
        document.getElementById("user-name").textContent = name || user.username || "Mijoz";
        
        // Avatar circle text
        const initials = (user.first_name ? user.first_name[0] : "") + (user.last_name ? user.last_name[0] : "");
        document.getElementById("user-avatar").textContent =
            initials.toUpperCase() || (user.username ? user.username.substring(0, 2).toUpperCase() : "M");

        // Autofill form name (checkout sheet field)
        const formNameInput = document.getElementById("form-name");
        if (formNameInput) formNameInput.value = name || "";
    } else {
        console.log("Running outside Telegram. Dev mode fallback enabled.");
    }
}

// Render catalog items based on category and search
function renderProducts() {
    const homeView = document.getElementById("shop-home-view");
    const categoryView = document.getElementById("shop-category-view");
    const horizontalContainer = document.getElementById("horizontal-sections-container");
    const categoryTitleEl = document.getElementById("category-detail-title");

    if (!homeView || !categoryView) return;

    if (currentCategory === "all" && searchQuery.trim() === "") {
        // Mode 1: Home View (Horizontal Lists per Category)
        homeView.style.display = "block";
        categoryView.style.display = "none";
        
        if (horizontalContainer) {
            horizontalContainer.innerHTML = "";
            
            // Loop through each category
            categories.forEach(cat => {
                const catProducts = products.filter(p => p.category === cat.id && p.active !== false);
                
                if (catProducts.length > 0) {
                    const section = document.createElement("div");
                    section.className = "category-section";
                    
                    section.innerHTML = `
                        <div class="category-section-header">
                            <h3 class="category-section-title">${cat.name}</h3>
                            <span class="view-all-link" onclick="setCategoryMode('${cat.id}')">
                                Hammasini ko'rish <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i>
                            </span>
                        </div>
                        <div class="horizontal-product-scroll" id="scroll-${cat.id}">
                            <!-- Products filled below -->
                        </div>
                    `;
                    
                    const scrollContainer = section.querySelector(".horizontal-product-scroll");
                    
                    catProducts.forEach(p => {
                        const card = document.createElement("div");
                        card.className = "product-card";
                        card.setAttribute("data-id", p.id);
                        
                        // Check quantity in cart
                        const cartItem = cart.find(item => item.product.id === p.id);
                        const qty = cartItem ? cartItem.quantity : 0;
                        
                        let actionControl = "";
                        if (qty > 0) {
                            actionControl = `
                                <div class="product-qty-selector-bar">
                                    <button class="qty-bar-btn minus" data-id="${p.id}">−</button>
                                    <span class="qty-bar-val">${qty}</span>
                                    <button class="qty-bar-btn plus" data-id="${p.id}">+</button>
                                </div>
                            `;
                        } else {
                            actionControl = `
                                <button class="add-to-cart-bar-btn" data-id="${p.id}">
                                    <i class="fa-solid fa-basket-shopping"></i>
                                </button>
                            `;
                        }

                        card.innerHTML = `
                            <div class="card-image-wrapper">
                                <img src="${p.image}" alt="${p.title}" loading="lazy">
                                <span class="card-badge"><i class="fa-solid fa-star text-gold"></i> ${p.rating}</span>
                            </div>
                            <div class="card-info">
                                <h4 class="product-title">${p.title}</h4>
                                <span class="product-price">${formatUZS(p.price)}</span>
                                <div class="product-action-row">
                                    ${actionControl}
                                </div>
                            </div>
                        `;
                        
                        card.addEventListener("click", () => openProductModal(p));
                        scrollContainer.appendChild(card);
                    });
                    
                    horizontalContainer.appendChild(section);
                }
            });
            
            // If no categories have products
            if (horizontalContainer.children.length === 0) {
                horizontalContainer.innerHTML = `
                    <div style="text-align: center; padding: 60px 20px; color: var(--hint-color);">
                        <i class="fa-regular fa-face-frown" style="font-size: 2.5rem; margin-bottom: 12px; display: block; color: var(--primary-color);"></i>
                        <p>Hozircha sotuvda hech qanday shirinlik yo'q.</p>
                    </div>
                `;
            }
        }
    } else {
        // Mode 2: Category Detail View (Vertical Grid)
        homeView.style.display = "none";
        categoryView.style.display = "block";
        
        productsGrid.innerHTML = "";
        
        // Update Title
        if (searchQuery.trim() !== "") {
            if (categoryTitleEl) categoryTitleEl.textContent = `"${searchQuery}" qidiruv natijalari`;
        } else {
            const catObj = categories.find(c => c.id === currentCategory);
            if (categoryTitleEl) categoryTitleEl.textContent = catObj ? catObj.name : "Shirinliklar";
        }
        
        // Filter products
        const filtered = products.filter(p => {
            const matchesCategory = currentCategory === "all" || p.category === currentCategory;
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 p.description.toLowerCase().includes(searchQuery.toLowerCase());
            const isActive = p.active !== false;
            return matchesCategory && matchesSearch && isActive;
        });

        if (filtered.length === 0) {
            productsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px 10px; color: var(--hint-color);">
                    <i class="fa-regular fa-face-frown" style="font-size: 2.2rem; margin-bottom: 10px; display: block; color: var(--primary-color);"></i>
                    <p>Hech narsa topilmadi.</p>
                </div>
            `;
        } else {
            filtered.forEach(p => {
                const card = document.createElement("div");
                card.className = "product-card";
                card.setAttribute("data-id", p.id);
                
                // Check quantity in cart
                const cartItem = cart.find(item => item.product.id === p.id);
                const qty = cartItem ? cartItem.quantity : 0;
                
                // Use the same visible "bar" control markup as the home view
                // (.product-footer is hidden globally by the newer CSS design)
                let actionControl = "";
                if (qty > 0) {
                    actionControl = `
                        <div class="product-qty-selector-bar">
                            <button class="qty-bar-btn minus" data-id="${p.id}">−</button>
                            <span class="qty-bar-val">${qty}</span>
                            <button class="qty-bar-btn plus" data-id="${p.id}">+</button>
                        </div>
                    `;
                } else {
                    actionControl = `
                        <button class="add-to-cart-bar-btn" data-id="${p.id}">
                            <i class="fa-solid fa-basket-shopping"></i>
                        </button>
                    `;
                }

                card.innerHTML = `
                    <div class="card-image-wrapper">
                        <img src="${p.image}" alt="${p.title}" loading="lazy">
                        <span class="card-badge"><i class="fa-solid fa-star text-gold"></i> ${p.rating}</span>
                    </div>
                    <div class="card-info">
                        <h4 class="product-title">${p.title}</h4>
                        <span class="product-price">${formatUZS(p.price)}</span>
                        <div class="product-action-row">
                            ${actionControl}
                        </div>
                    </div>
                `;
                
                card.addEventListener("click", () => openProductModal(p));
                productsGrid.appendChild(card);
            });
        }
    }

    // Dynamic Binding with 100% Reliability for mobile and webviews
    
    // Bindings are scoped to #shop-tab so hidden catalog-view buttons (bound
    // separately in renderCatalogCategoryProducts) never get duplicate listeners.

    // 1. Rebind standard add to cart button click
    const addBtns = document.querySelectorAll("#shop-tab .add-to-cart-bar-btn");
    addBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Stop opening details modal
            const id = btn.getAttribute("data-id");
            addToCart(id, 1);
            triggerHapticFeedback("medium");
        });
    });

    // 2. Rebind quantity minus buttons click
    const minusBtns = document.querySelectorAll("#shop-tab .qty-bar-btn.minus");
    minusBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Stop opening details modal
            const id = btn.getAttribute("data-id");
            changeCartQty(id, -1);
        });
    });

    // 3. Rebind quantity plus buttons click
    const plusBtns = document.querySelectorAll("#shop-tab .qty-bar-btn.plus");
    plusBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Stop opening details modal
            const id = btn.getAttribute("data-id");
            changeCartQty(id, 1);
        });
    });

    // 4. Stop propagation on quantity selector background click
    const qtySelectors = document.querySelectorAll("#shop-tab .product-qty-selector-bar");
    qtySelectors.forEach(sel => {
        sel.addEventListener("click", (e) => {
            e.stopPropagation(); // Stop modal when clicking background of the pill
        });
    });
}

// Set Category Mode Globally (Safia Style transition)
window.setCategoryMode = function(catId) {
    currentCategory = catId;
    
    // Update active class on category pill buttons
    const catBtns = document.querySelectorAll(".category-btn");
    catBtns.forEach(btn => {
        if (btn.getAttribute("data-category") === catId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    
    // Scroll category pill into view
    const activeBtn = document.querySelector(`.category-btn[data-category="${catId}"]`);
    if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    
    renderProductsWithScrollPreservation();
    triggerHapticFeedback("light");
};
function formatUZS(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
}

// ==========================================
// CATALOG TAB — CATEGORY DETAIL VIEW
// ==========================================
window.openCatalogCategory = function(catId) {
    currentCatalogCatId = catId;
    const grid = document.getElementById("catalog-grid");
    const view = document.getElementById("catalog-category-view");
    const titleEl = document.getElementById("catalog-category-title");
    const cat = categories.find(c => c.id === catId);

    if (titleEl) titleEl.textContent = cat ? cat.name : "Kategoriya";
    if (grid) grid.style.display = "none";
    if (view) view.style.display = "block";

    renderCatalogCategoryProducts(catId);
    window.scrollTo(0, 0);
    triggerHapticFeedback("light");
};

window.closeCatalogCategoryView = function() {
    currentCatalogCatId = null;
    const grid = document.getElementById("catalog-grid");
    const view = document.getElementById("catalog-category-view");
    if (view) view.style.display = "none";
    if (grid) grid.style.display = "";
    triggerHapticFeedback("light");
};

function renderCatalogCategoryProducts(catId) {
    const list = document.getElementById("catalog-products-list");
    if (!list) return;

    const filtered = products.filter(p => p.category === catId);
    list.innerHTML = "";

    if (filtered.length === 0) {
        list.innerHTML = `<p class="empty-state-text" style="text-align:center; padding: 30px 10px;">Bu kategoriyada hozircha mahsulot yo'q.</p>`;
        return;
    }

    filtered.forEach(p => {
        const cartItem = cart.find(item => item.product.id === p.id);
        const qty = cartItem ? cartItem.quantity : 0;

        // Same visible "bar" control markup as the shop views
        const actionControl = qty > 0
            ? `<div class="product-qty-selector-bar">
                   <button class="qty-bar-btn minus" data-id="${p.id}">−</button>
                   <span class="qty-bar-val">${qty}</span>
                   <button class="qty-bar-btn plus" data-id="${p.id}">+</button>
               </div>`
            : `<button class="add-to-cart-bar-btn" data-id="${p.id}"><i class="fa-solid fa-basket-shopping"></i></button>`;

        const card = document.createElement("div");
        card.className = "product-card";
        card.setAttribute("data-id", p.id);
        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${p.image}" alt="${p.title}" loading="lazy">
                <span class="card-badge"><i class="fa-solid fa-star text-gold"></i> ${p.rating}</span>
            </div>
            <div class="card-info">
                <h4 class="product-title">${p.title}</h4>
                <span class="product-price">${formatUZS(p.price)}</span>
                <div class="product-action-row">
                    ${actionControl}
                </div>
            </div>
        `;
        card.addEventListener("click", () => openProductModal(p));
        list.appendChild(card);
    });

    // Bind cart controls within this freshly rendered list only
    // (renderProducts scopes its bindings to #shop-tab, so no duplicates)
    list.querySelectorAll(".add-to-cart-bar-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            addToCart(btn.getAttribute("data-id"), 1);
            triggerHapticFeedback("medium");
        });
    });
    list.querySelectorAll(".qty-bar-btn.minus").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            changeCartQty(btn.getAttribute("data-id"), -1);
        });
    });
    list.querySelectorAll(".qty-bar-btn.plus").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            changeCartQty(btn.getAttribute("data-id"), 1);
        });
    });
    list.querySelectorAll(".product-qty-selector-bar").forEach(sel => {
        sel.addEventListener("click", (e) => e.stopPropagation());
    });
}

// Setup Event Listeners
function setupEventListeners() {

    const sheetForm = document.getElementById("checkout-sheet-form");
    if (sheetForm) {
        sheetForm.addEventListener("submit", (e) => {
            e.preventDefault();
            closeCheckoutSheet();
            handleCheckoutSubmit();
        });
    }

    // Navigation Tabs
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const tab = item.getAttribute("data-tab");
            switchTab(tab);
            triggerHapticFeedback("light");
        });
    });

    // Floating Cart Click
    floatingCart.addEventListener("click", () => {
        switchTab("cart");
        triggerHapticFeedback("medium");
    });

    // ==========================================
    // UPGRADED ADMIN CATALOG EDIT FORM EVENTS
    // ==========================================
    // Category Modal triggers
    const manageCategoriesBtn = document.getElementById("admin-manage-categories-btn");
    const categoryModal = document.getElementById("admin-category-modal");
    const closeCategoryModalBtn = document.getElementById("close-category-modal");
    const btnAddCategoryAction = document.getElementById("btn-add-category-action");
    
    if (manageCategoriesBtn && categoryModal) {
        manageCategoriesBtn.addEventListener("click", () => {
            categoryModal.style.display = "flex";
            document.body.style.overflow = "hidden";
            renderCategoryManager();
            triggerHapticFeedback("light");
        });
    }
    
    if (closeCategoryModalBtn && categoryModal) {
        closeCategoryModalBtn.addEventListener("click", () => {
            categoryModal.style.display = "none";
            document.body.style.overflow = "auto";
        });
        categoryModal.addEventListener("click", (e) => {
            if (e.target === categoryModal) {
                categoryModal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }

    if (btnAddCategoryAction) {
        btnAddCategoryAction.addEventListener("click", () => {
            addCategory();
        });
    }


    const adminAddProductBtn = document.getElementById("admin-add-product-btn");
    if (adminAddProductBtn) {
        adminAddProductBtn.addEventListener("click", () => {
            openAdminProductModal(null);
        });
    }

    const closeAdminModalBtn = document.getElementById("close-admin-modal");
    const adminProductModal = document.getElementById("admin-product-modal");
    if (closeAdminModalBtn && adminProductModal) {
        closeAdminModalBtn.addEventListener("click", () => {
            adminProductModal.style.display = "none";
            document.body.style.overflow = "auto";
        });
        adminProductModal.addEventListener("click", (e) => {
            if (e.target === adminProductModal) {
                adminProductModal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }

    // Image preset choice toggles custom file upload wrapper
    const imageOptionRadios = document.querySelectorAll('input[name="admin_image_option"]');
    const customUploadWrapper = document.getElementById("custom-file-upload-wrapper");
    imageOptionRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            if (e.target.value === "custom") {
                customUploadWrapper.style.display = "block";
            } else {
                customUploadWrapper.style.display = "none";
            }
        });
    });

    // Custom File input reader (FileReader Base64 conversion)
    const adminFileInput = document.getElementById("admin-form-file");
    const uploadedPreviewWrapper = document.getElementById("uploaded-preview-wrapper");
    const uploadedImagePreview = document.getElementById("uploaded-image-preview");
    if (adminFileInput) {
        adminFileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    uploadedImagePreview.src = event.target.result;
                    uploadedPreviewWrapper.style.display = "flex";
                    
                    // Auto-check custom radio button
                    const radioCustom = document.getElementById("radio-custom-upload");
                    if (radioCustom) {
                        radioCustom.checked = true;
                        customUploadWrapper.style.display = "block";
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Remove uploaded custom image button
    const btnRemoveUploaded = document.getElementById("btn-remove-uploaded");
    if (btnRemoveUploaded) {
        btnRemoveUploaded.addEventListener("click", () => {
            if (adminFileInput) adminFileInput.value = "";
            uploadedImagePreview.src = "";
            uploadedPreviewWrapper.style.display = "none";
            
            // Auto check first preset cake radio button
            const firstRadio = document.querySelector('input[name="admin_image_option"]');
            if (firstRadio) {
                firstRadio.checked = true;
                if (customUploadWrapper) customUploadWrapper.style.display = "none";
            }
        });
    }

    // Admin Catalog Form submission
    const adminProductForm = document.getElementById("admin-product-form");
    if (adminProductForm) {
        adminProductForm.addEventListener("submit", (e) => {
            e.preventDefault();
            handleAdminFormSubmit();
        });
    }

    // Catalog Search
    const catalogSearchInput = document.getElementById("admin-catalog-search");
    if (catalogSearchInput) {
        catalogSearchInput.addEventListener("input", (e) => {
            adminCatalogSearchQuery = e.target.value;
            renderAdminPanel();
        });
    }

    // Category pills are bound inside renderCategoryTabs() (single binding, no duplicates).

    // Search Input
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        if (searchQuery.length > 0) {
            clearSearchBtn.style.display = "block";
        } else {
            clearSearchBtn.style.display = "none";
        }
        renderProducts();
    });

    // Clear Search
    clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        clearSearchBtn.style.display = "none";
        renderProducts();
        triggerHapticFeedback("light");
    });

    // Modal Events
    closeModalBtn.addEventListener("click", closeProductModal);
    
    // Close modal when clicking outside contents
    productModal.addEventListener("click", (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });

    modalQtyMinus.addEventListener("click", () => {
        if (modalQty > 1) {
            modalQty--;
            modalQtyVal.textContent = modalQty;
            triggerHapticFeedback("light");
        }
    });

    modalQtyPlus.addEventListener("click", () => {
        modalQty++;
        modalQtyVal.textContent = modalQty;
        triggerHapticFeedback("light");
    });

    modalAddBtn.addEventListener("click", () => {
        if (selectedProduct) {
            addToCart(selectedProduct.id, modalQty);
            closeProductModal();
            triggerHapticFeedback("medium");
        }
    });

    // Apply Promo Code (guarded: the promo UI is not present in the current cart layout)
    if (promoApplyBtn && promoInput && promoStatusMsg) {
        promoApplyBtn.addEventListener("click", () => {
            const code = promoInput.value.trim().toUpperCase();
            if (promoCodes[code]) {
                discountPercent = promoCodes[code];
                promoStatusMsg.textContent = `Muqobil promokod! Sizga ${discountPercent}% chegirma taqdim etildi.`;
                promoStatusMsg.className = "promo-status-msg success";
                updateCartUI();
                triggerHapticFeedback("medium");
            } else {
                discountPercent = 0;
                promoStatusMsg.textContent = "Noma'lum yoki eskirgan promokod.";
                promoStatusMsg.className = "promo-status-msg error";
                updateCartUI();
                triggerHapticFeedback("light");
            }
        });
    }

    // Delivery selection — visual active state + totals refresh.
    // (Address show/hide & required toggling is handled by toggleSheetDeliveryType,
    // wired via the sheet radios' inline onchange.)
    const deliveryTypeRadios = document.querySelectorAll('input[name="delivery_type"]');
    deliveryTypeRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            const label = radio.closest(".delivery-option");
            document.querySelectorAll(".delivery-option").forEach(l => l.classList.remove("active"));
            if (label) label.classList.add("active");
            updateCartUI();
            triggerHapticFeedback("light");
        });
    });

    // Payment Selection Animation
    const paymentRadios = document.querySelectorAll('input[name="payment_method"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            const label = radio.closest(".payment-option");
            document.querySelectorAll(".payment-option").forEach(l => l.classList.remove("active"));
            label.classList.add("active");
            triggerHapticFeedback("light");
        });
    });

    // Checkout submission is bound to #checkout-sheet-form at the top of this function.

    // Cancel Active Order
    cancelOrderBtn.addEventListener("click", () => {
        if (confirm("Haqiqatan ham buyurtmani bekor qilmoqchimisiz?")) {
            activeOrder = null;
            saveLocalStorage();
            updateTrackingUI();
            triggerHapticFeedback("medium");
            if (tg && tg.showPopup) {
                tg.showPopup({
                    title: "Buyurtma bekor qilindi",
                    message: "Buyurtmangiz muvaffaqiyatli bekor qilindi.",
                    buttons: [{ type: "ok" }]
                });
            }
        }
    });

    // Done Success Screen Button
    successDoneBtn.addEventListener("click", () => {
        successOverlay.style.display = "none";
        switchTab("orders");
    });

    // ==========================================
    // ADMIN SUBTAB EVENTS
    // ==========================================
    const subTabBtns = document.querySelectorAll(".admin-sub-tab-btn");
    subTabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            subTabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            adminSubtab = btn.getAttribute("data-subtab");
            
            // Hide all subtabs, show selected
            document.querySelectorAll(".admin-subtab-content").forEach(c => c.classList.remove("active"));
            const targetContent = document.getElementById("admin-subtab-" + adminSubtab);
            if (targetContent) targetContent.classList.add("active");
            
            renderAdminPanel();
            triggerHapticFeedback("light");
        });
    });

    // Admin Orders Search
    const ordersSearchInput = document.getElementById("admin-orders-search");
    if (ordersSearchInput) {
        ordersSearchInput.addEventListener("input", (e) => {
            adminOrderSearchQuery = e.target.value;
            renderAdminPanel();
        });
    }

    // Admin Orders Filter buttons
    const filterBtns = document.querySelectorAll(".status-filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            adminOrderFilter = btn.getAttribute("data-filter");
            renderAdminPanel();
            triggerHapticFeedback("light");
        });
    });
}

// Switch Tabs
function switchTab(tabId) {
    currentTab = tabId;
    
    // Update Navigation UI
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        if (item.getAttribute("data-tab") === tabId) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Update Content Tabs
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach(content => {
        if (content.getAttribute("id") === `${tabId}-tab`) {
            content.classList.add("active");
        } else {
            content.classList.remove("active");
        }
    });

    // Show/Hide Search & Filter Section and Promo Hero Card
    const searchSection = document.getElementById("search-filter-section");
    const promoHero = document.getElementById("promo-hero-card");
    if (tabId === "shop") {
        searchSection.style.display = "flex";
        if (promoHero) promoHero.style.display = "block";
    } else {
        searchSection.style.display = "none";
        if (promoHero) promoHero.style.display = "none";
    }

    // Handle Cart & Catalog tab specific layouts (hide top brand header & bottom nav icons)
    const appHeader = document.querySelector(".app-header-premium");
    const appNav = document.querySelector(".app-nav");
    const appMain = document.querySelector(".app-main");
    
    if (tabId === "cart" || tabId === "catalog") {
        if (appHeader) appHeader.style.display = "none";
        if (tabId === "cart") {
            if (appNav) appNav.style.display = "none";
            if (appMain) appMain.style.paddingBottom = "0px";
        } else {
            if (appNav) appNav.style.display = "flex";
            if (appMain) appMain.style.paddingBottom = "80px";
        }
    } else {
        if (appHeader) appHeader.style.display = "block";
        if (appNav) appNav.style.display = "flex";
        if (appMain) appMain.style.paddingBottom = "80px";
    }

    // Floating Cart display rules:
    // Only show if we have items in cart, and we are NOT on the cart tab
    if (cart.length > 0 && tabId !== "cart") {
        if (floatingCart) floatingCart.style.display = "flex";
    } else {
        if (floatingCart) floatingCart.style.display = "none";
    }

    // Trigger admin panel rendering if tab is admin
    if (tabId === "admin") {
        renderAdminPanel();
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Sync Telegram Native Main Button
    syncTelegramMainButton();
}

// Sync Telegram Native Main Button
function syncTelegramMainButton() {
    if (!tg) return;

    // MainButton is shown ONLY on the cart tab (checkout). On all other tabs
    // it stays hidden — the in-app bottom nav & floating basket already cover navigation.
    if (currentTab === "cart" && cart.length > 0) {
        tg.MainButton.text = `BUYURTMA BERISH (${formatUZS(calculateTotal())})`;
        // Prevent stacking duplicate click handlers on repeated syncs
        tg.MainButton.offClick(triggerCheckoutFormSubmit);
        tg.MainButton.onClick(triggerCheckoutFormSubmit);
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}

// Native Telegram MainButton callback wrapper
function triggerCheckoutFormSubmit() {
    // The MainButton opens the checkout sheet; the sheet's own submit button
    // performs validation & submission of #checkout-sheet-form.
    if (currentTab === "cart" && cart.length > 0) {
        openCheckoutSheet();
    }
}

// Open Product Details Modal
function openProductModal(product) {
    selectedProduct = product;
    
    modalImg.src = product.image;
    modalTitle.textContent = product.title;
    modalPrice.textContent = formatUZS(product.price);
    modalWeight.textContent = product.weight;
    modalRating.textContent = product.rating;
    modalDescription.textContent = product.description;
    modalIngredients.textContent = product.ingredients;

    // Preparation time (was previously stuck at the static "Tezda" default)
    const modalTimeEl = document.getElementById("modal-product-time");
    if (modalTimeEl) modalTimeEl.textContent = product.time || "Tezda";

    // Reset quantity (state + display)
    modalQty = 1;
    modalQtyVal.textContent = "1";
    
    productModal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    triggerHapticFeedback("light");
}

// Close Product Details Modal
function closeProductModal() {
    productModal.style.display = "none";
    document.body.style.overflow = "auto";
    selectedProduct = null;
}

// Add Item to Shopping Cart
function addToCart(productId, qty) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.product.id === productId);
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({ product, quantity: qty });
    }

    saveLocalStorage();
    updateCartUI();
    renderProductsWithScrollPreservation();

    // Sync catalog category detail view if active
    const catalogCategoryView = document.getElementById("catalog-category-view");
    if (catalogCategoryView && catalogCategoryView.style.display === "block" && currentCatalogCatId) {
        renderCatalogCategoryProducts(currentCatalogCatId);
    }

    // Show quick notification or bounce effect
    animateFloatingCart();

    // Sync Telegram buttons
    syncTelegramMainButton();
}

function changeCartQty(productId, change) {
    const item = cart.find(item => item.product.id === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.product.id !== productId);
    }

    saveLocalStorage();
    updateCartUI();
    renderProductsWithScrollPreservation();
    
    // Sync catalog category detail view if active
    const catalogCategoryView = document.getElementById("catalog-category-view");
    if (catalogCategoryView && catalogCategoryView.style.display === "block" && currentCatalogCatId) {
        renderCatalogCategoryProducts(currentCatalogCatId);
    }
    
    syncTelegramMainButton();
    triggerHapticFeedback("light");
}
// Calculate Cart Totals
function calculateSubtotal() {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

function calculateDiscount(subtotal) {
    return Math.round((subtotal * discountPercent) / 100);
}

function calculateDeliveryCost() {
    const deliveryType = document.querySelector('input[name="delivery_type"]:checked')?.value || "delivery";
    return deliveryType === "pickup" ? 0 : DELIVERY_COST;
}

function calculateTotal() {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount(subtotal);
    const delivery = calculateDeliveryCost();
    return (subtotal - discount) + delivery;
}

// Update Cart Tab and Widgets UI
function updateCartUI() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update count widgets
    if (cartCount > 0) {
        if (floatingCartCount) floatingCartCount.textContent = cartCount;
        if (navCartBadge) {
            navCartBadge.textContent = cartCount;
            navCartBadge.style.display = "flex";
        }
        
        // Show floating cart if not on cart tab
        if (currentTab !== "cart") {
            if (floatingCart) floatingCart.style.display = "flex";
        }
    } else {
        if (floatingCart) floatingCart.style.display = "none";
        if (navCartBadge) navCartBadge.style.display = "none";
    }

    // If Cart tab is active
    if (cart.length === 0) {
        if (emptyCartView) emptyCartView.style.display = "flex";
        if (cartContentView) cartContentView.style.display = "none";
    } else {
        if (emptyCartView) emptyCartView.style.display = "none";
        if (cartContentView) cartContentView.style.display = "flex";

        // Render Redesigned Cart Items (Safia style layout)
        if (cartItemsList) {
            cartItemsList.innerHTML = "";
            cart.forEach(item => {
                const p = item.product;
                const qty = item.quantity;
                const itemTotal = p.price * qty;

                const card = document.createElement("div");
                card.className = "cart-item-card";

                card.innerHTML = `
                    <div class="cart-item-top">
                        <img src="${p.image}" alt="${p.title}" class="cart-item-image" loading="lazy">
                        <div class="cart-item-info">
                            <h4 class="cart-item-title">${p.title}</h4>
                            <p class="cart-item-desc" style="margin: 0; font-size: 0.72rem; color: var(--hint-color); line-height: 1.2;">${p.description || "Mayin va shirin pishiriq."}</p>
                            <span class="cart-unit-price" style="font-size: 0.7rem; color: var(--hint-color); margin-top: 3px; display: inline-block;">1 dona uchun: ${formatUZS(p.price)}</span>
                        </div>
                    </div>
                    <div class="cart-item-bottom">
                        <div class="cart-item-qty-selector">
                            <button class="cart-qty-btn minus" data-id="${p.id}">−</button>
                            <span class="cart-qty-val">${qty}</span>
                            <button class="cart-qty-btn plus" data-id="${p.id}">+</button>
                        </div>
                        <div class="cart-item-total-price">
                            <span class="cart-item-total-label" style="font-size: 0.65rem; color: var(--hint-color); text-transform: uppercase;">Jami</span>
                            <span class="cart-item-total-val">${formatUZS(itemTotal)}</span>
                        </div>
                    </div>
                `;

                // Bind quantity adjustments dynamically
                const minusBtn = card.querySelector(".cart-qty-btn.minus");
                const plusBtn = card.querySelector(".cart-qty-btn.plus");

                if (minusBtn) {
                    minusBtn.addEventListener("click", () => {
                        changeCartQty(p.id, -1);
                    });
                }
                if (plusBtn) {
                    plusBtn.addEventListener("click", () => {
                        changeCartQty(p.id, 1);
                    });
                }

                cartItemsList.appendChild(card);
            });
        }

        // Update Pricing Card (Safia style totals & points)
        const subtotal = calculateSubtotal();
        const discount = calculateDiscount(subtotal);
        const delivery = calculateDeliveryCost();
        const total = calculateTotal();
        const loyaltyPoints = Math.round(total * 0.02); // 2% Cashback points

        const loyaltyValEl = document.getElementById("cart-loyalty-val");
        if (loyaltyValEl) {
            loyaltyValEl.textContent = `+${loyaltyPoints.toLocaleString('uz-UZ')} ball`;
        }

        if (summarySubtotal) summarySubtotal.textContent = formatUZS(subtotal);
        if (summaryDelivery) summaryDelivery.textContent = formatUZS(delivery);
        
        if (discount > 0) {
            if (summaryDiscountPercent) summaryDiscountPercent.textContent = discountPercent;
            if (summaryDiscount) summaryDiscount.textContent = `-${formatUZS(discount)}`;
            if (summaryDiscountRow) summaryDiscountRow.style.display = "flex";
        } else {
            if (summaryDiscountRow) summaryDiscountRow.style.display = "none";
        }
        
        if (summaryTotal) summaryTotal.textContent = formatUZS(total);
    }
}
function animateFloatingCart() {
    floatingCart.classList.add("pulse-animation");
    // Remove pulse anim & do bounce
    floatingCart.style.transform = 'scale(1.2)';
    setTimeout(() => {
        floatingCart.style.transform = 'scale(1)';
    }, 200);
}

// Handle checkout form submit
function handleCheckoutSubmit() {
    const name = document.getElementById("form-name").value.trim();
    const phone = document.getElementById("form-phone").value.trim();
    const deliveryType = document.querySelector('input[name="delivery_type"]:checked').value;
    const address = deliveryType === "pickup" ? "Do'kondan olib ketish (Samarqand Darvoza / Toshkent)" : document.getElementById("form-address").value.trim();
    const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;
    const comment = document.getElementById("form-comment").value.trim();

    const subtotal = calculateSubtotal();
    const discount = calculateDiscount(subtotal);
    const delivery = calculateDeliveryCost();
    const total = calculateTotal();

    // Compile order receipt object
    const orderData = {
        orderId: Math.floor(1000 + Math.random() * 9000), // Random 4-digit ID
        date: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }) + " | " + new Date().toLocaleDateString('uz-UZ'),
        name: name,
        phone: "+998 " + phone,
        deliveryType: deliveryType === "pickup" ? "Olib ketish" : "Yetkazib berish",
        address: address,
        paymentMethod: paymentMethod === "cash" ? "Naqd pul" : "Karta orqali o'tkazish",
        comment: comment || "Yo'q",
        items: cart.map(item => ({
            title: item.product.title,
            qty: item.quantity,
            price: item.product.price,
            total: item.product.price * item.quantity
        })),
        pricing: {
            subtotal: subtotal,
            discount: discount,
            delivery: delivery,
            total: total
        }
    };

    console.log("Submitting Order data: ", orderData);

    // Save to admin panel order list
    orderData.status = "received";
    ordersList.push(orderData);

    // Save as active order in local state for live tracking simulation
    activeOrder = orderData;
    saveLocalStorage();

    // Trigger Telegram Haptic
    triggerHapticFeedback("success");

    // Attempt to send data to Telegram Bot
    if (tg) {
        try {
            // Note: sendData only works when WebApp is opened from a Keyboard button
            tg.sendData(JSON.stringify(orderData));
        } catch (e) {
            console.warn("tg.sendData failed (common when opened via inline link button):", e);
        }
    }

    // Clear Cart
    cart = [];
    discountPercent = 0;
    if (promoInput) promoInput.value = "";
    if (promoStatusMsg) promoStatusMsg.textContent = "";
    saveLocalStorage();
    updateCartUI();

    // Show custom visual success screen
    successOverlay.style.display = "flex";

    // Update tracking UI
    updateTrackingUI();

    // Start Live Delivery Status Simulation (wow factor)
    simulateDeliveryTracking();
}

// Update Active Order Tracking UI
function updateTrackingUI() {
    if (activeOrder) {
        noActiveOrderView.style.display = "none";
        activeOrderTrackingView.style.display = "block";
        navOrdersDot.style.display = "block";

        trackingOrderId.textContent = `#${activeOrder.orderId}`;
        trackingOrderDate.textContent = activeOrder.date;
        trackingTotalPrice.textContent = formatUZS(activeOrder.pricing.total);
        trackingPaymentType.textContent = activeOrder.paymentMethod;
        trackingAddress.textContent = activeOrder.address;

        // Render products list in tracking card
        trackingItemsList.innerHTML = "";
        activeOrder.items.forEach(item => {
            const row = document.createElement("div");
            row.className = "tracking-item-row";
            row.innerHTML = `
                <span class="tracking-item-name">${item.title}</span>
                <span class="tracking-item-qty">x${item.qty}</span>
                <span class="tracking-item-total">${formatUZS(item.total)}</span>
            `;
            trackingItemsList.appendChild(row);
        });

        // Set tracking steps visually
        resetTrackingSteps();
        
        // Retrieve simulated status
        const simulatedStatus = localStorage.getItem("simulated_order_status") || "received";
        setTrackingStep(simulatedStatus);

    } else {
        noActiveOrderView.style.display = "flex";
        activeOrderTrackingView.style.display = "none";
        navOrdersDot.style.display = "none";
        localStorage.removeItem("simulated_order_status");
    }
}

// Reset all tracking visual steps
function resetTrackingSteps() {
    const steps = ["step-received", "step-preparing", "step-delivering", "step-completed"];
    steps.forEach(stepId => {
        const el = document.getElementById(stepId);
        if (el) {
            el.classList.remove("active", "completed");
        }
    });
}

// Set active tracking step visual
function setTrackingStep(status) {
    resetTrackingSteps();

    const orderType = activeOrder ? activeOrder.deliveryType : "Yetkazib berish";
    if (orderType === "Olib ketish") {
        // Change text of delivery step to ready to pick up
        document.querySelector("#step-delivering span").textContent = "Tayyor";
    } else {
        document.querySelector("#step-delivering span").textContent = "Yo'lda";
    }

    if (status === "received") {
        document.getElementById("step-received").classList.add("active");
    } else if (status === "preparing") {
        document.getElementById("step-received").classList.add("completed");
        document.getElementById("step-preparing").classList.add("active");
    } else if (status === "delivering") {
        document.getElementById("step-received").classList.add("completed");
        document.getElementById("step-preparing").classList.add("completed");
        document.getElementById("step-delivering").classList.add("active");
    } else if (status === "completed") {
        document.getElementById("step-received").classList.add("completed");
        document.getElementById("step-preparing").classList.add("completed");
        document.getElementById("step-delivering").classList.add("completed");
        document.getElementById("step-completed").classList.add("completed", "active");
        
        // Hide order tracking pulse dot in navbar
        navOrdersDot.style.display = "none";
    }
}

// Simulated active order tracking steps (for demonstration/wow effect)
let trackingTimer;
function simulateDeliveryTracking() {
    if (trackingTimer) clearInterval(trackingTimer);

    localStorage.setItem("simulated_order_status", "received");
    setTrackingStep("received");

    let count = 0;
    trackingTimer = setInterval(() => {
        if (!activeOrder) {
            clearInterval(trackingTimer);
            return;
        }

        count++;
        if (count === 1) {
            localStorage.setItem("simulated_order_status", "preparing");
            setTrackingStep("preparing");
            triggerHapticFeedback("light");
        } else if (count === 2) {
            localStorage.setItem("simulated_order_status", "delivering");
            setTrackingStep("delivering");
            triggerHapticFeedback("light");
        } else if (count === 3) {
            localStorage.setItem("simulated_order_status", "completed");
            setTrackingStep("completed");
            triggerHapticFeedback("success");
            clearInterval(trackingTimer);
        }
    }, 15000); // Transitions every 15 seconds for demonstration
}

// Local Storage Helper
function saveLocalStorage() {
    localStorage.setItem("impulse_sweets_cart", JSON.stringify(cart));
    localStorage.setItem("impulse_sweets_active_order", JSON.stringify(activeOrder));
    localStorage.setItem("impulse_sweets_discount", discountPercent.toString());
    localStorage.setItem("impulse_sweets_products", JSON.stringify(products));
    localStorage.setItem("impulse_sweets_categories", JSON.stringify(categories));
    localStorage.setItem("impulse_sweets_all_orders", JSON.stringify(ordersList));
}

function loadLocalStorage() {
    try {
        const savedCart = localStorage.getItem("impulse_sweets_cart");
        if (savedCart) cart = JSON.parse(savedCart);

        const savedOrder = localStorage.getItem("impulse_sweets_active_order");
        if (savedOrder) activeOrder = JSON.parse(savedOrder);

        const savedDiscount = localStorage.getItem("impulse_sweets_discount");
        if (savedDiscount) discountPercent = parseInt(savedDiscount) || 0;

        // Load and merge edited product prices
        const savedPrices = localStorage.getItem("impulse_sweets_product_prices");
        if (savedPrices) {
            const prices = JSON.parse(savedPrices);
            products.forEach(p => {
                if (prices[p.id]) {
                    p.price = prices[p.id];
                }
            });
        }

        // Load categories array from localStorage
        const savedCategories = localStorage.getItem("impulse_sweets_categories");
        if (savedCategories) {
            categories = JSON.parse(savedCategories);
        } else {
            localStorage.setItem("impulse_sweets_categories", JSON.stringify(categories));
        }

        // Load products array from localStorage
        const savedProducts = localStorage.getItem("impulse_sweets_products");
        if (savedProducts) {
            products = JSON.parse(savedProducts);
        } else {
            products = [...defaultProductsList];
            localStorage.setItem("impulse_sweets_products", JSON.stringify(products));
        }

        // Load admin orders list or create realistic default orders for demo
        const savedOrders = localStorage.getItem("impulse_sweets_all_orders");
        if (savedOrders) {
            ordersList = JSON.parse(savedOrders);
        } else {
            ordersList = [
                {
                    orderId: 3829,
                    date: "10:30 | 27.07.2026",
                    name: "Jasur Rahimov",
                    phone: "+998 90 987 65 43",
                    deliveryType: "Yetkazib berish",
                    address: "Toshkent sh., Yunusobod 4-daha, 12-uy",
                    paymentMethod: "Karta orqali",
                    comment: "Iltimos, ustiga 'Happy Birthday' deb yozib bering",
                    status: "completed",
                    items: [
                        { title: "Eksklyuziv Shokoladli Tort", qty: 1, price: 240000, total: 240000 },
                        { title: "Premium Fransuz Makaronlari", qty: 1, price: 95000, total: 95000 }
                    ],
                    pricing: { subtotal: 335000, discount: 0, delivery: 20000, total: 355000 }
                },
                {
                    orderId: 1042,
                    date: "11:45 | 27.07.2026",
                    name: "Nigora Karimova",
                    phone: "+998 93 456 78 90",
                    deliveryType: "Olib ketish",
                    address: "Do'kondan olib ketish",
                    paymentMethod: "Naqd pul",
                    comment: "Yo'q",
                    status: "preparing",
                    items: [
                        { title: "Qizil Velvet Kapkeki", qty: 4, price: 32000, total: 128000 }
                    ],
                    pricing: { subtotal: 128000, discount: 19200, delivery: 0, total: 108800 }
                }
            ];
            localStorage.setItem("impulse_sweets_all_orders", JSON.stringify(ordersList));
        }

        // If active order was loaded, check if we need to resume tracking simulation
        if (activeOrder) {
            const currentStatus = localStorage.getItem("simulated_order_status") || "received";
            if (currentStatus !== "completed") {
                simulateDeliveryTracking();
            }
        }
    } catch (e) {
        console.error("Error reading from local storage:", e);
    }
}

// Haptic Feedback Helper wrapper
function triggerHapticFeedback(type) {
    if (!tg || !tg.HapticFeedback) return;
    
    try {
        if (type === "light") {
            tg.HapticFeedback.impactOccurred("light");
        } else if (type === "medium") {
            tg.HapticFeedback.impactOccurred("medium");
        } else if (type === "success") {
            tg.HapticFeedback.notificationOccurred("success");
        }
    } catch (e) {
        console.error("Error triggering native Telegram haptic feedback:", e);
    }
}

// ==========================================
// ADMIN CONTROL PANEL LOGIC
// ==========================================
// ADMIN CONTROL PANEL LOGIC (World Standards)
// ==========================================
// ADMIN CONTROL PANEL LOGIC (Shopify/Wolt Standards)
// ==========================================

// ==========================================
// DYNAMIC CATEGORY RENDER & MANAGEMENT
// ==========================================

function renderCategoryTabs() {
    const container = document.getElementById("categories-list");
    if (!container) return;
    
    let html = `<button class="category-btn ${currentCategory === 'all' ? 'active' : ''}" data-category="all">Barchasi</button>`;
    
    categories.forEach(cat => {
        html += `<button class="category-btn ${currentCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">${cat.name}</button>`;
    });
    
    container.innerHTML = html;
    
    // Re-bind click event listeners to category buttons
    const categoryBtns = container.querySelectorAll(".category-btn");
    categoryBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            currentCategory = btn.getAttribute("data-category");
            renderProducts();
            triggerHapticFeedback("light");
        });
    });
}

function renderCategoryManager() {
    const tableList = document.getElementById("admin-categories-table-list");
    if (!tableList) return;
    
    tableList.innerHTML = "";
    categories.forEach(cat => {
        const row = document.createElement("div");
        row.className = "category-row-item";
        row.innerHTML = `
            <span>${cat.name}</span>
            <button class="category-delete-btn" onclick="deleteCategory('${cat.id}')" title="Kategoriyani o'chirish">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        tableList.appendChild(row);
    });
}

window.addCategory = function() {
    const input = document.getElementById("new-category-name-input");
    if (!input) return;
    const name = input.value.trim();
    if (name === "") {
        alert("Kategoriya nomini kiriting!");
        return;
    }
    
    // Generate clean ID
    const id = "cat_" + name.toLowerCase().replace(/[^a-z0-9]/g, '_') + "_" + Date.now().toString().slice(-4);
    
    categories.push({ id, name });
    saveLocalStorage();
    renderCategoryTabs();
    renderCategoryManager();
    input.value = "";
    triggerHapticFeedback("success");
};

window.deleteCategory = function(categoryId) {
    const cat = categories.find(c => c.id === categoryId);
    if (!cat) return;
    
    // Check if there are products in this category
    const affectedProducts = products.filter(p => p.category === categoryId);
    let message = `"${cat.name}" kategoriyasini o'chirmoqchimisiz?`;
    if (affectedProducts.length > 0) {
        message += `\nDiqqat: Ushbu kategoriyada ${affectedProducts.length} ta mahsulot bor. Ular "Boshqalar" kategoriyasiga o'tkaziladi.`;
    }
    
    if (confirm(message)) {
        // Move products to 'others' fallback category
        if (affectedProducts.length > 0) {
            // Ensure 'others' exists
            if (!categories.some(c => c.id === "others")) {
                categories.push({ id: "others", name: "Boshqalar" });
            }
            affectedProducts.forEach(p => {
                p.category = "others";
            });
        }
        
        // Remove category
        categories = categories.filter(c => c.id !== categoryId);
        
        saveLocalStorage();
        renderCategoryTabs();
        renderProducts();
        renderAdminPanel();
        renderCategoryManager();
        triggerHapticFeedback("success");
    }
};

function renderAdminPanel() {
    // 1. Subtab Switching visibility sync
    document.querySelectorAll(".admin-subtab-content").forEach(c => c.classList.remove("active"));
    const activeSubtabEl = document.getElementById("admin-subtab-" + adminSubtab);
    if (activeSubtabEl) activeSubtabEl.classList.add("active");

    const subTabBtns = document.querySelectorAll(".admin-sub-tab-btn");
    subTabBtns.forEach(btn => {
        if (btn.getAttribute("data-subtab") === adminSubtab) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // 2. Calculate Stats Dynamically
    const completedOrders = ordersList.filter(o => o.status === 'completed');
    const pendingOrders = ordersList.filter(o => o.status !== 'completed' && o.status !== 'canceled');
    
    const totalOrders = ordersList.length;
    const totalRevenue = completedOrders.reduce((sum, o) => sum + o.pricing.total, 0);
    const avgCheck = completedOrders.length > 0 ? Math.round(totalRevenue / completedOrders.length) : 0;
    
    // Update KPI UI Elements
    const revEl = document.getElementById("admin-stat-revenue");
    const ordEl = document.getElementById("admin-stat-orders");
    const avgEl = document.getElementById("admin-stat-avg");
    const conversionEl = document.getElementById("admin-stat-conversion");
    
    const revCompEl = document.getElementById("admin-stat-revenue-compare");
    const ordPendingEl = document.getElementById("admin-stat-orders-pending");
    
    if (revEl) revEl.textContent = formatUZS(totalRevenue);
    if (ordEl) ordEl.textContent = `${totalOrders} ta`;
    if (avgEl) avgEl.textContent = formatUZS(avgCheck);
    
    if (revCompEl) revCompEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${completedOrders.length} ta yakunlandi`;
    if (ordPendingEl) ordPendingEl.innerHTML = `<i class="fa-solid fa-clock"></i> ${pendingOrders.length} ta kutilmoqda`;

    // 3. Render Weekly Sales Chart Dynamically
    renderWeeklySalesChart(completedOrders);

    // 4. Render Top Selling Products list Dynamically
    renderTopSweetsList(completedOrders);

    // 5. Render Orders list (filtered by search and status filter)
    const adminOrdersList = document.getElementById("admin-orders-list");
    if (adminOrdersList) {
        adminOrdersList.innerHTML = "";
        
        let filteredOrders = ordersList;
        
        // Filter by status tab
        if (adminOrderFilter !== "all") {
            filteredOrders = filteredOrders.filter(o => o.status === adminOrderFilter);
        }
        
        // Filter by search query
        if (adminOrderSearchQuery.trim() !== "") {
            const query = adminOrderSearchQuery.toLowerCase().trim();
            filteredOrders = filteredOrders.filter(o => 
                o.orderId.toString().includes(query) || 
                o.name.toLowerCase().includes(query) || 
                o.phone.includes(query) || 
                o.address.toLowerCase().includes(query)
            );
        }

        if (filteredOrders.length === 0) {
            adminOrdersList.innerHTML = `<p class="admin-empty-text">Filtrga mos keluvchi buyurtmalar topilmadi.</p>`;
        } else {
            [...filteredOrders].reverse().forEach(o => {
                const card = document.createElement("div");
                card.className = "admin-order-card";
                
                let statusBadgeClass = `status-badge-${o.status || 'received'}`;
                let statusLabel = "Yangi";
                if (o.status === "preparing") statusLabel = "Tayyorlovda";
                else if (o.status === "delivering") statusLabel = o.deliveryType === "Olib ketish" ? "Tayyor" : "Yo'lda";
                else if (o.status === "completed") statusLabel = "Yakunlangan";
                else if (o.status === "canceled") statusLabel = "Bekor qilingan";

                let itemsDetail = o.items.map(item => `${item.title} x${item.qty}`).join(", ");
                
                let actionButtons = "";
                if (!o.status || o.status === "received") {
                    actionButtons = `<button class="admin-btn admin-btn-confirm" onclick="updateOrderStatus(${o.orderId}, 'preparing')">⚙️ Qabul qilish</button>
                                     <button class="admin-btn btn-secondary" onclick="updateOrderStatus(${o.orderId}, 'canceled')">❌ Bekor qilish</button>`;
                } else if (o.status === "preparing") {
                    let btnLabel = o.deliveryType === "Olib ketish" ? "✅ Tayyor bo'ldi" : "🚚 Yo'lga chiqarish";
                    actionButtons = `<button class="admin-btn admin-btn-deliver" onclick="updateOrderStatus(${o.orderId}, 'delivering')">${btnLabel}</button>`;
                } else if (o.status === "delivering") {
                    actionButtons = `<button class="admin-btn admin-btn-complete" onclick="updateOrderStatus(${o.orderId}, 'completed')">✅ Topshirildi / Yetkazildi</button>`;
                }

                card.innerHTML = `
                    <div class="admin-order-header">
                        <span>ID: <strong>#${o.orderId}</strong> - ${o.date.split('|')[0]}</span>
                        <span class="admin-order-status-badge ${statusBadgeClass}">${statusLabel}</span>
                    </div>
                    <div class="admin-order-info">
                        <span>👤 <strong class="admin-order-user">${o.name}</strong> (${o.phone})</span>
                        <span>📍 <strong>Manzil:</strong> ${o.address}</span>
                        <span>📦 <strong>Turi:</strong> ${o.deliveryType} | 💳 <strong>To'lov:</strong> ${o.paymentMethod}</span>
                        <span>Izoh: <em>"${o.comment}"</em></span>
                        <div class="admin-order-items">🛒 ${itemsDetail}</div>
                        <div style="display:flex; justify-content:space-between; font-weight:700; margin-top:6px; border-top: 1px solid var(--border-color); padding-top: 6px;">
                            <span>Jami Summa:</span>
                            <span>${formatUZS(o.pricing.total)}</span>
                        </div>
                    </div>
                    <div class="admin-order-actions-wrapper">
                        <div class="admin-order-actions">${actionButtons}</div>
                    </div>
                `;
                adminOrdersList.appendChild(card);
            });
        }
    }

    // 6. Render Catalog Editor list (Shopify Style rows)
    const adminProductsList = document.getElementById("admin-products-list");
    if (adminProductsList) {
        adminProductsList.innerHTML = "";
        
        let filteredProducts = products;
        if (adminCatalogSearchQuery.trim() !== "") {
            const query = adminCatalogSearchQuery.toLowerCase().trim();
            filteredProducts = products.filter(p => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
        }

        if (filteredProducts.length === 0) {
            adminProductsList.innerHTML = `<p class="admin-empty-text">Katalogda bunday shirinlik topilmadi.</p>`;
        } else {
            filteredProducts.forEach(p => {
                const row = document.createElement("div");
                row.className = "admin-product-row" + (p.active === false ? " inactive" : "");
                row.innerHTML = `
                    <img src="${p.image}" alt="${p.title}" class="admin-product-thumbnail">
                    <div class="admin-product-details">
                        <span class="admin-product-title-text">${p.title}</span>
                        <span class="admin-product-category-text">${p.category} | ${p.weight}</span>
                        <span class="admin-product-price-text">${formatUZS(p.price)}</span>
                    </div>
                    <div class="admin-product-controls">
                        <!-- iOS Style Switch for Availability -->
                        <label class="switch" title="Sotuvda bor / yo'q">
                            <input type="checkbox" ${p.active !== false ? 'checked' : ''} onchange="toggleProductAvailability('${p.id}')">
                            <span class="slider"></span>
                        </label>
                        <div class="admin-row-actions">
                            <button class="admin-action-icon-btn btn-action-edit" onclick="openAdminProductModal('${p.id}')" title="Tahrirlash">
                                <i class="fa-solid fa-pencil"></i>
                            </button>
                            <button class="admin-action-icon-btn btn-action-delete" onclick="deleteProduct('${p.id}')" title="O'chirish">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                `;
                adminProductsList.appendChild(row);
            });
        }
    }
}

// Render dynamic Weekly Sales Chart
function renderWeeklySalesChart(completedOrders) {
    const chartContainer = document.getElementById("admin-sales-chart");
    if (!chartContainer) return;

    // Initialize 7 days array (index 0=Ya, 1=Du, 2=Se...)
    const weeklySales = [0, 0, 0, 0, 0, 0, 0];
    const daysLabel = ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sha'];
    
    // Parse orders into daily sales
    completedOrders.forEach(o => {
        const dayOfWeek = getDayOfWeekFromOrderDate(o.date);
        weeklySales[dayOfWeek] += o.pricing.total;
    });

    // Check max for scaling
    let maxRevenue = Math.max(...weeklySales);
    let demoMode = false;
    
    // Fallback demo data if no revenue has been recorded yet
    if (maxRevenue === 0) {
        demoMode = true;
        // Demo baseline curve: Du=450k, Se=680k, Ch=380k, Pa=850k, Ju=1.2M, Sha=1.4M, Ya=590k
        weeklySales[0] = 590000;  // Ya
        weeklySales[1] = 450000;  // Du
        weeklySales[2] = 680000;  // Se
        weeklySales[3] = 380000;  // Ch
        weeklySales[4] = 850000;  // Pa
        weeklySales[5] = 1200000; // Ju
        weeklySales[6] = 1400000; // Sha
        maxRevenue = 1400000;
    }

    const todayIdx = new Date().getDay();
    chartContainer.innerHTML = "";

    // Render bars (Du to Ya order is standard: Du, Se, Ch, Pa, Ju, Sha, Ya)
    const orderOfDays = [1, 2, 3, 4, 5, 6, 0];
    orderOfDays.forEach(dayIdx => {
        const dayRev = weeklySales[dayIdx];
        const barHeight = Math.max(5, Math.round((dayRev / maxRevenue) * 85)); // min 5% height
        const activeClass = (dayIdx === todayIdx && !demoMode) ? "active" : "";
        
        const bar = document.createElement("div");
        bar.className = `chart-bar ${activeClass}`;
        bar.style.setProperty("--bar-height", barHeight + "%");
        bar.setAttribute("data-value", formatUZSShort(dayRev));
        
        const spanLabel = document.createElement("span");
        spanLabel.className = "chart-day";
        spanLabel.textContent = daysLabel[dayIdx];
        
        bar.appendChild(spanLabel);
        chartContainer.appendChild(bar);
    });
}

// Parse Uzbek/Russian date string "10:30 | 27.07.2026"
function getDayOfWeekFromOrderDate(dateStr) {
    try {
        const parts = dateStr.split("|")[1].trim().split(".");
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1;
        const year = parseInt(parts[2]);
        const date = new Date(year, month, day);
        return date.getDay(); // 0 is Ya, 1 is Du...
    } catch (e) {
        return new Date().getDay(); // fallback
    }
}

// Helper to format short currency values (e.g. 1.2M, 450k)
function formatUZSShort(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1).replace(".0", "") + "M";
    } else if (value >= 1000) {
        return (value / 1000).toFixed(0) + "k";
    }
    return value + " UZS";
}

// Render dynamic Top Sweets progress bars
function renderTopSweetsList(completedOrders) {
    const listContainer = document.getElementById("admin-top-products-list");
    if (!listContainer) return;

    const productSales = {};
    let totalQty = 0;

    // Compile counts
    completedOrders.forEach(o => {
        o.items.forEach(item => {
            productSales[item.title] = (productSales[item.title] || 0) + item.qty;
            totalQty += item.qty;
        });
    });

    let topSweets = Object.entries(productSales).map(([title, qty]) => ({ title, qty }));
    topSweets.sort((a, b) => b.qty - a.qty);

    // Fallback demo data if no sweets have been sold yet
    if (topSweets.length === 0) {
        topSweets = [
            { title: "Eksklyuziv Shokoladli Tort", qty: 45 },
            { title: "Premium Fransuz Makaronlari", qty: 30 },
            { title: "Qizil Velvet Kapkeki", qty: 15 }
        ];
        totalQty = 90;
    }

    listContainer.innerHTML = "";

    // Show top 3
    topSweets.slice(0, 3).forEach(item => {
        const pct = Math.round((item.qty / totalQty) * 100);
        
        const row = document.createElement("div");
        row.className = "progress-row";
        
        let color = "var(--primary-color)";
        if (pct < 40 && pct >= 20) color = "var(--accent-color)";
        else if (pct < 20) color = "#4CAF50";

        row.innerHTML = `
            <div class="progress-info">
                <span>${item.title}</span>
                <span>${pct}%</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: ${pct}%; background-color: ${color};"></div>
            </div>
        `;
        listContainer.appendChild(row);
    });
}

// Expose admin actions globally
window.updateOrderStatus = function(orderId, newStatus) {
    const order = ordersList.find(o => o.orderId === orderId);
    if (!order) return;

    order.status = newStatus;
    
    if (activeOrder && activeOrder.orderId === orderId) {
        activeOrder.status = newStatus;
        localStorage.setItem("simulated_order_status", newStatus);
        
        if (newStatus === "completed" || newStatus === "canceled") {
            if (trackingTimer) clearInterval(trackingTimer);
        }
        
        updateTrackingUI();
    }

    localStorage.setItem("impulse_sweets_all_orders", JSON.stringify(ordersList));
    renderAdminPanel();
    triggerHapticFeedback("success");
};

// Toggle product in-stock availability
window.toggleProductAvailability = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Toggle active state
    product.active = (product.active !== false) ? false : true;

    localStorage.setItem("impulse_sweets_products", JSON.stringify(products));
    renderProducts();
    renderAdminPanel();
    triggerHapticFeedback("medium");
};

// Open Product Edit Modal
window.openAdminProductModal = function(productId) {
    const modal = document.getElementById("admin-product-modal");
    const modalTitle = document.getElementById("admin-modal-title");
    const form = document.getElementById("admin-product-form");
    
    const formId = document.getElementById("admin-form-product-id");
    const formTitle = document.getElementById("admin-form-title");
    const formCategory = document.getElementById("admin-form-category");
    const formPrice = document.getElementById("admin-form-price");
    const formWeight = document.getElementById("admin-form-weight");
    const formTime = document.getElementById("admin-form-time");
    const formDesc = document.getElementById("admin-form-description");
    const formIng = document.getElementById("admin-form-ingredients");
    
    const customUploadWrapper = document.getElementById("custom-file-upload-wrapper");
    const uploadedPreviewWrapper = document.getElementById("uploaded-preview-wrapper");
    const uploadedImagePreview = document.getElementById("uploaded-image-preview");
    const fileInput = document.getElementById("admin-form-file");

    if (fileInput) fileInput.value = "";

    // Rebuild category options from the live categories array
    // (admin-added categories were previously missing from the hardcoded list)
    if (formCategory) {
        formCategory.innerHTML = categories
            .map(c => `<option value="${c.id}">${c.name}</option>`)
            .join("");
    }

    if (productId) {
        // Edit Mode
        const p = products.find(prod => prod.id === productId);
        if (!p) return;

        modalTitle.textContent = "Shirinlikni tahrirlash";
        formId.value = p.id;
        formTitle.value = p.title;
        formCategory.value = p.category;
        formPrice.value = p.price;
        formWeight.value = p.weight;
        formTime.value = p.time;
        formDesc.value = p.description;
        formIng.value = p.ingredients;

        // Image Selection Logic
        const presetRadio = document.querySelector(`input[name="admin_image_option"][value="${p.image}"]`);
        if (presetRadio) {
            presetRadio.checked = true;
            customUploadWrapper.style.display = "none";
            uploadedPreviewWrapper.style.display = "none";
            uploadedImagePreview.src = "";
        } else {
            // Custom Upload Base64 Image
            const customRadio = document.getElementById("radio-custom-upload");
            if (customRadio) customRadio.checked = true;
            customUploadWrapper.style.display = "block";
            uploadedImagePreview.src = p.image;
            uploadedPreviewWrapper.style.display = "flex";
        }
    } else {
        // Add Mode
        modalTitle.textContent = "Yangi shirinlik qo'shish";
        form.reset();
        formId.value = "";
        
        // Reset image sections
        customUploadWrapper.style.display = "none";
        uploadedPreviewWrapper.style.display = "none";
        uploadedImagePreview.src = "";
        
        // Check first preset by default
        const firstPreset = document.querySelector('input[name="admin_image_option"]');
        if (firstPreset) firstPreset.checked = true;
    }

    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // disable background scrolling
    triggerHapticFeedback("light");
};

// Handle Edit/Add Form Submit
function handleAdminFormSubmit() {
    const formId = document.getElementById("admin-form-product-id").value;
    const title = document.getElementById("admin-form-title").value.trim();
    const category = document.getElementById("admin-form-category").value;
    const price = parseInt(document.getElementById("admin-form-price").value);
    const weight = document.getElementById("admin-form-weight").value.trim();
    const time = document.getElementById("admin-form-time").value.trim();
    const description = document.getElementById("admin-form-description").value.trim();
    const ingredients = document.getElementById("admin-form-ingredients").value.trim();

    // Determine Image Source
    const imageOption = document.querySelector('input[name="admin_image_option"]:checked').value;
    let imageSrc = "";

    if (imageOption === "custom") {
        const previewImg = document.getElementById("uploaded-image-preview");
        imageSrc = previewImg.src;
        if (!imageSrc || imageSrc === "" || imageSrc.includes("window.location")) {
            alert("Iltimos, rasm yuklang!");
            return;
        }
    } else {
        imageSrc = imageOption; // preset file path
    }

    if (formId) {
        // Edit existing product
        const pIndex = products.findIndex(prod => prod.id === formId);
        if (pIndex !== -1) {
            products[pIndex] = {
                ...products[pIndex],
                title,
                category,
                price,
                weight,
                time,
                description,
                ingredients,
                image: imageSrc
            };
        }
    } else {
        // Add new product
        const newProduct = {
            id: "sweets_" + Date.now(),
            category,
            title,
            price,
            description,
            ingredients,
            weight,
            rating: 4.8,
            image: imageSrc,
            time,
            active: true
        };
        products.push(newProduct);
    }

    // Save and re-render everything
    localStorage.setItem("impulse_sweets_products", JSON.stringify(products));
    renderProducts();
    renderAdminPanel();
    
    // Close modal
    document.getElementById("admin-product-modal").style.display = "none";
    document.body.style.overflow = "auto";

    triggerHapticFeedback("success");
}

// Delete product from catalog
window.deleteProduct = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (confirm(`"${product.title}" shirinligini katalogdan butunlay o'chirmoqchimisiz?`)) {
        products = products.filter(p => p.id !== productId);
        localStorage.setItem("impulse_sweets_products", JSON.stringify(products));
        renderProducts();
        renderAdminPanel();
        triggerHapticFeedback("success");
    }
};

// Start Automated Promo Banner Slider
function startPromoSlider() {
    const slides = document.querySelectorAll(".promo-slide");
    const dots = document.querySelectorAll(".promo-dot");
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 5000);
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function goToSlide(n) {
        if (slides.length === 0) return;
        
        dots[currentSlide].classList.remove("active");
        currentSlide = (n + slides.length) % slides.length;
        dots[currentSlide].classList.add("active");
        
        const container = document.getElementById("promo-slides-container");
        if (container) {
            container.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    }
    
    // Bind dot click listeners
    dots.forEach((dot, idx) => {
        dot.addEventListener("click", () => {
            clearInterval(slideInterval);
            goToSlide(idx);
            slideInterval = setInterval(nextSlide, 5000);
            triggerHapticFeedback("light");
        });
    });
}


// Set Client Delivery Type (Safia Confectionery Style)
window.setDeliveryType = function(type) {
    clientDeliveryType = type;
    
    // 1. Toggle active state of top selector buttons
    const btnDelivery = document.getElementById("toggle-delivery");
    const btnPickup = document.getElementById("toggle-pickup");
    
    if (btnDelivery && btnPickup) {
        if (type === "delivery") {
            btnDelivery.classList.add("active");
            btnPickup.classList.remove("active");
        } else {
            btnDelivery.classList.remove("active");
            btnPickup.classList.add("active");
        }
    }
    
    // 2. Sync and trigger checkout radio button change to update fields and display
    const checkoutRadio = document.querySelector(`input[name="delivery_type"][value="${type}"]`);
    if (checkoutRadio) {
        checkoutRadio.checked = true;
        checkoutRadio.dispatchEvent(new Event("change"));
    } else {
        // If not in DOM yet or on another tab, still recalculate cart pricing directly
        updateCartUI();
    }
    
    triggerHapticFeedback("medium");
};


// Render products while keeping horizontal scroll position (Wolt Style)
function renderProductsWithScrollPreservation() {
    const scrolls = document.querySelectorAll(".horizontal-product-scroll");
    const scrollPositions = {};
    scrolls.forEach(s => {
        if (s.id) scrollPositions[s.id] = s.scrollLeft;
    });

    renderProducts();

    Object.entries(scrollPositions).forEach(([id, left]) => {
        const s = document.getElementById(id);
        if (s) s.scrollLeft = left;
    });
}

// Handle plus/minus buttons click inside card footer
window.handleCardQtyChange = function(event, productId, change) {
    event.stopPropagation(); // Stop opening details modal
    
    // Add to cart directly if not exist, or change quantity
    const existing = cart.find(item => item.product.id === productId);
    if (!existing && change > 0) {
        addToCart(productId, 1);
    } else if (existing) {
        changeCartQty(productId, change);
    }
};




// Override Checkout submission to close sheet before success screen
const originalHandleCheckoutSubmit = handleCheckoutSubmit;
handleCheckoutSubmit = function() {
    closeCheckoutSheet();
    originalHandleCheckoutSubmit();
};


// Clear Cart Confirm
window.clearCartConfirm = function() {
    if (cart.length === 0) return;
    if (confirm("Savatni butunlay tozalashni xohlaysizmi?")) {
        cart = [];
        saveLocalStorage();
        updateCartUI();
        renderProductsWithScrollPreservation();
        syncTelegramMainButton();
        triggerHapticFeedback("medium");
    }
};

// Open & Close Checkout Sheet Modal (Safia Drawer)
window.openCheckoutSheet = function() {
    if (cart.length === 0) return;
    const sheet = document.getElementById("checkout-modal-sheet");
    if (sheet) {
        sheet.style.display = "flex";
        document.body.style.overflow = "hidden"; // Lock body scroll while sheet is open
        updateSheetTotals();
        triggerHapticFeedback("medium");
    }
};

window.closeCheckoutSheet = function() {
    const sheet = document.getElementById("checkout-modal-sheet");
    if (sheet) {
        sheet.style.display = "none";
        document.body.style.overflow = "auto";
    }
};

window.toggleSheetDeliveryType = function(type) {
    clientDeliveryType = type;
    const addrGroup = document.getElementById("sheet-address-group");
    const addrInput = document.getElementById("form-address");
    const deliveryRow = document.getElementById("sheet-delivery-row");
    
    if (type === "pickup") {
        if (addrGroup) addrGroup.style.display = "none";
        if (addrInput) addrInput.removeAttribute("required");
        if (deliveryRow) deliveryRow.style.display = "none";
    } else {
        if (addrGroup) addrGroup.style.display = "flex";
        if (addrInput) addrInput.setAttribute("required", "true");
        if (deliveryRow) deliveryRow.style.display = "flex";
    }
    updateSheetTotals();
};

function updateSheetTotals() {
    const subtotal = calculateSubtotal();
    const delivery = calculateDeliveryCost();
    const total = calculateTotal();
    
    const sheetSubtotal = document.getElementById("sheet-subtotal-val");
    const sheetDelivery = document.getElementById("sheet-delivery-val");
    const sheetTotal = document.getElementById("sheet-total-val");
    
    if (sheetSubtotal) sheetSubtotal.textContent = formatUZS(subtotal);
    if (sheetDelivery) sheetDelivery.textContent = formatUZS(delivery);
    if (sheetTotal) sheetTotal.textContent = formatUZS(total);
}
