import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization } from 'src/app/modules/model/group/organiztion';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  organization$!: Observable<Organization>;
  constructor(private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.organization$ = this.organizationService.findDefaultOrganization();
  }

}
