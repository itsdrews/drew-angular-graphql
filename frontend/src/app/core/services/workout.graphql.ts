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

export const UPDATE_WORKOUT = gql`
  mutation UpdateWorkout($id: ID!, $input: WorkoutInput!) {
    updateWorkout(id: $id, input: $input) {
      id
      title
      dateTime
      distanceInKm
      durationInMinutes
    }
  }
`;
export const DELETE_WORKOUT = gql`
  mutation DeleteWorkout($id: ID!) {
    deleteWorkout(id: $id) # Retorna true ou o ID excluído
  }
`;