import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { ReferringProvider } from 'src/app/modules/model/clinical/referring.provider';
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
  referringProvider:ReferringProvider;
  npiReferringProviderCtrl = new FormControl();
  isLoading = false;
  constructor(private referringProviderService: ReferringProviderService
    , private providerService: ProviderService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
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
    this.referringProviderService.create(this.referringProvider)
      .subscribe((result) => {
        this.toastr.success("Referring Provider Created")
      }, (error) => {
        this.toastr.error("Error in Referring Provider Creation")
      })
    this.changeVisibility.emit('close');
  }
  resetError() {
  }
  private initModel() {
    this.referringProvider = {
      npi:null
    }
  }
}
