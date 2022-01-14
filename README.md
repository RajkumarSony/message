# Message Hub (under development*)
Simple. Secure.
Reliable messaging.
With [Message Hub](https://secure-message-hub.herokuapp.com/), you'll get fast, simple, secure messaging for free*, available on the web all over the world.
Data charges may apply. Contact your provider for details.

## Database
[firebase](firebase.google.com/)'s Realtime Database is used to store your `encrypted`(*working on encryption currently) messages. This allows client's to communicate with each other in RealTime.
[Firebase Cloud Storage](https://firebase.google.com/products/storage) is used to store profile pictures of your. 

## Authentication
[Firebase Authentication](https://firebase.google.com/products/auth) is used to identify user's so in this way your email  is shared with firebase aka google for registration purpose.
*plannig to add more way to authenticate.

## Technology used
### Firebase 
 1. Database 
 2. Sotrage
 3. Authentication 
 
### React Js- Frontend
The Web app is powered by React Js frontend Library. various library are used along with [React Js](https://reactjs.org/).
react routers are used to make single page application and hassel free and smooth page load. consuming less data 

#### Chakra-ui
[Chakra-Ui](https://chakra-ui.com/) is used as css framework along with react js . In short Chkra-ui is component based css framework for ReactJs.

#### Axios
[Axios](https://www.npmjs.com/package/axios) used to make api request with backend .

#### firebase-client
Firebase client library is used to acces firebase database,storage and authentication. 

### NodeJs - Backend
#### Express
epxress is used to make server for api request . 
#### Firebase-admin 
firebase admin sdk is used for verifying and writing to database .
