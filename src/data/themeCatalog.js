import moonlitDesktop from '../assets/themes/moonlit-cemetery/background-desktop.webp'
import moonlitMobile from '../assets/themes/moonlit-cemetery/background-mobile.webp'
import moonlitPreview from '../assets/themes/moonlit-cemetery/preview.webp'
import pumpkinDesktop from '../assets/themes/pumpkin-lantern-alley/background-desktop.webp'
import pumpkinMobile from '../assets/themes/pumpkin-lantern-alley/background-mobile.webp'
import pumpkinPreview from '../assets/themes/pumpkin-lantern-alley/preview.webp'
import bonewoodDesktop from '../assets/themes/bonewood-forest/background-desktop.webp'
import bonewoodMobile from '../assets/themes/bonewood-forest/background-mobile.webp'
import bonewoodPreview from '../assets/themes/bonewood-forest/preview.webp'

// Theme Catalog | Stable visual content IDs for current themes and future shop items
export const themeCatalog = [
  {
    id: 'moonlit-cemetery',
    name: 'Moonlit Cemetery',
    description: 'Silver moonlight, crooked stones, and quiet violet fog.',
    preview: moonlitPreview,
    desktopBackground: moonlitDesktop,
    mobileBackground: moonlitMobile,
    defaultCharacterId: 'classic-stickman',
    defaultFrameId: 'crooked-gallows',
    availability: 'free',
    priceType: 'free',
    releaseStatus: 'released',
    atmosphere: 'moon-fog',
    motionStrength: 'gentle',
    palette: {
      background: '#171528',
      surface: 'rgba(25, 23, 39, 0.91)',
      surfaceStrong: 'rgba(11, 12, 20, 0.97)',
      text: '#eee9dc',
      muted: '#bbb4c7',
      accent: '#d18a55',
      accentSoft: '#827398',
      border: 'rgba(238, 233, 220, 0.18)',
      frame: '#15141d',
      frameHighlight: '#6f5b52',
      characterStroke: '#eee9dc',
      characterFill: '#544762',
      fog: 'rgba(190, 193, 214, 0.17)',
      success: '#9bc98d',
      danger: '#e1786d'
    }
  },
  {
    id: 'pumpkin-lantern-alley',
    name: 'Pumpkin Lantern Alley',
    description: 'Crooked rooftops and ember-lit windows along a midnight lane.',
    preview: pumpkinPreview,
    desktopBackground: pumpkinDesktop,
    mobileBackground: pumpkinMobile,
    defaultCharacterId: 'stitched-ragdoll',
    defaultFrameId: 'crooked-gallows',
    availability: 'free',
    priceType: 'free',
    releaseStatus: 'released',
    atmosphere: 'ember-haze',
    motionStrength: 'playful',
    palette: {
      background: '#2b172b',
      surface: 'rgba(45, 24, 42, 0.91)',
      surfaceStrong: 'rgba(22, 12, 23, 0.97)',
      text: '#f4ead8',
      muted: '#d0b8c8',
      accent: '#df8737',
      accentSoft: '#b85e42',
      border: 'rgba(244, 234, 216, 0.2)',
      frame: '#291719',
      frameHighlight: '#9b643c',
      characterStroke: '#f2dfbf',
      characterFill: '#7f3d4e',
      fog: 'rgba(198, 149, 184, 0.13)',
      success: '#a9c883',
      danger: '#ef7564'
    }
  },
  {
    id: 'bonewood-forest',
    name: 'Bonewood Forest',
    description: 'Twisted pale branches drifting through moss-green mist.',
    preview: bonewoodPreview,
    desktopBackground: bonewoodDesktop,
    mobileBackground: bonewoodMobile,
    defaultCharacterId: 'stitched-ragdoll',
    defaultFrameId: 'twisted-branch',
    availability: 'free',
    priceType: 'free',
    releaseStatus: 'released',
    atmosphere: 'forest-mist',
    motionStrength: 'gentle',
    palette: {
      background: '#102024',
      surface: 'rgba(19, 34, 31, 0.91)',
      surfaceStrong: 'rgba(8, 18, 17, 0.97)',
      text: '#e6e4d3',
      muted: '#b7c0ad',
      accent: '#a98d55',
      accentSoft: '#6f8066',
      border: 'rgba(230, 228, 211, 0.18)',
      frame: '#3d3528',
      frameHighlight: '#aaa586',
      characterStroke: '#ece6d0',
      characterFill: '#586957',
      fog: 'rgba(148, 176, 155, 0.18)',
      success: '#9fc68d',
      danger: '#d87968'
    }
  }
]

export const characterCatalog = [
  {
    id: 'classic-stickman',
    name: 'Classic Stickman',
    description: 'A clean, moonlit line figure.',
    availability: 'free',
    releaseStatus: 'released'
  },
  {
    id: 'stitched-ragdoll',
    name: 'Stitched Ragdoll',
    description: 'An original cloth puppet with visible seams and button eyes.',
    availability: 'free',
    releaseStatus: 'released'
  }
]

export const frameCatalog = [
  {
    id: 'crooked-gallows',
    name: 'Crooked Gallows',
    description: 'A weathered, leaning structure with an iron brace.',
    availability: 'free',
    releaseStatus: 'released'
  },
  {
    id: 'twisted-branch',
    name: 'Twisted Branch',
    description: 'A bent forest branch with a fixed rope anchor.',
    availability: 'free',
    releaseStatus: 'released'
  }
]

export const defaultThemeId = 'moonlit-cemetery'
export const defaultCharacterId = 'classic-stickman'
export const defaultFrameId = 'crooked-gallows'

export function getThemeById(id) {
  return themeCatalog.find(theme => theme.id === id) || themeCatalog[0]
}

export function getCharacterById(id) {
  return characterCatalog.find(character => character.id === id) || characterCatalog[0]
}

export function getFrameById(id) {
  return frameCatalog.find(frame => frame.id === id) || frameCatalog[0]
}

export function themeToCssVariables(theme) {
  const palette = theme.palette

  return {
    '--theme-background': palette.background,
    '--theme-surface': palette.surface,
    '--theme-surface-strong': palette.surfaceStrong,
    '--theme-text': palette.text,
    '--theme-muted': palette.muted,
    '--theme-accent': palette.accent,
    '--theme-accent-soft': palette.accentSoft,
    '--theme-border': palette.border,
    '--theme-frame': palette.frame,
    '--theme-frame-highlight': palette.frameHighlight,
    '--theme-character-stroke': palette.characterStroke,
    '--theme-character-fill': palette.characterFill,
    '--theme-fog': palette.fog,
    '--theme-success': palette.success,
    '--theme-danger': palette.danger
  }
}
