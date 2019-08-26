import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import { DropdownComponent } from './dropdown.component';
import { StandaloneDropdownComponent } from './dropdown.standalone.component';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {GetDropdownOptionsPipe} from './getOptions.pipe';

describe('DropdownComponent', () => {
  let dropdownComponent: DropdownComponent;
  let hostFixture: ComponentFixture<StandaloneDropdownComponent>;
  let dropdownDebugElement: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DropdownComponent,
        StandaloneDropdownComponent,
        GetDropdownOptionsPipe
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(StandaloneDropdownComponent);
    dropdownDebugElement = hostFixture.debugElement.query(By.directive(DropdownComponent));
    dropdownComponent = dropdownDebugElement.componentInstance;
  });

  it('should create', () => {
    expect(dropdownComponent).toBeTruthy();
    hostFixture.detectChanges();
  });

  it('should render all options with the correct text and value', () => {
    hostFixture.componentInstance.setOptions();
    hostFixture.detectChanges();
    const options = hostFixture.componentInstance.options;
    const hostSettings = hostFixture.componentInstance.autoGenerateSettings.value;
    const htmlOptions = hostFixture.debugElement.query(By.directive(DropdownComponent)).queryAll(By.css('option'));
    expect(htmlOptions.length).toBe(hostSettings.optionCount);
    options.forEach(({text, value}, i) => {
      expect(htmlOptions[i].nativeElement.value).toBe(value);
      expect(htmlOptions[i].nativeElement.text).toBe(text);
    });
  });

  it('should render many options with the correct text and value', () => {
    hostFixture.componentInstance.autoGenerateSettings.patchValue({optionCount: 9999});
    hostFixture.componentInstance.setOptions();
    hostFixture.detectChanges();
    const options = hostFixture.componentInstance.options;
    const htmlOptions = hostFixture.debugElement.query(By.directive(DropdownComponent)).queryAll(By.css('option'));
    expect(htmlOptions.length).toBe(9999);
    options.forEach(({text, value}, i) => {
      expect(htmlOptions[i].nativeElement.value).toBe(value);
      expect(htmlOptions[i].nativeElement.text).toBe(text);
    });
  });

  it('should emit value to the parent component when selected', () => {
    const hostInstance = hostFixture.debugElement.componentInstance;
    const ddInstance = hostFixture.debugElement.query(By.directive(DropdownComponent)).componentInstance;
    const onSelectSpy = spyOn(hostInstance, 'onSelect').and.callThrough();
    ddInstance.onSelect('test');

    expect(onSelectSpy).toHaveBeenCalledTimes(1);
    expect(onSelectSpy).toHaveBeenCalledWith('test');
  });

});
