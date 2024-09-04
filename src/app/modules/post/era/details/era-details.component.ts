import { Component, Input, OnInit } from '@angular/core';
import { ERADetails } from 'src/app/modules/model/invoice/era/era.details';
import { ERADetailsLine } from 'src/app/modules/model/invoice/era/era.details.line';

@Component({
  selector: 'era-details',
  templateUrl: './era-details.component.html',
  styleUrls: ['./era-details.component.scss']
})
export class EraDetailsComponent implements OnInit {
  @Input() details: ERADetails
  lines : ERADetailsLine[];
  columns = [
    {
      key: 'dos',
      label: 'DOS',
    },
    {
      key: 'cptCode',
      label: 'CPT',
    },
    {
      key: 'units',
      label: 'units',
    },
    {
      key: 'billAmount',
      label: 'Billed',
      _style: { width: '7%' }
    },
    {
      key: 'adjustAmount',
      label: 'adjust',
    },
    {
      key: 'deductAmount',
      label: 'adjust',
    },
    {
      key: 'coInsuranceAmount',
      label: 'COIN',
    },
    {
      key: 'coPaymentAmount',
      label: 'CPPAY',
    },
    {
      key: 'paidAmount',
      label: 'Paid',
      _style: { width: '7%' }
    },
    {
      key: 'actions',
      label: 'actions',
    },
  ]
  constructor() { 
  }

  ngOnInit(): void {
    this.lines = this.details.lines
  }
  convertDOS(strValue: string):string {
    const year = parseInt(strValue.substring(0, 4), 10);
    const month = parseInt(strValue.substring(4, 6), 10)
    const day = parseInt(strValue.substring(6, 8), 10);
    // Create a Date object
    const date = new Date(year, month, day);

    // Format the date as MM/DD/YYYY
    const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    return formattedDate;
  }

  onSelectedItemsChange(event:any){
    console.log(JSON.stringify(event))
  }
}
