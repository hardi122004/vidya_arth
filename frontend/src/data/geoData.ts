// Country -> States/Provinces -> Major Cities. Covers every country in
// COUNTRY_OPTIONS with real top-level administrative divisions. "Other" has
// no enumerable state list, so the UI falls back to free-text entry for it.

export const STATES_BY_COUNTRY: Record<string, string[]> = {
  India: [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh",
    "Lakshadweep", "Puducherry",
  ],
  "United States": [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming",
  ],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  Canada: [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
    "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
    "Northwest Territories", "Nunavut", "Yukon",
  ],
  Australia: [
    "New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia",
    "Tasmania", "Australian Capital Territory", "Northern Territory",
  ],
  Germany: [
    "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse",
    "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate",
    "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia",
  ],
  France: [
    "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany", "Centre-Val de Loire",
    "Corsica", "Grand Est", "Hauts-de-France", "Île-de-France", "Normandy",
    "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur",
  ],
  Singapore: ["Central Region", "East Region", "North Region", "North-East Region", "West Region"],
  "United Arab Emirates": [
    "Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah",
  ],
  Japan: [
    "Hokkaido", "Aomori", "Iwate", "Miyagi", "Akita", "Yamagata", "Fukushima", "Ibaraki",
    "Tochigi", "Gunma", "Saitama", "Chiba", "Tokyo", "Kanagawa", "Niigata", "Toyama",
    "Ishikawa", "Fukui", "Yamanashi", "Nagano", "Gifu", "Shizuoka", "Aichi", "Mie", "Shiga",
    "Kyoto", "Osaka", "Hyogo", "Nara", "Wakayama", "Tottori", "Shimane", "Okayama",
    "Hiroshima", "Yamaguchi", "Tokushima", "Kagawa", "Ehime", "Kochi", "Fukuoka", "Saga",
    "Nagasaki", "Kumamoto", "Oita", "Miyazaki", "Kagoshima", "Okinawa",
  ],
  "South Korea": [
    "Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Ulsan", "Sejong", "Gyeonggi",
    "Gangwon", "North Chungcheong", "South Chungcheong", "North Jeolla", "South Jeolla",
    "North Gyeongsang", "South Gyeongsang", "Jeju",
  ],
  Brazil: [
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
    "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais",
    "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte",
    "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe",
    "Tocantins",
  ],
  "South Africa": [
    "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga",
    "North West", "Northern Cape", "Western Cape",
  ],
};

function key(country: string, state: string) {
  return `${country}::${state}`;
}

const RAW_CITIES: Record<string, string[]> = {
  // India
  "India::Andhra Pradesh": [
    "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati",
    "Kadapa", "Kakinada", "Anantapur", "Vizianagaram", "Eluru", "Ongole", "Nandyal",
    "Machilipatnam", "Adoni", "Tenali", "Proddatur", "Chittoor", "Hindupur",
  ],
  "India::Arunachal Pradesh": [
    "Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Bomdila", "Tezu", "Along",
    "Changlang", "Khonsa",
  ],
  "India::Assam": [
    "Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon",
    "Karimganj", "Sivasagar", "Goalpara", "Barpeta", "Dhubri", "North Lakhimpur", "Diphu",
  ],
  "India::Bihar": [
    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia", "Arrah", "Begusarai",
    "Katihar", "Munger", "Chhapra", "Bihar Sharif", "Sasaram", "Hajipur", "Siwan", "Motihari",
    "Bettiah", "Saharsa", "Samastipur", "Dehri",
  ],
  "India::Chhattisgarh": [
    "Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Jagdalpur", "Raigarh",
    "Ambikapur", "Dhamtari", "Mahasamund", "Chirmiri", "Kanker",
  ],
  "India::Goa": [
    "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem",
    "Sanquelim", "Cuncolim", "Canacona",
  ],
  "India::Gujarat": [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh",
    "Gandhinagar", "Anand", "Nadiad", "Morbi", "Mehsana", "Bharuch", "Vapi", "Navsari",
    "Porbandar", "Godhra", "Patan", "Veraval", "Palanpur",
  ],
  "India::Haryana": [
    "Gurugram", "Faridabad", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal",
    "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal",
    "Rewari", "Palwal",
  ],
  "India::Himachal Pradesh": [
    "Shimla", "Manali", "Dharamshala", "Solan", "Mandi", "Kullu", "Una", "Bilaspur",
    "Hamirpur", "Chamba", "Nahan", "Kangra", "Palampur",
  ],
  "India::Jharkhand": [
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh",
    "Medininagar", "Chaibasa", "Phusro", "Chirkunda",
  ],
  "India::Karnataka": [
    "Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Kalaburagi", "Davanagere",
    "Ballari", "Vijayapura", "Shivamogga", "Tumakuru", "Raichur", "Bidar", "Hospet", "Hassan",
    "Mandya", "Chitradurga", "Udupi", "Kolar", "Bagalkot",
  ],
  "India::Kerala": [
    "Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha",
    "Kannur", "Kottayam", "Malappuram", "Kasaragod", "Pathanamthitta", "Idukki", "Wayanad",
    "Ernakulam", "Manjeri", "Thalassery",
  ],
  "India::Madhya Pradesh": [
    "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam",
    "Rewa", "Murwara", "Singrauli", "Burhanpur", "Khandwa", "Bhind", "Chhindwara", "Guna",
    "Vidisha", "Shivpuri", "Damoh",
  ],
  "India::Maharashtra": [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Kolhapur",
    "Amravati", "Nanded", "Sangli", "Akola", "Latur", "Dhule", "Ahmednagar", "Chandrapur",
    "Parbhani", "Jalgaon", "Bhiwandi", "Ichalkaranji", "Panvel", "Malegaon", "Satara", "Beed",
    "Yavatmal", "Osmanabad", "Wardha", "Ratnagiri",
  ],
  "India::Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching", "Ukhrul", "Senapati"],
  "India::Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin", "Baghmara", "Williamnagar"],
  "India::Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Saiha"],
  "India::Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon"],
  "India::Odisha": [
    "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore",
    "Bhadrak", "Baripada", "Jharsuguda", "Angul", "Bargarh", "Jeypore", "Rayagada",
  ],
  "India::Punjab": [
    "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur",
    "Pathankot", "Moga", "Firozpur", "Batala", "Kapurthala", "Faridkot", "Sangrur", "Barnala",
  ],
  "India::Rajasthan": [
    "Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bharatpur", "Sikar",
    "Bhilwara", "Pali", "Sri Ganganagar", "Tonk", "Chittorgarh", "Churu", "Jhunjhunu",
    "Nagaur", "Hanumangarh", "Dausa", "Barmer",
  ],
  "India::Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo", "Singtam"],
  "India::Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur",
    "Erode", "Vellore", "Thoothukudi", "Dindigul", "Thanjavur", "Ranipet", "Nagercoil",
    "Kanchipuram", "Karur", "Cuddalore", "Kumbakonam", "Hosur", "Nagapattinam",
  ],
  "India::Telangana": [
    "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Mahbubnagar",
    "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda", "Siddipet",
  ],
  "India::Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Belonia", "Khowai", "Ambassa"],
  "India::Uttar Pradesh": [
    "Lucknow", "Kanpur", "Noida", "Varanasi", "Agra", "Meerut", "Prayagraj", "Ghaziabad",
    "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Firozabad", "Jhansi",
    "Muzaffarnagar", "Mathura", "Rampur", "Shahjahanpur", "Farrukhabad", "Ayodhya", "Etawah",
    "Mirzapur", "Bulandshahr", "Sitapur",
  ],
  "India::Uttarakhand": [
    "Dehradun", "Haridwar", "Nainital", "Roorkee", "Haldwani", "Rudrapur", "Kashipur",
    "Rishikesh", "Ramnagar", "Almora", "Pithoragarh", "Mussoorie",
  ],
  "India::West Bengal": [
    "Kolkata", "Howrah", "Siliguri", "Durgapur", "Asansol", "Bardhaman", "Malda", "Kharagpur",
    "Haldia", "Krishnanagar", "Baharampur", "Habra", "Ranaghat", "Raiganj", "Jalpaiguri",
    "Cooch Behar", "Darjeeling", "Bankura", "Purulia",
  ],
  "India::Andaman and Nicobar Islands": ["Port Blair", "Diglipur", "Rangat", "Mayabunder", "Car Nicobar"],
  "India::Chandigarh": ["Chandigarh"],
  "India::Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa", "Diu"],
  "India::Delhi": [
    "New Delhi", "Dwarka", "Rohini", "Karol Bagh", "Saket", "Janakpuri", "Pitampura",
    "Vasant Kunj", "Lajpat Nagar", "Shahdara",
  ],
  "India::Jammu and Kashmir": [
    "Srinagar", "Jammu", "Anantnag", "Baramulla", "Sopore", "Kathua", "Udhampur", "Punch",
    "Rajouri", "Kupwara",
  ],
  "India::Ladakh": ["Leh", "Kargil"],
  "India::Lakshadweep": ["Kavaratti", "Agatti", "Minicoy", "Andrott"],
  "India::Puducherry": ["Puducherry", "Karaikal", "Yanam", "Mahe"],

  // United States
  "United States::Alabama": [
    "Birmingham", "Montgomery", "Huntsville", "Mobile", "Tuscaloosa", "Hoover", "Dothan",
    "Auburn", "Decatur", "Madison",
  ],
  "United States::Alaska": ["Anchorage", "Juneau", "Fairbanks", "Sitka", "Ketchikan", "Wasilla", "Kenai", "Kodiak"],
  "United States::Arizona": [
    "Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale", "Glendale", "Gilbert", "Tempe",
    "Peoria", "Surprise", "Yuma", "Flagstaff",
  ],
  "United States::Arkansas": [
    "Little Rock", "Fayetteville", "Fort Smith", "Springdale", "Jonesboro", "Rogers",
    "Conway", "North Little Rock", "Bentonville", "Pine Bluff",
  ],
  "United States::California": [
    "Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Fresno",
    "Long Beach", "Oakland", "Bakersfield", "Anaheim", "Santa Ana", "Riverside", "Stockton",
    "Irvine", "Chula Vista", "Fremont", "San Bernardino", "Modesto", "Oxnard",
    "Santa Barbara", "Berkeley", "Palo Alto", "Pasadena",
  ],
  "United States::Colorado": [
    "Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood", "Thornton", "Arvada",
    "Westminster", "Pueblo", "Boulder", "Greeley",
  ],
  "United States::Connecticut": [
    "Hartford", "New Haven", "Bridgeport", "Stamford", "Waterbury", "Norwalk", "Danbury",
    "New Britain",
  ],
  "United States::Delaware": ["Wilmington", "Dover", "Newark", "Middletown", "Smyrna", "Milford"],
  "United States::Florida": [
    "Miami", "Orlando", "Tampa", "Jacksonville", "St. Petersburg", "Hialeah", "Tallahassee",
    "Fort Lauderdale", "Port St. Lucie", "Cape Coral", "Pembroke Pines", "Hollywood",
    "Gainesville", "Sarasota", "Naples", "Key West",
  ],
  "United States::Georgia": [
    "Atlanta", "Savannah", "Augusta", "Columbus", "Macon", "Athens", "Sandy Springs",
    "Roswell", "Albany", "Marietta", "Valdosta",
  ],
  "United States::Hawaii": ["Honolulu", "Hilo", "Kailua", "Kaneohe", "Waipahu", "Pearl City", "Kahului", "Lahaina"],
  "United States::Idaho": ["Boise", "Meridian", "Nampa", "Idaho Falls", "Pocatello", "Caldwell", "Coeur d'Alene", "Twin Falls"],
  "United States::Illinois": [
    "Chicago", "Springfield", "Aurora", "Naperville", "Joliet", "Rockford", "Peoria", "Elgin",
    "Waukegan", "Champaign", "Bloomington", "Evanston",
  ],
  "United States::Indiana": [
    "Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel", "Fishers",
    "Bloomington", "Hammond", "Gary", "Muncie",
  ],
  "United States::Iowa": [
    "Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City", "Waterloo",
    "Council Bluffs", "Ames",
  ],
  "United States::Kansas": ["Wichita", "Topeka", "Overland Park", "Kansas City", "Olathe", "Lawrence", "Manhattan", "Salina"],
  "United States::Kentucky": ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington", "Richmond", "Frankfort"],
  "United States::Louisiana": ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles", "Kenner", "Bossier City", "Monroe"],
  "United States::Maine": ["Portland", "Augusta", "Bangor", "Lewiston", "South Portland", "Auburn"],
  "United States::Maryland": ["Baltimore", "Annapolis", "Rockville", "Frederick", "Gaithersburg", "Bowie", "Hagerstown", "Salisbury"],
  "United States::Massachusetts": [
    "Boston", "Cambridge", "Worcester", "Springfield", "Lowell", "Newton", "Somerville",
    "Quincy", "Brockton",
  ],
  "United States::Michigan": [
    "Detroit", "Ann Arbor", "Grand Rapids", "Warren", "Sterling Heights", "Lansing", "Flint",
    "Dearborn", "Kalamazoo", "Troy",
  ],
  "United States::Minnesota": [
    "Minneapolis", "Saint Paul", "Rochester", "Duluth", "Bloomington", "Brooklyn Park",
    "Plymouth", "St. Cloud",
  ],
  "United States::Mississippi": ["Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi", "Meridian", "Tupelo"],
  "United States::Missouri": [
    "Kansas City", "St. Louis", "Springfield", "Columbia", "Independence", "Lee's Summit",
    "St. Joseph", "Jefferson City",
  ],
  "United States::Montana": ["Billings", "Helena", "Missoula", "Great Falls", "Bozeman", "Butte", "Kalispell"],
  "United States::Nebraska": ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"],
  "United States::Nevada": ["Las Vegas", "Reno", "Henderson", "North Las Vegas", "Sparks", "Carson City"],
  "United States::New Hampshire": ["Manchester", "Concord", "Nashua", "Portsmouth", "Dover", "Rochester"],
  "United States::New Jersey": ["Newark", "Jersey City", "Paterson", "Elizabeth", "Trenton", "Camden", "Atlantic City", "Princeton"],
  "United States::New Mexico": ["Albuquerque", "Santa Fe", "Las Cruces", "Rio Rancho", "Roswell"],
  "United States::New York": [
    "New York City", "Buffalo", "Albany", "Rochester", "Yonkers", "Syracuse", "Schenectady",
    "Utica", "White Plains", "Ithaca",
  ],
  "United States::North Carolina": [
    "Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville", "Cary",
    "Wilmington", "Asheville", "High Point",
  ],
  "United States::North Dakota": ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo"],
  "United States::Ohio": [
    "Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton", "Parma", "Canton",
    "Youngstown", "Lorain",
  ],
  "United States::Oklahoma": ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Edmond", "Lawton", "Stillwater"],
  "United States::Oregon": ["Portland", "Salem", "Eugene", "Gresham", "Hillsboro", "Beaverton", "Bend", "Medford"],
  "United States::Pennsylvania": [
    "Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton", "Bethlehem",
    "Lancaster", "Harrisburg",
  ],
  "United States::Rhode Island": ["Providence", "Cranston", "Warwick", "Pawtucket", "Newport"],
  "United States::South Carolina": ["Charleston", "Columbia", "North Charleston", "Mount Pleasant", "Rock Hill", "Greenville", "Spartanburg"],
  "United States::South Dakota": ["Sioux Falls", "Pierre", "Rapid City", "Aberdeen", "Brookings"],
  "United States::Tennessee": ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville", "Murfreesboro", "Franklin"],
  "United States::Texas": [
    "Houston", "Austin", "Dallas", "San Antonio", "Fort Worth", "El Paso", "Arlington",
    "Corpus Christi", "Plano", "Laredo", "Lubbock", "Irving", "Frisco", "McKinney", "Galveston",
  ],
  "United States::Utah": ["Salt Lake City", "Provo", "West Valley City", "Ogden", "Orem", "Sandy", "St. George"],
  "United States::Vermont": ["Burlington", "Montpelier", "Rutland", "South Burlington", "Barre"],
  "United States::Virginia": ["Virginia Beach", "Richmond", "Norfolk", "Chesapeake", "Arlington", "Alexandria", "Newport News", "Roanoke"],
  "United States::Washington": ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Everett", "Kent", "Olympia", "Redmond"],
  "United States::West Virginia": ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling"],
  "United States::Wisconsin": ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine", "Appleton", "Eau Claire"],
  "United States::Wyoming": ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs"],

  // United Kingdom
  "United Kingdom::England": [
    "London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Sheffield", "Bristol",
    "Newcastle", "Nottingham", "Leicester", "Coventry", "Southampton", "Portsmouth",
    "Brighton", "Oxford", "Cambridge", "York", "Bath", "Plymouth", "Reading",
  ],
  "United Kingdom::Scotland": ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Inverness", "Stirling", "Perth", "Ayr"],
  "United Kingdom::Wales": ["Cardiff", "Swansea", "Newport", "Wrexham", "Bangor", "St Davids"],
  "United Kingdom::Northern Ireland": ["Belfast", "Derry", "Lisburn", "Newry", "Armagh", "Bangor"],

  // Canada
  "Canada::Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert", "Medicine Hat"],
  "Canada::British Columbia": ["Vancouver", "Victoria", "Surrey", "Burnaby", "Richmond", "Kelowna", "Abbotsford", "Kamloops"],
  "Canada::Manitoba": ["Winnipeg", "Brandon", "Steinbach", "Thompson"],
  "Canada::New Brunswick": ["Fredericton", "Moncton", "Saint John", "Bathurst"],
  "Canada::Newfoundland and Labrador": ["St. John's", "Corner Brook", "Mount Pearl"],
  "Canada::Nova Scotia": ["Halifax", "Sydney", "Dartmouth", "Truro"],
  "Canada::Ontario": [
    "Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London", "Markham",
    "Vaughan", "Kitchener", "Windsor", "Oshawa", "Barrie", "Kingston", "Guelph",
  ],
  "Canada::Prince Edward Island": ["Charlottetown", "Summerside"],
  "Canada::Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Trois-Rivières"],
  "Canada::Saskatchewan": ["Regina", "Saskatoon", "Prince Albert", "Moose Jaw"],
  "Canada::Northwest Territories": ["Yellowknife", "Hay River"],
  "Canada::Nunavut": ["Iqaluit", "Rankin Inlet"],
  "Canada::Yukon": ["Whitehorse", "Dawson City"],

  // Australia
  "Australia::New South Wales": ["Sydney", "Newcastle", "Wollongong", "Central Coast", "Wagga Wagga", "Albury"],
  "Australia::Victoria": ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Shepparton"],
  "Australia::Queensland": ["Brisbane", "Gold Coast", "Townsville", "Cairns", "Toowoomba", "Mackay"],
  "Australia::Western Australia": ["Perth", "Fremantle", "Bunbury", "Geraldton"],
  "Australia::South Australia": ["Adelaide", "Mount Gambier", "Whyalla"],
  "Australia::Tasmania": ["Hobart", "Launceston", "Devonport"],
  "Australia::Australian Capital Territory": ["Canberra"],
  "Australia::Northern Territory": ["Darwin", "Alice Springs"],

  // Germany
  "Germany::Baden-Württemberg": ["Stuttgart", "Karlsruhe", "Mannheim", "Freiburg", "Heidelberg", "Ulm"],
  "Germany::Bavaria": ["Munich", "Nuremberg", "Augsburg", "Regensburg", "Würzburg", "Ingolstadt"],
  "Germany::Berlin": ["Berlin"],
  "Germany::Brandenburg": ["Potsdam", "Cottbus", "Brandenburg an der Havel"],
  "Germany::Bremen": ["Bremen", "Bremerhaven"],
  "Germany::Hamburg": ["Hamburg"],
  "Germany::Hesse": ["Frankfurt", "Wiesbaden", "Kassel", "Darmstadt", "Offenbach"],
  "Germany::Lower Saxony": ["Hanover", "Braunschweig", "Osnabrück", "Oldenburg", "Göttingen"],
  "Germany::Mecklenburg-Vorpommern": ["Rostock", "Schwerin", "Neubrandenburg"],
  "Germany::North Rhine-Westphalia": [
    "Cologne", "Düsseldorf", "Dortmund", "Essen", "Duisburg", "Bochum", "Bonn", "Münster", "Aachen",
  ],
  "Germany::Rhineland-Palatinate": ["Mainz", "Ludwigshafen", "Koblenz", "Trier"],
  "Germany::Saarland": ["Saarbrücken", "Neunkirchen"],
  "Germany::Saxony": ["Dresden", "Leipzig", "Chemnitz"],
  "Germany::Saxony-Anhalt": ["Magdeburg", "Halle"],
  "Germany::Schleswig-Holstein": ["Kiel", "Lübeck", "Flensburg"],
  "Germany::Thuringia": ["Erfurt", "Jena", "Gera"],

  // France
  "France::Auvergne-Rhône-Alpes": ["Lyon", "Grenoble", "Saint-Étienne", "Annecy", "Clermont-Ferrand"],
  "France::Bourgogne-Franche-Comté": ["Dijon", "Besançon", "Belfort"],
  "France::Brittany": ["Rennes", "Brest", "Quimper", "Saint-Malo"],
  "France::Centre-Val de Loire": ["Orléans", "Tours", "Bourges"],
  "France::Corsica": ["Ajaccio", "Bastia"],
  "France::Grand Est": ["Strasbourg", "Reims", "Metz", "Nancy", "Mulhouse"],
  "France::Hauts-de-France": ["Lille", "Amiens", "Roubaix", "Calais"],
  "France::Île-de-France": ["Paris", "Versailles", "Boulogne-Billancourt", "Saint-Denis"],
  "France::Normandy": ["Rouen", "Caen", "Le Havre"],
  "France::Nouvelle-Aquitaine": ["Bordeaux", "Limoges", "Poitiers", "La Rochelle"],
  "France::Occitanie": ["Toulouse", "Montpellier", "Nîmes", "Perpignan"],
  "France::Pays de la Loire": ["Nantes", "Angers", "Le Mans"],
  "France::Provence-Alpes-Côte d'Azur": ["Marseille", "Nice", "Toulon", "Aix-en-Provence", "Avignon", "Cannes"],

  // Singapore
  "Singapore::Central Region": ["Singapore", "Novena", "Bishan", "Toa Payoh"],
  "Singapore::East Region": ["Bedok", "Tampines", "Pasir Ris", "Changi"],
  "Singapore::North Region": ["Woodlands", "Yishun", "Sembawang"],
  "Singapore::North-East Region": ["Punggol", "Sengkang", "Hougang", "Serangoon"],
  "Singapore::West Region": ["Jurong", "Clementi", "Bukit Batok", "Choa Chu Kang"],

  // United Arab Emirates
  "United Arab Emirates::Abu Dhabi": ["Abu Dhabi", "Al Ain", "Madinat Zayed", "Ruwais"],
  "United Arab Emirates::Dubai": ["Dubai", "Deira", "Jumeirah"],
  "United Arab Emirates::Sharjah": ["Sharjah", "Khor Fakkan", "Kalba"],
  "United Arab Emirates::Ajman": ["Ajman"],
  "United Arab Emirates::Umm Al Quwain": ["Umm Al Quwain"],
  "United Arab Emirates::Ras Al Khaimah": ["Ras Al Khaimah", "Julfar"],
  "United Arab Emirates::Fujairah": ["Fujairah", "Dibba Al-Fujairah"],

  // Japan
  "Japan::Hokkaido": ["Sapporo", "Asahikawa", "Hakodate"],
  "Japan::Aomori": ["Aomori", "Hachinohe"],
  "Japan::Iwate": ["Morioka", "Ichinoseki"],
  "Japan::Miyagi": ["Sendai", "Ishinomaki"],
  "Japan::Akita": ["Akita", "Yokote"],
  "Japan::Yamagata": ["Yamagata", "Tsuruoka"],
  "Japan::Fukushima": ["Fukushima", "Koriyama", "Iwaki"],
  "Japan::Ibaraki": ["Mito", "Tsukuba"],
  "Japan::Tochigi": ["Utsunomiya", "Nikko"],
  "Japan::Gunma": ["Maebashi", "Takasaki"],
  "Japan::Saitama": ["Saitama", "Kawagoe", "Kawaguchi"],
  "Japan::Chiba": ["Chiba", "Funabashi", "Kashiwa"],
  "Japan::Tokyo": ["Tokyo", "Shinjuku", "Shibuya"],
  "Japan::Kanagawa": ["Yokohama", "Kawasaki", "Sagamihara"],
  "Japan::Niigata": ["Niigata", "Nagaoka"],
  "Japan::Toyama": ["Toyama", "Takaoka"],
  "Japan::Ishikawa": ["Kanazawa", "Komatsu"],
  "Japan::Fukui": ["Fukui", "Sabae"],
  "Japan::Yamanashi": ["Kofu", "Fujiyoshida"],
  "Japan::Nagano": ["Nagano", "Matsumoto"],
  "Japan::Gifu": ["Gifu", "Ogaki"],
  "Japan::Shizuoka": ["Shizuoka", "Hamamatsu"],
  "Japan::Aichi": ["Nagoya", "Toyota", "Okazaki"],
  "Japan::Mie": ["Tsu", "Yokkaichi"],
  "Japan::Shiga": ["Otsu", "Kusatsu"],
  "Japan::Kyoto": ["Kyoto", "Uji"],
  "Japan::Osaka": ["Osaka", "Sakai", "Higashiosaka"],
  "Japan::Hyogo": ["Kobe", "Himeji", "Amagasaki"],
  "Japan::Nara": ["Nara", "Kashihara"],
  "Japan::Wakayama": ["Wakayama", "Tanabe"],
  "Japan::Tottori": ["Tottori", "Yonago"],
  "Japan::Shimane": ["Matsue", "Izumo"],
  "Japan::Okayama": ["Okayama", "Kurashiki"],
  "Japan::Hiroshima": ["Hiroshima", "Fukuyama"],
  "Japan::Yamaguchi": ["Yamaguchi", "Shimonoseki"],
  "Japan::Tokushima": ["Tokushima", "Naruto"],
  "Japan::Kagawa": ["Takamatsu", "Marugame"],
  "Japan::Ehime": ["Matsuyama", "Imabari"],
  "Japan::Kochi": ["Kochi", "Nankoku"],
  "Japan::Fukuoka": ["Fukuoka", "Kitakyushu", "Kurume"],
  "Japan::Saga": ["Saga", "Karatsu"],
  "Japan::Nagasaki": ["Nagasaki", "Sasebo"],
  "Japan::Kumamoto": ["Kumamoto", "Yatsushiro"],
  "Japan::Oita": ["Oita", "Beppu"],
  "Japan::Miyazaki": ["Miyazaki", "Nobeoka"],
  "Japan::Kagoshima": ["Kagoshima", "Kirishima"],
  "Japan::Okinawa": ["Naha", "Okinawa City"],

  // South Korea
  "South Korea::Seoul": ["Seoul", "Gangnam"],
  "South Korea::Busan": ["Busan", "Haeundae"],
  "South Korea::Incheon": ["Incheon"],
  "South Korea::Daegu": ["Daegu"],
  "South Korea::Daejeon": ["Daejeon"],
  "South Korea::Gwangju": ["Gwangju"],
  "South Korea::Ulsan": ["Ulsan"],
  "South Korea::Sejong": ["Sejong"],
  "South Korea::Gyeonggi": ["Suwon", "Seongnam", "Goyang", "Yongin", "Bucheon", "Ansan"],
  "South Korea::Gangwon": ["Chuncheon", "Wonju", "Gangneung"],
  "South Korea::North Chungcheong": ["Cheongju", "Chungju"],
  "South Korea::South Chungcheong": ["Cheonan", "Asan"],
  "South Korea::North Jeolla": ["Jeonju", "Iksan"],
  "South Korea::South Jeolla": ["Mokpo", "Yeosu"],
  "South Korea::North Gyeongsang": ["Pohang", "Gumi", "Gyeongju"],
  "South Korea::South Gyeongsang": ["Changwon", "Jinju", "Gimhae"],
  "South Korea::Jeju": ["Jeju City", "Seogwipo"],

  // Brazil
  "Brazil::Acre": ["Rio Branco", "Cruzeiro do Sul"],
  "Brazil::Alagoas": ["Maceió", "Arapiraca"],
  "Brazil::Amapá": ["Macapá", "Santana"],
  "Brazil::Amazonas": ["Manaus", "Parintins"],
  "Brazil::Bahia": ["Salvador", "Feira de Santana", "Vitória da Conquista", "Ilhéus"],
  "Brazil::Ceará": ["Fortaleza", "Juazeiro do Norte", "Sobral"],
  "Brazil::Distrito Federal": ["Brasília"],
  "Brazil::Espírito Santo": ["Vitória", "Vila Velha", "Serra"],
  "Brazil::Goiás": ["Goiânia", "Aparecida de Goiânia", "Anápolis"],
  "Brazil::Maranhão": ["São Luís", "Imperatriz"],
  "Brazil::Mato Grosso": ["Cuiabá", "Várzea Grande"],
  "Brazil::Mato Grosso do Sul": ["Campo Grande", "Dourados"],
  "Brazil::Minas Gerais": ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora"],
  "Brazil::Pará": ["Belém", "Ananindeua", "Santarém"],
  "Brazil::Paraíba": ["João Pessoa", "Campina Grande"],
  "Brazil::Paraná": ["Curitiba", "Londrina", "Maringá"],
  "Brazil::Pernambuco": ["Recife", "Jaboatão dos Guararapes", "Olinda"],
  "Brazil::Piauí": ["Teresina", "Parnaíba"],
  "Brazil::Rio de Janeiro": ["Rio de Janeiro", "Niterói", "Duque de Caxias", "Nova Iguaçu"],
  "Brazil::Rio Grande do Norte": ["Natal", "Mossoró"],
  "Brazil::Rio Grande do Sul": ["Porto Alegre", "Caxias do Sul", "Pelotas"],
  "Brazil::Rondônia": ["Porto Velho", "Ji-Paraná"],
  "Brazil::Roraima": ["Boa Vista"],
  "Brazil::Santa Catarina": ["Florianópolis", "Joinville", "Blumenau"],
  "Brazil::São Paulo": ["São Paulo", "Campinas", "Guarulhos", "Santo André", "Osasco", "Sorocaba", "Ribeirão Preto"],
  "Brazil::Sergipe": ["Aracaju", "Nossa Senhora do Socorro"],
  "Brazil::Tocantins": ["Palmas", "Araguaína"],

  // South Africa
  "South Africa::Eastern Cape": ["Gqeberha", "East London", "Mthatha"],
  "South Africa::Free State": ["Bloemfontein", "Welkom"],
  "South Africa::Gauteng": ["Johannesburg", "Pretoria", "Soweto", "Sandton"],
  "South Africa::KwaZulu-Natal": ["Durban", "Pietermaritzburg", "Newcastle"],
  "South Africa::Limpopo": ["Polokwane", "Tzaneen"],
  "South Africa::Mpumalanga": ["Nelspruit", "Witbank"],
  "South Africa::North West": ["Mahikeng", "Rustenburg"],
  "South Africa::Northern Cape": ["Kimberley", "Upington"],
  "South Africa::Western Cape": ["Cape Town", "Stellenbosch", "George"],
};

export function getStatesForCountry(country: string): string[] {
  return STATES_BY_COUNTRY[country] ?? [];
}

export function getCitiesForState(country: string, state: string): string[] {
  return RAW_CITIES[key(country, state)] ?? [];
}
