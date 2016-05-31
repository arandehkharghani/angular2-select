import { ElementRef, provide } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { SelectTesterComponent } from './select-tester/select-tester.component';

import { APPSETTINGS, APP_SETTINGS } from './shared/app-settings';


@Component({
    selector: 'my-app',
    template: `
    <div *ngIf='_isReady'>
        <h1 class="title">Select Component</h1>
    
        <nav>
        <a [routerLink]="['SelectTester']">Select Tester</a>
    
        </nav>
    
        <router-outlet></router-outlet>
    </div>
  `,
    providers: 
    [
        provide(APP_SETTINGS, { useValue: APPSETTINGS }),                
    ]
    ,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/select-tester', name: 'SelectTester', component: SelectTesterComponent },
])

export class AppComponent {
    private _isReady: boolean = true;
    
    constructor() {        
    }
}
