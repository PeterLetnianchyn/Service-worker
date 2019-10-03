import {Injectable} from '@angular/core';

import {Observable, Subject} from 'rxjs';
import {Post} from '../model/post.model';
import { openDB, deleteDB, wrap, unwrap } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IdbService {
private _dataChange: Subject<Post> = new Subject<Post>();
private _dbPromise;

constructor() {
}

/* connectToIDB() {
  this._dbPromise = openDB('pwa-database', 1, {
    upgrade(UpgradeDB) {
      if (!UpgradeDB.objectStoreNames.contains('Items')) {
        UpgradeDB.createObjectStore('Items', {keyPath: 'id', autoIncrement: true});
      }
      if (!UpgradeDB.objectStoreNames.contains('Sync-Items')) {
        UpgradeDB.createObjectStore('Sync-Items', {keyPath: 'id', autoIncrement: true});
      }
    }
  });
} */


addItems(target: string, value: Post) {
  this._dbPromise.then((db: any) => {
    const tx = db.transaction(target, 'readwrite');
    tx.objectStore(target).put({
    time: value.id,
    subject: value.title,
    location: value.body,
    description: value.userId
  });
  this.getAllData('Items').then((items: Post) => {
    this._dataChange.next(items);
  });
    return tx.complete;
  });
}

deleteItems(target: string, value: Post) {
  this._dbPromise.then((db: any) => {
    const tx = db.transaction(target, 'readwrite');
    const store = tx.objectStore(target);
    store.delete(value);
    this.getAllData(target).then((items: Post) => {
      this._dataChange.next(items);
    });
  return tx.complete;
  });
}

getAllData(target: string) {
  return this._dbPromise.then((db: any) => {
    const tx = db.transaction(target, 'readonly');
    const store = tx.objectStore(target);
    return store.getAll();
  });
}

dataChanged(): Observable<Post> {
    return this._dataChange;
  }
  }