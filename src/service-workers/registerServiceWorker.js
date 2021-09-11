import { register } from 'register-service-worker';
import { URL_INFO } from '@/shared/common/constants';

//console.log("DIRECTOY_NAME==", URL_INFO)
if (process.env.NODE_ENV === 'production' && (location.host == 'localhost' || location.protocol == 'https:')) {
  // register(`${process.env.BASE_URL}service-worker.js`, {
    register(`${URL_INFO.SYMLINK_BASE_URL}service-worker.js`, {
    ready () {
      console.log('Service worker is active.');
    },
    registered (registration) {
      console.log('Service worker has been registered.');

      // Routinely check for app updates by testing for a new service worker.
      // setInterval(() => {
      //   registration.update();
      // }, 1000 * 60 * 60); // hourly checks
    },
    cached () {
      console.log('Content has been cached for offline use.');
    },
    updatefound () {
      console.log('New content is downloading.');
    },
    updated (registration) {
      console.log('New content is available; please refresh.');

      // Add a custom event and dispatch it.
      // Used to display of a 'refresh' banner following a service worker update.
      // Set the event payload to the service worker registration object.
      document.dispatchEvent(
        new CustomEvent('swUpdated', { detail: registration })
      );
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error (error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
