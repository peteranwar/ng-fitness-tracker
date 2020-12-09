import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import 'rxjs/add/operator/take';

import { take } from 'rxjs/operators'
import { TrainingService } from './../training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';



@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {
 progress = 0;
 timer: any;

  constructor(private dialog: MatDialog,
             private trainingServise: TrainingService,
            private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
   this.startOrResumeTimer();
  }

  startOrResumeTimer(): void {
    this.store.select(fromTraining.getActiveTraining)
    .pipe(take(1)).subscribe((ex: any) => {

      const step = ex.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          clearInterval(this.timer);
          this.trainingServise.completeExercise();
        }
     }, step);
    });
  }

  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.trainingServise.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    })
  }
}
