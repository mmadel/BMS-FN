import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Provider } from 'src/app/modules/model/clinical/provider/provider';
import { ProviderService } from 'src/app/modules/providers/service/provider.service';
import { SessionScheduling } from '../../model/session.scheduling';
interface ProviderInfo {
  name: string,
  model: Provider
}
@Component({
  selector: 'patient-session-sheduling',
  templateUrl: './sheduling.component.html',
  styleUrls: ['./sheduling.component.scss']
})
export class ShedulingComponent implements OnInit {
  sessionScheduling: SessionScheduling;
  providers: ProviderInfo[];
  notValidForm: boolean = false;
  @ViewChild('sessionForm') sessionForm: NgForm;

  constructor(private providerService:ProviderService) { }
  
  ngOnInit(): void {
    this.sessionScheduling = {}
    this.providerService.findAllWithoutPagination()
      .subscribe((result: any) => {
        this.providers = new Array();
        for (var i = 0; i < result.length; i++) {
          this.providers.push({
            name: result[i].lastName + ',' + result[i].firstName,
            model: result[i]
          })
        }
      })
  }
}
