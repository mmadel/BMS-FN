import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, tap } from 'rxjs';
import { ReferringProvider } from '../../model/clinical/referring.provider';
import { ListTemplate } from '../../model/template/list.template';
import { Role } from '../../secuirty/model/roles';
import { ReferringProviderService } from '../service/referring-provider.service';
@Component({
  selector: 'app-referring-provider-list',
  templateUrl: './referring-provider-list.component.html',
  styleUrls: ['./referring-provider-list.component.scss']
})
export class ReferringProviderListComponent extends ListTemplate implements OnInit {
  componentRole: string[] = [Role.PROVIDER_ROLE, Role.REFERRING_PROVIDER_ROLE];
  referringProviderCreationVisibility: boolean
  referringProviders$!: Observable<ReferringProvider[]>;
  columns = [
    {
      key: 'firstName',
    },
    {
      key: 'lastName',
    },
    {
      key: 'npi',
    },
    {
      key: 'actions',
      _style: { width: '1%' },
      label: '',
      filter: false,
      sorter: false
    },
  ];

  details_visible = Object.create({});

  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }
  constructor(private referringProviderService: ReferringProviderService, private toastr: ToastrService) { super(); }

  ngOnInit(): void {
    this.initListComponent();
    this.find()
  }
  toggleReferringProviderCreation() {
    this.referringProviderCreationVisibility = !this.referringProviderCreationVisibility;
  }
  changeVisibility(event: any) {
    if (event === 'close')
      this.referringProviderCreationVisibility = false;
    this.find();
  }
  remove(item: any) {
    this.referringProviderService.delete(item.id).subscribe(result=>{
      this.toastr.success('Referring provider deleted')
      this.find()
    },error=>{
      this.toastr.error('Error during delete referring provider')
    })
  }
  edit(item: any) {

  }
  find() {
    this.referringProviders$ = this.referringProviderService.findAll(this.apiParams$).pipe(
      tap((response: any) => {
        this.totalItems$.next(response.number_of_matching_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        return response.records;
      })
    );
  }
}
