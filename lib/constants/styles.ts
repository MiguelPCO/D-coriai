export type Style = {
  id: string
  name: string
  description: string
  promptBoost: string
  photoId: string
}

export const STYLES: Style[] = [
  {
    id: "minimalista",
    name: "Minimalista",
    description: "Líneas limpias, paleta neutra, sin exceso",
    promptBoost:
      "minimalist interior, clean lines, neutral palette, uncluttered, white walls, modern",
    photoId: "photo-1586023492125-27b2c045efd7",
  },
  {
    id: "nordico",
    name: "Nórdico",
    description: "Madera clara, texturas acogedoras, paredes blancas",
    promptBoost:
      "scandinavian interior, light wood, cozy textures, white walls, hygge atmosphere",
    photoId: "photo-1555041469-a586c61ea9bc",
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Ladrillo visto, metal, materiales crudos",
    promptBoost:
      "industrial interior, exposed brick, metal accents, raw materials, loft style",
    photoId: "photo-1558618666-fcd25c85cd64",
  },
  {
    id: "mediterraneo",
    name: "Mediterráneo",
    description: "Terracota cálida, arcos, luz natural",
    promptBoost:
      "mediterranean interior, warm terracotta, arched doorways, natural light, clay tiles",
    photoId: "photo-1600585154526-990dced4db0d",
  },
  {
    id: "japandi",
    name: "Japandi",
    description: "Wabi-sabi, zen, materiales naturales",
    promptBoost:
      "japandi interior, wabi-sabi, zen atmosphere, natural materials, muted palette",
    photoId: "photo-1615873968403-89e068629265",
  },
  {
    id: "clasico",
    name: "Clásico",
    description: "Molduras elegantes, telas ricas, atemporal",
    promptBoost:
      "classic interior, elegant moldings, rich fabrics, timeless furniture, symmetrical",
    photoId: "photo-1567016376408-0226e4d0c1ea",
  },
]

export function getUnsplashUrl(photoId: string, width = 800) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`
}
