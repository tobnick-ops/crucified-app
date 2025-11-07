// Personalization Engine - Recommendations System
// Schlägt Lessons & Missions basierend auf User-Verhalten vor

interface Character {
  level: number;
  stats: {
    faith: number;
    wisdom: number;
    knowledge: number;
    service: number;
    leadership: number;
  };
  completedLessons: string[];
  completedMissions: string[];
}

interface Lesson {
  id: string;
  title: string;
  difficulty: string;
  requiredLevel: number;
  book: {
    name: string;
    order: number;
  };
}

interface Mission {
  id: string;
  title: string;
  requiredLevel: number;
  missionType: string;
}

export class PersonalizationEngine {
  // Empfehle nächste Lessons
  static getRecommendedLessons(
    character: Character,
    availableLessons: Lesson[],
    limit: number = 5
  ): Lesson[] {
    const recommendations: Array<Lesson & { score: number }> = [];

    for (const lesson of availableLessons) {
      let score = 0;

      // Bereits abgeschlossen? Skip
      if (character.completedLessons.includes(lesson.id)) {
        continue;
      }

      // Level-Matching (höhere Punkte für passende Levels)
      if (lesson.requiredLevel === character.level) {
        score += 10;
      } else if (lesson.requiredLevel < character.level) {
        score += 5 - (character.level - lesson.requiredLevel);
      }

      // Schwierigkeit basierend auf Performance
      const avgPerformance = this.calculateAveragePerformance(character);
      if (avgPerformance > 0.8 && lesson.difficulty === 'hard') {
        score += 8;
      } else if (avgPerformance > 0.6 && lesson.difficulty === 'medium') {
        score += 10;
      } else if (avgPerformance <= 0.6 && lesson.difficulty === 'easy') {
        score += 10;
      }

      // Kontinuität - nächste Lektion aus gleichem Buch bevorzugen
      const lastCompletedLesson = character.completedLessons[character.completedLessons.length - 1];
      // TODO: Check if same book
      
      // Variety - noch nicht begonnene Bücher höher bewerten
      // TODO: Track books started

      recommendations.push({ ...lesson, score });
    }

    // Sortiere nach Score und gib Top N zurück
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ score, ...lesson }) => lesson);
  }

  // Empfehle nächste Missions
  static getRecommendedMissions(
    character: Character,
    availableMissions: Mission[],
    limit: number = 3
  ): Mission[] {
    const recommendations: Array<Mission & { score: number }> = [];

    for (const mission of availableMissions) {
      let score = 0;

      // Bereits abgeschlossen? Skip
      if (character.completedMissions.includes(mission.id)) {
        continue;
      }

      // Level-Matching
      if (mission.requiredLevel <= character.level) {
        score += 10 - (character.level - mission.requiredLevel);
      }

      // Mission-Type Variety
      const completedTypes = new Set(
        // TODO: Get completed mission types
      );
      if (!completedTypes.has(mission.missionType)) {
        score += 5;
      }

      recommendations.push({ ...mission, score });
    }

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ score, ...mission }) => mission);
  }

  // Berechne durchschnittliche Performance
  private static calculateAveragePerformance(character: Character): number {
    // TODO: Track actual performance from completed lessons
    // For now, estimate based on level progression
    const expectedLevel = Math.min(character.completedLessons.length / 5, 50);
    if (character.level >= expectedLevel) return 0.8;
    if (character.level >= expectedLevel * 0.8) return 0.6;
    return 0.4;
  }

  // Adaptive Difficulty - passe Schwierigkeit dynamisch an
  static getAdaptiveDifficulty(character: Character): 'easy' | 'medium' | 'hard' {
    const performance = this.calculateAveragePerformance(character);
    
    if (performance >= 0.8) return 'hard';
    if (performance >= 0.6) return 'medium';
    return 'easy';
  }

  // Personal Goals vorschlagen
  static suggestPersonalGoals(character: Character): Array<{
    type: string;
    target: number;
    description: string;
  }> {
    const goals = [];

    // Lesson Goal
    const lessonsPerDay = character.completedLessons.length / 30; // Last 30 days average (TODO: actual calculation)
    if (lessonsPerDay < 3) {
      goals.push({
        type: 'lessons_daily',
        target: 3,
        description: 'Schließe 3 Lektionen pro Tag ab',
      });
    }

    // Level Goal
    const nextMilestone = Math.ceil(character.level / 10) * 10;
    goals.push({
      type: 'level',
      target: nextMilestone,
      description: `Erreiche Level ${nextMilestone}`,
    });

    // Collection Goal
    goals.push({
      type: 'fragments',
      target: 30,
      description: 'Sammle 30 Fragmente',
    });

    return goals;
  }
}

