import {Component, OnInit, Inject, OnChanges} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import { AppSettings, APP_SETTINGS } from '../shared/app-settings';

import { SelectComponent } from '../shared/ui-select/select.component';
import { OptionComponent } from '../shared/ui-select/option.component';

@Component({
  templateUrl: 'app/select-tester/select-tester.component.html',
  directives: [ SelectComponent, OptionComponent ],
})

export class SelectTesterComponent implements OnInit {
  private _items = [
    { value: 1, text: "one" },
    { value: 2, text: "two" },
    { value: 3, text: "three" }
  ];
  
  private _selectedValues = [1,2];

  constructor( @Inject(APP_SETTINGS) private appSettings: AppSettings) {
  }

  public ngOnInit() {
  }
}