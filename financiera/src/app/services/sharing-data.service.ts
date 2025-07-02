import { EventEmitter, Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Usuario } from '../models/usuario';
import { Credito } from '../models/credito';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {


    private _newClientEventEmitter: EventEmitter<Cliente>= new EventEmitter();
  
    private _idClientEventEmitter = new EventEmitter();




    private _newUserEventEmitter: EventEmitter<Usuario>= new EventEmitter();
  
    private _idUserEventEmitter = new EventEmitter();
  



    private _newCreditEventEmitter: EventEmitter<Credito>= new EventEmitter();

    private _idCreditEventEmitter= new EventEmitter();



  

  constructor() { }

  get newClientEventEmitter(): EventEmitter<Cliente>{
    return this._newClientEventEmitter;
  }
  get idClientEventEmitter(): EventEmitter<number>{
    return this._idClientEventEmitter;
  }
 

  


  get newUserEventEmitter():EventEmitter<Usuario>{
    return this._newUserEventEmitter;
  }
  get idUserEventEmitter(): EventEmitter<number>{
    return this._idUserEventEmitter;
  }
  






  get newCreditEventEmitter(): EventEmitter<Credito>{
    return this._newCreditEventEmitter;
  }
  get idCreditEventEmitter(): EventEmitter<number>{
    return this._idCreditEventEmitter;
  }
 
}
