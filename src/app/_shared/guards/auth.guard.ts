import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { select, Store } from '@ngrx/store';

import { isLoggedIn } from "src/app/auth/store/auth.selectors";
import { State } from '../store';
import { authUser } from '../../auth/store/auth.selectors';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{

    private isUserAuth: boolean | undefined;

    constructor(private store: Store<State>)
    {
        this.store
            .pipe(select(isLoggedIn))
            .subscribe(loggedIn => this.isUserAuth = loggedIn)
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
    {
        return this.isUserAuth!;
    }

}
