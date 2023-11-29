import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Provider } from '../../model/clinical/provider/provider';
import { ListTemplate } from '../../model/template/list.template';
import usersData from '../../patient/list/_data';
import { ProviderService } from '../service/provider.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends ListTemplate implements OnInit {
  usersData = usersData;
  providers$!: Observable<Provider[]>;
  addVisibility: boolean = false
  columns = [
    {
      key: 'id',
      _style: { width: '5%' }
    },
    {
      key: 'name',
      _style: { width: '50%' }
    },
    {
      key: 'Prof Abbrv',
      _style: { width: '50%' }
    },
    {
      key: 'actions',
      _style: { width: '5%' }
    }
  ]
  constructor(private providerService: ProviderService) { super(); }

  ngOnInit(): void {
    this.initListComponent();
    this.find();
  }
  toggleAddProvider() {
    this.addVisibility = !this.addVisibility
  }
  change(event: any) {
    if (event === 'close') {
      this.find();
      this.addVisibility = false;
    }
  }
  find() {
    this.providers$ = this.providerService.findAll(this.apiParams$).pipe(
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
  remove(event: any) {

  }
  edit(event: any) {

  }
}
