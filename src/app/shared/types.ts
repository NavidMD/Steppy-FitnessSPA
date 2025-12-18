export type TrainingInfo = {
  exerciseName: string;
  hardness: string;
  sets: number;
  reps: number;
  target: string;
  restTime: number;
  weakness: string;
  description: string;
};

export type CompletedTrainingInfo = {
  dateCompleted: Date;
  name: string;
  sets: number;
  reps: number;
  id?: string;
};

export type NewTrainingInfo = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  dateAdded: Date
};
