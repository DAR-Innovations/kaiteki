import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  //TODO: FIX ME
  @Input() formControlName: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() errors: { type: string; message: string }[] = [];
  @Input() formControl: FormControl = new FormControl();

  errorVisible = false;

  constructor() {
    this.formControl.valueChanges.subscribe(() => {
      console.log(this.formControl);
      this.errorVisible = this.isErrorVisible('required');
    });
  }

  isErrorVisible(errorType: string): boolean {
    return this.formControl.hasError(errorType) && this.formControl.touched;
  }
}
