// Interactive Onboarding Tutorial - 3-5 Minutes Story-based Flow
// Kritisch für First-Time User Experience gemäß GAMEREADY Plan

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

type OnboardingStep = 'welcome' | 'value-prop' | 'tutorial-1' | 'tutorial-2' | 'tutorial-3' | 'character-create' | 'first-quest' | 'complete';

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.name) {
      setUserName(session.user.name);
    }
  }, [session]);

  const nextStep = () => {
    const steps: OnboardingStep[] = ['welcome', 'value-prop', 'tutorial-1', 'tutorial-2', 'tutorial-3', 'character-create', 'first-quest', 'complete'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const skipOnboarding = () => {
    router.push('/character/create');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-temple-blue-dark)] to-[var(--color-temple-blue)] flex items-center justify-center">
        <div className="text-white text-xl">Lädt...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-temple-blue-dark)] to-[var(--color-temple-blue)] flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {/* STEP 1: WELCOME */}
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl w-full"
          >
            <Card className="text-center">
              <CardHeader>
                <div className="text-6xl mb-4">⚔️</div>
                <CardTitle className="text-4xl mb-4">Willkommen bei Crucified!</CardTitle>
                <CardDescription className="text-lg">
                  {userName ? `Hallo ${userName}!` : 'Hallo!'} Bist du bereit für eine epische Reise des Glaubens?
                </CardDescription>
              </CardHeader>
              <div className="p-6 space-y-4">
                <p className="text-[var(--text-secondary)]">
                  In den nächsten Minuten erfährst du, wie Crucified funktioniert und wie du deine Reise beginnst.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="primary" size="lg" onClick={nextStep}>
                    Los geht's! 🚀
                  </Button>
                  <Button variant="secondary" size="sm" onClick={skipOnboarding}>
                    Tutorial überspringen
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* STEP 2: VALUE PROPOSITION */}
        {step === 'value-prop' && (
          <motion.div
            key="value-prop"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-2xl w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Was ist Crucified?</CardTitle>
              </CardHeader>
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📖</div>
                    <h3 className="font-bold mb-2">Lerne</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Über 150 Lektionen aus der gesamten Bibel
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">⚔️</div>
                    <h3 className="font-bold mb-2">Kämpfe</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      15+ epische Missionen aus biblischen Geschichten
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏆</div>
                    <h3 className="font-bold mb-2">Wachse</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Levele deinen Charakter, sammle Ausrüstung, schalte Skills frei
                    </p>
                  </div>
                </div>

                <div className="bg-[var(--color-temple-gold)] bg-opacity-10 p-4 rounded-lg">
                  <p className="text-center font-medium">
                    💡 <span className="text-[var(--color-temple-gold)]">Gamifiziertes Lernen</span> erhöht die Motivation um bis zu 60%!
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button variant="primary" size="lg" onClick={nextStep}>
                    Zeig mir wie! →
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* STEP 3: TUTORIAL - CHARACTER SYSTEM */}
        {step === 'tutorial-1' && (
          <motion.div
            key="tutorial-1"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-2xl w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Dein Charakter 👤</CardTitle>
                <CardDescription>Das Herzstück deiner Reise</CardDescription>
              </CardHeader>
              <div className="p-6 space-y-4">
                <div className="bg-[var(--color-temple-blue)] bg-opacity-20 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <span className="text-2xl">⬆️</span> Level & XP
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Schließe Lektionen und Missionen ab, um XP zu sammeln und aufzusteigen. Höhere Level schalten neue Inhalte frei!
                  </p>
                </div>

                <div className="bg-[var(--color-temple-gold)] bg-opacity-20 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <span className="text-2xl">📊</span> 5 Stats
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong>Faith</strong>, <strong>Wisdom</strong>, <strong>Knowledge</strong>, <strong>Service</strong>, <strong>Leadership</strong> - 
                    Deine Stats steigen durch Skills und Equipment.
                  </p>
                </div>

                <div className="bg-[var(--color-temple-gold)] bg-opacity-20 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <span className="text-2xl">💪</span> Total Strength
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Summe aller Stats + Equipment-Boni + Collection-Bonus. Deine Macht im Leaderboard!
                  </p>
                </div>

                <Button variant="primary" size="lg" className="w-full" onClick={nextStep}>
                  Weiter →
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* STEP 4: TUTORIAL - LEARNING SYSTEM */}
        {step === 'tutorial-2' && (
          <motion.div
            key="tutorial-2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-2xl w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Lernen & Spielen 📖</CardTitle>
                <CardDescription>Zwei Wege zum Wachstum</CardDescription>
              </CardHeader>
              <div className="p-6 space-y-4">
                <div className="border-2 border-[var(--color-temple-gold)] p-4 rounded-lg">
                  <h3 className="font-bold mb-2 text-xl flex items-center gap-2">
                    <span>📖</span> Lektionen
                  </h3>
                  <ul className="text-sm text-[var(--text-secondary)] space-y-2 list-disc list-inside">
                    <li>Quiz-basiertes Lernen mit Bibel-Fragen</li>
                    <li>Tägliches Limit: 5 Lektionen pro Tag</li>
                    <li>XP-Belohnung basierend auf deiner Punktzahl</li>
                    <li>Schwierigkeit steigt mit deinem Level</li>
                  </ul>
                </div>

                <div className="border-2 border-[var(--color-temple-gold)] p-4 rounded-lg">
                  <h3 className="font-bold mb-2 text-xl flex items-center gap-2">
                    <span>🎮</span> Missionen
                  </h3>
                  <ul className="text-sm text-[var(--text-secondary)] space-y-2 list-disc list-inside">
                    <li>2D-Gameplay mit Phaser.js</li>
                    <li>Erlebe biblische Geschichten interaktiv</li>
                    <li>Resource Collection, Story Interaction, Boss-Battles</li>
                    <li>Schalte Fragmente für dein Sammelbuch frei</li>
                  </ul>
                </div>

                <div className="bg-[var(--color-temple-gold)] bg-opacity-10 p-3 rounded-lg">
                  <p className="text-sm text-center">
                    💡 <strong>Tipp:</strong> Beginne mit einfachen Lektionen, um schnell XP zu sammeln!
                  </p>
                </div>

                <Button variant="primary" size="lg" className="w-full" onClick={nextStep}>
                  Weiter →
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* STEP 5: TUTORIAL - PROGRESSION SYSTEMS */}
        {step === 'tutorial-3' && (
          <motion.div
            key="tutorial-3"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-2xl w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Progression & Belohnungen 🎁</CardTitle>
                <CardDescription>Viele Wege zum Erfolg</CardDescription>
              </CardHeader>
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[var(--color-temple-blue)] bg-opacity-20 p-4 rounded-lg">
                    <div className="text-2xl mb-2">⚔️</div>
                    <h3 className="font-bold mb-2">Equipment</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      50+ Items von Common bis Artifact. Rüste dich für den Kampf!
                    </p>
                  </div>

                  <div className="bg-[var(--color-temple-gold)] bg-opacity-20 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🌟</div>
                    <h3 className="font-bold mb-2">Skills</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Schalte mächtige Skills in deinem Skill Tree frei.
                    </p>
                  </div>

                  <div className="bg-[var(--color-temple-gold)] bg-opacity-20 p-4 rounded-lg">
                    <div className="text-2xl mb-2">📚</div>
                    <h3 className="font-bold mb-2">Sammelbuch</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      60+ Fragmente sammeln. Completion Bonus bis +100% Strength!
                    </p>
                  </div>

                  <div className="bg-[var(--color-temple-blue)] bg-opacity-20 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🏆</div>
                    <h3 className="font-bold mb-2">Leaderboard</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Messe dich mit anderen in 5 verschiedenen Kategorien!
                    </p>
                  </div>
                </div>

                <div className="border-2 border-[var(--color-temple-gold)] p-4 rounded-lg">
                  <h3 className="font-bold mb-2 text-center text-xl">🔥 Daily System</h3>
                  <p className="text-sm text-[var(--text-secondary)] text-center">
                    Baue deinen <strong>Streak</strong> auf! Je mehr aufeinanderfolgende Tage du spielst, 
                    desto größer die Belohnungen. Verpasse keinen Tag!
                  </p>
                </div>

                <Button variant="primary" size="lg" className="w-full" onClick={nextStep}>
                  Ich bin bereit! →
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* STEP 6: CHARACTER CREATE REDIRECT */}
        {step === 'character-create' && (
          <motion.div
            key="character-create"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-2xl w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Deine Reise beginnt jetzt! 🌟</CardTitle>
                <CardDescription>Erstelle deinen Charakter und wähle deinen Rabbi</CardDescription>
              </CardHeader>
              <div className="p-6 space-y-4">
                <div className="bg-gradient-to-r from-[var(--color-temple-gold)] to-[var(--color-temple-gold-dark)] p-6 rounded-lg text-center">
                  <p className="text-white font-bold text-lg mb-2">
                    Wähle einen der 4 Rabbis als deinen Lehrer:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-white text-sm">
                    <div>📜 Paulus - Briefe</div>
                    <div>🎣 Petrus - Führung</div>
                    <div>⚖️ Mose - Weisheit</div>
                    <div>👑 David - Anbetung</div>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] text-center">
                  Dein Rabbi bestimmt dein Start-Buch und deinen Skill Tree. Wähle weise!
                </p>

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  onClick={() => router.push('/character/create')}
                >
                  Charakter erstellen! ✨
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-2">
          {['welcome', 'value-prop', 'tutorial-1', 'tutorial-2', 'tutorial-3'].map((s, index) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-all ${
                step === s ? 'bg-[var(--color-temple-gold)] w-8' : 'bg-white bg-opacity-30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

