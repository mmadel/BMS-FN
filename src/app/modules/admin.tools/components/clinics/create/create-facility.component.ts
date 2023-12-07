import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Clinic } from 'src/app/modules/model/admin/clinic';
import { ClinicService } from '../../../services/clinic.service';

@Component({
  selector: 'app-create-facility',
  templateUrl: './create-facility.component.html',
  styleUrls: ['./create-facility.component.scss']
})
export class CreateFacilityComponent implements OnInit {
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
      this.changeVisibility.emit('close');
    })
  }

}
