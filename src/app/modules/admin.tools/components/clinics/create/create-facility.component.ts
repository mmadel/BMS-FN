import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  @Input() selectedClinic: Clinic;
  constructor(private clinicService: ClinicService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (this.selectedClinic)
      this.fill();
    else
      this.init();
  }
  init() {
    this.clinic = {
      clinicdata: {}
    }
  }
  fill() {
    this.clinic = this.selectedClinic;
  }
  add() {
    if (this.selectedClinic) {
      this.clinicService.update(this.clinic).subscribe(result => {
        this.toastrService.success('Clinic Updated');
        this.changeVisibility.emit('update');
      }, error => {
        this.toastrService.error('Error during update clinic');
      })
    } else {
      this.clinicService.create(this.clinic)
        .subscribe((result) => {
          this.toastrService.success('Clinic Created');
          this.changeVisibility.emit('create');
        }, error => {
          this.toastrService.error('Error during create clinic');
        })
    }
    this.scrollUp()
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
}
