import { BehaviorSubject } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsComponent implements OnDestroy {
  // private selectedChatId: BehaviorSubject<number | null> = new BehaviorSubject<
  //   number | null
  // >(null);
  // selectedChatId$ = this.selectedChatId.asObservable();
  selectedChatId: number | null = null;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    // this.selectedChatId.next(null);
    // this.selectedChatId.complete();
  }

  onSelectChat(chatId: number) {
    // this.selectedChatId.next(chatId);
    this.selectedChatId = chatId;
    this.cd.markForCheck();
  }
}
