import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BuyerOrgSelectComponent} from './buyer-org-select.component';
import {GetDropdownOptionsPipe} from '../dropdown/getOptions.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {StandaloneDropdownComponent} from '../dropdown/dropdown.standalone.component';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Option} from '../dropdown/option';
import {By} from '@angular/platform-browser';

describe('BuyerOrgSelectComponent', () => {
  let component: BuyerOrgSelectComponent;
  let fixture: ComponentFixture<BuyerOrgSelectComponent>;

  @Component({
    selector: 'app-dropdown',
    template: `
      <div>Test app dropdown</div>`
  })
  class TestAppDropdownComponent {
    @Input() options: Option[];
    @Output() selectEvent = new EventEmitter<any>();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BuyerOrgSelectComponent,
        GetDropdownOptionsPipe,
        TestAppDropdownComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerOrgSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use getDropdownOptions to map org to options ', () => {
    component.organizations = [{
      'id': '4e2f0189-036e-4ac9-b65f-c97a2967f62e',
      'originId': '9515',
      'name': 'crescendoing-unperfection'
    }];
    fixture.detectChanges();
    const ddInstance = fixture.debugElement.query(By.directive(TestAppDropdownComponent)).componentInstance;
    expect(ddInstance.options).toEqual([{text: 'crescendoing-unperfection', value: '4e2f0189-036e-4ac9-b65f-c97a2967f62e'}]);
  });

  it('should fire onOrgSelected method when dropdown emits selectEvent', () => {
    const onOrgSelectedSpy = spyOn(fixture.componentInstance, 'onOrgSelected').and.callThrough();
    const orgSelectedEmitterSpy = spyOn(fixture.componentInstance.orgSelected, 'emit');
    const ddInstance = fixture.debugElement.query(By.directive(TestAppDropdownComponent)).componentInstance;
    ddInstance.selectEvent.emit('the-selected-id');
    expect(onOrgSelectedSpy).toHaveBeenCalledWith('the-selected-id');
    expect(orgSelectedEmitterSpy).toHaveBeenCalledWith('the-selected-id');
  });
});
