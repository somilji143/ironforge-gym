import React, { useId } from 'react';

export interface ExerciseAnimationProps {
  exerciseId: string;
  className?: string;
  size?: number;
}

type Point = { x: number; y: number };
type Pose = {
  head: Point;
  neck: Point;
  shoulderL: Point;
  shoulderR: Point;
  elbowL: Point;
  elbowR: Point;
  wristL: Point;
  wristR: Point;
  hipL: Point;
  hipR: Point;
  kneeL: Point;
  kneeR: Point;
  ankleL: Point;
  ankleR: Point;
};

type Equipment =
  | 'none'
  | 'machine-press'
  | 'bench'
  | 'incline-bench'
  | 'dumbbells'
  | 'cable-dual'
  | 'cable-high'
  | 'cable-low'
  | 'pulldown'
  | 'row-cable'
  | 'machine-row'
  | 'leg-press'
  | 'hack-squat'
  | 'leg-machine'
  | 'calf-machine'
  | 'barbell'
  | 'mat';

type Scene = {
  start: Pose;
  end: Pose;
  equipment: Equipment;
  accent: 'upper' | 'arms' | 'back' | 'legs' | 'core' | 'full';
  label: string;
};

const DURATION = '2.8s';
const MOTION_VALUES = (a: number, b: number) => `${a};${b};${a}`;

const frontStanding = (): Pose => ({
  head: { x: 120, y: 35 },
  neck: { x: 120, y: 56 },
  shoulderL: { x: 96, y: 68 },
  shoulderR: { x: 144, y: 68 },
  elbowL: { x: 92, y: 104 },
  elbowR: { x: 148, y: 104 },
  wristL: { x: 94, y: 140 },
  wristR: { x: 146, y: 140 },
  hipL: { x: 107, y: 126 },
  hipR: { x: 133, y: 126 },
  kneeL: { x: 108, y: 171 },
  kneeR: { x: 132, y: 171 },
  ankleL: { x: 106, y: 217 },
  ankleR: { x: 134, y: 217 },
});

const seatedFront = (): Pose => ({
  ...frontStanding(),
  head: { x: 120, y: 47 },
  neck: { x: 120, y: 66 },
  shoulderL: { x: 97, y: 77 },
  shoulderR: { x: 143, y: 77 },
  elbowL: { x: 92, y: 111 },
  elbowR: { x: 148, y: 111 },
  wristL: { x: 94, y: 143 },
  wristR: { x: 146, y: 143 },
  hipL: { x: 107, y: 137 },
  hipR: { x: 133, y: 137 },
  kneeL: { x: 92, y: 173 },
  kneeR: { x: 148, y: 173 },
  ankleL: { x: 86, y: 214 },
  ankleR: { x: 154, y: 214 },
});

const sideStanding = (): Pose => ({
  head: { x: 106, y: 35 },
  neck: { x: 108, y: 57 },
  shoulderL: { x: 108, y: 69 },
  shoulderR: { x: 116, y: 72 },
  elbowL: { x: 122, y: 104 },
  elbowR: { x: 127, y: 106 },
  wristL: { x: 123, y: 140 },
  wristR: { x: 128, y: 140 },
  hipL: { x: 111, y: 126 },
  hipR: { x: 122, y: 127 },
  kneeL: { x: 111, y: 172 },
  kneeR: { x: 125, y: 172 },
  ankleL: { x: 109, y: 218 },
  ankleR: { x: 128, y: 218 },
});

const sideSeated = (): Pose => ({
  head: { x: 96, y: 45 },
  neck: { x: 101, y: 64 },
  shoulderL: { x: 103, y: 76 },
  shoulderR: { x: 112, y: 78 },
  elbowL: { x: 118, y: 109 },
  elbowR: { x: 125, y: 110 },
  wristL: { x: 130, y: 139 },
  wristR: { x: 136, y: 140 },
  hipL: { x: 109, y: 136 },
  hipR: { x: 119, y: 138 },
  kneeL: { x: 149, y: 157 },
  kneeR: { x: 154, y: 160 },
  ankleL: { x: 170, y: 198 },
  ankleR: { x: 175, y: 201 },
});

const copyPose = (pose: Pose, patch: Partial<Pose>): Pose => ({ ...pose, ...patch });

const SCENES: Record<string, Scene> = {};
const addScene = (ids: string[], scene: Scene) => ids.forEach((id) => { SCENES[id] = scene; });

// Chest press — seated, handles travel forward.
{
  const start = copyPose(seatedFront(), {
    elbowL: { x: 83, y: 96 }, elbowR: { x: 157, y: 96 },
    wristL: { x: 73, y: 91 }, wristR: { x: 167, y: 91 },
  });
  const end = copyPose(start, {
    elbowL: { x: 96, y: 91 }, elbowR: { x: 144, y: 91 },
    wristL: { x: 111, y: 88 }, wristR: { x: 129, y: 88 },
  });
  addScene(['machine-chest-press'], { start, end, equipment: 'machine-press', accent: 'upper', label: 'Chest press' });
}

// Incline machine press.
{
  const start = copyPose(sideSeated(), {
    head: { x: 89, y: 58 }, neck: { x: 98, y: 74 }, shoulderL: { x: 105, y: 86 }, shoulderR: { x: 112, y: 88 },
    elbowL: { x: 127, y: 94 }, elbowR: { x: 131, y: 96 }, wristL: { x: 144, y: 82 }, wristR: { x: 148, y: 84 },
  });
  const end = copyPose(start, {
    elbowL: { x: 144, y: 73 }, elbowR: { x: 148, y: 75 }, wristL: { x: 165, y: 57 }, wristR: { x: 169, y: 59 },
  });
  addScene(['incline-machine-press'], { start, end, equipment: 'machine-press', accent: 'upper', label: 'Incline press' });
}

// Flat / incline dumbbell press.
{
  const start = copyPose(sideSeated(), {
    head: { x: 66, y: 92 }, neck: { x: 82, y: 99 }, shoulderL: { x: 95, y: 107 }, shoulderR: { x: 101, y: 110 },
    hipL: { x: 134, y: 130 }, hipR: { x: 140, y: 133 }, kneeL: { x: 163, y: 155 }, kneeR: { x: 168, y: 159 },
    ankleL: { x: 176, y: 202 }, ankleR: { x: 182, y: 204 },
    elbowL: { x: 112, y: 91 }, elbowR: { x: 118, y: 94 }, wristL: { x: 111, y: 69 }, wristR: { x: 119, y: 71 },
  });
  const end = copyPose(start, {
    elbowL: { x: 120, y: 67 }, elbowR: { x: 128, y: 69 }, wristL: { x: 126, y: 43 }, wristR: { x: 136, y: 45 },
  });
  addScene(['db-bench-press'], { start, end, equipment: 'bench', accent: 'upper', label: 'Dumbbell bench press' });

  const inclineStart = copyPose(start, {
    head: { x: 77, y: 73 }, neck: { x: 88, y: 87 }, shoulderL: { x: 99, y: 97 }, shoulderR: { x: 106, y: 100 },
    hipL: { x: 132, y: 137 }, hipR: { x: 139, y: 140 },
  });
  const inclineEnd = copyPose(inclineStart, {
    elbowL: { x: 120, y: 67 }, elbowR: { x: 128, y: 69 }, wristL: { x: 131, y: 43 }, wristR: { x: 140, y: 45 },
  });
  addScene(['db-incline-press'], { start: inclineStart, end: inclineEnd, equipment: 'incline-bench', accent: 'upper', label: 'Incline dumbbell press' });
}

// Chest fly / rear delt fly.
{
  const start = copyPose(seatedFront(), {
    elbowL: { x: 79, y: 91 }, elbowR: { x: 161, y: 91 }, wristL: { x: 57, y: 92 }, wristR: { x: 183, y: 92 },
  });
  const end = copyPose(start, {
    elbowL: { x: 101, y: 90 }, elbowR: { x: 139, y: 90 }, wristL: { x: 113, y: 91 }, wristR: { x: 127, y: 91 },
  });
  addScene(['machine-chest-fly'], { start, end, equipment: 'machine-press', accent: 'upper', label: 'Chest fly' });
  addScene(['cable-fly'], { start, end, equipment: 'cable-dual', accent: 'upper', label: 'Cable crossover' });

  const rearStart = copyPose(seatedFront(), {
    elbowL: { x: 104, y: 88 }, elbowR: { x: 136, y: 88 }, wristL: { x: 114, y: 90 }, wristR: { x: 126, y: 90 },
  });
  const rearEnd = copyPose(rearStart, {
    elbowL: { x: 79, y: 90 }, elbowR: { x: 161, y: 90 }, wristL: { x: 55, y: 92 }, wristR: { x: 185, y: 92 },
  });
  addScene(['rear-delt-fly'], { start: rearStart, end: rearEnd, equipment: 'machine-press', accent: 'back', label: 'Rear delt fly' });
}

// Shoulder press.
{
  const start = copyPose(seatedFront(), {
    elbowL: { x: 84, y: 86 }, elbowR: { x: 156, y: 86 }, wristL: { x: 85, y: 63 }, wristR: { x: 155, y: 63 },
  });
  const end = copyPose(start, {
    elbowL: { x: 103, y: 58 }, elbowR: { x: 137, y: 58 }, wristL: { x: 107, y: 29 }, wristR: { x: 133, y: 29 },
  });
  addScene(['db-shoulder-press'], { start, end, equipment: 'dumbbells', accent: 'upper', label: 'Dumbbell shoulder press' });
  addScene(['machine-shoulder-press'], { start, end, equipment: 'machine-press', accent: 'upper', label: 'Machine shoulder press' });
}

// Lateral raise.
{
  const start = frontStanding();
  const end = copyPose(start, {
    elbowL: { x: 78, y: 77 }, elbowR: { x: 162, y: 77 }, wristL: { x: 57, y: 80 }, wristR: { x: 183, y: 80 },
  });
  addScene(['db-lateral-raise'], { start, end, equipment: 'dumbbells', accent: 'upper', label: 'Lateral raise' });
  addScene(['cable-lateral-raise'], { start, end, equipment: 'cable-low', accent: 'upper', label: 'Cable lateral raise' });
}

// Triceps pushdown.
{
  const start = copyPose(frontStanding(), {
    elbowL: { x: 103, y: 94 }, elbowR: { x: 137, y: 94 }, wristL: { x: 110, y: 112 }, wristR: { x: 130, y: 112 },
  });
  const end = copyPose(start, {
    wristL: { x: 105, y: 144 }, wristR: { x: 135, y: 144 },
  });
  addScene(['tricep-pushdown'], { start, end, equipment: 'cable-high', accent: 'arms', label: 'Rope pushdown' });
}

// Overhead cable triceps extension.
{
  const start = copyPose(sideStanding(), {
    elbowL: { x: 113, y: 60 }, elbowR: { x: 119, y: 63 }, wristL: { x: 99, y: 43 }, wristR: { x: 104, y: 46 },
  });
  const end = copyPose(start, {
    wristL: { x: 133, y: 43 }, wristR: { x: 139, y: 46 },
  });
  addScene(['overhead-tricep-extension'], { start, end, equipment: 'cable-high', accent: 'arms', label: 'Overhead triceps extension' });
}

// Lat pulldown.
{
  const start = copyPose(seatedFront(), {
    elbowL: { x: 84, y: 61 }, elbowR: { x: 156, y: 61 }, wristL: { x: 62, y: 35 }, wristR: { x: 178, y: 35 },
  });
  const end = copyPose(start, {
    elbowL: { x: 91, y: 92 }, elbowR: { x: 149, y: 92 }, wristL: { x: 93, y: 78 }, wristR: { x: 147, y: 78 },
  });
  addScene(['cable-lat-pulldown', 'machine-lat-pulldown'], { start, end, equipment: 'pulldown', accent: 'back', label: 'Lat pulldown' });
}

// Seated row.
{
  const start = copyPose(sideSeated(), {
    elbowL: { x: 130, y: 101 }, elbowR: { x: 137, y: 103 }, wristL: { x: 166, y: 105 }, wristR: { x: 171, y: 106 },
  });
  const end = copyPose(start, {
    elbowL: { x: 112, y: 105 }, elbowR: { x: 119, y: 106 }, wristL: { x: 128, y: 108 }, wristR: { x: 134, y: 109 },
  });
  addScene(['seated-cable-row'], { start, end, equipment: 'row-cable', accent: 'back', label: 'Seated cable row' });
  addScene(['machine-seated-row'], { start, end, equipment: 'machine-row', accent: 'back', label: 'Machine row' });
}

// Dumbbell / chest-supported row.
{
  const start = copyPose(sideStanding(), {
    head: { x: 88, y: 77 }, neck: { x: 101, y: 89 }, shoulderL: { x: 111, y: 97 }, shoulderR: { x: 118, y: 101 },
    hipL: { x: 137, y: 126 }, hipR: { x: 145, y: 130 },
    elbowL: { x: 125, y: 120 }, elbowR: { x: 132, y: 123 }, wristL: { x: 127, y: 157 }, wristR: { x: 135, y: 160 },
  });
  const end = copyPose(start, {
    elbowL: { x: 145, y: 109 }, elbowR: { x: 152, y: 112 }, wristL: { x: 137, y: 126 }, wristR: { x: 145, y: 130 },
  });
  addScene(['db-row'], { start, end, equipment: 'dumbbells', accent: 'back', label: 'Dumbbell row' });
  addScene(['chest-supported-row'], { start, end, equipment: 'incline-bench', accent: 'back', label: 'Chest-supported row' });
}

// Face pull — hands travel toward the face with elbows high.
{
  const start = copyPose(frontStanding(), {
    elbowL: { x: 100, y: 91 }, elbowR: { x: 140, y: 91 }, wristL: { x: 109, y: 91 }, wristR: { x: 131, y: 91 },
  });
  const end = copyPose(start, {
    elbowL: { x: 80, y: 73 }, elbowR: { x: 160, y: 73 }, wristL: { x: 102, y: 59 }, wristR: { x: 138, y: 59 },
  });
  addScene(['face-pull'], { start, end, equipment: 'cable-high', accent: 'back', label: 'Face pull' });
}

// Curl variations.
{
  const start = frontStanding();
  const end = copyPose(start, {
    elbowL: { x: 92, y: 103 }, elbowR: { x: 148, y: 103 }, wristL: { x: 98, y: 78 }, wristR: { x: 142, y: 78 },
  });
  addScene(['db-bicep-curl', 'db-hammer-curl'], { start, end, equipment: 'dumbbells', accent: 'arms', label: 'Dumbbell curl' });
  addScene(['ez-bar-curl'], { start, end, equipment: 'barbell', accent: 'arms', label: 'EZ-bar curl' });
  addScene(['cable-hammer-curl'], { start, end, equipment: 'cable-low', accent: 'arms', label: 'Cable hammer curl' });
}

// Leg press.
{
  const start = copyPose(sideSeated(), {
    head: { x: 62, y: 83 }, neck: { x: 75, y: 97 }, shoulderL: { x: 86, y: 107 }, shoulderR: { x: 92, y: 110 },
    hipL: { x: 111, y: 136 }, hipR: { x: 118, y: 139 }, kneeL: { x: 148, y: 135 }, kneeR: { x: 154, y: 139 },
    ankleL: { x: 170, y: 103 }, ankleR: { x: 176, y: 107 },
  });
  const end = copyPose(start, {
    kneeL: { x: 166, y: 120 }, kneeR: { x: 172, y: 124 }, ankleL: { x: 195, y: 92 }, ankleR: { x: 200, y: 96 },
  });
  addScene(['leg-press'], { start, end, equipment: 'leg-press', accent: 'legs', label: 'Leg press' });
}

// Goblet squat.
{
  const start = copyPose(frontStanding(), {
    elbowL: { x: 104, y: 86 }, elbowR: { x: 136, y: 86 }, wristL: { x: 112, y: 82 }, wristR: { x: 128, y: 82 },
  });
  const end = copyPose(start, {
    head: { x: 120, y: 70 }, neck: { x: 120, y: 91 }, shoulderL: { x: 98, y: 102 }, shoulderR: { x: 142, y: 102 },
    elbowL: { x: 103, y: 119 }, elbowR: { x: 137, y: 119 }, wristL: { x: 112, y: 112 }, wristR: { x: 128, y: 112 },
    hipL: { x: 104, y: 148 }, hipR: { x: 136, y: 148 }, kneeL: { x: 88, y: 177 }, kneeR: { x: 152, y: 177 },
    ankleL: { x: 98, y: 218 }, ankleR: { x: 142, y: 218 },
  });
  addScene(['goblet-squat'], { start, end, equipment: 'dumbbells', accent: 'legs', label: 'Goblet squat' });
}

// Hack squat.
{
  const start = copyPose(sideStanding(), {
    head: { x: 82, y: 56 }, neck: { x: 91, y: 73 }, shoulderL: { x: 102, y: 86 }, shoulderR: { x: 108, y: 89 },
    hipL: { x: 120, y: 130 }, hipR: { x: 127, y: 133 }, kneeL: { x: 135, y: 173 }, kneeR: { x: 142, y: 176 },
    ankleL: { x: 155, y: 216 }, ankleR: { x: 161, y: 218 },
  });
  const end = copyPose(start, {
    head: { x: 96, y: 82 }, neck: { x: 105, y: 99 }, shoulderL: { x: 116, y: 111 }, shoulderR: { x: 123, y: 114 },
    hipL: { x: 134, y: 155 }, hipR: { x: 141, y: 158 }, kneeL: { x: 117, y: 180 }, kneeR: { x: 124, y: 183 },
    ankleL: { x: 154, y: 216 }, ankleR: { x: 161, y: 218 },
  });
  addScene(['hack-squat'], { start, end, equipment: 'hack-squat', accent: 'legs', label: 'Hack squat' });
}

// Leg extension / curls.
{
  const base = sideSeated();
  const extStart = copyPose(base, { kneeL: { x: 146, y: 157 }, kneeR: { x: 153, y: 160 }, ankleL: { x: 164, y: 200 }, ankleR: { x: 171, y: 202 } });
  const extEnd = copyPose(extStart, { ankleL: { x: 194, y: 160 }, ankleR: { x: 200, y: 163 } });
  addScene(['leg-extension'], { start: extStart, end: extEnd, equipment: 'leg-machine', accent: 'legs', label: 'Leg extension' });

  const seatedCurlStart = copyPose(base, { kneeL: { x: 150, y: 159 }, kneeR: { x: 156, y: 162 }, ankleL: { x: 183, y: 193 }, ankleR: { x: 188, y: 196 } });
  const seatedCurlEnd = copyPose(seatedCurlStart, { ankleL: { x: 139, y: 194 }, ankleR: { x: 145, y: 196 } });
  addScene(['seated-leg-curl'], { start: seatedCurlStart, end: seatedCurlEnd, equipment: 'leg-machine', accent: 'legs', label: 'Seated leg curl' });

  const lyingStart = copyPose(sideSeated(), {
    head: { x: 57, y: 128 }, neck: { x: 76, y: 130 }, shoulderL: { x: 91, y: 132 }, shoulderR: { x: 96, y: 135 },
    hipL: { x: 132, y: 138 }, hipR: { x: 138, y: 141 }, kneeL: { x: 167, y: 142 }, kneeR: { x: 173, y: 145 },
    ankleL: { x: 197, y: 143 }, ankleR: { x: 202, y: 146 }, elbowL: { x: 79, y: 151 }, elbowR: { x: 84, y: 154 },
    wristL: { x: 60, y: 159 }, wristR: { x: 65, y: 162 },
  });
  const lyingEnd = copyPose(lyingStart, { ankleL: { x: 170, y: 101 }, ankleR: { x: 176, y: 104 } });
  addScene(['lying-leg-curl'], { start: lyingStart, end: lyingEnd, equipment: 'leg-machine', accent: 'legs', label: 'Lying leg curl' });
}

// Calf raises.
{
  const start = frontStanding();
  const end = copyPose(start, {
    head: { x: 120, y: 29 }, neck: { x: 120, y: 50 }, shoulderL: { x: 96, y: 62 }, shoulderR: { x: 144, y: 62 },
    elbowL: { x: 92, y: 98 }, elbowR: { x: 148, y: 98 }, wristL: { x: 94, y: 134 }, wristR: { x: 146, y: 134 },
    hipL: { x: 107, y: 120 }, hipR: { x: 133, y: 120 }, kneeL: { x: 108, y: 165 }, kneeR: { x: 132, y: 165 },
    ankleL: { x: 106, y: 211 }, ankleR: { x: 134, y: 211 },
  });
  addScene(['standing-calf-raise'], { start, end, equipment: 'calf-machine', accent: 'legs', label: 'Standing calf raise' });

  const seated = seatedFront();
  const seatedEnd = copyPose(seated, {
    head: { x: 120, y: 41 }, neck: { x: 120, y: 60 }, shoulderL: { x: 97, y: 71 }, shoulderR: { x: 143, y: 71 },
    hipL: { x: 107, y: 131 }, hipR: { x: 133, y: 131 }, kneeL: { x: 92, y: 167 }, kneeR: { x: 148, y: 167 },
    ankleL: { x: 86, y: 208 }, ankleR: { x: 154, y: 208 },
  });
  addScene(['seated-calf-raise'], { start: seated, end: seatedEnd, equipment: 'calf-machine', accent: 'legs', label: 'Seated calf raise' });
}

// Plank.
{
  const start = copyPose(sideStanding(), {
    head: { x: 55, y: 135 }, neck: { x: 74, y: 140 }, shoulderL: { x: 88, y: 143 }, shoulderR: { x: 93, y: 146 },
    elbowL: { x: 78, y: 168 }, elbowR: { x: 83, y: 171 }, wristL: { x: 58, y: 170 }, wristR: { x: 63, y: 173 },
    hipL: { x: 132, y: 151 }, hipR: { x: 138, y: 154 }, kneeL: { x: 166, y: 159 }, kneeR: { x: 172, y: 162 },
    ankleL: { x: 204, y: 169 }, ankleR: { x: 210, y: 172 },
  });
  const end = copyPose(start, { hipL: { x: 132, y: 147 }, hipR: { x: 138, y: 150 } });
  addScene(['plank'], { start, end, equipment: 'mat', accent: 'core', label: 'Plank hold' });
}

// Cable crunch.
{
  const start = copyPose(sideStanding(), {
    head: { x: 105, y: 58 }, neck: { x: 109, y: 78 }, shoulderL: { x: 110, y: 92 }, shoulderR: { x: 118, y: 94 },
    hipL: { x: 120, y: 138 }, hipR: { x: 128, y: 140 }, kneeL: { x: 119, y: 181 }, kneeR: { x: 129, y: 182 }, ankleL: { x: 113, y: 217 }, ankleR: { x: 136, y: 217 },
    elbowL: { x: 97, y: 82 }, elbowR: { x: 104, y: 84 }, wristL: { x: 92, y: 66 }, wristR: { x: 99, y: 68 },
  });
  const end = copyPose(start, {
    head: { x: 128, y: 93 }, neck: { x: 130, y: 111 }, shoulderL: { x: 126, y: 123 }, shoulderR: { x: 134, y: 125 },
    elbowL: { x: 117, y: 107 }, elbowR: { x: 124, y: 109 }, wristL: { x: 108, y: 92 }, wristR: { x: 115, y: 94 },
    hipL: { x: 120, y: 147 }, hipR: { x: 128, y: 149 },
  });
  addScene(['cable-crunch'], { start, end, equipment: 'cable-high', accent: 'core', label: 'Cable crunch' });
}

// Romanian deadlift.
{
  const start = copyPose(sideStanding(), {
    wristL: { x: 116, y: 132 }, wristR: { x: 123, y: 134 }, elbowL: { x: 116, y: 101 }, elbowR: { x: 123, y: 103 },
  });
  const end = copyPose(start, {
    head: { x: 72, y: 86 }, neck: { x: 90, y: 96 }, shoulderL: { x: 105, y: 104 }, shoulderR: { x: 112, y: 107 },
    hipL: { x: 136, y: 132 }, hipR: { x: 143, y: 135 }, kneeL: { x: 126, y: 173 }, kneeR: { x: 139, y: 174 },
    elbowL: { x: 115, y: 130 }, elbowR: { x: 122, y: 132 }, wristL: { x: 115, y: 165 }, wristR: { x: 122, y: 167 },
  });
  addScene(['romanian-deadlift'], { start, end, equipment: 'barbell', accent: 'legs', label: 'Romanian deadlift' });
}

const fallbackScene: Scene = {
  start: frontStanding(),
  end: copyPose(frontStanding(), {
    elbowL: { x: 80, y: 82 }, elbowR: { x: 160, y: 82 }, wristL: { x: 60, y: 82 }, wristR: { x: 180, y: 82 },
  }),
  equipment: 'none',
  accent: 'full',
  label: 'Exercise form',
};

const AnimatedNumber: React.FC<{ name: string; start: number; end: number }> = ({ name, start, end }) => (
  <animate attributeName={name} values={MOTION_VALUES(start, end)} dur={DURATION} repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" />
);

const AnimatedLine: React.FC<{
  a0: Point; a1: Point; b0: Point; b1: Point; stroke: string; width?: number; opacity?: number;
}> = ({ a0, a1, b0, b1, stroke, width = 10, opacity = 1 }) => (
  <line x1={a0.x} y1={a0.y} x2={b0.x} y2={b0.y} stroke={stroke} strokeWidth={width} strokeLinecap="round" opacity={opacity}>
    <AnimatedNumber name="x1" start={a0.x} end={a1.x} />
    <AnimatedNumber name="y1" start={a0.y} end={a1.y} />
    <AnimatedNumber name="x2" start={b0.x} end={b1.x} />
    <AnimatedNumber name="y2" start={b0.y} end={b1.y} />
  </line>
);

const AnimatedCircle: React.FC<{ p0: Point; p1: Point; r: number; fill: string; stroke?: string; strokeWidth?: number }> = ({ p0, p1, r, fill, stroke, strokeWidth }) => (
  <circle cx={p0.x} cy={p0.y} r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth}>
    <AnimatedNumber name="cx" start={p0.x} end={p1.x} />
    <AnimatedNumber name="cy" start={p0.y} end={p1.y} />
  </circle>
);

const torsoPath = (pose: Pose) => `M ${pose.shoulderL.x} ${pose.shoulderL.y} Q ${pose.neck.x} ${pose.neck.y + 4} ${pose.shoulderR.x} ${pose.shoulderR.y} L ${pose.hipR.x} ${pose.hipR.y} Q ${(pose.hipL.x + pose.hipR.x) / 2} ${pose.hipR.y + 8} ${pose.hipL.x} ${pose.hipL.y} Z`;

const Athlete: React.FC<{ scene: Scene; bodyGradient: string; activeGradient: string }> = ({ scene, bodyGradient, activeGradient }) => {
  const { start, end, accent } = scene;
  const upperActive = accent === 'upper' || accent === 'back' || accent === 'full';
  const armActive = upperActive || accent === 'arms';
  const legActive = accent === 'legs' || accent === 'full';
  const torsoActive = upperActive || accent === 'core';

  return (
    <g>
      <path d={torsoPath(start)} fill={torsoActive ? `url(#${activeGradient})` : `url(#${bodyGradient})`} stroke="rgba(255,255,255,.16)" strokeWidth="1.25">
        <animate attributeName="d" values={`${torsoPath(start)};${torsoPath(end)};${torsoPath(start)}`} dur={DURATION} repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" />
      </path>

      <AnimatedLine a0={start.hipL} a1={end.hipL} b0={start.kneeL} b1={end.kneeL} stroke={legActive ? '#8b5cf6' : '#a7a8b5'} width={12} />
      <AnimatedLine a0={start.kneeL} a1={end.kneeL} b0={start.ankleL} b1={end.ankleL} stroke={legActive ? '#7c3aed' : '#8f91a1'} width={10} />
      <AnimatedLine a0={start.hipR} a1={end.hipR} b0={start.kneeR} b1={end.kneeR} stroke={legActive ? '#9b6cff' : '#b7b8c4'} width={12} />
      <AnimatedLine a0={start.kneeR} a1={end.kneeR} b0={start.ankleR} b1={end.ankleR} stroke={legActive ? '#8b5cf6' : '#9c9dac'} width={10} />

      <AnimatedLine a0={start.shoulderL} a1={end.shoulderL} b0={start.elbowL} b1={end.elbowL} stroke={armActive ? '#9b6cff' : '#b3b4c0'} width={10} />
      <AnimatedLine a0={start.elbowL} a1={end.elbowL} b0={start.wristL} b1={end.wristL} stroke={armActive ? '#7c3aed' : '#9698a7'} width={9} />
      <AnimatedLine a0={start.shoulderR} a1={end.shoulderR} b0={start.elbowR} b1={end.elbowR} stroke={armActive ? '#a879ff' : '#c0c1ca'} width={10} />
      <AnimatedLine a0={start.elbowR} a1={end.elbowR} b0={start.wristR} b1={end.wristR} stroke={armActive ? '#8b5cf6' : '#a0a2af'} width={9} />

      {([['elbowL', 4], ['elbowR', 4], ['kneeL', 5], ['kneeR', 5]] as const).map(([key, r]) => (
        <AnimatedCircle key={key} p0={start[key]} p1={end[key]} r={r} fill="rgba(255,255,255,.22)" />
      ))}

      <AnimatedLine a0={start.neck} a1={end.neck} b0={start.head} b1={end.head} stroke="#9b9ca9" width={8} />
      <AnimatedCircle p0={start.head} p1={end.head} r={13} fill={`url(#${bodyGradient})`} stroke="rgba(255,255,255,.18)" strokeWidth={1.25} />

      <AnimatedCircle p0={start.wristL} p1={end.wristL} r={4.6} fill="#c4c5ce" />
      <AnimatedCircle p0={start.wristR} p1={end.wristR} r={4.6} fill="#d2d3da" />
      <AnimatedLine a0={start.ankleL} a1={end.ankleL} b0={{ x: start.ankleL.x + 11, y: start.ankleL.y + 1 }} b1={{ x: end.ankleL.x + 11, y: end.ankleL.y + 1 }} stroke="#8c8e9d" width={6} />
      <AnimatedLine a0={start.ankleR} a1={end.ankleR} b0={{ x: start.ankleR.x + 11, y: start.ankleR.y + 1 }} b1={{ x: end.ankleR.x + 11, y: end.ankleR.y + 1 }} stroke="#9a9caa" width={6} />
    </g>
  );
};

const Dumbbell: React.FC<{ p0: Point; p1: Point }> = ({ p0, p1 }) => (
  <g>
    <AnimatedLine a0={{ x: p0.x - 7, y: p0.y }} a1={{ x: p1.x - 7, y: p1.y }} b0={{ x: p0.x + 7, y: p0.y }} b1={{ x: p1.x + 7, y: p1.y }} stroke="#404252" width={3.5} />
    <AnimatedCircle p0={{ x: p0.x - 8, y: p0.y }} p1={{ x: p1.x - 8, y: p1.y }} r={4} fill="#262836" />
    <AnimatedCircle p0={{ x: p0.x + 8, y: p0.y }} p1={{ x: p1.x + 8, y: p1.y }} r={4} fill="#262836" />
  </g>
);

const EquipmentLayer: React.FC<{ scene: Scene }> = ({ scene }) => {
  const { equipment, start, end } = scene;
  const cable = '#4b4d5f';
  const metal = '#343645';
  const pad = '#242632';

  switch (equipment) {
    case 'dumbbells':
      return <><Dumbbell p0={start.wristL} p1={end.wristL} /><Dumbbell p0={start.wristR} p1={end.wristR} /></>;
    case 'barbell':
      return (
        <g>
          <AnimatedLine a0={{ x: start.wristL.x - 28, y: start.wristL.y }} a1={{ x: end.wristL.x - 28, y: end.wristL.y }} b0={{ x: start.wristR.x + 28, y: start.wristR.y }} b1={{ x: end.wristR.x + 28, y: end.wristR.y }} stroke="#464858" width={4} />
          <Dumbbell p0={{ x: start.wristL.x - 27, y: start.wristL.y }} p1={{ x: end.wristL.x - 27, y: end.wristL.y }} />
          <Dumbbell p0={{ x: start.wristR.x + 27, y: start.wristR.y }} p1={{ x: end.wristR.x + 27, y: end.wristR.y }} />
        </g>
      );
    case 'bench':
      return <g><rect x="46" y="125" width="134" height="10" rx="5" fill={pad} /><rect x="73" y="135" width="8" height="40" rx="4" fill={metal} /><rect x="151" y="135" width="8" height="40" rx="4" fill={metal} /><Dumbbell p0={start.wristL} p1={end.wristL} /><Dumbbell p0={start.wristR} p1={end.wristR} /></g>;
    case 'incline-bench':
      return <g><rect x="54" y="116" width="105" height="10" rx="5" fill={pad} transform="rotate(-27 54 116)" /><rect x="126" y="131" width="10" height="44" rx="4" fill={metal} /><Dumbbell p0={start.wristL} p1={end.wristL} /><Dumbbell p0={start.wristR} p1={end.wristR} /></g>;
    case 'machine-press':
      return (
        <g>
          <rect x="43" y="64" width="9" height="118" rx="4" fill={metal} />
          <rect x="61" y="131" width="91" height="10" rx="5" fill={pad} />
          <rect x="66" y="78" width="10" height="60" rx="5" fill={pad} />
          <AnimatedLine a0={{ x: 51, y: 82 }} a1={{ x: 51, y: 82 }} b0={start.wristL} b1={end.wristL} stroke={cable} width={3} opacity={0.85} />
          <AnimatedLine a0={{ x: 51, y: 96 }} a1={{ x: 51, y: 96 }} b0={start.wristR} b1={end.wristR} stroke={cable} width={3} opacity={0.85} />
        </g>
      );
    case 'cable-dual':
      return (
        <g>
          <rect x="18" y="38" width="9" height="155" rx="4" fill={metal} /><rect x="213" y="38" width="9" height="155" rx="4" fill={metal} />
          <circle cx="23" cy="73" r="5" fill="#5d6072" /><circle cx="217" cy="73" r="5" fill="#5d6072" />
          <AnimatedLine a0={{ x: 23, y: 73 }} a1={{ x: 23, y: 73 }} b0={start.wristL} b1={end.wristL} stroke={cable} width={2.6} />
          <AnimatedLine a0={{ x: 217, y: 73 }} a1={{ x: 217, y: 73 }} b0={start.wristR} b1={end.wristR} stroke={cable} width={2.6} />
        </g>
      );
    case 'cable-high':
      return (
        <g>
          <rect x="202" y="26" width="10" height="170" rx="5" fill={metal} /><circle cx="207" cy="41" r="6" fill="#626577" />
          <AnimatedLine a0={{ x: 207, y: 41 }} a1={{ x: 207, y: 41 }} b0={start.wristR} b1={end.wristR} stroke={cable} width={2.7} />
          <AnimatedLine a0={{ x: 207, y: 41 }} a1={{ x: 207, y: 41 }} b0={start.wristL} b1={end.wristL} stroke={cable} width={2.7} />
        </g>
      );
    case 'cable-low':
      return (
        <g>
          <rect x="202" y="40" width="10" height="156" rx="5" fill={metal} /><circle cx="207" cy="181" r="6" fill="#626577" />
          <AnimatedLine a0={{ x: 207, y: 181 }} a1={{ x: 207, y: 181 }} b0={start.wristR} b1={end.wristR} stroke={cable} width={2.7} />
        </g>
      );
    case 'pulldown':
      return (
        <g>
          <rect x="29" y="27" width="9" height="168" rx="4" fill={metal} /><rect x="33" y="27" width="178" height="8" rx="4" fill={metal} /><circle cx="202" cy="31" r="6" fill="#626577" />
          <rect x="82" y="145" width="76" height="9" rx="4" fill={pad} />
          <AnimatedLine a0={{ x: 202, y: 31 }} a1={{ x: 202, y: 31 }} b0={{ x: (start.wristL.x + start.wristR.x) / 2, y: Math.min(start.wristL.y, start.wristR.y) }} b1={{ x: (end.wristL.x + end.wristR.x) / 2, y: Math.min(end.wristL.y, end.wristR.y) }} stroke={cable} width={2.6} />
          <AnimatedLine a0={start.wristL} a1={end.wristL} b0={start.wristR} b1={end.wristR} stroke="#4c4f60" width={4.5} />
        </g>
      );
    case 'row-cable':
      return <g><rect x="202" y="54" width="10" height="142" rx="5" fill={metal} /><circle cx="207" cy="107" r="6" fill="#626577" /><rect x="73" y="144" width="70" height="9" rx="4" fill={pad} /><AnimatedLine a0={{ x: 207, y: 107 }} a1={{ x: 207, y: 107 }} b0={start.wristR} b1={end.wristR} stroke={cable} width={2.7} /></g>;
    case 'machine-row':
      return <g><rect x="188" y="68" width="10" height="118" rx="5" fill={metal} /><rect x="72" y="145" width="74" height="9" rx="4" fill={pad} /><rect x="84" y="79" width="9" height="64" rx="4" fill={pad} /><AnimatedLine a0={{ x: 188, y: 105 }} a1={{ x: 188, y: 105 }} b0={start.wristR} b1={end.wristR} stroke={cable} width={3.2} /></g>;
    case 'leg-press':
      return <g><rect x="42" y="90" width="11" height="91" rx="5" fill={pad} transform="rotate(-35 42 90)" /><rect x="189" y="70" width="10" height="98" rx="5" fill={metal} transform="rotate(35 189 70)" /><line x1="177" y1="98" x2="218" y2="69" stroke="#5b5e70" strokeWidth="7" strokeLinecap="round" /></g>;
    case 'hack-squat':
      return <g><line x1="46" y1="28" x2="177" y2="205" stroke={metal} strokeWidth="9" strokeLinecap="round" /><rect x="73" y="81" width="57" height="10" rx="5" fill={pad} transform="rotate(53 73 81)" /><rect x="141" y="203" width="76" height="8" rx="4" fill="#4c4f60" /></g>;
    case 'leg-machine':
      return <g><rect x="55" y="127" width="98" height="10" rx="5" fill={pad} /><rect x="76" y="137" width="9" height="48" rx="4" fill={metal} /><AnimatedCircle p0={{ x: start.ankleR.x + 4, y: start.ankleR.y }} p1={{ x: end.ankleR.x + 4, y: end.ankleR.y }} r={8} fill="#444758" /></g>;
    case 'calf-machine':
      return <g><rect x="78" y="222" width="86" height="6" rx="3" fill="#464958" /><rect x="58" y="38" width="8" height="166" rx="4" fill={metal} /><rect x="78" y="62" width="84" height="8" rx="4" fill={pad} /></g>;
    case 'mat':
      return <rect x="34" y="175" width="186" height="7" rx="3.5" fill="#2f3240" />;
    default:
      return null;
  }
};

const MotionArrow: React.FC<{ scene: Scene }> = ({ scene }) => {
  const sx = (scene.start.wristR.x + scene.start.wristL.x) / 2;
  const sy = (scene.start.wristR.y + scene.start.wristL.y) / 2;
  const ex = (scene.end.wristR.x + scene.end.wristL.x) / 2;
  const ey = (scene.end.wristR.y + scene.end.wristL.y) / 2;
  const moved = Math.hypot(ex - sx, ey - sy) > 12;
  if (!moved) return null;
  return (
    <g opacity="0.6">
      <path d={`M ${sx} ${sy} Q ${(sx + ex) / 2 + 8} ${(sy + ey) / 2 - 8} ${ex} ${ey}`} fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 5" />
      <circle cx={ex} cy={ey} r="3" fill="#a78bfa" />
    </g>
  );
};

export const ExerciseAnimation: React.FC<ExerciseAnimationProps> = ({
  exerciseId,
  className = '',
  size = 200,
}) => {
  const scene = SCENES[exerciseId] ?? fallbackScene;
  const uid = useId().replace(/:/g, '');
  const bodyGradient = `body-${uid}`;
  const activeGradient = `active-${uid}`;
  const bgGradient = `bg-${uid}`;
  const glow = `glow-${uid}`;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c12] ${className}`}
      style={{ width: size, height: size }}
      aria-label={`${scene.label} animated exercise demonstration`}
      role="img"
    >
      <svg viewBox="0 0 240 240" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        <defs>
          <linearGradient id={bgGradient} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#151722" />
            <stop offset="55%" stopColor="#0d0f16" />
            <stop offset="100%" stopColor="#08090d" />
          </linearGradient>
          <linearGradient id={bodyGradient} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d8d9df" />
            <stop offset="55%" stopColor="#a9abb8" />
            <stop offset="100%" stopColor="#747786" />
          </linearGradient>
          <linearGradient id={activeGradient} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <filter id={glow} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect width="240" height="240" fill={`url(#${bgGradient})`} />
        <ellipse cx="120" cy="220" rx="82" ry="10" fill="rgba(0,0,0,.36)" />
        <circle cx="194" cy="50" r="42" fill="rgba(124,58,237,.07)" filter={`url(#${glow})`} />
        <path d="M20 203 H220" stroke="rgba(255,255,255,.06)" strokeWidth="1" />

        <EquipmentLayer scene={scene} />
        <MotionArrow scene={scene} />
        <Athlete scene={scene} bodyGradient={bodyGradient} activeGradient={activeGradient} />

        <g>
          <rect x="12" y="12" width="76" height="22" rx="11" fill="rgba(13,15,22,.72)" stroke="rgba(255,255,255,.08)" />
          <circle cx="25" cy="23" r="4" fill="#8b5cf6"><animate attributeName="opacity" values="1;.35;1" dur="1.4s" repeatCount="indefinite" /></circle>
          <text x="35" y="27" fill="#d7d8e0" fontSize="9.5" fontWeight="700" letterSpacing="1">FORM LOOP</text>
        </g>
        <text x="228" y="226" textAnchor="end" fill="rgba(255,255,255,.42)" fontSize="9" fontWeight="600">CONTROLLED TEMPO</text>
      </svg>
    </div>
  );
};
