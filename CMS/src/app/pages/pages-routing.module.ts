import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'Calender',
        loadChildren: () =>
          import('./Calender/calender.module').then((m) => m.CalenderModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'builder',
        loadChildren: () =>
          import('./builder/builder.module').then((m) => m.BuilderModule),
      },
      {
        path: 'ecommerce',
        loadChildren: () =>
          import('../modules/e-commerce/e-commerce.module').then(
            (m) => m.ECommerceModule
          ),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('../modules/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../modules/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },

      {
        path: 'wizards',
        loadChildren: () =>
          import('../modules/wizards/wizards.module').then(
            (m) => m.WizardsModule
          ),
      },
      {
        path: 'EmployeeManager',
        loadChildren: () =>
          import('./ListNV/nhanvien.module').then(
            (m) => m.NhanvienModule
          ),
      },
      {
        path: 'Customer',
        loadChildren: () =>
          import('./Customer/customer.module').then(
            (m) => m.CustomerModule
          ),
      },
      {
        path: 'Supplier',
        loadChildren: () =>
          import('./Supplier/supplier.module').then(
            (m) => m.SupplierModule
          ),
      },

      {
        path: 'Planning',
        loadChildren: () =>
          import('./Thu_Chi/thuchi.module').then(
            (m) => m.ThuchiModule
          ),
      },

      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
