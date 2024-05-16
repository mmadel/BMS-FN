import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { DatePickerComponent } from '@coreui/angular-pro';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { RoleScopeFinderService } from 'src/app/modules/secuirty/service/role-scope-finder.service';
import { MatchRole } from '../match.role';

@Directive({
  selector: '[disable-date-picker]'
})
export class DisableDatePickerDirective implements OnInit {
  @Input() componentRole?: string[]
  @Input() childRole?: string
  constructor(private el: ElementRef, private datePickerComponent: DatePickerComponent, private roleScopeFinderService: RoleScopeFinderService) { }
  ngOnInit(): void {
    this.roleScopeFinderService.find().subscribe((result: RoleScope[]) => {
      var roleScope: RoleScope = MatchRole.match(result, this.componentRole, this.childRole);
      if (roleScope !== undefined && roleScope.scope === 'view')
        this.datePickerComponent.setDisabledState(true)
    });
  }

}
