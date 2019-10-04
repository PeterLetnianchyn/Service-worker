import { Component } from '@angular/core';
import { PostService } from './post.service';
import { Observable } from 'rxjs';
import { Post } from './model/post.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ConnectionService } from 'ng-connection-service';
import { User } from '../app/model/User.model';
import { IdbService } from './services/idb.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'worker';
  posts: Post[];
  status = 'ONLINE';
  usersColection: AngularFirestoreCollection<User>;
  users$: User[];
  snapshot: any;
  isConnected: Boolean;
  constructor( private postService: PostService,
               private indexService: IdbService,
               private afs: AngularFirestore,
               private connectionService: ConnectionService
    ){
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
      }
      else {
        this.status = "OFFLINE";
      }
      })    
      this.postService.getPosts().subscribe((posts) => {
    this.posts = posts;
    
}
    );
    this.usersColection = this.afs.collection('users');
    this.usersColection.valueChanges().subscribe((user) => {
      this.users$ = user
    })  
    
     
  }

  ngOnInit(): void {    

  }
  addPosts(){
    const request = indexedDB.open('Ne-posts', 2);

    request.onerror = (event) => {
};
request.onupgradeneeded = (event) => {
  const db = request.result;
  const objectStore = db.createObjectStore("posts", { keyPath: "id" });
  objectStore.createIndex("title", "title", { unique: true });
  objectStore.createIndex("body", "body", { unique: true });
  for (const i in this.posts) {
    objectStore.add(this.posts[i]);
    
  }
};
  }
  addUsers(){
    const request = indexedDB.open('SomeDb', 2);

    request.onerror = (event) => {
};
request.onupgradeneeded = (event) => {
  const db = request.result;
  const objectStore = db.createObjectStore("user", { keyPath: "id" });

  objectStore.createIndex("name", "name", { unique: true });
  objectStore.createIndex("age", "age", { unique: true });
  for (const i in this.users$) {
    objectStore.add(this.users$[i]);
    
  }
};
  }
deleteDb(){
const DBDeleteRequest = indexedDB.deleteDatabase("SomeDb");

DBDeleteRequest.onerror = function(event) {
  console.log("Error deleting database.");
};
 
DBDeleteRequest.onsuccess = function(event) {
  console.log("Database deleted successfully");
    
};
}
}
