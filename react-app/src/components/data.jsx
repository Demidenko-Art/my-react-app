const products = [
  // ПК
  { 
    id: 1, category: "PC", name: "CORE I5 13400 / RTX 3060 / V3", price: 59014, oldPrice: 61966, fps: 78, 
    specs: ["Intel Core i5-13400F", "GeForce RTX 3060, 12GB", "32GB (16GBx2) DDR4 3200 MHz", "Gigabyte B760M DS3H DDR4", "SSD M.2 1TB / WD Blue SN580"],
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=400"
  },
  { 
    id: 2, category: "PC", name: "RYZEN 5 7500F / RTX 4060 TI", price: 73047, oldPrice: 76700, fps: 97,
    specs: ["AMD Ryzen 5 7500F", "GeForce RTX 4060 Ti, 8GB", "32GB (16GBx2) DDR5 5600", "ASRock A620M PRO RS", "SSD M.2 1TB / WD Blue SN580"],
    image: "https://files.gamingpc.com.ua/image/cache/770x510/2df98ff624736de01044ceea1f20f466.webp"
  },
  { 
    id: 3, category: "PC", name: "CORE ULTRA 7 265K / RTX 4070", price: 108534, oldPrice: 113961, fps: 106,
    specs: ["Intel Core Ultra 7 265KF", "GeForce RTX 4070, 12GB", "32GB (16GBx2) DDR5 5600", "ASRock Z890 PRO-A", "SSD M.2 1TB / WD Blue SN580"],
    image: "https://images.prom.ua/6694891516_igrovij-pk-kompyuter.jpg"
  },
  { 
    id: 4, category: "PC", name: "RYZEN 7 9800X3D / RTX 4080", price: 145200, oldPrice: 152000, fps: 145,
    specs: ["AMD Ryzen 7 9800X3D", "GeForce RTX 4080, 16GB", "32GB (16GBx2) DDR5 6000", "Gigabyte B650M Gaming Plus", "SSD M.2 2TB / WD Black"],
    image: "https://files.gamingpc.com.ua/image/cache/full/ec2e24610a63f36b7ae9569ca48bd645.webp"
  },
  { 
    id: 14, category: "PC", name: "CORE I5 14400 / RTX 4070 / V2", price: 90252, oldPrice: 94765, fps: 91,
    specs: ["Intel Core i5-14400F", "GeForce RTX 4070, 12GB", "32GB (16GBx2) DDR5 5600", "Asus Prime B760M-Plus", "SSD M.2 1TB / WD Blue SN580"],
    image: "https://files.gamingpc.com.ua/image/cache/770x510/a220787d0278747844926b6da7c04ef1.webp"
  },
  { 
    id: 15, category: "PC", name: "CORE ULTRA 7 265K / RTX 4070 TI", price: 115000, oldPrice: 121000, fps: 122,
    specs: ["Intel Core Ultra 7 265KF", "GeForce RTX 4070 Ti, 16GB", "32GB (16GBx2) DDR5 5600", "ASRock Z890 PRO-A", "SSD M.2 1TB / WD Blue SN580"],
    image: "https://files.gamingpc.com.ua/image/cache/770x510/131dae98dcbf3feaa13fee4d719a4156.webp"
  },
  { 
    id: 16, category: "PC", name: "RYZEN 9 9900X / RTX 4090", price: 198000, oldPrice: 210000, fps: 178,
    specs: ["AMD Ryzen 9 9900X", "GeForce RTX 4090, 24GB", "64GB (32GBx2) DDR5 6400", "ASUS ROG Crosshair X870E", "SSD M.2 4TB / WD Black SN850X"],
    image: "https://files.gamingpc.com.ua/image/cache/770x510/16dbe48b445daece8abb75a9aa1c44ef.webp"
  },

  // МИШКИ
  { 
    id: 5, category: "Mouse", name: "Logitech G Pro X Superlight 2", price: 6200, oldPrice: 6999, 
    description: "Легендарна мишка для кіберспорту. Вага всього 60г, сенсор HERO 2. Ідеальна для шутерів.",
    image: "https://content.rozetka.com.ua/goods/images/big/594807035.png"
  },
  { 
    id: 6, category: "Mouse", name: "Ajazz AJ199 Dual Mode", price: 1850, oldPrice: 2100,
    description: "Бюджетний топ з топовим сенсором PAW3395. Ультралегка та ергономічна форма.",
    image: "https://www.ipopularshop.com/cdn/shop/files/DSC06955.jpg?v=1689566939&width=1445"
  },
  { 
    id: 7, category: "Mouse", name: "Razer DeathAdder V3 Pro", price: 5800, oldPrice: 6200,
    description: "Для тих, хто цінує класичну форму та максимальну продуктивність. 30K DPI сенсор.",
    image: "https://www.3ona51.com/images/products/gaming-mouses/razer-deathadder-v3-pro-wireless-black-rz01-04630100_r3g1/600.jpg"
  },
  { 
    id: 17, category: "Mouse", name: "Zowie EC2-C", price: 3200, oldPrice: 3500,
    description: "Мишка від BenQ для справжніх кіберспортсменів. Без драйверів, plug & play.",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSy8xKC-g-Tmt-GEbf6lQjP50FT6Rr8m0sOK1dLHc8Mnj3ufLWMOptIKSfx7aT38PKjai2iX5eHteogL-IrGpwnyINcwZewpsLRdRA4bFB-yHFHt41o8Cv_"
  },
  { 
    id: 18, category: "Mouse", name: "Pulsar X2 Mini Wireless", price: 4100, oldPrice: 4500,
    description: "Симетрична бездротова мишка 55г. Сенсор PAW3395, 26000 DPI, затримка 1мс.",
    image: "https://img.telemart.ua/727575-895932/hator-pulsar-3-wireless-htm631-white.jpg"
  },

  // КЛАВІАТУРИ
  { 
    id: 8, category: "Keyboard", name: "Ajazz K820 RGB Mechanical", price: 2450, oldPrice: 2800,
    description: "Механічна клавіатура з Hot-Swap та яскравою RGB підсвіткою. Свічі Gateron.",
    image: "https://cdn.shopify.com/s/files/1/0631/9590/6271/files/AJAZZ_AK820_V2_Mechanical_Keyboarda.jpg?v=1772616256"
  },
  { 
    id: 9, category: "Keyboard", name: "Logitech G915 TKL Wireless", price: 8900, oldPrice: 9500,
    description: "Низькопрофільна механіка преміум класу. Металевий корпус, LIGHTSPEED.",
    image: "https://logitech.com.ua/image/catalog/product/g915/g915tlk-1.webp"
  },
  { 
    id: 10, category: "Keyboard", name: "Varmilo VA87M Summit", price: 6100, oldPrice: 6500,
    description: "Мистецтво на вашому столі. Найкращі стабілізатори та PBT кейкапи.",
    image: "https://mzimg.com/big/p1/gsycdb0ipp1.jpg"
  },
  { 
    id: 19, category: "Keyboard", name: "Wooting 60HE", price: 7800, oldPrice: 8500,
    description: "Аналогові свічі Lekker, rapid trigger 0.1мм. Революція для шутерів.",
    image: "https://content.rozetka.com.ua/goods/images/big/587732335.jpg"
  },

  // НАВУШНИКИ
  { 
    id: 11, category: "Headset", name: "Logitech G Pro X Wireless", price: 7800, oldPrice: 8500,
    description: "Технологія Blue VO!CE для ідеального мікрофона. Бездротовий зв'язок Lightspeed.",
    image: "https://content1.rozetka.com.ua/goods/images/big/359744446.jpg"
  },
  { 
    id: 12, category: "Headset", name: "HyperX Cloud Alpha S", price: 4200, oldPrice: 4600,
    description: "Об'ємний звук 7.1 та двокамерні динаміки для кришталевого звуку.",
    image: "https://i.ytimg.com/vi/dxIjSGrp-sY/maxresdefault.jpg"
  },
  { 
    id: 13, category: "Headset", name: "SteelSeries Arctis Nova Pro", price: 12500, oldPrice: 13900,
    description: "Аудіофільська якість звуку в ігровій гарнітурі. Активне шумозаглушення.",
    image: "https://www.aks.ua/images/products/425b1fc4684d24d0299fcde81535a201_large.webp"
  },
  { 
    id: 20, category: "Headset", name: "Razer BlackShark V2 Pro", price: 6900, oldPrice: 7500,
    description: "THX Spatial Audio, бездротовий зв'язок 2.4GHz. Відстегний мікрофон.",
    image: "https://content1.rozetka.com.ua/goods/images/big/426960585.jpg"
  },

  // МОНІТОРИ
  { 
    id: 21, category: "Monitor", name: "LG 27GP850-B 27\" 165Hz IPS", price: 14500, oldPrice: 16000,
    description: "IPS панель, 1ms GtG, 165Hz, QHD 2560x1440. Ідеальний баланс ціни та якості.",
    image: "https://content1.rozetka.com.ua/goods/images/big/635212499.jpg"
  },
  { 
    id: 22, category: "Monitor", name: "ASUS ROG Swift 360Hz PG259QN", price: 28900, oldPrice: 32000,
    description: "360Hz IPS, 1ms, Full HD. Для тих, хто грає на профрівні. G-Sync Compatible.",
    image: "https://cdn.synthetic.com.ua/media/assets/images/2/9/8/c/e/a/0/f/2/1/2/d/4/7/5/8/1600x1600/298cea0f212d47589821d77ca3a76626.jpg"
  },
  { 
    id: 23, category: "Monitor", name: "Samsung Odyssey G7 32\" 240Hz", price: 22000, oldPrice: 25000,
    description: "Curved VA 1000R, 240Hz, 1ms, QHD. Захоплюючий ігровий досвід.",
    image: "https://notebooker.ua/upload/resize_cache/iblock/99f/500_500_140cd750bba9870f18aada2478b24840a/myd4zjppy57wxgxu3jwbh2yrplrh77s3.png"
  },

  // КОВРИКИ
  { 
    id: 24, category: "Mousepad", name: "Logitech G840 XL", price: 1900, oldPrice: 2200,
    description: "Великий ігровий килимок 900x400мм. Рівна поверхня для стабільного ковзання.",
    image: "https://content.rozetka.com.ua/goods/images/big/563149984.webp"
  },
  { 
    id: 25, category: "Mousepad", name: "Artisan Hien XSoft XL", price: 3200, oldPrice: 3500,
    description: "Японський преміум килимок. Тканина Hien для максимально швидкого ковзання.",
    image: "https://content.rozetka.com.ua/goods/images/big/479861576.jpg"
  },
];

export default products;
