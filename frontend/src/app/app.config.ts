import { ApplicationConfig, inject } from '@angular/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink, Observable } from '@apollo/client/core';

// Criamos um link customizado manualmente para substituir o setContext
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('auth_token');

  // Modificamos o contexto da operação diretamente
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

  return forward(operation);
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        cache: new InMemoryCache(),
        // Concatenamos o link de auth com o link http injetado
        link: authLink.concat(
          httpLink.create({
            uri: 'https://localhost:8080/graphql',
          }),
        ),
      };
    }),
  ],
};
