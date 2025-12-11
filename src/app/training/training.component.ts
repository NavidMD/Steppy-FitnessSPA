import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { TrainingInfo } from '../shared/types';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent implements OnInit {
  constructor(private http: HttpClient) { }
  //data from httpRequest
  allExercises: TrainingInfo[] = [];

  //data for select inputs
  selectedExercise!: TrainingInfo;
  exerciseNames: string[] = [];
  setCounts: number[] = [2, 3, 4, 5, 6, 7, 8];
  repCounts: number[] = [...this.setCounts, 9, 10, 11, 12, 13, 14, 15]

  //new exercises data
  newTrainings!: object[];
  completedTrainings!: { dateCompleted: Date, name: string, sets: number, reps: number }[];

  exercisePick(event: MatSelectChange) {
    const value = event.value;
    this.selectedExercise = this.allExercises.find(item => item.exerciseName === value)!;
  }
  createTraining(name: MatSelect, sets: MatSelect, reps: MatSelect) {
    if (!name.value || !sets.value || !reps.value) {
      return alert('تعداد ست و تعداد تکرار رو وارد کن!');
    }
    else {
      let newExerciseName = name.value;
      let newSetCount = sets.value;
      let newRepCount = reps.value;
      let dateAdded = new Date();
      const newExercise = {
        id: Date.now(),
        name: newExerciseName,
        sets: newSetCount,
        reps: newRepCount,
        dateAdded
      }
      this.newTrainings.push(newExercise);
      localStorage.setItem('newTrainings', JSON.stringify(this.newTrainings))
    }
    if (!localStorage.getItem('completedTrainings')) {
      localStorage.setItem('completedTrainings', JSON.stringify([]))
    }
  }
  removeAllTrainings() {
    if (localStorage.getItem('newTrainings')) {
      localStorage.clear();
      this.newTrainings = [];
    }
    else {
      alert('تمرین جدیدی وجود ندارد!')
    }
  }

  deleteFromHistory(dateCompleted: Date) {
    this.completedTrainings = this.completedTrainings.filter(exercise => exercise.dateCompleted !== dateCompleted);
    localStorage.setItem('completedTrainings', JSON.stringify(this.completedTrainings))
  }

  ngOnInit(): void {
    this.http.get<TrainingInfo[]>("assets/data/trainings-data.json").subscribe({
      next: (response) => {
        this.allExercises = response;
        response.map(exercise => this.exerciseNames.push(exercise["exerciseName"]));
        this.selectedExercise = response[0]
      }
    })
    if (JSON.parse(localStorage.getItem('newTrainings') || '[]')) {
      this.newTrainings = JSON.parse(localStorage.getItem('newTrainings') || '[]')
    }
    if (JSON.parse(localStorage.getItem('completedTrainings') || '[]')) {
      this.completedTrainings = JSON.parse(localStorage.getItem('completedTrainings') || '[]')
    }
  }
}
