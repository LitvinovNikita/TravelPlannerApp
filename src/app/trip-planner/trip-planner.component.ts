import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trip } from '../interfaces/trip.interface';
import { WebSqlService } from '../services/websql.service';
@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.css']
})
export class TripPlannerComponent implements OnInit {
  tripForm: FormGroup;
  trips: any[] = [];

  selectedTrip: any;

  duration = '';


  notification = '';
  constructor(private formBuilder: FormBuilder, private webSqlService: WebSqlService) {
    this.tripForm = this.formBuilder.group({
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    //this.loadTrips();

    this.tripForm.controls['startDate'].valueChanges.subscribe(() => {
      this.updateDuration();
    });

    this.tripForm.controls['endDate'].valueChanges.subscribe(() => {
      this.updateDuration();
    });
  }

  // async loadTrips() {
  //   try {
  //     this.trips = await this.webSqlService.getTrips();
  //   } catch (error) {
  //     console.error('Error loading trips:', error);
  //   }
  // }

  // async addTrip(destination: string, startDate: string, endDate: string, budget: number, notes: string) {
  //   // Add the trip
  //   await this.webSqlService.addTrip(destination, startDate, endDate, budget, notes);
  //
  //   // Refresh the trips array
  //   this.trips = await this.webSqlService.selectAll();
  // }

  async addTrip() {
    const destination = this.tripForm.get('destination')?.value;
    const startDate = this.tripForm.get('startDate')?.value;
    const endDate = this.tripForm.get('endDate')?.value;
    const duration = parseInt(this.duration, 10) || 0;
    const budget = this.tripForm.get('budget')?.value;
    const notes = this.tripForm.get('notes')?.value;

    // Add the trip
    await this.webSqlService.addTrip(destination, startDate, endDate, duration, budget, notes);

    // Refresh the trips array
    this.trips = await this.webSqlService.selectAll();

    // Notify the user and clear the form fields
    alert('Trip added successfully!');
    this.tripForm.reset();
  }

  onSubmit() {
    if (this.tripForm.invalid) {
      this.tripForm.markAllAsTouched();
      return;
    }

    this.addTrip();
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



  editTrip(trip: any) {
    this.selectedTrip = trip;
    this.tripForm.setValue({
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      budget: trip.budget,
      notes: trip.notes
    });
  }
  // async updateTrip(id: number, destination: string, startDate: string, endDate: string, budget: string, notes: string) {
  //   // Fetch the trip by ID
  //   const trip = await this.webSqlService.selectTrip(id);
  //
  //   // Update the trip
  //   trip.destination = destination;
  //   trip.startDate = startDate;
  //   trip.endDate = endDate;
  //   trip.budget = budget;
  //   trip.notes = notes;
  //
  //   await this.webSqlService.updateTrip(trip);
  //
  //   // Refresh the trips array
  //   this.trips = await this.webSqlService.selectAll();
  // }

  async updateTrip(trip: Trip) {
    // Fetch the trip by ID
    const updatedTrip: Trip = {
      ...trip,
      destination: this.tripForm.get('destination')?.value,
      startDate: this.tripForm.get('startDate')?.value,
      endDate: this.tripForm.get('endDate')?.value,
      budget: this.tripForm.get('budget')?.value,
      notes: this.tripForm.get('notes')?.value
    };

    // Update the trip in the database
    await this.webSqlService.updateTrip(updatedTrip);

    // Refresh the trips array
    this.trips = await this.webSqlService.selectAll();

    // Reset the form
    this.tripForm.reset();
    this.duration = '';
    this.notification = 'Trip updated successfully!';
  }



  async deleteTrip(id: number) {
    // Delete a trip from the database.
    // Delete the trip by ID
    await this.webSqlService.deleteTrip(id);

    // Refresh the trips array
    this.trips = await this.webSqlService.selectAll();
  }
}
