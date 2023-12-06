import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Clinic } from 'src/app/modules/model/admin/clinic';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { ClinicService } from '../../services/clinic.service';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss']
})
export class ClinicsComponent extends ListTemplate implements OnInit {
  clinics$!: Observable<Clinic[]>;
  columns = [
    {
      key: 'title',
      label: 'Clinic Title',
      _style: { width: '10%' }
    },
    { key: 'clinicdata', label: 'Address', _style: { width: '10%' } },
    { key: 'actions', _style: { width: '5%' } }
  ];
  constructor(private clinicService: ClinicService) { super() }

  ngOnInit(): void {
    this.initListComponent();
    this.find();
  }

  public find() {
    this.clinics$ = this.clinicService.findAll(this.apiParams$).pipe(
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
    )
  }
  remove(item: any) {

  }
  edit(item: any) {

  }
}
