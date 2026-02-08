import { Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/auth/auth.service';
import { WorkoutFormComponent } from './features/workout-form/workout-form';
import { WorkoutService } from './core/services/workout.service';
import { Subscription } from 'rxjs';
import { Workout } from './core/models/workout.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,WorkoutFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Injetamos o serviço de autenticação para saber se mostramos a UI protegida
  public authService = inject(AuthService);
  private workoutService = inject(WorkoutService); // <--- Faltava injetar isso!

  // Variável para guardar a inscrição e evitar vazamento de memória
  private editSubscription!: Subscription;
  
  @ViewChild(WorkoutFormComponent) workoutForm!:WorkoutFormComponent;

  ngOnInit() {
    // Inscreve-se no "Event Bus" do serviço
    this.editSubscription = this.workoutService.editWorkoutRequest$
      .subscribe((workout: Workout) => {
        // Quando alguém pedir para editar, abre o modal passando o treino
        this.workoutForm.openModal(workout);
      });
  }

  // Boa prática: Limpar inscrições ao destruir o componente
  ngOnDestroy() {
    if (this.editSubscription) {
      this.editSubscription.unsubscribe();
    }
  }

  onLogout(): void {
    this.authService.logout();
  }
  onAddWorkout() {
    this.workoutForm.openModal();
  }
}