import { DragDropModule } from '@angular/cdk/drag-drop'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { FileUploadModule } from '@iplab/ngx-file-upload'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'

import { PageHeaderComponent } from './components/page-header/page-header.component'
import { PaginatorComponent } from './components/paginator/paginator.component'
import { MaterialModule } from './material/mat.module'
import { RxStompService, rxStompServiceFactory } from './services/rx-stomp.service'
import { ButtonComponent } from './ui/button/button.component'
import { IconComponent } from './ui/icon/icon.component'

@NgModule({
	declarations: [ButtonComponent, IconComponent, PageHeaderComponent, PaginatorComponent],
	imports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule,
		DragDropModule,
		FileUploadModule,
		NgxSkeletonLoaderModule,
	],
	exports: [
		ButtonComponent,
		IconComponent,
		PageHeaderComponent,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		PaginatorComponent,
		DragDropModule,
		FileUploadModule,
		NgxSkeletonLoaderModule,
	],
	providers: [{ provide: RxStompService, useFactory: rxStompServiceFactory }],
})
export class SharedModule {}
