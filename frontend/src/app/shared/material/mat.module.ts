import { NgModule } from '@angular/core'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatBadgeModule } from '@angular/material/badge'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips'
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatStepperModule } from '@angular/material/stepper'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'

import { MtxNativeDatetimeModule } from '@ng-matero/extensions/core'
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker'

@NgModule({
	exports: [
		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
		MatSidenavModule,
		MatExpansionModule,
		MatMenuModule,
		MatCardModule,
		MatInputModule,
		MatSelectModule,
		MatRippleModule,
		MatCheckboxModule,
		MatGridListModule,
		MatProgressBarModule,
		MatListModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatTableModule,
		MatSortModule,
		MatTooltipModule,
		MatDialogModule,
		MatPaginatorModule,
		MatAutocompleteModule,
		MatProgressBarModule,
		MatTabsModule,
		MatSnackBarModule,
		MatChipsModule,
		MatRadioModule,
		MatProgressSpinnerModule,
		MatProgressSpinnerModule,
		MatBadgeModule,
		MatStepperModule,
		MatSlideToggleModule,
		MatFormFieldModule,
		MatInputModule,
		MatChipsModule,
		MtxDatetimepickerModule,
		MtxNativeDatetimeModule,
	],
})
export class MaterialModule {}
