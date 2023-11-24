import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  filter: any = {};

  members$ = of([
    {
      id: 1,
      name: 'Aliya Tazhigaliyeva',
      avatar:
        'https://images.unsplash.com/photo-1620196244884-ff187fd4bf99?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      entryDate: new Date(),
      position: 'Project Manager',
      email: 'tazhik@gmail.com',
      performance: 0,
    },
    {
      id: 2,
      name: 'Ramazan Seiitbek',
      avatar:
        'https://images.unsplash.com/photo-1624798118458-fb59e82ca1ef?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      entryDate: new Date(),
      position: 'Machine Learning Developer',
      email: 'seiitbek_ramazan_cool_developer@gmail.com',
      performance: 98,
    },
    {
      id: 3,
      name: 'Diar Begisbayev',
      avatar:
        'https://images.unsplash.com/photo-1594582768484-a1bf8a868ec9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      entryDate: new Date(),
      position: 'Full-Stack Developer',
      email: 'begisbayev@gmail.com',
      performance: 47,
    },
    {
      id: 4,
      name: 'Aisha Yermakhan',
      avatar:
        'https://images.unsplash.com/photo-1610973053414-abc5309f0a8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      entryDate: new Date(),
      position: 'QA Tester',
      email: 'aisha_kpop@korean.idol',
      performance: 68,
    },
    {
      id: 5,
      name: 'Yeldar Kuzembaev',
      avatar:
        'https://images.unsplash.com/photo-1535696588143-945e1379f1b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      entryDate: new Date(),
      position: 'Frontend Developer',
      email: 'yeldar@gmail.com',
      performance: 91,
    },
  ]);

  onFilter(filter: any) {
    this.filter = filter;
  }
}
