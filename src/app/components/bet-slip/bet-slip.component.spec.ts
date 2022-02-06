import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BetSlipComponent } from './bet-slip.component';

const invalidInputsBetsMock = ['-1', '0', '1', '2', '3', '4'];
const validInputsBetsMock = ['5', '200', '5694'];

describe('BetSlipComponent', () => {
  let component: BetSlipComponent;
  let fixture: ComponentFixture<BetSlipComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BetSlipComponent],
      providers: [FormBuilder],
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSlipComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.betForm = component['buildForm']();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a single input', () => {
    const formElement =
      fixture.debugElement.nativeElement.querySelector('#betForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(1);
  });

  it('should init with 0 value', () => {
    const betFormGroup = component.betForm;
    const formIntialValue = {
      betValue: 0,
    };
    expect(betFormGroup.value).toEqual(formIntialValue);
  });

  it('should be invalid if no betValue is given', () => {
    const formHTML =
      fixture.debugElement.nativeElement.querySelector('#betForm');
    const betValueHTML: HTMLInputElement =
      formHTML.querySelectorAll('input')[0];
    const betValueForm = component.betForm.get('betValue');
    expect(`${betValueForm?.value}`).toEqual(betValueHTML.value);
    expect(betValueForm?.errors).not.toBeNull();
    expect(betValueForm?.errors?.min).toBeTruthy();
    expect(betValueForm?.valid).toBeFalse();
  });

  it('should be invalid for numbers less than 5 and show message', () => {
    const compiled = fixture.nativeElement as HTMLElement; // view element
    const formHTML =
      fixture.debugElement.nativeElement.querySelector('#betForm');
    const betValueHTML: HTMLInputElement =
      formHTML.querySelectorAll('input')[0]; // input HTML element

    invalidInputsBetsMock.forEach((invalidInput) => {
      betValueHTML.value = invalidInput; // new HTML value
      betValueHTML.dispatchEvent(new Event('input')); // event trigger
      fixture.detectChanges(); // changes detection

      const betValueForm = component.betForm.get('betValue'); // form value
      expect(`${betValueForm?.value}`).toEqual(betValueHTML.value);
      expect(betValueForm?.errors).not.toBeNull();
      expect(betValueForm?.errors?.min).toBeTruthy();
      expect(betValueForm?.valid).toBeFalse();
      expect(compiled.querySelector('#betForm span')).toBeTruthy();
      expect(compiled.querySelector('#betForm span')?.textContent).toContain('The minimum bet is $5');
    });
  });

  it('should be valid for >= 5 numbers', () => {
    const formHTML =
      fixture.debugElement.nativeElement.querySelector('#betForm');
    const betValueHTML: HTMLInputElement =
      formHTML.querySelectorAll('input')[0]; // input HTML element

    validInputsBetsMock.forEach((validInput) => {
      betValueHTML.value = validInput; // new HTML value
      betValueHTML.dispatchEvent(new Event('input')); // event trigger
      fixture.detectChanges(); // changes detection

      const betValueForm = component.betForm.get('betValue'); // form value
      expect(`${betValueForm?.value}`).toEqual(betValueHTML.value);
      expect(betValueForm?.errors).toBeNull();
      expect(betValueForm?.errors?.min).not.toBeTruthy();
      expect(betValueForm?.valid).toBeTrue();
    });
  });

  it('should show validation message if are no balls selected', () => {
    component.selectedBalls = [];
    
    const compiled = fixture.nativeElement as HTMLElement; // view element
    const formHTML =
      fixture.debugElement.nativeElement.querySelector('#betForm');
    const betValueHTML: HTMLInputElement =
      formHTML.querySelectorAll('input')[0]; // input HTML element
    betValueHTML.value = '10'; // new HTML value
    
    component.placeBet();
    fixture.detectChanges();
    expect(component.showValidationMessage).toBeTrue();
    expect(compiled.querySelector('.validation-message')).toBeTruthy();
    expect(compiled.querySelector('.validation-message')?.textContent).toContain('Please, check your selection!');
  });

});
