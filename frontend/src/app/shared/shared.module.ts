import { DragDropModule } from '@angular/cdk/drag-drop'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { FileUploadModule } from '@iplab/ngx-file-upload'
import { QRCodeModule } from 'angularx-qrcode'
import { BaseChartDirective } from 'ng2-charts'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'

import { PageHeaderComponent } from './components/page-header/page-header.component'
import { PaginatorComponent } from './components/paginator/paginator.component'
import { MaterialModule } from './material/mat.module'
import { WithLoadingPipe } from './pipes/with-loading.pipe'
import { ButtonComponent } from './ui/button/button.component'
import { IconComponent } from './ui/icon/icon.component'

@NgModule({
	declarations: [
		ButtonComponent,
		IconComponent,
		PageHeaderComponent,
		PaginatorComponent,
		WithLoadingPipe,
	],
	imports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule,
		DragDropModule,
		FileUploadModule,
		NgxSkeletonLoaderModule,
		BaseChartDirective,
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
		WithLoadingPipe,
		QRCodeModule,
		BaseChartDirective,
	],
	providers: [],
})
export class SharedModule {}
