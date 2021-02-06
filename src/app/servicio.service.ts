import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cuenta } from "./cuenta"
import { environment } from "../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class CuentasService {
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  getCuentass() {
    return this.http.get(`${this.baseUrl}/getAll.php`);
  }

  getCuentas(id: string | number) {
    return this.http.get(`${this.baseUrl}/get.php?idCuenta=${id}`);
  }

  addCuentas(cuentas: Cuenta) {
    return this.http.post(`${this.baseUrl}/post.php`, cuentas);
  }

  deleteCuentas(cuentas: Cuenta) {
    return this.http.delete(`${this.baseUrl}/delete.php?idCuentas=${cuentas.id}`);
  }

  updateCuentas(cuentas: Cuenta) {
    return this.http.put(`${this.baseUrl}/update.php`, cuentas);
  }
}
