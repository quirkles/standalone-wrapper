import { Component, OnInit, Input } from '@angular/core';
import { PreferencesFromServer} from '../preferenceDetails';

@Component({
  selector: 'app-preferences-wrapper',
  templateUrl: './preferences-wrapper.component.html',
  styleUrls: ['./preferences-wrapper.component.scss']
})


export class PreferencesWrapperComponent implements OnInit {

  @Input() preferencesFromServer: PreferencesFromServer;

  constructor() { }



  ngOnInit() {
  }

}
