import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { TestComponent } from './test/test.component';
import { ResultComponent } from './result/result.component';


const routes: Routes = [
  {
    path: '', component: PortalComponent
  },
  {
    path: 'test/:name', component: TestComponent
  },
  {
    path: 'result/:id/:name', component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
