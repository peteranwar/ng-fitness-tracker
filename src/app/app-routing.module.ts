import { NgModule} from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./Welcome/welcome.Component";
import { AuthGuard } from './auth/auth-guard';


const routes: Routes  = [
   { path: '', component: WelcomeComponent },
   {
      path: 'training',
      loadChildren: () => import('./training/training.module').then(m => m.TrainingModule),
       canLoad: [AuthGuard]
    } // canLoad not canActivate it runs before the bundle is loaded. 
];

@NgModule({
   imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
   exports: [RouterModule],
   providers: [AuthGuard]
})
export class AppRoutingModule {}