import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyAlphanumeric]',
})
export class OnlyAlphanumericDirective {
  constructor(private ngControl: NgControl) {}

  // Handle keydown to restrict invalid keys
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

    // Allow letters (uppercase and lowercase), numbers, and space
    const isLetter =
      (event.key >= 'A' && event.key <= 'Z') ||
      (event.key >= 'a' && event.key <= 'z');
    const isNumber = event.key >= '0' && event.key <= '9';
    const isSpace = event.key === ' ';

    // Allow special keys, letters, numbers, and space
    if (
      allowedKeys.includes(event.key) ||
      isLetter ||
      isNumber ||
      isSpace ||
      (event.ctrlKey && ['x', 'c', 'v'].includes(event.key.toLowerCase()))
    ) {
      return;
    }

    event.preventDefault(); // Block all other keys
  }

  // Sanitize input to remove invalid characters
  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    // Remove any character that is not a letter, number, or space
    const sanitizedValue = input.value.replace(/[^a-zA-Z0-9 ]/g, '');

    // Update the form control if the input value has changed
    if (input.value !== sanitizedValue) {
      this.ngControl.control?.setValue(sanitizedValue);
    }
  }
}
