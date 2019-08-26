import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Organization} from '../organization';

@Component({
  selector: 'app-buyer-org-select',
  templateUrl: './buyer-org-select.component.html',
  styleUrls: ['./buyer-org-select.component.scss']
})
export class BuyerOrgSelectComponent implements OnInit {

  @Input() organizations: Organization[] = [];
  @Output() orgSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  onOrgSelected(orgId) {
    this.orgSelected.emit(orgId);
  }

}
