export type TrainingInfo = {
  exerciseName: string;
  hardness: string;
  sets: number;
  reps: number;
  target: string;
  restTime: number;
  weakness: string;
  description: string;
  secondPerRep: number;
  caloriePerSet: number;
  type: string;
};

export type CompletedTrainingInfo = {
  dateCompleted: Date;
  name: string;
  sets: number;
  reps: number;
  id: number;
  type?: string;
  caloriesBurned?: number;
  totalSeconds?: number;
};

export type NewTrainingInfo = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  dateAdded: Date;
  type: string;
  secondPerRep: number;
  caloriePerSet: number
};
