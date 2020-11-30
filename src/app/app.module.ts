import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button'

import { HttpClientModule } from '@angular/common/http'
import { ProductListComponent } from './products/components/product-list/product-list.component'
import { ProductItemComponent } from './products/components/product-item/product-item.component'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { FormlyMaterialModule } from '@ngx-formly/material'

import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker'
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatNativeDateModule } from '@angular/material/core'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'

import { ProductAdminComponent } from './products/components/product-admin/product-admin.component'
import { ProductFormComponent } from './products/components/product-form/product-form.component';
import { UserRegisterComponent } from './users/components/user-register/user-register.component';
import { UserAuthComponent } from './users/components/user-auth/user-auth.component'

@NgModule({
	declarations: [AppComponent, ProductListComponent, ProductItemComponent, ProductItemComponent, ProductAdminComponent, ProductFormComponent, UserRegisterComponent, UserAuthComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatButtonModule,
		ReactiveFormsModule,
		FormlyModule.forRoot(),
		FormlyMaterialModule,
		ReactiveFormsModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatRadioModule,
		MatSelectModule,
		MatTableModule,
		MatIconModule,

		MatNativeDateModule,
		FormlyMatDatepickerModule,
		FormlyMatToggleModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
