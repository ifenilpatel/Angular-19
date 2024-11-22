import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyLetter]',
})
export class OnlyLetterDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allowed keys for backspace, delete, arrow keys, tab
    const allowedKeys = [
      'Backspace', // Backspace to delete the last character
      'ArrowLeft', // Left arrow for navigation
      'ArrowRight', // Right arrow for navigation
      'Delete', // Delete key for removing the character at the cursor
      'Tab', // Tab key for navigation
    ];

    // Check if the key is a letter (either uppercase or lowercase)
    const isLetter =
      (event.key >= 'A' && event.key <= 'Z') ||
      (event.key >= 'a' && event.key <= 'z');

    // Allow space, letter keys, and allowed keys (backspace, delete, etc.)
    const isSpace = event.key === ' ';

    if (allowedKeys.includes(event.key) || isLetter || isSpace) {
      return; // Allow the key press
    } else {
      event.preventDefault(); // Prevent other keys
    }
  }
}
