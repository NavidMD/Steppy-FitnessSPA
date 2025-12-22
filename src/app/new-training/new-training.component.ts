import { Component, Input, OnInit } from '@angular/core';
import { GetTrainingsService } from '../shared/services/getTrainings.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css'
})
export class NewTrainingComponent {
  @Input() addedExercise!: any;
  constructor(private trainingService: GetTrainingsService) {}

  delete() {
    this.trainingService.deleteNewTraining(this.addedExercise.id)
  }
}
