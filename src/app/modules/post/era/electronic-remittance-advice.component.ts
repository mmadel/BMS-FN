import { Component, OnInit } from '@angular/core';
import usersData from './_eraData';

@Component({
  selector: 'app-electronic-remittance-advice',
  templateUrl: './electronic-remittance-advice.component.html',
  styleUrls: ['./electronic-remittance-advice.component.scss']
})
export class ElectronicRemittanceAdviceComponent implements OnInit {
  usersData = usersData;
  eraLinesVisibality: boolean = false;
  columns = [
    { key: 'status', _style: { width: '15%' } },
    'date',
    'payername',
    'Lines',
    'unappliedLines',
    'paymentAmount',
    {
      key: 'open',
      label: 'Open',
    },
    {
      key: 'archive',
      label: 'Archive',
    }
  ];
  getBadge(status: string) {
    switch (status) {
      case 'new':
        return 'success';
      case 'flag':
        return 'secondary';
      default:
        return 'success';
    }
  }
  constructor() { }

  clickOpenERA() {
    this.eraLinesVisibality = true;
  }
  handleERALinesVisibleChange(event: boolean) {
    this.eraLinesVisibality = event;
  }

  toggleERALines() {
    this.eraLinesVisibality = !this.eraLinesVisibality;
  }
  apply(){
    this.eraLinesVisibality = !this.eraLinesVisibality;
  }
  ngOnInit(): void {
  }

}
