import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'list-auths',
  templateUrl: './list-auths.component.html',
  styleUrls: ['./list-auths.component.scss']
})
export class ListAuthsComponent implements OnInit {
  @Input() patientId: number
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.find(this.patientId).subscribe((result)=>{
      console.log(JSON.stringify(result))
    })
  }

}
