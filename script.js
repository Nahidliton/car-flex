// ===== script.js – Main Logic for index.html =====

const firebaseConfig = {
  apiKey: "AIzaSyB9OEjBRYc9WeqJ5yUcA9BOP8Ju2PIMb-c",
  authDomain: "carflex-8dd99.firebaseapp.com",
  projectId: "carflex-8dd99",
  storageBucket: "carflex-8dd99.firebasestorage.app",
  messagingSenderId: "357221879980",
  appId: "1:357221879980:web:ab4d0240083e63f3530f09"
};

// 1. Initialize Firebase (Check if already initialized)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// 2. Define Auth and DB exactly ONCE
const auth = firebase.auth();
const db = firebase.firestore();

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
    priceLabel: "Price"
  },
  bn: {
    brand: "কার ফ্লেক্স",
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
    cat3: "ওয়াশ ভেহিকল",
    priceLabel: "মূল্য"
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

// ---------- DOM ELEMENTS - Wait for DOM to be ready ----------
function getDOMElements() {
  return {
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
    confirmBtn: document.getElementById('confirmBookingBtn')
  };
}

// ---------- HELPERS ----------
const mapToEnglish = (v) => {
  const m = { 'বাইক': 'Bike', 'কার': 'Car', 'মাইক্রোবাস': 'Microbus', 'কোস্টার': 'Coaster', 'ট্রাক': 'Truck', 'বাস': 'Bus' };
  return m[v] || v;
};

const mapToBangla = (v) => {
  const m = { 'Bike': 'বাইক', 'Car': 'কার', 'Microbus': 'মাইক্রোবাস', 'Coaster': 'কোস্টার', 'Truck': 'ট্রাক', 'Bus': 'বাস' };
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

// ---------- RENDER LOGIC ----------
function renderVehicles() {
  const elements = getDOMElements();
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
    });
  });
}

function renderServiceCategories() {
  const elements = getDOMElements();
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
    
    html += `<div class="service-cat">
      <h3>
        <i class="fas ${cat.icon}"></i> 
        ${cat.name}
        <span class="vehicle-type-badge">
          <i class="fas ${vehicleIcons[selectedVehicle] || 'fa-car'}"></i>
          ${currentLang === 'en' ? selectedVehicle : mapToBangla(selectedVehicle)}
        </span>
      </h3>
      <ul class="service-list">${list || '<li>No services listed</li>'}</ul>
      <div class="price-tag">
        <span class="price-label"><i class="fas fa-tag"></i> ${langData[currentLang].priceLabel}:</span>
        <span class="price-amount">৳${price.toLocaleString('en-BD')} <small>BDT</small></span>
      </div>
    </div>`;
  });
  
  elements.serviceContainer.innerHTML = html;
}

// ---------- UI UPDATES ----------
function updateLanguage(lang) {
  currentLang = lang;
  const elements = getDOMElements();
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
  
  if (elements.langEn) elements.langEn.classList.toggle('active', lang === 'en');
  if (elements.langBn) elements.langBn.classList.toggle('active', lang === 'bn');
  
  renderVehicles();
  renderServiceCategories();
}

function updateAuthUI(user) {
  const elements = getDOMElements();
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
  auth.signInWithPopup(provider).catch(e => {
    console.error(e);
    alert('Sign in failed: ' + e.message);
  });
}

function signOut() {
  auth.signOut();
}

// ---------- BOOKING ----------
async function confirmBooking() {
  const user = auth.currentUser;
  const elements = getDOMElements();
  
  if (!user) {
    signInWithGoogle();
    return;
  }
  
  const date = elements.serviceDate?.value;
  if (!date) {
    alert(currentLang === 'en' ? 'Please select a date' : 'তারিখ নির্বাচন করুন');
    return;
  }

  const booking = {
    userId: user.uid,
    email: user.email,
    vehicle: selectedVehicle,
    desc: elements.descBox?.value || '',
    date: date,
    time: elements.serviceTime?.value || '09:00',
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  try {
    await db.collection('bookings').add(booking);
    alert('✅ Booking Confirmed!');
  } catch (e) {
    console.error(e);
    alert('Booking Failed: ' + e.message);
  }
}

// ---------- INIT ----------
function init() {
  console.log('Car Flex initialized');
  
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
}

function setup() {
  const elements = getDOMElements();
  
  // Set default date
  if (elements.serviceDate) {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    elements.serviceDate.value = today.toISOString().split('T')[0];
  }
  
  // Language switchers
  if (elements.langEn) {
    elements.langEn.addEventListener('click', () => updateLanguage('en'));
  }
  if (elements.langBn) {
    elements.langBn.addEventListener('click', () => updateLanguage('bn'));
  }
  
  // Logout button
  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener('click', signOut);
  }
  
  // Confirm booking button
  if (elements.confirmBtn) {
    elements.confirmBtn.addEventListener('click', confirmBooking);
  }
  
  // Initial render
  updateLanguage('en');
  
  // Auth state observer
  auth.onAuthStateChanged(user => {
    updateAuthUI(user);
  });
}

// Start the app
init();