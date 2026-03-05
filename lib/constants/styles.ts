export function getUnsplashUrl(photoId: string, width = 800) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`
}

export type Style = {
  id: string
  name: string
  description: string
  promptBoost: string
  image: string
  promptSuggestions: string[]
}

export type StyleMix = {
  id: string
  name: string
  label: string
  styleIds: [string, string]
  description: string
  promptBoost: string
}

export const STYLES: Style[] = [
  {
    id: "minimalista",
    name: "Minimalista",
    description: "Líneas limpias, paleta neutra, sin exceso",
    promptBoost:
      "minimalist interior, clean lines, neutral palette, uncluttered, white walls, modern",
    image: "/images/minimalista.jpg",
    promptSuggestions: [
      "añade luz natural con grandes ventanales",
      "suelo de mármol blanco o microcemento",
      "sin cuadros en las paredes, solo una pieza de arte",
      "mobiliario de perfil bajo y líneas rectas",
    ],
  },
  {
    id: "nordico",
    name: "Nórdico",
    description: "Madera clara, texturas acogedoras, paredes blancas",
    promptBoost:
      "scandinavian interior, light wood, cozy textures, white walls, hygge atmosphere",
    image: "/images/nordico.jpg",
    promptSuggestions: [
      "añade plantas en macetas de cerámica blanca",
      "alfombra de lana beige o gris suave",
      "velas y luz cálida ambiente",
      "madera de abedul o pino clara",
    ],
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Ladrillo visto, metal, materiales crudos",
    promptBoost:
      "industrial interior, exposed brick, metal accents, raw materials, loft style",
    image: "/images/industrial.jpg",
    promptSuggestions: [
      "tuberías y conductos vistos en el techo",
      "ladrillo visto en una pared",
      "suelo de hormigón pulido o resina",
      "iluminación Edison con bombillas vistas",
    ],
  },
  {
    id: "mediterraneo",
    name: "Mediterráneo",
    description: "Terracota cálida, arcos, luz natural",
    promptBoost:
      "mediterranean interior, warm terracotta, arched doorways, natural light, clay tiles",
    image: "/images/mediterraneo.jpg",
    promptSuggestions: [
      "arcos en puertas o ventanas",
      "azulejos de terracota o hidráulicos en el suelo",
      "paredes encaladas en blanco puro",
      "vegetación abundante: buganvillas, plantas aromáticas",
    ],
  },
  {
    id: "japandi",
    name: "Japandi",
    description: "Wabi-sabi, zen, materiales naturales",
    promptBoost:
      "japandi interior, wabi-sabi, zen atmosphere, natural materials, muted palette",
    image: "/images/japandi.jpg",
    promptSuggestions: [
      "mobiliario de perfil muy bajo, pegado al suelo",
      "cerámica artesanal con irregularidades visibles",
      "luz tamizada a través de paneles shoji",
      "bambú, piedra y madera sin tratar como materiales",
    ],
  },
  {
    id: "clasico",
    name: "Clásico",
    description: "Molduras elegantes, telas ricas, atemporal",
    promptBoost:
      "classic interior, elegant moldings, rich fabrics, timeless furniture, symmetrical",
    image: "/images/clasico.jpg",
    promptSuggestions: [
      "molduras ornamentadas en paredes y techo",
      "muebles con patas torneadas y telas damasco",
      "chimenea de mármol como elemento central",
      "araña de cristal en el techo",
    ],
  },
  {
    id: "boho",
    name: "Bohemio",
    description: "Macramé, textiles globales, espíritu libre",
    promptBoost:
      "bohemian interior, macrame wall art, rattan furniture, layered textiles, plants, eclectic global decor, earthy tones",
    image: getUnsplashUrl("photo-1586023492125-27b2c045efd7"),
    promptSuggestions: [
      "macramé en la pared",
      "plantas colgantes y suculentas",
      "alfombras en capas de distintas texturas",
      "cojines con estampados étnicos",
    ],
  },
  {
    id: "art-deco",
    name: "Art Déco",
    description: "Geometría glamurosa, tonos joya, dorados",
    promptBoost:
      "art deco interior, bold geometric patterns, jewel tones, gold accents, sunburst motifs, velvet furniture, chrome details",
    image: getUnsplashUrl("photo-1618221195710-dd6b41faaea6"),
    promptSuggestions: [
      "espejos con marcos dorados geométricos",
      "terciopelo en tonos esmeralda o zafiro",
      "suelo de mármol con incrustaciones geométricas",
      "iluminación de pared art déco en latón",
    ],
  },
  {
    id: "wabi-sabi",
    name: "Wabi-Sabi",
    description: "Belleza en la imperfección, texturas crudas",
    promptBoost:
      "wabi-sabi interior, imperfect beauty, raw textures, organic shapes, aged wood, handmade ceramics, natural imperfections, earthy neutrals",
    image: getUnsplashUrl("photo-1558618666-fcd25c85cd64"),
    promptSuggestions: [
      "cerámica artesanal con grietas visibles y formas irregulares",
      "madera sin tratar con veta natural",
      "paredes de cal con textura rugosa",
      "flores secas y ramas naturales como decoración",
    ],
  },
  {
    id: "costero",
    name: "Costero",
    description: "Brisa marina, tonos arena y azul, relajado",
    promptBoost:
      "coastal interior, Hamptons style, driftwood textures, ocean blues, linen fabrics, bright airy spaces, natural rattan",
    image: getUnsplashUrl("photo-1512918728675-ed5a9ecdebfd"),
    promptSuggestions: [
      "maderas desgastadas tipo flotante (driftwood)",
      "telas de lino en blanco y azul claro",
      "cestas de mimbre y ratán como almacenaje",
      "toques de azul marino y arena en cojines",
    ],
  },
  {
    id: "mid-century",
    name: "Mid-Century",
    description: "Líneas orgánicas, patas cónicas, optimismo retro",
    promptBoost:
      "mid-century modern interior, organic forms, tapered legs, warm walnut wood, mustard yellow accents, Eames-era furniture, atomic age design",
    image: getUnsplashUrl("photo-1555041469-a586c61ea9bc"),
    promptSuggestions: [
      "sofá con patas cónicas de madera de nogal",
      "lámpara de arco en latón dorado",
      "papel pintado de patrones geométricos en la pared",
      "colores mostaza, naranja y verde azulado como acentos",
    ],
  },
  {
    id: "farmhouse",
    name: "Farmhouse",
    description: "Madera recuperada, acogedor, estilo granja",
    promptBoost:
      "modern farmhouse interior, shiplap white walls, reclaimed wood beams, open shelving, barn door, warm and cozy, galvanized metal accents",
    image: getUnsplashUrl("photo-1556909114-f6e7ad7d3136"),
    promptSuggestions: [
      "vigas de madera recuperada en el techo",
      "pared de tablillas blancas (shiplap)",
      "cocina con estantes abiertos y tarro mason",
      "puerta de granero corredera en madera oscura",
    ],
  },
  {
    id: "dark-academia",
    name: "Dark Academia",
    description: "Maderas oscuras, libros, atmósfera intelectual",
    promptBoost:
      "dark academia interior, dark wood paneling, floor-to-ceiling bookshelves, moody lighting, classical art, Persian rugs, leather armchair, scholarly atmosphere",
    image: getUnsplashUrl("photo-1481349518771-20055b2a7b24"),
    promptSuggestions: [
      "estanterías hasta el techo llenas de libros encuadernados",
      "butaca de cuero envejecido junto a lámpara de lectura",
      "globo terráqueo y esculturas de busto clásico",
      "alfombra persa oscura en granate y verde",
    ],
  },
  {
    id: "organico-moderno",
    name: "Orgánico Moderno",
    description: "Curvas suaves, materiales naturales, 2025",
    promptBoost:
      "organic modern interior, curved sculptural furniture, warm earth tones, natural stone, linen and jute textiles, biophilic design, rounded shapes, warm minimalism 2025",
    image: getUnsplashUrl("photo-1586105251261-72a756497a11"),
    promptSuggestions: [
      "sofá con curvas orgánicas en tela boucle beige",
      "mesa de mármol travertino de forma irregular",
      "paredes de estuco liso en tono crema cálido",
      "plantas de gran tamaño como elemento escultórico",
    ],
  },
]

export const STYLE_MIXES: StyleMix[] = [
  {
    id: "mix-japandi-nordico",
    name: "Japandi Nórdico",
    label: "Japandi × Nórdico",
    styleIds: ["japandi", "nordico"],
    description: "Paz zen japonesa con la calidez hygge escandinava",
    promptBoost:
      "japandi scandinavian fusion interior, zen calm, hygge warmth, light wood, handmade ceramics, natural textiles, neutral earthy palette, minimal clutter",
  },
  {
    id: "mix-mediterraneo-boho",
    name: "Mediterráneo Boho",
    label: "Mediterráneo × Bohemio",
    styleIds: ["mediterraneo", "boho"],
    description: "Arcos mediterráneos con textiles globales y espíritu libre",
    promptBoost:
      "mediterranean bohemian interior, white arched walls, colorful ethnic textiles, terracotta tiles, macrame, layered rugs, plants, warm vibrant accents",
  },
  {
    id: "mix-industrial-mid-century",
    name: "Loft Mid-Century",
    label: "Industrial × Mid-Century",
    styleIds: ["industrial", "mid-century"],
    description: "Espacio loft crudo con mobiliario de diseño icónico de los 60",
    promptBoost:
      "industrial mid-century loft interior, exposed brick, raw concrete, tapered leg furniture, warm walnut accents, Edison lighting, mustard vintage upholstery",
  },
  {
    id: "mix-clasico-art-deco",
    name: "Glamour Clásico",
    label: "Clásico × Art Déco",
    styleIds: ["clasico", "art-deco"],
    description: "Elegancia atemporal con geometría glamurosa y dorados",
    promptBoost:
      "classic art deco interior, ornate moldings, geometric gold patterns, jewel tone velvet, marble floors, statement chandelier, symmetrical luxury",
  },
  {
    id: "mix-costero-minimalista",
    name: "Costero Minimal",
    label: "Costero × Minimalista",
    styleIds: ["costero", "minimalista"],
    description: "Limpieza minimalista con la frescura costera de los Hamptons",
    promptBoost:
      "coastal minimalist interior, clean white walls, driftwood textures, ocean blue accents, uncluttered spaces, linen, natural light, Hamptons style",
  },
  {
    id: "mix-wabi-sabi-farmhouse",
    name: "Rústico Zen",
    label: "Wabi-Sabi × Farmhouse",
    styleIds: ["wabi-sabi", "farmhouse"],
    description: "Imperfección natural japonesa con calidez de granja americana",
    promptBoost:
      "wabi-sabi farmhouse interior, reclaimed wood beams, handmade ceramics, natural imperfections, cozy rustic warmth, earthy neutrals, organic textures",
  },
  {
    id: "mix-organico-moderno-japandi",
    name: "Zen Orgánico",
    label: "Orgánico Moderno × Japandi",
    styleIds: ["organico-moderno", "japandi"],
    description: "Curvas contemporáneas con filosofía zen y materiales naturales",
    promptBoost:
      "organic modern japandi interior, curved sculptural forms, zen philosophy, natural stone, warm neutrals 2025, handcrafted objects, biophilic rounded shapes",
  },
  {
    id: "mix-dark-academia-clasico",
    name: "Academia Clásica",
    label: "Dark Academia × Clásico",
    styleIds: ["dark-academia", "clasico"],
    description: "Atmósfera intelectual oscura con elegancia clásica europea",
    promptBoost:
      "dark academia classical interior, dark paneled walls, floor bookshelves, ornate moldings, Persian rugs, leather furniture, moody scholarly luxury",
  },
]

