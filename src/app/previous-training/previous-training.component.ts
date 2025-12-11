import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-previous-training',
  templateUrl: './previous-training.component.html',
  styleUrl: './previous-training.component.css'
})
export class PreviousTrainingComponent {
  @Input() completedExercise!: any;
  @Output() deleted = new EventEmitter<void>();

  deleteExerciseHandler() {
    this.deleted.emit();
  }
}
