import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Place } from '../interfaces/place.interface';
import {Destination} from "../interfaces/destination.interface";

@Component({
  selector: 'app-destination-details-dialog',
  templateUrl: './destination-details-dialog.component.html',
  styleUrls: ['./destination-details-dialog.component.css']
})
export class DestinationDetailsDialogComponent implements OnInit {
  //@Input() places: Place[] = [];
  @ViewChild('modal', { static: false }) modal!: ElementRef;
  destination: Destination | null = null;
  places: Place[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.modal.nativeElement.style.display = 'block';
  }
  closeModal(): void {
    this.modal.nativeElement.classList.remove('show');
    this.modal.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
}





























// import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
// import {Destination} from "../interfaces/destination.interface";
// import { Router } from '@angular/router';
// import {WebSqlService} from "../services/websql.service";
// import { Place } from '../interfaces/place.interface';
// declare var $: any;
// import * as bootstrap from 'bootstrap';
//
// @Component({
//   selector: 'app-destination-details-dialog',
//   templateUrl: './destination-details-dialog.component.html',
//   styleUrls: ['./destination-details-dialog.component.css']
// })
// export class DestinationDetailsDialogComponent implements OnInit{
//   //@Input() destination: Destination = {} as Destination;
//   //@Output() closeModal = new EventEmitter<void>();
//   @Input() destination: Destination | null = null;
//   @Input() places: any[] = [];
//
//  // @ViewChild('detailsModal', { static: false }) detailsModal!: ElementRef;
//   @ViewChild('modal') modal!: ElementRef;
//
//   //places: Place[] = [];
//
//   constructor(private router: Router, private renderer: Renderer2, private el: ElementRef, private webSqlService: WebSqlService) { }
//
//   // ngOnInit(): void {
//   //   //this.openModal();
//   //   if (this.destination) {
//   //     this.openDestinationDetailsDialog(this.destination.id);
//   //     this.fetchPlaces(this.destination.id);
//   //   }
//   // }
//
//   // ngOnInit(): void {
//   //
//   //   // if (this.destination) {
//   //   //   this.fetchPlaces(this.destination.id);
//   //   // }
//   // }
//
//   // ngAfterViewInit(): void {
//   //   console.log('detailsModal:', this.detailsModal);
//   //   console.log('detailsModal:', this.detailsModal);
//   //   if (this.destination) {
//   //     this.openDestinationDetailsDialog(this.destination.id);
//   //   }
//   // }
//
//   // ngAfterViewInit(): void {
//   //   setTimeout(() => {
//   //     this.openDestinationDetailsDialog();
//   //   }, 0);
//   // }
//
//   // fetchPlaces(destinationId: number) {
//   //   console.log('Fetching places for destination ID:', destinationId);
//   //   this.webSqlService.fetchPlacesByDestinationId(destinationId).then(places => {
//   //     console.log('Fetched places:', places);
//   //     this.places = places;
//   //   }).catch(error => {
//   //     console.error('Error fetching places:', error);
//   //   });
//   // }
//
//   // async fetchPlaces(destinationId: number): Promise<void> {
//   //   try {
//   //     this.places = await this.webSqlService.fetchPlacesByDestinationId(destinationId);
//   //   } catch (error) {
//   //     console.error('Error fetching places:', error);
//   //     this.places = [];
//   //   }
//   // }
//
//   // openModal(): void {
//   //   const modal = this.el.nativeElement.querySelector('#destinationDetailsModal');
//   //   this.renderer.addClass(modal, 'show');
//   //   this.renderer.setStyle(modal, 'display', 'block');
//   //   this.renderer.setStyle(modal, 'padding-right', '16px');
//   //   this.renderer.addClass(document.body, 'modal-open');
//   // }
//
//   // openDestinationDetailsDialog(destinationId?: number): void {
//   //   if (!destinationId && this.destination) {
//   //     destinationId = this.destination.id;
//   //   }
//   //   this.showModal();
//   // }
//
//   openDestinationDetailsDialog(destination: any): void {
//     this.destination = destination;
//     this.modal.nativeElement.style.display = 'block';
//   }
//
//   // showModal() {
//   //   console.log('detailsModal:', this.detailsModal);
//   //   if (this.detailsModal) {
//   //     //const modal = new bootstrap.Modal(this.detailsModal.nativeElement, {});
//   //     //modal.show();
//   //     this.renderer.addClass(this.detailsModal.nativeElement, 'show');
//   //     this.renderer.setStyle(this.detailsModal.nativeElement, 'display', 'block');
//   //     this.renderer.setStyle(this.detailsModal.nativeElement, 'padding-right', '16px');
//   //     this.renderer.addClass(document.body, 'modal-open');
//   //
//   //
//   //   } else {
//   //     console.error('detailsModal is not defined');
//   //   }
//   // }
//
//
//   // closeModal(): void {
//   //   const modal = this.el.nativeElement.querySelector('#destinationDetailsModal');
//   //   this.renderer.removeClass(modal, 'show');
//   //   this.renderer.setStyle(modal, 'display', 'none');
//   //   this.renderer.setStyle(modal, 'padding-right', '');
//   //   this.renderer.removeClass(document.body, 'modal-open');
//   // }
//   // showModal(): void {
//   //   this.modal.nativeElement.style.display = 'block';
//   // }
//   showModal(destination: any): void {
//     // this.destinationDetailsDialog.destination = destination;
//     // this.destinationDetailsDialog.modal.nativeElement.style.display = 'block';
//   }
//
//   closeModal(): void {
//     this.modal.nativeElement.style.display = 'none';
//   }
//
//   addToTripPlan(): void {
//     // Save the selected destination to WebSQL here
//     // Navigate to the trip plan page
//     this.router.navigate(['/trip-planner']);
//   }
// }
