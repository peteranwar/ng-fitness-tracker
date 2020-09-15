import { Store } from '@ngrx/store';
import { UiService } from './../../shared/ui.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
 import { Subscription, Observable } from 'rxjs'
import { AuthService } from './../auth.service';

import * as fromRoot from '../../app.reducer'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
 maxDate;
 isLoading$: Observable<boolean>;

  constructor(private authService: AuthService,
    private uiService: UiService,
    private store: Store<{ui: fromRoot.State}>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }
  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });

    
  }
  

}