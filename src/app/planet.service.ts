import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { Planet } from "./planet";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class PlanetService {
  private planetsUrl = "https://swapi.co/api/planets/";

  constructor(private http: HttpClient) {}

  getPlanets(page: number = 1): Observable<object> {
    return this.http
      .get<object>(`${this.planetsUrl}?page=${page}`)
      .pipe(catchError(this.handleError("getPlanets", [])));
  }

  searchPlanets(term: string): Observable<Planet[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Planet[]>(`${this.planetsUrl}?search=${term}`).pipe(
      map(data => {
        return data["results"];
      }),
      catchError(this.handleError<Planet[]>("searchPlanets", []))
    );
  }

  getPlanet(id: string): Observable<Planet> {
    const url = `${this.planetsUrl}${id}/`;
    return this.http
      .get<Planet>(url)
      .pipe(catchError(this.handleError<Planet>(`getPlanet id=${id}`)));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
