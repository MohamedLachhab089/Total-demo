import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {AppStateService} from "./app-state.service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private appState: AppStateService) {
  }

  async login(username: string, password: string) {
    let user: any = await firstValueFrom(this.http.get("http://localhost:8088/users/" + username));
    /*console.log(password);
    console.log(user.password)
    console.log(atob(user.password))*/
    if (password == atob(user.password)) {
      let decodeJwt: any = jwtDecode(user.token)
      this.appState.setAuthState({
        isAuthenticated: true,
        username: username,
        roles: decodeJwt.roles,
        token: user.token
      })
      return Promise.resolve(true);
    } else {
      return Promise.reject("Bad credentials");
    }
  }

}
