import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyNumber]',
})
export class OnlyNumberDirective {
  constructor(private ngControl: NgControl) {}

  // Allow numeric input and special keys like cut, copy, and paste
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Cut',
      'Copy',
      'Paste',
    ];

    // Allow special keys like Backspace, Tab, Enter, Arrow keys, and cut/copy/paste
    if (
      allowedKeys.includes(event.key) ||
      (event.ctrlKey && ['x', 'c', 'v'].includes(event.key.toLowerCase()))
    ) {
      return;
    }

    // Allow only numeric keys (0-9)
    if (event.key < '0' || event.key > '9') {
      event.preventDefault();
    }
  }

  // Ensure only numeric values are present after input (including pasting)
  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    // Remove any non-numeric characters
    const numericValue = input.value.replace(/[^0-9]/g, '');

    // If the input has changed (non-numeric characters were removed), update the form control
    if (input.value !== numericValue) {
      this.ngControl.control?.setValue(numericValue);
    }
  }
}
