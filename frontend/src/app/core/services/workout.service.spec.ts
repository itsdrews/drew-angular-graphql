import { TestBed } from '@angular/core/testing';
import { ApolloTestingController,ApolloTestingModule }from 'apollo-angular/testing';
import { WorkoutService } from './workout.service';
import { GET_WORKOUTS,CREATE_WORKOUT } from './workout.graphql';
import { filter,take } from 'rxjs';
import { WorkoutInput } from '../models/workout.model';

describe('Workout', () => {
  let service: WorkoutService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ApolloTestingModule],
      providers:[WorkoutService]
    });
    service = TestBed.inject(WorkoutService);
    controller= TestBed.inject(ApolloTestingController);
  });

  afterEach(()=>{
    controller.verify();
  });

 it('deve retornar uma lista de treinos (Query)', () => {
    service.getWorkouts()
    .pipe(
      filter(workouts => workouts.length>0),
      take(1)
    )
    .subscribe((workouts) => {
        expect(workouts.length).toBe(1);
        expect(workouts[0].title).toBe('Treino Teste');
      }
    );

    const op = controller.expectOne(GET_WORKOUTS);

    // O mock deve simular exatamente a estrutura { data: { workouts: [...] } }
    op.flush({
      data: {
        workouts: [
          { id: '1', title: 'Treino Teste', distanceInKm: 10, durationInMinutes: 60, dateTime: '2026-01-30' }
        ]
      }
    });
  });

  it('deve criar um novo treino (Mutation)', () => {
    const input: WorkoutInput = {
      title: 'Treino de Tiro',
      dateTime: '2026-02-02T10:00:00',
      distanceInKm: 5,
      durationInMinutes: 30
    };

    // 1. Chamamos o método (ainda não existe, vai dar erro no editor)
    service.createWorkout(input).subscribe({
      next: (workout) => {
        expect(workout.title).toBe('Treino de Tiro');
        expect(workout.id).toBe('99');
      
      }
    });
    // 1. Interceptamos a Mutation
    const opMutation = controller.expectOne(CREATE_WORKOUT);
    expect(opMutation.operation.variables['input']).toEqual(input);

    // 2. Respondemos a Mutation
    opMutation.flush({
      data: {
        scheduleWorkout: {
          ...input,
          id: '99'
        }
      }
    });

    // --- CORREÇÃO AQUI ---
    // 3. O Apollo dispara o refetch automaticamente. Precisamos interceptá-lo.
    const opRefetch = controller.expectOne(GET_WORKOUTS);
    
    // 4. Respondemos ao refetch (pode ser vazio, só para fechar a requisição)
    opRefetch.flush({
      data: {
        workouts: [] 
      }
    });

  });
});
