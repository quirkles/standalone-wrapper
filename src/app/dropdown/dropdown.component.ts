import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { Option } from './option';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnInit {

  @Input() options: Option[];
  @Output() selectEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSelect(value: string): void {
    this.selectEvent.emit(value);
  }
}
