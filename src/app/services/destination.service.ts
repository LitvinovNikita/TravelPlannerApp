import { Injectable } from '@angular/core';
import {Destination} from "../interfaces/destination.interface";

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor() { }

  openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("TravelPlannerApp", 1);

      request.onupgradeneeded = function (event: IDBVersionChangeEvent) {
        const db = (event.target as IDBRequest<IDBDatabase>).result;
        db.createObjectStore("destinations", { keyPath: "id" });
      };

      request.onsuccess = function (event: Event) {
        resolve((event.target as IDBRequest<IDBDatabase>).result);
      };

      request.onerror = function (event: Event) {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  async addDestinationData(destinations: Destination[]): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction("destinations", "readwrite");
    const store = transaction.objectStore("destinations");

    destinations.forEach(destination => {
      store.add(destination);
    });

    return new Promise((resolve, reject) => {
      transaction.oncomplete = function () {
        resolve();
      };

      transaction.onerror = function (event: Event) {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  async fetchDestinations(): Promise<Destination[]> {
    const db = await this.openDatabase();
    const transaction = db.transaction("destinations", "readonly");
    const store = transaction.objectStore("destinations");

    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = function (event: Event) {
        resolve((event.target as IDBRequest<Destination[]>).result);
      };

      request.onerror = function (event: Event) {
        reject((event.target as IDBRequest).error);
      };
    });
  }
}
