import { Component, OnInit } from '@angular/core';
import { ClientBalanceSettings } from '../../model/settings/client.balance.settings';
import { ClientBalanceService } from '../../service/client-balance.service';

@Component({
  selector: 'client-balance-settings',
  templateUrl: './client-balance-settings.component.html',
  styleUrls: ['./client-balance-settings.component.scss']
})
export class ClientBalanceSettingsComponent implements OnInit {
  clientBalanceSettings:ClientBalanceSettings

  constructor(private clientBalanceService:ClientBalanceService) { }

  ngOnInit(): void {
    this.clientBalanceService.findClientBalanceSettings().subscribe(result=>{
      this.clientBalanceSettings = result;
    })
  }
  save(){
    
  }

}
