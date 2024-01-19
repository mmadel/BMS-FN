import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Payer } from 'src/app/modules/model/admin/payer';
import { States } from 'src/app/modules/model/lookups/state-data-store';
import { PayerService } from '../../service/payer.service';

@Component({
  selector: 'sim-add-payer',
  templateUrl: './add-payer.component.html',
  styleUrls: ['./add-payer.component.scss']
})
export class AddPayerComponent implements OnInit {
  states: string[] = States;
  payer: Payer = {
    address: {

    }
  };
  @ViewChild('payerCreateForm') payerCreateForm: NgForm;
  @Output() changeVisibility = new EventEmitter<string>()
  isValid: boolean = true;
  constructor(private payerService: PayerService) { }

  ngOnInit(): void {
  }
  create() {
    if (this.payerCreateForm.valid) {
      this.isValid = true;
      this.payerService.create(this.payer)
        .subscribe((result) => {
          this.changeVisibility.emit('close');
        })
    } else {
      this.isValid = false;
    }
  }

}
