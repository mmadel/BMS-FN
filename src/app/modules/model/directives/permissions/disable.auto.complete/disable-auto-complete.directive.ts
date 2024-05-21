import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AutocompleteComponent } from 'angular-ng-autocomplete';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { RoleScopeFinderService } from 'src/app/modules/secuirty/service/role-scope-finder.service';
import { MatchRole } from '../match.role';

@Directive({
  selector: '[disable-auto-complete]'
})
export class DisableAutoCompleteDirective implements OnInit {
  @Input() componentRole?: string[]
  @Input() childRole?: string
  constructor(private el: ElementRef, private autocompleteComponent: AutocompleteComponent, private roleScopeFinderService: RoleScopeFinderService) { }
  ngOnInit(): void {
    this.roleScopeFinderService.find().subscribe((result: RoleScope[]) => {
      var roleScope: RoleScope = MatchRole.match(result, this.componentRole, this.childRole);
      if (roleScope !== undefined && roleScope.scope === 'view')
        this.autocompleteComponent.setDisabledState(true);
    });
  }

}
