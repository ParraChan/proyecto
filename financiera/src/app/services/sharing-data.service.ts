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

    private _findClientByIdEventEmitter = new EventEmitter();

    private _selectClientEventEmitter = new EventEmitter();

    private _errorsClientFormEventEmitter= new EventEmitter();





    private _newUserEventEmitter: EventEmitter<Usuario>= new EventEmitter();
  
    private _idUserEventEmitter = new EventEmitter();

    private _findUserByIdEventEmitter = new EventEmitter();
    
    private _selectUserEventEmitter = new EventEmitter();

    private _errorsUserFormEventEmitter= new EventEmitter();

    private _HandlerLoginEventEmitter = new EventEmitter();

  



    private _newCreditEventEmitter: EventEmitter<Credito>= new EventEmitter();

    private _idCreditEventEmitter= new EventEmitter();

    private _findCreditByIdEventEmitter = new EventEmitter();
    
    private _selectCreditEventEmitter = new EventEmitter();

    private _errorsCreditFormEventEmitter= new EventEmitter();




    private _findRolByIdEventEmitter = new EventEmitter();

    private _selectRolEventEmitter = new EventEmitter();
  

  constructor() { }

  get newClientEventEmitter(): EventEmitter<Cliente>{
    return this._newClientEventEmitter;
  }
  get idClientEventEmitter(): EventEmitter<number>{
    return this._idClientEventEmitter;
  }

  get  findClientByIdEventEmitter(){
    return this._findClientByIdEventEmitter;
  }

  get selectClientEventEmitter(){
    return this._selectClientEventEmitter;
  }

  get errorsClientFormEventEmitter(){
    return this._errorsClientFormEventEmitter;
  }

 

 

  


  get newUserEventEmitter():EventEmitter<Usuario>{
    return this._newUserEventEmitter;
  }
  get idUserEventEmitter(): EventEmitter<number>{
    return this._idUserEventEmitter;
  }
   get findUserByIdEventEmitter(){
    return this._findUserByIdEventEmitter;
  }
  get selectUserEventEmitter(){
    return this._selectUserEventEmitter;
  }
  get errorsUserFormEventEmitter(){
    return this._errorsUserFormEventEmitter;
  }

  get HandlerLoginEventEmitter(){
    return this._HandlerLoginEventEmitter;
  }
  





  get newCreditEventEmitter(): EventEmitter<Credito>{
    return this._newCreditEventEmitter;
  }
  get idCreditEventEmitter(): EventEmitter<number>{
    return this._idCreditEventEmitter;
  }
  get findCreditByIdEventEmitter(){
    return this._findCreditByIdEventEmitter;
  }
  get selectCreditEventEmitter(){
    return this._selectCreditEventEmitter;
  }
  get errorsCreditFormEventEmitter(){
    return this._errorsCreditFormEventEmitter;
  }




  get findRolByIdEventEmitter(){
    return this._findRolByIdEventEmitter;
  }

  get selectRolEventEmitter(){
    return this._selectRolEventEmitter;
  }
 
}
