import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { CREATE_WORKOUT, GET_WORKOUTS } from './workout.graphql';
import { Workout, WorkoutInput, WorkoutResponse }  from '../models/workout.model'

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  
  constructor(private apollo:Apollo){};

  getWorkouts(): Observable<Workout[]> {
    return this.apollo
      .watchQuery<WorkoutResponse>({
        query: GET_WORKOUTS,
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
}
