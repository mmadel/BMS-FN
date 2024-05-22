import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, tap } from 'rxjs';
import { Provider } from '../../model/clinical/provider/provider';
import { ListTemplate } from '../../model/template/list.template';
import { Role } from '../../secuirty/model/roles';
import { RoleScopeFinderService } from '../../secuirty/service/role-scope-finder.service';
import { ProviderService } from '../service/provider.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends ListTemplate implements OnInit {
  componentRole: string[] = [Role.PROVIDER_ROLE, Role.SOLID_PROVIDER_ROLE];
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
  constructor(private providerService: ProviderService, private roleScopeFinderService: RoleScopeFinderService, private toastr: ToastrService) { super(); }
  ngOnInit(): void {
    this.initListComponent();
    this.find();
    this.roleScopeFinderService.find().subscribe(result => {

    })
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
  remove(item: any) {
    this.providerService.delete(item.id).subscribe(result=>{
      this.toastr.success('provider deleted.')
    },error=>{
      this.toastr.error('error during deleting provider')
    })
    this.find();
  }
  edit(event: any) {

  }
}
