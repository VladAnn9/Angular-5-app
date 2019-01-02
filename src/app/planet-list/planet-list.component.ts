import { Component, OnInit, ViewChild } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { switchMap } from 'rxjs/operators';

import { PageEvent } from '@angular/material';
import { MatPaginator } from "@angular/material";

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { Planet } from '../planet';
import { PlanetService } from '../planet.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss'],
  animations: [
    trigger('fadeOut', [
          state('in', style({ opacity: 1 })),
          transition('* => void', [
              animate(`300ms ease-out`, style({ opacity: 0 }))
          ])
      ])
  ]
})
export class PlanetListComponent implements OnInit {

  planets: Planet[] = [];
  searchedPlanets: Planet[] = [];
  private searchTerms = new Subject<string>();

  dataSource: Planet[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  pageIndex: number = 0;
  pageSize: number = 10;
  showSpinner: boolean = true;

  constructor(private planetService: PlanetService) { }

  ngOnInit() {
    this.getPlanets();

    this.searchTerms.pipe(
      switchMap((term: string) => this.planetService.searchPlanets(term))
    ).subscribe(data => {
      this.searchedPlanets = data;
      this.sliceList(this.searchedPlanets);
    });
  }

  getPlanets(page: number = 1): void {
    this.planetService.getPlanets(page).subscribe(response =>  {
      this.planets = this.planets.concat(response['results']);
      if (response['next'] !== null) {
        this.getPlanets(++page);
      } else {
        this.showSpinner = false;
        this.dataSource = this.planets.slice(this.pageIndex, this.pageSize);
      }
    });
  }

  search(term: string, paginator: PageEvent): void {
    if(term) {
      this.pageSize = paginator.pageSize;
      this.searchTerms.next(term);
    } else {
      this.sliceList(this.planets);
    }
    paginator.pageIndex = 0;
  }

  paginatorData(e: PageEvent, search: string): void { 
    if (search) {
      this.sliceList(this.searchedPlanets, e);
      this.pageSize = e.pageSize;
    } else {
      this.sliceList(this.planets, e);
    }
  }

  sliceList(arr: Planet[], paginator?: PageEvent): void {
    if (paginator) {
      const end = (paginator.pageIndex + 1) * paginator.pageSize;
      const start = paginator.pageIndex * paginator.pageSize;
      this.dataSource = arr.slice(start, end);
      
    } else {
      const end = (this.pageIndex + 1) * this.pageSize;
      const start = this.pageIndex * this.pageSize;
      this.dataSource = arr.slice(start, end);
    }
  }

}
