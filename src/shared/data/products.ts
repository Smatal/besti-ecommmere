import { Product } from "../types/product";

export const PRODUCTS: Product[] = [
  {
    id: 'sunscreen',
    name: 'Aqua Gel Sunscreen SPF 50+ PA++++',
    category: 'sunscreen',
    categoryName: 'Sun Protection',
    concern: 'sun',
    skinType: 'all',
    subtitle: 'Broad Spectrum UVA • UVB Protection • Lightweight & Hydrating',
    image: '/client_assets/sunscreen.jpg',
    singlePrice: 499,
    singleMrp: 599,
    duoPrice: 799,
    duoMrp: 1198,
    volume: '100 ml e 3.38 fl. oz',
    rating: 4.9,
    reviewsCount: 1240,
    badge: 'HERO BESTSELLER',
    badgeType: 'badge-gold',
    themeColor: '#0d7377',
    highlights: ['✓ Zero White Cast Guaranteed', '✓ Water & Sweat Resistant (80m)', '✓ Oil Control & Quick Absorbing', '✓ Suitable for Sensitive & Acne-Prone Skin'],
    actives: 'Broad Spectrum Photostable UV Filters, Interface Flow Tech, In-Vivo Tested (ISO 24444)',
    description: 'An ultra-lightweight water-gel sunscreen formulated specifically for Indian weather and skin tones. Glides on effortlessly, leaves zero greasy film or white residue, and offers powerful all-day broad spectrum UV and blue-light defense.',
    howToUse: [
      'Take two full finger lengths of sunscreen for your face, and one finger length for your neck and ears.',
      'Dot evenly across dry, cleansed skin 15 minutes before stepping into the sun.',
      'Gently massage until completely absorbed into a clear, weightless satin finish.',
      'Reapply every 3-4 hours during prolonged sun exposure or after swimming.'
    ],
    inci: 'Aqua, Ethylhexyl Methoxycinnamate, Bemotrizinol (BEMT), Butyl Methoxydibenzoylmethane, Octocrylene, Phospholipids, 1,3-Butylene Glycol, Glycerin, Niacinamide, D-Panthenol, Sodium Hyaluronate, Allantoin, Carbomer, Phenoxyethanol, Ethylhexylglycerin.',
    specs: {
      'Formulation Format': 'Water-Based Gel Crème',
      'UV Shield': 'SPF 50+ • PA++++ (In-Vivo Tested ISO 24444)',
      'Finish on Skin': 'Invisible Semi-Matte (Zero White Cast)',
      'Texture': 'Refreshing Water-Burst Gel',
      'Free From': 'Parabens, Sulfates, Mineral Oils, Silicones',
      'Best Suited For': 'All Skin Types, Oily, Sensitive & Acne-Prone Skin',
      'Not Ideal For': 'Extremely flaky open wounds (use barrier repair first)'
    },
    comparison: [
      { feature: 'White Cast', bestie: '100% Invisible on all skin tones', market: 'Heavy white or purple chalky cast' },
      { feature: 'Texture & Finish', bestie: 'Fast-absorbing water gel, zero tackiness', market: 'Heavy, greasy lotion that clogs pores' },
      { feature: 'Sweat Resistance', bestie: '80-min water & humidity endurance', market: 'Melts off with sweat, stings eyes' },
      { feature: 'Certification', bestie: 'In-Vivo ISO 24444 Tested & Approved', market: 'Often relies on in-vitro lab estimates' }
    ]
  },
  {
    id: 'vitaminc',
    name: 'Vitamin C 20% Brightening Serum',
    category: 'serums',
    categoryName: 'Antioxidants & Glow',
    concern: 'pigmentation',
    skinType: 'all',
    subtitle: 'Pure Antioxidant Glow • Fades Sun Tanning & Restores Luminosity',
    image: '/client_assets/vitaminc.jpg',
    singlePrice: 649,
    singleMrp: 799,
    duoPrice: 1099,
    duoMrp: 1598,
    volume: '30 ml e 1.01 fl. oz',
    rating: 4.8,
    reviewsCount: 890,
    badge: 'RADIANCE BOOST',
    badgeType: 'badge-glow',
    themeColor: '#ea580c',
    highlights: ['✓ 20% Active Vitamin C', '✓ Ferulic Acid Antioxidant Shield', '✓ Stimulates Collagen Synthesis', '✓ Restores Dull & Tired Complexions'],
    actives: '20% Pure Vitamin C (Ascorbic Acid), Ferulic Acid, Witch Hazel, Hyaluronic Acid, Licorice Extract',
    description: 'High-potency antioxidant serum formulated to neutralize free radical damage from urban pollution and UV exposure. Fades dark spots, revives exhausted skin cells, and leaves an enviable glass-skin glow.',
    howToUse: [
      'Dispense 3-4 drops directly onto cleansed face each morning.',
      'Gently pat with fingertips until fully absorbed (do not rub harshly).',
      'Follow with your Bestie Cares Moisturizer and Aqua Gel Sunscreen SPF 50+.'
    ],
    inci: 'Aqua, 3-O-Ethyl Ascorbic Acid (20%), Sodium Hyaluronate, Ferulic Acid, Hamamelis Virginiana (Witch Hazel) Extract, Glycyrrhiza Glabra (Licorice) Root Extract, Glycerin, Propylene Glycol, Niacinamide, D-Panthenol, Disodium EDTA, Phenoxyethanol.',
    specs: {
      'Formulation Format': 'High-Active Liquid Elixir',
      'Active Concentration': '20% Vitamin C + 0.5% Ferulic Acid',
      'Texture': 'Lightweight, Quick-Absorbing',
      'Finish': 'Natural Radiant Luminous Glow',
      'Free From': 'Parabens, Phthalates, Synthetic Fragrance',
      'Best Suited For': 'Dullness, Sun Damage, Uneven Skin Tone',
      'Not Ideal For': 'Immediately after strong chemical peel sessions'
    },
    comparison: [
      { feature: 'Oxidation Stability', bestie: 'Stabilized with Ferulic Acid in UV-protected glass', market: 'Oxidizes to brown liquid within weeks' },
      { feature: 'Skin Penetration', bestie: 'Micro-molecular weight for deep epidermal uptake', market: 'Sits on surface without deep benefit' },
      { feature: 'Irritation Risk', bestie: 'Buffered with soothing Licorice & Witch Hazel', market: 'Causes redness, stinging and breakouts' }
    ]
  },
  {
    id: 'collagen',
    name: 'Collagen Peptide Firming Serum',
    category: 'serums',
    categoryName: 'Youth & Elasticity',
    concern: 'aging',
    skinType: 'dry',
    subtitle: 'Firms • Plumps • Enhances Elasticity for Bouncy, Youthful Skin',
    image: '/client_assets/collagen.jpg',
    singlePrice: 699,
    singleMrp: 899,
    duoPrice: 1199,
    duoMrp: 1798,
    volume: '30 ml e 1.01 fl. oz',
    rating: 4.9,
    reviewsCount: 654,
    badge: 'YOUTH ELIXIR',
    badgeType: 'badge-gold',
    themeColor: '#1d4ed8',
    highlights: ['✓ Multi-Peptide Complex (Matrixyl & Copper)', '✓ Hydrolyzed Marine Collagen', '✓ Deep Cellular Hydration', '✓ Restores Skin Bounce & Firmness'],
    actives: 'Copper Tripeptide-1, 1.5% Palmitoyl Tripeptide-1, Matrixyl, Hydrolyzed Collagen, 1.5% Panthenol',
    description: 'An advanced regenerative treatment that signals deep collagen production, reversing visible fine lines, skin sagging, and dehydration. Delivers remarkable elasticity and skin firmness within 28 days of daily use.',
    howToUse: [
      'Apply 3-4 drops morning and night to clean face and neck.',
      'Press gently into skin with upward motions along cheekbones and jawline.',
      'Seal with moisturizer for optimal cellular hydration lock.'
    ],
    inci: 'Aqua, Copper Tripeptide-1, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Hydrolyzed Collagen, Glycogen, Panthenol (1.5%), Sodium Hyaluronate, Niacinamide, Propanediol, Sodium Citrate, Phenoxyethanol, Ethylhexylglycerin.',
    specs: {
      'Formulation Format': 'Cellular Signal Peptide Serum',
      'Key Active': 'Multi-Peptide Matrix + Marine Collagen',
      'Texture': 'Silky Cushioning Hydro-Gel',
      'Finish': 'Plump, Velvety, Firm Touch',
      'Free From': 'Parabens, Sulfates, Mineral Oils',
      'Best Suited For': 'Fine Lines, Loss of Bounce, Dehydrated Skin'
    },
    comparison: [
      { feature: 'Peptide Potency', bestie: 'Quadruple peptide cocktail with Copper Tripeptide', market: 'Single generic peptide in trace quantity' },
      { feature: 'Hydration Depth', bestie: 'Multi-molecular weight Hyaluronic + Marine Collagen', market: 'Superficial silicones that wash away' }
    ]
  },
  {
    id: 'kojic',
    name: 'Kojic Acid 2% Dark Spot Serum',
    category: 'serums',
    categoryName: 'Spot Correction',
    concern: 'pigmentation',
    skinType: 'oily',
    subtitle: 'Fades Dark Spots • Evens Tone • Clears Post-Acne Blemishes',
    image: '/client_assets/kojic.jpg',
    singlePrice: 599,
    singleMrp: 749,
    duoPrice: 999,
    duoMrp: 1498,
    volume: '30 ml e 1.01 fl. oz',
    rating: 4.9,
    reviewsCount: 1120,
    badge: 'TARGETED CARE',
    badgeType: 'badge-wine',
    themeColor: '#881337',
    highlights: ['✓ 2% Pure Kojic Acid', '✓ Licorice Root Inhibitor', '✓ Visibly Fades Post-Acne Marks', '✓ Gentle Daily Non-Irritating Formula'],
    actives: '2% Kojic Acid, Niacinamide, Licorice Root Extract, Sodium Hyaluronate, Salicylic Acid',
    description: 'A dermatologist-precision formula that inhibits tyrosinase activity to shut down excess melanin synthesis at the source. Targets stubborn melasma, dark sun spots, and post-inflammatory acne pigmentation.',
    howToUse: [
      'Apply 2-3 drops to areas with hyperpigmentation or all over face.',
      'Use every night after cleansing.',
      'Always follow with daily sunscreen during daytime.'
    ],
    inci: 'Aqua, Kojic Acid (2%), Aloe Barbadensis Leaf Juice, Niacinamide, D-Panthenol, Glycyrrhiza Glabra (Licorice) Root Extract, Salicylic Acid, Sodium Hyaluronate, Propanediol, Sodium Citrate, Citric Acid, Disodium EDTA, Phenoxyethanol.',
    specs: {
      'Formulation Format': 'Corrective Micro-Emulsion',
      'Active Concentration': '2% Kojic Acid + Niacinamide',
      'Texture': 'Lightweight Liquid Gel',
      'Finish': 'Clear & Non-Sticky',
      'Free From': 'Hydroquinone, Parabens, Sulfates',
      'Best Suited For': 'Melasma, Blemishes, Dark Spots, Acne Scars'
    },
    comparison: [
      { feature: 'Safety Profile', bestie: 'Safe 2% Kojic Acid without toxic hydroquinone', market: 'Harsh bleaches that cause rebound pigmentation' },
      { feature: 'Visible Timeline', bestie: 'Noticeable spot fading in 2-3 weeks', market: 'Vague claims with minimal noticeable improvement' }
    ]
  },
  {
    id: 'undereye',
    name: 'Under Eye Gel with Roller Applicator',
    category: 'cleansers',
    categoryName: 'Eye Area Therapy',
    concern: 'undereye',
    skinType: 'all',
    subtitle: 'Depuff • Brighten • Refresh with 360° Stainless Steel Massage Ball',
    image: '/client_assets/undereye.jpg',
    singlePrice: 449,
    singleMrp: 549,
    duoPrice: 749,
    duoMrp: 1098,
    volume: '15 ml e 0.52 fl. oz',
    rating: 4.8,
    reviewsCount: 780,
    badge: 'STEEL ROLLER',
    badgeType: 'badge-gold',
    themeColor: '#17181c',
    highlights: ['✓ Instant Cooling Steel Roller', '✓ Caffeine Depuffing Matrix', '✓ Fades Tired Dark Circles', '✓ Cucumber & Hyaluronic Hydration'],
    actives: 'Caffeine, Hyaluronic Acid, Niacinamide, Vitamin E, Cucumber Extract',
    description: 'Engineered with a medical-grade 360-degree stainless steel roller applicator that glides across sensitive orbital skin. The cooling contact drains accumulated fluid, reducing puffiness while caffeine brightens darkness.',
    howToUse: [
      'Gently roll under each eye from inner to outer corner 2-3 times.',
      'Lightly pat any excess with your ring finger until absorbed.',
      'Use morning and evening. Store in the fridge for extra cooling relief!'
    ],
    inci: 'Aqua, Caffeine, Niacinamide, Hyaluronic Acid, Tocopheryl Acetate (Vitamin E), Cucumis Sativus (Cucumber) Fruit Extract, Glycerin, Biosaccharide Gum-1, Butylene Glycol, Polyacrylic Acid, Ethylhexylglycerin, Phenoxyethanol.',
    specs: {
      'Formulation Format': 'Cooling Roller Eye Gel',
      'Applicator': '360° Medical Grade Stainless Steel Ball',
      'Key Active': 'Concentrated Caffeine & Hyaluronic Acid',
      'Texture': 'Featherlight Refreshing Gel',
      'Free From': 'Synthetic Fragrances, Parabens, Dyes',
      'Best Suited For': 'Puffy Morning Eyes, Late-Night Fatigue, Dark Circles'
    },
    comparison: [
      { feature: 'Applicator Hygiene', bestie: 'Built-in antibacterial stainless roller ball', market: 'Dipping fingers into open jars' },
      { feature: 'Morning Depuff', bestie: 'Physical lymph massage + caffeine vaso-constriction', market: 'Heavy creams that cause milia under eyes' }
    ]
  },
  {
    id: 'facewash',
    name: 'Glutathione Deep Clean Face Wash',
    category: 'cleansers',
    categoryName: 'Daily Cleansing',
    concern: 'dullness',
    skinType: 'all',
    subtitle: 'Brighten • Cleans • Glow • Non-Stripping Radiance Micro-Lather',
    image: '/client_assets/facewash.jpg',
    singlePrice: 399,
    singleMrp: 499,
    duoPrice: 699,
    duoMrp: 998,
    volume: '100 ml e 3.38 fl. oz',
    rating: 4.9,
    reviewsCount: 940,
    badge: 'DAILY ESSENTIAL',
    badgeType: 'badge-glow',
    themeColor: '#0f766e',
    highlights: ['✓ Glutathione Master Antioxidant', '✓ Niacinamide Sebum Balancing', '✓ Non-Drying Hydrating Base', '✓ Vitamin C & Alpha Arbutin Glow'],
    actives: 'Glutathione, Niacinamide, Vitamin C, Hyaluronic Acid, Aloe Vera Extract, Alpha Arbutin',
    description: 'A refreshing, soap-free gentle foaming gel that lifts away pollution, dirt, and excess oil while respecting your skin’s delicate lipid barrier. Skin feels soft, clean, and noticeably radiant.',
    howToUse: [
      'Wet face with lukewarm water.',
      'Apply a small coin-sized amount and gently massage in circular motions for 30-60 seconds.',
      'Rinse thoroughly and pat dry. Use twice daily.'
    ],
    inci: 'Aqua, Glutathione, Hyaluronic Acid, Cocamidopropyl Betaine, Glycerin, Aloe Barbadensis Leaf Extract, Niacinamide, Alpha Arbutin, Sodium PCA, D-Panthenol, 3-O-Ethyl Ascorbic Acid, Allantoin, Phenoxyethanol.',
    specs: {
      'Formulation Format': 'Barrier-Safe Foaming Cleanser',
      'Key Active': 'Glutathione & Alpha Arbutin',
      'Texture': 'Lush Silky Gel transforms into velvet foam',
      'Finish': 'Hydrated, Non-Stripped & Glowing',
      'Free From': 'SLS/SLES Sulfates, Parabens, Phthalates',
      'Best Suited For': 'Daily AM/PM Cleanse for All Skin Types'
    },
    comparison: [
      { feature: 'Barrier Protection', bestie: 'Gentle amino surfactants that keep moisture intact', market: 'Harsh SLS soaps that dry out skin' },
      { feature: 'Brightening Actives', bestie: 'Real Glutathione & Alpha Arbutin infused', market: 'Pure perfume and soap fillers' }
    ]
  },
  {
    id: 'lotion',
    name: 'Moisturizing Ceramide Body & Face Lotion',
    category: 'cleansers',
    categoryName: 'Barrier Repair',
    concern: 'dryness',
    skinType: 'dry',
    subtitle: 'Hydrates • Nourishes • Softens • 24H Deep Barrier Repair',
    image: '/client_assets/lotion.jpg',
    singlePrice: 549,
    singleMrp: 699,
    duoPrice: 949,
    duoMrp: 1398,
    volume: '200 ml e 6.76 fl. oz',
    rating: 4.9,
    reviewsCount: 520,
    badge: 'BARRIER REPAIR',
    badgeType: 'badge-gold',
    themeColor: '#be185d',
    highlights: ['✓ Multi-Ceramides (NP, AP, EOP)', '✓ Organic Shea Butter & Squalane', '✓ 24hr Continuous Hydration', '✓ Luxury Pump Bottle Dispenser'],
    actives: 'Ceramide Complex (NP, AP, EOP), Hyaluronic Acid, Shea Butter, Squalane, Vitamin E',
    description: 'Gold-accented luxury pump bottle dispensing a velvet barrier repair lotion. Fortified with essential skin-identical ceramides and plant squalane to seal moisture and soothe rough, flaky skin.',
    howToUse: [
      'Apply generously over body and face after bathing on slightly damp skin.',
      'Gently massage until completely absorbed.',
      'Reapply whenever skin feels dry or exposed to air conditioning.'
    ],
    inci: 'Aqua, Hyaluronic Acid, Ceramide Complex (NP, AP, EOP), D-Panthenol, Glycerin, Squalane, Vitamin E, Shea Butter, Phyto Extract, Glyceryl Stearate, Caprylic/Capric Triglyceride, Phenoxyethanol.',
    specs: {
      'Formulation Format': 'Lush Barrier Restoration Lotion',
      'Key Active': 'Bio-Identical Ceramide Trio + Squalane',
      'Texture': 'Rich Yet Non-Greasy Velvety Emulsion',
      'Finish': 'Silky Touch with Zero Sticky Residue',
      'Free From': 'Parabens, Sulfates, Heavy Waxes',
      'Best Suited For': 'Dry, Sensitive, Itchy or Eczema-Prone Skin'
    },
    comparison: [
      { feature: 'Absorption Speed', bestie: 'Sinks in within seconds, non-greasy finish', market: 'Sits like a heavy sticky grease film' },
      { feature: 'Barrier Efficacy', bestie: '3 bio-identical ceramides replicate skin matrix', market: 'Cheap mineral oil with zero repair benefit' }
    ]
  },
  {
    id: 'shampoo',
    name: 'Dandruff-Free Scalp Therapy Shampoo',
    category: 'haircare',
    categoryName: 'Scalp Health',
    concern: 'dandruff',
    skinType: 'all',
    subtitle: 'Deep Clean • Flake Free • Healthy Hair with Ciclopirox & Tea Tree',
    image: '/client_assets/shampoo.jpg',
    singlePrice: 499,
    singleMrp: 649,
    duoPrice: 849,
    duoMrp: 1298,
    volume: '200 ml',
    rating: 4.8,
    reviewsCount: 810,
    badge: 'SCALP RX',
    badgeType: 'badge-gold',
    themeColor: '#d97706',
    highlights: ['✓ Ciclopirox Olamine Clinical Active', '✓ Tea Tree & Rosemary Scalp Soothe', '✓ Eliminates Itching & Persistent Flakes', '✓ Non-Drying on Hair Strands'],
    actives: 'Tea Tree Oil, Rosemary Extract, Ciclopirox Olamine, Scalp Balancing Surfactants',
    description: 'A clinical anti-dandruff therapy shampoo designed to target the Malassezia yeast at its roots without stripping hair fibers of moisture. Calms persistent scalp itching and leaves strands flake-free and fresh.',
    howToUse: [
      'Wet hair thoroughly. Apply shampoo directly to scalp.',
      'Massage with fingertips for 2 minutes to allow clinical actives to activate.',
      'Rinse thoroughly. For best results, use 2-3 times per week.'
    ],
    inci: 'Aqua, Ciclopirox Olamine, Melaleuca Alternifolia (Tea Tree) Leaf Oil, Rosmarinus Officinalis (Rosemary) Leaf Extract, Sodium Lauroyl Sarcosinate, Cocamidopropyl Betaine, Glycerin, Polyquaternium-7, Phenoxyethanol.',
    specs: {
      'Formulation Format': 'Scalp Therapeutic Shampoo',
      'Key Active': 'Ciclopirox Olamine + Tea Tree + Rosemary',
      'Texture': 'Lush Botanical Foaming Lather',
      'Finish': 'Calmed Scalp & Fresh Lightweight Hair',
      'Free From': 'Parabens, Harsh Sulfates, Silicones',
      'Best Suited For': 'Flakes, Scalp Itching, Dandruff, Seborrhea'
    },
    comparison: [
      { feature: 'Scalp Calming', bestie: 'Targets root fungal source while soothing redness', market: 'Superficial detergents that dry scalp more' },
      { feature: 'Hair Softness', bestie: 'Conditions strands while treating scalp skin', market: 'Leaves hair strands rough and brittle like straw' }
    ]
  },
  {
    id: 'conditioner',
    name: 'Nourishing Argan Oil & Pro-Vitamin B5 Conditioner',
    category: 'haircare',
    categoryName: 'Hair Conditioning',
    concern: 'frizz',
    skinType: 'all',
    subtitle: 'Soft Hair • Easy Comb • Silky Shine & 72H Frizz Defense',
    image: '/client_assets/conditioner.jpg',
    singlePrice: 479,
    singleMrp: 599,
    duoPrice: 799,
    duoMrp: 1198,
    volume: '200 ml e 6.76 fl. oz',
    rating: 4.9,
    reviewsCount: 460,
    badge: 'SALON GLOSS',
    badgeType: 'badge-glow',
    themeColor: '#15803d',
    highlights: ['✓ Pure Moroccan Argan Oil', '✓ Pro-Vitamin B5 (Panthenol)', '✓ Instant Detangling & Slip', '✓ Anti-Frizz Humidity Shield'],
    actives: 'Argan Oil, Vegetable Glycerin, Pro-Vitamin B5 (Panthenol), Hair Silk Amino Acids',
    description: 'Rich botanical conditioner that coats and seals the hair cuticle, banishing frizz and humidity flyaways. Imparts effortless combability, high mirror-like shine, and touchable softness without weighing hair down.',
    howToUse: [
      'After shampooing, squeeze out excess water from hair.',
      'Apply conditioner from mid-lengths to ends (avoid direct scalp application).',
      'Leave on for 2-3 minutes, then rinse thoroughly with cool water.'
    ],
    inci: 'Aqua, Argania Spinosa (Argan) Kernel Oil, Panthenol (Pro-Vitamin B5), Cetearyl Alcohol, Behentrimonium Chloride, Glycerin, Dimethiconol, Silk Amino Acids, Hydrolyzed Keratin, Phenoxyethanol, Fragrance.',
    specs: {
      'Formulation Format': 'Deep Conditioning Crème',
      'Key Active': 'Moroccan Argan Oil + Pro-Vitamin B5',
      'Texture': 'Rich Smoothing Velvet Crème',
      'Finish': 'Mirror Gloss, Anti-Frizz & Soft Slip',
      'Free From': 'Parabens, Sulfates, Heavy Waxes',
      'Best Suited For': 'Frizzy, Dry, Tangled or Heat-Damaged Hair'
    },
    comparison: [
      { feature: 'Weight on Strands', bestie: 'Featherlight bounce with zero heavy grease', market: 'Heavy waxes that cause limp, flat hair' },
      { feature: 'Detangling Slip', bestie: 'Instant finger-combing slip in 60 seconds', market: 'Takes excessive product to soften tangles' }
    ]
  }
];


import { BundleKit } from "../types/product";

export const BUNDLE_KITS: BundleKit[] = [
  {
    id: 'bundle-glow',
    title: 'The Daily Glow & Defense Trio',
    subtitle: 'Complete 3-Step Morning Routine for Luminous, Protected Skin',
    items: ['facewash', 'vitaminc', 'sunscreen'],
    itemNames: 'Glutathione Face Wash + Vitamin C 20% Serum + Aqua Gel Sunscreen SPF 50+',
    price: 1299,
    mrp: 1897,
    savings: '32% OFF',
    freebie: 'FREE Velvet Cosmetic Pouch + 2 Deluxe Minis',
    badge: 'MOST POPULAR ROUTINE'
  },
  {
    id: 'bundle-pigmentation',
    title: 'Targeted Pigmentation Eraser Duo',
    subtitle: 'Clinical Fade & Defense System for Stubborn Dark Spots',
    items: ['kojic', 'sunscreen'],
    itemNames: '2% Kojic Acid Serum + Aqua Gel Sunscreen SPF 50+',
    price: 899,
    mrp: 1348,
    savings: '33% OFF',
    freebie: 'FREE Scalp Massager Comb',
    badge: 'FAST RESULTS'
  },
  {
    id: 'bundle-youth',
    title: 'Youthful Firming & Eye Refresh Set',
    subtitle: 'Multi-Peptide Matrix with Cooling Steel Eye Therapy & Barrier Lock',
    items: ['collagen', 'undereye', 'lotion'],
    itemNames: 'Collagen Peptide Serum + Under Eye Roller Gel + Ceramide Lotion',
    price: 1399,
    mrp: 2147,
    savings: '35% OFF',
    freebie: 'FREE Jade Gua Sha Stone',
    badge: 'LUXURY TREATMENT'
  },
  {
    id: 'bundle-scalp',
    title: 'Complete Scalp & Hair Therapy Kit',
    subtitle: 'Total Flake Control with Silk Argan Gloss Treatment',
    items: ['shampoo', 'conditioner'],
    itemNames: 'Dandruff-Free Scalp Shampoo + Argan Oil Conditioner',
    price: 799,
    mrp: 1248,
    savings: '36% OFF',
    freebie: 'FREE Scalp Exfoliating Brush',
    badge: 'HEALTHY HAIR'
  }
];
