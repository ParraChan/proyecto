import { EventEmitter, Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {


    private _newClientEventEmitter: EventEmitter<Cliente>= new EventEmitter();
  
    private _idClientEventEmitter = new EventEmitter();

    private _selectedClientEventEmitter = new EventEmitter();

  

  constructor() { }

  get newClientEventEmitter(): EventEmitter<Cliente>{
    return this._newClientEventEmitter;
  }
  get idClientEventEmitter(): EventEmitter<number>{
    return this._idClientEventEmitter;
  }
  get selectedClientEventEmitter(): EventEmitter<Cliente>{
    return this._selectedClientEventEmitter;
  }
}
