import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { ReferringProvider } from 'src/app/modules/model/clinical/referring.provider';
import { ReferringProviderIdQualifier } from 'src/app/modules/model/enum/referring.provider.id.qualifier';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { ProviderService } from '../../service/provider.service';
import { ReferringProviderService } from '../../service/referring-provider.service';

@Component({
  selector: 'app-referring-provider-create',
  templateUrl: './referring-provider-create.component.html',
  styleUrls: ['./referring-provider-create.component.scss']
})
export class ReferringProviderCreateComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  npiNotFound: boolean = false
  referringProvider: ReferringProvider;
  npiReferringProviderCtrl = new FormControl();
  isLoading = false;
  idQualifierKeys = Object.keys;
  idQualifiers = ReferringProviderIdQualifier;
  @Input() selectedReferringProvider: ReferringProvider;
  componentRole: string[] = [Role.PROVIDER_ROLE, Role.REFERRING_PROVIDER_ROLE];
  providerNPIError: string = ''
  constructor(private referringProviderService: ReferringProviderService
    , private providerService: ProviderService
    , private toastr: ToastrService) { }

  ngOnInit(): void {

    if (this.selectedReferringProvider)
      this.fill()
    else
      this.initModel();
    this.npiReferringProviderCtrl.valueChanges
      .pipe(
        filter(text => {
          if (!Number(text)) {
            return false;
          }
          if (text === undefined) {
            return false;
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
        this.referringProvider = data;
        this.referringProvider.referringProviderIdQualifier = null;
        if (this.referringProvider.npi === null) {
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
    if (this.selectedReferringProvider) {
      this.referringProviderService.update(this.referringProvider).subscribe(result => {
        this.toastr.success("Referring Provider Created")
        this.changeVisibility.emit('update');
      }, error => {
        this.toastr.error("Error during update referring provider")
      })
    } else {
      this.referringProviderService.create(this.referringProvider)
        .subscribe((result) => {
          this.toastr.success("Referring Provider Created")
        }, (error) => {
          this.toastr.error("Error in Referring Provider Creation")
        })
      this.changeVisibility.emit('create');
    }
  }
  resetError() {
  }
  private initModel() {
    this.referringProvider = {
      npi: null,
      referringProviderIdQualifier: null
    }
  }
  private fill() {
    this.referringProvider = this.selectedReferringProvider;
    this.npiReferringProviderCtrl.setValue(this.referringProvider.npi)
  }
  npiSearch() {
    if (this.referringProvider.npi === undefined || this.referringProvider.npi === '' || this.referringProvider.npi === null) {
      this.providerNPIError = 'Please type provider npi';
      return;
    } else
      this.providerNPIError = ''

    if (this.referringProvider.npi.length !== 10) {
      this.providerNPIError = 'Please type provider npi as 10 character ';
      return;
    } else
      this.providerNPIError = ''

    if (this.providerNPIError === '')
      this.providerService.findProviderByNPI(Number(this.referringProvider.npi)).subscribe(data => {
        this.npiNotFound = false;
        this.referringProvider = data;
      })
  }
}
