import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from 'angular2/core';

@Component({
    selector: 'my-option',
    template: `
    <li *ngIf = '!_isHidden' class='drop highlighted' [class.selected]='selected' (click) = 'onItemSelected()'>{{displayText}}
    `,
    styleUrls: ['app/shared/ui-select/option.component.css'],    
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent implements OnInit, AfterViewInit {
    @Input() value: any;
    @Input() displayText: string;    
    @Output() selectedOption = new EventEmitter();
    
    public set selected(val: boolean) {
        this._selected = val;                
    }    
    
    public get selected() { return this._selected }

    public set isHidden(val: boolean) {
        this._isHidden = val;        
       this._cdr.markForCheck();
    }    
    
    public get isHidden() { return this._isHidden }

    private _selected: boolean = false;
    @Input() _isHidden:boolean = true;
    
    constructor(private _cdr: ChangeDetectorRef) {
    }

    public ngAfterViewInit() {
    }

    public ngOnInit() {
    }

    public doCheck(){
        
    }
    private onItemSelected() {
        if (this.selected) {
            // the item is selected so do nothing
            return;
        }
        this.selected = true;
        this.selectedOption.emit(this);
    }    
}