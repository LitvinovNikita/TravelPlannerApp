import { Injectable } from '@angular/core';
import { Destination } from '../interfaces/destination.interface';
import {Place} from "../interfaces/place.interface";

@Injectable({
  providedIn: 'root',
})
export class WebSqlService {
  private db: any;

  constructor() {
    this.db = window.openDatabase('TravelPlannerApp', '1.0', 'Travel Planner App Database', 2 * 1024 * 1024);
    this.createTables(); // Call createTables method
  }

  private createTables() {
    this.db.transaction((tx: any) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS destinations (id INTEGER PRIMARY KEY, name TEXT, description TEXT, image TEXT)',
        []
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY,
        destinationId INTEGER,
        name TEXT,
        longDescription TEXT,
        FOREIGN KEY (destinationId) REFERENCES destinations (id) ON DELETE CASCADE
      )`,
        []
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS trips (
        id INTEGER PRIMARY KEY,
        destination TEXT,
        startDate DATE,
        endDate DATE,
        duration INTEGER NOT NULL,
        budget REAL,
        notes TEXT
      )`,
        []
      );

    });
  }
  addDestinationData(destinations: Destination[]): Promise<void> {
    // const tx = this.db.transaction('destinations', 'readwrite');
    // const store = tx.objectStore('destinations');
    //
    // // Check if data already exists
    // const count = await store.count().toPromise();
    // if (count > 0) {
    //   // Data already exists, so don't add it again
    //   return;
    // }
    //
    // // If data doesn't exist, add it to the store
    // destinations.forEach((destination) => {
    //   store.add(destination);
    // });
    //
    // await tx.done;

    return new Promise((resolve, reject) => {
      this.db.transaction((tx: any) => {
          destinations.forEach((destination) => {
            tx.executeSql(
              'SELECT * FROM destinations WHERE id = ?',
              [destination.id],
              (tx: any, results: any) => {
                if (results.rows.length === 0) {
                  tx.executeSql(
                    'INSERT INTO destinations (id, name, description, image) VALUES (?, ?, ?, ?)',
                    [destination.id, destination.name, destination.description, destination.image]
                  );
                }
              }
            );
          });
        },
        (error: any) => {
          console.error('Error in addDestinationData:', error);
          reject(error);
        },
        () => {
          resolve();
        });
    });
  }
  fetchDestinations(): Promise<Destination[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: any) => {
          tx.executeSql('SELECT * FROM destinations', [], (tx: any, results: any) => {
            let destinations: Destination[] = [];
            for (let i = 0; i < results.rows.length; i++) {
              destinations.push(results.rows.item(i));
            }
            resolve(destinations);
          });
        },
        (error: any) => {
          reject(error);
        });
    });
  }

  addPlacesData(places: Place[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: any) => {
          places.forEach((place) => {
            tx.executeSql(
              'SELECT * FROM places WHERE id = ?',
              [place.id],
              (tx: any, results: any) => {
                if (results.rows.length === 0) {
                  tx.executeSql(
                    'INSERT INTO places (id, destinationId, name, longDescription) VALUES (?, ?, ?, ?)',
                    [place.id, place.destinationId, place.name, place.longDescription]
                  );
                }
              }
            );
          });
        },
        (error: any) => {
          console.error('Error in addPlacesData:', error);
          reject(error);
        },
        () => {
          resolve();
        });
    });
  }

  fetchPlacesByDestinationId(destinationId: number): Promise<Place[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: any) => {
          const sql = 'SELECT * FROM places WHERE destinationId = ?';
          tx.executeSql(sql, [destinationId], (tx: any, results: any) => {
            console.log('Executed SQL:', sql);
            console.log('SQL Query Params:', [destinationId]);
            console.log('SQL Results:', results);

            let places: Place[] = [];
            for (let i = 0; i < results.rows.length; i++) {
              places.push(results.rows.item(i));
            }
            resolve(places);
          });
        },
        (error: any) => {
          reject(error);
        });
    });
  }


  //TRIPS
  // async addTrip(trip: any): Promise<number> {
  //   return new Promise((resolve, reject) => {
  //     this.db.transaction((tx: any) => {
  //       tx.executeSql(
  //         'INSERT INTO trips (destination, startDate, endDate, budget, notes) VALUES (?, ?, ?, ?, ?)',
  //         [trip.destination, trip.startDate, trip.endDate, trip.budget, trip.notes],
  //         (tx: any, results: any) => {
  //           resolve(results.insertId);
  //         }
  //       );
  //     }, (error: any) => {
  //       reject(error);
  //     });
  //   });
  // }
  async addTrip(destination: string, startDate: string, endDate: string, duration: number, budget: number, notes: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: any) => {
        const sql = 'INSERT INTO trips (destination, startDate, endDate, duration, budget, notes) VALUES (?, ?, ?, ?, ?, ?)';
        tx.executeSql(
          sql,
          [destination, startDate, endDate, duration, budget, notes],
          () => {
            resolve();
          },
          (error: any) => {
            console.error('Error in addTrip:', error);
            reject(error);
          }
        );
      });
    });
  }

  async updateTrip(trip: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: any) => {
        tx.executeSql(
          'UPDATE trips SET destination = ?, startDate = ?, endDate = ?, duration = ?, budget = ?, notes = ? WHERE id = ?',
          [trip.destination, trip.startDate, trip.endDate, trip.duration, trip.budget, trip.notes, trip.id]
        );
      }, (error: any) => {
        reject(error);
      }, () => {
        resolve();
      });
    });
  }
  async selectTrip(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: any) => {
        tx.executeSql('SELECT * FROM trips WHERE id = ?', [id], (tx: any, results: any) => {
          if (results.rows.length > 0) {
            resolve(results.rows.item(0));
          } else {
            resolve(null);
          }
        });
      }, (error: any) => {
        reject(error);
      });
    });
  }

  async selectAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: any) => {
        tx.executeSql('SELECT * FROM trips', [], (tx: any, results: any) => {
          let trips: any[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            trips.push(results.rows.item(i));
          }
          resolve(trips);
        });
      }, (error: any) => {
        reject(error);
      });
    });
  }

  async deleteTrip(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: any) => {
        tx.executeSql('DELETE FROM trips WHERE id = ?', [id]);
      }, (error: any) => {
        reject(error);
      }, () => {
        resolve();
      });
    });
  }







}



