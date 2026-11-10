import catBodyOils from '../images/cat-body-oils.webp';
import catSheaButters from '../images/cat-shea-butters.webp';
import catJournals from '../images/cat-journals.webp';

import sheaPureCare from '../images/shea-pure-care.webp';
import sheaAmberLuxe from '../images/shea-amber-luxe.webp';
import sheaNectarGlow from '../images/shea-nectar-glow.webp';
import prodDiscoverySet from '../images/prod-discovery-set.webp';

import oilFatalRose from '../images/oil-fatal-rose.webp';
import oil1066 from '../images/oil-1066.webp';
import oilGoldenHour from '../images/oil-golden-hour.webp';
import oilSweetChaos from '../images/oil-sweet-chaos.webp';
import prodJournalRitual from '../images/prod-journal-ritual.webp';

export const categories = [
  {
    id: 'body-oils',
    name: 'BODY OILS',
    title: 'Body Oils',
    description: 'Perfume-inspired Extrait de Parfum body oils in luminous UV-shielded amber glass.',
    buttonText: 'SHOP NOW',
    image: catBodyOils,
    itemCount: 5
  },
  {
    id: 'shea-butters',
    name: 'BODY SHEA BUTTERS',
    title: 'Body Shea Butters',
    description: 'Rare African nectar & cold-whipped raw shea butter for deep velvet hydration.',
    buttonText: 'SHOP NOW',
    image: catSheaButters,
    itemCount: 3
  },
  {
    id: 'journals',
    name: 'JOURNALS',
    title: 'Journals',
    description: 'Linen-bound mindful reflection journals designed to slow down your evening ritual.',
    buttonText: 'SHOP NOW',
    image: catJournals,
    itemCount: 1
  }
];

export const products = [
  {
    id: 1,
    brand: 'GOLDEN MOMENT',
    name: 'Pure Care - Shea Bliss',
    shortTitle: 'Pure Care - Shea Bliss',
    category: 'shea-butters',
    categoryName: 'Body Shea Butters',
    sku: 'GM-SB-01',
    badge: 'New',
    showOnHome: true,
    isOilPackshot: false,
    price: '€22.99',
    priceNumeric: 22.99,
    priceSubtext: '200 ml Whipped Raw Shea',
    packSize: '200 ml Amber Apothecary Jar',
    availability: 'In Stock (Ready to Dispatch)',
    stockUnits: 1200,
    minOrder: '1 Unit',
    rating: 5.0,
    reviewCount: 142,
    priceNote: 'Ethical African Shea • Cold-Whipped',
    image: sheaPureCare,
    description: 'Unscented, cloud-whipped raw African shea butter blended with sweet almond and baobab oil for ultra-sensitive, deeply nourished skin.',
    longDescription: 'Pure Care - Shea Bliss captures the restorative richness of unrefined West African shea butter whipped to an airy soufflé texture that melts immediately upon skin contact.',
    features: [
      '100% unrefined Grade-A shea butter sourced from women-led cooperatives',
      'Enriched with cold-pressed baobab and golden jojoba oils',
      'Zero synthetic fragrance, parabens, mineral oil, or silicones',
      'Locks in 24-hour moisture with a satin, non-greasy finish',
      'Ideal base layer before applying GOLDEN MOMENT Perfume Body Oils'
    ],
    tiers: [
      { range: '1 - 9 Jars', price: '€22.99', discount: 'Boutique Retail' },
      { range: '10 - 49 Jars', price: '€17.50', discount: '24% Spa Partner' },
      { range: '50+ Jars', price: '€14.00', discount: '39% Stockist' }
    ],
    specs: [
      { label: 'Collection', value: 'Body Shea Butters' },
      { label: 'Net Volume', value: '200 ml / 6.7 fl oz' },
      { label: 'Key Actives', value: 'Raw Shea, Baobab, Vitamin E' },
      { label: 'Scent Profile', value: 'Pure Natural Nutty Cream' }
    ]
  },
  {
    id: 2,
    brand: 'GOLDEN MOMENT',
    name: 'Amber Luxe - Whipped Shea Butter',
    shortTitle: 'Amber Luxe - Whipped Shea Butter',
    category: 'shea-butters',
    categoryName: 'Body Shea Butters',
    sku: 'GM-SB-02',
    badge: 'New',
    showOnHome: true,
    isOilPackshot: false,
    price: '€22.99',
    priceNumeric: 22.99,
    priceSubtext: '200 ml Spiced Amber Shea',
    packSize: '200 ml Amber Apothecary Jar',
    availability: 'In Stock (Ready to Dispatch)',
    stockUnits: 980,
    minOrder: '1 Unit',
    rating: 4.9,
    reviewCount: 118,
    priceNote: 'Ethical African Shea • Warm Amber',
    image: sheaAmberLuxe,
    description: 'Velvety African shea whipped with warm amber resin, Madagascar vanilla bean, and rare flower nectar for sunlit radiant skin.',
    longDescription: 'Amber Luxe cocoons dry skin in deeply restorative shea lipids scented delicately with toasted vanilla pod, golden benzoin, and soft sandalwood.',
    features: [
      'Infused with warm amber resin and pure Madagascar vanilla',
      'Rich in natural vitamins A and E for visibly supple skin tone',
      'Melts effortlessly into damp skin after bath or shower',
      'Vegan, cruelty-free, and ethically harvested',
      'Pairs seamlessly with Golden Hour or 1066 Oud body oil'
    ],
    tiers: [
      { range: '1 - 9 Jars', price: '€22.99', discount: 'Boutique Retail' },
      { range: '10 - 49 Jars', price: '€17.50', discount: '24% Spa Partner' },
      { range: '50+ Jars', price: '€14.00', discount: '39% Stockist' }
    ],
    specs: [
      { label: 'Collection', value: 'Body Shea Butters' },
      { label: 'Net Volume', value: '200 ml / 6.7 fl oz' },
      { label: 'Key Actives', value: 'Raw Shea, Vanilla, Amber Resin' },
      { label: 'Scent Profile', value: 'Warm Amber & Velvet Vanilla' }
    ]
  },
  {
    id: 3,
    brand: 'GOLDEN MOMENT',
    name: 'Nectar Glow - Botanical Shea & Oils',
    shortTitle: 'Nectar Glow - Botanical Shea & Oils',
    category: 'shea-butters',
    categoryName: 'Body Shea Butters',
    sku: 'GM-SB-03',
    badge: 'New',
    showOnHome: true,
    isOilPackshot: false,
    price: '€22.99',
    priceNumeric: 22.99,
    priceSubtext: '200 ml Rare Nectar Blend',
    packSize: '200 ml Amber Apothecary Jar',
    availability: 'In Stock (Ready to Dispatch)',
    stockUnits: 1140,
    minOrder: '1 Unit',
    rating: 5.0,
    reviewCount: 164,
    priceNote: 'Rare African Nectar • Radiant Finish',
    image: sheaNectarGlow,
    description: 'Luminous whipped shea butter infused with wildflower nectar, marula oil, and neroli blossom for a healthy sun-lit sheen.',
    longDescription: 'Formulated for silky radiance from collarbones to ankles, Nectar Glow blends cold-pressed African marula and neroli blossom with raw whipped shea.',
    features: [
      'Delivers immediate satin glow without shimmer particles',
      'Enriched with wildflower nectar and cold-pressed marula oil',
      'Soft white-floral and honeyed citrus aromatic trail',
      'Absorbs cleanly into skin without staining silk or linen',
      'Hand-whipped in small batches for fresh botanical potency'
    ],
    tiers: [
      { range: '1 - 9 Jars', price: '€22.99', discount: 'Boutique Retail' },
      { range: '10 - 49 Jars', price: '€17.50', discount: '24% Spa Partner' },
      { range: '50+ Jars', price: '€14.00', discount: '39% Stockist' }
    ],
    specs: [
      { label: 'Collection', value: 'Body Shea Butters' },
      { label: 'Net Volume', value: '200 ml / 6.7 fl oz' },
      { label: 'Key Actives', value: 'Marula Oil, Wild Nectar, Shea' },
      { label: 'Scent Profile', value: 'Honeyed Neroli & Sunlit Blossom' }
    ]
  },
  {
    id: 4,
    brand: 'GOLDEN MOMENT',
    name: 'Discovery Set of 8 - Perfume Body Oils (8 x 10 ml)',
    shortTitle: 'Discovery Set of 8 - Perfume Body Oils (8 x 10 ml)',
    category: 'body-oils',
    categoryName: 'Body Oils',
    sku: 'GM-DS-08',
    badge: 'New',
    showOnHome: true,
    isOilPackshot: true,
    price: '€125.00',
    priceNumeric: 125.00,
    priceSubtext: 'Complete 8-Scent Wardrobe',
    packSize: '8 x 10 ml Amber Glass Dropper Bottles',
    availability: 'In Stock (Ready to Dispatch)',
    stockUnits: 460,
    minOrder: '1 Set',
    rating: 5.0,
    reviewCount: 205,
    priceNote: 'Includes All 8 Signature Extrait Body Oils',
    image: prodDiscoverySet,
    description: 'Experience the entire GOLDEN MOMENT fragrance wardrobe with eight travel-ready 10 ml perfume body oils housed in a gold-embossed keepsake coffret.',
    longDescription: 'Crafted for collectors and travelers alike, the Discovery Set of 8 lets you explore every floral, woody, amber, and gourmand Extrait de Parfum oil before committing to full 50 ml flacons.',
    features: [
      'Eight 10 ml UV-shielded amber dropper bottles (80 ml total oil)',
      'Includes Fatal Rose, 1066 Oud, Golden Hour, Sweet Chaos & 4 Atelier Editions',
      'Alcohol-free nourishing squalane and sweet almond base',
      'TSA-friendly luxury glass sizing for effortless travel rituals',
      'Presented in a signature cream-and-gold gift box'
    ],
    tiers: [
      { range: '1 - 4 Sets', price: '€125.00', discount: 'Luxury Coffret' },
      { range: '5 - 19 Sets', price: '€98.00', discount: '22% Boutique' },
      { range: '20+ Sets', price: '€82.00', discount: '34% Stockist' }
    ],
    specs: [
      { label: 'Collection', value: 'Discovery Coffret' },
      { label: 'Contents', value: '8 × 10 ml Perfume Body Oils' },
      { label: 'Concentration', value: 'Extrait de Parfum Oil (28%)' },
      { label: 'Packaging', value: 'Gold-Foil Keepsake Box' }
    ]
  },
  {
    id: 5,
    brand: 'GOLDEN MOMENT',
    name: 'Fatal Rose - Extrait de Parfum Oil 50 ml Luxury Bottle',
    shortTitle: 'Fatal Rose - Extrait de Parfum Oil 50 ml Luxury Bottle',
    category: 'body-oils',
    categoryName: 'Body Oils',
    sku: 'GM-PO-01',
    badge: 'New',
    showOnHome: true,
    isOilPackshot: true,
    price: '€92.00',
    priceNumeric: 92.00,
    priceSubtext: 'Velvet Damask Rose • Saffron • Oud',
    packSize: '50 ml Luxury Amber Glass Dropper',
    availability: 'In Stock (Ready to Dispatch)',
    stockUnits: 640,
    minOrder: '1 Unit',
    rating: 5.0,
    reviewCount: 189,
    priceNote: 'Extrait Concentration • 12h+ Longevity',
    image: oilFatalRose,
    description: 'Intoxicating Turkish damask rose laced with crimson saffron, pink peppercorn, and dark cashmere woods in a luminous body oil.',
    longDescription: 'Fatal Rose reimagines classic rose through an opulent, smoky lens. High-altitude rose petals open over warm saffron spice before settling into a sensual cashmere-amber trail.',
    features: [
      'Notes: Pink Pepper, Saffron, Turkish Damask Rose, Cashmere Wood, Amber',
      'Silky fast-absorbing botanical oil leaves skin glowing without residue',
      '28% Extrait de Parfum aromatic concentration, 100% alcohol-free',
      'Heavy-weight UV-protective glass bottle with brushed gold pipette',
      'Dermatologist-tested, vegan, and cruelty-free'
    ],
    tiers: [
      { range: '1 - 9 Bottles', price: '€92.00', discount: 'Atelier Retail' },
      { range: '10 - 29 Bottles', price: '€72.00', discount: '22% Boutique' },
      { range: '30+ Bottles', price: '€59.00', discount: '36% Stockist' }
    ],
    specs: [
      { label: 'Fragrance Family', value: 'Spiced Floral Amber' },
      { label: 'Net Volume', value: '50 ml / 1.7 fl oz' },
      { label: 'Top Notes', value: 'Saffron, Pink Peppercorn' },
      { label: 'Heart & Base', value: 'Damask Rose, Cashmere Musk' }
    ]
  },
  {
    id: 6,
    brand: 'GOLDEN MOMENT',
    name: '1066 Oud - Extrait de Parfum Oil 50 ml Luxury Bottle',
    shortTitle: '1066 Oud - Extrait de Parfum Oil 50 ml Luxury Bottle',
    category: 'body-oils',
    categoryName: 'Body Oils',
    sku: 'GM-PO-02',
    badge: 'New',
    showOnHome: true,
    isOilPackshot: true,
    price: '€92.00',
    priceNumeric: 92.00,
    priceSubtext: 'Smoked Oud • Cardamom • Leather',
    packSize: '50 ml Luxury Amber Glass Dropper',
    availability: 'In Stock (Ready to Dispatch)',
    stockUnits: 520,
    minOrder: '1 Unit',
    rating: 4.9,
    reviewCount: 156,
    priceNote: 'Extrait Concentration • Unisex Signature',
    image: oil1066,
    description: 'Regal aged agarwood softened by roasted cardamom, warm myrrh, and golden labdanum for commanding quiet presence.',
    longDescription: 'Inspired by timeless heritage, 1066 Oud balances rich smoky woods with honeyed resin and smooth sandalwood so it wears effortlessly day or night.',
    features: [
      'Notes: Green Cardamom, Aged Agarwood (Oud), Myrrh, Sandalwood, Labdanum',
      'Nourishes skin barrier with olive squalane and sweet almond oil',
      'Zero drying alcohol — melts smoothly into pulse points and limbs',
      'Signature brushed gold dropper dispenses exact ritual drops',
      'Long-wearing 12+ hour intimate scent aura'
    ],
    tiers: [
      { range: '1 - 9 Bottles', price: '€92.00', discount: 'Atelier Retail' },
      { range: '10 - 29 Bottles', price: '€72.00', discount: '22% Boutique' },
      { range: '30+ Bottles', price: '€59.00', discount: '36% Stockist' }
    ],
    specs: [
      { label: 'Fragrance Family', value: 'Woody Resinous Oud' },
      { label: 'Net Volume', value: '50 ml / 1.7 fl oz' },
      { label: 'Top Notes', value: 'Cardamom, Bergamot Peel' },
      { label: 'Heart & Base', value: 'Agarwood, Myrrh, Sandalwood' }
    ]
  },
  {
    id: 7,
    brand: 'GOLDEN MOMENT',
    name: 'Golden Hour - Extrait de Parfum Oil 50 ml Luxury Bottle',
    shortTitle: 'Golden Hour - Extrait de Parfum Oil 50 ml Luxury Bottle',
    category: 'body-oils',
    categoryName: 'Body Oils',
    sku: 'GM-PO-03',
    badge: 'Bestseller',
    showOnHome: true,
    isOilPackshot: true,
    price: '€92.00',
    priceNumeric: 92.00,
    priceSubtext: 'Sunlit Neroli • Wild Honey • Amber',
    packSize: '50 ml Luxury Amber Glass Dropper',
    availability: 'In Stock (Ready to Dispatch)',
    stockUnits: 810,
    minOrder: '1 Unit',
    rating: 5.0,
    reviewCount: 274,
    priceNote: 'Signature Bestseller • 12h+ Radiance',
    image: oilGoldenHour,
    description: 'Our iconic radiant elixir of sunlit neroli, golden orange blossom, wildflower honey, and warm skin musk.',
    longDescription: 'Golden Hour bottles the warmth of late-afternoon sun across bare shoulders. Bright Mediterranean neroli softens into creamy tonka bean and golden amber.',
    features: [
      'Notes: Sunlit Mandarin, Neroli Blossom, Wild Honey, Tonka, Golden Amber',
      'Imparts an instant glass-skin luminosity across shoulders and legs',
      'Formulated with cold-pressed jojoba, marula, and vitamin E',
      'Clean luxury perfume oil free from phthalates and parabens',
      'Our #1 most gifted signature scent worldwide'
    ],
    tiers: [
      { range: '1 - 9 Bottles', price: '€92.00', discount: 'Atelier Retail' },
      { range: '10 - 29 Bottles', price: '€72.00', discount: '22% Boutique' },
      { range: '30+ Bottles', price: '€59.00', discount: '36% Stockist' }
    ],
    specs: [
      { label: 'Fragrance Family', value: 'Solar Floral Amber' },
      { label: 'Net Volume', value: '50 ml / 1.7 fl oz' },
      { label: 'Top Notes', value: 'Mandarin, Bitter Orange Blossom' },
      { label: 'Heart & Base', value: 'Wild Honey, Tonka, Amber Musk' }
    ]
  },
  {
    id: 8,
    brand: 'GOLDEN MOMENT',
    name: 'Sweet Chaos - Extrait de Parfum Oil 50 ml Luxury Bottle',
    shortTitle: 'Sweet Chaos - Extrait de Parfum Oil 50 ml Luxury Bottle',
    category: 'body-oils',
    categoryName: 'Body Oils',
    sku: 'GM-PO-04',
    badge: 'New',
    showOnHome: true,
    isOilPackshot: true,
    price: '€92.00',
    priceNumeric: 92.00,
    priceSubtext: 'Spun Vanilla • Roasted Almond • Jasmine',
    packSize: '50 ml Luxury Amber Glass Dropper',
    availability: 'In Stock (Ready to Dispatch)',
    stockUnits: 610,
    minOrder: '1 Unit',
    rating: 4.9,
    reviewCount: 163,
    priceNote: 'Extrait Concentration • Warm Gourmand',
    image: oilSweetChaos,
    description: 'Velvety roasted almond and caramelized vanilla orchid balanced with night-blooming jasmine and cedarwood.',
    longDescription: 'Sweet Chaos is bold yet refined — an addictive gourmand body oil that wraps the wearer in toasted praline warmth, jasmine petals, and creamy cedar.',
    features: [
      'Notes: Roasted Almond, Blackcurrant, Jasmine Sambac, Vanilla Orchid, Cedar',
      'Ultra-silky botanical carrier oils soften dry skin immediately',
      'Leaves a warm, lingering second-skin fragrance veil',
      'Packaged in reusable UV-filtering amber glass with gold dropper',
      'Pairs richly with Amber Luxe Whipped Shea Butter'
    ],
    tiers: [
      { range: '1 - 9 Bottles', price: '€92.00', discount: 'Atelier Retail' },
      { range: '10 - 29 Bottles', price: '€72.00', discount: '22% Boutique' },
      { range: '30+ Bottles', price: '€59.00', discount: '36% Stockist' }
    ],
    specs: [
      { label: 'Fragrance Family', value: 'Warm Floral Gourmand' },
      { label: 'Net Volume', value: '50 ml / 1.7 fl oz' },
      { label: 'Top Notes', value: 'Roasted Almond, Blackcurrant' },
      { label: 'Heart & Base', value: 'Jasmine Sambac, Vanilla, Cedar' }
    ]
  },
  {
    id: 9,
    brand: 'GOLDEN MOMENT',
    name: 'Daily Ritual Journal - Linen & Gold Foil Edition',
    shortTitle: 'Daily Ritual Journal - Linen & Gold Foil Edition',
    category: 'journals',
    categoryName: 'Journals',
    sku: 'GM-JR-01',
    badge: 'New',
    showOnHome: false,
    isOilPackshot: false,
    price: '€34.00',
    priceNumeric: 34.00,
    priceSubtext: '200 Pages • 120gsm Archival Cream Paper',
    packSize: 'Hardcover Linen Edition (A5)',
    availability: 'In Stock (Ready to Dispatch)',
    stockUnits: 740,
    minOrder: '1 Unit',
    rating: 5.0,
    reviewCount: 94,
    priceNote: 'Mindfulness & Evening Reflection',
    image: prodJournalRitual,
    description: 'A tactile linen-bound self-care journal with gold foil embossing and guided prompts to pair with your nightly body oil ritual.',
    longDescription: 'Designed to help you slow down and live with intention, the Daily Ritual Journal includes morning gratitude pages, evening wind-down prompts, and thick bleed-proof cream stock.',
    features: [
      'Natural woven sand linen hardcover with hot-stamped gold foil detail',
      '200 numbered lay-flat pages of 120gsm acid-free archival cream paper',
      'Guided mindfulness prompts for morning clarity and evening stillness',
      'Woven silk ribbon bookmark',
      'Thoughtful companion gift alongside any body oil or shea butter'
    ],
    tiers: [
      { range: '1 - 9 Units', price: '€34.00', discount: 'Boutique Retail' },
      { range: '10 - 49 Units', price: '€26.00', discount: '24% Boutique' },
      { range: '50+ Units', price: '€21.00', discount: '38% Stockist' }
    ],
    specs: [
      { label: 'Collection', value: 'Journals' },
      { label: 'Format', value: 'A5 Lay-Flat Hardcover' },
      { label: 'Paper Weight', value: '120 gsm Cream Archival' },
      { label: 'Pages', value: '200 Guided & Free Pages' }
    ]
  }
];
