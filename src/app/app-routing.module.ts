import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProductListComponent } from './products/components/product-list/product-list.component'
import { ProductItemComponent } from './products/components/product-item/product-item.component'
import { ProductAdminComponent } from './products/components/product-admin/product-admin.component'

const routes: Routes = [
	{
		path: '',
		component: ProductListComponent,
	},
	{
		path: 'product/:id',
		component: ProductItemComponent,
	},
	{
		path: 'admin',
		component: ProductAdminComponent,
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
