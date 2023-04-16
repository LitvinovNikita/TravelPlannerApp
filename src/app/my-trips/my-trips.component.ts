import {Component, OnInit} from '@angular/core';
import { WebSqlService } from '../services/websql.service';
import {Trip} from "../interfaces/trip.interface";
import { TripDataService } from '../services/trip-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnInit{


  trips: Trip[] = [];
  notification: string = '';
  constructor(private webSqlService: WebSqlService, private tripDataService: TripDataService, private router: Router) { }

   async ngOnInit() {
    this.trips = await this.webSqlService.selectAll();
  }

  openEditTripModal(trip: Trip) {
    this.tripDataService.changeTrip(trip);

    // Navigate to the "Plan Trip" page
    this.router.navigate(['/trip-planner']);
  }
  editTrip(trip: Trip) {
    this.tripDataService.changeTrip(trip);
    this.router.navigate(['/trip-planner']);
  }
  async fetchTrips() {
    this.trips = await this.webSqlService.selectAll();
  }

  async updateTrip(trip: any, destination: string): Promise<void> {
    // Update the trip object as needed, e.g., change the destination
    trip.destination = destination
    await this.webSqlService.updateTrip(trip);
    this.fetchTrips();


  }

  async deleteTrip(tripId: number): Promise<void>  {
    await this.webSqlService.deleteTrip(tripId);
    this.fetchTrips();
  }
}
























// import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
// import { WebSqlService } from '../services/websql.service';
// import {Trip} from "../interfaces/trip.interface";
// import { TripDataService } from '../services/trip-date.service;
// @Component({
//   selector: 'app-my-trips',
//   templateUrl: './my-trips.component.html',
//   styleUrls: ['./my-trips.component.css']
// })
// export class MyTripsComponent implements OnInit{
//
//
//   trips: Trip[] = [];
//   notification: string = '';
//   constructor(private webSqlService: WebSqlService) { }
//
//    async ngOnInit() {
//     this.trips = await this.webSqlService.selectAll();
//   }
//
//
//   async fetchTrips() {
//     this.trips = await this.webSqlService.selectAll();
//   }
//
//   async updateTrip(trip: any, destination: string): Promise<void> {
//     // Update the trip object as needed, e.g., change the destination
//     trip.destination = destination
//     await this.webSqlService.updateTrip(trip);
//     this.fetchTrips();
//
//
//   }
//
//   async deleteTrip(tripId: number): Promise<void>  {
//     await this.webSqlService.deleteTrip(tripId);
//     this.fetchTrips();
//   }
// }
