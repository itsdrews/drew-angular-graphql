import { gql } from 'apollo-angular';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    # CORREÇÃO: Envolvemos os dados em 'input: { ... }'
    login(input: { email: $email, password: $password }) {
      token
      user {
        id
        name   # Ajustado de 'title' para 'name' (que é o campo real do User)
        email
      }
    }
  }
`;
export const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    # Note o "input: { ... }" para casar com o @Argument do Java
    register(input: { name: $name, email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;