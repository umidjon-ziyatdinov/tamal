export interface Product {
    id: number;
    name: string;
    sku: string;  // Stock Keeping Unit for inventory management
    brand: string; // Manufacturer/Brand name

    // Pricing & Units
    price: {
        value: number;
        unit: "piece" | "m2" | "m3" | "kg" | "ton" | "bag" | "pallet" | "meter";
        bulkPrices?: {
            quantity: number;
            price: number;
        }[];
    };

    // Stock & Availability
    stock: {
        available: number;
        minOrder: number;
        maxOrder: number;
        leadTime?: string; // Estimated delivery time for out-of-stock items
        warehouse: string; // Location of the stock
    };

    // Technical Specifications
    specifications: {
        dimensions?: {
            length?: number;
            width?: number;
            height?: number;
            unit: "mm" | "cm" | "m";
        };
        weight?: {
            value: number;
            unit: "kg" | "ton";
        };
        material?: string;
        strength?: string; // For concrete, steel, etc.
        grade?: string;    // Material grade/class
        manufacturer?: string;
        countryOfOrigin: string;
        certificates?: string[]; // GOST, ISO, etc.
    };

    // Categorization
    category: {
        main: string;     // e.g., "Строительные материалы"
        sub: string;      // e.g., "Цемент"
        type?: string;    // More specific categorization
    };

    // Media
    images: {
        main: string;
        gallery?: string[];
        technical?: string[]; // Technical drawings, specifications
    };

    // Documentation
    documents?: {
        type: "certificate" | "manual" | "technical_data" | "safety_data";
        url: string;
        name: string;
    }[];

    // Application & Usage
    applications?: string[];  // Recommended uses
    storage?: string;       // Storage requirements
    handling?: string;      // Handling instructions

    // Marketing & SEO
    description: {
        short: string;
        full: string;
        technical?: string;
    };
    tags: string[];

    // Customer Reviews & Ratings
    rating?: {
        average: number;
        count: number;
        reviews?: {
            author: string;
            rating: number;
            comment: string;
            date: string;
            verified: boolean;
        }[];
    };

    // Sales & Status
    status?: {
        inStock: boolean;
        isNew?: boolean;
        onSale?: {
            discountPercent: number;
            endDate: string;
        };
        discontinued?: boolean;
    };

    // Related Products
    relatedProducts?: {
        complementary?: number[]; // IDs of complementary products
        similar?: number[];      // IDs of similar products
        required?: number[];     // IDs of required additional products
    };

    // Delivery Options
    delivery?: {
        methods: {
            type: "pickup" | "delivery";
            price: number;
            estimatedDays: number;
        }[];
        restrictions?: string[];
    };

    // Update & Creation timestamps
    createdAt: string;
    updatedAt: string;
}

export const FAKE_PRODUCTS: Product[] = [
    // Строительные материалы -> Цемент
    {
        id: 1,
        name: "Цемент М400",
        sku: "CEM400001",
        brand: "StroyTech",
        price: {
            value: 350,
            unit: "bag",
            bulkPrices: [
                { quantity: 10, price: 330 },
                { quantity: 50, price: 310 }
            ]
        },
        stock: {
            available: 500,
            minOrder: 1,
            maxOrder: 100,
            warehouse: "Москва"
        },
        specifications: {
            material: "Цемент",
            strength: "М400",
            countryOfOrigin: "Россия"
        },
        category: {
            main: "Строительные материалы",
            sub: "Цемент"
        },
        images: {
            main: "/images/cement_m400.jpg",
            gallery: ["/images/cement_m400_1.jpg"]
        },
        applications: ["Используется для бетонных конструкций", "Для укладки полов"],
        description: {
            short: "Цемент марки М400 для строительных работ.",
            full: "Цемент М400 является одним из самых популярных строительных материалов для создания прочных бетонных конструкций. Идеален для фундамента, полов, стен."
        },
        tags: ["Цемент", "Строительство", "Бетон"],
        createdAt: "2024-12-26T08:00:00Z",
        updatedAt: "2024-12-26T08:00:00Z"
    },
    // Строительные материалы -> Песок
    {
        id: 2,
        name: "Песок строительный, 0-5 мм",
        sku: "SAND0050002",
        brand: "TechSand",
        price: {
            value: 150,
            unit: "ton"
        },
        stock: {
            available: 1000,
            minOrder: 1,
            maxOrder: 50,
            warehouse: "Санкт-Петербург"
        },
        specifications: {
            material: "Песок",
            countryOfOrigin: "Россия"
        },
        category: {
            main: "Строительные материалы",
            sub: "Песок"
        },
        images: {
            main: "/images/sand_0-5mm.jpg",
            gallery: ["/images/sand_0-5mm_1.jpg"]
        },
        applications: ["Для бетона", "Для выравнивания поверхностей"],
        description: {
            short: "Строительный песок фракции 0-5 мм для различных строительных работ.",
            full: "Этот песок идеально подходит для создания качественного бетона и выравнивания поверхностей. Применяется в строительных и дорожных работах."
        },
        tags: ["Песок", "Строительство", "Бетон"],
        createdAt: "2024-12-26T08:00:00Z",
        updatedAt: "2024-12-26T08:00:00Z"
    },
    // Строительные материалы -> Щебень
    {
        id: 3,
        name: "Щебень 5-20 мм",
        sku: "GRAVEL0520003",
        brand: "StoneTech",
        price: {
            value: 500,
            unit: "ton"
        },
        stock: {
            available: 800,
            minOrder: 1,
            maxOrder: 30,
            warehouse: "Казань"
        },
        specifications: {
            material: "Щебень",
            countryOfOrigin: "Россия"
        },
        category: {
            main: "Строительные материалы",
            sub: "Щебень"
        },
        images: {
            main: "/images/gravel_5-20mm.jpg",
            gallery: ["/images/gravel_5-20mm_1.jpg"]
        },
        applications: ["Для дорожных работ", "Для фундаментов"],
        description: {
            short: "Щебень фракции 5-20 мм для строительства и дорожных работ.",
            full: "Щебень идеально подходит для создания прочных и надежных фундаментов, а также для укладки дорожных покрытий. Хорошо удерживает воду и воздухопроницаем."
        },
        tags: ["Щебень", "Строительство", "Дороги"],
        createdAt: "2024-12-26T08:00:00Z",
        updatedAt: "2024-12-26T08:00:00Z"
    },
    // Строительные материалы -> Кирпич
    {
        id: 4,
        name: "Кирпич красный одинарный",
        sku: "BRICK001004",
        brand: "BrickMaster",
        price: {
            value: 20,
            unit: "piece"
        },
        stock: {
            available: 2000,
            minOrder: 10,
            maxOrder: 500,
            warehouse: "Ростов-на-Дону"
        },
        specifications: {
            material: "Глина",
            strength: "М150",
            countryOfOrigin: "Россия"
        },
        category: {
            main: "Строительные материалы",
            sub: "Кирпич"
        },
        images: {
            main: "/images/brick_red.jpg",
            gallery: ["/images/brick_red_1.jpg"]
        },
        applications: ["Для строительства стен", "Для кладки"],
        description: {
            short: "Красный кирпич одинарный для возведения стен.",
            full: "Кирпич из высококачественной глины, предназначен для строительства стен и наружных конструкций. Идеален для создания прочных и долговечных зданий."
        },
        tags: ["Кирпич", "Строительство", "Глина"],
        createdAt: "2024-12-26T08:00:00Z",
        updatedAt: "2024-12-26T08:00:00Z"
    },
    // Отделочные материалы -> Ламинат
    {
        id: 5,
        name: "Ламинат, Дуб Экспресс",
        sku: "LAMINATE_EX1235",
        brand: "HomeFloor",
        price: {
            value: 500,
            unit: "m2"
        },
        stock: {
            available: 150,
            minOrder: 5,
            maxOrder: 50,
            warehouse: "Воронеж"
        },
        specifications: {
            material: "Ламинат",
            countryOfOrigin: "Россия"
        },
        category: {
            main: "Отделочные материалы",
            sub: "Ламинат"
        },
        images: {
            main: "/images/laminate_dub.jpg",
            gallery: ["/images/laminate_dub_1.jpg"]
        },
        applications: ["Для полов в жилых помещениях", "Для офисов"],
        description: {
            short: "Ламинат в стиле дуб Экспресс для современных интерьеров.",
            full: "Этот ламинат с текстурой дуба Экспресс идеально подходит для укладки в любых помещениях. Прост в уходе и монтаже."
        },
        tags: ["Ламинат", "Отделка", "Пол"],
        createdAt: "2024-12-26T08:00:00Z",
        updatedAt: "2024-12-26T08:00:00Z"
    },
    // Отделочные материалы -> Плитка
    {
        id: 6,
        name: "Плитка керамическая, Белый глянец",
        sku: "TILE_WHITE001",
        brand: "TileMaster",
        price: {
            value: 300,
            unit: "m2"
        },
        stock: {
            available: 500,
            minOrder: 1,
            maxOrder: 100,
            warehouse: "Калуга"
        },
        specifications: {
            material: "Керамика",
            countryOfOrigin: "Россия"
        },
        category: {
            main: "Отделочные материалы",
            sub: "Плитка"
        },
        images: {
            main: "/images/tile_white.jpg",
            gallery: ["/images/tile_white_1.jpg"]
        },
        applications: ["Для укладки на стены", "Для полов в ванной"],
        description: {
            short: "Керамическая плитка белого цвета для стен и пола.",
            full: "Плитка с глянцевой поверхностью, идеально подходит для укладки в ванных комнатах и кухнях. Легко очищается и обладает высокой износостойкостью."
        },
        tags: ["Плитка", "Керамика", "Отделка"],
        createdAt: "2024-12-26T08:00:00Z",
        updatedAt: "2024-12-26T08:00:00Z"
    },
    // Сантехника -> Унитазы
    {
        id: 7,
        name: "Унитаз с бачком, Белый",
        sku: "TOILET_WHITE123",
        brand: "Sanita",
        price: {
            value: 2500,
            unit: "piece"
        },
        stock: {
            available: 100,
            minOrder: 1,
            maxOrder: 10,
            warehouse: "Москва"
        },
        specifications: {
            material: "Фаянс",
            countryOfOrigin: "Россия"
        },
        category: {
            main: "Сантехника",
            sub: "Унитазы"
        },
        images: {
            main: "/images/toilet_white.jpg",
            gallery: ["/images/toilet_white_1.jpg"]
        },
        applications: ["Для установки в ванных комнатах", "Для общественных туалетов"],
        description: {
            short: "Унитаз с бачком белого цвета для ванной комнаты.",
            full: "Эргономичный и современный унитаз с бачком из фаянса. Легко очищается, обладает высокой прочностью и долгим сроком службы."
        },
        tags: ["Сантехника", "Унитаз", "Белый"],
        createdAt: "2024-12-26T08:00:00Z",
        updatedAt: "2024-12-26T08:00:00Z"
    },
    // Сантехника -> Раковины
    {
        id: 8,
        name: "Раковина встраиваемая, Белый",
        sku: "SINK_BUILTIN123",
        brand: "Sanita",
        price: {
            value: 1500,
            unit: "piece"
        },
        stock: {
            available: 200,
            minOrder: 1,
            maxOrder: 10,
            warehouse: "Самара"
        },
        specifications: {
            material: "Фаянс",
            countryOfOrigin: "Россия"
        },
        category: {
            main: "Сантехника",
            sub: "Раковины"
        },
        images: {
            main: "/images/sink_built_in.jpg",
            gallery: ["/images/sink_built_in_1.jpg"]
        },
        applications: ["Для установки в ванную комнату", "Для кухни"],
        description: {
            short: "Встраиваемая раковина белого цвета.",
            full: "Элегантная и удобная встраиваемая раковина, подходящая для любых интерьеров. Простая в установке и уходе."
        },
        tags: ["Сантехника", "Раковина", "Белый"],
        createdAt: "2024-12-26T08:00:00Z",
        updatedAt: "2024-12-26T08:00:00Z"
    },
    {
        id: 11,
        name: "Цемент марки M400",
        sku: "CEM-M400-01",
        brand: "Holcim",
        price: {
            value: 1200,
            unit: "bag",
            bulkPrices: [
                { quantity: 10, price: 1100 },
                { quantity: 50, price: 1000 },
            ],
        },
        stock: {
            available: 500,
            minOrder: 1,
            maxOrder: 100,
            warehouse: "Москва",
        },
        specifications: {
            material: "Цемент",
            strength: "M400",
            countryOfOrigin: "Россия",
        },
        category: {
            main: "Строительные материалы",
            sub: "Цемент",
        },
        images: {
            main: "cement-m400.jpg",
            gallery: ["cement-m400-1.jpg", "cement-m400-2.jpg"],
        },
        description: {
            short: "Цемент марки M400 для строительных работ.",
            full: "Цемент марки M400 предназначен для выполнения различных строительных работ, включая армирование и заливку фундамента. Обладает высокой прочностью и устойчивостью к морозам.",
        },
        tags: ["цемент", "строительные материалы", "M400"],
        createdAt: "2024-12-25T10:00:00Z",
        updatedAt: "2024-12-25T10:00:00Z",
    },
    {
        id: 12,
        name: "Ламинат с текстурой дуба",
        sku: "LAM-DUB-02",
        brand: "Kronospan",
        price: {
            value: 350,
            unit: "m2",
            bulkPrices: [
                { quantity: 50, price: 320 },
                { quantity: 200, price: 290 },
            ],
        },
        stock: {
            available: 300,
            minOrder: 5,
            maxOrder: 100,
            warehouse: "Санкт-Петербург",
        },
        specifications: {
            material: "Ламинат",
            grade: "A",
            countryOfOrigin: "Австрия",
        },
        category: {
            main: "Отделочные материалы",
            sub: "Ламинат",
        },
        images: {
            main: "laminate-dub.jpg",
            gallery: ["laminate-dub-1.jpg", "laminate-dub-2.jpg"],
        },
        description: {
            short: "Ламинат с текстурой дуба, идеален для жилых помещений.",
            full: "Ламинат с текстурой дуба, стойкий к износу и механическим повреждениям. Легко укладывается и подходит для различных типов интерьеров.",
        },
        tags: ["ламинат", "дуб", "отделочные материалы"],
        createdAt: "2024-12-25T11:00:00Z",
        updatedAt: "2024-12-25T11:00:00Z",
    },
    {
        id: 13,
        name: "Унитаз с крышкой Soft-Close",
        sku: "WC-SC-03",
        brand: "Roca",
        price: {
            value: 8500,
            unit: "piece",
        },
        stock: {
            available: 100,
            minOrder: 1,
            maxOrder: 5,
            warehouse: "Екатеринбург",
        },
        specifications: {
            material: "Фаянс",
            countryOfOrigin: "Испания",
            certificates: ["ISO", "GOST"],
        },
        category: {
            main: "Сантехника",
            sub: "Унитазы",
        },
        images: {
            main: "toilet-soft-close.jpg",
            gallery: ["toilet-soft-close-1.jpg", "toilet-soft-close-2.jpg"],
        },
        description: {
            short: "Унитаз с крышкой Soft-Close для комфортного использования.",
            full: "Унитаз с системой Soft-Close, предотвращающей шумное закрытие крышки. Прост в установке и обслуживании, подходит для современных интерьеров.",
        },
        tags: ["унитаз", "сантехника", "Soft-Close"],
        createdAt: "2024-12-25T12:00:00Z",
        updatedAt: "2024-12-25T12:00:00Z",
    },
    {
        id: 14,
        name: "Кабель ВВГнг 3x2.5",
        sku: "CABL-VVG-3X2-04",
        brand: "Энергомера",
        price: {
            value: 120,
            unit: "meter",
            bulkPrices: [
                { quantity: 100, price: 110 },
                { quantity: 500, price: 100 },
            ],
        },
        stock: {
            available: 1000,
            minOrder: 10,
            maxOrder: 500,
            warehouse: "Ростов-на-Дону",
        },
        specifications: {
            material: "Медный провод",
            strength: "0.8 MPa",
            countryOfOrigin: "Россия",
        },
        category: {
            main: "Электротовары",
            sub: "Кабели",
        },
        images: {
            main: "cable-vvg.jpg",
            gallery: ["cable-vvg-1.jpg", "cable-vvg-2.jpg"],
        },
        description: {
            short: "Кабель ВВГнг 3x2.5 для проводки в жилых и коммерческих помещениях.",
            full: "Кабель ВВГнг 3x2.5 с изоляцией для безопасной проводки в помещениях с высокой пожарной безопасностью. Применяется в электрических сетях для передачи энергии.",
        },
        tags: ["кабель", "электротовары", "ВВГнг"],
        createdAt: "2024-12-25T13:00:00Z",
        updatedAt: "2024-12-25T13:00:00Z",
    },
    {
        id: 15,
        name: "Дрель ударная DeWalt",
        sku: "DRILL-DW-05",
        brand: "DeWalt",
        price: {
            value: 5500,
            unit: "piece",
        },
        stock: {
            available: 150,
            minOrder: 1,
            maxOrder: 5,
            warehouse: "Тула",
        },
        specifications: {
            material: "Металл",
            weight: { value: 2.5, unit: "kg" },
            countryOfOrigin: "США",
        },
        category: {
            main: "Инструменты",
            sub: "Дрели",
        },
        images: {
            main: "drill-dewalt.jpg",
            gallery: ["drill-dewalt-1.jpg", "drill-dewalt-2.jpg"],
        },
        description: {
            short: "Ударная дрель DeWalt с мощностью 800 Вт.",
            full: "Ударная дрель DeWalt с регулируемой скоростью и мощностью 800 Вт, идеальна для бурения в бетоне и металле. Удобная и легкая в эксплуатации.",
        },
        tags: ["дрель", "инструменты", "DeWalt"],
        createdAt: "2024-12-25T14:00:00Z",
        updatedAt: "2024-12-25T14:00:00Z",
    },
    {
        id: 16,
        name: "Межкомнатная дверь из МДФ",
        sku: "DOOR-MDF-07",
        brand: "Garant",
        price: {
            value: 7200,
            unit: "piece",
        },
        stock: {
            available: 80,
            minOrder: 1,
            maxOrder: 3,
            warehouse: "Казань",
        },
        specifications: {
            material: "МДФ",
            dimensions: { width: 80, height: 200, unit: "cm" },
            countryOfOrigin: "Россия",
        },
        category: {
            main: "Двери и окна",
            sub: "Межкомнатные двери",
        },
        images: {
            main: "door-mdf.jpg",
            gallery: ["door-mdf-1.jpg", "door-mdf-2.jpg"],
        },
        description: {
            short: "Межкомнатная дверь из МДФ с отделкой под дуб.",
            full: "Межкомнатная дверь из МДФ с отделкой под дуб. Идеальна для оформления интерьеров в стиле модерн. Простая в установке и долговечная.",
        },
        tags: ["двери", "МДФ", "межкомнатные"],
        createdAt: "2024-12-25T15:00:00Z",
        updatedAt: "2024-12-25T15:00:00Z",
    },
    {
        id: 17,
        name: "Гвозди строительные 100 мм",
        sku: "NAILS-100MM-08",
        brand: "Incom",
        price: {
            value: 300,
            unit: "kg",
            bulkPrices: [
                { quantity: 50, price: 280 },
                { quantity: 200, price: 250 },
            ],
        },
        stock: {
            available: 1000,
            minOrder: 5,
            maxOrder: 100,
            warehouse: "Новосибирск",
        },
        specifications: {
            material: "Сталь",
            weight: { value: 1, unit: "kg" },
            countryOfOrigin: "Китай",
        },
        category: {
            main: "Крепеж и метизы",
            sub: "Гвозди",
        },
        images: {
            main: "nails-100mm.jpg",
            gallery: ["nails-100mm-1.jpg", "nails-100mm-2.jpg"],
        },
        description: {
            short: "Строительные гвозди 100 мм для крепежа и соединения материалов.",
            full: "Строительные гвозди длиной 100 мм из прочной стали, подходят для работы с древесиной, гипсокартоном и другими материалами.",
        },
        tags: ["гвозди", "крепеж", "метизы"],
        createdAt: "2024-12-25T16:00:00Z",
        updatedAt: "2024-12-25T16:00:00Z",
    },
    {
        id: 18,
        name: "Садовый инвентарь для работы с почвой",
        sku: "GARDEN-TOOLS-09",
        brand: "Gardena",
        price: {
            value: 500,
            unit: "piece",
        },
        stock: {
            available: 150,
            minOrder: 1,
            maxOrder: 10,
            warehouse: "Пермь",
        },
        specifications: {
            material: "Металл, Пластик",
            countryOfOrigin: "Германия",
        },
        category: {
            main: "Сад и огород",
            sub: "Садовый инвентарь",
        },
        images: {
            main: "garden-tools.jpg",
            gallery: ["garden-tools-1.jpg", "garden-tools-2.jpg"],
        },
        description: {
            short: "Садовый инвентарь для работы с почвой и посадки растений.",
            full: "Садовый инвентарь для удобной работы с почвой, включая лопаты, тяпки и другие инструменты для ухода за огородом и садом.",
        },
        tags: ["садовый инвентарь", "сад", "огород"],
        createdAt: "2024-12-25T17:00:00Z",
        updatedAt: "2024-12-25T17:00:00Z",
    }


];