import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { PayerService } from '../../admin.tools/services/payer/payer.service';
import { Payer } from '../../model/admin/payer';
import { Provider } from '../../model/clinical/provider/provider';
import { ReferringProviderIdQualifier } from '../../model/enum/referring.provider.id.qualifier';
import { Role } from '../../secuirty/model/roles';
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
  payerNameList: string[];
  payerIdList: string[];
  selectedPayerName: string;
  selectedPayerId: string
  payers: Payer[]
  @Input() selectedProvider: Provider;
  componentRole: string[] = [Role.PROVIDER_ROLE, Role.SOLID_PROVIDER_ROLE];
  constructor(private providerService: ProviderService
    , private toastr: ToastrService
    , private payerService: PayerService) { }


  ngOnInit(): void {
    if (this.selectedProvider)
      this.fill();
    else
      this.initModel();
    this.payerService.findAll()
      .subscribe((result: any) => {
        this.payers = result;
        this.payerNameList = this.payers.map(a => a.displayName);
        this.payerIdList = this.payers
          .filter(a => a.payerId !== undefined)
          .map(a => a.payerId + '')
      })
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
        this.provider.legacyID = {
          providerIdQualifier: null
        }
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
          this.changeVisibility.emit('create');
          this.providerCreateForm.reset();
          this.notValidForm = !this.notValidForm;
        }, (error) => {
          this.toastr.error("Error in  Provider Creation")
        })
    } else {
      this.notValidForm = true;
    }
  }
  update() {
    if (this.providerCreateForm.valid) {
      this.providerService.update(this.provider).subscribe(result => {
        this.toastr.success("Provider updated")
        this.changeVisibility.emit('update');
        this.providerCreateForm.reset();
        this.notValidForm = !this.notValidForm;
      }, error => {
        this.toastr.error("Error during update provider")
      })
    }
    else {
      this.notValidForm = true;
    }

  }
  private fill() {
    this.npiCtrl.setValue(this.selectedProvider.npi)
    this.provider = this.selectedProvider
  }
  private initModel() {
    this.provider = {
      npi: null,
      providerInfo: {},
      address: {},
      legacyID: {
        providerIdQualifier: null
      }
    }
  }
  pickPayerName(event: any) {

    this.payers.forEach(element => {
      if (element.displayName === event) {
        this.selectedPayerId = element.payerId + '';
        this.provider.legacyID.payerName = element.displayName;
      }

    });
  }
  unpickPayerName() {
    this.selectedPayerId = undefined;
  }
  pickPayerId(event: any) {
    this.payers.forEach(element => {
      if (element.payerId + '' === event) {
        this.selectedPayerName = element.displayName
        this.provider.legacyID.payerName = element.displayName;
      }
    });
  }
  unpickPayerId() {
    this.selectedPayerName = undefined
  }
}
