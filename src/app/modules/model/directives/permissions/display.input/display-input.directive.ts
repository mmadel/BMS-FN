import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { RoleScopeFinderService } from 'src/app/modules/secuirty/service/role-scope-finder.service';
import { MatchRole } from '../match.role';

@Directive({
  selector: '[dispaly-input]'
})
export class DisplayInputDirective implements OnInit {
  @Input() componentRole?: string[]
  @Input() childRole?: string
  constructor(private el: ElementRef, private renderer: Renderer2, private roleScopeFinderService: RoleScopeFinderService) { }
  ngOnInit(): void {
    this.roleScopeFinderService.find().subscribe((result: RoleScope[]) => {
      var roleScope: RoleScope = MatchRole.match(result, this.componentRole, this.childRole);
      if (roleScope !== undefined && roleScope.scope === 'view')
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none')
    })
  }
}
