import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { ReferringProvider } from 'src/app/modules/model/clinical/referring.provider';
import { ReferringProviderService } from 'src/app/modules/providers/service/referring-provider.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  @Input() patient: Patient;
  referringProviders: ReferringProvider[]
  referringFirstNameList: string[];
  referringLastNameList: string[];
  referringNPIList: string[];
  selectedFirstName: string;
  selectedLastName: string;
  selectedNPI: string;
  constructor() { }

  ngOnInit(): void {

  }
}
