import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Provider } from '../../model/clinical/provider/provider';
import { ProviderService } from '../service/provider.service';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.scss']
})
export class CreateProviderComponent implements OnInit {
  notValidForm: boolean = false
  @ViewChild('providerCreateForm') providerCreateForm: NgForm;
  @Output() changeVisibility = new EventEmitter<string>()
  provider: Provider = {
    providerInfo: {},
    address: {}
  }
  constructor(private providerService: ProviderService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  create() {
    if (this.providerCreateForm.valid) {
      this.providerService.create(this.provider)
        .subscribe((result) => {
          this.toastr.success("Provider Created")
          this.changeVisibility.emit('close');
          this.notValidForm = false;
        }, (error) => {
          this.toastr.error("Error in  Provider Creation")
        })
    } else {
      this.notValidForm = true;
    }
  }
}
