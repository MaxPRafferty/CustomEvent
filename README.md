# CustomEvent
A window.CustomEvent polyfill.

Created to correct some minor errors/issues with the MDN snippet polyfill. Additionally, wrapped in a module for NPM and agressively autopolyfill'd in order to maximally support unit test environments in particular (node with mocha and jsDom was not served by any of the many custom event polyfill variants out there at time of writing). 

## Install
`npm install custom-event-autopolyfill`
