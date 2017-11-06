import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'my-home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePageComponent implements OnInit {

  // show the content of the homepage else the child pages
  isHomepage = true;

  constructor(protected router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      // this.isHomepage = event.url === '/';
    });
  }
}
