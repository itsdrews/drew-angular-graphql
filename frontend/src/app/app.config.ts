import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { InMemoryCache, createHttpLink } from '@apollo/client/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),

    provideApollo(() => ({
      link: createHttpLink({
        uri: 'http://localhost:8080/graphql',
      }),
      cache: new InMemoryCache(),
    })),
  ],
};
