import { Component, OnInit } from '@angular/core';
import { WebSqlService } from '../services/websql.service';
import { Destination } from '../interfaces/destination.interface';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {
  destinations: Destination[] = [];
  currentPage: number;
  itemsPerPage: number;
  pagedDestinations: any[];

  constructor(private webSqlService: WebSqlService) {
    this.currentPage = 1;
    this.itemsPerPage = 4;
    this.pagedDestinations = [];
  }

  async ngOnInit() {
    // Add sample destinations data, if needed
    await this.webSqlService.addDestinationData([
      {
        id: 1,
        name: 'New York',
        description: 'The city that never sleeps.',
        image: 'assets/images/new-york.jpg'
      },
      {
        id: 2,
        name: 'London',
        description: 'A city with a rich history.',
        image: 'assets/images/london.jpg'
      },
      {
        id: 3,
        name: 'Tokyo',
        description: 'A perfect blend of tradition and modernity.',
        image: 'assets/images/tokyo.jpg'
      },
      {
        id: 4,
        name: 'Moscow',
        description: 'Russia\'s historic and cultural core.',
        image: 'assets/images/moscow.jpg'
      },
      {
        id: 5,
        name: 'Frankfurt on the Main',
        description: 'Germany\'s bustling financial hub.',
        image: 'assets/images/frankfurt.jpg'
      },
      {
        id: 6,
        name: 'Barcelona',
        description: 'Art and architecture paradise.',
        image: 'assets/images/barcelona.jpg'
      },
      {
        id: 7,
        name: 'Istanbul',
        description: 'City of two continents with rich history and culture.',
        image: 'assets/images/istanbul.jpg'
      },
      {
        id: 8,
        name: 'Rome',
        description: 'Eternal city of history and culture.',
        image: 'assets/images/rome.jpg'
      },
      {
        id: 9,
        name: 'Paris',
        description: 'City of Love and Lights',
        image: 'assets/images/paris.jpg'
      },
      {
        id: 10,
        name: 'Rio de Janeiro',
        description: 'City of samba, beaches, and Carnival.',
        image: 'assets/images/rio.jpg'
      },
      {
        id: 11,
        name: 'Dubai',
        description: 'City of futuristic architecture and luxury.',
        image: 'assets/images/dubai.jpg'
      },
      {
        id: 12,
        name: 'Sydney',
        description: 'City of stunning beaches, iconic landmarks, and cultural diversity.',
        image: 'assets/images/sydney.jpg'
      },
    ]);

    // Fetch destinations from the WebSQL database
    this.destinations = await this.webSqlService.fetchDestinations();
    console.log('Fetched destination', this.destinations)


    // Update pagedDestinations based on currentPage and itemsPerPage
    this.updatePagedDestinations();
  }

  updatePagedDestinations(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedDestinations = this.destinations.slice(startIndex, endIndex);
  }
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagedDestinations();
  }
}
