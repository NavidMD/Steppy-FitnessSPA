import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingInfo } from '../shared/types';
import { GetTrainingsService } from '../shared/services/getTrainings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('fitnessPlansSection') fitnessPlansSection!: ElementRef;
  @ViewChild('exerciseSection') exerciseSection!: ElementRef;

  constructor(private trainingService: GetTrainingsService) {}

  allExercises$!: Observable<TrainingInfo[]>;
  plansSectionObserved: boolean = false;
  exerciseSectionObserved: boolean = false;

  //homepage animations
  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === this.fitnessPlansSection.nativeElement) {
              this.plansSectionObserved = true;
            }
            if (entry.target === this.exerciseSection.nativeElement) {
              this.exerciseSectionObserved = true;
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(this.fitnessPlansSection.nativeElement);
    observer.observe(this.exerciseSection.nativeElement);
  }

  ngOnInit(): void {
    this.allExercises$ = this.trainingService.getExerciseModels();
  }
}
