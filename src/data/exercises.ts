import { Exercise } from '../types';

export const exercises: Record<string, Exercise> = {
  // ═══════════════════════════════════════════════════════════
  // CHEST
  // ═══════════════════════════════════════════════════════════
  'machine-chest-press': {
    id: 'machine-chest-press',
    name: 'Chest Press (Machine)',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Triceps', 'Front Deltoids'],
    equipment: 'Machine',
    instructions: [
      'Adjust seat height so handles align with mid-chest.',
      'Sit back firmly, feet flat on the floor.',
      'Grip handles, keep shoulder blades retracted.',
      'Press handles forward until arms are nearly straight.',
      'Do not lock elbows at the top.',
      'Slowly return to starting position with control.'
    ],
    commonMistakes: [
      'Using too much weight too soon',
      'Shoulders rolling forward off the pad',
      'Bouncing the weight at the bottom',
      'Very short range of motion',
      'Locking elbows completely'
    ],
    breathing: 'Exhale while pressing forward. Inhale while returning.',
    beginnerTip: 'Start with a light weight to learn the movement path. Focus on feeling your chest muscles work.',
    alternatives: ['db-bench-press', 'incline-machine-press'],
  },
  'db-incline-press': {
    id: 'db-incline-press',
    name: 'Incline Bench Press (Dumbbell)',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Front Deltoids', 'Triceps'],
    equipment: 'Dumbbell',
    instructions: [
      'Set bench to 30–45 degree incline.',
      'Sit back with a dumbbell in each hand at shoulder level.',
      'Feet flat on the floor, core braced.',
      'Press dumbbells up and slightly inward.',
      'Lower slowly until upper arms are roughly parallel to the floor.',
      'Press back up without clanking the dumbbells together.'
    ],
    commonMistakes: [
      'Incline angle too steep (becomes shoulder press)',
      'Flaring elbows excessively',
      'Arching lower back off the bench',
      'Dropping the weight too fast'
    ],
    breathing: 'Exhale on the press up. Inhale as you lower.',
    beginnerTip: 'Use light dumbbells first. Focus on balance and controlling the weight.',
    formSafety: 'Consider asking a trainer to check your form when learning this movement.',
    alternatives: ['incline-machine-press'],
  },
  'machine-chest-fly': {
    id: 'machine-chest-fly',
    name: 'Chest Fly (Machine)',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Front Deltoids'],
    equipment: 'Machine',
    instructions: [
      'Adjust seat so handles are at chest height.',
      'Sit back, grab handles with a slight bend in elbows.',
      'Bring handles together in front of your chest.',
      'Squeeze chest at the center.',
      'Slowly return to the start, feeling a stretch in the chest.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control',
      'Going too far back and overstretching the shoulder',
      'Straightening the arms completely'
    ],
    breathing: 'Exhale as you bring handles together. Inhale on the return.',
    beginnerTip: 'Keep the movement smooth and controlled. This is an isolation exercise — lighter weight is fine.',
    alternatives: ['cable-fly'],
  },
  'incline-machine-press': {
    id: 'incline-machine-press',
    name: 'Incline Chest Press (Machine)',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Front Deltoids', 'Triceps'],
    equipment: 'Machine',
    instructions: [
      'Adjust seat so handles are at upper chest level.',
      'Sit back, grip handles firmly.',
      'Press handles up and forward.',
      'Do not lock elbows at the top.',
      'Lower with control.'
    ],
    commonMistakes: [
      'Seat too low (becomes a shoulder press)',
      'Pushing unevenly with one arm',
      'Not using full range of motion'
    ],
    breathing: 'Exhale while pressing. Inhale while lowering.',
    beginnerTip: 'Machine guides the path — focus on pushing evenly with both arms.',
    alternatives: ['db-incline-press'],
  },
  'db-bench-press': {
    id: 'db-bench-press',
    name: 'Bench Press (Dumbbell)',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Triceps', 'Front Deltoids'],
    equipment: 'Dumbbell',
    instructions: [
      'Lie flat on a bench, feet on the floor.',
      'Hold dumbbells at chest level, palms facing forward.',
      'Press dumbbells straight up.',
      'Lower slowly until upper arms are parallel to the floor.',
      'Press back up.'
    ],
    commonMistakes: [
      'Flaring elbows to 90 degrees',
      'Not controlling the descent',
      'Uneven pressing'
    ],
    breathing: 'Exhale pressing up. Inhale lowering down.',
    beginnerTip: 'Start light and master the balance before adding weight.',
    formSafety: 'Consider asking a trainer to check your form when learning this movement.',
    alternatives: ['machine-chest-press'],
  },
  'cable-fly': {
    id: 'cable-fly',
    name: 'Cable Crossover / Cable Fly',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Front Deltoids'],
    equipment: 'Cable',
    instructions: [
      'Set pulleys to high or mid position.',
      'Stand centered, grab handles, step forward slightly.',
      'With a slight bend in elbows, bring handles together in front.',
      'Squeeze chest at the bottom of the arc.',
      'Return slowly with control.'
    ],
    commonMistakes: [
      'Using too much weight and losing form',
      'Straightening arms completely',
      'Leaning too far forward'
    ],
    breathing: 'Exhale bringing handles together. Inhale on the return.',
    beginnerTip: 'Keep your core stable and focus on the chest squeeze.',
    alternatives: ['machine-chest-fly'],
  },

  // ═══════════════════════════════════════════════════════════
  // SHOULDERS
  // ═══════════════════════════════════════════════════════════
  'db-shoulder-press': {
    id: 'db-shoulder-press',
    name: 'Shoulder Press (Dumbbell)',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Triceps', 'Front Deltoids'],
    equipment: 'Dumbbell',
    instructions: [
      'Sit on a bench with back support.',
      'Hold dumbbells at shoulder height, palms facing forward.',
      'Press dumbbells overhead until arms are nearly straight.',
      'Lower slowly back to shoulder level.'
    ],
    commonMistakes: [
      'Arching the lower back excessively',
      'Not going through full range of motion',
      'Pressing unevenly'
    ],
    breathing: 'Exhale pressing up. Inhale lowering down.',
    beginnerTip: 'Start seated with back support for stability.',
    alternatives: ['machine-shoulder-press'],
  },
  'machine-shoulder-press': {
    id: 'machine-shoulder-press',
    name: 'Seated Shoulder Press (Machine)',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Triceps', 'Front Deltoids'],
    equipment: 'Machine',
    instructions: [
      'Adjust seat so handles start at shoulder height.',
      'Sit back firmly against the pad.',
      'Press handles overhead.',
      'Lower with control.'
    ],
    commonMistakes: [
      'Seat too low or too high',
      'Lifting hips off the seat',
      'Locking elbows at the top'
    ],
    breathing: 'Exhale pressing up. Inhale lowering.',
    beginnerTip: 'Machines guide the movement — great for beginners.',
    alternatives: ['db-shoulder-press'],
  },
  'db-lateral-raise': {
    id: 'db-lateral-raise',
    name: 'Lateral Raise (Dumbbell)',
    muscleGroup: 'Side Deltoids',
    secondaryMuscles: ['Shoulders'],
    equipment: 'Dumbbell',
    instructions: [
      'Stand with dumbbells at your sides.',
      'Slight bend in elbows throughout.',
      'Raise arms out to the sides until approximately shoulder height.',
      'Brief pause at the top.',
      'Lower slowly.'
    ],
    commonMistakes: [
      'Using momentum / swinging the weights',
      'Raising above shoulder height',
      'Shrugging shoulders up toward ears',
      'Going too heavy'
    ],
    breathing: 'Exhale while raising. Inhale while lowering.',
    beginnerTip: 'Use very light weight. This exercise is about control, not heavy loads.',
    alternatives: ['cable-lateral-raise'],
  },
  'cable-lateral-raise': {
    id: 'cable-lateral-raise',
    name: 'Single Arm Lateral Raise (Cable)',
    muscleGroup: 'Side Deltoids',
    secondaryMuscles: ['Shoulders'],
    equipment: 'Cable',
    instructions: [
      'Set cable to lowest position.',
      'Stand sideways to the machine, grab handle with far hand.',
      'Raise arm out to the side until shoulder height.',
      'Lower slowly with control.',
      'Repeat on both sides.'
    ],
    commonMistakes: [
      'Using body momentum',
      'Raising too high',
      'Not controlling the negative'
    ],
    breathing: 'Exhale raising. Inhale lowering.',
    beginnerTip: 'Cable provides constant tension — great for learning the movement.',
    alternatives: ['db-lateral-raise'],
  },

  // ═══════════════════════════════════════════════════════════
  // TRICEPS
  // ═══════════════════════════════════════════════════════════
  'tricep-pushdown': {
    id: 'tricep-pushdown',
    name: 'Triceps Rope Pushdown',
    muscleGroup: 'Triceps',
    secondaryMuscles: [],
    equipment: 'Cable',
    instructions: [
      'Attach rope to high pulley.',
      'Stand facing the machine, grab rope with both hands.',
      'Keep elbows pinned to your sides.',
      'Push the rope down until arms are fully extended.',
      'Slightly separate the rope at the bottom for extra squeeze.',
      'Return slowly to starting position.'
    ],
    commonMistakes: [
      'Elbows flaring out or drifting forward',
      'Using body weight to push down',
      'Not fully extending at the bottom'
    ],
    breathing: 'Exhale pushing down. Inhale returning up.',
    beginnerTip: 'Keep your elbows glued to your sides throughout the entire movement.',
    alternatives: ['overhead-tricep-extension'],
  },
  'overhead-tricep-extension': {
    id: 'overhead-tricep-extension',
    name: 'Overhead Cable Triceps Extension',
    muscleGroup: 'Triceps',
    secondaryMuscles: [],
    equipment: 'Cable',
    instructions: [
      'Set cable to low position with rope attachment.',
      'Face away from the machine, hold rope overhead.',
      'Keep upper arms close to your head.',
      'Extend forearms forward and up.',
      'Return slowly behind your head.'
    ],
    commonMistakes: [
      'Elbows flaring out wide',
      'Moving upper arms instead of just forearms',
      'Using too much weight'
    ],
    breathing: 'Exhale extending. Inhale returning.',
    beginnerTip: 'Start light and focus on keeping upper arms stationary.',
    alternatives: ['tricep-pushdown'],
  },

  // ═══════════════════════════════════════════════════════════
  // BACK
  // ═══════════════════════════════════════════════════════════
  'cable-lat-pulldown': {
    id: 'cable-lat-pulldown',
    name: 'Lat Pulldown (Cable)',
    muscleGroup: 'Lats',
    secondaryMuscles: ['Biceps', 'Upper Back', 'Rear Deltoids'],
    equipment: 'Cable',
    instructions: [
      'Sit at the lat pulldown station, thighs secured under pads.',
      'Grab the bar with a wide overhand grip.',
      'Keep chest up and lean back very slightly.',
      'Pull the bar toward your upper chest.',
      'Squeeze shoulder blades together at the bottom.',
      'Return slowly with control.'
    ],
    commonMistakes: [
      'Pulling behind the neck',
      'Leaning too far back',
      'Using momentum',
      'Not going through full range of motion'
    ],
    breathing: 'Exhale pulling down. Inhale returning up.',
    beginnerTip: 'Imagine pulling with your elbows, not your hands. This helps engage the back muscles.',
    alternatives: ['machine-lat-pulldown'],
  },
  'machine-lat-pulldown': {
    id: 'machine-lat-pulldown',
    name: 'Lat Pulldown (Machine)',
    muscleGroup: 'Lats',
    secondaryMuscles: ['Biceps', 'Upper Back'],
    equipment: 'Machine',
    instructions: [
      'Adjust thigh pad to secure your position.',
      'Grab handles with an overhand grip.',
      'Keep chest up, pull handles down toward chest.',
      'Squeeze shoulder blades together.',
      'Return with control.'
    ],
    commonMistakes: [
      'Rounding the back',
      'Pulling with arms only',
      'Using momentum'
    ],
    breathing: 'Exhale pulling down. Inhale returning.',
    beginnerTip: 'Machines are great for learning the lat pulldown pattern.',
    alternatives: ['cable-lat-pulldown'],
  },
  'seated-cable-row': {
    id: 'seated-cable-row',
    name: 'Seated Cable Row - V Grip (Cable)',
    muscleGroup: 'Upper Back',
    secondaryMuscles: ['Lats', 'Biceps', 'Rear Deltoids'],
    equipment: 'Cable',
    instructions: [
      'Sit at cable row station, feet on footplate.',
      'Grab V-grip handle, sit upright with slight knee bend.',
      'Pull handle toward your lower chest / upper abdomen.',
      'Squeeze shoulder blades together.',
      'Extend arms back slowly, maintaining upright posture.'
    ],
    commonMistakes: [
      'Excessive upper body rocking',
      'Rounding the lower back',
      'Not squeezing at the end',
      'Pulling with biceps only'
    ],
    breathing: 'Exhale pulling toward you. Inhale extending arms.',
    beginnerTip: 'Keep your torso mostly upright. A slight lean is OK, but don\'t rock back and forth.',
    alternatives: ['machine-seated-row'],
  },
  'db-row': {
    id: 'db-row',
    name: 'Dumbbell Row',
    muscleGroup: 'Lats',
    secondaryMuscles: ['Upper Back', 'Biceps', 'Rear Deltoids'],
    equipment: 'Dumbbell',
    instructions: [
      'Place one knee and hand on a bench for support.',
      'Hold a dumbbell in the other hand, arm extended.',
      'Pull the dumbbell toward your hip.',
      'Squeeze your back at the top.',
      'Lower slowly and repeat.',
      'Switch sides.'
    ],
    commonMistakes: [
      'Rotating the torso excessively',
      'Pulling with the bicep only',
      'Rounding the back',
      'Using momentum'
    ],
    breathing: 'Exhale pulling up. Inhale lowering down.',
    beginnerTip: 'Keep your back flat like a table. Pull toward your hip, not your shoulder.',
    alternatives: ['chest-supported-row'],
  },
  'chest-supported-row': {
    id: 'chest-supported-row',
    name: 'Chest Supported Incline Row (Dumbbell)',
    muscleGroup: 'Upper Back',
    secondaryMuscles: ['Lats', 'Biceps', 'Rear Deltoids'],
    equipment: 'Dumbbell',
    instructions: [
      'Set incline bench to 30–45 degrees.',
      'Lie face down on the bench, chest against the pad.',
      'Hold dumbbells hanging below, arms straight.',
      'Pull dumbbells up toward your hips.',
      'Squeeze shoulder blades together.',
      'Lower with control.'
    ],
    commonMistakes: [
      'Lifting chest off the pad',
      'Not going through full range of motion',
      'Using too much weight'
    ],
    breathing: 'Exhale pulling up. Inhale lowering.',
    beginnerTip: 'The bench support takes your lower back out of the equation — great for focusing on the back muscles.',
    alternatives: ['db-row'],
  },
  'machine-seated-row': {
    id: 'machine-seated-row',
    name: 'Seated Row (Machine)',
    muscleGroup: 'Upper Back',
    secondaryMuscles: ['Lats', 'Biceps'],
    equipment: 'Machine',
    instructions: [
      'Adjust chest pad and seat height.',
      'Grab handles, sit upright.',
      'Pull handles toward your torso.',
      'Squeeze shoulder blades together.',
      'Return slowly.'
    ],
    commonMistakes: [
      'Not using full range of motion',
      'Pulling with arms only',
      'Leaning back excessively'
    ],
    breathing: 'Exhale pulling. Inhale returning.',
    beginnerTip: 'Machine rows are beginner-friendly. Focus on squeezing your back.',
    alternatives: ['seated-cable-row'],
  },
  'face-pull': {
    id: 'face-pull',
    name: 'Face Pull',
    muscleGroup: 'Rear Deltoids',
    secondaryMuscles: ['Upper Back', 'Shoulders'],
    equipment: 'Cable',
    instructions: [
      'Set cable to upper chest / face height with rope attachment.',
      'Grab rope with overhand grip, step back.',
      'Pull rope toward your face, separating the ends.',
      'Elbows should go out and back.',
      'Squeeze rear delts at the end.',
      'Return slowly.'
    ],
    commonMistakes: [
      'Pulling to the chest instead of the face',
      'Using too much weight',
      'Not separating the rope ends',
      'Leaning back'
    ],
    breathing: 'Exhale pulling toward face. Inhale returning.',
    beginnerTip: 'This is a light exercise. Focus on the squeeze, not the weight.',
    alternatives: ['rear-delt-fly'],
  },
  'rear-delt-fly': {
    id: 'rear-delt-fly',
    name: 'Rear Delt Reverse Fly (Machine)',
    muscleGroup: 'Rear Deltoids',
    secondaryMuscles: ['Upper Back'],
    equipment: 'Machine',
    instructions: [
      'Adjust machine so handles are at chest height.',
      'Sit facing the pad, grab handles.',
      'Open arms out to the sides in a wide arc.',
      'Squeeze rear delts at the end.',
      'Return slowly.'
    ],
    commonMistakes: [
      'Using momentum',
      'Going too heavy',
      'Not controlling the return'
    ],
    breathing: 'Exhale opening arms. Inhale returning.',
    beginnerTip: 'Keep it light and controlled. Focus on feeling the rear shoulder muscles.',
    alternatives: ['face-pull'],
  },

  // ═══════════════════════════════════════════════════════════
  // BICEPS
  // ═══════════════════════════════════════════════════════════
  'db-bicep-curl': {
    id: 'db-bicep-curl',
    name: 'Bicep Curl (Dumbbell)',
    muscleGroup: 'Biceps',
    secondaryMuscles: ['Forearms'],
    equipment: 'Dumbbell',
    instructions: [
      'Stand with dumbbells at your sides, palms facing forward.',
      'Keep elbows pinned to your sides.',
      'Curl the weights up toward your shoulders.',
      'Squeeze biceps at the top.',
      'Lower slowly with control.'
    ],
    commonMistakes: [
      'Swinging the body for momentum',
      'Elbows drifting forward',
      'Not going through full range of motion',
      'Going too fast'
    ],
    breathing: 'Exhale curling up. Inhale lowering down.',
    beginnerTip: 'Keep it slow and controlled. If you need to swing, the weight is too heavy.',
    alternatives: ['ez-bar-curl'],
  },
  'db-hammer-curl': {
    id: 'db-hammer-curl',
    name: 'Hammer Curl (Dumbbell)',
    muscleGroup: 'Biceps',
    secondaryMuscles: ['Forearms'],
    equipment: 'Dumbbell',
    instructions: [
      'Stand with dumbbells at your sides, palms facing each other (neutral grip).',
      'Keep elbows at your sides.',
      'Curl the weights up, maintaining the neutral grip.',
      'Lower slowly.'
    ],
    commonMistakes: [
      'Swinging for momentum',
      'Rotating the wrists during the movement',
      'Not controlling the descent'
    ],
    breathing: 'Exhale curling up. Inhale lowering.',
    beginnerTip: 'The neutral grip tends to be stronger than a regular curl. Keep form strict.',
    alternatives: ['cable-hammer-curl'],
  },
  'ez-bar-curl': {
    id: 'ez-bar-curl',
    name: 'EZ Bar Biceps Curl',
    muscleGroup: 'Biceps',
    secondaryMuscles: ['Forearms'],
    equipment: 'EZ Bar',
    instructions: [
      'Stand holding EZ bar with an underhand grip on the angled portions.',
      'Keep elbows at your sides.',
      'Curl the bar up toward your shoulders.',
      'Squeeze at the top.',
      'Lower slowly.'
    ],
    commonMistakes: [
      'Swinging the body',
      'Elbows moving forward',
      'Using too much weight'
    ],
    breathing: 'Exhale curling up. Inhale lowering.',
    beginnerTip: 'The EZ bar angle is easier on the wrists than a straight bar.',
    alternatives: ['db-bicep-curl'],
  },
  'cable-hammer-curl': {
    id: 'cable-hammer-curl',
    name: 'Hammer Curl (Cable)',
    muscleGroup: 'Biceps',
    secondaryMuscles: ['Forearms'],
    equipment: 'Cable',
    instructions: [
      'Attach rope to low pulley.',
      'Stand facing the machine, grab rope with neutral grip.',
      'Curl rope up toward shoulders.',
      'Keep elbows at sides.',
      'Lower slowly.'
    ],
    commonMistakes: [
      'Swinging body',
      'Moving elbows',
      'Going too fast'
    ],
    breathing: 'Exhale curling. Inhale lowering.',
    beginnerTip: 'Cable provides constant tension through the full range of motion.',
    alternatives: ['db-hammer-curl'],
  },

  // ═══════════════════════════════════════════════════════════
  // LEGS
  // ═══════════════════════════════════════════════════════════
  'leg-press': {
    id: 'leg-press',
    name: 'Leg Press (Machine)',
    muscleGroup: 'Quads',
    secondaryMuscles: ['Glutes', 'Hamstrings'],
    equipment: 'Machine',
    instructions: [
      'Sit in leg press machine, back flat against the pad.',
      'Place feet shoulder-width on the platform.',
      'Release safety handles.',
      'Lower the platform by bending knees toward your chest.',
      'Stop when knees are around 90 degrees.',
      'Press back up without locking knees.',
      'Re-engage safety when done.'
    ],
    commonMistakes: [
      'Locking knees at the top',
      'Letting hips come off the pad',
      'Going too deep and rounding lower back',
      'Feet too high or too low on platform'
    ],
    breathing: 'Inhale lowering. Exhale pressing up.',
    beginnerTip: 'Start with lighter weight and focus on a comfortable range of motion.',
    formSafety: 'Consider asking a trainer to check your form when learning this movement.',
    alternatives: ['goblet-squat', 'hack-squat'],
  },
  'goblet-squat': {
    id: 'goblet-squat',
    name: 'Goblet Squat',
    muscleGroup: 'Quads',
    secondaryMuscles: ['Glutes', 'Hamstrings', 'Core'],
    equipment: 'Dumbbell',
    instructions: [
      'Hold a dumbbell vertically at chest level with both hands.',
      'Stand with feet shoulder-width apart, toes slightly out.',
      'Squat down, keeping chest up and back straight.',
      'Go as deep as comfortable (ideally thighs parallel to floor).',
      'Push through your heels to stand up.'
    ],
    commonMistakes: [
      'Knees caving inward',
      'Rounding the back',
      'Rising onto toes',
      'Not going deep enough'
    ],
    breathing: 'Inhale squatting down. Exhale standing up.',
    beginnerTip: 'The goblet position naturally keeps your torso upright. Great first squat variation.',
    formSafety: 'Consider asking a trainer to check your form when learning this movement.',
    alternatives: ['leg-press', 'hack-squat'],
  },
  'hack-squat': {
    id: 'hack-squat',
    name: 'Hack Squat (Machine)',
    muscleGroup: 'Quads',
    secondaryMuscles: ['Glutes', 'Hamstrings'],
    equipment: 'Machine',
    instructions: [
      'Position yourself in the hack squat machine.',
      'Shoulders under the pads, back flat against the rest.',
      'Feet shoulder-width on the platform.',
      'Release safety and lower by bending knees.',
      'Go to at least 90 degrees.',
      'Push back up through your heels.'
    ],
    commonMistakes: [
      'Knees going too far past toes',
      'Not going deep enough',
      'Heels lifting off the platform'
    ],
    breathing: 'Inhale lowering. Exhale pressing up.',
    beginnerTip: 'The machine guides the movement — focus on depth and control.',
    formSafety: 'Consider asking a trainer to check your form when learning this movement.',
    alternatives: ['leg-press', 'goblet-squat'],
  },
  'romanian-deadlift': {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift (Barbell)',
    muscleGroup: 'Hamstrings',
    secondaryMuscles: ['Glutes', 'Core'],
    equipment: 'Barbell',
    instructions: [
      'Stand holding a barbell with overhand grip, feet hip-width.',
      'Keep a slight bend in knees throughout.',
      'Hinge at the hips, pushing them backward.',
      'Lower the bar along your legs, keeping it close.',
      'Maintain a neutral spine — no rounding.',
      'Feel the stretch in hamstrings.',
      'Drive hips forward to return to standing.'
    ],
    commonMistakes: [
      'Rounding the lower back',
      'Bending knees too much (turning it into a squat)',
      'Bar drifting away from the body',
      'Going too heavy too soon'
    ],
    breathing: 'Inhale hinging down. Exhale standing up.',
    beginnerTip: 'Start with just the bar or very light weight. The hip hinge takes practice.',
    formSafety: 'Consider asking a trainer to check your form when learning this movement.',
    alternatives: ['seated-leg-curl'],
  },
  'seated-leg-curl': {
    id: 'seated-leg-curl',
    name: 'Seated Leg Curl (Machine)',
    muscleGroup: 'Hamstrings',
    secondaryMuscles: [],
    equipment: 'Machine',
    instructions: [
      'Adjust the machine so the pad sits on your lower calves.',
      'Sit upright, grip the handles.',
      'Curl your legs down and back.',
      'Squeeze hamstrings at the bottom.',
      'Return slowly.'
    ],
    commonMistakes: [
      'Using momentum',
      'Not going through full range of motion',
      'Lifting hips off the seat'
    ],
    breathing: 'Exhale curling down. Inhale returning.',
    beginnerTip: 'Focus on squeezing the hamstrings. This is an isolation exercise — moderate weight is fine.',
    alternatives: ['lying-leg-curl'],
  },
  'lying-leg-curl': {
    id: 'lying-leg-curl',
    name: 'Lying Leg Curl (Machine)',
    muscleGroup: 'Hamstrings',
    secondaryMuscles: [],
    equipment: 'Machine',
    instructions: [
      'Lie face down on the machine.',
      'Adjust pad to sit on your lower calves / Achilles area.',
      'Curl your legs up toward your glutes.',
      'Squeeze hamstrings at the top.',
      'Lower slowly.'
    ],
    commonMistakes: [
      'Hips lifting off the pad',
      'Using momentum',
      'Not controlling the descent'
    ],
    breathing: 'Exhale curling up. Inhale lowering.',
    beginnerTip: 'Keep your hips pressed into the pad throughout.',
    alternatives: ['seated-leg-curl'],
  },
  'leg-extension': {
    id: 'leg-extension',
    name: 'Leg Extension (Machine)',
    muscleGroup: 'Quads',
    secondaryMuscles: [],
    equipment: 'Machine',
    instructions: [
      'Sit in the machine, back against the pad.',
      'Adjust the pad so it sits on your lower shins.',
      'Extend your legs until straight.',
      'Squeeze quads at the top.',
      'Lower slowly with control.'
    ],
    commonMistakes: [
      'Using momentum to swing the weight',
      'Locking knees forcefully at the top',
      'Going too heavy'
    ],
    breathing: 'Exhale extending. Inhale lowering.',
    beginnerTip: 'Use moderate weight. Focus on the quad contraction at the top.',
    alternatives: ['goblet-squat'],
  },
  'standing-calf-raise': {
    id: 'standing-calf-raise',
    name: 'Standing Calf Raise (Machine)',
    muscleGroup: 'Calves',
    secondaryMuscles: [],
    equipment: 'Machine',
    instructions: [
      'Position shoulders under the pads.',
      'Balls of feet on the platform, heels hanging off.',
      'Rise up onto your toes as high as possible.',
      'Hold briefly at the top.',
      'Lower slowly, letting heels drop below the platform.'
    ],
    commonMistakes: [
      'Not going through full range of motion',
      'Bouncing at the bottom',
      'Bending knees during the movement'
    ],
    breathing: 'Exhale rising up. Inhale lowering.',
    beginnerTip: 'Go slow and use full range of motion. Calves respond well to controlled reps.',
    alternatives: ['seated-calf-raise'],
  },
  'seated-calf-raise': {
    id: 'seated-calf-raise',
    name: 'Seated Calf Raise',
    muscleGroup: 'Calves',
    secondaryMuscles: [],
    equipment: 'Machine',
    instructions: [
      'Sit in the machine with thighs under the pad.',
      'Balls of feet on the platform.',
      'Rise up onto your toes.',
      'Lower slowly, heels dropping below the platform.'
    ],
    commonMistakes: [
      'Bouncing the weight',
      'Not using full range of motion',
      'Going too fast'
    ],
    breathing: 'Exhale rising. Inhale lowering.',
    beginnerTip: 'Seated calf raise emphasizes the soleus muscle. Important for overall calf development.',
    alternatives: ['standing-calf-raise'],
  },
  'plank': {
    id: 'plank',
    name: 'Plank',
    muscleGroup: 'Core',
    secondaryMuscles: ['Shoulders'],
    equipment: 'Bodyweight',
    instructions: [
      'Start face down, then lift up onto forearms and toes.',
      'Keep body in a straight line from head to heels.',
      'Engage core — pull belly button toward spine.',
      'Keep hips level — don\'t let them sag or pike up.',
      'Hold for the prescribed duration.'
    ],
    commonMistakes: [
      'Hips sagging (banana shape)',
      'Hips too high (tent shape)',
      'Holding breath',
      'Looking up (strain on neck)'
    ],
    breathing: 'Breathe steadily throughout. Do not hold your breath.',
    beginnerTip: 'Start with shorter holds (20–30s) and build up. Quality over duration.',
    alternatives: ['cable-crunch'],
  },
  'cable-crunch': {
    id: 'cable-crunch',
    name: 'Cable Crunch',
    muscleGroup: 'Core',
    secondaryMuscles: [],
    equipment: 'Cable',
    instructions: [
      'Attach rope to high pulley.',
      'Kneel facing the machine, hold rope behind your head.',
      'Crunch down, bringing elbows toward your knees.',
      'Focus on curling your spine, not just bending at the hips.',
      'Return slowly.'
    ],
    commonMistakes: [
      'Sitting back instead of crunching down',
      'Using arms to pull the weight',
      'Not curling the spine'
    ],
    breathing: 'Exhale crunching down. Inhale returning.',
    beginnerTip: 'Think about bringing your ribcage toward your pelvis.',
    alternatives: ['plank'],
  },
};

export function getExercise(id: string): Exercise {
  return exercises[id] ?? {
    id, name: id, muscleGroup: 'Chest', secondaryMuscles: [],
    equipment: 'Machine', instructions: [], commonMistakes: [],
    breathing: '', beginnerTip: '', alternatives: [],
  };
}
