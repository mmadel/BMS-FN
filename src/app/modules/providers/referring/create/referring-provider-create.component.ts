import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReferringProvider } from 'src/app/modules/model/clinical/referring.provider';
import { ReferringProviderService } from '../../service/referring-provider.service';

@Component({
  selector: 'app-referring-provider-create',
  templateUrl: './referring-provider-create.component.html',
  styleUrls: ['./referring-provider-create.component.scss']
})
export class ReferringProviderCreateComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  referringProvider: ReferringProvider = {}
  constructor(private referringProviderService: ReferringProviderService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  create() {
    this.referringProviderService.create(this.referringProvider)
      .subscribe((result) => {
        this.toastr.success("Referring Provider Created")
      }, (error) => {
        this.toastr.error("Error in Referring Provider Creation")
      })
      this.changeVisibility.emit('close');
  }
  resetError() {

  }
}
