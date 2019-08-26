import { Component, OnInit } from '@angular/core';

import {Option} from './option';
import {FormControl, FormGroup} from '@angular/forms';
import {generateRandomString} from '../utils/string';


const generateOptions = (options): Option[] => {
  const {
    minTextLength,
    maxTextLength,
    includeNonAlphanumericCharacters,
  } = options;
  return Array
    .from({ length: options.optionCount })
    .map(() => {
      const str = generateRandomString(
        minTextLength,
        maxTextLength,
        includeNonAlphanumericCharacters
      );
      return { value: str, text: str };
    });
};

@Component({
  selector: 'app-standalone-app-dropdown',
  templateUrl: './dropdown.standalone.component.html',
})
export class StandaloneDropdownComponent implements OnInit {

  options: Option[];
  customOptions: any[] = [];
  useAutoGenerateSettings = new FormControl(true);
  autoGenerateSettings = new FormGroup({
    optionCount:  new FormControl(10),
    minTextLength:  new FormControl(5),
    maxTextLength:  new FormControl(20),
    includeNonAlphanumericCharacters:  new FormControl(true)
  });
  customElement = new FormGroup({
    text:  new FormControl(''),
    value:  new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
    this.setOptions();
  }

  setOptions() {
    this.options = this.useAutoGenerateSettings.value ?
      generateOptions(this.autoGenerateSettings.value) :
      this.customOptions;
  }

  addUserDefinedOption() {
    this.customOptions.push({
      ...this.customElement.value,
      id: `${Date.now()}`
    });
    this.customElement.reset();
  }

  removeCustomOption(idToRemove) {
    this.customOptions = this.customOptions.filter(({ id }) => id !== idToRemove);
  }

  onSelect(value: string): void {
    console.log(value);
  }
}
