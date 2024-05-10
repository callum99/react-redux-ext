# react-redux-ext

Utilising skills learnt to create a reactJS chrome extension. 
* This extension will use webpack to minify the typescript files for the chrome extension visuals.
* Redux has been integrated for passing of a single state around the vairous parts of the application.
* React-Redux has been added for the UI side so my redux store can update state accordingly when required.

## How is the state controlled

Currently we have a mixture of writers and readers, each being a redux instance (store). 

In order to have a single source of truth throughout the application, we intially need a writer, this was assigned to the service worker as this is where we want to control the data being dispatched within the redux instance. Every other instance of Redux is going to be setup to be a reader.

In order to simplify this and to remove boilder plate we have created a Redux wrapper to control every instance of redux for both readers and writers.

Redux Roles: 
- <strong>Service Worker</strong> | WRITER | stores and sets new data on request from a reader
- <strong>Popup</strong>          | READ ONLY | watches for storage changes and then updates its self.
- <strong>Content Script</strong> | READ ONLY | Currently not sure but would in the same sense as Popup

  
Utilisation of react-redux has been used to remove the bolider plate code from the react components, but still allowing the use of Set, Get & subsribe redux actions under the instead of a reader. So the writer (service worker) will still be controlling what is updated within this state cycle. 
