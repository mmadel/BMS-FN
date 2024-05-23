import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InsuranceCompanyService } from '../../admin.tools/services/insurance.company/insurance-company.service';
import { Clinic } from '../../model/admin/clinic';
import { InsuranceCompanyHolder } from '../../model/admin/insurance.company.holder';
import { BasicAddress } from '../../model/common/basic.address';
import { States } from '../../model/lookups/state-data-store';

@Component({
  selector: 'edit-internal-insurance',
  templateUrl: './edit-internal-insurance.component.html',
  styleUrls: ['./edit-internal-insurance.component.scss']
})
export class EditInternalInsuranceComponent implements OnInit {
  states: string[] = States;
  address: BasicAddress = { state: null }
  @Input() selectedClinic: InsuranceCompanyHolder
  @Output() changeVisibility = new EventEmitter<string>()
  constructor(private insuranceCompanyService: InsuranceCompanyService, private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.selectedClinic))
  }
  update() {
    this.insuranceCompanyService.update(this.selectedClinic).subscribe(result => {
      this.toastr.success('Insurance company Updated.')
      this.changeVisibility.emit('close');
    }, error => {
      this.toastr.error('Error during update insurance company')
    })
  }
}
