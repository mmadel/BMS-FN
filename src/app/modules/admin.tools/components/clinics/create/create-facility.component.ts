import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Clinic } from 'src/app/modules/model/admin/clinic';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { ClinicService } from '../../../services/clinic.service';

@Component({
  selector: 'app-create-facility',
  templateUrl: './create-facility.component.html',
  styleUrls: ['./create-facility.component.scss']
})
export class CreateFacilityComponent implements OnInit {
  componentScopes: string[] = [Role.ADMIN_TOOL_ROLE, Role.GROUP_INFO_ADMIN_TOOL_ROLE];
  clinic: Clinic;
  @Output() changeVisibility = new EventEmitter<string>()
  constructor(private clinicService:ClinicService) { }

  ngOnInit(): void {
    this.clinic={
      clinicdata:{}
    }
  }
  add() {
    this.clinicService.create(this.clinic)
    .subscribe((result)=>{
      this.changeVisibility.emit('create');
    })
  }
  edit(){
    this.changeVisibility.emit('update');
  }

}
