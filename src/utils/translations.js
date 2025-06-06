/**
 * Croatian language translations
 * All application text content should be referenced from here to enable easy localization
 */
export const translations = {
  // Auth screens
  login: 'Prijava',
  loginSubtitle: 'Dobrodošli u Partner aplikaciju',
  register: 'Registracija',
  registerSubtitle: 'Kreirajte račun za vaše poslovanje',
  forgotPassword: 'Zaboravljena lozinka',
  forgotPasswordInstructions: 'Unesite e-mail adresu povezanu s vašim računom i poslat ćemo vam poveznicu za resetiranje lozinke',
  email: 'E-mail',
  emailPlaceholder: 'Unesite e-mail adresu',
  password: 'Lozinka',
  passwordPlaceholder: 'Unesite lozinku',
  confirmPassword: 'Potvrdi lozinku',
  confirmPasswordPlaceholder: 'Ponovno unesite lozinku',
  name: 'Ime i prezime',
  namePlaceholder: 'Unesite ime i prezime',
  loggingIn: 'Prijava u tijeku...',
  registering: 'Registracija u tijeku...',
  sending: 'Slanje...',
  sendResetLink: 'Pošalji poveznicu za resetiranje',
  backToLogin: 'Natrag na prijavu',
  noAccount: 'Nemate račun?',
  alreadyHaveAccount: 'Već imate račun?',
  createAccount: 'Kreirajte račun',
  verifyEmail: 'Molimo provjerite vaš e-mail za potvrdu računa.',
  resetPasswordEmailSent: 'E-mail poslan',
  checkEmailForReset: 'Provjerite vaš e-mail za upute o resetiranju lozinke.',
  emailRequired: 'E-mail adresa je obavezna',
  invalidEmail: 'Unesite valjanu e-mail adresu',
  passwordRequirements: 'Lozinka mora sadržavati najmanje 6 znakova',
  passwordsDoNotMatch: 'Lozinke se ne podudaraju',
  allFieldsRequired: 'Sva polja su obavezna',
  loginFailed: 'Prijava nije uspjela. Provjerite e-mail i lozinku.',
  registrationFailed: 'Registracija nije uspjela. Pokušajte ponovno.',
  registrationSuccessful: 'Registracija uspješna',
  resetPasswordFailed: 'Slanje linka za resetiranje nije uspjelo. Pokušajte ponovno.',
  currentPasswordIncorrect: 'Trenutna lozinka nije ispravna',
  passwordChangeSuccess: 'Lozinka je uspješno promijenjena',
  passwordTooShort: 'Lozinka mora sadržavati najmanje 6 znakova',

  // Navigation
  home: 'Početna',
  reservations: 'Rezervacije',
  profile: 'Profil',
  settings: 'Postavke',
  dashboard: 'Nadzorna ploča',
  businessType: 'Vrsta poslovanja',

  // Business types
  restaurant: 'Restoran',
  cafebar: 'Kafić/Bar',
  accommodation: 'Smještaj',
  fitness: 'Fitness',
  beauty: 'Beauty',
  adventure: 'Avantura',
  
  // Business type descriptions
  restaurantDescription: 'Restorani, bistro, menze i drugi objekti za uslugu hrane',
  cafebarDescription: 'Kafići, barovi, pubovi i ostali objekti za piće',
  accommodationDescription: 'Hoteli, apartmani, sobe i ostali smještajni objekti',
  fitnessDescription: 'Teretane, fitness centri i drugi sportski objekti',
  beautyDescription: 'Saloni ljepote, frizerski saloni, spa centri',
  adventureDescription: 'Izleti, ture i aktivnosti na otvorenom',

  // Business Selection Screen
  selectBusinessType: 'Odaberite vrstu poslovanja',
  welcomeMessage: 'Dobrodošli u Partner App',
  businessTypeInstructions: 'Odaberite vrstu poslovanja za koje želite kreirati profil',
  
  // Profile Creation Pages
  createRestaurantProfile: 'Kreirajte profil restorana',
  createCafebarProfile: 'Kreirajte profil kafića/bara',
  createAccommodationProfile: 'Kreirajte profil smještaja',
  createFitnessProfile: 'Kreirajte profil fitness centra',
  createBeautyProfile: 'Kreirajte profil beauty salona',
  createAdventureProfile: 'Kreirajte profil avanture',
  
  // Profile Screen Titles
  restaurantProfile: 'Profil restorana',
  cafebarProfile: 'Profil kafića/bara',
  accommodationProfile: 'Profil smještaja',
  fitnessProfile: 'Profil fitness centra',
  beautyProfile: 'Profil beauty salona',
  adventureProfile: 'Profil avanture',
  
  // Profile descriptions
  restaurantProfileDescription: 'Unesite detalje vašeg restorana',
  cafebarProfileDescription: 'Unesite detalje vašeg kafića ili bara',
  accommodationProfileDescription: 'Unesite detalje vašeg smještajnog objekta',
  fitnessProfileDescription: 'Unesite detalje vašeg fitness centra',
  beautyProfileDescription: 'Unesite detalje vašeg beauty salona',
  adventureProfileDescription: 'Unesite detalje ponude avanturističkih aktivnosti',
  
  // Dashboard Titles
  restaurantDashboard: 'Nadzorna ploča restorana',
  cafebarDashboard: 'Nadzorna ploča kafića/bara',
  accommodationDashboard: 'Nadzorna ploča smještaja',
  fitnessDashboard: 'Nadzorna ploča fitness centra',
  beautyDashboard: 'Nadzorna ploča beauty salona',
  adventureDashboard: 'Nadzorna ploča avanture',
  
  // Form Field Labels
  basicInformation: 'Osnovne informacije',
  businessName: 'Naziv poslovanja',
  description: 'Opis',
  phoneNumber: 'Telefonski broj',
  website: 'Web stranica',
  locationInformation: 'Informacije o lokaciji',
  address: 'Adresa',
  mapLocation: 'Lokacija na karti',
  
  // Form Field Placeholders
  businessNamePlaceholder: 'Unesite naziv vašeg poslovanja',
  restaurantDescriptionPlaceholder: 'Opišite vaš restoran, specijalitete...',
  cafebarDescriptionPlaceholder: 'Opišite vaš kafić/bar, atmosferu...',
  accommodationDescriptionPlaceholder: 'Opišite vaš smještaj, pogodnosti...',
  fitnessDescriptionPlaceholder: 'Opišite vaš fitness centar, opremu...',
  beautyDescriptionPlaceholder: 'Opišite vaš beauty salon, usluge...',
  adventureDescriptionPlaceholder: 'Opišite aktivnosti koje nudite...',
  phoneNumberPlaceholder: 'npr. +385 91 234 5678',
  websitePlaceholder: 'npr. www.vaseime.hr',
  addressPlaceholder: 'Puna adresa vašeg poslovanja',
  accommodationNamePlaceholder: 'Unesite naziv vašeg smještaja',
  fitnessNamePlaceholder: 'Unesite naziv vašeg fitness centra',
  beautyNamePlaceholder: 'Unesite naziv vašeg beauty salona',
  adventureNamePlaceholder: 'Unesite naziv vaše ponude avantura',

  // Restaurant specific fields
  restaurantDetails: 'Detalji restorana',
  restaurantSpecifics: 'Specifičnosti restorana',
  cuisineType: 'Vrsta kuhinje',
  cuisineTypePlaceholder: 'npr. talijanska, mediteranska, vegetarijanska...',
  priceRange: 'Cjenovni raspon',
  priceRangePlaceholder: 'npr. €€ ili 80-150 kn po osobi',
  capacity: 'Kapacitet',
  capacityPlaceholder: 'Broj gostiju koje možete primiti',
  openingHours: 'Radno vrijeme',
  openingHoursPlaceholder: 'npr. Pon-Pet: 08:00-22:00, Sub-Ned: 10:00-23:00',

  // Cafebar specific fields
  cafebarDetails: 'Detalji kafića/bara',
  cafebarSpecifics: 'Specifičnosti kafića/bara',
  specialties: 'Specijaliteti',
  specialtiesPlaceholder: 'npr. craft piva, kokteli, kava...',
  atmosphere: 'Atmosfera',
  atmospherePlaceholder: 'npr. casual, lounge, pub, jazz...',

  // Accommodation specific fields
  accommodationDetails: 'Detalji smještaja',
  accommodationSpecifics: 'Specifičnosti smještaja',
  accommodationType: 'Vrsta smještaja',
  accommodationTypePlaceholder: 'npr. hotel, apartman, soba, vila...',
  amenities: 'Sadržaji',
  amenitiesPlaceholder: 'npr. WiFi, parking, bazen, klima...',
  numberOfRooms: 'Broj soba/jedinica',
  numberOfRoomsPlaceholder: 'Ukupan broj smještajnih jedinica',
  checkInOut: 'Check-in/out vrijeme',
  checkInOutPlaceholder: 'npr. Check-in: 14:00, Check-out: 11:00',

  // Fitness specific fields
  fitnessDetails: 'Detalji fitness centra',
  fitnessSpecifics: 'Specifičnosti fitness centra',
  fitnessType: 'Vrsta fitnessa',
  fitnessTypePlaceholder: 'npr. teretana, yoga studio, CrossFit...',
  facilities: 'Sadržaji',
  facilitiesPlaceholder: 'npr. kardio, slobodni utezi, grupni treninzi...',
  classesOffered: 'Ponuđeni treninzi',
  classesOfferedPlaceholder: 'npr. yoga, pilates, zumba, spinning...',
  trainers: 'Treneri',
  trainersPlaceholder: 'Broj trenera ili njihova specijalizacija',

  // Beauty specific fields
  beautyDetails: 'Detalji beauty salona',
  beautySpecifics: 'Specifičnosti beauty salona',
  beautyType: 'Vrsta beauty salona',
  beautyTypePlaceholder: 'npr. frizerski salon, kozmetički salon, spa...',
  servicesOffered: 'Ponuđene usluge',
  servicesOfferedPlaceholder: 'npr. šišanje, manikura, masaža, tretmani lica...',
  specialists: 'Specijalisti',
  specialistsPlaceholder: 'Broj specijalista ili njihova specijalizacija',
  products: 'Proizvodi',
  productsPlaceholder: 'Brendovi proizvoda koje koristite',

  // Adventure specific fields
  adventureDetails: 'Detalji avanture',
  adventureSpecifics: 'Specifičnosti avanture',
  adventureType: 'Vrsta avanture',
  adventureTypePlaceholder: 'npr. planinarenje, bicikliranje, kajak...',
  activities: 'Aktivnosti',
  activitiesPlaceholder: 'npr. vođene ture, najam opreme, izleti...',
  equipmentProvided: 'Osigurana oprema',
  equipmentProvidedPlaceholder: 'npr. bicikli, kajaci, sigurnosna oprema...',
  difficulty: 'Težina',
  difficultyPlaceholder: 'npr. lagano, srednje, zahtjevno...',
  seasonality: 'Sezonalnost',
  seasonalityPlaceholder: 'npr. cjelogodišnje, travanj-listopad...',

  // Form Actions
  saving: 'Spremanje...',
  saveProfile: 'Spremi profil',
  requiredFieldsMessage: 'Molimo popunite sva obavezna polja označena *',
  selectLocationOnMap: 'Odaberite lokaciju na karti',
  success: 'Uspjeh',
  profileCreatedSuccess: 'Profil je uspješno kreiran!',
  profileCreationFailed: 'Kreiranje profila nije uspjelo. Pokušajte ponovno.',
  
  // Dashboard Stats
  todayReservations: 'Današnje rezervacije',
  pendingReservations: 'Rezervacije na čekanju',
  totalReservations: 'Ukupno rezervacija',
  averageRating: 'Prosječna ocjena',
  upcomingCheckIns: 'Nadolazeći check-in',
  currentGuests: 'Trenutni gosti',
  occupancyRate: 'Popunjenost',
  todayClasses: 'Današnji treninzi',
  weeklyClasses: 'Tjedni treninzi',
  monthlyClients: 'Mjesečni klijenti',
  todayAppointments: 'Današnji termini',
  pendingAppointments: 'Termini na čekanju',
  weeklyAppointments: 'Tjedni termini',
  upcomingActivities: 'Nadolazeće aktivnosti',
  confirmedBookings: 'Potvrđene rezervacije',
  totalBookings: 'Ukupno rezervacija',
  averageGroupSize: 'Prosječna veličina grupe',
  
  // Reservation List
  reservationsFor: 'Rezervacije za',
  staysFor: 'Boravci za',
  classesFor: 'Treninzi za',
  appointmentsFor: 'Termini za',
  activitiesFor: 'Aktivnosti za',
  noReservationsForDate: 'Nema rezervacija za odabrani datum',
  noClassesForDate: 'Nema treninga za odabrani datum',
  noAppointmentsForDate: 'Nema termina za odabrani datum',
  noActivitiesForDate: 'Nema aktivnosti za odabrani datum',
  
  // Reservation Status
  pending: 'Na čekanju',
  confirmed: 'Potvrđeno',
  completed: 'Završeno',
  canceled: 'Otkazano',
  
  // Reservation Actions
  confirm: 'Potvrdi',
  cancel: 'Otkaži',
  markAsCompleted: 'Označi kao završeno',
  reservationStatusUpdated: 'Status rezervacije je ažuriran',
  reservationUpdateFailed: 'Ažuriranje statusa rezervacije nije uspjelo',
  
  // Reservation Details
  people: 'osoba',
  guests: 'gostiju',
  notes: 'Napomene',
  checkIn: 'Check-in',
  checkOut: 'Check-out',
  
  // Reservations Screen
  upcoming: 'Nadolazeće',
  past: 'Prošle',
  canceled: 'Otkazane',
  noUpcomingReservations: 'Nemate nadolazećih rezervacija',
  noPastReservations: 'Nemate prošlih rezervacija',
  noCanceledReservations: 'Nemate otkazanih rezervacija',
  
  // Profile Screen
  noBusinessProfile: 'Još niste postavili profil poslovanja',
  createBusinessProfile: 'Kreiraj profil poslovanja',
  editBusinessProfile: 'Uredi profil poslovanja',
  switchBusinessType: 'Promijeni vrstu poslovanja',
  switchBusinessTypeConfirm: 'Jeste li sigurni da želite promijeniti vrstu poslovanja? Morat ćete ponovno postaviti profil.',
  logout: 'Odjava',
  logoutConfirm: 'Jeste li sigurni da se želite odjaviti?',
  confirm: 'Potvrdi',
  error: 'Greška',
  
  // Settings Screen
  appearance: 'Izgled',
  darkMode: 'Tamni način rada',
  notifications: 'Obavijesti',
  pushNotifications: 'Push obavijesti',
  emailNotifications: 'E-mail obavijesti',
  security: 'Sigurnost',
  changePassword: 'Promijeni lozinku',
  account: 'Račun',
  deleteAccount: 'Izbriši račun',
  deleteAccountConfirmation: 'Jeste li sigurni da želite izbrisati svoj račun? Ova radnja je nepovratna.',
  finalWarning: 'Konačno upozorenje',
  deleteAccountFinalWarning: 'Ovo će trajno izbrisati vaš račun i sve povezane podatke. Jeste li apsolutno sigurni?',
  delete: 'Izbriši',
  currentPassword: 'Trenutna lozinka',
  newPassword: 'Nova lozinka',
  enterCurrentPassword: 'Unesite trenutnu lozinku',
  enterNewPassword: 'Unesite novu lozinku',
  confirmNewPassword: 'Potvrdite novu lozinku',
  updatePassword: 'Ažuriraj lozinku',
  
  // Mapbox
  locationPermission: 'Dozvola za lokaciju',
  locationPermissionDenied: 'Dozvola za pristup lokaciji nije odobrena',
  unableToGetLocation: 'Nije moguće dohvatiti trenutnu lokaciju',
  
  // Web App Notice
  webAppTitle: 'Za najbolje iskustvo',
  webAppMessage: 'Molimo preuzmite našu mobilnu aplikaciju za pristup svim funkcionalnostima. Ova aplikacija je optimizirana za mobilne uređaje.',
  scanQrCode: 'Skenirajte QR kod sa svojim telefonom',
  webAppFooter: 'Puna funkcionalnost dostupna je samo u našoj mobilnoj aplikaciji.',
  
  // Map on Web
  mapOnlyOnMobile: 'Karta je dostupna samo u mobilnoj aplikaciji.',
  enterCoordinatesManually: 'Možete unijeti koordinate ručno:',
  mapNotAvailable: 'Karta nije dostupna.'
};
