import { Component, Input } from '@angular/core';
import { SharingDataService } from '../../services/sharing-data.service';
import { Credito } from '../../models/credito';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creditos-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './creditos-form.component.html'
})
export class CreditosFormComponent {

  @Input() credito: Credito;

  constructor(private sharingData: SharingDataService,
    private router: Router){
    if(this.router.getCurrentNavigation()?.extras.state){
        this.credito = this.router.getCurrentNavigation()?.extras.state!['credito'];
    
        }else{
        this.credito = new Credito();
    
        }
  }

  onSubmit(userForm: NgForm):void{
    if(userForm.valid){
      this.sharingData.newCreditEventEmitter.emit(this.credito);
      console.log(this.credito);
    }
    userForm.resetForm();
    userForm.reset();
  }

  onClear(userForm: NgForm):void{
    this.credito = new Credito();
    userForm.resetForm();
    userForm.reset();
  }

}
