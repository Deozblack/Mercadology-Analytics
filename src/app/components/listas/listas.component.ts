import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListasDataSource, ListasItem } from './listas-datasource';
import { CuentasService } from "../../servicio.service"
import { Cuenta } from "../../cuenta"
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from "../dialogo/dialogo.component"
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements AfterViewInit, OnInit {
  public Cuentas: Cuenta[] = [
    new Cuenta("Maggie", "Chihuahua", 20)
  ];
  constructor(private CuentasService: CuentasService, private dialogo: MatDialog, private snackBar: MatSnackBar) { }

   eliminarCuenta(Cuenta: Cuenta) {
    this.dialogo
      .open(DialogoComponent, {
        data: `¿Realmente quieres eliminar a ${Cuenta.nombre}?`
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ListasItem>;
  dataSource: ListasDataSource;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new ListasDataSource();
     this.obtenerCuentas();
  }
  obtenerCuentas() {
    return this.CuentasService
      .getCuentass()
      .subscribe((Cuentas: Cuenta[]) => this.Cuentas = Cuentas);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
