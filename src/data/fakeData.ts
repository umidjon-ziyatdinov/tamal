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
        id: 1001,
        name: "Портландцемент ЦЕМ I 42,5Н",
        sku: "CEM-42.5N-50",
        brand: "ЕвроЦемент",
        price: {
            value: 380,
            unit: "bag",
            bulkPrices: [
                { quantity: 10, price: 360 },
                { quantity: 100, price: 340 }
            ]
        },
        stock: {
            available: 1500,
            minOrder: 1,
            maxOrder: 300,
            warehouse: "Москва-Восток",
            leadTime: "1-2 дня"
        },
        specifications: {
            weight: {
                value: 50,
                unit: "kg"
            },
            material: "Портландцемент",
            strength: "42,5 МПа",
            grade: "ЦЕМ I 42,5Н",
            manufacturer: "ЕвроЦемент Групп",
            countryOfOrigin: "Россия",
            certificates: ["ГОСТ 31108-2020", "ISO 9001:2015"]
        },
        category: {
            main: "Строительные материалы",
            sub: "Цемент",
            type: "Портландцемент"
        },
        images: {
            main: "https://kcsh.by/upload/iblock/eb0/pj95aoevyij6cenouat9jx679s545ffs.jpg",
            gallery: [
                "/images/cement-42.5n-1.jpg",
                "/images/cement-42.5n-2.jpg"
            ],
            technical: ["/images/cement-42.5n-spec.jpg"]
        },
        documents: [
            {
                type: "certificate",
                url: "/docs/cement-42.5n-cert.pdf",
                name: "Сертификат соответствия"
            }
        ],
        applications: [
            "Фундаментные работы",
            "Монолитное строительство",
            "Производство ЖБИ"
        ],
        storage: "Хранить в сухом помещении на поддонах",
        handling: "Беречь от влаги. Использовать средства защиты при работе",
        description: {
            short: "Универсальный портландцемент для широкого спектра строительных работ",
            full: "Высококачественный портландцемент класса прочности 42,5 МПа нормальнотвердеющий. Производится из высококачественного сырья по современной технологии. Обеспечивает высокую прочность и долговечность бетонных конструкций.",
            technical: "Прочность на сжатие через 28 суток: не менее 42,5 МПа. Начало схватывания: не ранее 60 минут."
        },
        tags: ["цемент", "портландцемент", "стройматериалы", "бетон"],
        rating: {
            average: 4.8,
            count: 245,
            reviews: [
                {
                    author: "Александр В.",
                    rating: 5,
                    comment: "Отличный цемент, стабильное качество. Используем постоянно на объектах.",
                    date: "2024-12-15",
                    verified: true
                }
            ]
        },
        status: {
            inStock: true,
            isNew: false,
            onSale: {
                discountPercent: 5,
                endDate: "2025-01-15"
            }
        },
        delivery: {
            methods: [
                {
                    type: "pickup",
                    price: 0,
                    estimatedDays: 0
                },
                {
                    type: "delivery",
                    price: 1500,
                    estimatedDays: 1
                }
            ]
        },
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-12-28T12:00:00Z"
    },
    {
        id: 1002,
        name: "Песок строительный карьерный",
        sku: "SAND-02-BULK",
        brand: "КарьерПром",
        price: {
            value: 850,
            unit: "m3",
            bulkPrices: [
                { quantity: 10, price: 800 },
                { quantity: 100, price: 750 }
            ]
        },
        stock: {
            available: 5000,
            minOrder: 5,
            maxOrder: 1000,
            warehouse: "Карьер Подмосковье",
            leadTime: "2-3 дня"
        },
        specifications: {
            material: "Песок карьерный",
            grade: "1 класс",
            manufacturer: "КарьерПром",
            countryOfOrigin: "Россия",
            certificates: ["ГОСТ 8736-2014"]
        },
        category: {
            main: "Строительные материалы",
            sub: "Песок",
            type: "Карьерный"
        },
        images: {
            main: "https://bazagbi.ru/wp-content/uploads/2018/03/pesok1.jpg",
            gallery: ["/images/sand-construction-bulk.jpg"]
        },
        description: {
            short: "Карьерный песок для строительных работ",
            full: "Крупнозернистый карьерный песок высокого качества. Идеально подходит для производства бетона, строительных растворов и работ по благоустройству.",
            technical: "Модуль крупности: 2,2-2,5. Содержание пылевидных и глинистых частиц: не более 2%."
        },
        tags: ["песок", "карьерный песок", "стройматериалы"],
        rating: {
            average: 4.6,
            count: 128
        },
        status: {
            inStock: true
        },
        createdAt: "2024-02-01T00:00:00Z",
        updatedAt: "2024-12-27T14:30:00Z"
    },
    {
        id: 1003,
        name: "Щебень гранитный фр. 20-40",
        sku: "GRAV-20-40",
        brand: "ГранитПром",
        price: {
            value: 1200,
            unit: "m3",
            bulkPrices: [
                { quantity: 10, price: 1150 },
                { quantity: 50, price: 1100 }
            ]
        },
        stock: {
            available: 3000,
            minOrder: 5,
            maxOrder: 500,
            warehouse: "Карьер Север",
            leadTime: "2-3 дня"
        },
        specifications: {
            material: "Гранит",
            strength: "1200-1400 кг/см²",
            grade: "1 класс",
            manufacturer: "ГранитПром",
            countryOfOrigin: "Россия",
            certificates: ["ГОСТ 8267-93"]
        },
        category: {
            main: "Строительные материалы",
            sub: "Щебень",
            type: "Гранитный"
        },
        images: {
            main: "https://st12.stpulscen.ru/images/product/433/491/203_big.jpg",
            gallery: ["/images/granite-gravel-pile.jpg"]
        },
        description: {
            short: "Гранитный щебень фракции 20-40 мм",
            full: "Высококачественный гранитный щебень для производства бетона и строительных работ. Правильная геометрическая форма зерен, высокая прочность и морозостойкость.",
            technical: "Марка прочности: 1200-1400. Морозостойкость: F300. Насыпная плотность: 1350 кг/м³."
        },
        tags: ["щебень", "гранитный щебень", "стройматериалы"],
        rating: {
            average: 4.7,
            count: 89
        },
        status: {
            inStock: true
        },
        createdAt: "2024-03-01T00:00:00Z",
        updatedAt: "2024-12-26T09:15:00Z"
    },
    {
        id: 1004,
        name: "Кирпич облицовочный красный",
        sku: "BRICK-RED-STD",
        brand: "КирпичСтрой",
        price: {
            value: 24,
            unit: "piece",
            bulkPrices: [
                { quantity: 100, price: 23 },
                { quantity: 1000, price: 22 }
            ]
        },
        stock: {
            available: 25000,
            minOrder: 50,
            maxOrder: 5000,
            warehouse: "Москва-Юг"
        },
        specifications: {
            dimensions: {
                length: 250,
                width: 120,
                height: 65,
                unit: "mm"
            },
            weight: {
                value: 2.4,
                unit: "kg"
            },
            material: "Керамика",
            strength: "М150",
            manufacturer: "КирпичСтрой",
            countryOfOrigin: "Россия",
            certificates: ["ГОСТ 530-2012"]
        },
        category: {
            main: "Строительные материалы",
            sub: "Кирпич",
            type: "Облицовочный"
        },
        images: {
            main: "https://st13.stpulscen.ru/images/product/396/821/315_big.jpg",
            gallery: [
                "/images/red-brick-wall.jpg",
                "/images/red-brick-detail.jpg"
            ]
        },
        description: {
            short: "Облицовочный керамический кирпич красного цвета",
            full: "Высококачественный облицовочный кирпич с гладкой поверхностью. Идеально подходит для фасадных работ. Обладает высокой прочностью и морозостойкостью.",
            technical: "Марка прочности М150, морозостойкость F100, водопоглощение не более 6%."
        },
        tags: ["кирпич", "облицовочный кирпич", "стройматериалы"],
        rating: {
            average: 4.9,
            count: 312
        },
        status: {
            inStock: true,
            isNew: false
        },
        createdAt: "2024-04-01T00:00:00Z",
        updatedAt: "2024-12-25T16:45:00Z"
    },
    {
        id: 1005,
        name: "Цемент Сульфатостойкий ЦЕМ I 42,5Н СС",
        sku: "CEM-SUL-42.5",
        brand: "ЕвроЦемент",
        price: {
            value: 420,
            unit: "bag",
            bulkPrices: [
                { quantity: 10, price: 400 },
                { quantity: 100, price: 380 }
            ]
        },
        stock: {
            available: 800,
            minOrder: 1,
            maxOrder: 200,
            warehouse: "Москва-Восток",
            leadTime: "2-3 дня"
        },
        specifications: {
            weight: {
                value: 50,
                unit: "kg"
            },
            material: "Сульфатостойкий цемент",
            strength: "42,5 МПа",
            grade: "ЦЕМ I 42,5Н СС",
            manufacturer: "ЕвроЦемент Групп",
            countryOfOrigin: "Россия",
            certificates: ["ГОСТ 22266-2013"]
        },
        category: {
            main: "Строительные материалы",
            sub: "Цемент",
            type: "Специальный"
        },
        images: {
            main: "https://kcsh.by/upload/iblock/0fb/2u6otn1c6d99estyqb72nwusyijbxhai.png",
            gallery: ["/images/sulfate-cement-use.jpg"]
        },
        description: {
            short: "Сульфатостойкий цемент для агрессивных сред",
            full: "Специальный цемент для конструкций, подвергающихся воздействию сульфатной агрессии. Идеален для гидротехнических сооружений и подземных конструкций.",
            technical: "Сульфатостойкость по ГОСТ 22266-2013. Прочность на сжатие через 28 суток: не менее 42,5 МПа."
        },
        tags: ["цемент", "сульфатостойкий", "специальный цемент", "стройматериалы"],
        rating: {
            average: 4.7,
            count: 86
        },
        status: {
            inStock: true,
            isNew: true
        },
        createdAt: "2024-06-01T00:00:00Z",
        updatedAt: "2024-12-24T11:20:00Z"
    },
    {
        id: 1006,
        name: "Песок кварцевый фракционированный",
        sku: "SAND-QUARTZ-01",
        brand: "КварцПром",
        price: {
            value: 1200,
            unit: "m3",
            bulkPrices: [
                { quantity: 5, price: 1150 },
                { quantity: 20, price: 1100 }
            ]
        },
        stock: {
            available: 1000,
            minOrder: 1,
            maxOrder: 100,
            warehouse: "Москва-Запад"
        },
        specifications: {
            material: "Кварцевый песок",
            grade: "Высший",
            manufacturer: "КварцПром",
            countryOfOrigin: "Россия",
            certificates: ["ГОСТ 22551-2019"]
        },
        category: {
            main: "Строительные материалы",
            sub: "Песок",
            type: "Кварцевый"
        },
        images: {
            main: "https://cdn.vseinstrumenti.ru/images/goods/stroitelnye-materialy/tsement-i-nerudnye-materialy/5539837/1000x1000/66741847.jpg",
            gallery: ["/images/quartz-sand-detail.jpg"]
        },
        description: {
            short: "Мелкофракционированный кварцевый песок",
            full: "Высококачественный кварцевый песок для специальных строительных растворов и производства сухих смесей. Содержание SiO2 не менее 98%.",
            technical: "Фракция 0  "
        },
        tags: ["цемент", "сульфатостойкий", "специальный цемент", "стройматериалы"],
        rating: {
            average: 4.7,
            count: 86
        },
        status: {
            inStock: true,
            isNew: true
        },
        createdAt: "2024-06-01T00:00:00Z",
        updatedAt: "2024-12-24T11:20:00Z"
    },
    {
        id: 1007,
        name: "Щебень известняковый фр. 5-20",
        sku: "GRAV-LIME-5-20",
        brand: "КарьерСтрой",
        price: {
            value: 950,
            unit: "m3",
            bulkPrices: [
                { quantity: 10, price: 900 },
                { quantity: 50, price: 850 }
            ]
        },
        stock: {
            available: 2000,
            minOrder: 5,
            maxOrder: 300,
            warehouse: "Подмосковье-Юг",
            leadTime: "1-2 дня"
        },
        specifications: {
            material: "Известняк",
            strength: "400-600 кг/см²",
            grade: "2 класс",
            manufacturer: "КарьерСтрой",
            countryOfOrigin: "Россия",
            certificates: ["ГОСТ 8267-93"]
        },
        category: {
            main: "Строительные материалы",
            sub: "Щебень",
            type: "Известняковый"
        },
        images: {
            main: "https://i-nerud24.ru/wp-content/uploads/2022/03/shheben-izvestnyakovyj-5-20-600x450.jpg",
            gallery: ["/images/limestone-gravel-use.jpg"]
        },
        description: {
            short: "Известняковый щебень мелкой фракции",
            full: "Щебень известняковый для дорожного строительства и производства бетона. Оптимальное соотношение цена/качество для общестроительных работ.",
            technical: "Марка прочности: М400-600. Морозостойкость: F100. Насыпная плотность: 1250 кг/м³."
        },
        tags: ["щебень", "известняковый щебень", "стройматериалы"],
        rating: {
            average: 4.5,
            count: 67
        },
        status: {
            inStock: true
        },
        createdAt: "2024-05-15T00:00:00Z",
        updatedAt: "2024-12-23T10:30:00Z"
    },
    {
        id: 1008,
        name: "Кирпич полнотелый рядовой М150",
        sku: "BRICK-SOLID-M150",
        brand: "КирпичСтрой",
        price: {
            value: 19,
            unit: "piece",
            bulkPrices: [
                { quantity: 100, price: 18 },
                { quantity: 1000, price: 17 }
            ]
        },
        stock: {
            available: 35000,
            minOrder: 100,
            maxOrder: 10000,
            warehouse: "Москва-Восток"
        },
        specifications: {
            dimensions: {
                length: 250,
                width: 120,
                height: 65,
                unit: "mm"
            },
            weight: {
                value: 3.2,
                unit: "kg"
            },
            material: "Керамика",
            strength: "М150",
            manufacturer: "КирпичСтрой",
            countryOfOrigin: "Россия",
            certificates: ["ГОСТ 530-2012"]
        },
        category: {
            main: "Строительные материалы",
            sub: "Кирпич",
            type: "Рядовой"
        },
        images: {
            main: "https://cs.petrovich.ru/images/94337/original-925x925-fit.jpg",
            gallery: ["/images/solid-brick-stack.jpg"]
        },
        description: {
            short: "Полнотелый керамический кирпич для несущих стен",
            full: "Классический полнотелый кирпич для возведения несущих стен и перегородок. Высокая прочность и надежность конструкций.",
            technical: "Марка прочности М150, морозостойкость F50, водопоглощение не более 8%."
        },
        tags: ["кирпич", "полнотелый кирпич", "стройматериалы"],
        rating: {
            average: 4.6,
            count: 183
        },
        status: {
            inStock: true
        },
        createdAt: "2024-03-20T00:00:00Z",
        updatedAt: "2024-12-22T15:40:00Z"
    },
    {
        id: 1009,
        name: "Цемент Белый ЦЕМ I 52,5Н",
        sku: "CEM-WHITE-52.5",
        brand: "ЕвроЦемент",
        price: {
            value: 850,
            unit: "bag",
            bulkPrices: [
                { quantity: 10, price: 800 },
                { quantity: 50, price: 750 }
            ]
        },
        stock: {
            available: 300,
            minOrder: 1,
            maxOrder: 100,
            warehouse: "Москва-Центр",
            leadTime: "2-3 дня"
        },
        specifications: {
            weight: {
                value: 50,
                unit: "kg"
            },
            material: "Белый портландцемент",
            strength: "52,5 МПа",
            grade: "ЦЕМ I 52,5Н",
            manufacturer: "ЕвроЦемент Групп",
            countryOfOrigin: "Россия",
            certificates: ["ГОСТ 965-89"]
        },
        category: {
            main: "Строительные материалы",
            sub: "Цемент",
            type: "Белый"
        },
        images: {
            main: "https://pkf-m.ru/assets/images/products/403615/cement-holcim-cem-i-52-5n-pcb-1-500-d0-belyj-50kg.jpeg",
            gallery: [
                "/images/white-cement-use.jpg",
                "/images/white-cement-pack.jpg"
            ]
        },
        description: {
            short: "Белый портландцемент высокой прочности",
            full: "Белый цемент премиум-класса для декоративных работ и производства архитектурного бетона. Обеспечивает идеально белый цвет и высокую прочность.",
            technical: "Белизна не менее 85%, прочность на сжатие через 28 суток: не менее 52,5 МПа."
        },
        tags: ["цемент", "белый цемент", "декоративный цемент", "стройматериалы"],
        rating: {
            average: 4.9,
            count: 56
        },
        status: {
            inStock: true,
            isNew: true
        },
        createdAt: "2024-11-01T00:00:00Z",
        updatedAt: "2024-12-21T13:15:00Z"
    },
    {
        id: 1010,
        name: "Песок сеяный речной",
        sku: "SAND-RIVER-01",
        brand: "РечПром",
        price: {
            value: 1100,
            unit: "m3",
            bulkPrices: [
                { quantity: 10, price: 1050 },
                { quantity: 50, price: 1000 }
            ]
        },
        stock: {
            available: 1500,
            minOrder: 5,
            maxOrder: 200,
            warehouse: "Москва-Север",
            leadTime: "2-3 дня"
        },
        specifications: {
            material: "Речной песок",
            grade: "1 класс",
            manufacturer: "РечПром",
            countryOfOrigin: "Россия",
            certificates: ["ГОСТ 8736-2014"]
        },
        category: {
            main: "Строительные материалы",
            sub: "Песок",
            type: "Речной"
        },
        images: {
            main: "https://moscow-beton.ru/upload/iblock/88c/7481w0tv7bzee7i6c9ap96km2wbiestp.jpg",
            gallery: ["/images/river-sand-detail.jpg"]
        },
        description: {
            short: "Мытый речной песок для строительных работ",
            full: "Чистый речной песок, прошедший промывку и сортировку. Идеально подходит для производства бетона высокого качества и отделочных работ.",
            technical: "Модуль крупности: 1,8-2,2. Содержание пылевидных и глинистых частиц: не более 1%."
        },
        tags: ["песок", "речной песок", "мытый песок", "стройматериалы"],
        rating: {
            average: 4.8,
            count: 94
        },
        status: {
            inStock: true
        },
        createdAt: "2024-07-15T00:00:00Z",
        updatedAt: "2024-12-20T09:45:00Z"
    }

];


// export const categories: CategoryType[] = [
//     {
//         id: ncNanoId(),
//         href: "/collection" as Route,
//         name: "Строительные материалы",
//         icon: FaHammer,
//         children: [
//             { id: ncNanoId(), href: "/collection" as Route, name: "Цемент" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Песок" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Щебень" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Кирпич" },
//         ],
//     },
//     {
//         id: ncNanoId(),
//         href: "/collection" as Route,
//         name: "Отделочные материалы",
//         icon: FaPaintRoller,
//         children: [
//             { id: ncNanoId(), href: "/collection" as Route, name: "Ламинат" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Плитка" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Обои" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Краска" },
//         ],
//     },
//     {
//         id: ncNanoId(),
//         href: "/collection" as Route,
//         name: "Сантехника",
//         icon: FaToilet,
//         children: [
//             { id: ncNanoId(), href: "/collection" as Route, name: "Унитазы" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Раковины" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Ванны" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Смесители" },
//         ],
//     },
//     {
//         id: ncNanoId(),
//         href: "/collection" as Route,
//         name: "Электротовары",
//         icon: FaPlug,
//         children: [
//             { id: ncNanoId(), href: "/collection" as Route, name: "Кабели" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Розетки" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Выключатели" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Светильники" },
//         ],
//     },
//     {
//         id: ncNanoId(),
//         href: "/collection" as Route,
//         name: "Инструменты",
//         icon: FaWrench,
//         children: [
//             { id: ncNanoId(), href: "/collection" as Route, name: "Дрели" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Перфораторы" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Шуруповерты" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Болгарки" },
//         ],
//     },
//     {
//         id: ncNanoId(),
//         href: "/collection" as Route,
//         name: "Двери и окна",
//         icon: FaDoorOpen,
//         children: [
//             { id: ncNanoId(), href: "/collection" as Route, name: "Межкомнатные двери" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Входные двери" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Окна ПВХ" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Фурнитура" },
//         ],
//     },
//     {
//         id: ncNanoId(),
//         href: "/collection" as Route,
//         name: "Крепеж и метизы",
//         icon: FaScrewdriver,
//         children: [
//             { id: ncNanoId(), href: "/collection" as Route, name: "Гвозди" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Винты" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Болты" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Шурупы" },
//         ],
//     },
//     {
//         id: ncNanoId(),
//         href: "/collection" as Route,
//         name: "Сад и огород",
//         icon: FaLeaf,
//         children: [
//             { id: ncNanoId(), href: "/collection" as Route, name: "Садовый инвентарь" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Семена" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Удобрения" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Грунт" },
//         ],
//     },
//     {
//         id: ncNanoId(),
//         href: "/collection" as Route,
//         name: "Напольные покрытия",
//         icon: FaSquare,
//         children: [
//             { id: ncNanoId(), href: "/collection" as Route, name: "Ламинат" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Паркет" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Ковролин" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Линолеум" },
//         ],
//     },
//     {
//         id: ncNanoId(),
//         href: "/collection" as Route,
//         name: "Кухни",
//         icon: FaKitchenSet,
//         children: [
//             { id: ncNanoId(), href: "/collection" as Route, name: "Кухонные гарнитуры" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Мойки" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Смесители для кухни" },
//             { id: ncNanoId(), href: "/collection" as Route, name: "Кухонные аксессуары" },
//         ],
//     },
// ];