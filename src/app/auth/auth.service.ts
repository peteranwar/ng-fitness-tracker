import { TrainingService } from './../training/training.service';
import { UiService } from '../shared/ui.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

import * as Auth from './auth.actions';

@Injectable()
export class AuthService {
  // authChange = new Subject<boolean>();
  // private isAuthenticated = false;

  constructor(
     private router: Router,
     private afauth: AngularFireAuth,
     private trainindService: TrainingService,
     private uiService: UiService,
     private store: Store<fromRoot.State>) {}


   initAuthListener(): void {
     this.afauth.authState.subscribe(user => {
       if (user) {
         this.store.dispatch(new Auth.SetAuthenticated());
        // this.isAuthenticated = true;
        // this.authChange.next(true);
         this.router.navigate(['/training']);
       } else {
        this.trainindService.cancelSubscription();
        this.store.dispatch(new Auth.SetUnauthenticated());
        // this.authChange.next(false);
        // this.isAuthenticated = false;
        this.router.navigate(['/login']);
       }
     })
   }

  registerUser(authData: AuthData): void {
    // this.uiService.loadingStateChnged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afauth.auth.createUserWithEmailAndPassword(authData.email,
      authData.password)
      .then(result => {
        //  this.uiService.loadingStateChnged.next(false);
         this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // this.uiService.loadingStateChnged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(error.message, null, 4000)

      });
  }

  login(authData: AuthData): void {
    // this.uiService.loadingStateChnged.next(true);
    this.store.dispatch(new UI.StartLoading());

    this.afauth.auth.signInWithEmailAndPassword(authData.email,
      authData.password)
      .then(result => {
        // this.uiService.loadingStateChnged.next(false);
        this.store.dispatch(new UI.StopLoading());

      })
      .catch(error => {
        // this.uiService.loadingStateChnged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(error.message, null, 4000)
      });
  }

  logout(): void {
    this.afauth.auth.signOut();
  }


  // isAuth () {
  //     return this.isAuthenticated;
  // }


}
