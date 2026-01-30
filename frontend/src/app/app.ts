import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkoutFormComponent } from './features/workout-form/workout-form';
import { WorkoutListComponent } from './features/workout-list/workout-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,WorkoutFormComponent,WorkoutListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title='runner-scheduler-ui'
}
