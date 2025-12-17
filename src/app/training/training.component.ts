import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { CompletedTrainingInfo, TrainingInfo } from '../shared/types';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { GetTrainingsService } from '../shared/services/getTrainings.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.css',
})
export class TrainingComponent implements OnInit, OnDestroy {
  constructor(private trainingService: GetTrainingsService) {}
  subscription = new Subscription();
  //data from Firebase
  allExercises$!: Observable<TrainingInfo[]>;
  selectedExercise$!: Observable<TrainingInfo>;
  setCounts: number[] = [2, 3, 4, 5, 6, 7, 8];
  repCounts: number[] = [...this.setCounts, 9, 10, 11, 12, 13, 14, 15];

  //mutable data that changes by user input
  private selectedName = new BehaviorSubject<string>('پلانک');

  //new exercises data
  newTrainings!: object[];
  //completed Trainings from database
  completedTrainings!: CompletedTrainingInfo[];

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
      const newExercise = {
        id: Date.now(),
        name: newExerciseName,
        sets: newSetCount,
        reps: newRepCount,
        dateAdded,
      };
      this.newTrainings.push(newExercise);
      localStorage.setItem('newTrainings', JSON.stringify(this.newTrainings));
    }
    if (!localStorage.getItem('completedTrainings')) {
      localStorage.setItem('completedTrainings', JSON.stringify([]));
    }
  }

  removeAllTrainings() {
    if (localStorage.getItem('newTrainings')) {
      localStorage.clear();
      this.newTrainings = [];
    } else {
      alert('تمرین جدیدی وجود ندارد!');
    }
  }

  deleteFromHistory(id: string) {
    this.trainingService.deleteItemFromDb('CompletedTrainings', id);
  }

  ngOnInit(): void {
    //getting all models from database
    this.allExercises$ = this.trainingService.getExerciseModels();
    //getting realtime selected data from database
    this.selectedExercise$ = this.selectedName.pipe(
      switchMap((name) => this.trainingService.getExerciseByName(name))
    );

    if (JSON.parse(localStorage.getItem('newTrainings') || '[]')) {
      this.newTrainings = JSON.parse(
        localStorage.getItem('newTrainings') || '[]'
      );
    }

    //getting completed trainings from database
    this.trainingService.getCompletedTrainingsDb();
    this.subscription = this.trainingService.completedTrainingsFromDb.subscribe(
      (data) => {
        this.completedTrainings = data;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
