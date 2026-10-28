/**
 * BESTIE CARES — COMPREHENSIVE E-COMMERCE ENGINE & STATE MANAGER
 * Built with bespoke Bestie Cares brand theme: Warm Pearl Ivory, Soft Gold Ribbons & Clinical Actives.
 */

// 1. Comprehensive Product Catalog
export const PRODUCTS = [
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

// 2. High-AOV Curated Routine Kits
export const BUNDLE_KITS = [
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

// 3. Central Application State
class BestieCaresStore {
  constructor() {
    this.cart = this.loadCart();
    this.currentView = 'home'; // 'home' | 'pdp'
    this.activeProductId = 'sunscreen';
    this.selectedPack = {}; // productId -> 'single' | 'duo'
    this.activeCategory = 'all';
    this.appliedCoupon = null; // null | { code: 'BESTIE10', pct: 10 }
    this.freeShippingThreshold = 499;

    PRODUCTS.forEach(p => {
      this.selectedPack[p.id] = 'single';
    });
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('bestie_cart_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('bestie_cart_v2', JSON.stringify(this.cart));
    } catch (e) {
      console.warn('Storage quota', e);
    }
    this.updateCartUI();
  }

  getCartCount() {
    return this.cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  getCartSubtotal() {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  getDiscountAmount() {
    if (!this.appliedCoupon) return 0;
    const sub = this.getCartSubtotal();
    return Math.round((sub * this.appliedCoupon.pct) / 100);
  }

  getCartFinalTotal() {
    return Math.max(0, this.getCartSubtotal() - this.getDiscountAmount());
  }

  addToCart(productId, packType = null) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const chosenPack = packType || this.selectedPack[productId] || 'single';
    const isDuo = chosenPack === 'duo';
    const price = isDuo ? product.duoPrice : product.singlePrice;
    const packLabel = isDuo ? 'Pack of 2 (Duo Deal)' : 'Single Unit';

    const existingIdx = this.cart.findIndex(
      item => item.id === productId && item.packType === chosenPack
    );

    if (existingIdx > -1) {
      this.cart[existingIdx].quantity += 1;
    } else {
      this.cart.push({
        id: productId,
        product,
        packType: chosenPack,
        packLabel,
        price,
        quantity: 1
      });
    }

    this.saveCart();
    showToast(`Added ${product.name} (${packLabel}) to your cart! ✨`);
    openCart();
  }

  addBundleToCart(bundleId) {
    const bundle = BUNDLE_KITS.find(b => b.id === bundleId);
    if (!bundle) return;

    const existingIdx = this.cart.findIndex(item => item.id === bundle.id);
    if (existingIdx > -1) {
      this.cart[existingIdx].quantity += 1;
    } else {
      this.cart.push({
        id: bundle.id,
        isBundle: true,
        product: {
          name: bundle.title,
          subtitle: bundle.itemNames,
          image: PRODUCTS.find(p => p.id === bundle.items[0])?.image || '/client_assets/sunscreen.jpg'
        },
        packLabel: `Curated Kit + ${bundle.freebie}`,
        price: bundle.price,
        quantity: 1
      });
    }

    this.saveCart();
    showToast(`Added ${bundle.title} to your cart with ${bundle.savings}! 🎁`);
    openCart();
  }

  updateItemQty(index, delta) {
    if (!this.cart[index]) return;
    this.cart[index].quantity += delta;
    if (this.cart[index].quantity <= 0) {
      this.cart.splice(index, 1);
    }
    this.saveCart();
  }

  removeItem(index) {
    if (!this.cart[index]) return;
    this.cart.splice(index, 1);
    this.saveCart();
  }

  applyCoupon(code) {
    const clean = (code || '').trim().toUpperCase();
    if (clean === 'BESTIE10' || clean === 'GLOW10') {
      this.appliedCoupon = { code: clean, pct: 10 };
      this.saveCart();
      showToast('🎉 Coupon BESTIE10 applied! 10% Extra Discount unlocked!');
      return true;
    } else if (clean === 'DIWALI20') {
      this.appliedCoupon = { code: clean, pct: 20 };
      this.saveCart();
      showToast('🎉 Coupon DIWALI20 applied! 20% Special Discount unlocked!');
      return true;
    } else {
      showToast('❌ Invalid code. Try code "BESTIE10" for 10% off!');
      return false;
    }
  }

  removeCoupon() {
    this.appliedCoupon = null;
    this.saveCart();
    showToast('Coupon removed.');
  }

  updateCartUI() {
    const countBadge = document.getElementById('cartCountBadge');
    if (countBadge) {
      const count = this.getCartCount();
      countBadge.textContent = count;
      countBadge.style.transform = 'scale(1.25)';
      setTimeout(() => {
        countBadge.style.transform = 'scale(1)';
      }, 200);
    }

    const drawerBody = document.getElementById('cartDrawerItems');
    const subtotalEl = document.getElementById('cartSubtotal');
    const finalTotalEl = document.getElementById('cartFinalTotal');
    const discountRow = document.getElementById('cartDiscountRow');
    const discountAmtEl = document.getElementById('cartDiscountAmount');
    const shippingProgressEl = document.getElementById('shippingProgressFill');
    const shippingMsgEl = document.getElementById('shippingMsgText');
    const freebieTierPill = document.getElementById('cartFreebieTierPill');

    const subtotal = this.getCartSubtotal();
    const discount = this.getDiscountAmount();
    const finalTotal = this.getCartFinalTotal();

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (finalTotalEl) finalTotalEl.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;

    if (discountRow && discountAmtEl) {
      if (discount > 0) {
        discountRow.style.display = 'flex';
        discountAmtEl.textContent = `-₹${discount.toLocaleString('en-IN')}`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    // Coupon UI sync
    const couponActiveBadge = document.getElementById('couponActiveBadge');
    const couponInputRow = document.getElementById('couponInputRow');
    if (couponActiveBadge && couponInputRow) {
      if (this.appliedCoupon) {
        couponInputRow.style.display = 'none';
        couponActiveBadge.style.display = 'flex';
        couponActiveBadge.innerHTML = `
          <div style="display:flex;align-items:center;gap:6px;">
            <span>🎉</span>
            <span style="font-weight:700;color:#166534;font-size:0.82rem;">${this.appliedCoupon.code} (${this.appliedCoupon.pct}% OFF Applied)</span>
          </div>
          <button type="button" onclick="window.removeCouponFromCart()" style="font-size:0.75rem;color:#dc2626;text-decoration:underline;cursor:pointer;border:none;background:none;">Remove</button>
        `;
      } else {
        couponInputRow.style.display = 'flex';
        couponActiveBadge.style.display = 'none';
      }
    }

    // Tiered Milestone Freebie Logic (Chosen Store Inspired)
    if (shippingProgressEl && shippingMsgEl && freebieTierPill) {
      if (subtotal === 0) {
        shippingProgressEl.style.width = '0%';
        shippingMsgEl.innerHTML = 'Add items to unlock <strong>FREE Delivery & Gifts</strong>';
        freebieTierPill.innerHTML = '🔒 Free Delivery at ₹499';
      } else if (subtotal < 499) {
        const diff = 499 - subtotal;
        const pct = Math.round((subtotal / 499) * 33);
        shippingProgressEl.style.width = `${pct}%`;
        shippingMsgEl.innerHTML = `Add <strong>₹${diff}</strong> more for <strong>FREE Delivery</strong>`;
        freebieTierPill.innerHTML = '🚚 Step 1: Free Delivery at ₹499';
      } else if (subtotal < 999) {
        const diff = 999 - subtotal;
        const pct = 33 + Math.round(((subtotal - 499) / 500) * 33);
        shippingProgressEl.style.width = `${pct}%`;
        shippingMsgEl.innerHTML = `🎉 <strong>FREE Delivery Unlocked!</strong> Add <strong>₹${diff}</strong> for a <strong>Free Deluxe Mini Cleanser</strong>`;
        freebieTierPill.innerHTML = '🎁 Next: Free Mini Cleanser at ₹999';
      } else if (subtotal < 1499) {
        const diff = 1499 - subtotal;
        const pct = 66 + Math.round(((subtotal - 999) / 500) * 34);
        shippingProgressEl.style.width = `${pct}%`;
        shippingMsgEl.innerHTML = `🎁 <strong>Free Mini Cleanser Added!</strong> Add <strong>₹${diff}</strong> for a <strong>Free Bestie Tote Bag</strong>`;
        freebieTierPill.innerHTML = '👜 Next: Free Tote Bag at ₹1,499';
      } else {
        shippingProgressEl.style.width = '100%';
        shippingMsgEl.innerHTML = '🌟 <strong>VIP Reward Unlocked!</strong> Free Delivery + Deluxe Mini + Bestie Tote Bag Included!';
        freebieTierPill.innerHTML = '✨ All Milestone Freebies Unlocked!';
      }
    }

    if (!drawerBody) return;

    if (this.cart.length === 0) {
      drawerBody.innerHTML = `
        <div class="cart-empty-state">
          <div class="empty-cart-icon">💛</div>
          <h4 style="font-size:1.15rem;font-weight:700;margin-bottom:6px;">Your cart is feeling light</h4>
          <p style="font-size:0.86rem;color:var(--text-muted);margin-bottom:20px;">
            Explore our clinical sunscreen, glow serums, and hair care routines.
          </p>
          <button class="btn btn-gold" onclick="closeCart(); window.navigateTo('home');">
            Start Exploring Products
          </button>
        </div>
      `;
      return;
    }

    drawerBody.innerHTML = this.cart
      .map(
        (item, idx) => `
        <div class="cart-item">
          <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img" />
          <div class="cart-item-details">
            <h4>${item.product.name}</h4>
            <span class="cart-item-pack">${item.packLabel}</span>
            <div class="cart-qty-control">
              <button class="qty-btn" onclick="window.bestieStore.updateItemQty(${idx}, -1)">−</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="window.bestieStore.updateItemQty(${idx}, 1)">+</button>
            </div>
          </div>
          <div class="cart-item-price-col">
            <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
            <button class="cart-remove-btn" onclick="window.bestieStore.removeItem(${idx})">Remove</button>
          </div>
        </div>
      `
      )
      .join('');
  }
}

// Instantiate Global Store
window.bestieStore = new BestieCaresStore();

// 4. Page Routing (Home View vs Dedicated Product Detail Page)
window.navigateTo = function (view, productId = 'sunscreen') {
  window.bestieStore.currentView = view;
  const homeViewEl = document.getElementById('storefrontHomeView');
  const pdpViewEl = document.getElementById('dedicatedPdpView');
  const stickyBarEl = document.getElementById('stickyBuyBar');

  if (view === 'pdp') {
    window.bestieStore.activeProductId = productId;
    if (homeViewEl) homeViewEl.style.display = 'none';
    if (pdpViewEl) {
      pdpViewEl.style.display = 'block';
      renderDedicatedPdp(productId);
    }
    if (stickyBarEl) stickyBarEl.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.pushState(null, '', `#/product/${productId}`);
  } else {
    if (pdpViewEl) pdpViewEl.style.display = 'none';
    if (homeViewEl) homeViewEl.style.display = 'block';
    if (stickyBarEl) stickyBarEl.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.pushState(null, '', '#/');
  }
};

// Render Products Grid on Homepage
export function renderProducts(category = 'all') {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const filtered =
    category === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === category);

  grid.innerHTML = filtered
    .map(product => {
      const selectedPack = window.bestieStore.selectedPack[product.id] || 'single';
      const isDuo = selectedPack === 'duo';
      const currentPrice = isDuo ? product.duoPrice : product.singlePrice;
      const currentMrp = isDuo ? product.duoMrp : product.singleMrp;
      const discountPct = Math.round(((currentMrp - currentPrice) / currentMrp) * 100);

      return `
      <article class="product-card" data-id="${product.id}">
        <div class="card-media-wrapper" onclick="window.navigateTo('pdp', '${product.id}')">
          <div class="badge-corner">
            <span class="badge-pill ${product.badgeType}">${product.badge}</span>
            <span class="badge-pill badge-save">SAVE ${discountPct}%</span>
          </div>
          <img src="${product.image}" alt="${product.name}" class="card-image" loading="lazy" />
          <button class="quick-view-overlay-btn" onclick="event.stopPropagation(); window.navigateTo('pdp', '${product.id}')">
            View Formulation Details →
          </button>
        </div>

        <div class="card-body">
          <div class="card-meta">
            <span class="card-volume">${product.volume}</span>
            <span class="card-rating">★ ${product.rating} <span style="color:var(--text-muted);font-weight:500;">(${product.reviewsCount})</span></span>
          </div>

          <h3 class="card-title" onclick="window.navigateTo('pdp', '${product.id}')">${product.name}</h3>

          <div class="card-benefit-tags">
            ${product.highlights.slice(0, 3).map(h => `<span class="benefit-micro-tag">${h}</span>`).join('')}
          </div>

          <!-- Pack Toggle Selector (Molecular Company Inspired) -->
          <div class="pack-toggle-selector">
            <button 
              type="button" 
              class="pack-toggle-btn ${!isDuo ? 'active' : ''}" 
              onclick="window.setProductPack('${product.id}', 'single')"
            >
              1 Unit • ₹${product.singlePrice}
            </button>
            <button 
              type="button" 
              class="pack-toggle-btn ${isDuo ? 'active' : ''}" 
              onclick="window.setProductPack('${product.id}', 'duo')"
            >
              Pack of 2 • ₹${product.duoPrice} <span style="color:#166534;font-size:0.65rem;">(-20%)</span>
            </button>
          </div>

          <div class="card-pricing-row">
            <span class="current-price">₹${currentPrice}</span>
            <span class="original-price">₹${currentMrp}</span>
            <span class="discount-pill">${discountPct}% OFF</span>
          </div>

          <div style="display:grid;grid-template-columns:1fr auto;gap:8px;">
            <button class="card-cta-btn" onclick="window.bestieStore.addToCart('${product.id}')">
              <span>Add to Cart</span>
              <span>•</span>
              <span>₹${currentPrice}</span>
            </button>
            <button class="icon-btn" style="border:1px solid var(--border-medium);" onclick="window.navigateTo('pdp', '${product.id}')" title="View Full Specs">
              👁️
            </button>
          </div>
        </div>
      </article>
    `;
    })
    .join('');
}

// Render Dedicated Product Detail Page (PDP) View
export function renderDedicatedPdp(productId) {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const pdpContainer = document.getElementById('dedicatedPdpView');
  if (!pdpContainer) return;

  const selectedPack = window.bestieStore.selectedPack[product.id] || 'single';
  const isDuo = selectedPack === 'duo';
  const currentPrice = isDuo ? product.duoPrice : product.singlePrice;
  const currentMrp = isDuo ? product.duoMrp : product.singleMrp;
  const discountPct = Math.round(((currentMrp - currentPrice) / currentMrp) * 100);

  // Update sticky bottom buy bar
  const stickyBarEl = document.getElementById('stickyBuyBar');
  if (stickyBarEl) {
    stickyBarEl.innerHTML = `
      <div class="container sticky-bar-inner">
        <div style="display:flex;align-items:center;gap:12px;">
          <img src="${product.image}" style="width:44px;height:44px;object-fit:contain;border-radius:6px;background:#fff;padding:2px;border:1px solid var(--border-light);" />
          <div>
            <div style="font-weight:700;font-size:0.92rem;line-height:1.2;">${product.name}</div>
            <div style="font-size:0.8rem;color:var(--text-muted);">${product.volume} • <strong style="color:var(--text-primary);font-size:0.95rem;">₹${currentPrice}</strong></div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <button class="btn btn-gold" onclick="window.bestieStore.addToCart('${product.id}')">
            Add to Cart — ₹${currentPrice}
          </button>
        </div>
      </div>
    `;
  }

  pdpContainer.innerHTML = `
    <div class="container" style="padding-top:20px;padding-bottom:80px;">
      <!-- Breadcrumbs & Back Button -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
        <div style="font-size:0.84rem;color:var(--text-muted);display:flex;align-items:center;gap:8px;">
          <a href="javascript:void(0)" onclick="window.navigateTo('home')" style="text-decoration:underline;">Home</a>
          <span>/</span>
          <span>${product.categoryName}</span>
          <span>/</span>
          <span style="color:var(--text-primary);font-weight:600;">${product.name}</span>
        </div>
        <button class="btn btn-outline" style="padding:6px 14px;font-size:0.82rem;" onclick="window.navigateTo('home')">
          ← Back to All Formulations
        </button>
      </div>

      <!-- Main 50/50 Buy Box Grid (From Molecular & Chosen Store) -->
      <div class="pdp-hero-grid">
        <!-- Left: Gallery Media Showcase -->
        <div class="pdp-media-column">
          <div class="pdp-main-image-card">
            <div class="badge-corner">
              <span class="badge-pill ${product.badgeType}">${product.badge}</span>
              <span class="badge-pill" style="background:#0f766e;color:#fff;">DERMATOLOGIST TESTED</span>
            </div>
            <img id="pdpMainImage" src="${product.image}" alt="${product.name}" class="pdp-hero-image" />
          </div>

          <!-- Interactive Thumbnails -->
          <div class="pdp-thumbnail-row">
            <div class="thumb-box active" onclick="document.getElementById('pdpMainImage').src='${product.image}'">
              <img src="${product.image}" alt="Packshot" />
            </div>
            <div class="thumb-box" onclick="document.getElementById('pdpMainImage').src='/client_assets/video_thumb.jpg'">
              <img src="/client_assets/video_thumb.jpg" alt="Texture Swatch" />
            </div>
          </div>
        </div>

        <!-- Right: Conversion-Driven Buy Box -->
        <div class="pdp-buybox-column">
          <div class="pdp-category-tag">
            Bestie Cares • Clinical Dermatological Care
          </div>
          <h1 class="pdp-product-title">${product.name}</h1>
          <p class="pdp-product-subtitle">${product.subtitle}</p>

          <div class="pdp-social-proof-line">
            <span class="stars-gold">★★★★★</span>
            <strong>${product.rating} / 5.0</strong>
            <span style="color:var(--text-muted);">(${product.reviewsCount} Verified Reviews)</span>
            <span>•</span>
            <span style="color:#166534;font-weight:700;">✓ In-Vivo ISO 24444 Certified</span>
          </div>

          <!-- Benefit Pill Cloud (Molecular Company Style) -->
          <div class="pdp-benefit-pill-cloud">
            ${product.highlights.map(h => `<span class="pdp-pill">${h}</span>`).join('')}
          </div>

          <!-- Pack & Bundle Savings Selector Cards -->
          <div class="bundle-selector-card-group">
            <div 
              class="bundle-card ${!isDuo ? 'selected' : ''}" 
              onclick="window.setPdpPack('${product.id}', 'single')"
            >
              <div class="bundle-card-header">
                <div>
                  <strong>Single Pack</strong>
                  <span style="font-size:0.75rem;color:var(--text-muted);display:block;">${product.volume}</span>
                </div>
                <div style="text-align:right;">
                  <span style="font-size:1.15rem;font-weight:800;color:var(--text-primary);">₹${product.singlePrice}</span>
                  <span style="font-size:0.78rem;color:var(--text-muted);text-decoration:line-through;display:block;">₹${product.singleMrp}</span>
                </div>
              </div>
            </div>

            <div 
              class="bundle-card ${isDuo ? 'selected' : ''}" 
              onclick="window.setPdpPack('${product.id}', 'duo')"
            >
              <div class="bundle-card-badge">RECOMMENDED DUO VALUE</div>
              <div class="bundle-card-header">
                <div>
                  <strong style="color:var(--gold-dark);">Pack of 2 (Duo Deal)</strong>
                  <span style="font-size:0.75rem;color:#166534;font-weight:700;display:block;">SAVE 20% • ₹${Math.round(product.duoPrice/2)}/each</span>
                </div>
                <div style="text-align:right;">
                  <span style="font-size:1.15rem;font-weight:800;color:var(--text-primary);">₹${product.duoPrice}</span>
                  <span style="font-size:0.78rem;color:var(--text-muted);text-decoration:line-through;display:block;">₹${product.duoMrp}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Primary Actions -->
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">
            <button class="btn btn-gold" style="padding:16px;font-size:1.05rem;" onclick="window.bestieStore.addToCart('${product.id}', '${selectedPack}')">
              Add to Cart — ₹${currentPrice}
            </button>
            <button class="btn btn-primary" style="padding:14px;font-size:0.95rem;" onclick="window.bestieStore.addToCart('${product.id}', '${selectedPack}'); window.triggerCheckout();">
              Buy Now with Instant 1-Click UPI ⚡
            </button>
          </div>

          <!-- Pincode Delivery Estimator (From Chosen Store) -->
          <div class="pincode-checker-box">
            <div style="font-size:0.82rem;font-weight:700;margin-bottom:6px;">Check Delivery Time & COD:</div>
            <div style="display:flex;gap:8px;">
              <input type="text" id="pincodeInput" placeholder="Enter 6-digit Pincode (e.g. 600008)" maxlength="6" />
              <button class="btn btn-primary" style="padding:8px 16px;font-size:0.82rem;" onclick="window.checkPincode()">
                Check
              </button>
            </div>
            <div id="pincodeFeedback" style="font-size:0.78rem;margin-top:6px;display:none;"></div>
          </div>

          <!-- Trust Badges -->
          <div class="pdp-trust-row">
            <div>🚚 <strong>Free Shipping</strong> on ₹499+</div>
            <div>🔒 <strong>100% Safe Checkout</strong> via UPI / Cards</div>
            <div>🩺 <strong>Dermatologist Formulated</strong></div>
          </div>
        </div>
      </div>

      <!-- Below The Fold: Technical Specifications & Application Guides -->
      <div style="margin-top:60px;">
        <div class="pdp-tabs-nav">
          <button class="pdp-tab-trigger active" onclick="window.switchPdpTab(event, 'tabSpecs')">Clinical Specifications</button>
          <button class="pdp-tab-trigger" onclick="window.switchPdpTab(event, 'tabHowTo')">How to Apply</button>
          <button class="pdp-tab-trigger" onclick="window.switchPdpTab(event, 'tabInci')">Ingredients (INCI)</button>
          <button class="pdp-tab-trigger" onclick="window.switchPdpTab(event, 'tabComparison')">Bestie vs Standard</button>
        </div>

        <!-- Tab 1: Specs -->
        <div id="tabSpecs" class="pdp-tab-pane active">
          <table class="pdp-specs-table">
            <tbody>
              ${Object.entries(product.specs).map(([key, val]) => `
                <tr>
                  <th style="width:30%;">${key}</th>
                  <td>${val}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Tab 2: How To Apply -->
        <div id="tabHowTo" class="pdp-tab-pane">
          <div style="background:#fff;padding:24px;border-radius:12px;border:1px solid var(--border-light);">
            <h4 style="font-size:1.1rem;font-weight:700;margin-bottom:14px;">Application Protocol:</h4>
            <ol style="padding-left:20px;display:flex;flex-direction:column;gap:10px;font-size:0.95rem;color:var(--text-secondary);">
              ${product.howToUse.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>
        </div>

        <!-- Tab 3: INCI Ingredients -->
        <div id="tabInci" class="pdp-tab-pane">
          <div style="background:#fff;padding:24px;border-radius:12px;border:1px solid var(--border-light);">
            <h4 style="font-size:1.1rem;font-weight:700;margin-bottom:8px;">Full Active Ingredient Breakdown:</h4>
            <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.7;">${product.inci}</p>
          </div>
        </div>

        <!-- Tab 4: Comparison Table -->
        <div id="tabComparison" class="pdp-tab-pane">
          <table class="pdp-specs-table">
            <thead>
              <tr>
                <th>Factor</th>
                <th style="color:var(--gold-dark);">Bestie Cares Formula</th>
                <th style="color:var(--text-muted);">Typical Market Alternatives</th>
              </tr>
            </thead>
            <tbody>
              ${(product.comparison || []).map(row => `
                <tr>
                  <th>${row.feature}</th>
                  <td style="color:#166534;font-weight:600;">✓ ${row.bestie}</td>
                  <td style="color:var(--text-muted);">✗ ${row.market}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

window.setPdpPack = function (productId, pack) {
  window.bestieStore.selectedPack[productId] = pack;
  renderDedicatedPdp(productId);
};

window.switchPdpTab = function (e, tabId) {
  document.querySelectorAll('.pdp-tab-trigger').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.pdp-tab-pane').forEach(pane => pane.classList.remove('active'));
  e.currentTarget.classList.add('active');
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');
};

// Pincode validation helper
window.checkPincode = function () {
  const input = document.getElementById('pincodeInput');
  const feedback = document.getElementById('pincodeFeedback');
  if (!input || !feedback) return;

  const pin = input.value.trim();
  if (/^\d{6}$/.test(pin)) {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    const dateStr = today.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

    feedback.style.display = 'block';
    feedback.style.color = '#166534';
    feedback.innerHTML = `✅ Delivery by <strong>${dateStr}</strong> to ${pin} • Cash on Delivery (COD) Available • Free Shipping`;
  } else {
    feedback.style.display = 'block';
    feedback.style.color = '#dc2626';
    feedback.textContent = '❌ Please enter a valid 6-digit Indian PIN code.';
  }
};

// Set Pack Type
window.setProductPack = function (productId, packType) {
  window.bestieStore.selectedPack[productId] = packType;
  renderProducts(window.bestieStore.activeCategory);
};

// Filter Category
window.filterCategory = function (category) {
  window.bestieStore.activeCategory = category;
  document.querySelectorAll('.category-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  renderProducts(category);
};

// Custom Segmented Routine Finder State (Chosen Store Inspired)
window.finderState = {
  product: 'all',
  concern: 'all',
  skintype: 'all'
};

function capitalizeFirst(str) {
  if (!str) return '';
  if (str === 'skintype') return 'SkinType';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

window.toggleFinderDropdown = function (type, event) {
  if (event) event.stopPropagation();
  const menus = ['product', 'concern', 'skintype'];
  menus.forEach(m => {
    const el = document.getElementById(`menuFinder${capitalizeFirst(m)}`);
    const seg = document.getElementById(`segment${capitalizeFirst(m)}`);
    if (m === type) {
      const isOpen = el?.classList.contains('active');
      if (isOpen) {
        el?.classList.remove('active');
        seg?.classList.remove('active');
      } else {
        el?.classList.add('active');
        seg?.classList.add('active');
      }
    } else {
      el?.classList.remove('active');
      seg?.classList.remove('active');
    }
  });
};

window.selectFinderOption = function (type, val, label, event) {
  if (event) event.stopPropagation();
  window.finderState[type] = val;
  const labelEl = document.getElementById(`labelFinder${capitalizeFirst(type)}`);
  if (labelEl) labelEl.textContent = label;

  // Update active status in dropdown
  const menu = document.getElementById(`menuFinder${capitalizeFirst(type)}`);
  if (menu) {
    menu.querySelectorAll('.dropdown-item').forEach(item => {
      item.classList.toggle('active', item.dataset.val === val);
    });
    menu.classList.remove('active');
  }
  const seg = document.getElementById(`segment${capitalizeFirst(type)}`);
  if (seg) seg.classList.remove('active');

  // Automatically trigger search
  window.runRoutineFinder();
};

window.closeAllFinderDropdowns = function () {
  ['product', 'concern', 'skintype'].forEach(m => {
    document.getElementById(`menuFinder${capitalizeFirst(m)}`)?.classList.remove('active');
    document.getElementById(`segment${capitalizeFirst(m)}`)?.classList.remove('active');
  });
};

document.addEventListener('click', (e) => {
  if (!e.target.closest('.finder-segment')) {
    window.closeAllFinderDropdowns();
  }
});

// Routine Finder Filter
window.runRoutineFinder = function () {
  const categorySelect = window.finderState.product;
  const concernSelect = window.finderState.concern;
  const skinTypeSelect = window.finderState.skintype;
  const resultBox = document.getElementById('finderResultBox');
  const resultGrid = document.getElementById('finderResultItems');

  const matches = PRODUCTS.filter(p => {
    const catMatch = categorySelect === 'all' || p.category === categorySelect;
    const conMatch = concernSelect === 'all' || p.concern === concernSelect;
    const skinMatch = skinTypeSelect === 'all' || p.skinType === 'all' || p.skinType === skinTypeSelect;
    return catMatch && conMatch && skinMatch;
  });

  resultBox.style.display = 'block';
  if (matches.length > 0) {
    resultGrid.innerHTML = matches.map(p => `
      <div class="finder-result-card">
        <img src="${p.image}" alt="${p.name}" class="result-card-img" onclick="window.navigateTo('pdp', '${p.id}')" />
        <div class="result-card-info">
          <span class="result-badge">${p.badge}</span>
          <h5 class="result-title" onclick="window.navigateTo('pdp', '${p.id}')">${p.name}</h5>
          <p class="result-desc">${p.subtitle}</p>
          <div class="result-price-row">
            <span class="result-price">₹${p.singlePrice}</span>
            <span class="result-mrp">₹${p.singleMrp}</span>
          </div>
        </div>
        <button class="btn btn-gold result-add-btn" onclick="window.bestieStore.addToCart('${p.id}')">
          + Add to Routine
        </button>
      </div>
    `).join('');
  } else {
    resultGrid.innerHTML = `
      <div style="grid-column: 1 / -1; background: #fff; padding: 24px; border-radius: 12px; text-align: center; border: 1px dashed var(--gold-primary);">
        <p style="font-size:0.95rem;color:var(--text-primary);margin-bottom:6px;">
          For your specific combination, our dermatologists recommend our universal daily anchor: <strong>Aqua Gel Sunscreen SPF 50+</strong> and <strong>Glutathione Radiance Cleanser</strong>!
        </p>
        <span style="font-size:0.82rem;color:var(--text-muted);">These two formulas protect and reset barrier health across all skin types.</span>
      </div>
    `;
  }
};

// Render Curated Clinical Bundles (From Chosen Store & Molecular Company)
export function renderBundleKits() {
  const container = document.getElementById('bundleKitsGrid');
  if (!container) return;

  container.innerHTML = BUNDLE_KITS.map(bundle => {
    const productImgs = bundle.items
      .map(id => PRODUCTS.find(p => p.id === id)?.image)
      .filter(Boolean);

    return `
      <div class="bundle-kit-card">
        <div class="bundle-kit-badge">${bundle.badge}</div>
        
        <div class="bundle-kit-media">
          <div class="bundle-kit-thumbnails">
            ${productImgs.map(img => `<img src="${img}" alt="Routine Product" class="bundle-thumb" />`).join('<span class="bundle-plus">+</span>')}
          </div>
        </div>

        <div class="bundle-kit-body">
          <h3 class="bundle-kit-title">${bundle.title}</h3>
          <p class="bundle-kit-subtitle">${bundle.subtitle}</p>
          <div class="bundle-kit-item-pills">
            ${bundle.itemNames.split(' + ').map(name => `<span class="bundle-item-pill">${name}</span>`).join('')}
          </div>

          <div class="bundle-kit-freebie-tag">
            <span style="font-size:1.1rem;">🎁</span>
            <span>Includes <strong>${bundle.freebie}</strong></span>
          </div>

          <div class="bundle-kit-pricing">
            <div class="bundle-price-col">
              <span class="bundle-curr-price">₹${bundle.price.toLocaleString('en-IN')}</span>
              <span class="bundle-mrp">₹${bundle.mrp.toLocaleString('en-IN')}</span>
              <span class="bundle-savings-badge">${bundle.savings}</span>
            </div>
            <button class="btn btn-gold" onclick="window.bestieStore.addBundleToCart('${bundle.id}')">
              Add Complete Routine 🛍️
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
window.renderBundleKits = renderBundleKits;

// Cart Drawer Coupon Helpers
window.applyCouponFromInput = function () {
  const input = document.getElementById('couponCodeInput');
  if (!input) return;
  const code = input.value;
  if (window.bestieStore.applyCoupon(code)) {
    input.value = '';
    window.bestieStore.updateCartUI();
  }
};

window.quickApplyCoupon = function (code) {
  if (window.bestieStore.applyCoupon(code)) {
    window.bestieStore.updateCartUI();
  }
};

window.removeCouponFromCart = function () {
  window.bestieStore.removeCoupon();
  window.bestieStore.updateCartUI();
};

// FAQ Accordion Toggle
window.toggleFaq = function (button) {
  const faqItem = button.closest('.faq-item');
  if (faqItem) {
    faqItem.classList.toggle('active');
  }
};

// Cart Drawer Handlers
export function openCart() {
  document.getElementById('cartDrawer').classList.add('active');
  document.getElementById('drawerBackdrop').classList.add('active');
}

export function closeCart() {
  document.getElementById('cartDrawer').classList.remove('active');
  document.getElementById('drawerBackdrop').classList.remove('active');
}

window.openCart = openCart;
window.closeCart = closeCart;

// Toast Notifications
export function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="toast-icon">✨</span> <span>${message}</span>`;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
}

// Simulated Instant UPI & Address Checkout Sheet
window.triggerCheckout = function () {
  const total = window.bestieStore.getCartFinalTotal();
  if (total === 0) {
    showToast('Your cart is empty! Add products first.');
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'pdp-modal active';
  modal.id = 'checkoutSheet';
  modal.innerHTML = `
    <div class="pdp-modal-content" style="max-width:520px;padding:32px;">
      <button class="pdp-close-btn" onclick="document.getElementById('checkoutSheet').remove();">✕</button>
      
      <div style="text-align:center;margin-bottom:20px;">
        <div style="font-size:2rem;margin-bottom:6px;">💛</div>
        <h3 style="font-family:var(--font-heading);font-size:1.4rem;font-weight:800;">Bestie Cares Secure Checkout</h3>
        <p style="font-size:0.85rem;color:var(--text-muted);">Love, Care, Compassion, Trust • 256-Bit Encrypted</p>
      </div>

      <div style="background:var(--bg-surface);padding:14px;border-radius:8px;margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;font-size:0.9rem;margin-bottom:4px;">
          <span>Items Total:</span>
          <strong>₹${window.bestieStore.getCartSubtotal().toLocaleString('en-IN')}</strong>
        </div>
        ${window.bestieStore.getDiscountAmount() > 0 ? `
          <div style="display:flex;justify-content:space-between;font-size:0.85rem;color:#166534;margin-bottom:4px;">
            <span>Coupon Discount (${window.bestieStore.appliedCoupon.code}):</span>
            <strong>-₹${window.bestieStore.getDiscountAmount().toLocaleString('en-IN')}</strong>
          </div>
        ` : ''}
        <div style="display:flex;justify-content:space-between;font-size:1.05rem;font-weight:800;border-top:1px solid var(--border-light);padding-top:8px;margin-top:6px;">
          <span>Payable Amount:</span>
          <span style="color:var(--gold-dark);">₹${total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <!-- Quick Delivery Details -->
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">
        <input type="text" placeholder="Full Name" style="padding:10px 14px;border:1.5px solid var(--border-medium);border-radius:6px;" required value="Sarah M." />
        <input type="tel" placeholder="Mobile Number (for delivery updates)" style="padding:10px 14px;border:1.5px solid var(--border-medium);border-radius:6px;" required value="+91 98765 43210" />
        <input type="text" placeholder="Shipping Address & Flat No." style="padding:10px 14px;border:1.5px solid var(--border-medium);border-radius:6px;" required value="Plot 42, Green Avenue, Anna Nagar" />
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <input type="text" placeholder="City" style="padding:10px 14px;border:1.5px solid var(--border-medium);border-radius:6px;" value="Chennai" />
          <input type="text" placeholder="PIN Code" style="padding:10px 14px;border:1.5px solid var(--border-medium);border-radius:6px;" value="600040" />
        </div>
      </div>

      <!-- Payment Method Selection -->
      <div style="font-size:0.85rem;font-weight:700;margin-bottom:10px;">Select Instant Payment:</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">
        <button class="btn btn-gold" style="width:100%;padding:14px;" onclick="window.confirmOrder('Google Pay / PhonePe UPI')">
          ⚡ Pay ₹${total.toLocaleString('en-IN')} via Instant UPI (GPay / PhonePe / Paytm)
        </button>
        <button class="btn btn-primary" style="width:100%;padding:12px;" onclick="window.confirmOrder('Debit / Credit Card')">
          Pay via Debit / Credit Card
        </button>
        <button class="btn btn-outline" style="width:100%;padding:10px;" onclick="window.confirmOrder('Cash On Delivery (COD)')">
          Pay via Cash on Delivery (COD)
        </button>
      </div>

      <div style="font-size:0.75rem;color:var(--text-muted);text-align:center;">
        🔒 All transactions are secured by 256-bit SSL encryption.
      </div>
    </div>
  `;
  document.body.appendChild(modal);
};

window.confirmOrder = function (method) {
  const sheet = document.getElementById('checkoutSheet');
  if (sheet) sheet.remove();

  const orderId = `BC-${Math.floor(100000 + Math.random() * 900000)}`;
  window.bestieStore.cart = [];
  window.bestieStore.saveCart();
  closeCart();

  const successModal = document.createElement('div');
  successModal.className = 'pdp-modal active';
  successModal.id = 'orderSuccessModal';
  successModal.innerHTML = `
    <div class="pdp-modal-content" style="max-width:460px;padding:36px;text-align:center;">
      <button class="pdp-close-btn" onclick="document.getElementById('orderSuccessModal').remove();">✕</button>
      <div style="font-size:3.5rem;margin-bottom:12px;">🎉</div>
      <h3 style="font-family:var(--font-heading);font-size:1.6rem;font-weight:800;color:var(--text-primary);margin-bottom:8px;">
        Thank You For Your Order!
      </h3>
      <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:16px;">
        Your order <strong>#${orderId}</strong> has been successfully placed via ${method}.
      </p>
      <div style="background:var(--bg-surface);padding:14px;border-radius:8px;font-size:0.82rem;color:var(--text-secondary);margin-bottom:20px;text-align:left;">
        <div>🚚 Estimated Delivery: <strong>2 - 3 Days</strong></div>
        <div>📱 Tracking link sent via SMS to <strong>+91 98765 43210</strong></div>
        <div>✨ Thank you for choosing Bestie Cares!</div>
      </div>
      <button class="btn btn-gold" style="width:100%;" onclick="document.getElementById('orderSuccessModal').remove(); window.navigateTo('home');">
        Continue Shopping
      </button>
    </div>
  `;
  document.body.appendChild(successModal);
};

// Initialize router and listeners
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  renderBundleKits();
  window.bestieStore.updateCartUI();

  // Scroll listener for sticky buy bar on PDP
  window.addEventListener('scroll', () => {
    const stickyBarEl = document.getElementById('stickyBuyBar');
    if (stickyBarEl && window.bestieStore.currentView === 'pdp') {
      if (window.scrollY > 380) {
        stickyBarEl.classList.add('visible');
      } else {
        stickyBarEl.classList.remove('visible');
      }
    }
  });

  // Check URL hash for direct product link (e.g. #/product/sunscreen)
  const hash = window.location.hash;
  if (hash.startsWith('#/product/')) {
    const prodId = hash.replace('#/product/', '');
    window.navigateTo('pdp', prodId);
  } else {
    window.navigateTo('home');
  }

  // Back button in browser history
  window.addEventListener('popstate', () => {
    const currentHash = window.location.hash;
    if (currentHash.startsWith('#/product/')) {
      const prodId = currentHash.replace('#/product/', '');
      window.navigateTo('pdp', prodId);
    } else {
      window.navigateTo('home');
    }
  });

  // Close backdrops on click
  const backdrop = document.getElementById('drawerBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeCart();
    });
  }

  // Keyboard Escape listener
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeCart();
      const sheet = document.getElementById('checkoutSheet');
      if (sheet) sheet.remove();
      const successModal = document.getElementById('orderSuccessModal');
      if (successModal) successModal.remove();
    }
  });

  // Video Controls Handlers
  window.toggleHeroVideoSound = function(e) {
    if (e) e.stopPropagation();
    const video = document.getElementById('heroReelVideo');
    const icon = document.getElementById('heroSoundIcon');
    if (!video) return;
    video.muted = !video.muted;
    if (icon) {
      icon.textContent = video.muted ? '🔇' : '🔊';
    }
  };

  window.toggleTextureVideoPlay = function(e) {
    if (e) e.stopPropagation();
    const video = document.getElementById('featureTextureVideo');
    const btn = document.getElementById('texturePlayBtn');
    if (!video) return;
    if (video.paused) {
      video.play();
      if (btn) btn.textContent = '⏸ Pause';
    } else {
      video.pause();
      if (btn) btn.textContent = '▶ Play';
    }
  };

  window.toggleTextureVideoMute = function(e) {
    if (e) e.stopPropagation();
    const video = document.getElementById('featureTextureVideo');
    const btn = document.getElementById('textureMuteBtn');
    if (!video) return;
    video.muted = !video.muted;
    if (btn) {
      btn.textContent = video.muted ? '🔊 Sound On' : '🔇 Mute';
    }
  };
});
