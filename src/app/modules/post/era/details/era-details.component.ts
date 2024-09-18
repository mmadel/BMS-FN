import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ERAHistory } from 'src/app/modules/model/invoice/era/er.history';
import { ERADetailsLine } from 'src/app/modules/model/invoice/era/era.details.line';
import { ERAModel } from 'src/app/modules/model/invoice/era/era.model';
import { EraService } from '../../service/era/era.service';
export interface Person {
  name: string;
  email: string;
}
@Component({
  selector: 'era-details',
  templateUrl: './era-details.component.html',
  styleUrls: ['./era-details.component.scss']
})
export class EraDetailsComponent implements OnInit {
  @Input() era: ERAModel
  @Output() changeVisibility = new EventEmitter<string>()
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
    var selectedLines: ERADetailsLine[] = this.getSelectedLines(this.era.eraDetails.patientLines)

    if (selectedLines.length !== 0) {
      var eraHistory: ERAHistory = {
        historyLines: selectedLines,
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
  }

  getKeys(map: { [key: string]: ERADetailsLine[] }): string[] {
    return Object.keys(map);
  }

  capitalizeNames(input: string): string {
    return input
      .split(',')
      .map(name => name.toLowerCase())
      .map(name => name.charAt(0).toUpperCase() + name.slice(1))
      .join(',');
  }
  private getSelectedLines(lines: { [key: string]: ERADetailsLine[] }): ERADetailsLine[] {
    return Object.values(lines)
      .flatMap(lines => lines.filter(item => item.selected));
  }
}
