import { CategoryGenConfig } from "./seedFactories";

// 45 leaf categories configuration with clean e-commerce studio photography image pools
export const categoryConfigs: CategoryGenConfig[] = [
  // =====================================================
  // FASHION (MEN, WOMEN, ACCESSORIES)
  // =====================================================
  {
    id: "cat-fashion-men-tshirts",
    brands: ["Erigo", "Roughneck 1991", "Uniqlo", "H&M", "3Second", "Schmiley Mo"],
    productNames: ["Essential Crewneck T-Shirt", "Oversized Graphic Tee", "Premium Heavyweight Cotton T-Shirt", "Minimalist Pocket Tee", "Vintage Washed T-Shirt"],
    minPrice: 89000,
    maxPrice: 249000,
    minWeight: 180,
    maxWeight: 250,
    imageUrls: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Dibuat dari bahan katun combed premium 30s/24s yang sangat lembut, adem, dan menyerap keringat. Jahitan double stick pada kerah menjaga kaos tetap rapi dan tahan lama."
  },
  {
    id: "cat-fashion-men-shirts",
    brands: ["The Executive", "Alisan", "Zara", "Brooks Brothers", "Wood", "Manzone"],
    productNames: ["Oxford Button-Down Shirt", "Premium Linen Long Sleeve Shirt", "Casual Flannel Plaid Shirt", "Formal Slim Fit Cotton Shirt", "Short Sleeve Camp Collar Shirt"],
    minPrice: 199000,
    maxPrice: 499000,
    minWeight: 250,
    maxWeight: 350,
    imageUrls: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620012253295-c05518e993be?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Kemeja premium dengan serat benang yang rapat, tidak mudah kusut (easy iron), dan potongan modern fit. Cocok untuk acara formal maupun gaya kasual rapi."
  },
  {
    id: "cat-fashion-men-pants",
    brands: ["Levi's", "Dockers", "Dickies", "Uniqlo", "Lois Jeans", "Cardinal"],
    productNames: ["Selvedge Slim Fit Jeans", "Classic Chino Trousers", "Stretch Ankle Pants", "Cargo Utility Jogger", "Relaxed Fit Corduroy Pants"],
    minPrice: 249000,
    maxPrice: 899000,
    minWeight: 400,
    maxWeight: 700,
    imageUrls: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Celana dengan tingkat elastisitas yang pas untuk kenyamanan bergerak sepanjang hari. Dilengkapi dengan resleting YKK premium dan saku fungsional."
  },
  {
    id: "cat-fashion-women-dresses",
    brands: ["Love Bonito", "Cotton Ink", "Zara", "Mango", "H&M Women", "Ria Miranda"],
    productNames: ["Midi Floral Summer Dress", "Elegant Lace Evening Gown", "Classic Cotton Shift Dress", "Maxi Pleated Wrap Dress", "Satin Slip Party Dress"],
    minPrice: 299000,
    maxPrice: 1290000,
    minWeight: 300,
    maxWeight: 600,
    imageUrls: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596783047904-453765135113?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Dress cantik dengan bahan chiffon atau katun berkualitas tinggi yang jatuh dengan anggun di badan. Sempurna untuk penampilan elegan di berbagai momen spesial."
  },
  {
    id: "cat-fashion-women-blouses",
    brands: ["ShopAtVelvet", "Berrybenka", "H&M", "This Is April", "Minimal", "Executive Women"],
    productNames: ["Satin V-Neck Blouse", "Linen Puff Sleeve Blouse", "Chiffon Ruffle Work Blouse", "Casual Oversized Blouse", "Embroidered Cotton Blouse"],
    minPrice: 149000,
    maxPrice: 399000,
    minWeight: 150,
    maxWeight: 250,
    imageUrls: [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Atasan blouse wanita berdesain modis dengan potongan nyaman. Menggunakan bahan anti gerah yang sangat cocok untuk dipakai bekerja maupun bersantai."
  },
  {
    id: "cat-fashion-women-skirts",
    brands: ["Uniqlo", "Zara", "Stradivarius", "Pull&Bear", "Berrybenka", "Love Bonito"],
    productNames: ["Pleated A-Line Maxi Skirt", "Button-Down Denim Skirt", "High-Waisted Pencil Skirt", "Flowy Floral Tiered Skirt", "Premium Knit Midi Skirt"],
    minPrice: 179000,
    maxPrice: 499000,
    minWeight: 250,
    maxWeight: 450,
    imageUrls: [
      "https://images.unsplash.com/photo-1583496661160-fb48862c4841?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508427138379-b27517df4f90?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Rok modis dengan ban pinggang elastis yang nyaman dan tidak menekan perut. Memberikan siluet anggun dan mudah dipadupadankan."
  },
  {
    id: "cat-fashion-acc-belts",
    brands: ["LeatherCo", "Gucci", "Bally", "Levi's Accessories", "Eiger", "Pedro"],
    productNames: ["Genuine Leather Dress Belt", "Automatic Buckle Rail Belt", "Heavy-Duty Tactical Webbing Belt", "Casual Suede Leather Belt", "Slim Fashion Waist Belt"],
    minPrice: 99000,
    maxPrice: 899000,
    minWeight: 150,
    maxWeight: 250,
    imageUrls: [
      "https://images.unsplash.com/photo-1624222247344-550fb8052141?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Ikat pinggang terbuat dari bahan premium yang kuat dan awet. Buckle anti karat berdesain minimalis dan eksklusif melengkapi penampilan Anda."
  },
  {
    id: "cat-fashion-acc-caps",
    brands: ["New Era", "Adidas Originals", "Nike SB", "Eiger", "Puma", "Deus Ex Machina"],
    productNames: ["Classic 9FORTY Baseball Cap", "Streetwear Snapback Hat", "Outdoor Ripstop Bucket Hat", "Premium Ribbed Beanie", "Retro Trucker Mesh Cap"],
    minPrice: 129000,
    maxPrice: 599000,
    minWeight: 80,
    maxWeight: 150,
    imageUrls: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Topi berdesain trendy dengan lengkungan visor yang presisi untuk melindungi wajah dari sinar matahari. Adjustable strap di bagian belakang memudahkan penyetelan ukuran."
  },
  {
    id: "cat-fashion-acc-wallets",
    brands: ["Wallts", "Jims Honey", "Fossil", "Braun Buffel", "Pedro", "Eiger Wallet"],
    productNames: ["Bifold Genuine Leather Wallet", "Minimalist RFID Card Holder", "Zippered Clutch Wallet", "Slim Carbon Fiber Wallet", "Classic Leather Coin Purse"],
    minPrice: 149000,
    maxPrice: 1290000,
    minWeight: 100,
    maxWeight: 200,
    imageUrls: [
      "https://images.unsplash.com/photo-1627124484419-20153d5f00ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606506727286-a791a03f47c0?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Dompet ramping dengan kompartemen uang kertas, slot kartu yang banyak, dan jahitan tepi yang rapi. Dilengkapi fitur RFID protection demi keamanan kartu Anda."
  },

  // =====================================================
  // ELECTRONICS (COMPUTER, AUDIO, POWER)
  // =====================================================
  {
    id: "cat-electronics-keyboards",
    brands: ["Keychron", "Logitech G", "Razer", "VortexSeries", "Rexus", "Digital Alliance"],
    productNames: ["K2 Wireless Mechanical Keyboard", "G PRO Mechanical Gaming Keyboard", "Huntsman Mini 60% Keyboard", "VX7 Retro Mechanical Keyboard", "Custom 75% Hot-Swappable Keyboard"],
    minPrice: 399000,
    maxPrice: 2499000,
    minWeight: 700,
    maxWeight: 1200,
    imageUrls: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Keyboard mekanikal dengan switch premium berdaya tahan tinggi hingga 50 juta ketukan. Dilengkapi lampu RGB dinamis dan konektivitas super cepat."
  },
  {
    id: "cat-electronics-mice",
    brands: ["Logitech G", "Razer", "SteelSeries", "Fantech", "Digital Alliance", "Rexus"],
    productNames: ["G502 Hero High Performance Mouse", "DeathAdder Essential Gaming Mouse", "Rival 3 Wireless Gaming Mouse", "Aero Wirelss Superlight Mouse", "Ergonomic Silent Vertical Mouse"],
    minPrice: 149000,
    maxPrice: 1890000,
    minWeight: 60,
    maxWeight: 150,
    imageUrls: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1625857009112-2c703789b4ba?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Mouse dengan sensor optik presisi tinggi dan DPI yang dapat disesuaikan. Desain ergonomis mencegah lelah pada pergelangan tangan saat pemakaian lama."
  },
  {
    id: "cat-electronics-monitors",
    brands: ["ASUS ROG", "LG", "Samsung Odyssey", "Xiaomi", "AOC", "BenQ"],
    productNames: ["24\" IPS FHD 75Hz Monitor", "27\" QHD 144Hz Gaming Monitor", "34\" Curved UltraWide HDR Monitor", "27\" 4K Professional Creator Monitor", "24\" 165Hz Esports Gaming Monitor"],
    minPrice: 1299000,
    maxPrice: 8990000,
    minWeight: 3500,
    maxWeight: 8000,
    imageUrls: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Monitor berkualitas tinggi dengan reproduksi warna yang akurat dan sudut pandang lebar. Dilengkapi teknologi anti-flicker dan low blue light untuk melindungi mata."
  },
  {
    id: "cat-electronics-speakers",
    brands: ["JBL", "Eggel", "Sony", "Marshall", "Anker Soundcore", "OontZ"],
    productNames: ["Go 4 Portable Bluetooth Speaker", "Terra 3 Waterproof Outdoor Speaker", "SRS-XB13 Compact Wireless Speaker", "Emberton II Portable Speaker", "Soundcore Motion+ Hi-Res Speaker"],
    minPrice: 249000,
    maxPrice: 2999000,
    minWeight: 200,
    maxWeight: 1500,
    imageUrls: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Speaker nirkabel dengan kualitas suara jernih, bass bertenaga, dan ketahanan baterai yang luar biasa. Cocok untuk menemani aktivitas outdoor Anda."
  },
  {
    id: "cat-electronics-headphones",
    brands: ["Sony", "Audio-Technica", "Sennheiser", "Razer", "SteelSeries", "JBL Headphones"],
    productNames: ["WH-1000XM5 Wireless ANC Headphones", "ATH-M50x Professional Studio Headphones", "HD 450BT Wireless Noise Cancelling", "Kraken V3 Gaming Headset", "Tune 710BT Wireless Over-Ear"],
    minPrice: 499000,
    maxPrice: 5499000,
    minWeight: 220,
    maxWeight: 350,
    imageUrls: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Headphone over-ear berdesain nyaman dengan isolasi suara yang superior. Memberikan detail instrumen musik yang nyata dan vokal yang jernih."
  },
  {
    id: "cat-electronics-earbuds",
    brands: ["Apple", "Samsung", "Baseus", "Moondrop", "Anker", "Soundpeats"],
    productNames: ["AirPods Pro (2nd Gen)", "Galaxy Buds2 Pro Wireless TWS", "Bowie WM02 Ultra-Small Earbuds", "Space Travel TWS Earbuds", "Life P2 Mini Bluetooth Earbuds"],
    minPrice: 199000,
    maxPrice: 3899000,
    minWeight: 40,
    maxWeight: 80,
    imageUrls: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=800&q=80"
    ],
    details: "True Wireless Stereo (TWS) dengan koneksi Bluetooth stabil, latency rendah untuk gaming, dan mikrofon jernih dilengkapi fitur Environmental Noise Cancellation (ENC)."
  },
  {
    id: "cat-electronics-chargers",
    brands: ["Anker", "Baseus", "Ugreen", "Aukan", "Acmic"],
    productNames: ["Nano II 65W GaN Charger", "GaN5 Pro 100W Fast Desktop Charger", "Nexode 30W Mini USB-C Wall Charger", "Triple Port GaN 65W Travel Adapter", "Dual Port 20W PD Wall Charger"],
    minPrice: 129000,
    maxPrice: 699000,
    minWeight: 70,
    maxWeight: 180,
    imageUrls: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Adaptor charger berteknologi GaN (Gallium Nitride) yang mampu menghantarkan daya tinggi dalam ukuran ringkas. Aman dengan proteksi overheat dan korsleting."
  },
  {
    id: "cat-electronics-powerbanks",
    brands: ["Anker Power", "Baseus Magnetic", "Ugreen Power", "Xiaomi Power", "Acmic Power"],
    productNames: ["PowerCore 10000mAh Ultra-Compact", "Magnetic Wireless 10000mAh Powerbank", "20000mAh 100W Power Delivery Powerbank", "Redmi 20000mAh Fast Charge Powerbank", "MagSafe Slim Powerbank 5000mAh"],
    minPrice: 179000,
    maxPrice: 1299000,
    minWeight: 200,
    maxWeight: 450,
    imageUrls: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Baterai portabel kapasitas besar dengan efisiensi pengisian tinggi. Mendukung Power Delivery dan Quick Charge untuk pengisian daya kilat gadget Anda."
  },
  {
    id: "cat-electronics-cables",
    brands: ["Ugreen", "Baseus", "Anker Cable", "Acmic Cable", "Vention"],
    productNames: ["USB-C to USB-C 100W Braided Cable", "USB-A to USB-C 3A Fast Charge Cable", "USB-C to Lightning MFi Certified Cable", "3-in-1 Multi Charging Cable 1.2m", "Nylon Braided 240W USB-C Cable 2m"],
    minPrice: 39000,
    maxPrice: 249000,
    minWeight: 30,
    maxWeight: 80,
    imageUrls: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Kabel data dan charger berlapis nylon braided yang sangat lentur namun kuat menahan tarikan. Konektor berlapis emas menjamin transmisi data yang stabil."
  },

  // =====================================================
  // FOOD & BEVERAGE (DRINKS, SNACKS, GROCERY)
  // =====================================================
  {
    id: "cat-food-coffee",
    brands: ["Kopi Kenangan", "Anomali Coffee", "Excelso", "Starbucks Coffee", "Tanamera", "Kapal Api"],
    productNames: ["Single Origin Gayo Arabica Beans 250g", "Premium Espresso Blend Dark Roast 250g", "Medium Roast House Blend Ground Coffee", "Premium Cold Brew Concentrated 500ml", "Organic Luwak Robusta Beans 100g"],
    minPrice: 45000,
    maxPrice: 299000,
    minWeight: 250,
    maxWeight: 600,
    imageUrls: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Biji kopi berkualitas dari petani lokal pilihan yang disangrai dengan presisi tinggi untuk menghasilkan aroma maksimal dan rasa yang kompleks."
  },
  {
    id: "cat-food-tea",
    brands: ["Tong Tji", "SariWangi", "Dilmah", "Twinings", "Matcha Bae", "Kepala Djenggot"],
    productNames: ["Premium Jasmine Green Tea Bags 25pcs", "Uji Matcha Ceremonial Grade Powder 50g", "Classic Earl Grey Loose Leaf Tea 100g", "Pure Chamomile Herbal Infusion 20pcs", "Traditional English Breakfast Tea Bags"],
    minPrice: 15000,
    maxPrice: 189000,
    minWeight: 50,
    maxWeight: 200,
    imageUrls: [
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Pucuk daun teh pilihan beraroma harum alami yang diolah secara higienis. Mengandung antioksidan tinggi yang baik untuk relaksasi tubuh."
  },
  {
    id: "cat-food-water",
    brands: ["Aqua", "Le Minerale", "Evian", "Nestle PureLife", "Equil", "Ades"],
    productNames: ["Natural Mineral Water 600ml (Karton)", "Pure Alkaline Water pH 8+ 500ml", "Evian Natural Spring Water 750ml", "Equil Sparkling Mineral Water 380ml", "Mineral Water 1500ml Family Pack"],
    minPrice: 5000,
    maxPrice: 145000,
    minWeight: 500,
    maxWeight: 12000,
    imageUrls: [
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Air mineral bersumber dari mata air pegunungan vulkanik alami terdalam yang dikemas langsung di sumbernya untuk menjaga kesegaran murni."
  },
  {
    id: "cat-food-cookies",
    brands: ["Monde", "Good Time", "Lotus Biscoff", "Oreo", "Roma", "Lotte"],
    productNames: ["Classic Butter Cookies Tin 454g", "Double Choc Choco Chips Cookies Pack", "Original Caramel Biscoff Cookies 250g", "Double Stuf Sandwich Cookies 120g", "Premium Danisa Butter Cookies 908g"],
    minPrice: 12000,
    maxPrice: 110000,
    minWeight: 120,
    maxWeight: 1000,
    imageUrls: [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Kue kering renyah beraroma mentega yang harum dan lezat. Sangat cocok dijadikan teman minum teh hangat atau suguhan saat hari raya bersama keluarga."
  },
  {
    id: "cat-food-chips",
    brands: ["Chitato", "Lay's", "Pringles", "Qtela", "Kusuka", "Taro"],
    productNames: ["Chitato Sapi Panggang Family Pack 120g", "Pringles Sour Cream & Onion 107g", "Qtela Keripik Singkong Balado 185g", "Kusuka Keripik Singkong Original 180g", "Lay's Rumput Laut Potato Chips 68g"],
    minPrice: 8000,
    maxPrice: 35000,
    minWeight: 70,
    maxWeight: 250,
    imageUrls: [
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Keripik renyah dari bahan-bahan pilihan yang dibumbui dengan resep spesial gurih. Dikemas dengan nitrogen agar keripik tetap renyah maksimal."
  },
  {
    id: "cat-food-chocolate",
    brands: ["Silverqueen", "Cadbury", "Toblerone", "KitKat", "Delfi", "Monggo"],
    productNames: ["Silverqueen Cashew Milk Chocolate 58g", "Cadbury Dairy Milk Chocolate 90g", "Toblerone Milk Chocolate Honey Almond 100g", "KitKat 4-Finger Chocolate Wafer 35g", "Monggo Dark Chocolate 70% Cocoa 80g"],
    minPrice: 9000,
    maxPrice: 48000,
    minWeight: 40,
    maxWeight: 120,
    imageUrls: [
      "https://images.unsplash.com/photo-1511381939415-e4401546383a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548907040-4d42bfb2c2b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Cokelat susu lembut premium yang meleleh di mulut dengan paduan kacang mede renyah atau wafer krispi di dalamnya. Mood booster terbaik harian Anda."
  },
  {
    id: "cat-food-rice",
    brands: ["Anak Raja", "Raja Lele", "Pandan Wangi", "Sania Rice", "Bumi Kartika"],
    productNames: ["Beras Premium Cianjur Pandan Wangi 5kg", "Beras Setra Ramos Super Kepala 5kg", "Beras Merah Organik Diet Sehat 2kg", "Beras Basmati India Long Grain 1kg", "Beras Premium Pulen Wangi 10kg"],
    minPrice: 32000,
    maxPrice: 175000,
    minWeight: 1000,
    maxWeight: 10000,
    imageUrls: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Beras pulen berkualitas tinggi hasil gilingan padi pilihan nusantara yang bebas dari pemutih, pewangi sintetik, dan pengawet. Nasi jadi lebih harum."
  },
  {
    id: "cat-food-sugar",
    brands: ["Gulaku", "Rose Brand", "Sweetener", "Puravita", "Lokal Sugar"],
    productNames: ["Gulaku Tebu Premium Kuning 1kg", "Rose Brand Gula Pasir Putih 1kg", "Tropicana Slim Classic Sweetener 50s", "Gula Merah Aren Cair Asli 500ml", "Gula Batu Organik Kristal 500g"],
    minPrice: 17000,
    maxPrice: 65000,
    minWeight: 300,
    maxWeight: 1200,
    imageUrls: [
      "https://images.unsplash.com/photo-1550534791-2677533605ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Gula pasir putih bersih berbutir halus dari tebu alami pilihan yang diolah secara higienis. Memberikan rasa manis murni untuk minuman dan masakan."
  },
  {
    id: "cat-food-oil",
    brands: ["Bimoli", "Filma", "Sania", "SunCo", "Fortune", "Tropicana Slim Oil"],
    productNames: ["Bimoli Minyak Goreng Spesial 2L Refill", "Filma Minyak Goreng Non-Kolesterol 2L", "SunCo Minyak Goreng Cair 2L Pouch", "Sania Royal Cooking Oil 1L", "Tropicana Slim Corn Oil Jantung Sehat 1L"],
    minPrice: 21000,
    maxPrice: 95000,
    minWeight: 900,
    maxWeight: 2200,
    imageUrls: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Minyak goreng kelapa sawit atau jagung berkualitas tinggi yang diproses melalui dua kali penyaringan sehingga menghasilkan minyak goreng jernih bertekstur encer."
  },

  // =====================================================
  // MOBILE (SMARTPHONES, CASES, CHARGERS)
  // =====================================================
  {
    id: "cat-mobile-android",
    brands: ["Samsung", "Xiaomi POCO", "Oppo", "Vivo", "Infinix", "Realme"],
    productNames: ["Galaxy S24 Ultra 12GB/512GB", "POCO F6 Pro 5G Snapdragon 8s Gen 3", "Reno 12 Pro 5G 12GB/256GB", "V40 5G Carl Zeiss Camera 256GB", "Infinix GT 20 Pro Gaming Edition"],
    minPrice: 2299000,
    maxPrice: 19999000,
    minWeight: 190,
    maxWeight: 240,
    imageUrls: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Smartphone Android dengan spesifikasi hardware kelas atas, performa gaming lancar jaya, layar AMOLED refresh rate tinggi, dan setup kamera resolusi super tajam."
  },
  {
    id: "cat-mobile-iphone",
    brands: ["Apple"],
    productNames: ["iPhone 15 Pro Max 256GB Titanium", "iPhone 15 128GB Official iBox", "iPhone 14 Pro 128GB Deep Purple", "iPhone 13 128GB Midnight", "iPhone SE (3rd Gen) 64GB"],
    minPrice: 7999000,
    maxPrice: 24999000,
    minWeight: 170,
    maxWeight: 230,
    imageUrls: [
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Smartphone Apple iPhone dengan sistem operasi iOS yang sangat smooth, performa chipset bionic kencang, kamera kelas sinematik, dan build quality titanium super premium."
  },
  {
    id: "cat-mobile-featurephone",
    brands: ["Nokia", "Evercoss", "Advan Feature"],
    productNames: ["Nokia 105 Classic Dual SIM", "Nokia 5310 XpressMusic Keypad", "Evercoss V16 Keypad Candybar", "Nokia 215 4G Volte Modern", "Advan Hape Jadul Classic"],
    minPrice: 199000,
    maxPrice: 690000,
    minWeight: 70,
    maxWeight: 110,
    imageUrls: [
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Handphone tombol candybar klasik yang sangat andal untuk telepon dan SMS. Daya tahan baterai legendaris bertahan hingga seminggu penuh sekali charge."
  },
  {
    id: "cat-mobile-silicone-case",
    brands: ["Spigen", "Ringke", "Caseology", "Baseus Case", "Lokal Case"],
    productNames: ["Liquid Crystal Soft Silicone Case", "Fusion Magnetic Clear Case MagSafe", "Silicone Fit Matte Protective Cover", "Ultra Thin Matte Jelly Case", "Candy Color Softcase Protection"],
    minPrice: 29000,
    maxPrice: 349000,
    minWeight: 20,
    maxWeight: 50,
    imageUrls: [
      "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605405748313-a41d49b2b611?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Casing pelindung hp berbahan silikon TPU fleksibel kualitas tinggi yang presisi. Melindungi dari benturan ringan dan goresan tanpa menambah tebal hp."
  },
  {
    id: "cat-mobile-rugged-case",
    brands: ["Spigen Rugged", "Ringke Onyx", "UAG (Urban Armor Gear)", "Supcase"],
    productNames: ["Tough Armor Heavy Duty Case", "Onyx Tactical Shockproof Cover", "Pathfinder Military Drop Protection Case", "Unicorn Beetle Pro Full-Body Rugged Case"],
    minPrice: 149000,
    maxPrice: 899000,
    minWeight: 45,
    maxWeight: 90,
    imageUrls: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Casing tangguh berstandar militer drop-test yang memberikan perlindungan menyeluruh 360 derajat. Tahan banting di segala medan ekstrim."
  },
  {
    id: "cat-mobile-leather-case",
    brands: ["Spigen Leather", "Fossil Leather", "Nomad Premium", "Lokal Leather"],
    productNames: ["Modern Leather Horween Case", "Folio Wallet Leather Case", "Premium Synthetic Leather Slim Case", "Genuine Leather Card Slot Cover"],
    minPrice: 99000,
    maxPrice: 999000,
    minWeight: 35,
    maxWeight: 75,
    imageUrls: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Casing berlapis kulit premium asli atau sintetis bertekstur elegan. Semakin lama dipakai akan menghasilkan patine kulit alami yang mewah."
  },
  {
    id: "cat-mobile-wall-charger",
    brands: ["Anker Wall", "Baseus Wall", "Ugreen Wall", "Samsung Charger", "Apple Wall"],
    productNames: ["25W USB-C PD Super Fast Charger", "GaN5 Pro 40W Dual Port Charger", "Nexode 20W PD Mini Wall Charger", "Samsung 45W Power Adapter Type-C", "Apple 20W USB-C Power Adapter"],
    minPrice: 119000,
    maxPrice: 499000,
    minWeight: 60,
    maxWeight: 140,
    imageUrls: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Kepala adaptor charger dinding dengan port USB Type-C yang mendukung protokol pengisian cepat PD/PPS untuk memaksimalkan pengisian daya baterai hp."
  },
  {
    id: "cat-mobile-wireless-charger",
    brands: ["Anker Wireless", "Baseus Wireless", "Samsung Wireless", "Apple MagSafe", "Xiaomi Wireless"],
    productNames: ["MagSafe Wireless Charging Pad 15W", "PowerWave 10W Wireless Stand", "Samsung Super Fast Wireless Charger Duo 15W", "Baseus Simple Magnetic 15W Qi Charger", "Xiaomi 50W Vertical Wireless Charging Stand"],
    minPrice: 199000,
    maxPrice: 1299000,
    minWeight: 100,
    maxWeight: 300,
    imageUrls: [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Pad pengisi daya nirkabel Qi-certified. Cukup letakkan smartphone di atas pad untuk mengisi daya instan tanpa repot mencolok kabel port."
  },
  {
    id: "cat-mobile-car-charger",
    brands: ["Anker Car", "Baseus Car", "Ugreen Car", "Acmic Car"],
    productNames: ["PowerDrive 2-Port 24W Car Charger", "Digital Display Dual QC 45W Metal Car Charger", "Ugreen 30W USB-C PD Car Charger Adapter", "Acmic Speed Car Charger 30W"],
    minPrice: 79000,
    maxPrice: 249000,
    minWeight: 40,
    maxWeight: 90,
    imageUrls: [
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Adaptor charger mobil yang dicolokkan ke pemantik rokok (lighter port). Dilengkapi dual port pengisian cepat berdaya tinggi yang aman."
  },

  // =====================================================
  // BEAUTY (SKINCARE, MAKEUP, HAIRCARE)
  // =====================================================
  {
    id: "cat-beauty-cleanser",
    brands: ["Cetaphil", "COSRX", "Senka", "Wardah Cleanser", "Somethinc Clean", "Skintific Clean"],
    productNames: ["Gentle Skin Cleanser Sabun Muka Sensitif", "Low pH Good Morning Gel Cleanser 150ml", "Perfect Whip Facial Foam 120g", "Wardah C-Defense Whipped Foam", "Skintific Amino Acid Facial Cleanser 80g"],
    minPrice: 32000,
    maxPrice: 189000,
    minWeight: 100,
    maxWeight: 300,
    imageUrls: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Pembersih wajah berbusa lembut yang efektif mengangkat kotoran, debu, dan sisa makeup penyumbat pori tanpa membuat kulit terasa kering atau ketarik."
  },
  {
    id: "cat-beauty-serum",
    brands: ["Somethinc", "Skintific", "Avoskin", "The Ordinary", "Wardah Serum", "Garnier Serum"],
    productNames: ["Niacinamide + Moisture Sabi Beet Serum 20ml", "5X Ceramide Skin Barrier Repair Serum", "Miraculous Refining Serum AHA BHA PHA", "The Ordinary Hyaluronic Acid 2% + B5", "Wardah Crystal Secret Dark Spot Serum"],
    minPrice: 79000,
    maxPrice: 220000,
    minWeight: 20,
    maxWeight: 100,
    imageUrls: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Serum pekat bernutrisi tinggi dengan bahan aktif terkonsentrasi yang menembus ke dalam lapisan kulit terdalam untuk mengatasi masalah kulit spesifik."
  },
  {
    id: "cat-beauty-moisturizer",
    brands: ["Skintific Moist", "The Originote", "Somethinc Moist", "Wardah Moist", "Cerave", "Emina"],
    productNames: ["5X Ceramide Barrier Moisture Gel 30g", "Hyalucera Moisturizer Gel Hydrating", "Ceramic Skin Saviour Moisture Gel", "Wardah Aloe Vera Hydramild Gel", "Cerave Moisturizing Cream 177ml"],
    minPrice: 42000,
    maxPrice: 349000,
    minWeight: 50,
    maxWeight: 250,
    imageUrls: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Pelembab wajah bertekstur gel ringan atau krim lembut yang cepat meresap untuk mengunci kelembaban, menghaluskan tekstur kulit, dan memperbaiki barrier."
  },
  {
    id: "cat-beauty-foundation",
    brands: ["Maybelline", "Make Over", "L'Oreal", "Fenty Beauty", "Wardah Found", "Somethinc Found"],
    productNames: ["Fit Me Matte + Poreless Liquid Foundation", "Ultra Cover Liquid Matte Foundation", "Infallible 24H Matte Cover Foundation", "Fenty Beauty Pro Filt'r Soft Matte Foundation", "Somethinc Copy Paste Breathable Cushion"],
    minPrice: 89000,
    maxPrice: 650000,
    minWeight: 30,
    maxWeight: 150,
    imageUrls: [
      "https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Foundation cair berformula tahan lama dengan tingkat coverage tinggi yang efektif menyamarkan noda hitam, pori-pori besar, dan warna kulit tidak rata."
  },
  {
    id: "cat-beauty-lipstick",
    brands: ["Wardah Lipstick", "Maybelline Lip", "Make Over Lip", "Huda Beauty", "Somethinc Lip", "Romand"],
    productNames: ["Glasting Liquid Matte Lip Cream", "Superstay Matte Ink Liquid Lipstick", "Color Hypnose Creamy Lipcolor", "Romand Juicy Lasting Tint Glossy", "Somethinc Ombre Lip Tint Hydrating"],
    minPrice: 49000,
    maxPrice: 289000,
    minWeight: 10,
    maxWeight: 50,
    imageUrls: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Lipstik dengan formula pigmentasi tinggi sekali oles langsung menutup warna bibir yang gelap. Diperkaya vitamin E untuk menjaga bibir tetap lembab."
  },
  {
    id: "cat-beauty-mascara",
    brands: ["Maybelline Mascara", "Wardah Mascara", "Romand Mascara", "Somethinc Mascara", "L'Oreal Mascara"],
    productNames: ["Hypercurl Waterproof Mascara Hitam", "Volume Expert Lash Defining Mascara", "Han All Brow & Lash Fixer Mascara", "Somethinc Hangover Volumizing Mascara", "L'Oreal Lash Paradise Waterproof Mascara"],
    minPrice: 69000,
    maxPrice: 199000,
    minWeight: 15,
    maxWeight: 45,
    imageUrls: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583241475880-083f84372725?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Maskara anti air dan anti luntur dengan brush sikat melengkung yang mampu menebalkan, memanjangkan, sekaligus melentikkan bulu mata secara instan."
  },
  {
    id: "cat-beauty-shampoo",
    brands: ["Head & Shoulders", "Pantene", "TRESemme", "Selsun", "L'Oreal Shampoo", "Sensatia Botanicals"],
    productNames: ["Anti-Dandruff Cool Menthol Shampoo 330ml", "Hairfall Control Anti-Rambut Rontok 290ml", "Keratin Smooth Deep Cleanse Shampoo 340ml", "Selsun Blue Obat Ketombe Parah 120ml", "Premium Herbal Hair Growth Shampoo"],
    minPrice: 25000,
    maxPrice: 179000,
    minWeight: 150,
    maxWeight: 450,
    imageUrls: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Shampoo pembersih rambut dengan kandungan bahan aktif penutrisi batang dan kulit kepala. Mengatasi ketombe, rambut rontok, lepek, dan gatal."
  },
  {
    id: "cat-beauty-conditioner",
    brands: ["Pantene Cond", "TRESemme Cond", "L'Oreal Conditioner", "Sensatia Cond", "Makarizo Cond"],
    productNames: ["3 Minute Miracle Hairfall Conditioner", "Keratin Smooth Hair Conditioner 340ml", "Elseve Fall Resist 3X Hair Conditioner", "Premium Argan Oil Nourishing Conditioner", "Hair Energy Fibertheraphy Conditioning Creambath"],
    minPrice: 29000,
    maxPrice: 195000,
    minWeight: 150,
    maxWeight: 450,
    imageUrls: [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Kondisioner bilas bertekstur krim lembut yang bekerja melapisi setiap helai rambut untuk melembutkan rambut kusut, mengunci kelembapan, dan berkilau."
  },
  {
    id: "cat-beauty-hairmask",
    brands: ["Makarizo", "L'Oreal Hair Spa", "Fino", "Sensatia Mask", "Ellips"],
    productNames: ["Hair Energy Fibertheraphy Hair Mask 500g", "Deep Nourishing Creambath Hair Spa 500ml", "Premium Touch Active Hair Mask Fino 230g", "Argan Oil Hair Repair Treatment Mask", "Vitamin Hair Mask Pro Keratin Complex"],
    minPrice: 35000,
    maxPrice: 289000,
    minWeight: 100,
    maxWeight: 600,
    imageUrls: [
      "https://images.unsplash.com/photo-1527633593644-3d1a984e1b84?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=800&q=80"
    ],
    details: "Masker perawatan rambut intensif mingguan untuk memperbaiki kerusakan rambut akibat styling catokan atau pewarnaan. Mengembalikan kilau lembut alami."
  }
];
