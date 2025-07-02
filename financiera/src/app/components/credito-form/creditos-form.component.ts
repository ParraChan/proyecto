import { Component, Input, OnInit } from '@angular/core';
import { SharingDataService } from '../../services/sharing-data.service';
import { Credito } from '../../models/credito';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-creditos-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './creditos-form.component.html'
})
export class CreditosFormComponent implements OnInit {

  @Input() credito: Credito;

  constructor(private sharingData: SharingDataService,
    private route: ActivatedRoute,){
        this.credito = new Credito();


  }
  ngOnInit(): void {

    this.sharingData.selectCreditEventEmitter.subscribe(credito => this.credito = credito);

    this.route.paramMap.subscribe(params=>{
      const id : number = +(params.get('id') || '0');
      if(id>0){
      this.sharingData.findCreditByIdEventEmitter.emit(id);
    }
    })
    
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
