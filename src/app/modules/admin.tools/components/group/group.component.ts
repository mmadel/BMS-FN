import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationComponent } from '../organization/organization.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @ViewChild('organizationComponent') organizationComponent: OrganizationComponent;
  editProviderVisibility: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  toggleEditProvider() {
    this.editProviderVisibility = !this.editProviderVisibility;
  }
  onClickEditProviderInformation() {
    this.editProviderVisibility = true;
  }
  changeProviderVisibility(event: any) {
    if (event === 'close') {
      this.editProviderVisibility = false;
      this.organizationComponent.find()
    }
  }
}
