import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AppStateService} from "./app-state.service";
import {finalize} from "rxjs";
import {LoadingService} from "./loading.service";

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {

  const appState = inject(AppStateService);
  const ls: LoadingService = inject(LoadingService);

  // 1️⃣ first solution
  /*appState.setProductState({
    status: "LOADING"
  })*/

  // 2️⃣ second solution
  ls.showLoadingSpinner()

  let request = req.clone({
    headers: req.headers.set('Authorization', 'Bearer token')
  })
  return next(request).pipe(
    finalize(() => {
      // 1️⃣
      /*appState.setProductState({
        status: "LOADED"
      })*/

      // 2️⃣
      ls.hideLoadingSpinner()
    })
  );
};
