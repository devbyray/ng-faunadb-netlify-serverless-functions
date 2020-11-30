import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProductListComponent } from './products/components/product-list/product-list.component'
import { ProductItemComponent } from './products/components/product-item/product-item.component'
import { ProductAdminComponent } from './products/components/product-admin/product-admin.component'
import { ProductFormComponent } from './products/components/product-form/product-form.component'
import { UserAuthComponent } from './users/components/user-auth/user-auth.component';

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
  {
    path: 'admin/product/:id',
    component: ProductFormComponent,
  },
  {
    path: 'login',
    component: UserAuthComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
