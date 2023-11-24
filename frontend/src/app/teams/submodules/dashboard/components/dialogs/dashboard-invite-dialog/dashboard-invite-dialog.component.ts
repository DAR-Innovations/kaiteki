import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-invite-dialog',
  templateUrl: './dashboard-invite-dialog.component.html',
  styleUrls: ['./dashboard-invite-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardInviteDialogComponent {
  selectedItem: any = null;
  candidates: any[] = [];
  options = [
    { id: 1, name: 'Begisbayev Diar', email: 'begisbayev@mail.ru' },
    { id: 2, name: 'Seiitbek Ramazan', email: 'seiitbek@mail.ru' },
    { id: 3, name: 'Tazhigaliyeva Aliya', email: 'tazhigaliyeva@mail.ru' },
  ];

  constructor(
    private dialogRef: MatDialogRef<DashboardInviteDialogComponent>
  ) {}

  onInputFocus() {
    this.selectedItem = null;
  }

  onOptionSelected(event: any) {
    this.candidates.push(event);
    this.selectedItem = null;
  }

  displayFn(option: any): string {
    return option.name ?? '';
  }

  onSubmit() {
    this.dialogRef.close();
  }

  onCopyLinkClick() {}
}
