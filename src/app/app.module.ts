import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button'

import { HttpClientModule } from '@angular/common/http'
import { ProductListComponent } from './products/components/product-list/product-list.component'
import { MatGridListModule } from '@angular/material/grid-list'
import { ProductItemComponent } from './products/components/product-item/product-item.component'
@NgModule({
	declarations: [AppComponent, ProductListComponent, ProductItemComponent, ProductItemComponent],
	imports: [BrowserModule, HttpClientModule, AppRoutingModule, BrowserAnimationsModule, MatGridListModule, MatButtonModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
