import { Directive, HostBinding, HostListener, Output, EventEmitter } from 'angular2/core';

import { ClickTracking } from './click-tracker.enum';
@Directive({
    selector: '[myClickTracker]',
})

/**
 * this directive tracks the click event of the host component and document and informs the component whether the click event was triggered inside or outside
 */

export class ClickTrackerDirective {
    private _hostEventRef: any;

    @Output() clickTracked: EventEmitter<ClickTracking> = new EventEmitter();

    @HostListener('click', ['$event.target']) onClick(ev) {        
        this._hostEventRef = ev;
    }

    @HostListener('document:click', ['$event.target']) onDocumentClick(ev) {
        if (this._hostEventRef === ev) {
            this.clickTracked.emit(ClickTracking.inside);
        }
        else{
            this.clickTracked.emit(ClickTracking.outside);        
        }
    }

    constructor() { }
}