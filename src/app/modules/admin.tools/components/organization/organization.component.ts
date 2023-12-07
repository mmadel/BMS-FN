import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization } from 'src/app/modules/model/admin/organiztion';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  @Input() editModel?: boolean = false;
  organization!: Organization;
  @Output() changeVisibility = new EventEmitter<string>()
  constructor(private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.find();
  }
  edit(){
      this.organizationService.update(this.organization)
      .subscribe((result)=>{
        this.changeVisibility.emit('close')        
      })
  }
  find(){
    this.organizationService.findDefaultOrganization()
    .subscribe((reuslt)=>{
      this.organization = reuslt;
    })
  }
}
