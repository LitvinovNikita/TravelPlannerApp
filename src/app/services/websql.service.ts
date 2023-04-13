import { Injectable } from '@angular/core';
import { Destination } from '../interfaces/destination.interface';
@Injectable({
  providedIn: 'root',
})
export class WebSqlService {
  private db: any;

  constructor() {
    this.db = window.openDatabase('TravelPlannerApp', '1.0', 'Travel Planner App Database', 2 * 1024 * 1024);
    this.db.transaction((tx: any) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS destinations (id unique, name, description, image)');
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
}
