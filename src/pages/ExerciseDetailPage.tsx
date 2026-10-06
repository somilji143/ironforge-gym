import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Play, AlertTriangle, Lightbulb, CheckCircle2, ShieldAlert, Dumbbell, Link as LinkIcon } from 'lucide-react';
import { exercises } from '../data/exercises';
import { ExerciseAnimation } from '../components/animations/ExerciseAnimation';
import { MuscleMap } from '../components/MuscleMap';

export default function ExerciseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const exercise = id ? exercises[id] : null;

  if (!exercise) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <Dumbbell className="h-16 w-16 text-text-muted mb-4" />
        <h2 className="text-2xl font-bold mb-2">Exercise not found</h2>
        <p className="text-text-secondary mb-6">The exercise you're looking for doesn't exist or has been removed.</p>
        <Link to="/exercises" className="bg-accent text-white px-6 py-3 rounded-xl font-medium">
          Back to Exercises
        </Link>
      </div>
    );
  }

  const activeMuscles = [exercise.muscleGroup, ...(exercise.secondaryMuscles || [])];

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-bg/95 backdrop-blur-md pt-12 pb-4 px-4 border-b border-border flex items-center gap-4">
        <Link to="/exercises" className="p-2 -ml-2 rounded-full hover:bg-bg-elevated transition-colors text-text-secondary hover:text-white">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold truncate flex-1">{exercise.name}</h1>
      </div>

      <div className="p-4 space-y-8">
        {/* Animation & Badges */}
        <div className="space-y-4">
          <div className="bg-bg-card border border-border rounded-2xl overflow-hidden aspect-video flex items-center justify-center relative">
            <ExerciseAnimation exerciseId={exercise.id} />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="bg-accent/10 text-accent-light px-3 py-1.5 rounded-lg text-sm font-medium">
              {exercise.muscleGroup}
            </span>
            <span className="bg-bg-elevated text-text-secondary px-3 py-1.5 rounded-lg text-sm font-medium">
              {exercise.equipment}
            </span>
          </div>
        </div>

        {/* Muscles Targeted */}
        <section className="bg-bg-card border border-border rounded-2xl p-5">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-accent" />
            Muscles Targeted
          </h2>
          <div className="mb-4">
            <MuscleMap activeMuscles={activeMuscles} />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-white bg-bg-elevated px-3 py-1.5 rounded-lg border border-border-light">
              {exercise.muscleGroup} (Primary)
            </span>
            {exercise.secondaryMuscles?.map(muscle => (
              <span key={muscle} className="text-sm font-medium text-text-secondary bg-bg px-3 py-1.5 rounded-lg">
                {muscle}
              </span>
            ))}
          </div>
        </section>

        {/* Instructions */}
        {exercise.instructions && exercise.instructions.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              Instructions
            </h2>
            <div className="bg-bg-card border border-border rounded-2xl p-5 space-y-4">
              {exercise.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent/20 text-accent-light flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-text-secondary leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional Details */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercise.breathing && (
            <div className="bg-bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold flex items-center gap-2 mb-2 text-white">
                <Play className="h-4 w-4 text-accent" />
                Breathing
              </h3>
              <p className="text-sm text-text-secondary">{exercise.breathing}</p>
            </div>
          )}

          {exercise.beginnerTip && (
            <div className="bg-bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold flex items-center gap-2 mb-2 text-white">
                <Lightbulb className="h-4 w-4 text-warning" />
                Beginner Tip
              </h3>
              <p className="text-sm text-text-secondary">{exercise.beginnerTip}</p>
            </div>
          )}

          {exercise.formSafety && (
            <div className="bg-bg-card border border-border rounded-2xl p-5 md:col-span-2">
              <h3 className="font-semibold flex items-center gap-2 mb-2 text-white">
                <ShieldAlert className="h-4 w-4 text-danger" />
                Form & Safety
              </h3>
              <p className="text-sm text-text-secondary">{exercise.formSafety}</p>
            </div>
          )}
        </section>

        {/* Common Mistakes */}
        {exercise.commonMistakes && exercise.commonMistakes.length > 0 && (
          <section className="bg-bg-card border border-border rounded-2xl p-5">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
              <AlertTriangle className="h-5 w-5 text-danger" />
              Common Mistakes
            </h2>
            <ul className="space-y-3">
              {exercise.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-text-secondary">
                  <span className="text-danger mt-0.5">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Alternatives */}
        {exercise.alternatives && exercise.alternatives.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-text-secondary" />
              Alternatives
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {exercise.alternatives.map(altId => {
                const altExercise = exercises[altId];
                if (!altExercise) return null;
                return (
                  <Link 
                    key={altId}
                    to={`/exercises/${altId}`}
                    className="bg-bg-card border border-border p-4 rounded-xl flex items-center justify-between hover:border-accent-light transition-colors"
                  >
                    <div>
                      <h4 className="font-medium text-white">{altExercise.name}</h4>
                      <p className="text-xs text-text-secondary mt-1">{altExercise.equipment}</p>
                    </div>
                    <ChevronLeft className="h-5 w-5 text-text-muted rotate-180" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
