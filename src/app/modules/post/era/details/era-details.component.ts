import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { result } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { ERAHistory } from 'src/app/modules/model/invoice/era/er.history';
import { ERADetailsLine } from 'src/app/modules/model/invoice/era/era.details.line';
import { ERAModel } from 'src/app/modules/model/invoice/era/era.model';
import { PatientService } from 'src/app/modules/patient/service/patient.service';
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
  @Output() changeERADetailsVisibility = new EventEmitter<string>()
  actions: string[] = ["Close Session", "Send to insurance invoice Area", "Keep current status"];
  isAllTouched: boolean = false;
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
        this.changeERADetailsVisibility.emit('close');
      }, error => {
        this.toastr.error("error during update ERA")
      })
    } else {
      this.toastr.error("Select at least one line")
    }
  }
  constructor(private eraService: EraService, private toastr: ToastrService, private patientService: PatientService) {
  }
  openPatientProfile(patient: string) {
    var patientName: string[] = patient.toLocaleLowerCase().split(",")
    this.patientService.findByFirstAndLast(patientName[1], patientName[0]).subscribe(result => {
      this.eraService.selectedPatient$.next(result)
      this.changeERADetailsVisibility.emit('open-profile');
    })
  }

  ngOnInit(): void {
    this.checkAllTouched(this.era.eraDetails.patientLines);
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
      .flatMap(lines => lines.filter(item => item.selected && !item.touched));
  }
  private checkAllTouched(lines: { [key: string]: ERADetailsLine[] }) {
    this.isAllTouched = Object.values(lines)
      .every(lines => lines.every(item => item.touched));
  }
  formatDate(dateString: string): string {
    // Extract year, month, and day from the string
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    // Return formatted date as mm/dd/yyyy
    return `${month}/${day}/${year}`;
  }
}
