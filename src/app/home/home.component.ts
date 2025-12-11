import { AfterViewInit, Component, ElementRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';


type TrainingInfo = {
  exerciseName: string,
  hardness: string,
  sets: number,
  reps: number,
  target: string,
  restTime: number,
  weakness: string,
  description: string
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('fitnessPlansSection') fitnessPlansSection!: ElementRef;
  @ViewChild('exerciseSection') exerciseSection!: ElementRef;
  constructor(private http: HttpClient) { }

  allExercisesData!: TrainingInfo[];
  selectedExercise!: TrainingInfo;
  plansSectionObserved: boolean = false;
  exerciseSectionObserved: boolean = false;

  //homepage animations
  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === this.fitnessPlansSection.nativeElement) {
            this.plansSectionObserved = true;
          }
          if (entry.target === this.exerciseSection.nativeElement) {
            this.exerciseSectionObserved = true;
          }
        }
      });
    }, { threshold: 0.2 });
    observer.observe(this.fitnessPlansSection.nativeElement);
    observer.observe(this.exerciseSection.nativeElement);
  }

  ngOnInit(): void {
    this.http.get<TrainingInfo[]>("assets/data/trainings-data.json").subscribe({
      next: (response) => {
        this.allExercisesData = response;
        this.selectedExercise = this.allExercisesData[0]
      }
    })
  }
}
