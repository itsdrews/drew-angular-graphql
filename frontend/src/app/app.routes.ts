import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login';
import { WorkoutListComponent } from './features/workout-list/workout-list';
import { RegisterComponent } from './features/auth/register';
import { authGuard} from './core/auth/auth.guard';



export const routes: Routes = [
  { path: '', component: LoginComponent }, // 👈 renderizável no server
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'workouts',
    component: WorkoutListComponent,
    canActivate: [authGuard],
  },
];
