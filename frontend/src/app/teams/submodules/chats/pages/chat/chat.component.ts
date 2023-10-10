import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  chatId: number | null = null;

  constructor(private route: ActivatedRoute) {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId && !isNaN(Number(paramId))) {
      this.chatId = Number(paramId);
    }
  }
}
