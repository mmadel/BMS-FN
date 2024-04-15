import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientBalanceSettings } from '../../model/settings/client.balance.settings';
import { ClientBalanceService } from '../../service/client-balance.service';

@Component({
  selector: 'client-balance-settings',
  templateUrl: './client-balance-settings.component.html',
  styleUrls: ['./client-balance-settings.component.scss']
})
export class ClientBalanceSettingsComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  clientBalanceSettings: ClientBalanceSettings
  constructor(private clientBalanceService: ClientBalanceService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.clientBalanceService.findClientBalanceSettings().subscribe(result => {
      this.clientBalanceSettings = result;
    })
  }
  save() {
    this.clientBalanceService.updateClientBalanceSettings(this.clientBalanceSettings)
      .subscribe(result => {
        this.changeVisibility.emit('close');
        this.toastr.success("Settings updated.")
      }, error => {
        this.toastr.error("Error during updating.")
      })
  }
  changeTaxID(event: any) {
    console.log(event.target.value)
    this.clientBalanceSettings.patientBalanceAccountSettings.taxID = event.target.value;
  }
  changeNPI(event: any) {
    this.clientBalanceSettings.patientBalanceAccountSettings.npi = event.target.value;
  }

  changeRendringProvider(event: any) {
    this.clientBalanceSettings.patientBalanceAccountSettings.renderingProvider = event.target.value;
  }
  changeICD10(event: any) {
    this.clientBalanceSettings.patientBalanceAccountSettings.icdCodes = event.target.value;
  }
  changePatientDateOfBirth(event: any) {
    this.clientBalanceSettings.patientBalanceAccountSettings.patientDOB = event.target.value;
  }
  changeLocation(event: any) {
    this.clientBalanceSettings.patientBalanceAccountSettings.location = event.target.value;
  }
  changePOS(event: any) {
    this.clientBalanceSettings.patientBalanceAccountSettings.poc = event.target.value;
  }
}
