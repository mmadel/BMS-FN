import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { RenderNavItemsService } from 'src/app/modules/secuirty/service/render-nav-items.service';
import { navItems } from './_nav';
@Component({
  selector: 'app-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

  public navItems:INavData[];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private renderNavItemsService : RenderNavItemsService) {}
  ngOnInit(): void {
    this.renderNavItemsService.renderItems$.subscribe((renderItems:INavData[])=>{
       this.navItems = renderItems;
    })
  }

}
