// Lesson Quiz Component gemäß Masterplan

'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { Modal } from '@/components/ui/Modal';

interface Question {
  id: string;
  questionText: string;
  questionType: string;
  correctAnswer: string;
  optionsJson: string | null;
}

interface LessonQuizProps {
  lesson: {
    id: string;
    title: string;
    questions: Question[];
  };
  onComplete: (answers: Record<string, string>) => void;
  onClose: () => void;
}

export const LessonQuiz: React.FC<LessonQuizProps> = ({
  lesson,
  onComplete,
  onClose,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === lesson.questions.length - 1;

  const handleAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onComplete(answers);
    } finally {
      setSubmitting(false);
    }
  };

  const parseOptions = (optionsJson: string | null): string[] => {
    if (!optionsJson) return [];
    try {
      const parsed = JSON.parse(optionsJson);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const renderQuestion = () => {
    const options = parseOptions(currentQuestion.optionsJson);
    const userAnswer = answers[currentQuestion.id] || '';

    switch (currentQuestion.questionType) {
      case 'multiple_choice':
        return (
          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                  userAnswer === option
                    ? 'border-[var(--color-temple-gold)] bg-[var(--color-temple-gold-light)] bg-opacity-20'
                    : 'border-[var(--border-color)] hover:border-[var(--color-temple-gold)]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'true_false':
        return (
          <div className="space-y-2">
            {['True', 'False'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                  userAnswer === option
                    ? 'border-[var(--color-temple-gold)] bg-[var(--color-temple-gold-light)] bg-opacity-20'
                    : 'border-[var(--border-color)] hover:border-[var(--color-temple-gold)]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'fill_blank':
        return (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-temple-gold)] bg-white dark:bg-gray-800 text-[var(--text-primary)]"
            placeholder="Antwort eingeben..."
          />
        );

      default:
        return (
          <div className="text-[var(--text-secondary)]">
            Frage-Typ nicht unterstützt: {currentQuestion.questionType}
          </div>
        );
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="lg">
      <Card>
        <CardHeader>
          <CardTitle>{lesson.title}</CardTitle>
          <div className="text-sm text-[var(--text-secondary)] mt-2">
            Frage {currentQuestionIndex + 1} von {lesson.questions.length}
          </div>
        </CardHeader>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              {currentQuestion.questionText}
            </h3>
            {renderQuestion()}
          </div>

          <div className="flex justify-between">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Zurück
            </Button>
            {isLastQuestion ? (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={submitting || !answers[currentQuestion.id]}
              >
                {submitting ? 'Wird abgeschlossen...' : 'Abschließen'}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
              >
                Weiter
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Modal>
  );
};

