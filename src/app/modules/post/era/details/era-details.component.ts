import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ERAHistory } from 'src/app/modules/model/invoice/era/er.history';
import { ERADetails } from 'src/app/modules/model/invoice/era/era.details';
import { ERADetailsLine } from 'src/app/modules/model/invoice/era/era.details.line';
import { EraService } from '../../service/era/era.service';

@Component({
  selector: 'era-details',
  templateUrl: './era-details.component.html',
  styleUrls: ['./era-details.component.scss']
})
export class EraDetailsComponent implements OnInit {
  @Input() details: ERADetails
  @Output() changeVisibility = new EventEmitter<string>()
  lines: ERADetailsLine[];
  appliedLines: number[] = []
  actions: string[] = ["Close Session", "Send to insurance invoice Area", "Keep current status"];
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
      label: 'Billed'
    },
    {
      key: 'adjustAmount',
      label: 'adjust',
      _style: { width: '7%' }
    },
    {
      key: 'deductAmount',
      label: 'deduct',
    },
    {
      key: 'coInsuranceAmount',
      label: 'COIN',
    },
    {
      key: 'coPaymentAmount',
      label: 'COPAY',
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
  apply() {
    if (this.appliedLines.length !== 0) {
      var eraHistory: ERAHistory = {
        eraId: this.details.eraId,
        eraLines: this.appliedLines,
        isArchive: false
      }
      this.eraService.createERAHistory(eraHistory).subscribe(() => {
        this.toastr.success("ERA is updated successfully")
        this.changeVisibility.emit('close');
      },error=>{
        this.toastr.error("error during update ERA")
      })
    } else {
      this.toastr.error("Select at least one line")
    }
  }
  constructor(private eraService: EraService,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.details.lines.forEach(line => {
      line.editadjustAmount = line.adjustAmount
      line.editpaidAmount = line.paidAmount
    })
    this.lines = this.details.lines
  }
  convertDOS(strValue: string): string {
    const year = parseInt(strValue.substring(0, 4), 10);
    const month = parseInt(strValue.substring(4, 6), 10)
    const day = parseInt(strValue.substring(6, 8), 10);
    // Create a Date object
    const date = new Date(year, month, day);

    // Format the date as MM/DD/YYYY
    const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    return formattedDate;
  }

  onSelectedItemsChange(event: any) {
    this.appliedLines = event.map(line => line.chargeLineId);
  }
}
