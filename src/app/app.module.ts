import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { ModalDismissReasons, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { JwtModule } from "@auth0/angular-jwt";

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HousesComponent } from './houses/houses.component';
import { HouseListComponent } from './houses/house-list/house-list.component';
import { HouseService } from './shared/house.service';
import { FlatsComponent } from './flats/flats.component';
import { FlatListComponent } from './flats/flat-list/flat-list.component';
import { FlatService } from './shared/flat.service';
import { AuthGuard } from './guards/auth-guard.service';
import { FlatListDetailsComponent } from './flats/flat-list-details/flat-list-details.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    HousesComponent,
    HouseListComponent,
    routingComponents,
    FlatsComponent,
    FlatListComponent,
    FlatListDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:50271"],
        blacklistedRoutes: []
      }
    }),
    AppRoutingModule
  ],
  providers: [HouseService, FlatService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
