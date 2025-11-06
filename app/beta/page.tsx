'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { FeedbackModal } from '@/components/feedback/FeedbackModal';
import { useState } from 'react';

export default function BetaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-temple-blue-dark)] to-[var(--color-temple-blue)] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4 temple-gradient text-transparent bg-clip-text">
            Crucified Beta
          </h1>
          <p className="text-xl text-white opacity-90">
            Hilf uns, die App zu verbessern!
          </p>
        </div>

        {/* PWA Installation Guide */}
        <Card>
          <CardHeader>
            <CardTitle>App installieren (PWA)</CardTitle>
            <CardDescription>
              Installiere Crucified als App auf deinem Gerät für einen direkten Start
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Desktop (Chrome/Edge)</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-300">
                <li>Öffne die App im Browser (Chrome oder Edge)</li>
                <li>Klicke auf das "Installieren"-Icon in der Adressleiste</li>
                <li>Oder: Menü → "App installieren"</li>
                <li>Die App erscheint mit Icon im Startmenü</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Mobile (iOS)</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-300">
                <li>Öffne die App in Safari</li>
                <li>Tippe auf das Teilen-Icon (Kasten mit Pfeil)</li>
                <li>Wähle "Zum Home-Bildschirm hinzufügen"</li>
                <li>Die App erscheint mit Icon auf dem Home-Bildschirm</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Mobile (Android)</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-300">
                <li>Öffne die App in Chrome</li>
                <li>Tippe auf das Menü (drei Punkte)</li>
                <li>Wähle "Zum Startbildschirm hinzufügen"</li>
                <li>Die App erscheint mit Icon auf dem Startbildschirm</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Beta Info */}
        <Card>
          <CardHeader>
            <CardTitle>Beta-Testing</CardTitle>
            <CardDescription>
              Aktuell in der Beta-Phase - Dein Feedback ist wichtig!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Was ist Beta?</h3>
              <p className="text-gray-300">
                Die App befindet sich noch in der Entwicklungsphase. Wir testen alle Features
                und sammeln Feedback, um die App zu verbessern.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Was kannst du testen?</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Character Creation & Development</li>
                <li>Lessons & Missions</li>
                <li>Equipment System</li>
                <li>Skill Trees</li>
                <li>Fragment Collection</li>
                <li>Leaderboard</li>
                <li>Daily System</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Bekannte Probleme</h3>
              <p className="text-gray-300">
                Während der Beta-Phase können Bugs auftreten. Bitte melde alle Probleme,
                die du findest, damit wir sie schnell beheben können.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Section */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback geben</CardTitle>
            <CardDescription>
              Dein Feedback hilft uns, die App zu verbessern
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Link href="/?feedback=feedback">
                <Button variant="primary">Allgemeines Feedback</Button>
              </Link>
              <Link href="/?feedback=bug">
                <Button variant="secondary">Bug melden</Button>
              </Link>
              <Link href="/?feedback=feature">
                <Button variant="secondary">Feature-Request</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>Los geht's</CardTitle>
            <CardDescription>
              Starte deine Reise im Glauben
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Link href="/signup">
                <Button variant="primary" size="lg">
                  Registrieren
                </Button>
              </Link>
              <Link href="/signin">
                <Button variant="secondary" size="lg">
                  Anmelden
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Browser Compatibility */}
        <Card>
          <CardHeader>
            <CardTitle>Browser-Kompatibilität</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-gray-300">
              <p><strong>Empfohlen:</strong> Chrome, Edge, Firefox, Safari (neueste Versionen)</p>
              <p><strong>Mobile:</strong> iOS Safari, Chrome Android, Samsung Internet</p>
              <p className="text-sm text-gray-400">
                PWA-Features funktionieren am besten in Chrome/Edge. Safari unterstützt PWA-Features teilweise.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

