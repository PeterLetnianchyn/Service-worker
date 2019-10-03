import { Component } from '@angular/core';
import { PostService } from './post.service';
import { Observable } from 'rxjs';
import { Post } from './model/post.model';
import { IdbService } from './services/idb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'worker';
  posts: Post[];
  constructor( private postService: PostService, private idbService: IdbService){
    this.idbService.connectToIDB();
    
  }

  ngOnInit(): void {
  this.postService.getPosts().subscribe((posts) => {
    this.posts = posts;

  })
   /* const dbOpen = indexedDB.open('posts', 2) */
   /* const db = dbOpen.result; */
  }
  addPosts(){
    const request = indexedDB.open('Ne-posts', 2);

    request.onerror = (event) => {
  // Handle errors.
};
request.onupgradeneeded = (event) => {
  const db = request.result;
  const objectStore = db.createObjectStore("posts", { keyPath: "id" });

  objectStore.createIndex("userId", "eusrId", { unique: true });
  objectStore.createIndex("title", "title", { unique: true });
  objectStore.createIndex("body", "body", { unique: true });
  for (const i in this.posts) {
    objectStore.add(this.posts[i]);
    
  }
};
  }
}
