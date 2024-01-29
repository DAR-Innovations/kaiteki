import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSidebarComponent implements OnInit {
  chart: any = [];

  ngOnInit() {
    this.chart = new Chart('canvas-dashboard-teams-tasks', {
      type: 'pie',
      data: {
        labels: ['Completed', 'In Progress', 'Backlog'],
        datasets: [
          {
            label: 'Tasks',
            data: [56, 74, 16],
            backgroundColor: ['#E9F8F7', '#FFF3E5', '#FFEAED'],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
