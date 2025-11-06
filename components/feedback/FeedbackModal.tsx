'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'feedback' | 'bug' | 'feature';
}

export function FeedbackModal({ isOpen, onClose, type = 'feedback' }: FeedbackModalProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          message,
          rating,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setMessage('');
          setRating(null);
          setSubmitted(false);
        }, 2000);
      } else {
        alert('Fehler beim Senden des Feedbacks. Bitte versuche es erneut.');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      alert('Fehler beim Senden des Feedbacks. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'bug':
        return 'Bug melden';
      case 'feature':
        return 'Feature-Request';
      default:
        return 'Feedback geben';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'bug':
        return 'Beschreibe den Bug so detailliert wie möglich, damit wir ihn schnell beheben können.';
      case 'feature':
        return 'Teile uns mit, welche Features du dir wünschst.';
      default:
        return 'Dein Feedback hilft uns, die App zu verbessern.';
    }
  };

  if (submitted) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Card>
          <CardHeader>
            <CardTitle>Vielen Dank!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-lg mb-4">
              Dein Feedback wurde erfolgreich übermittelt. 🎉
            </p>
            <p className="text-center text-sm text-gray-400">
              Wir schätzen deine Hilfe sehr!
            </p>
          </CardContent>
        </Card>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card>
        <CardHeader>
          <CardTitle>{getTitle()}</CardTitle>
          <p className="text-sm text-gray-400 mt-2">{getDescription()}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === 'feedback' && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Bewertung (optional)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-colors ${
                        rating && rating >= star
                          ? 'text-[var(--color-temple-gold)]'
                          : 'text-gray-400 hover:text-[var(--color-temple-gold)]'
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {type === 'bug' ? 'Bug-Beschreibung' : type === 'feature' ? 'Feature-Beschreibung' : 'Deine Nachricht'}
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 bg-[var(--color-temple-blue-dark)] border border-[var(--color-temple-gold)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-temple-gold)]"
                placeholder={
                  type === 'bug'
                    ? 'Beschreibe den Bug...'
                    : type === 'feature'
                    ? 'Beschreibe deine Feature-Idee...'
                    : 'Teile uns dein Feedback mit...'
                }
                required
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Abbrechen
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || !message.trim()}
              >
                {isSubmitting ? 'Wird gesendet...' : 'Absenden'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Modal>
  );
}

