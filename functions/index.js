const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.saveScore = functions.https.onCall((data, context) => {
  const userId = data.user_id;
  const score = data.score;
  const ref = admin.database.ref(userId);

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated'
    );
  } else {
    if (!(typeof score === 'number') || score === -1) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The function must be called with one arguments "score" containing the score to add'
      );
    } else {
      const updatedScore = {
        score: score
      };
      ref.update(updatedScore);
      return updatedScore;
    }
  }
});

exports.removeOneChance = functions.https.onCall((data, context) => {
  const userId = data.user_id;
  const ref = admin.database.ref(userId);

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated'
    );
  } else {
    ref.on(
      'value',
      snapshot => {
        let chancesLeft = snapshot.val().chances_left;
        if (chancesLeft > -1) {
          const chancesLeftObj = { chances_left: chancesLeft-- };
          ref.update(chancesLeftObj);
          return chancesLeftObj;
        }
      },
      errorObject => {
        console.log(errorObject);
      }
    );
  }
});

exports.addNewUser = functions.https.onRequest((data, context) => {
  const userId = req.query.user_id;
  const ref = admin.database.ref(userId);

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated'
    );
  } else {
    ref.on(
      'value',
      snapshot => {
        if (snapshot.exists()) {
          throw new functions.https.HttpsError(
            'already-exists',
            'The user already exists in the database'
          );
        } else {
          const newUserData = {
            chances_left: 5,
            score: 0
          };
          ref.set(newUserData);
          return newUserData;
        }
      },
      errorObject => {
        console.log(errorObject);
      }
    );
  }
});

exports.refreshGame = functions.pubsub
  .schedule('0 8 * * *')
  .timeZone('America/New_York')
  .onRun(context => {
    const ref = admin.database.ref();

    ref.on(
      'value',
      snapshot => {
        snapshot.forEach(child => {
          child.ref.update({
            chances_left: 5,
            score: 0
          });
        });
      },
      errorObject => {
        console.log(errorObject);
      }
    );
    return null;
  });
