import {ActivatedRoute, CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AppStateService} from "../services/app-state.service";

export const authorizationGuard: CanActivateFn = (route, state) => {
  const appState = inject(AppStateService);
  const router = inject(Router);
  //return !!appState.authState.roles.includes("ADMIN");
  if (appState.authState.roles.includes(route.data['requiredRoles'])) {
    return true;
  } else {
    return router.createUrlTree(['/admin/notAuthorized']);
  }
};
