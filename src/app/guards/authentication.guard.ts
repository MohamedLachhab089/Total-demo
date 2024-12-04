import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AppStateService} from "../services/app-state.service";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const appState = inject(AppStateService);
  const router = inject(Router);

  if (appState.authState.isAuthenticated) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }

};
