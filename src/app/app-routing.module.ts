import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProductListComponent } from './products/components/product-list/product-list.component'

const routes: Routes = [
	{
		path: '',
		component: ProductListComponent,
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
