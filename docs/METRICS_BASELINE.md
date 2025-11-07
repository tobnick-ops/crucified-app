# Metrics Baseline & Analytics Strategy

**Datum**: 7. November 2025  
**Status**: Baseline definiert, Implementation geplant

---

## 1. Key Performance Indicators (KPIs)

### 1.1 Acquisition Metrics

| Metric | Baseline | Target (Month 1) | Target (Month 3) | Tracking Method |
|--------|----------|------------------|------------------|-----------------|
| **Total Users** | 0 | 100 | 1,000 | Database Count |
| **Daily Signups** | 0 | 3-5 | 10-15 | Analytics Event |
| **Signup Completion Rate** | - | 70% | 80% | Funnel Analysis |
| **Source Attribution** | - | Track | Track | UTM Parameters |

### 1.2 Activation Metrics (First Session)

| Metric | Baseline | Target | Importance |
|--------|----------|--------|------------|
| **Character Creation Complete** | - | 90% | 🔴 KRITISCH |
| **First Lesson Started** | - | 70% | 🔴 KRITISCH |
| **First Lesson Completed** | - | 60% | 🔴 KRITISCH |
| **Time to First Value** | - | < 5 Min | 🔴 KRITISCH |
| **Onboarding Completion** | - | 80% | 🟡 HOCH |

**First-Session Success** = Character Created + First Lesson Completed

### 1.3 Engagement Metrics

| Metric | Baseline | Target (Week 1) | Target (Month 1) | Industry Benchmark |
|--------|----------|-----------------|------------------|---------------------|
| **Daily Active Users (DAU)** | 0 | 60 | 600 | - |
| **Weekly Active Users (WAU)** | 0 | 80 | 900 | - |
| **Monthly Active Users (MAU)** | 0 | 100 | 1,000 | - |
| **DAU/MAU Ratio** | - | 50%+ | 60%+ | 20% typical |
| **Average Session Length** | - | 12 Min | 20 Min | 10-15 Min |
| **Sessions per User per Day** | - | 1.5 | 2.0 | 1.0-1.5 |
| **Lessons per Session** | - | 2 | 3 | - |

### 1.4 Retention Metrics

| Metric | Baseline | Target | Industry Standard |
|--------|----------|--------|-------------------|
| **Day 1 Retention** | - | 50%+ | 40-60% |
| **Day 7 Retention** | - | 40%+ | 20-30% |
| **Day 30 Retention** | - | 25%+ | 10-20% |
| **Day 90 Retention** | - | 15%+ | 5-10% |

**Retention Cohort Analysis**: Track by signup week

### 1.5 Progression Metrics

| Metric | Baseline | Target | Notes |
|--------|----------|--------|-------|
| **Average User Level** | - | 5 | After Month 1 |
| **Level Distribution** | - | Bell Curve | Track percentiles |
| **Lessons Completed (Total)** | 0 | 500 | Month 1 |
| **Missions Completed (Total)** | 0 | 200 | Month 1 |
| **Fragments Collected (Avg)** | - | 8 | Per Active User |
| **Equipment Items (Avg)** | - | 5 | Per Active User |

### 1.6 Content Consumption

| Metric | Baseline | Target | Purpose |
|--------|----------|--------|---------|
| **Lesson Completion Rate** | - | 70%+ | Content Quality |
| **Mission Completion Rate** | - | 80%+ | Difficulty Balance |
| **Lesson Difficulty Distribution** | - | 30/50/20 | Easy/Med/Hard |
| **Most Popular Lessons** | - | Track | Content Strategy |
| **Least Popular Lessons** | - | Track | Improvement Areas |
| **Drop-off Points** | - | Identify | UX Fixes |

### 1.7 Gamification Metrics

| Metric | Baseline | Target | Impact |
|--------|----------|--------|--------|
| **Avg Streak Length** | 0 | 7 Days | Retention +30% |
| **Users with 7+ Streak** | 0 | 30% | Core Users |
| **Users with 30+ Streak** | 0 | 10% | Super Users |
| **Daily Quest Completion** | - | 60% | Engagement |
| **Achievement Unlock Rate** | - | 3/week | Motivation |
| **Collection Completion** | - | 15% Avg | Long-term Goal |

### 1.8 Social Metrics (Later Phase)

| Metric | Baseline | Target | Phase |
|--------|----------|--------|-------|
| **Friends Added** | 0 | 2 Avg | Phase 4 |
| **Guild Participation** | 0 | 30% | Phase 4 |
| **Challenges Completed** | 0 | 1/week | Phase 4 |
| **Social Share Rate** | 0 | 10% | Phase 4 |

### 1.9 Quality Metrics

| Metric | Baseline | Target | Method |
|--------|----------|--------|--------|
| **App Store Rating** | - | 4.5+ | Reviews |
| **NPS Score** | - | 50+ | Survey |
| **Bug Reports** | - | < 5/week | Sentry |
| **Crash Rate** | - | < 1% | Sentry |
| **Average Load Time** | - | < 2s | Lighthouse |

---

## 2. Analytics Implementation Plan

### 2.1 Analytics Stack

**Tier 1: Essential (Sofort)**
```
✅ Database Tracking (Prisma)
   - User Actions (Lessons, Missions, etc.)
   - Progression Data
   - Timestamps

✅ Vercel Analytics (Built-in)
   - Page Views
   - Performance Metrics
   - Web Vitals

➕ Posthog (Open Source, Self-Hosted)
   - Event Tracking
   - Funnel Analysis
   - Session Recordings
   - Feature Flags
   - A/B Testing
```

**Tier 2: Growth (Später)**
```
➕ Sentry
   - Error Tracking
   - Performance Monitoring
   - Release Tracking

➕ Google Analytics 4 (Optional)
   - Traffic Sources
   - Demographics
   - Acquisition Channels
```

### 2.2 Event Tracking Schema

**Core Events:**

```typescript
// lib/analytics/events.ts

export const AnalyticsEvents = {
  // Authentication
  SIGNUP_STARTED: 'signup_started',
  SIGNUP_COMPLETED: 'signup_completed',
  SIGNIN_COMPLETED: 'signin_completed',
  
  // Onboarding
  ONBOARDING_STARTED: 'onboarding_started',
  ONBOARDING_STEP_COMPLETED: 'onboarding_step_completed',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  
  // Character
  CHARACTER_CREATED: 'character_created',
  LEVEL_UP: 'level_up',
  RABBI_SELECTED: 'rabbi_selected',
  
  // Lessons
  LESSON_STARTED: 'lesson_started',
  LESSON_COMPLETED: 'lesson_completed',
  LESSON_FAILED: 'lesson_failed',
  QUESTION_ANSWERED: 'question_answered',
  
  // Missions
  MISSION_STARTED: 'mission_started',
  MISSION_COMPLETED: 'mission_completed',
  MISSION_ABANDONED: 'mission_abandoned',
  
  // Equipment
  EQUIPMENT_EQUIPPED: 'equipment_equipped',
  EQUIPMENT_DROPPED: 'equipment_dropped',
  SET_BONUS_ACTIVATED: 'set_bonus_activated',
  
  // Skills
  SKILL_UNLOCKED: 'skill_unlocked',
  SKILL_TREE_VIEWED: 'skill_tree_viewed',
  
  // Collection
  FRAGMENT_UNLOCKED: 'fragment_unlocked',
  COLLECTION_VIEWED: 'collection_viewed',
  COLLECTION_MILESTONE: 'collection_milestone',
  
  // Daily System
  DAILY_LOGIN: 'daily_login',
  STREAK_MILESTONE: 'streak_milestone',
  STREAK_LOST: 'streak_lost',
  STREAK_RECOVERED: 'streak_recovered',
  
  // Quests & Achievements
  QUEST_COMPLETED: 'quest_completed',
  ACHIEVEMENT_UNLOCKED: 'achievement_unlocked',
  
  // Leaderboard
  LEADERBOARD_VIEWED: 'leaderboard_viewed',
  RANK_CHANGED: 'rank_changed',
  
  // Social (Later)
  FRIEND_ADDED: 'friend_added',
  CHALLENGE_CREATED: 'challenge_created',
  GUILD_JOINED: 'guild_joined',
  
  // Engagement
  SESSION_STARTED: 'session_started',
  SESSION_ENDED: 'session_ended',
  PAGE_VIEWED: 'page_viewed',
  
  // Errors
  ERROR_OCCURRED: 'error_occurred',
  API_ERROR: 'api_error',
} as const;

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: number;
}
```

### 2.3 Analytics Client Implementation

**File: `lib/analytics/client.ts`**

```typescript
// Analytics Client Wrapper
import posthog from 'posthog-js';

class AnalyticsClient {
  private initialized = false;

  initialize() {
    if (typeof window === 'undefined') return;
    if (this.initialized) return;

    // Posthog Init
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          posthog.opt_out_capturing(); // Disable in dev
        }
      },
    });

    this.initialized = true;
  }

  track(event: string, properties?: Record<string, any>) {
    if (!this.initialized) this.initialize();
    
    // Posthog
    posthog.capture(event, properties);
    
    // Database Logging (for critical events)
    if (this.isCriticalEvent(event)) {
      this.logToDatabase(event, properties);
    }
  }

  identify(userId: string, traits?: Record<string, any>) {
    if (!this.initialized) this.initialize();
    posthog.identify(userId, traits);
  }

  page(name?: string, properties?: Record<string, any>) {
    if (!this.initialized) this.initialize();
    posthog.capture('$pageview', { page: name, ...properties });
  }

  private isCriticalEvent(event: string): boolean {
    const critical = [
      'signup_completed',
      'character_created',
      'lesson_completed',
      'mission_completed',
      'level_up',
    ];
    return critical.includes(event);
  }

  private async logToDatabase(event: string, properties?: Record<string, any>) {
    try {
      await fetch('/api/analytics/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, properties }),
      });
    } catch (error) {
      console.error('Failed to log event to database:', error);
    }
  }
}

export const analytics = new AnalyticsClient();
```

### 2.4 React Hook für Analytics

**File: `lib/hooks/useAnalytics.ts`**

```typescript
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { analytics } from '@/lib/analytics/client';

export function useAnalytics() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      analytics.identify(session.user.id, {
        email: session.user.email,
        name: session.user.name,
      });
    }
  }, [session]);

  return {
    track: analytics.track.bind(analytics),
    page: analytics.page.bind(analytics),
  };
}

// Page Tracking Hook
export function usePageTracking() {
  const { page } = useAnalytics();
  
  useEffect(() => {
    page(window.location.pathname);
  }, []);
}
```

### 2.5 Analytics API Routes

**File: `app/api/analytics/log/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    const { event, properties } = await request.json();

    // Log to Database
    await prisma.analyticsEvent.create({
      data: {
        event,
        properties: properties || {},
        userId: session?.user?.id,
        timestamp: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics logging error:', error);
    return NextResponse.json({ error: 'Failed to log event' }, { status: 500 });
  }
}
```

**Database Schema Addition:**

```prisma
// prisma/schema.prisma

model AnalyticsEvent {
  id         String   @id @default(cuid())
  event      String
  properties Json?
  userId     String?
  user       User?    @relation(fields: [userId], references: [id])
  timestamp  DateTime @default(now())
  
  @@index([event])
  @@index([userId])
  @@index([timestamp])
}
```

---

## 3. Dashboard & Reporting

### 3.1 Admin Dashboard

**File: `app/admin/analytics/page.tsx`**

```typescript
// Real-time Analytics Dashboard
- User Metrics (DAU, MAU, Signups)
- Engagement Metrics (Sessions, Lesson Completion)
- Progression Metrics (Avg Level, Content Consumption)
- Retention Cohorts (D1, D7, D30)
- Top Content (Most Popular Lessons/Missions)
- Funnel Analysis (Signup → Activation → Engagement)
```

### 3.2 Posthog Dashboards

**Pre-built Dashboards:**

1. **Acquisition Dashboard**
   - Signups over Time
   - Signup Sources
   - Conversion Funnel

2. **Engagement Dashboard**
   - DAU/WAU/MAU Trends
   - Session Length Distribution
   - Feature Usage Heatmap

3. **Retention Dashboard**
   - Cohort Analysis
   - Churn Analysis
   - Retention Curves

4. **Content Dashboard**
   - Lesson Completion Rates
   - Mission Success Rates
   - Drop-off Analysis

5. **Gamification Dashboard**
   - Streak Distribution
   - Achievement Unlock Rate
   - Quest Completion Rate

### 3.3 Automated Reports

**Weekly Email Report:**
- User Growth
- Engagement Summary
- Top Issues
- Key Achievements

**Monthly Report:**
- Comprehensive Metrics
- Cohort Analysis
- Content Performance
- Recommendations

---

## 4. A/B Testing Strategy

### 4.1 Test Cases (Priority)

**Onboarding Tests:**
1. Rabbi Selection: Quiz vs Direct Choice
2. Tutorial Length: 3 Min vs 5 Min
3. First Lesson: Easy vs Medium Difficulty

**Engagement Tests:**
1. Daily Goal: 1 Lesson vs 2 Lessons
2. Streak Display: Header vs Dashboard
3. Reward Reveal: Instant vs Animated

**UX Tests:**
1. Navigation: Top Bar vs Bottom Bar (Mobile)
2. Dashboard Layout: Cards vs List
3. Lesson Card: Compact vs Detailed

### 4.2 Feature Flags

**Posthog Feature Flags:**

```typescript
// lib/analytics/flags.ts
export const FeatureFlags = {
  NEW_ONBOARDING: 'new_onboarding',
  ACHIEVEMENT_SYSTEM: 'achievement_system',
  DAILY_QUESTS: 'daily_quests',
  SOCIAL_FEATURES: 'social_features',
  ANIMATED_REWARDS: 'animated_rewards',
} as const;

// Usage
const isNewOnboardingEnabled = posthog.isFeatureEnabled('new_onboarding');
```

---

## 5. Privacy & Compliance

### 5.1 Data Collection Policy

**What We Track:**
- User Actions (anonymizable)
- Performance Metrics
- Error Events
- Session Data

**What We DON'T Track:**
- Personal Messages (none exist)
- Payment Info (not applicable)
- Location Data (unless opt-in)
- Sensitive Personal Data

### 5.2 GDPR Compliance

**Requirements:**
- [ ] Privacy Policy aktualisieren
- [ ] Cookie Consent Banner (falls Cookies verwendet)
- [ ] Data Export Funktion (User can request data)
- [ ] Data Deletion Funktion (Right to be forgotten)
- [ ] Analytics Opt-out Option

**Implementation:**

```tsx
// components/privacy/CookieConsent.tsx
- Banner mit Accept/Decline
- Settings: Analytics On/Off
- Privacy Policy Link
```

### 5.3 Data Retention

**Policy:**
- Raw Events: 90 Tage
- Aggregated Data: 2 Jahre
- User Profiles: Bis zur Löschung
- Anonymized Data: Unbegrenzt

---

## 6. Implementation Checklist

### Phase 1: Foundation (Week 1)

- [ ] Setup Posthog Account
- [ ] Add Posthog SDK to Project
- [ ] Create Analytics Client (`lib/analytics/client.ts`)
- [ ] Create Analytics Hook (`lib/hooks/useAnalytics.ts`)
- [ ] Add Prisma Schema for AnalyticsEvent
- [ ] Implement API Route (`/api/analytics/log`)
- [ ] Add Track Calls to Critical Events:
  - [ ] Signup
  - [ ] Character Creation
  - [ ] Lesson Start/Complete
  - [ ] Mission Start/Complete
  - [ ] Level Up
- [ ] Test Event Tracking (Development)

### Phase 2: Comprehensive Tracking (Week 2)

- [ ] Add Track Calls to All Events (40+ events)
- [ ] Page View Tracking
- [ ] Session Tracking
- [ ] Error Tracking
- [ ] Performance Tracking
- [ ] Test Complete Flow

### Phase 3: Dashboards (Week 3)

- [ ] Create Posthog Dashboards (5 Dashboards)
- [ ] Create Admin Analytics Page
- [ ] Setup Automated Reports
- [ ] Setup Alerts (Critical Metrics)

### Phase 4: Optimization (Week 4)

- [ ] Setup A/B Tests
- [ ] Setup Feature Flags
- [ ] Implement Funnel Analysis
- [ ] Cohort Analysis Setup
- [ ] Privacy Compliance (GDPR)

---

## 7. Monitoring & Alerts

### 7.1 Critical Alerts

**Setup Alerts For:**

1. **Crash Rate > 2%** → Immediate Slack/Email
2. **Signup Completion < 60%** → Daily Email
3. **Day 1 Retention < 40%** → Daily Email
4. **API Error Rate > 5%** → Immediate Slack
5. **Average Load Time > 3s** → Daily Email
6. **DAU Drop > 20%** → Immediate Slack

### 7.2 Health Checks

**Daily Automated Checks:**
- Database Connection
- API Response Times
- Critical User Flows (Signup, Lesson, Mission)
- External Services Status

---

## 8. Success Criteria

✅ **Analytics Complete** wenn:

1. ✅ Posthog installiert und konfiguriert
2. ✅ Alle 40+ Events getrackt
3. ✅ 5 Posthog Dashboards erstellt
4. ✅ Admin Analytics Page funktional
5. ✅ A/B Testing Setup
6. ✅ Feature Flags implementiert
7. ✅ Privacy Policy aktualisiert
8. ✅ GDPR Compliance implementiert
9. ✅ Alerts konfiguriert
10. ✅ Weekly Reports automatisiert

**Timeline**: 4 Wochen für vollständige Implementation

---

**Status**: Metrics Baseline definiert  
**Nächste Schritte**: Analytics Implementation parallel zu Content Expansion

