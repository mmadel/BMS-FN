import { Component, Input, OnInit } from '@angular/core';
import { ReferringProvider } from 'src/app/modules/model/clinical/referring.provider';
import { ReferringProviderService } from 'src/app/modules/providers/service/referring-provider.service';

@Component({
  selector: 'app-view-referring-provider',
  templateUrl: './view-referring-provider.component.html',
  styleUrls: ['./view-referring-provider.component.scss']
})
export class ViewReferringProviderComponent implements OnInit {
  @Input() referringProvider: ReferringProvider;
  referringProviders: ReferringProvider[]
  referringFirstNameList: string[];
  referringLastNameList: string[];
  referringNPIList: string[];
  selectedFirstName: string;
  selectedLastName: string;
  selectedNPI: string;
  constructor(private referringProviderService: ReferringProviderService) { }

  ngOnInit(): void {

    this.selectedFirstName = this.referringProvider?.firstName;
    this.selectedLastName = this.referringProvider?.lastName;
    this.selectedNPI = this.referringProvider?.npi;

    this.referringProviderService.findAllWithoutPagination().subscribe((response: any) => {
      this.referringProviders = response;
      this.referringFirstNameList = this.referringProviders.map(a => a.firstName);
      this.referringLastNameList = this.referringProviders.map(a => a.lastName);
      this.referringNPIList = this.referringProviders.map(a => a.npi);
    })
  }
  pickFirstName(event: any) {
    this.referringProviders.forEach(element => {
      if (element.firstName === event) {
        this.selectedLastName = element.lastName;
        this.selectedNPI = element.npi
      }
    });
  }
  unpickFirstName() {
    this.selectedLastName = '';
    this.selectedNPI = '';
  }
  pickLastName(event: any) {
    this.referringProviders.forEach(element => {
      if (element.lastName === event) {
        this.selectedFirstName = element.firstName;
        this.selectedNPI = element.npi
      }
    });
  }
  unpickLastName() {
    this.selectedFirstName = '';
    this.selectedNPI = '';
  }
  pickNPI(event: any) {
    this.referringProviders.forEach(element => {
      if (element.npi === event) {
        this.selectedFirstName = element.firstName;
        this.selectedLastName = element.lastName
      }
    });
  }
  unpickNPI() {
    this.selectedFirstName = '';
    this.selectedLastName = '';
  }
  getReferringDoctor() {
    if (this.selectedFirstName !== undefined && this.selectedLastName !== undefined && this.selectedNPI !== undefined) {
      return {
        firstName: this.selectedFirstName,
        lastName: this.selectedLastName,
        npi: this.selectedNPI
      }
    } else
      return null;
  }
  public resetReferringProvider() {
    this.selectedFirstName = null;
    this.selectedLastName = null;
    this.selectedNPI = null
  }
}
