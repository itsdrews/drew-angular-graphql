export interface Workout{
  id:string;
  title:string;
  dateTime:string;
  distanceInKm:number;
  durationInMinutes:number;

}

export interface WorkoutInput {
  title: string;
  dateTime: string;
  distanceInKm: number;
  durationInMinutes: number;
}

export interface WorkoutResponse {
  workouts:Workout[];
}