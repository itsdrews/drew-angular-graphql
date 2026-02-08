import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable,Subject } from 'rxjs';
import { CREATE_WORKOUT, GET_WORKOUTS,UPDATE_WORKOUT,DELETE_WORKOUT } from './workout.graphql';
import { Workout, WorkoutInput, WorkoutResponse }  from '../models/workout.model'

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private editWorkoutSubject = new Subject<Workout>();
  
  // Expomos como Observable para o App.component ouvir
  public editWorkoutRequest$ = this.editWorkoutSubject.asObservable();
  constructor(private apollo:Apollo){};

  requestEdit(workout: Workout) {
    this.editWorkoutSubject.next(workout);
  }

  getWorkouts(): Observable<Workout[]> {
    return this.apollo
      .watchQuery<WorkoutResponse>({
        query: GET_WORKOUTS,
        fetchPolicy:'network-only'
      })
      .valueChanges.pipe(
        map(result => {
          // Extrai os dados com segurança
          const workouts = result?.data?.workouts || [];
          
          // O "as Workout[]" resolve o erro TS2322.
          // Estamos garantindo que o objeto parcial é compatível com nossa interface.
          return workouts as Workout[]; 
        })
      );
  }
  createWorkout(input:WorkoutInput):Observable<Workout>{
    return this.apollo
    .mutate({
      mutation: CREATE_WORKOUT,
      variables:{
        input: input
      },

      refetchQueries:[{query:GET_WORKOUTS}]
    }).pipe(
      map(result =>result.data as any),
      map(data => data.scheduleWorkout as Workout)
    )

  }
  updateWorkout(id: string, input: WorkoutInput): Observable<Workout> {
    return this.apollo
      .mutate({
        mutation: UPDATE_WORKOUT,
        variables: {
          id: id,
          input: input
        },
        // Isso força o Apollo a atualizar o cache da lista automaticamente
        refetchQueries: [{ query: GET_WORKOUTS }]
      })
      .pipe(
        map(result => result.data as any),
        map(data => data.updateWorkout as Workout)
      );
  }

  deleteWorkout(id: string): Observable<boolean> {
  return this.apollo
    .mutate({
      mutation: DELETE_WORKOUT,
      variables: { id },
      refetchQueries: [{ query: GET_WORKOUTS }]
    })
    .pipe(
      map(result => !!result.data) // Retorna true se a operação teve sucesso
    );
}
}
