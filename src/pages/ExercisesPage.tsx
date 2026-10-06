import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Dumbbell } from 'lucide-react';
import { exercises } from '../data/exercises';
import { ExerciseAnimation } from '../components/animations/ExerciseAnimation';

const muscleGroups = ['All', 'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Core'];
const equipmentList = ['All', 'Machine', 'Dumbbell', 'Barbell', 'Cable', 'Bodyweight', 'EZ Bar', 'Kettlebell'];

export default function ExercisesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All');

  const filteredExercises = useMemo(() => {
    return Object.values(exercises).filter((ex) => {
      // Search filter
      if (searchQuery && !ex.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Muscle group filter logic
      if (selectedMuscle !== 'All') {
        const group = ex.muscleGroup;
        if (selectedMuscle === 'Legs') {
          if (!['Quads', 'Hamstrings', 'Glutes', 'Calves', 'Legs'].includes(group)) return false;
        } else if (selectedMuscle === 'Back') {
          if (!['Lats', 'Upper Back', 'Lower Back', 'Back'].includes(group)) return false;
        } else if (selectedMuscle === 'Shoulders') {
          if (!['Shoulders', 'Side Deltoids', 'Rear Deltoids', 'Front Deltoids'].includes(group)) return false;
        } else if (selectedMuscle !== group) {
          return false;
        }
      }

      // Equipment filter
      if (selectedEquipment !== 'All' && ex.equipment !== selectedEquipment) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedMuscle, selectedEquipment]);

  return (
    <div className="pb-24">
      <div className="pt-12 pb-6 px-4 sticky top-0 z-10 bg-bg/95 backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-4">Exercises</h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary h-5 w-5" />
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-card border border-border rounded-xl py-3 pl-10 pr-4 text-white placeholder-text-muted focus:outline-none focus:border-accent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3">
          {/* Muscle Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <SlidersHorizontal className="text-text-muted h-5 w-5 flex-shrink-0 mt-2 mr-1" />
            {muscleGroups.map(muscle => (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedMuscle === muscle 
                    ? 'bg-accent text-white' 
                    : 'bg-bg-card border border-border text-text-secondary hover:bg-bg-elevated'
                }`}
              >
                {muscle}
              </button>
            ))}
          </div>

          {/* Equipment Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide pl-7">
            {equipmentList.map(eq => (
              <button
                key={eq}
                onClick={() => setSelectedEquipment(eq)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedEquipment === eq 
                    ? 'bg-accent text-white' 
                    : 'bg-bg-card border border-border text-text-secondary hover:bg-bg-elevated'
                }`}
              >
                {eq}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredExercises.length > 0 ? (
            filteredExercises.map(exercise => (
              <Link 
                key={exercise.id} 
                to={`/exercise/${exercise.id}`}
                className="bg-bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-accent-light transition-colors"
              >
                <div className="w-16 h-16 bg-bg-elevated rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <ExerciseAnimation exerciseId={exercise.id} size={56} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{exercise.name}</h3>
                  <p className="text-sm text-text-secondary truncate">{exercise.muscleGroup}</p>
                </div>
                <span className="text-xs font-medium text-text-muted bg-bg rounded-md px-2 py-1 flex-shrink-0">
                  {exercise.equipment}
                </span>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <Dumbbell className="mx-auto h-12 w-12 text-text-muted mb-4" />
              <h3 className="text-xl font-semibold mb-2">No exercises found</h3>
              <p className="text-text-secondary">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
