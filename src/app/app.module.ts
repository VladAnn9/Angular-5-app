import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material/ng-material.module';

import { AppComponent } from './app.component';
import { PlanetListComponent } from './planet-list/planet-list.component';
import { PlanetService } from './planet.service';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';
import { RequestCacheService } from './request-cache.service';
import { CacheInterceptorService } from './cache-interceptor.service'


@NgModule({
  declarations: [
    AppComponent,
    PlanetListComponent,
    PlanetDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgMaterialModule
  ],
  providers: [ 
    PlanetService,
    RequestCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptorService, multi: true }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
