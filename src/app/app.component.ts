import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<nav>
               <a routerLink="/posts/1">Posts</a>
             </nav>
             <div>
               <router-outlet></router-outlet>
             </div>`,
  styles: []
})
export class AppComponent {

}
