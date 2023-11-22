import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ReferringProvider } from '../../model/clinical/referring.provider';
import { ListTemplate } from '../../model/template/list.template';
import usersData from '../../patient/list/_data';
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
      map((response: any) => {
        return response.records;
      })
    );
  }
}
