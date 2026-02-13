// ===== script.js – Car Flex Main Booking Logic =====
// FULLY OPTIMIZED & DEBUGGED VERSION

// ---------- TEST MODE (Disable for production) ----------
const TEST_MODE = false; // Set to false when Firebase is configured

// ---------- FIREBASE CONFIG ----------
const firebaseConfig = {
  apiKey: "AIzaSyB9OEjBRYc9WeqJ5yUcA9BOP8Ju2PIMb-c",
  authDomain: "carflex-8dd99.firebaseapp.com",
  projectId: "carflex-8dd99",
  storageBucket: "carflex-8dd99.firebasestorage.app",
  messagingSenderId: "357221879980",
  appId: "1:357221879980:web:ab4d0240083e63f3530f09"
};

// Initialize Firebase (with error handling)
try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized');
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
}

// Firebase services
const auth = firebase.auth();
let db = null;

// Initialize Firestore with fallback
try {
  db = firebase.firestore();
  // Enable offline persistence for better performance
  db.enablePersistence({ synchronizeTabs: true }).catch(err => {
    console.warn('Firestore persistence error:', err.code);
  });
  console.log('✅ Firestore initialized');
} catch (error) {
  console.error('❌ Firestore initialization failed:', error);
  db = null;
}

// ---------- LANGUAGE DATABASE ----------
const langData = {
  en: {
    brand: "Car Flex",
    viewerMsg: "👋 Browse all features — no login needed. Sign up only to book.",
    vehicleSec: "1. Choose your vehicle",
    vehicleBadge: "required",
    descPlaceholder: "📝 Describe your vehicle (model, condition, special requests...)",
    serviceSec: "2. Additional services",
    serviceBadge: "vehicle specific",
    dateLabel: "Service date",
    timeLabel: "Time slot",
    authMsg: "🔐 To confirm service, please log in or create an account.",
    loginTxt: "Log in",
    signupTxt: "Sign up",
    logoutTxt: "Log out",
    footer: "🚗 Car Flex — premium vehicle care. © 2025",
    vehicleTypes: ["Bike", "Car", "Microbus", "Coaster", "Truck", "Bus"],
    cat1: "General Servicing",
    cat2: "Master Servicing",
    cat3: "Wash Vehicle",
    priceLabel: "Price",
    selectDate: "Please select a date",
    selectVehicle: "Please select a vehicle",
    selectService: "Please select at least one service",
    futureDate: "Please select a future date",
    loginRequired: "Please log in to confirm your booking",
    bookingConfirmed: "✅ Your booking is confirmed!",
    bookingFailed: "❌ Booking failed",
    confirmBooking: "Confirm Booking",
    processing: "Processing...",
    logoutSuccess: "Logged out successfully"
  },
  bn: {
    brand: "Car Flex",
    viewerMsg: "👋 সমস্ত ফিচার দেখুন — লগইন ছাড়া। বুকিংয়ের জন্য শুধু সাইন আপ।",
    vehicleSec: "১. আপনার গাড়ি বেছে নিন",
    vehicleBadge: "আবশ্যক",
    descPlaceholder: "📝 আপনার গাড়ির বিবরণ দিন (মডেল, অবস্থা, বিশেষ অনুরোধ...)",
    serviceSec: "২. অতিরিক্ত সেবা",
    serviceBadge: "গাড়িভেদে",
    dateLabel: "সেবার তারিখ",
    timeLabel: "সময় স্লট",
    authMsg: "🔐 সেবা নিশ্চিত করতে লগইন বা অ্যাকাউন্ট খুলুন।",
    loginTxt: "লগইন",
    signupTxt: "সাইন আপ",
    logoutTxt: "লগ আউট",
    footer: "🚗 কার ফ্লেক্স — প্রিমিয়াম গাড়ি যত্ন। © ২০২৫",
    vehicleTypes: ["বাইক", "কার", "মাইক্রোবাস", "কোস্টার", "ট্রাক", "বাস"],
    cat1: "জেনারেল সার্ভিসিং",
    cat2: "মাস্টার সার্ভিসিং",
    cat3: "গাড়ি পরিষ্কার",
    priceLabel: "মূল্য",
    selectDate: "তারিখ নির্বাচন করুন",
    selectVehicle: "গাড়ি নির্বাচন করুন",
    selectService: "অন্তত একটি সেবা নির্বাচন করুন",
    futureDate: "ভবিষ্যতের তারিখ নির্বাচন করুন",
    loginRequired: "বুকিং নিশ্চিত করতে লগইন করুন",
    bookingConfirmed: "✅ আপনার বুকিং নিশ্চিত করা হয়েছে!",
    bookingFailed: "❌ বুকিং ব্যর্থ হয়েছে",
    confirmBooking: "বুকিং নিশ্চিত করুন",
    processing: "প্রসেসিং...",
    logoutSuccess: "লগআউট সফল হয়েছে"
  }
};

// ---------- PRICE DATABASE ----------
const priceDatabase = {
  Bike: { general: 2000, master: 3500, wash: 300 },
  Car: { general: 5000, master: 8500, wash: 500 },
  Microbus: { general: 8000, master: 15000, wash: 1200 },
  Coaster: { general: 8000, master: 15000, wash: 1200 },
  Truck: { general: 10000, master: 20000, wash: 1500 },
  Bus: { general: 8000, master: 15000, wash: 1200 }
};

// ---------- SERVICE DATABASE ----------
const serviceDatabase = {
  Bike: {
    general: ['Engine oil change', 'Air filter cleaning', 'Spark plug check', 'Chain lube', 'Brake adjust', 'Tyre pressure'],
    master: ['Full diagnostics', 'Engine oil & filter', 'Valve adjustment', 'Carburetor clean', 'Brake pad replace', 'Wheel alignment'],
    wash: ['Foam wash', 'Chain degrease', 'Polish', 'Tyre shine']
  },
  Car: {
    general: ['Engine oil change', 'Oil filter', 'Air filter clean', 'AC check', 'Brake fluid', 'Wiper check', 'Battery check'],
    master: ['Full ECU scan', 'Engine oil synthetic', 'Gear oil', 'Coolant flush', 'Spark plugs', 'Injector clean', 'Wheel balance'],
    wash: ['Exterior foam', 'Interior vacuum', 'Dashboard polish', 'Glass clean', 'Underbody wash']
  },
  Microbus: {
    general: ['Engine oil (diesel)', 'Fuel filter check', 'Air filter', 'Brake check', 'Power steering fluid', 'AC vent clean'],
    master: ['Full diagnostics', 'All filters change', 'Gear oil', 'Brake shoe replace', 'AC gas', 'Coolant replace'],
    wash: ['High-pressure wash', 'Interior vacuum', 'Roof clean', 'Seat clean', 'Underbody rinse']
  },
  Coaster: {
    general: ['Engine oil', 'Fuel filter', 'Air filter', 'Brake fluid', 'Battery clean', 'Light test'],
    master: ['Engine tuning', 'All filters', 'Gearbox oil', 'Brake overhaul', 'AC check', 'Radiator flush'],
    wash: ['Full body wash', 'Interior shampoo', 'Window clean', 'Engine bay degrease']
  },
  Truck: {
    general: ['Engine oil', 'Fuel filter drain', 'Air filter', 'Brake adjust', 'Clutch fluid', 'Tyre check'],
    master: ['Engine diagnostics', 'All filters', 'Gearbox oil', 'Differential oil', 'Clutch check', 'Coolant'],
    wash: ['Truck wash', 'Trailer clean', 'Underbody jet', 'Cabin clean']
  },
  Bus: {
    general: ['Engine oil', 'Fuel filter', 'Air filter', 'Brake check', 'Power steering', 'AC vent clean'],
    master: ['Engine tuning', 'All filters', 'Gearbox oil', 'Brake shoe', 'Air suspension check', 'AC gas'],
    wash: ['Exterior wash', 'Interior clean', 'Seat wash', 'Floor scrub']
  }
};

// ---------- VEHICLE ICONS ----------
const vehicleIcons = {
  Bike: 'fa-motorcycle',
  Car: 'fa-car',
  Microbus: 'fa-bus',
  Coaster: 'fa-bus',
  Truck: 'fa-truck',
  Bus: 'fa-bus',
  'বাইক': 'fa-motorcycle',
  'কার': 'fa-car',
  'মাইক্রোবাস': 'fa-bus',
  'কোস্টার': 'fa-bus',
  'ট্রাক': 'fa-truck',
  'বাস': 'fa-bus'
};

// ---------- STATE MANAGEMENT ----------
let currentLang = 'en';
let selectedVehicle = 'Car';
let selectedServices = {
  general: false,
  master: false,
  wash: false
};

// ---------- DOM ELEMENT CACHE ----------
let elements = {};

// ---------- UPDATE DOM ELEMENT CACHE ----------
function cacheDOMElements() {
  elements = {
    brandName: document.getElementById('brandName'),
    viewerMsg: document.getElementById('viewerMsg'),
    vehicleSecTitle: document.getElementById('vehicleSecTitle'),
    vehicleBadge: document.getElementById('vehicleBadge'),
    descBox: document.getElementById('vehicleDesc'),
    serviceSecTitle: document.getElementById('serviceSecTitle'),
    serviceBadge: document.getElementById('serviceBadge'),
    dateLabel: document.getElementById('dateLabel'),
    timeLabel: document.getElementById('timeLabel'),
    authMsg: document.getElementById('authMsg'),
    loginTxt: document.getElementById('loginTxt'),
    signupTxt: document.getElementById('signupTxt'),
    logoutTxt: document.getElementById('logoutTxt'),
    footerText: document.getElementById('footerText'),
    langEn: document.getElementById('langEn'),
    langBn: document.getElementById('langBn'),
    vehicleGrid: document.getElementById('vehicleGrid'),
    serviceContainer: document.getElementById('serviceCatContainer'),
    serviceDate: document.getElementById('serviceDate'),
    serviceTime: document.getElementById('serviceTime'),
    authButtons: document.getElementById('authButtons'),
    userGreeting: document.getElementById('userGreeting'),
    userDisplayName: document.getElementById('userDisplayName'),
    logoutBtn: document.getElementById('logoutBtn'),
    confirmBtn: document.getElementById('confirmBookingBtn'),
    notificationPanel: document.getElementById('notificationPanel'),
    notificationMessage: document.getElementById('notificationMessage'),
    selectedServicesSummary: document.querySelector('.selected-services-summary')
  };
}

// ---------- HELPERS ----------
const mapToEnglish = (v) => {
  const m = { 
    'বাইক': 'Bike', 
    'কার': 'Car', 
    'মাইক্রোবাস': 'Microbus', 
    'কোস্টার': 'Coaster', 
    'ট্রাক': 'Truck', 
    'বাস': 'Bus' 
  };
  return m[v] || v;
};

const mapToBangla = (v) => {
  const m = { 
    'Bike': 'বাইক', 
    'Car': 'কার', 
    'Microbus': 'মাইক্রোবাস', 
    'Coaster': 'কোস্টার', 
    'Truck': 'ট্রাক', 
    'Bus': 'বাস' 
  };
  return m[v] || v;
};

function getServicesForVehicle(type, cat) {
  const v = serviceDatabase[type] || serviceDatabase.Car;
  return v[cat] || [];
}

function getPriceForVehicle(type, cat) {
  const p = priceDatabase[type] || priceDatabase.Car;
  return p[cat] || 0;
}

function calculateTotalPrice() {
  let total = 0;
  if (selectedServices.general) total += getPriceForVehicle(selectedVehicle, 'general');
  if (selectedServices.master) total += getPriceForVehicle(selectedVehicle, 'master');
  if (selectedServices.wash) total += getPriceForVehicle(selectedVehicle, 'wash');
  return total;
}

// ---------- NOTIFICATION SYSTEM ----------
function showNotification(message, type = 'success') {
  const panel = elements.notificationPanel;
  const messageEl = elements.notificationMessage;
  
  if (!panel || !messageEl) {
    alert(message);
    return;
  }
  
  messageEl.textContent = message;
  panel.className = 'notification-panel';
  panel.classList.add(type);
  panel.style.display = 'block';
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    panel.style.display = 'none';
  }, 5000);
}

// ---------- TOGGLE SERVICE SELECTION ----------
function toggleService(serviceKey) {
  selectedServices[serviceKey] = !selectedServices[serviceKey];
  renderServiceCategories();
  showSelectedServicesSummary();
}

// ---------- SHOW SELECTED SERVICES SUMMARY ----------
function showSelectedServicesSummary() {
  const container = elements.selectedServicesSummary;
  if (!container) return;
  
  const selected = [];
  if (selectedServices.general) selected.push({
    name: langData[currentLang].cat1,
    price: getPriceForVehicle(selectedVehicle, 'general')
  });
  if (selectedServices.master) selected.push({
    name: langData[currentLang].cat2,
    price: getPriceForVehicle(selectedVehicle, 'master')
  });
  if (selectedServices.wash) selected.push({
    name: langData[currentLang].cat3,
    price: getPriceForVehicle(selectedVehicle, 'wash')
  });
  
  const totalPrice = calculateTotalPrice();
  
  let html = `
    <h4><i class="fas fa-clipboard-list"></i> ${currentLang === 'en' ? 'Selected Services:' : 'নির্বাচিত সেবা:'}</h4>
  `;
  
  if (selected.length > 0) {
    html += '<div class="selected-services-tags">';
    selected.forEach(service => {
      html += `<span class="service-tag">
        <i class="fas fa-check-circle"></i> ${service.name} - ৳${service.price.toLocaleString('en-BD')}
      </span>`;
    });
    html += '</div>';
    html += `<div class="total-price">
      <span>${currentLang === 'en' ? 'Total Price:' : 'মোট মূল্য:'}</span>
      <span>৳${totalPrice.toLocaleString('en-BD')} BDT</span>
    </div>`;
  } else {
    html += `<p style="color: var(--text-soft);">
      ${currentLang === 'en' ? 'Click on any service package above to select it.' : 'উপরে যেকোনো সেবা প্যাকেজে ক্লিক করে নির্বাচন করুন।'}
    </p>`;
  }
  
  container.innerHTML = html;
}

// ---------- RENDER VEHICLES ----------
function renderVehicles() {
  if (!elements.vehicleGrid) return;
  
  const types = langData[currentLang].vehicleTypes;
  let html = '';
  
  types.forEach(v => {
    const icon = vehicleIcons[v] || 'fa-car';
    const active = (currentLang === 'en' ? selectedVehicle === v : selectedVehicle === mapToEnglish(v));
    html += `<div class="vehicle-card ${active ? 'active' : ''}" data-vehicle="${v}">
      <i class="fas ${icon}"></i>
      <span>${v}</span>
    </div>`;
  });
  
  elements.vehicleGrid.innerHTML = html;
  
  // Add event listeners
  document.querySelectorAll('.vehicle-card').forEach(c => {
    c.addEventListener('click', function() {
      const raw = this.dataset.vehicle;
      selectedVehicle = currentLang === 'en' ? raw : mapToEnglish(raw);
      renderVehicles();
      renderServiceCategories();
      showSelectedServicesSummary();
    });
  });
}

// ---------- RENDER SERVICE CATEGORIES ----------
function renderServiceCategories() {
  if (!elements.serviceContainer) return;
  
  const cats = [
    { key: 'general', name: langData[currentLang].cat1, icon: 'fa-tools' },
    { key: 'master', name: langData[currentLang].cat2, icon: 'fa-cogs' },
    { key: 'wash', name: langData[currentLang].cat3, icon: 'fa-water' }
  ];
  
  let html = '';
  cats.forEach(cat => {
    const items = getServicesForVehicle(selectedVehicle, cat.key);
    const price = getPriceForVehicle(selectedVehicle, cat.key);
    const list = items.map(i => `<li><i class="fas fa-check-circle"></i> ${i}</li>`).join('');
    const isSelected = selectedServices[cat.key];
    
    html += `<div class="service-cat ${isSelected ? 'service-selected' : ''}" data-service-key="${cat.key}">
      <h3>
        <i class="fas ${cat.icon}"></i> 
        ${cat.name}
        <span class="vehicle-type-badge">
          <i class="fas ${vehicleIcons[selectedVehicle] || 'fa-car'}"></i>
          ${currentLang === 'en' ? selectedVehicle : mapToBangla(selectedVehicle)}
        </span>
        ${isSelected ? '<span class="selected-badge"><i class="fas fa-check-circle"></i> Selected</span>' : ''}
      </h3>
      <ul class="service-list">${list || '<li>No services listed</li>'}</ul>
      <div class="price-tag">
        <span class="price-label"><i class="fas fa-tag"></i> ${langData[currentLang].priceLabel}:</span>
        <span class="price-amount">৳${price.toLocaleString('en-BD')} <small>BDT</small></span>
      </div>
    </div>`;
  });
  
  elements.serviceContainer.innerHTML = html;
  
  // Add click handlers to service cards
  document.querySelectorAll('.service-cat').forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.price-tag') || e.target.closest('.service-list li')) {
        return;
      }
      const serviceKey = this.dataset.serviceKey;
      toggleService(serviceKey);
    });
  });
}

// ---------- UI UPDATES ----------
function updateLanguage(lang) {
  currentLang = lang;
  const d = langData[lang];
  
  if (elements.brandName) elements.brandName.innerText = d.brand;
  if (elements.viewerMsg) elements.viewerMsg.innerText = d.viewerMsg;
  if (elements.vehicleSecTitle) elements.vehicleSecTitle.innerText = d.vehicleSec;
  if (elements.vehicleBadge) elements.vehicleBadge.innerText = d.vehicleBadge;
  if (elements.descBox) elements.descBox.placeholder = d.descPlaceholder;
  if (elements.serviceSecTitle) elements.serviceSecTitle.innerText = d.serviceSec;
  if (elements.serviceBadge) elements.serviceBadge.innerText = d.serviceBadge;
  if (elements.dateLabel) elements.dateLabel.innerHTML = `<i class="far fa-calendar-alt"></i> ${d.dateLabel}`;
  if (elements.timeLabel) elements.timeLabel.innerHTML = `<i class="far fa-clock"></i> ${d.timeLabel}`;
  if (elements.authMsg) elements.authMsg.innerText = d.authMsg;
  if (elements.loginTxt) elements.loginTxt.innerText = d.loginTxt;
  if (elements.signupTxt) elements.signupTxt.innerText = d.signupTxt;
  if (elements.logoutTxt) elements.logoutTxt.innerText = d.logoutTxt;
  if (elements.footerText) elements.footerText.innerText = d.footer;
  
  if (elements.confirmBtn) {
    elements.confirmBtn.innerHTML = `<i class="fas fa-check-circle"></i> ${d.confirmBooking}`;
  }
  
  if (elements.langEn) elements.langEn.classList.toggle('active', lang === 'en');
  if (elements.langBn) elements.langBn.classList.toggle('active', lang === 'bn');
  
  renderVehicles();
  renderServiceCategories();
  showSelectedServicesSummary();
}

function updateAuthUI(user) {
  if (!elements.authButtons || !elements.userGreeting) return;
  
  if (user) {
    elements.authButtons.style.display = 'none';
    elements.userGreeting.style.display = 'flex';
    if (elements.userDisplayName) {
      elements.userDisplayName.innerHTML = `<i class="fas fa-user-circle"></i> ${user.displayName || user.email}`;
    }
  } else {
    elements.authButtons.style.display = 'flex';
    elements.userGreeting.style.display = 'none';
  }
}

// ---------- AUTH ACTIONS ----------
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch(e => {
      console.error(e);
      showNotification('Sign in failed: ' + e.message, 'error');
    });
}

function signOut() {
  auth.signOut()
    .then(() => {
      showNotification(langData[currentLang].logoutSuccess, 'success');
      updateAuthUI(null);
    })
    .catch(e => {
      console.error(e);
      showNotification('Logout failed: ' + e.message, 'error');
    });
}

// ---------- VALIDATE BOOKING ----------
function validateBooking() {
  // Check if user is logged in
  if (!auth.currentUser) {
    showNotification(langData[currentLang].loginRequired, 'warning');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
    return false;
  }
  
  // Check if vehicle is selected
  if (!selectedVehicle) {
    showNotification(langData[currentLang].selectVehicle, 'warning');
    elements.vehicleSecTitle?.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
  
  // Check if at least one service is selected
  if (!selectedServices.general && !selectedServices.master && !selectedServices.wash) {
    showNotification(langData[currentLang].selectService, 'warning');
    elements.serviceSecTitle?.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
  
  // Check if date is selected
  if (!elements.serviceDate?.value) {
    showNotification(langData[currentLang].selectDate, 'warning');
    elements.serviceDate?.focus();
    return false;
  }
  
  // Check if date is at least tomorrow
  const selectedDate = new Date(elements.serviceDate.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate <= today) {
    showNotification(langData[currentLang].futureDate, 'warning');
    return false;
  }
  
  return true;
}

// ---------- GENERATE BOOKING ID ----------
function generateBookingId() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `CF${year}${month}${day}-${random}`;
}

// ---------- SAVE BOOKING WITH FALLBACK ----------
async function saveBooking(bookingData) {
  // TEST MODE - Save to localStorage only
  if (TEST_MODE) {
    const localBookings = JSON.parse(localStorage.getItem('carflex_bookings') || '[]');
    localBookings.push({
      ...bookingData,
      savedAt: new Date().toISOString(),
      testMode: true
    });
    localStorage.setItem('carflex_bookings', JSON.stringify(localBookings));
    console.log('📦 TEST MODE: Booking saved to localStorage', bookingData.bookingId);
    return true;
  }
  
  // PRODUCTION MODE - Try Firestore first
  if (db) {
    try {
      await db.collection('bookings').doc(bookingData.bookingId).set(bookingData);
      console.log('✅ Booking saved to Firestore:', bookingData.bookingId);
      return true;
    } catch (firestoreError) {
      console.warn('⚠️ Firestore save failed:', firestoreError);
      // Fallback to localStorage
      const localBookings = JSON.parse(localStorage.getItem('carflex_bookings') || '[]');
      localBookings.push({
        ...bookingData,
        savedAt: new Date().toISOString(),
        fallback: true
      });
      localStorage.setItem('carflex_bookings', JSON.stringify(localBookings));
      return true;
    }
  } else {
    // Firestore not available - use localStorage
    const localBookings = JSON.parse(localStorage.getItem('carflex_bookings') || '[]');
    localBookings.push({
      ...bookingData,
      savedAt: new Date().toISOString(),
      offline: true
    });
    localStorage.setItem('carflex_bookings', JSON.stringify(localBookings));
    return true;
  }
}

// ---------- CONFIRM BOOKING ----------
async function confirmBooking() {
  const user = auth.currentUser;
  
  // Validate booking requirements
  if (!validateBooking()) {
    return;
  }
  
  // Show loading state
  const confirmBtn = elements.confirmBtn;
  const originalText = confirmBtn.innerHTML;
  confirmBtn.innerHTML = `<span class="loading-spinner"></span> ${langData[currentLang].processing}`;
  confirmBtn.disabled = true;
  
  // Set timeout to prevent infinite loading
  const timeoutId = setTimeout(() => {
    confirmBtn.innerHTML = originalText;
    confirmBtn.disabled = false;
    showNotification('Request timeout. Please try again.', 'error');
  }, 15000); // 15 second timeout
  
  try {
    // Build selected services list
    const selectedServicesList = [];
    let totalPrice = 0;
    
    if (selectedServices.general) {
      const price = getPriceForVehicle(selectedVehicle, 'general');
      selectedServicesList.push({
        name: langData[currentLang].cat1,
        key: 'general',
        price: price,
        items: getServicesForVehicle(selectedVehicle, 'general')
      });
      totalPrice += price;
    }
    
    if (selectedServices.master) {
      const price = getPriceForVehicle(selectedVehicle, 'master');
      selectedServicesList.push({
        name: langData[currentLang].cat2,
        key: 'master',
        price: price,
        items: getServicesForVehicle(selectedVehicle, 'master')
      });
      totalPrice += price;
    }
    
    if (selectedServices.wash) {
      const price = getPriceForVehicle(selectedVehicle, 'wash');
      selectedServicesList.push({
        name: langData[currentLang].cat3,
        key: 'wash',
        price: price,
        items: getServicesForVehicle(selectedVehicle, 'wash')
      });
      totalPrice += price;
    }
    
    // Create booking object
    const bookingId = generateBookingId();
    const bookingData = {
      bookingId: bookingId,
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName || user.email,
      vehicle: {
        type: selectedVehicle,
        description: elements.descBox?.value?.trim() || 'No description',
        icon: vehicleIcons[selectedVehicle] || 'fa-car'
      },
      services: selectedServicesList,
      totalPrice: totalPrice,
      schedule: {
        date: elements.serviceDate.value,
        time: elements.serviceTime?.value || '09:00',
        timeSlot: elements.serviceTime?.selectedOptions[0]?.text || '09:00 - 10:30'
      },
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      language: currentLang,
      testMode: TEST_MODE
    };
    
    // Save booking with fallback
    const saved = await saveBooking(bookingData);
    
    if (saved) {
      // Clear timeout - success!
      clearTimeout(timeoutId);
      
      // Show success notification
      showNotification(langData[currentLang].bookingConfirmed, 'success');
      
      // Reset selection state
      selectedServices = { general: false, master: false, wash: false };
      
      // Reset description
      if (elements.descBox) elements.descBox.value = '';
      
      // Reset date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      elements.serviceDate.value = tomorrow.toISOString().split('T')[0];
      
      // Update UI
      renderServiceCategories();
      showSelectedServicesSummary();
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('❌ Booking error:', error);
    showNotification(`${langData[currentLang].bookingFailed}: ${error.message}`, 'error');
  } finally {
    // Restore button
    confirmBtn.innerHTML = originalText;
    confirmBtn.disabled = false;
  }
}

// ---------- INITIALIZATION ----------
function init() {
  console.log('🚗 Car Flex initializing...');
  
  // Cache DOM elements
  cacheDOMElements();
  
  // Set default date
  if (elements.serviceDate) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    elements.serviceDate.value = tomorrow.toISOString().split('T')[0];
    elements.serviceDate.min = tomorrow.toISOString().split('T')[0];
  }
  
  // Setup event listeners if elements exist
  if (elements.langEn) {
    elements.langEn.addEventListener('click', () => updateLanguage('en'));
  }
  
  if (elements.langBn) {
    elements.langBn.addEventListener('click', () => updateLanguage('bn'));
  }
  
  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener('click', signOut);
  }
  
  if (elements.confirmBtn) {
    elements.confirmBtn.addEventListener('click', confirmBooking);
  }
  
  // Close notification on click
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('notification-close') || e.target.closest('.notification-close')) {
      const panel = document.getElementById('notificationPanel');
      if (panel) panel.style.display = 'none';
    }
  });
  
  // Initial render
  updateLanguage('en');
  
  // Auth state observer
  auth.onAuthStateChanged(user => {
    updateAuthUI(user);
    if (user) {
      console.log('👤 User logged in:', user.email);
    } else {
      console.log('👤 User logged out');
    }
  });
  
  console.log('✅ Car Flex initialized successfully');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}