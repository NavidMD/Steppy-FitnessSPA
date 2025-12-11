import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-start-modal',
  templateUrl: './start-modal.component.html',
  styleUrl: './start-modal.component.css'
})

export class StartModalComponent implements OnInit{
  constructor(public dialogRef: MatDialogRef<StartModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string, sets: number, reps: number }) { }
  timer: any;
  mainCountDown: number = 10;
  started:boolean = false;

  closeDialog(message: string) {
    if(message === 'cancel') this.dialogRef.close(message);
    if(message === 'start') {
      clearInterval(this.timer);
      this.started = true;
      this.mainCountDown = 3;
      this.timer = setInterval(() => {
        this.mainCountDown--;
        if(this.mainCountDown === 0) this.dialogRef.close(message);
      },1000)
    }
   }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.mainCountDown--;
      if(this.mainCountDown <= 0) {
        clearInterval(this.timer);
        this.closeDialog('cancel');
      }
    },1000)
  }
}
