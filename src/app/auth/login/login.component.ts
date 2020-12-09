import { Observable } from 'rxjs';
import { UiService } from './../../shared/ui.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './../auth.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 loginForm: FormGroup;
 isLoading$: Observable<boolean>;

  constructor(private authServise: AuthService,
    private uiServise: UiService,
              private store: Store<{ui: fromRoot.State}>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: Validators.required})
    });
  }

  onSubmit(form): void {
    // console.log(form)
    this.authServise.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }


}
