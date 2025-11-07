# Testing Strategy - Comprehensive Guide

**Datum**: 7. November 2025  
**Status**: Strategy dokumentiert, Implementation geplant

---

## 🎯 Testing-Ziele

### Quantitative Ziele
- **Unit Test Coverage**: 80%+
- **Integration Test Coverage**: 70%+
- **E2E Critical Paths**: 100%
- **Lighthouse Score**: 90+ (all categories)
- **Bug Density**: < 1 Bug / 100 LOC

### Qualitative Ziele
- Alle User Flows funktionieren
- Keine kritischen Bugs
- Performance unter Last
- Cross-Browser Compatibility

---

## 1. Unit Testing

### Tools
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event
```

### Test-Bereiche

#### Utilities (Priority 1)
- `lib/game/formulas.ts` - XP, Level, Stats Berechnung
- `lib/personalization/recommendations.ts` - Recommendation Logic
- `lib/utils/cache.ts` - Caching Logic
- `lib/utils/error-handling.ts` - Error Handling

**Beispiel:**
```typescript
// __tests__/lib/game/formulas.test.ts
import { calculateXpForNextLevel, calculateTotalStrength } from '@/lib/game/formulas';

describe('Game Formulas', () => {
  describe('calculateXpForNextLevel', () => {
    it('should return correct XP for level 1', () => {
      expect(calculateXpForNextLevel(1)).toBe(100);
    });

    it('should scale exponentially', () => {
      expect(calculateXpForNextLevel(10)).toBeGreaterThan(calculateXpForNextLevel(5) * 2);
    });
  });

  describe('calculateTotalStrength', () => {
    it('should sum all stats correctly', () => {
      const stats = { faith: 10, wisdom: 10, knowledge: 10, service: 10, leadership: 10 };
      expect(calculateTotalStrength(stats)).toBe(50);
    });
  });
});
```

#### Components (Priority 2)
- `components/ui/Button.tsx`
- `components/ui/Card.tsx`
- `components/ui/ProgressBar.tsx`
- `components/character/StatsDisplay.tsx`

**Beispiel:**
```typescript
// __tests__/components/ui/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});
```

---

## 2. Integration Testing

### API Routes Testing

#### Tools
```bash
npm install --save-dev supertest
```

#### Test-Bereiche
- Auth Endpoints (`/api/auth/*`)
- Character Endpoints (`/api/character/*`)
- Lessons Endpoints (`/api/lessons/*`)
- Missions Endpoints (`/api/missions/*`)

**Beispiel:**
```typescript
// __tests__/api/character/stats.test.ts
import { GET } from '@/app/api/character/stats/route';
import { createMocks } from 'node-mocks-http';

describe('/api/character/stats', () => {
  it('should return 401 without auth', async () => {
    const { req } = createMocks({ method: 'GET' });
    const response = await GET(req);
    expect(response.status).toBe(401);
  });

  it('should return character stats with auth', async () => {
    // Mock authenticated session
    const { req } = createMocks({
      method: 'GET',
      session: { user: { id: 'test-user' } },
    });
    const response = await GET(req);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('level');
    expect(data).toHaveProperty('totalStrength');
  });
});
```

---

## 3. E2E Testing

### Tools
```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Critical User Flows

#### Flow 1: Signup → Character Creation → First Lesson
```typescript
// e2e/onboarding.spec.ts
import { test, expect } from '@playwright/test';

test('complete onboarding flow', async ({ page }) => {
  // 1. Signup
  await page.goto('/signup');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'Test123456');
  await page.click('button[type="submit"]');

  // 2. Onboarding
  await expect(page).toHaveURL('/onboarding');
  await page.click('text=Los geht\'s');
  // ... weitere Steps

  // 3. Character Creation
  await expect(page).toHaveURL('/character/create');
  await page.fill('input[name="name"]', 'Test Character');
  await page.click('text=Paulus'); // Rabbi auswählen
  await page.click('button:has-text("Charakter erstellen")');

  // 4. First Lesson
  await page.goto('/lessons');
  await page.click('.lesson-card:first-child button:has-text("Lektion starten")');
  await expect(page).toHaveURL(/\/lessons\/[^/]+/);
  
  // 5. Complete Lesson
  // ... Quiz ausfüllen
  await page.click('button:has-text("Antwort senden")');
  await expect(page.locator('text=Lektion abgeschlossen')).toBeVisible();
});
```

#### Flow 2: Daily Routine
```typescript
// e2e/daily-routine.spec.ts
test('complete daily routine', async ({ page }) => {
  await page.goto('/dashboard');
  
  // Check streak
  await expect(page.locator('.streak-display')).toBeVisible();
  
  // Complete daily quest
  await page.goto('/quests');
  await expect(page.locator('.quest-card')).toHaveCount(3);
  
  // Complete lesson
  await page.goto('/lessons');
  // ... complete lesson

  // Check XP gain
  await page.goto('/character');
  // ... verify XP increased
});
```

---

## 4. Performance Testing

### Lighthouse CI
```bash
npm install --save-dev @lhci/cli
```

**Configuration:**
```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "startServerCommand": "npm run start",
      "url": ["http://localhost:3000", "http://localhost:3000/lessons"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

### Load Testing
```bash
npm install --save-dev artillery
```

**Scenario:**
```yaml
# load-test.yml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - flow:
      - get:
          url: "/"
      - post:
          url: "/api/lessons/complete"
          json:
            lessonId: "test-lesson"
            score: 100
```

---

## 5. Cross-Browser Testing

### Browser Matrix
- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

### Tools
- BrowserStack (Cross-Browser)
- Playwright (Automated)
- Manual Testing

### Test Cases
1. Navigation funktioniert
2. Forms submit korrekt
3. Animations laufen smooth
4. Layout responsive
5. Images laden

---

## 6. Accessibility Testing

### Automated Tools
```bash
npm install --save-dev @axe-core/react
npm install --save-dev jest-axe
```

**Tests:**
```typescript
// __tests__/accessibility.test.tsx
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';
expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('should have no accessibility violations (Dashboard)', async () => {
    const { container } = render(<DashboardPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Testing
- [ ] Keyboard Navigation (Tab-Reihenfolge)
- [ ] Screen Reader (NVDA, JAWS, VoiceOver)
- [ ] Color Contrast (WebAIM Checker)
- [ ] Focus Indicators sichtbar
- [ ] ARIA Labels korrekt

---

## 7. Testing Schedule

### Week 1: Setup & Unit Tests
- Setup Jest + Testing Library
- Write Unit Tests für Utilities
- Write Component Tests
- Ziel: 50% Coverage

### Week 2: Integration & E2E
- Setup Playwright
- Write API Integration Tests
- Write Critical Path E2E Tests
- Ziel: 70% Coverage

### Week 3: Performance & Accessibility
- Lighthouse CI Setup
- Performance Optimization basierend auf Ergebnissen
- Accessibility Audit
- Fix WCAG Violations

### Week 4: Cross-Browser & Bug Fixes
- Cross-Browser Testing
- User Acceptance Testing (10 Alpha Testers)
- Bug Fixing
- Final QA Pass

---

## 8. Success Criteria

✅ **Testing Complete** wenn:
- [ ] 80%+ Unit Test Coverage
- [ ] All Critical E2E Paths pass
- [ ] Lighthouse Score 90+ (all categories)
- [ ] WCAG AA Compliance
- [ ] Cross-Browser Compatible
- [ ] No Critical Bugs
- [ ] Performance: < 2s Load Time
- [ ] 10 Alpha Testers approved

---

## 9. Bug Tracking

### Severity Levels
- **P0 (Critical)**: App-breaking, Production blocker
- **P1 (High)**: Major feature broken
- **P2 (Medium)**: Minor feature issue
- **P3 (Low)**: Cosmetic, Nice-to-have

### Bug Process
1. Report in GitHub Issues
2. Triage & Prioritize
3. Assign & Fix
4. Verify & Close

---

**Status**: Testing Strategy dokumentiert ✅  
**Implementation**: Benötigt externe Testing-Phase (4 Wochen)  
**Empfehlung**: Start mit Alpha Testing (10 User) für initiales Feedback

