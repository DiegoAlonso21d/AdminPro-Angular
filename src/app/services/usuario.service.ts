import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form-interface';
import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form-interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario-model';

declare const google: any;
declare const gapi: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario: Usuario | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

    get token():string{
      return localStorage.getItem("token")||"";
    }


    get uid():string{
      return this.usuario?.uid || "";
    }


  logout() {
    localStorage.removeItem('token');

    google.accounts.id.revoke('diegoalonso_21d@hotmail.com', () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean> {
    

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
        
          const { email, google, nombre, role, img="", uid } = resp.usuario;

          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
          this.usuario.imprimirUsuario();
          localStorage.setItem('token', resp.token);
          return true;
        }),
       
        catchError((error) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  actualizarPerfil(data:{email:string,nombre:string,role:string,password:string}){

    data={
      ...data,
      role:this.usuario?.role || "",
      password:this.usuario?.password ||"123"
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
        headers: {
          'x-token': this.token
        }
      });
  }

  logearse(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        console.log(resp);
        localStorage.setItem('token', resp.token);
      })
    );
  }
}
