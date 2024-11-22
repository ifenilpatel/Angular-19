import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appLimitLength]',
})
export class LimitLengthDirective {
  @Input('appLimitLength') maxLength!: string;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    if (inputElement.value.length > Number(this.maxLength)) {
      inputElement.value = inputElement.value.slice(0, Number(this.maxLength));
    }
  }
}
