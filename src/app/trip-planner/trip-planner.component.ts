import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trip } from '../interfaces/trip.interface';
import { WebSqlService } from '../services/websql.service';
import { TripDataService } from '../services/trip-data.service';



@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.css']
})
export class TripPlannerComponent implements OnInit {

  /** Form group for the trip data. */
  tripForm: FormGroup;

  /** List of all trips. */
  trips: any[] = [];

  /** The currently selected trip. */
  selectedTrip: any;

  /** The duration of the trip, calculated based on start and end dates. */
  duration = '';

  /** Whether the component is in edit mode or not. */
  isEditMode = false;

  /** Notification message for the user. */
  notification = '';

  /** Today's date, formatted as a string. */
  today: string = new Date().toISOString().split('T')[0];


  /**
   * Creates an instance of MyTripsComponent.
   * @param formBuilder - Service for creating form groups.
   * @param webSqlService - Service for interacting with the WebSQL database.
   * @param tripDataService - Service for passing data between components.
   */
  constructor(private formBuilder: FormBuilder, private webSqlService: WebSqlService, private tripDataService: TripDataService) {
    this.tripForm = this.formBuilder.group({
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: ['', Validators.required],
      notes: ['']
    });
  }

  /**
   * Initializes the component.
   * Sets up the form group and subscribes to changes in the form controls.
   */
  ngOnInit(): void {
    //this.loadTrips();

    this.tripForm.controls['startDate'].valueChanges.subscribe(() => {
      this.updateDuration();
    });

    this.tripForm.controls['endDate'].valueChanges.subscribe(() => {
      this.updateDuration();
    });

    this.tripDataService.currentTrip.subscribe((trip) => {
      if (trip) {
        this.selectedTrip = trip;
        this.fillFormWithData(trip);
        this.isEditMode = true;

      }
    });

    this.tripDataService.currentDestination.subscribe((destination) => {
      if (destination) {
        this.tripForm.controls['destination'].setValue(destination);
      }
    });

  }

  /**
   * Fills the form with data from a given trip.
   * @param trip - The trip to fill the form with.
   */
  fillFormWithData(trip: Trip) {
    this.tripForm.setValue({
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      budget: trip.budget,
      notes: trip.notes,
    });
    this.updateDuration();
  }



  /**
   * Adds a new trip to the database.
   * @returns Promise that resolves when the trip has been added.
   */
  async addTrip() {
    const destination = this.tripForm.get('destination')?.value;
    const startDate = this.tripForm.get('startDate')?.value;
    const endDate = this.tripForm.get('endDate')?.value;
    const duration = parseInt(this.duration, 10) || 0;
    const budget = this.tripForm.get('budget')?.value;
    const notes = this.tripForm.get('notes')?.value;




    if (this.isEditMode && this.selectedTrip) {
      // Update the trip
      const updatedTrip: Trip = {
        id: this.selectedTrip.id,
        destination,
        startDate,
        endDate,
        duration,
        budget,
        notes,
      };
      await this.webSqlService.updateTrip(updatedTrip);
      this.isEditMode = false;
      this.selectedTrip = null;
    } else {
      // Add the trip
      await this.webSqlService.addTrip(destination, startDate, endDate, duration, budget, notes);
    }

    // Refresh the trips array
    this.trips = await this.webSqlService.selectAll();

    // Notify the user and clear the form fields
    alert(this.isEditMode ? 'Trip updated successfully!' : 'Trip added successfully!');
    this.tripForm.reset();

  }

  /**
   * On submit adds/edits the form, also has some validation
   * */
  onSubmit() {
    if (this.tripForm.invalid) {
      this.tripForm.markAllAsTouched();
      return;
    }

    const destination = this.tripForm.get('destination')?.value;
    const startDate = this.tripForm.get('startDate')?.value;
    const endDate = this.tripForm.get('endDate')?.value;
    const duration = parseInt(this.duration, 10) || 0;
    const budget = this.tripForm.get('budget')?.value;
    const notes = this.tripForm.get('notes')?.value;

    console.log('isEditMode:', this.isEditMode);
    console.log('selectedTrip:', this.selectedTrip);

    if (this.isEditMode && this.selectedTrip) {
      // Update the trip
      const updatedTrip: Trip = {
        id: this.selectedTrip.id,
        destination,
        startDate,
        endDate,
        duration,
        budget,
        notes,
      };
      console.log('updating trip:', updatedTrip);
      this.webSqlService.updateTrip(updatedTrip).then(() => {
        alert('Trip updated successfully!');
      }).catch((error) => {
        console.error('Error updating trip:', error);
      });
    } else {
      // Add the trip
      console.log('adding trip');

      this.webSqlService.addTrip(destination, startDate, endDate, duration, budget, notes).then(() => {
        alert('Trip added successfully!');
      });
    }

    // Refresh the trips array and reset the form
    this.webSqlService.selectAll().then((trips) => {
      this.trips = trips;
      this.tripForm.reset();
      this.duration = '';
      this.isEditMode = false;
      this.selectedTrip = null;
    });
  }


  clearForm() {
    this.tripForm.reset();
    this.duration = '';
    this.notification = '';
  }


  updateDuration() {
    const startDate = this.tripForm.get('startDate')?.value;
    const endDate = this.tripForm.get('endDate')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = end.getTime() - start.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      this.duration = days > 0 ? days.toString() : '';
    } else {
      this.duration = '';
    }
  }


  editTrip(trip: Trip) {
    this.isEditMode = true;
    this.selectedTrip = trip;

    this.tripForm.patchValue({
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      budget: trip.budget,
      notes: trip.notes,
    });


  }



  async updateTrip(trip: Trip) {
    // Fetch the trip by ID
    if(trip){
      const destination = this.tripForm.get('destination')?.value;
      const startDate = this.tripForm.get('startDate')?.value;
      const endDate = this.tripForm.get('endDate')?.value;
      const duration = parseInt(this.duration, 10) || 0;
      const budget = this.tripForm.get('budget')?.value;
      const notes = this.tripForm.get('notes')?.value;

      if (this.selectedTrip) {
        // Update the trip
        const updatedTrip: Trip = {
          id: this.selectedTrip.id,
          destination,
          startDate,
          endDate,
          duration,
          budget,
          notes,
        };
        await this.webSqlService.updateTrip(updatedTrip);
        this.isEditMode = false;
        this.selectedTrip = null;
      }
    }


    // Refresh the trips array
    this.trips = await this.webSqlService.selectAll();

    // Notify the user and clear the form fields
    alert('Trip updated successfully!');
    this.tripForm.reset();
  }



  async deleteTrip(id: number) {
    // Delete a trip from the database.
    // Delete the trip by ID
    await this.webSqlService.deleteTrip(id);

    // Refresh the trips array
    this.trips = await this.webSqlService.selectAll();
  }
}
