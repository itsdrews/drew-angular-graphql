import { ApplicationConfig, inject, PLATFORM_ID } from '@angular/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink, Observable } from '@apollo/client/core';
import { isPlatformBrowser } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// Criamos um link customizado manualmente para substituir o setContext
const authLink = new ApolloLink((operation, forward) => {
  const platformID = inject(PLATFORM_ID)
  let token= null;
  
  if (isPlatformBrowser(platformID)){

    const token = localStorage.getItem('auth_token');
  }

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
    provideRouter(routes),
    // Configuração crucial para SSR e Performance
    provideHttpClient(withFetch()), 
    
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({ 
          uri: 'http://localhost:8080/graphql', // Substitua pela sua URL real
        }),
        cache: new InMemoryCache(),
      };
    }),
  ],
};
