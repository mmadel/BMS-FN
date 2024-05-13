import { Component, OnInit } from '@angular/core';
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
  componentScopes: string[] = [Role.PROVIDER_ROLE , Role.REFERRING_PROVIDER_ROLE ];
  constructor(private referringProviderService: ReferringProviderService) { super(); }

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
