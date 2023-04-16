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
  tripForm: FormGroup;
  trips: any[] = [];

  selectedTrip: any;

  duration = '';

  isEditMode = false;
  notification = '';
  constructor(private formBuilder: FormBuilder, private webSqlService: WebSqlService, private tripDataService: TripDataService) {
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

    this.tripDataService.currentTrip.subscribe((trip) => {
      if (trip) {
        this.selectedTrip = trip;
        this.fillFormWithData(trip);
        this.isEditMode = true;

      }
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




  async addTrip() {
    const destination = this.tripForm.get('destination')?.value;
    const startDate = this.tripForm.get('startDate')?.value;
    const endDate = this.tripForm.get('endDate')?.value;
    const duration = parseInt(this.duration, 10) || 0;
    const budget = this.tripForm.get('budget')?.value;
    const notes = this.tripForm.get('notes')?.value;

    // // Add the trip
    // await this.webSqlService.addTrip(destination, startDate, endDate, duration, budget, notes);
    //
    // // Refresh the trips array
    // this.trips = await this.webSqlService.selectAll();
    //
    // // Notify the user and clear the form fields
    // alert('Trip added successfully!');
    // this.tripForm.reset();


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








    // if (this.selectedTrip) {
    //   // Update the trip
    //   const updatedTrip: Trip = {
    //     id: this.selectedTrip.id,
    //     destination,
    //     startDate,
    //     endDate,
    //     duration,
    //     budget,
    //     notes,
    //   };
    //   await this.webSqlService.updateTrip(updatedTrip);
    // } else {
    //   // Add the trip
    //   await this.webSqlService.addTrip(destination, startDate, endDate, duration, budget, notes);
    // }





  }


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




  // onSubmit() {
  //   if (this.tripForm.invalid) {
  //     this.tripForm.markAllAsTouched();
  //     return;
  //   }
  //
  //
  //   if (this.isEditMode) {
  //     this.updateTrip(this.selectedTrip);
  //   } else {
  //     this.addTrip();
  //   }
  //
  //   //this.addTrip();
  // }




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

    // Calculate and set the duration
    // const start = new Date(trip.startDate);
    // const end = new Date(trip.endDate);
    // this.duration = this.calculateDuration(start, end).toString();
  }


  // editTrip(trip: Trip) {
  //   this.selectedTrip = trip;
  //   this.tripForm.setValue({
  //     destination: trip.destination,
  //     startDate: trip.startDate,
  //     endDate: trip.endDate,
  //     budget: trip.budget,
  //     notes: trip.notes
  //   });
  //
  //
  //   this.isEditMode = true;
  //   this.fillFormWithData(trip);
  //
  // }
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
