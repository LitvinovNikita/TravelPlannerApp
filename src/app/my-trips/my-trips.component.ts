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

  /** The list of trips to be displayed */
  trips: Trip[] = [];

  /** A message to display to the user */
  notification: string = '';

  /**
   * Constructs a new MyTripsComponent.
   *
   * @param webSqlService - The service used to interact with the WebSQL database.
   * @param tripDataService - The service used to communicate between components.
   * @param router - The router used to navigate to other pages in the app.
   */
  constructor(private webSqlService: WebSqlService, private tripDataService: TripDataService, private router: Router) { }


  /**
   * Retrieves the user's trips when the component is initialized.
   */
   async ngOnInit() {
    this.trips = await this.webSqlService.selectAll();
  }

  /**
   * Opens the Edit Trip modal and passes the selected trip to the TripDataService.
   *
   * @param trip - The trip to be edited.
   */
  openEditTripModal(trip: Trip) {
    this.tripDataService.changeTrip(trip);

    // Navigate to the "Plan Trip" page
    this.router.navigate(['/trip-planner']);
  }

  /**
   * Navigates to the Plan Trip page with the selected trip loaded in the TripDataService.
   *
   * @param trip - The trip to be edited.
   */
  editTrip(trip: Trip) {
    this.tripDataService.changeTrip(trip);
    this.router.navigate(['/trip-planner']);
  }

  /**
   * Fetches the user's trips from the database and updates the display.
   */
  async fetchTrips() {
    this.trips = await this.webSqlService.selectAll();
  }


  /**
   * Updates the selected trip with the new destination.
   *
   * @param trip - The trip to be updated.
   * @param destination - The new destination for the trip.
   */
  async updateTrip(trip: any, destination: string): Promise<void> {
    // Update the trip object as needed, e.g., change the destination
    trip.destination = destination
    await this.webSqlService.updateTrip(trip);
    this.fetchTrips();


  }
  /**
   * Deletes the specified trip from the database and updates the display.
   *
   * @param tripId - The ID of the trip to be deleted.
   */
  async deleteTrip(tripId: number): Promise<void>  {
    await this.webSqlService.deleteTrip(tripId);
    this.fetchTrips();
  }
}


