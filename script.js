// ===== CAR FLEX - MODERN JAVASCRIPT =====
// Complete interactive functionality with Bangla/English language support

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
    footer: "🚗 Car Flex — premium vehicle care. © 2025",
    vehicleTypes: ["Bike", "Car", "Sedan", "Microbus", "Coaster", "Truck", "Bus"],
    cat1: "General Servicing",
    cat2: "Master Servicing",
    cat3: "Wash Vehicle"
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
    footer: "🚗 কার ফ্লেক্স — প্রিমিয়াম গাড়ি যত্ন। © ২০২৫",
    vehicleTypes: ["বাইক", "কার", "সেডান", "মাইক্রোবাস", "কোস্টার", "ট্রাক", "বাস"],
    cat1: "জেনারেল সার্ভিসিং",
    cat2: "মাস্টার সার্ভিসিং",
    cat3: "ওয়াশ ভেহিকল"
  }
};

// ---------- SERVICE DATABASE ----------
const serviceDatabase = {
  general: {
    base: [
      'Engine oil check & top-up',
      'Air filter cleaning',
      'Brake pad inspection',
      'Tyre pressure & conditioning',
      'Battery health report',
      'Lights & horn test',
      'Fluid levels check'
    ],
    bike: ['Chain lubrication & tensioning', 'Clutch cable adjustment'],
    car: ['Cabin air filter check', 'Wiper blade inspection'],
    sedan: ['Suspension check', 'Wheel alignment'],
    microbus: ['Sliding door roller clean', 'AC vent cleaning'],
    coaster: ['Diesel filter check', 'Seat mechanism lube'],
    truck: ['Air brake inspection', 'Leaf spring check'],
    bus: ['Air brake system', 'Passenger seat check']
  },
  master: {
    base: [
      'Full engine diagnostics',
      'Gear oil & coolant replacement',
      'AC performance check & gas refill',
      'Brake shoe/pad replacement',
      'Suspension & steering check',
      'Wheel alignment & balancing',
      'Spark plug / injector cleaning',
      'Timing belt inspection'
    ],
    bike: ['Valve clearance adjustment', 'Carburetor tuning'],
    car: ['ECU error scan', 'Transmission fluid check'],
    sedan: ['ABS brake test', 'Power steering flush'],
    microbus: ['Differential oil change', 'Propeller shaft check'],
    coaster: ['Turbocharger inspection', 'Radiator flush'],
    truck: ['DPF cleaning', 'Clutch plate check'],
    bus: ['Air suspension check', 'Hydraulic brake test']
  },
  wash: {
    base: [
      'Exterior foam wash & wax',
      'Interior vacuum & shampoo',
      'Dashboard polish',
      'Glass & mirror cleaning',
      'Underbody rinse',
      'Tyre shine & rim cleaning',
      'Door jambs cleaning',
      'Engine bay degrease'
    ],
    bike: ['Gentle chain degrease', 'Spoke cleaning'],
    car: ['Paint protection coating', 'Leather seat conditioning'],
    sedan: ['Sunroof track clean', 'Carpet deep clean'],
    microbus: ['Roof rack cleaning', 'Cargo area vacuum'],
    coaster: ['High-pressure exterior', 'Window track clean'],
    truck: ['Trailer wash', 'Mud flap cleaning'],
    bus: ['Full exterior brush wash', 'Seat upholstery clean']
  }
};

// ---------- STATE MANAGEMENT ----------
let currentLang = 'en';
let selectedVehicle = 'Car';

// ---------- DOM ELEMENTS ----------
const elements = {
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
  footerText: document.getElementById('footerText'),
  langEn: document.getElementById('langEn'),
  langBn: document.getElementById('langBn'),
  vehicleGrid: document.getElementById('vehicleGrid'),
  serviceContainer: document.getElementById('serviceCatContainer'),
  serviceDate: document.getElementById('serviceDate'),
  serviceTime: document.getElementById('serviceTime')
};

// ---------- UTILITY FUNCTIONS ----------
const mapToEnglish = (bnVehicle) => {
  const mapping = {
    'বাইক': 'Bike',
    'কার': 'Car',
    'সেডান': 'Sedan',
    'মাইক্রোবাস': 'Microbus',
    'কোস্টার': 'Coaster',
    'ট্রাক': 'Truck',
    'বাস': 'Bus'
  };
  return mapping[bnVehicle] || bnVehicle;
};

const mapToBangla = (enVehicle) => {
  const mapping = {
    'Bike': 'বাইক',
    'Car': 'কার',
    'Sedan': 'সেডান',
    'Microbus': 'মাইক্রোবাস',
    'Coaster': 'কোস্টার',
    'Truck': 'ট্রাক',
    'Bus': 'বাস'
  };
  return mapping[enVehicle] || enVehicle;
};

// ---------- SERVICE GENERATOR ----------
function getServicesForCategory(categoryKey, vehicleType, lang = 'en') {
  const category = serviceDatabase[categoryKey];
  let services = [...category.base];
  
  // Add vehicle-specific services
  const vehicleLower = vehicleType.toLowerCase();
  const vehicleKey = Object.keys(category).find(key => 
    vehicleLower.includes(key) || 
    (key === 'bike' && vehicleLower.includes('bike')) ||
    (key === 'car' && (vehicleLower.includes('car') || vehicleLower.includes('sedan'))) ||
    (key === 'sedan' && vehicleLower.includes('sedan')) ||
    (key === 'microbus' && vehicleLower.includes('microbus')) ||
    (key === 'coaster' && vehicleLower.includes('coaster')) ||
    (key === 'truck' && vehicleLower.includes('truck')) ||
    (key === 'bus' && vehicleLower.includes('bus'))
  );
  
  if (vehicleKey && category[vehicleKey]) {
    services = [...services.slice(0, 6), ...category[vehicleKey], ...services.slice(6, 8)];
  }
  
  return services.slice(0, 8); // Show max 8 services
}

// ---------- RENDER VEHICLES ----------
function renderVehicles() {
  const types = langData[currentLang].vehicleTypes;
  let html = '';
  
  types.forEach(v => {
    let icon = 'fa-car';
    if (v.includes('Bike') || v.includes('বাইক')) icon = 'fa-motorcycle';
    else if (v.includes('Car') || v.includes('কার')) icon = 'fa-car';
    else if (v.includes('Sedan') || v.includes('সেডান')) icon = 'fa-car-side';
    else if (v.includes('Microbus') || v.includes('মাইক্রোবাস')) icon = 'fa-bus';
    else if (v.includes('Coaster') || v.includes('কোস্টার')) icon = 'fa-truck';
    else if (v.includes('Truck') || v.includes('ট্রাক')) icon = 'fa-truck';
    else if (v.includes('Bus') || v.includes('বাস')) icon = 'fa-bus';
    
    const isActive = currentLang === 'en' 
      ? selectedVehicle === v
      : selectedVehicle === mapToEnglish(v);
    
    html += `<div class="vehicle-card ${isActive ? 'active' : ''}" data-vehicle="${v}">
                <i class="fas ${icon}"></i>
                <span>${v}</span>
              </div>`;
  });
  
  elements.vehicleGrid.innerHTML = html;
  attachVehicleListeners();
}

// ---------- ATTACH VEHICLE LISTENERS ----------
function attachVehicleListeners() {
  document.querySelectorAll('.vehicle-card').forEach(card => {
    card.addEventListener('click', function() {
      const vehRaw = this.dataset.vehicle;
      
      // Update selected vehicle
      if (currentLang === 'en') {
        selectedVehicle = vehRaw;
      } else {
        selectedVehicle = mapToEnglish(vehRaw);
      }
      
      // Update active state
      document.querySelectorAll('.vehicle-card').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      
      // Animate click
      this.style.transform = 'scale(0.95)';
      setTimeout(() => this.style.transform = '', 150);
      
      // Re-render services
      renderServiceCategories();
    });
  });
}

// ---------- RENDER SERVICE CATEGORIES ----------
function renderServiceCategories() {
  const categories = [
    { key: 'general', name: langData[currentLang].cat1, icon: 'fa-tools' },
    { key: 'master', name: langData[currentLang].cat2, icon: 'fa-cogs' },
    { key: 'wash', name: langData[currentLang].cat3, icon: 'fa-water' }
  ];

  let html = '';
  const vehicleDisplay = currentLang === 'en' 
    ? selectedVehicle 
    : mapToBangla(selectedVehicle);

  categories.forEach(cat => {
    const points = getServicesForCategory(cat.key, selectedVehicle, currentLang);
    const listItems = points.map(p => 
      `<li><i class="fas fa-check-circle"></i> ${p}</li>`
    ).join('');

    html += `<div class="service-cat">
              <h3>
                <i class="fas ${cat.icon}"></i> 
                ${cat.name}
                <span class="vehicle-type-badge">
                  <i class="fas fa-tag"></i> ${vehicleDisplay}
                </span>
              </h3>
              <ul class="service-list">${listItems}</ul>
            </div>`;
  });

  elements.serviceContainer.innerHTML = html;
}

// ---------- UPDATE LANGUAGE UI ----------
function updateLanguage(lang) {
  currentLang = lang;
  const d = langData[lang];

  // Update all text content
  elements.brandName.innerText = d.brand;
  elements.viewerMsg.innerText = d.viewerMsg;
  elements.vehicleSecTitle.innerText = d.vehicleSec;
  elements.vehicleBadge.innerText = d.vehicleBadge;
  elements.descBox.placeholder = d.descPlaceholder;
  elements.serviceSecTitle.innerText = d.serviceSec;
  elements.serviceBadge.innerText = d.serviceBadge;
  elements.dateLabel.innerHTML = `<i class="far fa-calendar-alt"></i> ${d.dateLabel}`;
  elements.timeLabel.innerHTML = `<i class="far fa-clock"></i> ${d.timeLabel}`;
  elements.authMsg.innerText = d.authMsg;
  elements.loginTxt.innerText = d.loginTxt;
  elements.signupTxt.innerText = d.signupTxt;
  elements.footerText.innerText = d.footer;

  // Update active button state
  elements.langEn.classList.toggle('active', lang === 'en');
  elements.langBn.classList.toggle('active', lang === 'bn');

  // Re-render dynamic content
  renderVehicles();
  renderServiceCategories();
}

// ---------- SET DEFAULT DATE ----------
function setDefaultDate() {
  const today = new Date();
  today.setDate(today.getDate() + 2);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  
  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;
  
  elements.serviceDate.value = `${yyyy}-${mm}-${dd}`;
}

// ---------- ANIMATION ON SCROLL ----------
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-cat, .vehicle-card, .booking-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ---------- EVENT LISTENERS ----------
function setupEventListeners() {
  // Language switchers
  elements.langEn.addEventListener('click', () => updateLanguage('en'));
  elements.langBn.addEventListener('click', () => updateLanguage('bn'));

  // Auth buttons - interactive demo
  document.getElementById('loginBtn').addEventListener('click', () => {
    alert(currentLang === 'en' 
      ? '🔐 Login demo — Redirecting to secure login page.' 
      : '🔐 লগইন ডেমো — নিরাপদ লগইন পৃষ্ঠায় যাচ্ছে।');
  });

  document.getElementById('signupBtn').addEventListener('click', () => {
    alert(currentLang === 'en' 
      ? '✨ Sign up demo — Create your Car Flex account.' 
      : '✨ সাইন আপ ডেমো — আপনার কার ফ্লেক্স অ্যাকাউন্ট খুলুন।');
  });

  // Description box - character counter
  elements.descBox.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });
}

// ---------- INITIALIZE APP ----------
function init() {
  setDefaultDate();
  renderVehicles();
  renderServiceCategories();
  setupEventListeners();
  setupScrollAnimations();
  
  // Set initial active state
  selectedVehicle = 'Car';
  
  // Small delay for animation
  setTimeout(() => {
    document.querySelectorAll('.vehicle-card, .service-cat').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 100);
}

// Start the application
document.addEventListener('DOMContentLoaded', init);

// ---------- EXPORT FOR MODULE USE (if needed) ----------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { updateLanguage, selectedVehicle, currentLang };
}