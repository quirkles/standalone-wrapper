import {Component, Input, ContentChild, AfterContentInit, EventEmitter, Output, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {DebugEvent} from './event-list/debugEvent';
import {COMPONENT_MOUNTED, COMPONENT_EMITTED_EVENT} from './event-list/eventTypes';
import {StandaloneWrapperController} from './standaloneWrapperController';

@Component({
  selector: 'app-standalone-wrapper',
  templateUrl: './standalone-wrapper.component.html',
  styleUrls: ['./standalone-wrapper.component.scss']
})
export class StandaloneWrapperComponent implements AfterContentInit {

  @ContentChild('targetComponent') child: Component;
  @ViewChild('propForm') propForm;

  @Output() mountComponentClicked = new EventEmitter<object>();
  @Input() controller: StandaloneWrapperController;

  keys = Object.keys;

  showDebugPane = true;
  eventStream: DebugEvent[] = [];

  constructor() {
  }

  // ngInit() {
  //   this.propForm.form.valueChanges.subscribe((change) => {
  //     Object.entries(change).forEach(([key, newVal]) => {
  //       this.eventStream.push(new DebugEvent({
  //         type: COMPONENT_PROP_CHANGED,
  //         component: this.child,
  //         propName: key,
  //         newVal,
  //       }));
  //     });
  //   });
  // }

  ngAfterContentInit() {
    this.eventStream.push(new DebugEvent({
      type: COMPONENT_MOUNTED,
      component: this.child
    }));

    this.controller.outputs.forEach(outputName =>
      this.child[outputName].subscribe(eventPayload => {
        this.eventStream.push(new DebugEvent({
          type: COMPONENT_EMITTED_EVENT,
          component: this.child,
          eventName: outputName,
          eventPayload
        }));
        console.log(`${this.child.constructor.name} fired event: ${outputName} with payload:`, eventPayload);
      })
    );
  }

  toggleDebugPane(): void {
    this.showDebugPane = !this.showDebugPane;
  }

  onMountComponentClicked(): void {
    const data = this.controller.getData();
    this.mountComponentClicked.emit(data);
    this.eventStream.push(new DebugEvent({
      type: COMPONENT_MOUNTED,
      component: this.child
    }));
    console.log(`${this.child.constructor.name} mounted with data: `, data);
  }

  generateDataClicked() {
    this.controller.generateData();
  }

  onLogEventStreamClicked(): void {
    console.log(this.eventStream.map(e => e.toJson()));
  }
}
