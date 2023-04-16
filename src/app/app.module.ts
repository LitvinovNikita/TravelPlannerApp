import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { DestinationService } from './services/destination.service';
import { WebSqlService } from './services/websql.service';
import {TripDataService} from "./services/trip-data.service";

import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { TripPlannerComponent } from './trip-planner/trip-planner.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { AboutComponent } from './about/about.component';

import { DestinationDetailsDialogComponent } from './destination-details-dialog/destination-details-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DestinationsComponent,
    TripPlannerComponent,
    MyTripsComponent,
    AboutComponent,
    DestinationDetailsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [DestinationDetailsDialogComponent],
  providers: [WebSqlService, TripDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
