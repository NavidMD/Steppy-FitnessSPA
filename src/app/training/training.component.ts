import { Component, OnInit } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import {
  NewTrainingInfo,
  TrainingInfo,
} from '../shared/types';
import { BehaviorSubject, Observable, Subscription, switchMap, take } from 'rxjs';
import { GetTrainingsService } from '../shared/services/getTrainings.service';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.css',
})
export class TrainingComponent implements OnInit {
  constructor(
    private trainingService: GetTrainingsService,
    private authService: AuthService
  ) {}
  subscription!: Subscription;
  //data from Firebase
  allExercises$!: Observable<TrainingInfo[]>;
  selectedExercise$!: Observable<TrainingInfo>;
  setCounts: number[] = [2, 3, 4, 5, 6, 7, 8];
  repCounts: number[] = [...this.setCounts, 9, 10, 11, 12, 13, 14, 15];
  userId!: string;

  //mutable data that changes by user input
  private selectedName = new BehaviorSubject<string>('پلانک');

  //data from database
  newTrainings$!: Observable<object[]>;
  completedTrainings$!: Observable<object[]>;

  //getting user input
  exercisePick(event: MatSelectChange) {
    const value = event.value;
    this.selectedName.next(value);
  }

  createTraining(name: MatSelect, sets: MatSelect, reps: MatSelect) {
    if (!name.value || !sets.value || !reps.value) {
      return alert('تعداد ست و تعداد تکرار رو وارد کن!');
    } else {
      let newExerciseName = name.value;
      let newSetCount = sets.value;
      let newRepCount = reps.value;
      let dateAdded = new Date();
      this.selectedExercise$.pipe(take(1)).subscribe({
        next: (exercise) => {
          const newExercise: NewTrainingInfo = {
            id: Date.now(),
            name: newExerciseName,
            sets: newSetCount,
            reps: newRepCount,
            dateAdded,
            type: exercise.type!,
            secondPerRep: exercise.secondPerRep!,
            caloriePerSet: exercise.caloriePerSet!
          };
          this.trainingService.addToNewTrainingsDb(newExercise, this.userId);
        }
      })
    }
  }

  removeAllTrainings() {
    this.trainingService.deleteAllNewTrainings();
  }

  removeCompletedTraining(event: any) {
    this.trainingService.deleteCompletedTraining(event.id);
  }

  ngOnInit(): void {
    //getting all models from database
    this.allExercises$ = this.trainingService.getExerciseModels();
    //getting realtime selected data from database
    this.selectedExercise$ = this.selectedName.pipe(
      switchMap((name) => this.trainingService.getExerciseByName(name))
    );
    //getting user UID
    this.authService.userIdSubject.subscribe({
      next: (res) => {
        res.uid ? (this.userId = res.uid) : null;
        this.completedTrainings$ = this.trainingService.getCompletedTrainingsDb(
          this.userId
        );
        this.newTrainings$ = this.trainingService.getNewTrainingsDb(
          this.userId
        );
      },
    });
  }
}
