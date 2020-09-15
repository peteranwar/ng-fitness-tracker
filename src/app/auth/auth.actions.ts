import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] set Unauthenticated';



export class SetAuthenticated implements Action {
    readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}


export type AuthActions = SetAuthenticated | SetUnauthenticated;