import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutFormComponent } from './workout-form';
import { WorkoutService } from '../../core/services/workout.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { vi } from 'vitest'; // <--- Importante para Vitest

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let mockService: any; // Usamos 'any' para simplificar a tipagem do mock

  beforeEach(async () => {
    // 1. Criamos o Mock manual usando a sintaxe do Vitest (vi.fn)
    mockService = {
      createWorkout: vi.fn().mockReturnValue(of({})) // Simula o retorno de um Observable
    };

    await TestBed.configureTestingModule({
      imports: [WorkoutFormComponent, ReactiveFormsModule],
      providers: [
        { provide: WorkoutService, useValue: mockService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve chamar o serviço ao submeter formulário válido', () => {
    // 1. Preenchemos o formulário
    component.workoutForm.patchValue({
      title: 'Corrida Noturna',
      dateTime: '2026-02-05T19:00',
      distanceInKm: 10,
      durationInMinutes: 55
    });

    // 2. Disparamos o submit
    component.onSubmit();

    // 3. Verificamos se foi chamado (Sintaxe compatível com Vitest/Jest)
    expect(mockService.createWorkout).toHaveBeenCalled();
    
    // Opcional: Verifica argumentos
    // No Vitest acessamos calls assim:
    const args = mockService.createWorkout.mock.calls[0][0];
    expect(args.title).toBe('Corrida Noturna');
  });
});