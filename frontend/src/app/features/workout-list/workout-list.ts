import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable,of } from 'rxjs';
import { Workout } from '../../core/models/workout.model';
import { WorkoutService } from '../../core/services/workout.service';


export const MOCK_WORKOUTS: Workout[] = [
  {
    id: 'w1',
    title: 'Corrida de Velocidade ⚡',
    dateTime: '2026-02-01T07:00:00Z',
    distanceInKm: 5.4,
    durationInMinutes: 25
  },
  {
    id: 'w2',
    title: 'Caminhada Regenerativa',
    dateTime: '2026-01-31T18:30:00Z',
    distanceInKm: 3.0,
    durationInMinutes: 40
  },
  {
    id: 'w3',
    title: 'Treino de Longa Distância',
    dateTime: '2026-01-28T06:00:00Z',
    distanceInKm: 15.2,
    durationInMinutes: 82
  },
  {
    id: 'w4',
    title: 'Sprints Intervalados',
    dateTime: '2026-01-26T19:00:00Z',
    distanceInKm: 4.8,
    durationInMinutes: 30
  },
  {
    id: 'w5',
    title: 'Cardio de Alta Intensidade',
    dateTime: '2026-01-25T10:15:00Z',
    distanceInKm: 6.1,
    durationInMinutes: 35
  },
  {
    id: 'w6',
    title: 'Corrida Noturna',
    dateTime: '2026-01-24T21:00:00Z',
    distanceInKm: 7.5,
    durationInMinutes: 45
  }
];
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
    this.workouts$ = of(MOCK_WORKOUTS)//this.workoutService.getWorkouts();
  }
    
  @Output() editRequested = new EventEmitter<Workout>();

  onEditWorkout(workout: Workout) {
  this.editRequested.emit(workout);
  }
  
}