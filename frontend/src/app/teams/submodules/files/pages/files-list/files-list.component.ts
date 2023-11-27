import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesListComponent {
  files$ = of([
    {
      id: 1,
      guid: 1,
      filename: 'Client Agreements',
      createdAt: '2023-11-28T12:34:56.789Z',
      contentType: 'PDF',
      sizeInBytes: 1024,
      description: 'Client Agreement for presentation at NU',
    },
    {
      id: 2,
      guid: 2,
      filename: 'Financial Reports',
      createdAt: '2023-11-28T13:45:23.456Z',
      contentType: 'XLSX',
      sizeInBytes: 2048,
      description: 'Quarterly financial reports for the year',
    },
    {
      id: 3,
      guid: 3,
      filename: 'Project Proposal',
      createdAt: '2023-11-28T14:56:12.345Z',
      contentType: 'DOCX',
      sizeInBytes: 3072,
      description: 'Detailed proposal for upcoming project',
    },
    {
      id: 4,
      guid: 4,
      filename: 'Marketing Plan',
      createdAt: '2023-11-28T15:07:34.567Z',
      contentType: 'PPTX',
      sizeInBytes: 4096,
      description: 'Strategies for the next marketing campaign',
    },
    {
      id: 5,
      guid: 5,
      filename: 'Employee Handbook',
      createdAt: '2023-11-28T16:18:45.678Z',
      contentType: 'PDF',
      sizeInBytes: 5120,
      description: 'Guidelines and policies for employees',
    },
    {
      id: 6,
      guid: 6,
      filename: 'Meeting Minutes',
      createdAt: '2023-11-28T17:29:56.789Z',
      contentType: 'TXT',
      sizeInBytes: 6144,
      description: 'Minutes of the last board meeting',
    },
    {
      id: 7,
      guid: 7,
      filename: 'Training Videos',
      createdAt: '2023-11-28T18:40:01.234Z',
      contentType: 'MP4',
      sizeInBytes: 7168,
      description: 'Educational videos for employee training',
    },
    {
      id: 8,
      guid: 8,
      filename: 'Product Catalog',
      createdAt: '2023-11-28T19:51:12.345Z',
      contentType: 'CSV',
      sizeInBytes: 8192,
      description:
        'Catalog of products with specifications Catalog of products with specifications',
      previewUrl:
        'https://plus.unsplash.com/premium_photo-1664371675060-87e49122263c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 9,
      guid: 9,
      filename: 'Customer Surveys',
      createdAt: '2023-11-28T21:02:23.456Z',
      contentType: 'XLSX',
      sizeInBytes: 9216,
      description: 'Results of recent customer satisfaction surveys',
    },
    {
      id: 10,
      guid: 10,
      filename: 'Security Policies',
      createdAt: '2023-11-28T22:13:34.567Z',
      contentType: 'PDF',
      sizeInBytes: 10240,
      description: 'Company policies related to data security',
    },
  ]);
  filter: any = {};

  onFilter(filter: any) {
    this.filter = filter;
  }
}
