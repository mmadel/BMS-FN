import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ERADetails } from '../../model/invoice/era/era.details';
import { ERAModel } from '../../model/invoice/era/era.model';
import { ListTemplate } from '../../model/template/list.template';
import { EraService } from '../service/era/era.service';

@Component({
  selector: 'app-electronic-remittance-advice',
  templateUrl: './electronic-remittance-advice.component.html',
  styleUrls: ['./electronic-remittance-advice.component.scss']
})
export class ElectronicRemittanceAdviceComponent extends ListTemplate implements OnInit {
  selectedERAModel : ERAModel;
  earList$!: Observable<ERAModel[]>;
  openERAVisibility: boolean = false;
  columns = [
    {
      key: 'seen',
      label: '',
    },
    {
      key: 'receivedDate',
      label: 'Receive Date',
    },
    {
      key: 'payerName',
      label: 'Payer',
    },
    {
      key: 'lines',
      label: 'Lines',
    },
    {
      key:'unapplied',
      label: 'Unapplied',
    },
    {
      label: 'paid',
      key: 'paidAmount',
    },
    { key: 'actions', _style: { width: '5%' } }
  ];

  constructor(private eraService: EraService) { super() }
  ngOnInit(): void {
    this.find();
    this.initListComponent();
  }

  open(item: any) {
    this.selectedERAModel= item;
    this.openERAVisibility = true;
  }
  archive(item: any) {
    
  }
  private find() {
    this.earList$ = this.eraService.findAll(this.apiParams$).pipe(
      tap((response: any) => {
        this.totalItems$.next(response.number_of_records);
        if (response.number_of_matching_records) {
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
  toggleOpenERA() {
    this.openERAVisibility = !this.openERAVisibility
  }
  changeOpenERAVisibility(event:any){
    if (event === 'close') {
      this.openERAVisibility = false;
      this.find();
    }
  }
}
