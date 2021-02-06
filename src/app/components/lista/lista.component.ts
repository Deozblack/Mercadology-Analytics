import { Component, OnInit } from '@angular/core';
import { CuentasService } from "../../servicio.service";
import { Cuenta } from "../../cuenta"
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from "../dialogo/dialogo.component"
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  public cuenta: Cuenta[] = [
    new Cuenta("Maggie", "Chihuahua", 20)
  ];

  constructor(private CuentasService: CuentasService, private dialogo: MatDialog, private snackBar: MatSnackBar) { }

  eliminarCuenta(Cuenta: Cuenta) {
    this.dialogo
      .open(DialogoComponent, {
        data: `¿Realmente quieres eliminar a ${cuenta.nombre}?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (!confirmado) return;
        this.CuentasService
          .deleteCuentas(Cuenta)
          .subscribe(() => {
            this.obtenerCuentas();
            this.snackBar.open('Cuenta eliminada', undefined, {
              duration: 1500,
            });
          });
      })
  }

  ngOnInit() {
    this.obtenerCuentas();
  }

  obtenerCuentas() {
    return this.CuentasService
      .getCuentass()
      .subscribe((cuentas: Cuenta[]) => this.cuenta = cuentas);
  }

}
