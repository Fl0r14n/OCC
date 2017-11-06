import {Component} from '@angular/core';
import {AnimationsComponent} from '../../animations/animations.component';

@Component({
  selector: 'my-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  animations: [
    AnimationsComponent.rotateAndTranslateY({name: 'rotateDown', values: [-45, '8px']}),
    AnimationsComponent.rotateAndTranslateY({name: 'rotateUp', values: [45, '-8px']}),
    AnimationsComponent.dim(),
    AnimationsComponent.flyOutX({name: 'fly', timing: 0.3, value: '10px'}),
    AnimationsComponent.bolder({name: 'bolder', timing: 0.3, value: 600}),
    AnimationsComponent.expand()
  ]
})
export class HeaderComponent {

  states = {
    dropdown: 'inactive',
    expertise: 'inactive',
    team: 'inactive',
    blog: 'inactive',
    values: 'inactive',
    contact: 'inactive'
  };

  mouseover(id: string) {
    this.states[id] = 'active';
  }

  mouseleave(id: string) {
    this.states[id] = 'inactive';
  }

  openChange($event) {
    // workaround until animations from ng-bootstrap
    this.states['dropdown'] = this.states['dropdown'] === 'inactive' ? 'active' : 'inactive';
  }
}
