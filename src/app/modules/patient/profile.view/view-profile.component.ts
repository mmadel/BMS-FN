import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Patient } from '../../model/clinical/patient';
import { Country } from '../../model/common/country';
import { Gender } from '../../model/enum/geneder';
import { MaritalStatus } from '../../model/enum/marital.status';
import { PhoneType } from '../../model/enum/phone.type';
import { PlaceOfCode } from '../../model/enum/place.code';
import { Countries } from '../../model/lookups/country-data-store';
import { States } from '../../model/lookups/state-data-store';

@Component({
  selector: 'view-patient-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  @Input() patient:Patient
  genders = Gender;
  genderKeys = Object.values;
  maritalStatuses = MaritalStatus;
  maritalStatusKeys = Object.values;
  phoneTypes = PhoneType
  phoneTypesKeys = Object.values;
  countries: Country[] = Countries;
  states: string[] = States;
  patientDOB: Date
  public panes = [];
  placeOfCodes = PlaceOfCode;
  activePane = 0;

  onTabChange($event: number) {
    this.activePane = $event;
    console.log('onTabChange', $event);
  }

  constructor() { }

  ngOnInit(): void {
    this.patientDOB = moment.unix(this.patient?.birthDate / 1000).toDate();
    for(var i = 0 ;i < this.patient?.sessions.length;i++){
        var pane:any={
            name: moment(moment.unix(this.patient.sessions[i].serviceDate / 1000).toDate()).format('MM/DD/YYYY'),
            provider:this.patient.sessions[i].doctorInfo,
            clinic:this.patient.sessions[i].clinicInfo,
            dos:moment(moment.unix(this.patient.sessions[i].serviceDate / 1000).toDate()).format('MM/DD/YYYY'),
            startTime: moment(moment.unix(this.patient.sessions[i].serviceStartTime / 1000).toDate()).format('hh:mm a'),
            endTime: moment(moment.unix(this.patient.sessions[i].serviceEndTime / 1000).toDate()).format('hh:mm a'),
            PlaceOfCode : this.patient.sessions[i].placeOfCode,
            serviceLines:this.patient.sessions[i].serviceCodes
        }
        this.panes.push(pane)
    }
  }
}
