const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.saveScore = functions.https.onCall((data, context) => {
  const userId = data.user_id;
  const score = data.score;
  const ref = admin.database().ref(userId);

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
  const ref = admin.database().ref(userId);

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated'
    );
  } else {
    let chancesLeft;
    ref.once(
      'value',
      snapshot => {
        if (!snapshot.exists()) {
          throw new functions.https.HttpsError(
            'not-found',
            `The user's data was not found`
          );
        } else {
          chancesLeft = snapshot.val().chances_left;
          let cl = chancesLeft - 1;
          if (cl > -1) {
            const chancesLeftObj = { chances_left: cl };
            ref.update(chancesLeftObj);
            return chancesLeftObj;
          }
        }
      },
      errorObject => {
        console.log(errorObject);
      }
    );
  }
});

exports.addNewUser = functions.https.onCall((data, context) => {
  const userId = data.user_id;
  const ref = admin.database().ref(userId);

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated'
    );
  } else {
    ref.once(
      'value',
      snapshot => {
        if (snapshot.exists()) {
          throw new functions.https.HttpsError(
            'already-exists',
            'The user already exists in the database'
          );
        } else {
          dataExists = false;
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
  .schedule('every 24 hours')
  .onRun(context => {
    const ref = admin.database().ref();

    ref.once(
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
