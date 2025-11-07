# Assets & Sound Design Guide

**Datum**: 7. November 2025  
**Status**: Spezifikation & Placeholders dokumentiert

---

## 🎨 Asset-Creation Strategy

### Current Status: Placeholder-Strategie ✅
- Emoji Icons (👤⚔️🏆) als temporäre Lösung
- Funktional und kommunikativ
- Ermöglicht Development ohne Asset-Blockade

### Production Assets (External Resource benötigt)

#### 1. Character Sprites (2D Isometric)
**Spezifikation:**
- Style: 2D isometrisch, Tempel-Ästhetik
- Size: 64x64px bis 128x128px
- Animationen: Idle, Walk (4-8 Frames)
- Ausdrücke: Neutral, Happy, Determined
- Equipment-Layer: Separate Sprites für Helm, Chest, Weapon, etc.

**Benötigt:**
- 4 Rabbi Base Sprites (Paulus, Petrus, Mose, David)
- 6 Equipment-Layer pro Slot
- Walk Cycle Animation

**Tool-Empfehlungen:**
- Aseprite (Pixel Art)
- Piskel (Free, Online)
- Adobe Illustrator/Photoshop

#### 2. Equipment Icons
**Spezifikation:**
- Style: Illustrativ, Gold/Blau Farbschema
- Size: 64x64px
- Format: PNG mit Transparenz
- Rarity-Border: Color-coded

**Benötigt:**
- 54 Equipment Item Icons
- Set-Variations für gleiche Slots

**Placeholder:**
```tsx
// components/equipment/EquipmentIcon.tsx
const slotEmojis = {
  HELM: '🛡️',
  CHEST: '👕',
  LEGS: '👖',
  FEET: '👞',
  WEAPON: '⚔️',
  ACCESSORY: '💍',
};
```

#### 3. Background Art
**Spezifikation:**
- Mission Backgrounds: Biblische Szenen
- Ägypten, Wüste, See, Tempel, etc.
- 1920x1080px
- Layered für Parallax

**Benötigt:**
- 15 Mission Backgrounds
- Dashboard Background (optional)
- Login Screen Background

#### 4. UI Icons (Professionell)
**Ersetzen:**
- Navigation Icons
- Action Icons
- Status Icons

**Library-Empfehlung:**
- Heroicons (MIT License)
- Lucide React (ISC License)
- Feather Icons

**Implementation:**
```bash
npm install lucide-react
```

```tsx
import { Home, Book, Sword, Users, Trophy } from 'lucide-react';
```

#### 5. Loading Animations
**Aktuelle Placeholders:**
- LoadingSpinner Component ✅
- Skeleton Components ✅

**Verbesserungen:**
- Branded Spinner (Kreuz/Tempel-Symbol)
- Smooth Skeleton Shimmer

---

## 🔊 Sound Design Strategy

### Current Status: Soundless ✅
- Funktional ohne Sound
- Sound als Enhancement, nicht Requirement

### Production Sound (External Resource benötigt)

#### 1. Background Music
**Spezifikation:**
- Style: Ambient, Tempel-Atmosphäre
- Instruments: Strings, Choir, Harp
- Tempo: Slow, meditative
- Length: 3-5 Min Loops

**Tracks benötigt:**
- Main Menu: Peaceful, Inviting
- Dashboard: Motivational, Uplifting
- Lessons: Focused, Calm
- Missions: Epic, Adventurous
- Boss Battles: Intense, Dramatic

**Sources:**
- Royalty-Free: Epidemic Sound, Artlist
- Free: Free Music Archive, YouTube Audio Library
- Custom: Commission composer

#### 2. Sound Effects
**Kategorien:**

**UI Sounds:**
- Button Click (subtle)
- Page Transition (whoosh)
- Notification (bell)
- Error (alert)
- Success (chime)

**Gameplay Sounds:**
- XP Gain (coins)
- Level Up (fanfare)
- Loot Drop (chest open)
- Achievement Unlock (celebration)
- Streak Milestone (fireworks)

**Mission Sounds:**
- Collect Item (pickup)
- Interact NPC (dialogue blip)
- Complete Objective (success)
- Boss Defeat (epic)

**Specs:**
- Format: MP3, OGG
- Length: < 2 Sekunden
- Volume: Normalized
- Quality: 128kbps

**Sources:**
- Free: Freesound.org, Zapsplat
- Premium: Epidemic Sound SFX
- Custom: Foley recording

#### 3. Implementation
```tsx
// lib/audio/soundManager.ts
export class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private musicVolume = 0.5;
  private sfxVolume = 0.7;
  private enabled = true;

  preload(sounds: { key: string; url: string }[]) {
    sounds.forEach(({ key, url }) => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      this.sounds.set(key, audio);
    });
  }

  play(key: string, volume?: number) {
    if (!this.enabled) return;
    
    const sound = this.sounds.get(key);
    if (sound) {
      sound.volume = volume || this.sfxVolume;
      sound.currentTime = 0;
      sound.play().catch(e => console.error('Sound play error:', e));
    }
  }

  playMusic(key: string, loop = true) {
    if (!this.enabled) return;
    
    const music = this.sounds.get(key);
    if (music) {
      music.volume = this.musicVolume;
      music.loop = loop;
      music.play().catch(e => console.error('Music play error:', e));
    }
  }

  stopMusic() {
    this.sounds.forEach(sound => {
      if (sound.loop) {
        sound.pause();
        sound.currentTime = 0;
      }
    });
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      this.stopMusic();
    }
  }
}
```

---

## 📋 Asset Checklist

### Phase 1: Placeholders (CURRENT) ✅
- [x] Emoji Icons überall
- [x] Loading Spinner
- [x] Skeleton States
- [x] CSS Gradients für Backgrounds

### Phase 2: Basic Assets (Beta)
- [ ] UI Icon Library (Lucide React)
- [ ] Simple Character Placeholder Graphics
- [ ] Basic Equipment Icons (64x64)
- [ ] 1-2 Background Tracks
- [ ] Essential SFX (Button, Level-Up, Achievement)

### Phase 3: Professional Assets (Launch)
- [ ] Custom Character Sprites mit Equipment
- [ ] All Equipment Icons
- [ ] Mission Backgrounds (15)
- [ ] Full Music Suite (5 tracks)
- [ ] Complete SFX Library (30+ sounds)

---

## 🚀 Implementation Plan

### Sofort (für Beta)
1. **Install Lucide React**
```bash
npm install lucide-react
```

2. **Replace Key Icons**
- Navigation Icons
- Dashboard Icons
- Action Buttons

3. **Basic SFX**
- Level-Up Sound
- Achievement Unlock
- Button Click

### Vor Launch (4-6 Wochen)
1. **Commission Artist**
- Character Sprites
- Equipment Icons
- Backgrounds

2. **License Music**
- Epidemic Sound Subscription
- Or Commission Composer

3. **SFX Library**
- Download/Create Complete Set
- Implement Sound Manager

---

## 💰 Budget-Empfehlung

### Low Budget (< 500€)
- Use Free Assets (Freesound, etc.)
- Lucide Icons (Free)
- DIY Pixel Art (Aseprite)
- Free Music (YouTube Audio Library)

### Medium Budget (500-2000€)
- Commission Character Art (500€)
- Epidemic Sound Subscription (13€/Monat)
- Premium SFX Bundle (200€)
- Custom Logo/Branding (300€)

### High Budget (2000€+)
- Professional Artist (1000€+)
- Custom Music Composition (800€+)
- Professional SFX Recording (400€+)
- Full Brand Identity (1000€+)

---

## ✅ Current Solution

**Für jetzt (Development/Beta):**
- ✅ Emoji Icons sind AUSREICHEND
- ✅ CSS-basierte Visuals sind SCHÖN
- ✅ Keine Sounds = Fokus auf Content
- ✅ Placeholder ermöglichen schnellen Launch

**Strategie:**
1. Launch mit Placeholders (Beta)
2. Sammle User-Feedback
3. Investiere basierend auf Traction
4. Professional Assets bei 1.000+ Usern

**Status**: Placeholder-Strategie dokumentiert ✅

