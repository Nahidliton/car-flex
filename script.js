// ===== CAR FLEX - COMPLETE VEHICLE & PRICE SYSTEM =====

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
    footer: "🚗 কার ফ্লেক্স — প্রিমিয়াম গাড়ি যত্ন। © ২০২৫",
    vehicleTypes: ["বাইক", "কার", "মাইক্রোবাস", "কোস্টার", "ট্রাক", "বাস"],
    cat1: "জেনারেল সার্ভিসিং",
    cat2: "মাস্টার সার্ভিসিং",
    cat3: "ওয়াশ ভেহিকল",
    priceLabel: "মূল্য"
  }
};

// ---------- PRICE DATABASE (BDT) ----------
// Based on vehicle type and service category
const priceDatabase = {
  Bike: {
    general: 2000,
    master: 3500,
    wash: 300
  },
  Car: {
    general: 5000,
    master: 8500,
    wash: 500
  },
  Microbus: {
    general: 8000,
    master: 15000,
    wash: 1200
  },
  Coaster: {
    general: 8000,
    master: 15000,
    wash: 1200
  },
  Truck: {
    general: 10000,
    master: 20000,
    wash: 1500
  },
  Bus: {
    general: 8000,
    master: 15000,
    wash: 1200
  }
};

// ---------- SERVICE DATABASE (Vehicle Specific) ----------
// Completely different services for each vehicle type
const serviceDatabase = {
  // ----- BIKE SERVICES -----
  Bike: {
    general: [
      'Engine oil change (semi-synthetic)',
      'Air filter cleaning',
      'Spark plug inspection',
      'Chain cleaning & lubrication',
      'Brake pad adjustment',
      'Clutch cable tuning',
      'Tyre pressure check',
      'Battery terminal cleaning'
    ],
    master: [
      'Full engine diagnostics',
      'Engine oil & filter change',
      'Valve clearance adjustment',
      'Carburetor/Injector cleaning',
      'Brake pad replacement',
      'Chain & sprocket check',
      'Wheel alignment',
      'Coolant top-up'
    ],
    wash: [
      'Gentle foam wash',
      'Chain degreasing',
      'Alloy wheel cleaning',
      'Dashboard polish',
      'Silencer pipe cleaning',
      'Tyre shine'
    ]
  },
  
  // ----- CAR SERVICES -----
  Car: {
    general: [
      'Engine oil change (semi-synthetic)',
      'Oil filter replacement',
      'Air filter cleaning',
      'AC gas check',
      'Brake fluid top-up',
      'Wiper blade inspection',
      'Battery health check',
      'Tyre rotation'
    ],
    master: [
      'Full engine scan (ECU)',
      'Engine oil & filter (synthetic)',
      'Gear oil replacement',
      'Coolant flush & refill',
      'Brake pad/shoe inspection',
      'Spark plug replacement',
      'Fuel injector cleaning',
      'Wheel alignment & balancing'
    ],
    wash: [
      'Exterior foam wash',
      'Interior vacuum cleaning',
      'Dashboard polish',
      'Glass cleaning',
      'Underbody wash',
      'Tyre dressing',
      'Door jambs cleaning'
    ]
  },
  
  // ----- MICROBUS SERVICES -----
  Microbus: {
    general: [
      'Engine oil change (diesel)',
      'Oil & fuel filter check',
      'Air filter cleaning',
      'Brake system inspection',
      'Power steering fluid check',
      'AC vent cleaning',
      'Sliding door roller lube',
      'Battery water top-up'
    ],
    master: [
      'Full engine diagnostics',
      'Engine oil & all filters',
      'Gear oil replacement',
      'Differential oil check',
      'Brake shoe/pad replacement',
      'AC gas refill',
      'Propeller shaft lubrication',
      'Coolant replacement'
    ],
    wash: [
      'High-pressure foam wash',
      'Interior deep vacuum',
      'Roof rack cleaning',
      'Seat upholstery clean',
      'Window track cleaning',
      'Underbody rinse',
      'Tyre shine'
    ]
  },
  
  // ----- COASTER SERVICES -----
  Coaster: {
    general: [
      'Engine oil change (diesel)',
      'Fuel filter replacement',
      'Air filter cleaning',
      'Brake fluid check',
      'Power steering fluid top-up',
      'AC filter cleaning',
      'Battery terminals clean',
      'Light & horn test'
    ],
    master: [
      'Complete engine tuning',
      'Oil & all filters change',
      'Gearbox oil replacement',
      'Differential oil change',
      'Brake system overhaul',
      'AC performance check',
      'Radiator flush',
      'Suspension check'
    ],
    wash: [
      'Full body foam wash',
      'Interior shampoo',
      'Window cleaning',
      'Floor mat pressure wash',
      'Engine bay degrease',
      'Tyre polishing'
    ]
  },
  
  // ----- TRUCK SERVICES -----
  Truck: {
    general: [
      'Engine oil change (diesel)',
      'Fuel filter water drain',
      'Air filter cleaning',
      'Brake adjustment',
      'Clutch fluid check',
      'Leaf spring inspection',
      'Battery load test',
      'Tyre pressure check'
    ],
    master: [
      'Full engine diagnostics',
      'Engine oil & all filters',
      'Gearbox oil change',
      'Differential oil service',
      'Brake shoe replacement',
      'Clutch plate check',
      'DPF cleaning',
      'Coolant replacement'
    ],
    wash: [
      'High-pressure truck wash',
      'Trailer cleaning',
      'Underbody high jet',
      'Mud flap cleaning',
      'Cabin interior clean',
      'Wheel rim cleaning'
    ]
  },
  
  // ----- BUS SERVICES -----
  Bus: {
    general: [
      'Engine oil change',
      'Fuel filter cleaning',
      'Air filter service',
      'Brake system check',
      'Power steering fluid',
      'AC vent cleaning',
      'Passenger seat check',
      'Battery maintenance'
    ],
    master: [
      'Engine tuning & scan',
      'Oil & all filters replace',
      'Gearbox oil service',
      'Differential oil change',
      'Brake shoe replacement',
      'Air suspension check',
      'AC gas refill',
      'Coolant flush'
    ],
    wash: [
      'Full bus exterior wash',
      'Interior deep cleaning',
      'Seat upholstery wash',
      'Window cleaning',
      'Floor scrubbing',
      'Tyre dressing'
    ]
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
    'Microbus': 'মাইক্রোবাস',
    'Coaster': 'কোস্টার',
    'Truck': 'ট্রাক',
    'Bus': 'বাস'
  };
  return mapping[enVehicle] || enVehicle;
};

// ---------- GET VEHICLE SPECIFIC SERVICES ----------
function getServicesForVehicle(vehicleType, categoryKey) {
  // Default to Car if vehicle not found
  const vehicle = serviceDatabase[vehicleType] || serviceDatabase.Car;
  
  if (categoryKey === 'general') return vehicle.general || serviceDatabase.Car.general;
  if (categoryKey === 'master') return vehicle.master || serviceDatabase.Car.master;
  if (categoryKey === 'wash') return vehicle.wash || serviceDatabase.Car.wash;
  
  return [];
}

// ---------- GET PRICE FOR VEHICLE & SERVICE ----------
function getPriceForVehicle(vehicleType, categoryKey) {
  const vehiclePrices = priceDatabase[vehicleType] || priceDatabase.Car;
  
  if (categoryKey === 'general') return vehiclePrices.general;
  if (categoryKey === 'master') return vehiclePrices.master;
  if (categoryKey === 'wash') return vehiclePrices.wash;
  
  return 0;
}

// ---------- RENDER VEHICLES ----------
function renderVehicles() {
  const types = langData[currentLang].vehicleTypes;
  let html = '';
  
  types.forEach(v => {
    let icon = 'fa-car';
    if (v.includes('Bike') || v.includes('বাইক')) icon = 'fa-motorcycle';
    else if (v.includes('Car') || v.includes('কার')) icon = 'fa-car';
    else if (v.includes('Microbus') || v.includes('মাইক্রোবাস')) icon = 'fa-bus'; // Microbus gets bus icon
    else if (v.includes('Coaster') || v.includes('কোস্টার')) icon = 'fa-bus'; // Coaster also gets bus icon
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
      
      // Re-render services with new vehicle
      renderServiceCategories();
    });
  });
}

// ---------- RENDER SERVICE CATEGORIES WITH PRICES ----------
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
  
  const priceLabel = langData[currentLang].priceLabel;

  categories.forEach(cat => {
    // Get vehicle-specific services
    const points = getServicesForVehicle(selectedVehicle, cat.key);
    
    // Get price for this vehicle and service
    const price = getPriceForVehicle(selectedVehicle, cat.key);
    
    // Format price with commas
    const formattedPrice = price.toLocaleString('en-BD');
    
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
              <div class="price-tag">
                <span class="price-label">
                  <i class="fas fa-bangladeshi-taka-sign"></i> ${priceLabel}:
                </span>
                <span class="price-amount">
                  ৳${formattedPrice}
                  <small>BDT</small>
                </span>
              </div>
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

// ---------- EVENT LISTENERS ----------
function setupEventListeners() {
  // Language switchers
  elements.langEn.addEventListener('click', () => updateLanguage('en'));
  elements.langBn.addEventListener('click', () => updateLanguage('bn'));

  // Auth buttons
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

  // Auto-resize textarea
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
  
  // Set initial active state
  selectedVehicle = 'Car';
}

// Start the application
document.addEventListener('DOMContentLoaded', init);