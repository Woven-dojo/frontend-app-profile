import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR,
  APP_READY,
  initialize,
  mergeConfig,
  subscribe,
} from '@edx/frontend-platform';
import {
  AppProvider,
  ErrorPage,
} from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform/config';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';

import { Header, Footer } from '@woven-dojo/dojo-frontend-common/dist/components';
import appMessages from './i18n';
import { ProfilePage, NotFoundPage } from './profile';
import configureStore from './data/configureStore';

import './index.scss';

subscribe(APP_READY, () => {
  const { BASE_URL, LOGOUT_URL } = getConfig();
  const { username } = getAuthenticatedUser();
  ReactDOM.render(
    <AppProvider store={configureStore()}>
      <Header
        logoDestination={`${BASE_URL}/dashboard`}
        logoDestinationTarget="_self"
        username={username}
        userMenu={[
          {
            label: 'Dashboard',
            href: `${BASE_URL}/dashboard`,
          },
          {
            label: 'Profile',
            href: `${BASE_URL}/u/${username}`,
          },
          {
            label: 'Account',
            href: `${BASE_URL}/account/settings`,
          },
          {
            label: 'Logout',
            href: LOGOUT_URL,
          },
        ]}
        actionMenu={[
          {
            label: 'Courses',
            href: `${BASE_URL}/dashboard`,
            target: '_self',
          },
        ]}
      />
      <main>
        <Switch>
          <Route path="/u/:username" component={ProfilePage} />
          <Route path="/notfound" component={NotFoundPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </main>
      <Footer left={`Copyright ${new Date().getFullYear()} Dojo. All rights reserved`} />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages: [appMessages],
  requireAuthenticatedUser: true,
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig({
        ENABLE_LEARNER_RECORD_MFE: (process.env.ENABLE_LEARNER_RECORD_MFE || false),
        LEARNER_RECORD_MFE_BASE_URL: process.env.LEARNER_RECORD_MFE_BASE_URL,
      }, 'App loadConfig override handler');
    },
  },
});
