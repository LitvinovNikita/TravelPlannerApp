import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{HomeComponent} from "./home/home.component";
import {DestinationsComponent} from "./destinations/destinations.component";
import {TripPlannerComponent} from "./trip-planner/trip-planner.component";
import {MyTripsComponent} from "./my-trips/my-trips.component";
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'destinations', component: DestinationsComponent },
  { path: 'trip-planner', component: TripPlannerComponent },
  { path: 'my-trips', component: MyTripsComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
