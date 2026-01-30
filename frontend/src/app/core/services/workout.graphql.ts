import { gql } from 'apollo-angular';

export const GET_WORKOUTS = gql`
  query GetWorkouts {
    workouts {
      id
      title
      dateTime
      distanceInKm
      durationInMinutes
    }
  }
`;
export const CREATE_WORKOUT = gql`
  mutation ScheduleWorkout($input: WorkoutInput!) {
    scheduleWorkout(input: $input) {
      id
      title
      dateTime
      distanceInKm
      durationInMinutes
    }
  }
`;