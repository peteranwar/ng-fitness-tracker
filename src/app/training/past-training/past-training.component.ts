import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TrainingService } from './../training.service';
import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import {Exercise} from './../exercise.model';
import { MatPaginator } from '@angular/material/paginator';

import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer'

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private trainingServise: TrainingService,
             private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
   this.store.select(fromTraining.getFinishedExercises)
    .subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    })
    this.trainingServise.fetchCompletedOrCancelledExercises();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
