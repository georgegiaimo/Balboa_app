import {
  Component,
  ElementRef,
  forwardRef,
  ViewChild
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-simple-editor',
  templateUrl: './simple-editor.component.html',
  standalone:false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SimpleEditorComponent),
      multi: true
    }
  ]
})
export class SimpleEditorComponent implements ControlValueAccessor {

  @ViewChild('editor')
  editor!: ElementRef<HTMLDivElement>;

  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value = value ?? '';

    if (this.editor) {
      this.editor.nativeElement.innerHTML = this.value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  onEditorInput(): void {
    this.value = this.editor.nativeElement.innerHTML;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  format(command: string): void {
    document.execCommand(command, false);

    this.editor.nativeElement.focus();

    this.onEditorInput();
  }

  addLink(): void {
    const url = window.prompt('Enter URL');

    if (!url) {
      return;
    }

    document.execCommand(
      'createLink',
      false,
      url
    );

    this.editor.nativeElement.focus();

    this.onEditorInput();
  }
}