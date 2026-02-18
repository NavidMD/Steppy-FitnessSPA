import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard-statics-panel',
  templateUrl: './dashboard-statics-panel.component.html',
  styleUrl: './dashboard-statics-panel.component.css',
})
export class DashboardStaticsPanelComponent implements OnInit {
  constructor(public authService: AuthService) {}

  spinnerOn: boolean = true;
  totalExerciseTimeSpent: number = 0;
  totalCaloriesBurned: number = 0;
  totalTrainingsDone: number = 0;
  trainingsDoneLast7Days: boolean = false;
  newTrainings: any[] = [];

  // training types pie chart data source
  completedTrainingsTypes: { name: string; value: number }[] = [
    { name: 'قدرتی', value: 0 },
    { name: 'ایزومتریک', value: 0 },
    { name: 'هوازی', value: 0 },
  ];

  // weekly done trainings bar chart data source
  completedTrainingLast7Days: {
    name: string;
    value: number;
  }[] = [];

  // weekly record chart
  schemeType: string = 'linear';
  gradient: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  legend: boolean = false;
  legendTitleMulti: string = 'روز';
  legendPosition: string = 'below';
  showXAxisLabel: boolean = false;
  showYAxisLabel: boolean = false;
  yAxisLabel: string = 'تمرین های انجام شده';
  xAxisLabel: string = 'تعداد تمرین های انجام شده در 7 روز گذشته';
  animations: boolean = true;
  showGridLines: boolean = false;
  showDataLabel: boolean = false;
  barPadding: number = 30;
  tooltipDisabled: boolean = false;
  roundEdges: boolean = true;

  //training types pie chart
  pieGradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  pieLegendPosition: string = 'below';

  pieColorScheme: Color = {
    name: 'pieColorScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#F28B82', '#a6d4f5', '#C0CA33'],
  };

  getLast7Days() {
    const today = new Date().getTime();
    for (let i = 0; i < 7; i++) {
      const targetDay = today - i * 86400000;
      this.completedTrainingLast7Days.unshift({
        name: new Date(targetDay).toDateString(),
        value: 0,
      });
    }
  }

  ngOnInit(): void {
    this.getLast7Days();
    this.authService.userIdSubject.subscribe((user) => {
      if (user) {
        // console.log(user);
        this.newTrainings = [...user.newTrainings.reverse()];
        if(this.newTrainings.length > 3) {
          this.newTrainings.length = 3;
        }
        this.totalTrainingsDone = user.completedTrainings.length;
        for (let training of user.completedTrainings) {
          this.totalCaloriesBurned += training.caloriesBurned;
          this.totalExerciseTimeSpent += training.totalSeconds;
        }
        for (let type of this.completedTrainingsTypes) {
          user.completedTrainings.map((exercise: any) => {
            if (exercise.type === type.name) {
              type.value++;
            }
          });
        }
        for (let day of this.completedTrainingLast7Days) {
          user.completedTrainings.map((exercise: any) => {
            if (exercise.dateCompleted.toDate().toDateString() === day.name) {
              day.value++;
            }
          });
          day.name = new Date(day.name).toLocaleString('fa-IR', {
            day: 'numeric',
            month: 'long',
          });
        }
        this.trainingsDoneLast7Days = !this.completedTrainingLast7Days.every((item) => item.value === 0)
        this.completedTrainingsTypes = [...this.completedTrainingsTypes];
        this.completedTrainingLast7Days = [...this.completedTrainingLast7Days];
        this.spinnerOn = false;
      }
    });
  }
}
