import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list';
import { WorkoutService } from '../../core/services/workout.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { vi } from 'vitest'; // Importante: Vitest

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let mockService: any;

  beforeEach(async () => {
    // 1. Mock do serviço retornando dados fixos
    mockService = {
      getWorkouts: vi.fn().mockReturnValue(of([
        { id: '1', title: 'Longo de Domingo', distanceInKm: 15, durationInMinutes: 90, dateTime: '2026-02-01' },
        { id: '2', title: 'Tiro de 1km', distanceInKm: 5, durationInMinutes: 25, dateTime: '2026-02-03' }
      ]))
    };

    await TestBed.configureTestingModule({
      imports: [WorkoutListComponent, CommonModule],
      providers: [
        { provide: WorkoutService, useValue: mockService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    
    // Dispara o ngOnInit e resolve o AsyncPipe
    fixture.detectChanges(); 
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir dois itens na lista', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Verifica se renderizou dois cards
    const items = compiled.querySelectorAll('.workout-card');
    expect(items.length).toBe(2);
  });

  it('deve mostrar o título correto do treino', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Longo de Domingo');
  });
});