import * as functions from 'firebase-functions';
import * as sudokuController from './controllers/sudokuConrtoller';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const solve = functions.https.onRequest(sudokuController.app);