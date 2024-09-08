import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ERAHistory } from 'src/app/modules/model/invoice/era/er.history';
import { ERALineHistory } from 'src/app/modules/model/invoice/era/er.line.history';
import { ERADetailsLine } from 'src/app/modules/model/invoice/era/era.details.line';
import { ERAModel } from 'src/app/modules/model/invoice/era/era.model';
import { EraService } from '../../service/era/era.service';

@Component({
  selector: 'era-details',
  templateUrl: './era-details.component.html',
  styleUrls: ['./era-details.component.scss']
})
export class EraDetailsComponent implements OnInit {
  @Input() era: ERAModel
  @Output() changeVisibility = new EventEmitter<string>()
  lines: ERALineHistory[] = [];
  selectedLines : ERALineHistory[] = [];
  actions: string[] = ["Close Session", "Send to insurance invoice Area", "Keep current status"];
  columns = [
    {
      key: 'dos',
      label: 'DOS',
    },
    {
      key: 'cpt',
      label: 'CPT',
    },
    {
      key: 'units',
      label: 'units',
    },
    {
      key: 'billed',
      label: 'Billed'
    },
    {
      key: 'adjust',
      label: 'adjust',
      _style: { width: '7%' }
    },
    {
      key: 'deduct',
      label: 'deduct',
    },
    {
      key: 'COIN',
      label: 'COIN',
    },
    {
      key: 'COPAY',
      label: 'COPAY',
    },
    {
      key: 'paid',
      label: 'Paid',
      _style: { width: '7%' }
    },
    {
      key: 'action',
      label: 'actions',
    },
  ]
  apply() {
    if (this.selectedLines.length !== 0) {
      var eraHistory: ERAHistory = {
        historyLines: this.selectedLines,
        era: this.era,
        isArchive: false
      }
      this.eraService.createERAHistory(eraHistory).subscribe(() => {
        this.toastr.success("ERA is updated successfully")
        this.changeVisibility.emit('close');
      }, error => {
        this.toastr.error("error during update ERA")
      })
    } else {
      this.toastr.error("Select at least one line")
    }
  }
  constructor(private eraService: EraService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
   this.convertToERAHistoryLines();
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
    this.selectedLines = event;
  }
  private convertToERAHistoryLines() {
    for (var i = 0; i < this.era.eraDetails.lines.length; i++) {
      var eraDetailsLine: ERADetailsLine = this.era.eraDetails.lines[i];
      var line: ERALineHistory = {
        dos: this.convertDOS(eraDetailsLine.dos),
        cpt: eraDetailsLine.cptCode,
        units: eraDetailsLine.units,
        billed: eraDetailsLine.billAmount,
        adjust: eraDetailsLine.adjustAmount,
        editatableAdjust: eraDetailsLine.adjustAmount,
        deduct: eraDetailsLine.deductAmount,
        COIN: eraDetailsLine.coInsuranceAmount,
        COPAY: eraDetailsLine.coPaymentAmount,
        paid: eraDetailsLine.paidAmount,
        ediatablePaid: eraDetailsLine.paidAmount,
        action: 'Close',
        serviceLineId: eraDetailsLine.chargeLineId
      }
      this.lines.push(line)
    }
  }
}
