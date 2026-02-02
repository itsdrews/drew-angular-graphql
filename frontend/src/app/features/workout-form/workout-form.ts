import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkoutService } from '../../core/services/workout.service';
import { Workout } from '../../core/models/workout.model';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workout-form.html',
  styleUrls: ['./workout-form.scss']
})
export class WorkoutFormComponent {
  workoutForm: FormGroup;
  isOpen = false;
  isEditing = false;
  currentId?: string;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService
  ) {
    this.workoutForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      dateTime: ['', Validators.required],
      distanceInKm: [0, [Validators.required, Validators.min(0.1)]],
      durationInMinutes: [0, [Validators.required, Validators.min(1)]]
    });
  }

  // --- Controle do Modal ---

  openModal(workout?: Workout): void {
    this.isOpen = true;
    if (workout) {
      this.isEditing = true;
      this.currentId = workout.id;
      
      // Formata a data para o padrão do input datetime-local (YYYY-MM-DDTHH:mm)
      const formattedDate = this.formatDateForInput(workout.dateTime);
      
      this.workoutForm.patchValue({
        ...workout,
        dateTime: formattedDate
      });
    } else {
      this.isEditing = false;
      this.currentId = undefined;
      this.workoutForm.reset({ distanceInKm: 0, durationInMinutes: 0 });
    }
  }

  closeModal(): void {
    this.isOpen = false;
    this.isEditing = false;
    this.currentId = undefined;
    this.workoutForm.reset();
  }

  // --- Ações do Formulário ---

  onSubmit(): void {
    if (this.workoutForm.invalid) return;

    const workoutData = this.workoutForm.value;
    
    // Decidimos qual método do serviço chamar
    const request$ = (this.isEditing && this.currentId)
      ? this.workoutService.updateWorkout(this.currentId, workoutData)
      : this.workoutService.createWorkout(workoutData);

    request$.subscribe({
      next: () => {
        console.log(`Treino ${this.isEditing ? 'atualizado' : 'criado'} com sucesso!`);
        this.closeModal();
      },
      error: (err) => console.error('Erro na operação:', err)
    });
  }

  onDelete(): void {
    if (!this.currentId) return;

    const confirmed = confirm('Deseja realmente excluir este treino? ⚡');
    
    if (confirmed) {
      this.workoutService.deleteWorkout(this.currentId).subscribe({
        next: (success) => {
          if (success) {
            this.closeModal();
          }
        },
        error: (err) => console.error('Erro ao excluir:', err)
      });
    }
  }

  // Helper para converter datas (String/Date) para o formato do input do browser
  private formatDateForInput(dateInput: any): string {
    const d = new Date(dateInput);
    const pad = (n: number) => n < 10 ? '0' + n : n;
    
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
}