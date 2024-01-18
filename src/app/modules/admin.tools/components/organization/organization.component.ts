import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private organizationService: OrganizationService
    ,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.find();
  }
  edit(){
      this.organizationService.update(this.organization)
      .subscribe((result)=>{
        this.changeVisibility.emit('close');
        this.toastr.success('Billing Provider edited successfully')
      })
  }
  find(){
    this.organizationService.findDefaultOrganization()
    .subscribe((reuslt)=>{
      this.organization = reuslt;
    })
  }
}
