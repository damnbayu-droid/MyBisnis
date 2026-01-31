
import { Store, ShoppingCart, Truck, CreditCard, BarChart3, HeadphonesIcon, MapPin, User, Map, TrendingUp, Apple, Coffee, Building2 } from 'lucide-react'
import React from 'react';

export interface Translation {
  [key: string]: string
}

export interface Courier {
  id: string
  name: string
  type: string
  vehicle: string
  zone: string
  status: 'online' | 'offline' | 'busy'
  lat: number
  lng: number
  phone: string
  rating: number
  completedOrders: number
  score: number // Added for Gamification
}

export interface Product {
  name: string;
  category: string;
  price: string;
  store: string;
  description: string;
  image: string;
  rating: number;
  clicks: number;
  orders: number;
}

export interface WebsitePackage {
  name: string;
  price: string;
  pages: string;
  domain: string;
  features: string[];
  type: string;
  icon?: React.ReactNode;
}

// --- TRANSLATIONS (Already exists, ensuring completeness for Marketplace) ---
export const translations: { [key: string]: Translation } = {
  id: {
    title: 'Platform Marketplace UMKM Digital Indonesia',
    subtitle: 'Kembangkan bisnis Anda dengan mudah. Buat toko online profesional, kelola produk, dan raih lebih banyak pelanggan dengan sistem marketplace terintegrasi.',
    daftar: 'Daftar',
    login: 'Login',
    mulaiSekarang: 'Mulai Sekarang',
    orderOjek: 'Order Ojek',
    belumPunyaAkun: 'Belum Punya Akun, Daftar Disini',
    lihatPassword: 'Lihat Password',
    sembunyikanPassword: 'Sembunyikan Password',
    namaToko: 'Nama Toko',
    jenisToko: 'Jenis Toko',
    deskripsi: 'Deskripsi Toko',
    linkToko: 'Link Toko',
    metodePembayaran: 'Metode Pembayaran',
    uploadProduk: 'Upload Produk',
    kelolaProduk: 'Kelola Produk',
    trackingPengiriman: 'Tracking Pengiriman',
    chatDriver: 'Chat Driver',
    pilihDriver: 'Pilih Driver',
    driverTerdekat: 'Driver Terdekat',
    estimasiWaktu: 'Estimasi Waktu',
    biayaPengiriman: 'Biaya Pengiriman',
    kirimPesan: 'Kirim Pesan',
    // Marketplace Specific
    marketplaceTitle: 'Marketplace UMKM Indonesia',
    marketplaceSubtitle: 'Temukan berbagai produk lokal berkualitas dari seluruh Indonesia. Dukung UMKM, bangga buatan lokal.',
    tambahProduk: 'Tambah Produk',
    cariProduk: '🔍 Cari produk, toko, atau deskripsi...',
    kategori: 'Kategori',
    semuaKategori: 'Semua Kategori',
    urutkan: 'Urutkan',
    palingPopuler: 'Paling Populer',
    terbaru: 'Terbaru',
    hargaTerendah: 'Harga Terendah',
    hargaTertinggi: 'Harga Tertinggi',
    tidakAdaProduk: 'Tidak Ada Produk',
    cobaUbahFilter: 'Coba ubah filter atau kata kunci pencarian Anda',
    resetFilter: 'Reset Filter',
    terjual: 'terjual',
    beli: 'Beli',
    add: 'Add'
  },
  en: {
    title: 'Indonesian Digital UMKM Marketplace Platform',
    subtitle: 'Grow your business easily. Create professional online stores, manage products, and reach more customers with an integrated marketplace system.',
    daftar: 'Register',
    login: 'Login',
    mulaiSekarang: 'Get Started',
    orderOjek: 'Order Taxi',
    belumPunyaAkun: "Don't have an account? Register here",
    lihatPassword: 'Show Password',
    sembunyikanPassword: 'Hide Password',
    namaToko: 'Store Name',
    jenisToko: 'Store Type',
    deskripsi: 'Store Description',
    linkToko: 'Store Link',
    metodePembayaran: 'Payment Methods',
    uploadProduk: 'Upload Products',
    kelolaProduk: 'Manage Products',
    trackingPengiriman: 'Delivery Tracking',
    chatDriver: 'Chat Driver',
    pilihDriver: 'Select Driver',
    driverTerdekat: 'Nearest Driver',
    estimasiWaktu: 'Estimated Time',
    biayaPengiriman: 'Delivery Cost',
    kirimPesan: 'Send Message',
    // Marketplace Specific
    marketplaceTitle: 'Indonesian MSME Marketplace',
    marketplaceSubtitle: 'Discover quality local products from all over Indonesia. Support MSMEs, proud of local products.',
    tambahProduk: 'Add Product',
    cariProduk: '🔍 Search products, stores, or descriptions...',
    kategori: 'Category',
    semuaKategori: 'All Categories',
    urutkan: 'Sort By',
    palingPopuler: 'Most Popular',
    terbaru: 'Newest',
    hargaTerendah: 'Lowest Price',
    hargaTertinggi: 'Highest Price',
    tidakAdaProduk: 'No Products Found',
    cobaUbahFilter: 'Try changing your filters or search keywords',
    resetFilter: 'Reset Filter',
    terjual: 'sold',
    beli: 'Buy',
    add: 'Add'
  }
}

export const mockCouriers: Courier[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    type: 'Ompreng',
    vehicle: 'Honda Beat',
    zone: 'Jakarta Pusat',
    status: 'online',
    lat: -6.2088,
    lng: 106.8456,
    phone: '+62812345678',
    rating: 4.8,
    completedOrders: 156,
    score: 1200
  },
  {
    id: '2',
    name: 'Ahmad Fauzi',
    type: 'Bentor',
    vehicle: 'Yamaha Mio',
    zone: 'Jakarta Utara',
    status: 'online',
    lat: -6.1384,
    lng: 106.8759,
    phone: '+62823456789',
    rating: 4.9,
    completedOrders: 203,
    score: 1500
  },
  {
    id: '3',
    name: 'Siti Nurhaliza',
    type: 'Deliv',
    vehicle: 'Suzuki Satria',
    zone: 'Jakarta Selatan',
    status: 'offline',
    lat: -6.2615,
    lng: 106.8106,
    phone: '+62834567890',
    rating: 4.7,
    completedOrders: 89,
    score: 900
  },
  {
    id: '4',
    name: 'Rudi Hermawan',
    type: 'Ompreng',
    vehicle: 'Honda Vario',
    zone: 'Jakarta Barat',
    status: 'busy',
    lat: -6.1751,
    lng: 106.8195,
    phone: '+62845678901',
    rating: 4.6,
    completedOrders: 267,
    score: 1100
  }
]

// --- FEATURES ---
export const featuresId = [
  {
    icon: Store,
    title: 'Toko Online Profesional',
    description: 'Buat toko online dengan brand custom, domain pilihan, dan desain responsif.'
  },
  {
    icon: ShoppingCart,
    title: 'Marketplace Terintegrasi',
    description: 'Jual produk di marketplace dengan sistem pembayaran dan pengiriman terpadu.'
  },
  {
    icon: Truck,
    title: 'Layanan Pengiriman',
    description: 'Kelola pengiriman dengan tracking real-time dan multiple kurir.'
  },
  {
    icon: CreditCard,
    title: 'Payment Gateway',
    description: 'Terima pembayaran via QRIS, transfer bank, dan e-wallet.'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Monitor penjualan, pengunjung, dan performa bisnis secara real-time.'
  },
  {
    icon: HeadphonesIcon,
    title: 'Support 24/7',
    description: 'Tim support siap membantu Anda kapan saja dibutuhkan.'
  }
]

export const featuresEn = [
  {
    icon: Store,
    title: 'Professional Online Store',
    description: 'Create an online store with custom branding, custom domain, and responsive design.'
  },
  {
    icon: ShoppingCart,
    title: 'Integrated Marketplace',
    description: 'Sell products in the marketplace with integrated payment and delivery systems.'
  },
  {
    icon: Truck,
    title: 'Delivery Service',
    description: 'Manage deliveries with real-time tracking and multiple couriers.'
  },
  {
    icon: CreditCard,
    title: 'Payment Gateway',
    description: 'Accept payments via QRIS, bank transfer, and e-wallets.'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Monitor sales, visitors, and business performance in real-time.'
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Support team ready to help you whenever needed.'
  }
]

// --- PRODUCTS ---
export const sampleProductsId: Product[] = [
  {
    name: 'Ikan Lolosi Bakar',
    category: 'Makanan & Minuman',
    price: 'Rp 75.000',
    store: 'Kuliner Manado',
    description: 'Ikan segar bakar dengan bumbu khas Manado yang lezat',
    image: '🐟',
    rating: 4.9,
    clicks: 245,
    orders: 89,
  },
  {
    name: 'Barber Home Service',
    category: 'Jasa',
    price: 'Rp 50.000',
    store: 'BarberMan Pro',
    description: 'Layanan potong rambut profesional datang ke rumah Anda',
    image: '💈',
    rating: 4.8,
    clicks: 198,
    orders: 67,
  },
  {
    name: "Tinutuan Ma'Ja",
    category: 'Makanan & Minuman',
    price: 'Rp 25.000',
    store: 'Dapur Manado',
    description: 'Bubur Manado tradisional dengan sayuran segar',
    image: '🥣',
    rating: 4.9,
    clicks: 312,
    orders: 124,
  },
  {
    name: 'Yondok Bokaka',
    category: 'Makanan & Minuman',
    price: 'Rp 35.000',
    store: 'Warung Tradisional',
    description: 'Daging babi khas Manado yang empuk dan gurih',
    image: '🥩',
    rating: 4.7,
    clicks: 156,
    orders: 52,
  },
  {
    name: 'Goroho Songara',
    category: 'Makanan & Minuman',
    price: 'Rp 30.000',
    store: 'Toko Hasil Bumi',
    description: 'Pisang goroho bakar dengan kelapa muda yang segar',
    image: '🍌',
    rating: 4.8,
    clicks: 189,
    orders: 73,
  },
  {
    name: 'Durian Bakan',
    category: 'Makanan & Minuman',
    price: 'Rp 120.000',
    store: 'Buah Segar Nusantara',
    description: 'Durian pilihan dengan daging tebal dan manis',
    image: '🥭',
    rating: 4.9,
    clicks: 267,
    orders: 98,
  },
  {
    name: 'Kaos Batik Modern',
    category: 'Fashion & Pakaian',
    price: 'Rp 150.000',
    store: 'Batik Nusantara',
    description: 'Kaos batik dengan desain modern dan nyaman dipakai',
    image: '👕',
    rating: 4.7,
    clicks: 189,
    orders: 45,
  },
  {
    name: 'Smartwatch Z10',
    category: 'Elektronik',
    price: 'Rp 850.000',
    store: 'Gadget Store',
    description: 'Smartwatch dengan fitur lengkap dan baterai tahan lama',
    image: '⌚',
    rating: 4.8,
    clicks: 456,
    orders: 134,
  },
  {
    name: 'Serum Wajah Premium',
    category: 'Kecantikan',
    price: 'Rp 250.000',
    store: 'Beauty Corner',
    description: 'Serum wajah dengan vitamin C untuk kulit cerah bersinar',
    image: '💄',
    rating: 4.8,
    clicks: 378,
    orders: 112,
  },
  {
    name: 'Vitamin C 1000mg',
    category: 'Kesehatan',
    price: 'Rp 85.000',
    store: 'Health Plus',
    description: 'Suplemen vitamin C untuk meningkatkan daya tahan tubuh',
    image: '💊',
    rating: 4.9,
    clicks: 289,
    orders: 98,
  },
  {
    name: 'Panci Set 5pcs',
    category: 'Rumah Tangga',
    price: 'Rp 450.000',
    store: 'Dapur Harmonis',
    description: 'Set panci anti lengket dengan kualitas premium',
    image: '🍳',
    rating: 4.7,
    clicks: 167,
    orders: 56,
  },
  {
    name: 'Jasa Desain Logo',
    category: 'Jasa',
    price: 'Rp 200.000',
    store: 'Creative Studio',
    description: 'Desain logo profesional untuk branding bisnis Anda',
    image: '🎨',
    rating: 4.8,
    clicks: 234,
    orders: 67,
  }
]

export const sampleProductsEn: Product[] = [
  {
    name: 'Grilled Lolosi Fish',
    category: 'Food & Beverage',
    price: 'Rp 75.000',
    store: 'Manado Culinary',
    description: 'Fresh grilled fish with delicious Manado spices',
    image: '🐟',
    rating: 4.9,
    clicks: 245,
    orders: 89,
  },
  {
    name: 'Barber Home Service',
    category: 'Services',
    price: 'Rp 50.000',
    store: 'BarberMan Pro',
    description: 'Professional hair cutting service at your home',
    image: '💈',
    rating: 4.8,
    clicks: 198,
    orders: 67,
  },
  {
    name: "Tinutuan Ma'Ja",
    category: 'Food & Beverage',
    price: 'Rp 25.000',
    store: 'Manado Kitchen',
    description: 'Traditional Manado porridge with fresh vegetables',
    image: '🥣',
    rating: 4.9,
    clicks: 312,
    orders: 124,
  },
  {
    name: 'Yondok Bokaka',
    category: 'Food & Beverage',
    price: 'Rp 35.000',
    store: 'Traditional Warung',
    description: 'Tender and savory Manado style pork',
    image: '🥩',
    rating: 4.7,
    clicks: 156,
    orders: 52,
  },
  {
    name: 'Goroho Songara',
    category: 'Food & Beverage',
    price: 'Rp 30.000',
    store: 'Earth Harvest Shop',
    description: 'Fried goroho banana with fresh young coconut',
    image: '🍌',
    rating: 4.8,
    clicks: 189,
    orders: 73,
  },
  {
    name: 'Durian Bakan',
    category: 'Food & Beverage',
    price: 'Rp 120.000',
    store: 'Fresh Fruit Nusantara',
    description: 'Selected durian with thick and sweet flesh',
    image: '🥭',
    rating: 4.9,
    clicks: 267,
    orders: 98,
  },
  {
    name: 'Modern Batik Shirt',
    category: 'Fashion & Clothing',
    price: 'Rp 150.000',
    store: 'Batik Nusantara',
    description: 'Batik shirt with modern design and comfortable to wear',
    image: '👕',
    rating: 4.7,
    clicks: 189,
    orders: 45,
  },
  {
    name: 'Smartwatch Z10',
    category: 'Electronics',
    price: 'Rp 850.000',
    store: 'Gadget Store',
    description: 'Smartwatch with full features and long battery life',
    image: '⌚',
    rating: 4.8,
    clicks: 456,
    orders: 134,
  },
  {
    name: 'Premium Face Serum',
    category: 'Beauty',
    price: 'Rp 250.000',
    store: 'Beauty Corner',
    description: 'Face serum with Vitamin C for bright glowing skin',
    image: '💄',
    rating: 4.8,
    clicks: 378,
    orders: 112,
  },
  {
    name: 'Vitamin C 1000mg',
    category: 'Health',
    price: 'Rp 85.000',
    store: 'Health Plus',
    description: 'Vitamin C supplement to boost immune system',
    image: '💊',
    rating: 4.9,
    clicks: 289,
    orders: 98,
  },
  {
    name: 'Cookware Set 5pcs',
    category: 'Household',
    price: 'Rp 450.000',
    store: 'Harmonious Kitchen',
    description: 'Non-stick cookware set with premium quality',
    image: '🍳',
    rating: 4.7,
    clicks: 167,
    orders: 56,
  },
  {
    name: 'Logo Design Service',
    category: 'Services',
    price: 'Rp 200.000',
    store: 'Creative Studio',
    description: 'Professional logo design for your business branding',
    image: '🎨',
    rating: 4.8,
    clicks: 234,
    orders: 67,
  }
]


// --- STATS ---
export const statsId = [
  { number: '10,000+', label: 'UMKM Bergabung', icon: Store },
  { number: '50,000+', label: 'Produk Terjual', icon: ShoppingCart },
  { number: '100+', label: 'Kota Tercover', icon: MapPin },
  { number: '24/7', label: 'Support', icon: HeadphonesIcon }
]

export const statsEn = [
  { number: '10,000+', label: 'MSMEs Joined', icon: Store },
  { number: '50,000+', label: 'Products Sold', icon: ShoppingCart },
  { number: '100+', label: 'Cities Covered', icon: MapPin },
  { number: '24/7', label: 'Support', icon: HeadphonesIcon }
]


// --- PACKAGES ---
export const websitePackagesId: WebsitePackage[] = [
  {
    name: 'Paket Pemula',
    price: 'Rp 250.000',
    pages: '1 Page',
    domain: 'Domain Random',
    features: [
      '1 halaman landing page',
      'Domain random (.site / .web)',
      'Design simple & cepat',
      'Mobile friendly',
      'Cocok untuk coba-coba bisnis'
    ],
    type: 'pemula'
  },
  {
    name: 'Paket Starter',
    price: 'Rp 500.000',
    pages: '1 Page',
    domain: 'Domain sesuai nama',
    features: [
      '1 halaman website',
      'Domain sesuai nama usaha',
      'Desain lebih rapi',
      'Mobile friendly',
      'Cocok untuk UMKM kecil'
    ],
    type: 'starter'
  },
  {
    name: 'Paket Standard',
    price: 'Rp 1.500.000',
    pages: '1–3 Pages',
    domain: '.com',
    features: [
      '1–3 halaman website',
      'Domain .com',
      'Desain profesional',
      'SEO basic',
      'Fast loading'
    ],
    type: 'standard'
  },
  {
    name: 'Paket Pro',
    price: 'Rp 5.000.000',
    pages: '1–5 Pages',
    domain: 'Sesuai request',
    features: [
      '1–5 halaman',
      'Domain sesuai request',
      'UI/UX profesional',
      'SEO optimasi',
      'Fast loading'
    ],
    type: 'pro'
  },
  {
    name: 'Paket Advance',
    price: 'Rp 10.000.000',
    pages: '5–10 Pages',
    domain: '2 Domain + backlink',
    features: [
      '5–10 halaman website',
      '2 domain',
      'Backlink',
      'SEO optimasi',
      'Fast performance'
    ],
    type: 'advance'
  },
  {
    name: 'Paket Enterprise',
    price: 'Hubungi Kami',
    pages: '15 - 50 Juta IDR',
    domain: 'Unlimited & International',
    features: [
      'Unlimited Pro Saas',
      'International Standard (Website 2.5)',
      'Unlimited halaman',
      '2–5 domain backup',
      'SEO full, Fast loading',
      'API integration & Backup data',
      'Multi bahasa & Multi Currency',
      'Maps & Message integration',
      'Support Prioritas 1 tahun',
      'International ready',
      'Custom Development'
    ],
    type: 'enterprise'
  }
]

export const websitePackagesEn: WebsitePackage[] = [
  {
    name: 'Beginner Package',
    price: 'Rp 250.000',
    pages: '1 Page',
    domain: 'Random Domain',
    features: [
      '1 landing page',
      'Random domain (.site / .web)',
      'Simple & fast design',
      'Mobile friendly',
      'Suitable for business trial'
    ],
    type: 'pemula'
  },
  {
    name: 'Starter Package',
    price: 'Rp 500.000',
    pages: '1 Page',
    domain: 'Custom Named Domain',
    features: [
      '1 website page',
      'Domain matching business name',
      'Neater design',
      'Mobile friendly',
      'Suitable for small MSMEs'
    ],
    type: 'starter'
  },
  {
    name: 'Standard Package',
    price: 'Rp 1.500.000',
    pages: '1–3 Pages',
    domain: '.com',
    features: [
      '1–3 website pages',
      'Domain .com',
      'Professional design',
      'Basic SEO',
      'Fast loading'
    ],
    type: 'standard'
  },
  {
    name: 'Pro Package',
    price: 'Rp 5.000.000',
    pages: '1–5 Pages',
    domain: 'As requested',
    features: [
      '1–5 pages',
      'Domain as requested',
      'Professional UI/UX',
      'SEO optimization',
      'Fast loading'
    ],
    type: 'pro'
  },
  {
    name: 'Advance Package',
    price: 'Rp 10.000.000',
    pages: '5–10 Pages',
    domain: '2 Domains + backlink',
    features: [
      '5–10 website pages',
      '2 domains',
      'Backlink',
      'SEO optimization',
      'Fast performance'
    ],
    type: 'advance'
  },
  {
    name: 'Enterprise Package',
    price: 'Contact Us',
    pages: '15 - 50 Million IDR',
    domain: 'Unlimited & International',
    features: [
      'Unlimited Pro Saas',
      'International Standard (Website 2.5)',
      'Unlimited pages',
      '2–5 backup domains',
      'Full SEO, Fast loading',
      'API integration & Data backup',
      'Multi-language & Multi-Currency',
      'Maps & Message integration',
      'Priority Support 1 year',
      'International ready',
      'Custom Development'
    ],
    type: 'enterprise'
  }
]

// --- STEPS ---
export const howItWorksStepsId = [
  {
    number: '1',
    title: 'Daftar Gratis',
    description: 'Pilih role Anda sebagai Pembeli, Penjual, atau Pengirim dan lengkapi data diri untuk memulai.',
    icon: User,
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: '2',
    title: 'Setup Profil',
    description: 'Untuk penjual: buat toko dengan nama custom. Untuk pengirim: upload informasi kendaraan.',
    icon: Map,
    color: 'from-green-500 to-green-600'
  },
  {
    number: '3',
    title: 'Upload Produk',
    description: 'Tambahkan produk dengan foto, harga, dan deskripsi. Atur pengiriman untuk setiap item.',
    icon: Building2, // Replaced Package with Building2 as Package is not imported or maybe use Box? using Building2 for now as placeholder or re-import Package
    color: 'from-purple-500 to-purple-600'
  },
  {
    number: '4',
    title: 'Mulai Jual',
    description: 'Terima order, proses pembayaran, dan kirim produk. Kelola bisnis dari dashboard.',
    icon: TrendingUp,
    color: 'from-red-500 to-red-600'
  }
]

export const howItWorksStepsEn = [
  {
    number: '1',
    title: 'Register Free',
    description: 'Choose your role as Buyer, Seller, or Courier and complete your profile to start.',
    icon: User,
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: '2',
    title: 'Setup Profile',
    description: 'For sellers: create a store with a custom name. For couriers: upload vehicle information.',
    icon: Map,
    color: 'from-green-500 to-green-600'
  },
  {
    number: '3',
    title: 'Upload Product',
    description: 'Add products with photos, prices, and descriptions. Set shipping for each item.',
    icon: Building2,
    color: 'from-purple-500 to-purple-600'
  },
  {
    number: '4',
    title: 'Start Selling',
    description: 'Receive orders, process payments, and ship products. Manage business from dashboard.',
    icon: TrendingUp,
    color: 'from-red-500 to-red-600'
  }
]

export const websiteTypes = [
  { type: 'personal', icon: User, name: 'Website Orang/Tokoh' },
  { type: 'fruits', icon: Apple, name: 'Jualan Buah/Sayur' },
  { type: 'coffee', icon: Coffee, name: 'Kedai Kopi' },
  { type: 'shop', icon: Building2, name: 'Toko Online' },
  { type: 'office', icon: Building2, name: 'Kantor' },
  { type: 'company', icon: Building2, name: 'Perusahaan' }
]
