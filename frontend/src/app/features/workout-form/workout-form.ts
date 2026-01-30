import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkoutService } from '../../core/services/workout.service';
import { Router } from '@angular/router'; // Opcional: para navegar após salvar

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importante para o [formGroup] funcionar
  templateUrl: './workout-form.html',
  styleUrls: ['./workout-form.scss']
})
export class WorkoutFormComponent {
  
  workoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService
  ) {
    // Definimos o formulário e suas validações
    this.workoutForm = this.fb.group({
      title: ['', Validators.required],
      dateTime: ['', Validators.required],
      distanceInKm: [0, [Validators.required, Validators.min(0.1)]],
      durationInMinutes: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.workoutForm.valid) {
      // Chama o serviço enviando os dados do formulário
      this.workoutService.createWorkout(this.workoutForm.value).subscribe({
        next: () => {
          console.log('Treino criado com sucesso!');
          // Aqui poderíamos limpar o form ou navegar para a home
          this.workoutForm.reset();
        },
        error: (err) => console.error('Erro ao criar:', err)
      });
    }
  }
}