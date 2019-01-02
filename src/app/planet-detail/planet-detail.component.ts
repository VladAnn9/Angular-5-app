import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Planet } from '../planet';
import { PlanetService } from '../planet.service';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent implements OnInit {

  planet: Planet;

  constructor(
    private planetService: PlanetService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPlanet();
  }

  getPlanet(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.planetService.getPlanet(id).subscribe(data => this.planet = data);
  }

}
