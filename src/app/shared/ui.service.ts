import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UiService  {

    constructor(private snackBar: MatSnackBar) { }

    showSnackBar(message :any, action: any, duration: any) {
        this.snackBar.open(message, action, {
            duration: duration
        });
    }
}