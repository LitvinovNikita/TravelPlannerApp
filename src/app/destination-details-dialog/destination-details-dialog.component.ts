import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Destination} from "../interfaces/destination.interface";
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-destination-details-dialog',
  templateUrl: './destination-details-dialog.component.html',
  styleUrls: ['./destination-details-dialog.component.css']
})
export class DestinationDetailsDialogComponent implements OnInit{
  //@Input() destination: Destination = {} as Destination;
  @Input() destination: Destination | null = null;
  //@Output() closeModal = new EventEmitter<void>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openModal(): void {
    $('#destinationDetailsModal').modal('show');
  }

  addToTripPlan(): void {
    // Save the selected destination to WebSQL here
    // Navigate to the trip plan page
    this.router.navigate(['/trip-planner']);
  }
}
