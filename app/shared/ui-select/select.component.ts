import { Component, ChangeDetectorRef, Input, Output, ChangeDetectionStrategy, OnInit, OnChanges, EventEmitter } from 'angular2/core';
import { ControlValueAccessor, NgControl } from 'angular2/common';
import { ContentChildren, QueryList } from 'angular2/core';
import { AfterContentInit, AfterViewInit, AfterViewChecked } from 'angular2/core';

import { OptionComponent } from './option.component';
import { FilterByEqualPipe } from '../query-modifiers/filter-by-equal.pipe';
import { ClickTrackerDirective } from '../ui-click-tracker/click-tracker.directive';
import { ClickTracking } from '../ui-click-tracker/click-tracker.enum';

@Component({
    selector: 'my-select',
    templateUrl: 'app/shared/ui-select/select.component.html',
    styleUrls: ['app/shared/ui-select/select.component.css'],
    pipes: [FilterByEqualPipe],
    directives: [ClickTrackerDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SelectComponent implements AfterViewInit, AfterContentInit, AfterViewChecked{ //, ControlValueAccessor 
    @Input() selectedValues: any[] = [];
    @Output() changedselectedValues = new EventEmitter();

    @ContentChildren(OptionComponent) options: QueryList<OptionComponent>;

    //private _selectedValues: any[] = [];
    private _isDropHidden: boolean = true;
    private _searchText: string;

    //private onChange = (_: any[]) => { };
    //private onTouched = () => { };

    constructor(private _cdr: ChangeDetectorRef) { //, private _ngControl: NgControl
      //  if (_ngControl) {
       //     this._ngControl.valueAccessor = this;
        //}
    }

/*
    public registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    public writeValue(value?: any[]) {
        if (value != null && value != undefined) {
            this.selectedValues = value;
        }
    }
*/
    public ngAfterViewInit() {
    }

    public ngAfterViewChecked() {

    }

    public ngAfterContentInit() {
        let localOptionsRef = this.options.toArray();
        for (let option of this.options.toArray()) {
            if (this.selectedValues) {
                option.selected = this.selectedValues.indexOf(option.value) > -1;
                option.selectedOption.subscribe((res: OptionComponent) => {
                    this.selectedValues.push(res.value);
                    this.changedselectedValues.emit(this.selectedValues);
                    //this.onChange(this.selectedValues);
                });
            }
        }
    }

    private onRemoveClicked(option: OptionComponent) {
        option.selected = false;
        this.selectedValues.splice(this.selectedValues.indexOf(option.value), 1);
        this.changedselectedValues.emit(this.selectedValues);
        //this.onChange(this.selectedValues);
    }

    private onClickTrackedForInput(en: ClickTracking) {
        switch (en) {
            case ClickTracking.outside:
                this._isDropHidden = true;
                this._searchText = '';
                break;
            case ClickTracking.inside:
                this.options.toArray().forEach(item => item.isHidden = false);
                this._isDropHidden = false;
                break;
            default:
                break;
        }
    }

    private onSearchTextChanged(searchText) {
        let filtered = this.options.toArray().forEach(item => {
            item.isHidden = !(new RegExp(searchText).test(item.displayText));
        });
    }
}