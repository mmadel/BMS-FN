import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { Provider } from '../../model/clinical/provider/provider';
import { ReferringProviderIdQualifier } from '../../model/enum/referring.provider.id.qualifier';
import { ProviderService } from '../service/provider.service';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.scss']
})
export class CreateProviderComponent implements OnInit {
  npiCtrl = new FormControl();
  isLoading = false;
  notValidForm: boolean = false
  npiNotFound: boolean = false
  @ViewChild('providerCreateForm') providerCreateForm: NgForm;
  @Output() changeVisibility = new EventEmitter<string>()
  provider: Provider;
  idQualifierKeys = Object.keys;
  idQualifiers = ReferringProviderIdQualifier;
  constructor(private providerService: ProviderService
    , private toastr: ToastrService) { }


  ngOnInit(): void {
    this.initModel();
    this.npiCtrl.valueChanges
      .pipe(
        filter(text => {
          if (!Number(text)) {
            return false;
          }
          if (text === undefined) {

          }
          if (text.length > 1) {
            return true
          } else {
            this.initModel();
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {
          this.initModel();
          this.isLoading = true;
        }),
        switchMap((value) => {
          return this.providerService.findProviderByNPI(value)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            )
        }
        )
      ).subscribe(data => {
        this.npiNotFound = false;
        this.provider = data;
        if (this.provider.npi === null) {
          this.initModel();
          this.npiNotFound = true;
        }
      },
        error => {
          this.isLoading = false
          this.initModel();
          this.npiNotFound = true;
        });
  }
  create() {
    if (this.providerCreateForm.valid) {
      this.providerService.create(this.provider)
        .subscribe((result) => {
          this.toastr.success("Provider Created")
          this.changeVisibility.emit('close');
          this.providerCreateForm.reset();
          this.notValidForm = false;
        }, (error) => {
          this.toastr.error("Error in  Provider Creation")
        })
    } else {
      this.notValidForm = true;
    }
  }
  private initModel() {
    this.provider = {
      npi:null,
      providerInfo: {},
      address: {},
      legacyID:{
        providerIdQualifier:null
      }
    }
  }
}
