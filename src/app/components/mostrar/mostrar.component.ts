import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteModel } from 'src/app/models/cliente.model';
import { AuthService } from 'src/app/services/auth.service';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {
  
  cliente: ClienteModel = new ClienteModel;

  constructor( private AuthService: AuthService, 
    private route: ActivatedRoute  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('ids');

    if ( id !== id ) {

      this.AuthService.getClient( id )
        .subscribe( (resp: ClienteModel) => {
          this.cliente = resp;
          this.cliente.ids = id;
        });

    }
  }

}
