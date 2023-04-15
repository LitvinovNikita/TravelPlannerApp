import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trip } from '../interfaces/trip.interface';
import { WebSqlService } from '../services/websql.service';
@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.css']
})
export class TripPlannerComponent {
  tripForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private webSqlService: WebSqlService) {
    this.tripForm = this.formBuilder.group({
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.tripForm.invalid) {
      return;
    }

    const trip: Trip = {
      destination: this.tripForm.value.destination,
      startDate: this.tripForm.value.startDate,
      endDate: this.tripForm.value.endDate,
      budget: this.tripForm.value.budget
    };

    //   this.webSqlService.addTripData(trip)
    //     .then(() => {
    //       this.tripForm.reset();
    //       // TODO: display success message
    //       alert("Trip is added successfully")
    //     })
    //     .catch((error: any) => {
    //       console.error(error);
    //       alert("Error" + error);
    //     });
    // }
  }
}
