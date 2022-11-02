import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

import { delay, map } from 'rxjs/operators';
import { Hospital } from '../models/hospital-model';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  cargarHospitales() {
    //  http://localhost:3000/api/usuarios?desde=3

    const url = `${base_url}/hospitales`;

    return this.http
      .get(url, this.headers)
      .pipe(map((resp: any) => resp.hospitales));
  }

  crearHospital(nombre: string) {
    //  http://localhost:3000/api/usuarios?desde=3

    const url = `${base_url}/hospitales`;

    return this.http.post(url, { nombre }, this.headers);
  }

  actualizarHospital(_id: string, nombre: string) {
    const url = `${base_url}/hospitales/${_id}`;

    return this.http.put(url, { nombre }, this.headers);
  }

  borrarHospital(_id: string) {
    const url = `${base_url}/hospitales/${_id}`;

    return this.http.delete(url, this.headers);
  }
}
