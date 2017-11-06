import {Component} from '@angular/core';
import {AnimationsComponent} from '../../animations/animations.component';
import {
  AgmMap, CircleManager, DataLayerManager, GoogleMapsAPIWrapper, InfoWindowManager, KmlLayerManager, MarkerManager,
  PolygonManager,
  PolylineManager
} from '@agm/core';

@Component({
  selector: 'my-agm-map',
  providers: [
    GoogleMapsAPIWrapper, MarkerManager, InfoWindowManager, CircleManager, PolylineManager,
    PolygonManager, KmlLayerManager, DataLayerManager
  ],
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss'],
  animations: [
    AnimationsComponent.hide({timing: 1.5})
  ]
})
export class MapComponent extends AgmMap {

  overlay = 'inactive';

  mouseOver() {
    this.overlay = 'active';
  }

  mouseLeave() {
    this.overlay = 'inactive';
  }
}
