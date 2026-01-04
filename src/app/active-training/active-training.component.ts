import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CompletedTrainingInfo, NewTrainingInfo, TrainingInfo } from '../shared/types';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { StartModalComponent } from './start-modal/start-modal.component';
import { Observable } from 'rxjs';
import { GetTrainingsService } from '../shared/services/getTrainings.service';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-active-training',
  templateUrl: './active-training.component.html',
  styleUrl: './active-training.component.css',
})
export class ActiveTrainingComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private trainingService: GetTrainingsService,
    private authService: AuthService
  ) {}

  //active exercise data
  type!: string;
  caloriePerSet: number = 0;
  secondPerRep: number = 0;
  reps: number = 0;
  sets: number[] = [];
  name: string = 'پلانک';
  timeRequired: number = 0;
  exerciseId!: number;
  activeExerciseModel$!: Observable<TrainingInfo>;

  // spinner and interval data
  progressValue: number = 100;
  timePassed: number = 0;
  timer: string = '00:00';
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
      this.timer = `00:${String(this.timePassed).padStart(2, '0')}`;
      this.progressValue = (this.timePassed / this.timeRequired) * 100;
      if (this.timePassed >= this.timeRequired) {
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
      let completedExercise: CompletedTrainingInfo = {
        dateCompleted: new Date(),
        name: this.name,
        sets: this.sets.length,
        reps: this.reps,
        id: this.exerciseId,
        type: this.type,
        caloriesBurned: (this.caloriePerSet * this.sets.length),
        totalSeconds: (this.reps * this.secondPerRep) * this.sets.length
      };
      this.lastSetCompleted = true;
      this.trainingService.addToCompletedTrainingsDb(completedExercise);
      this.deleteActiveExercise();
    } else {
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
          reps: this.reps,
        },
      });
      dialogRef.afterClosed().subscribe({
        next: (result) => {
          if (result === 'cancel') return;
          if (result === 'start') this.start();
        },
      });
    }
  }

  //spinner buttons handlers
  deleteActiveExercise() {
    if(this.exerciseId) {
      this.trainingService.deleteNewTraining(this.exerciseId);
    }
    this.router.navigate(['/training']);
  }

  ngOnInit(): void {
    // getting added exercise id from url
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.exerciseId = parseInt(params.get('id')!);
    });

    this.authService.userIdSubject.subscribe({
      next: (data) => {
        const active = data.newTrainings.find((i:NewTrainingInfo) => i.id === this.exerciseId);
        if (active) {
          this.name = active.name;
          this.reps = active.reps;
          this.type = active.type;
          this.secondPerRep = active.secondPerRep;
          this.caloriePerSet = active.caloriePerSet;
          this.timeRequired = active.secondPerRep * active.reps
          for (let i = 1; i <= active.sets; i++) {
            this.sets.push(i);
          }
        }
        this.activeExerciseModel$ = this.trainingService.getExerciseByName(this.name);
      },
    });
  }
}
