import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/take';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { Exercise } from './exercise.model';
import { UiService } from '../shared/ui.service';

import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

@Injectable()
export class TrainingService {
  private firebaseSubscription: Subscription[] = [];
  exercises: Observable<Exercise[]>;
  Exercise: any;
  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.firebaseSubscription.push(
      this.db
        .collection('availableExercise')
        .snapshotChanges()
         .map(docArray => {
          // throw(new Error());
          return docArray.map(doc => {
            return {
            //   data: doc.payload.doc.data() as Exercise,
              id: doc.payload.doc.id,
              ...doc.payload.doc.data() as Exercise
            //   name: doc.payload.doc.data().name,
            //   duration: doc.payload.doc.data().duration,
            //   calories: doc.payload.doc.data().calories,
            
            };
          });
        })
         
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableTraining(exercises));
          },
          (error) => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackBar(
              'Fetching Exercises failed, please try again later',
              null,
              4000
            );
          }
        )
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1))
      .subscribe((ex: any)  => {
        this.addDataToDatabase({
          ...ex as unknown as Exercise ,
          date: new Date(),
          state:'completed'
        });
        this.store.dispatch(new Training.StopTraining());
      });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1))
      .subscribe(ex => {
        this.addDataToDatabase({
          // ex as Exercise,
          ...ex as unknown as Exercise,
          // duration: ex.duration * (progress / 100),
          // calories: ex.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled'
        });
        this.store.dispatch(new Training.StopTraining());
      });
  }

  fetchCompletedOrCancelledExercises() {
    this.firebaseSubscription.push(
      this.db
        .collection('finishExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetFinishedTraining(exercises));
        })
    );
  }

  cancelSubscription() {
    this.firebaseSubscription.forEach((sub) => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishExercises').add(exercise);
  }
}
