import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Workout } from '../../core/models/workout.model';
import { WorkoutService } from '../../core/services/workout.service';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workout-list.html',
  styleUrls: ['./workout-list.scss']
})
export class WorkoutListComponent implements OnInit {

  workouts$!: Observable<Workout[]>;

  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
    // Apenas conectamos o "cano". O HTML fará o subscribe.
    this.workouts$ = this.workoutService.getWorkouts();
  }
}