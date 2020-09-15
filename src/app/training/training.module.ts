import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';

import { StopTrainingComponent } from './current/stop-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentComponent } from './current/current.component';

import { StoreModule } from '@ngrx/store'
import { trainingReducer } from './training.reducer'
@NgModule({
    declarations: [
      TrainingComponent,
      CurrentComponent,
      NewTrainingComponent,
      PastTrainingComponent,
      StopTrainingComponent
    ],
    imports: [
       SharedModule,
       TrainingRoutingModule,
       StoreModule.forFeature('training', trainingReducer )
    ],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}