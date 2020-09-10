import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'ejecutar',
    loadChildren: () => import('./Pages/ejecutar/ejecutar.module').then( m => m.EjecutarPageModule)
  },
  {
    path: 'traducir',
    loadChildren: () => import('./Pages/traducir/traducir.module').then( m => m.TraducirPageModule)
  },
  {
    path: 'tabla-errores',
    loadChildren: () => import('./Pages/tabla-errores/tabla-errores.module').then( m => m.TablaErroresPageModule)
  },
  {
    path: 'tabla-simbolos',
    loadChildren: () => import('./Pages/tabla-simbolos/tabla-simbolos.module').then( m => m.TablaSimbolosPageModule)
  },
  {
    path: 'graficas',
    loadChildren: () => import('./Pages/graficas/graficas.module').then( m => m.GraficasPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
