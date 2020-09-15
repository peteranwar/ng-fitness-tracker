import { Injectable } from '@angular/core';

import 'rxjs/add/operator/take';

import { CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    CanLoad,
    Route } 
from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate,
 CanLoad {
    
constructor(private store: Store<fromRoot.State>) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromRoot.getIsAuth).take(1);
    };

    canLoad(route: Route) {
        return this.store.select(fromRoot.getIsAuth).take(1);
    }
}