import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TrainingInfo } from '../shared/types';
import { HttpClient } from '@angular/common/http';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { StartModalComponent } from './start-modal/start-modal.component';

@Component({
  selector: 'app-active-training',
  templateUrl: './active-training.component.html',
  styleUrl: './active-training.component.css'
})
export class ActiveTrainingComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private dialog: MatDialog) { }
  @ViewChild('stepper') stepper!: MatStepper;

  //active exercise data
  reps: number = 0;
  sets: number[] = [];
  name: string = 'نامشخص';
  exerciseId!: number;
  activeExerciseModel!: TrainingInfo;


  // spinner and interval data
  progressValue: number = 100;
  timePassed: number = 0;
  timer: string = '00:00'
  timerActivated: boolean = false;
  lastSetCompleted: boolean = false;

  // exercise interval
  interval: any = null;

  //timer handlers
  start() {
    this.timerActivated = true;
    if (this.progressValue === 100) this.progressValue = 0;
    this.interval = setInterval(() => {
      this.timePassed++;
      this.timer = `00:${String(this.timePassed).padStart(2, "0")}`
      this.progressValue = (this.timePassed / 60) * 100;
      if (this.timePassed >= 60) {
        this.stop();
        this.reset();
        this.stepper.selected!.completed = true;
        this.addAsCompleted();
      }
    }, 1000);
  }
  stop() {
    this.timerActivated = false;
    clearInterval(this.interval);
    this.interval = null;
  }
  reset() {
    this.timePassed = 0;
    this.timer = '00:00';
    this.progressValue = 100;
  }
  addAsCompleted() {
    if (this.stepper.selectedIndex === this.sets.length - 1) {
      let completedTrainings = JSON.parse(localStorage.getItem('completedTrainings')!);
      let completedExercise = {
        dateCompleted: new Date(),
        name: this.name,
        sets: this.sets.length,
        reps: this.reps,
      }
      completedTrainings.push(completedExercise);
      localStorage.setItem('completedTrainings', JSON.stringify(completedTrainings));
      this.lastSetCompleted = true;
      this.deleteActiveExercise();
    }
    else {
      this.stepper.selectedIndex++;
    }
  }

  //handling dialog part
  executeDialog() {
    if (this.progressValue !== 100) return this.start();
    if (this.progressValue === 100) {
      let dialogRef = this.dialog.open(StartModalComponent, {
        data: {
          name: this.name,
          sets: this.sets.length,
          reps: this.reps
        },
      });
      dialogRef.afterClosed().subscribe({
        next: (result) => {
          if (result === 'cancel') return;
          if (result === 'start') this.start();
        }
      })
    }
  }

  //spinner buttons handlers
  deleteActiveExercise() {
    let filteredTrainingsList = JSON.parse(localStorage.getItem('newTrainings')!).filter((i: any) => i.id !== this.exerciseId);
    localStorage.setItem('newTrainings', JSON.stringify(filteredTrainingsList));
    this.router.navigate(['/training']);
  }

  ngOnInit(): void {
    // getting added exercise id from url
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.exerciseId = parseInt(params.get('id')!);
    })

    // finding added exercise object from local storage array
    if (JSON.parse(localStorage.getItem('newTrainings')!)) {
      JSON.parse(localStorage.getItem('newTrainings')!).find((i: any) => {
        if (i.id === this.exerciseId) {
          this.reps = i.reps;
          this.name = i.name;
          // creating array from sets count for stepper
          for (let set = 1; set <= i.sets; set++) {
            this.sets.push(set)
          }
        }
      });
      // getting exercise model of added exercise for more info
      this.http.get<TrainingInfo[]>('assets/data/trainings-data.json').subscribe({
        next: response => {
          this.activeExerciseModel = response.find(i => i.exerciseName === this.name)!
        }
      })
    }
    else if (!localStorage.getItem('newTrainings')) {
      this.router.navigate(['/training'])
    }
  }
}
