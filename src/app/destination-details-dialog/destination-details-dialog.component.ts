import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
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

  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
  }

  openModal(): void {
    const modal = this.el.nativeElement.querySelector('#destinationDetailsModal');
    this.renderer.addClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'block');
    this.renderer.setStyle(modal, 'padding-right', '16px');
    this.renderer.addClass(document.body, 'modal-open');
  }
  closeModal(): void {
    const modal = this.el.nativeElement.querySelector('#destinationDetailsModal');
    this.renderer.removeClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'none');
    this.renderer.setStyle(modal, 'padding-right', '');
    this.renderer.removeClass(document.body, 'modal-open');
  }

  addToTripPlan(): void {
    // Save the selected destination to WebSQL here
    // Navigate to the trip plan page
    this.router.navigate(['/trip-planner']);
  }
}
