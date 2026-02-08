import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable,of } from 'rxjs';
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
  @Output() editRequested = new EventEmitter<Workout>();
  @Output() deleteRequested = new EventEmitter<string>();
  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
    // Apenas conectamos o "cano". O HTML fará o subscribe.
    this.workouts$ = this.workoutService.getWorkouts();
  }

  onEditWorkout(workout: Workout) {
   this.workoutService.requestEdit(workout); // Chama o novo método
}

  onDelete(id: string) {
    if(confirm('Tem certeza que deseja excluir este treino?')) {
      this.deleteRequested.emit(id);
    }
  }

  // Ajuda o Angular a renderizar a lista mais rápido
  trackById(index: number, item: Workout): string {
    return item.id!;
  }
  
}