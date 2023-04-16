import {Component, OnInit, ViewChild} from '@angular/core';
import { WebSqlService } from '../services/websql.service';
import { Destination } from '../interfaces/destination.interface';
import {DestinationDetailsDialogComponent} from "../destination-details-dialog/destination-details-dialog.component";
import {Place} from "../interfaces/place.interface";



@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {
  @ViewChild('destinationDetailsDialog', { static: false }) destinationDetailsDialog!: DestinationDetailsDialogComponent;

  //public places: Place[] = [];
  places: Place[] = [];

  // destinationDetailsDialog: DestinationDetailsDialogComponent;
  destinations: Destination[] = [];
  currentPage: number;
  itemsPerPage: number;
  pagedDestinations: any[];

  //selectedDestination: Destination = {} as Destination;
  selectedDestination: Destination | null = null;
  searchItem: string = ''; // variable for search string in a search bar
  constructor(private webSqlService: WebSqlService) {
    this.currentPage = 1;
    this.itemsPerPage = 4;
    this.pagedDestinations = [];
  }

  async ngOnInit() {
    // Destinations
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

    //this.places = await this.webSqlService.fetchPlacesByDestinationId(destination.id);


    // Update pagedDestinations based on currentPage and itemsPerPage
    this.updatePagedDestinations();

    /**
     * Add places data into the table
     */
    await this.webSqlService.addPlacesData([
      {
        id: 1,
        destinationId: 1,
        name: 'New York',
        longDescription: 'The city that never sleeps. A bustling metropolis with iconic landmarks and cultural diversity. New York is home to the Statue of Liberty, a colossal statue on Liberty Island in New York Harbor, designed by Frédéric Bartholdi and dedicated on October 28, 1886.'
      },
      {
        id: 2,
        destinationId: 2,
        name: 'London',
        longDescription: 'A city with a rich history. From the Tower of London to Buckingham Palace, London is full of iconic landmarks and attractions. The city is also home to numerous museums and galleries, showcasing the best of British art and culture.'
      },
      {
        id: 3,
        destinationId: 3,
        name: 'Tokyo',
        longDescription: 'A perfect blend of tradition and modernity. Tokyo is a city where ancient temples and shrines coexist with neon-lit streets and cutting-edge technology. The city offers a unique blend of old and new, making it must-visit destination for travelers.'
      },
      {
        id: 4,
        destinationId: 4,
        name: 'Moscow',
        longDescription: 'Russia\'s historic and cultural core. Moscow is home to the iconic Red Square, the stunning St. Basil\'s Cathedral, and the historic Kremlin. The city is also known for its rich cultural heritage, with numerous museums, galleries, and theaters showcasing the best of Russian art and culture.'
      },
      {
        id: 5,
        destinationId: 5,
        name: 'Frankfurt on the Main',
        longDescription: 'Germany\'s bustling financial hub. Frankfurt is a city of contrasts, with a mix of old and new architecture. The city is home to the European Central Bank and the Frankfurt Stock Exchange, making it a key player in global finance.'
      },
      {
        id: 6,
        destinationId: 6,
        name: 'Barcelona',
        longDescription: 'Art and architecture paradise. Barcelona is known for its stunning architecture, including the famous works of Antoni Gaudi. The city is also home to numerous museums and galleries, showcasing the best of Catalan art and culture.'
      },
      {
        id: 7,
        destinationId: 7,
        name: 'Istanbul',
        longDescription: 'City of two continents with rich history and culture. Istanbul is a city where East meets West, with a rich cultural heritage spanning both Europe and Asia. The city is home to iconic landmarks such as the Hagia Sophia and the Blue Mosque, as well as bustling bazaars and vibrant neighborhoods.'
      },
      {
        id: 8,
        destinationId: 8,
        name: 'Rome',
        longDescription: 'Eternal city of history and culture. Rome is a city steeped in history and culture, with ancient ruins and landmarks around every corner. From the Colosseum to the Vatican, Rome is a must-visit destination for anyone interested in history and art.'
      },
      {
        id: 9,
        destinationId: 9,
        name: 'Paris',
        longDescription: 'City of Love and Lights. Paris is known for its romantic charm, stunning architecture, and world-class museums. The city is home to iconic landmarks such as the Eiffel Tower and the Louvre Museum, as well as charming neighborhoods and picturesque cafes.'
      },
      {
        id: 10,
        destinationId: 10,
        name: 'Rio de Janeiro',
        longDescription: 'City of samba, beaches, and Carnival. Rio de Janeiro is a vibrant city known for its stunning beachesand lively culture. It\'s famous for its annual Carnival festival, which features elaborate costumes, samba music, and parades. The city also has iconic landmarks such as the Christ the Redeemer statue and Sugarloaf Mountain, offering stunning panoramic views of the city.'
      },
      {
        id: 11,
        destinationId: 11,
        name: 'Dubai',
        longDescription: 'City of futuristic architecture and luxury. Dubai is a city that never ceases to amaze with its innovative architecture, luxurious shopping malls, and lavish hotels. It\'s also home to iconic landmarks such as the Burj Khalifa, the world\'s tallest building, and the Palm Jumeirah, an artificial island shaped like a palm tree.'
      },
      {
        id: 12,
        destinationId: 12,
        name: 'Sydney',
        longDescription: 'City of stunning beaches, iconic landmarks, and cultural diversity. Sydney is a cosmopolitan city known for its breathtaking harbor, stunning beaches, and iconic landmarks such as the Sydney Opera House and the Sydney Harbour Bridge. The city also has a rich cultural heritage, with numerous museums, galleries, and theaters showcasing the best of Australian art and culture.'
      }
    ])




  }
  /**
   * Updates the displayed destinations based on the current page and items per page.
   */
  updatePagedDestinations(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedDestinations = this.destinations.slice(startIndex, endIndex);
  }

  /**
   * Fetches the places for the specified destination ID.
   * @param destinationId - The ID of the destination to fetch places for.
   * @returns A Promise containing an array of places for the specified destination ID.
   */
  async fetchPlaces(destinationId: number): Promise<Place[]> {
    try {
      return await this.webSqlService.fetchPlacesByDestinationId(destinationId);
    } catch (error) {
      console.error('Error fetching places:', error);
      return [];
    }
  }


  /**
   * Displays the destination details dialog with the specified destination's information.
   * @param destination - The destination to display details for.
   */
  async viewDetails(destination: Destination) {
    try {
      const places = await this.webSqlService.fetchPlacesByDestinationId(destination.id);
      this.destinationDetailsDialog.places = places;
      this.destinationDetailsDialog.destination = destination; // Set the selected destination
      this.destinationDetailsDialog.openModal();
    } catch (error) {
      console.error('Error fetching places in viewDetails:', error);
    }
  }



  /**
   * Searches the list of destinations based on the search input.
   * If no search input is provided, the full list of destinations is displayed.
   */
  searchDestinations(): void {
      if (!this.searchItem) {
      this.updatePagedDestinations();
      return;
    }

    const filteredDestinations = this.destinations.filter(destination =>
      destination.name.toLowerCase().includes(this.searchItem.toLowerCase()) ||
      destination.description.toLowerCase().includes(this.searchItem.toLowerCase())
    );

    this.pagedDestinations = filteredDestinations.slice(0, this.itemsPerPage);
    this.currentPage = 1;
  }

  /**
   * Navigates to the specified page and updates the displayed destinations accordingly.
   * @param page - The page number to navigate to.
   */
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagedDestinations();
  }


}


