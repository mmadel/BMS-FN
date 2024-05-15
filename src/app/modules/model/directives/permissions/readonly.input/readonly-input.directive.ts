import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { RoleScopeFinderService } from 'src/app/modules/secuirty/service/role-scope-finder.service';

@Directive({
  selector: '[readonly-input]'
})
export class ReadonlyInputDirective implements OnInit {
  @Input() componentScopes: string[];
  constructor(private el: ElementRef, private renderer: Renderer2, private roleScopeFinderService: RoleScopeFinderService) { }
  ngOnInit(): void {
    this.roleScopeFinderService.find().subscribe((result: RoleScope[]) => {
      var roleScope: RoleScope = this.match(result, this.componentScopes)
      if (roleScope !== undefined && roleScope.scope === 'view')
        this.renderer.setAttribute(this.el.nativeElement, 'readonly', 'true');
    })
  }

  private match(userRoles: RoleScope[], componentScope: string[]): RoleScope {
    return userRoles.filter(item => componentScope.includes(item.role))[0];
  }

}
