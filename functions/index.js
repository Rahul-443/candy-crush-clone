const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { createDfuseClient, waitFor } = require('@dfuse/client');
const { DFUSE_API_KEY } = require('./config');

global.fetch = require('node-fetch');
global.WebSocket = require('ws');

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
  const ref = admin.database().ref(`users/${userId}/chances_left`);

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated'
    );
  } else {
    ref.once(
      'value',
      snapshot => {
        if (!snapshot.exists()) {
          throw new functions.https.HttpsError(
            'not-found',
            `The user's data was not found`
          );
        } else {
          let cl = snapshot.val();
          if (cl > 0) {
            ref.set(cl - 1);
            return true;
          }
        }
      },
      errorObject => {
        console.log(errorObject);
      }
    );
  }
});

exports.addOneChance = functions.https.onCall((data, context) => {
  const userId = data.user_id;
  const trxId = data.trx_id;
  const ref = admin.database().ref(`users/${userId}/chances_left`);

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated'
    );
  } else {
    ref.once('value', snapshot => {
      if (!snapshot.exists()) {
        throw new functions.https.HttpsError(
          'not-found',
          `The user's data was not found`
        );
      } else if (checkTrx(trxId, '10.0000 ZANY')) {
        let cl = snapshot.val();
        if (cl < 5 && cl > 0) {
          ref.set(cl + 1);
          return true;
        }
      }
    });
  }
});

exports.resetAllChances = functions.https.onCall((data, context) => {
  const userId = data.user_id;
  const trxId = data.trx_id;
  const ref = admin.database().ref(`users/${userId}/chances_left`);

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated'
    );
  } else {
    ref.once('value', snapshot => {
      if (!snapshot.exists()) {
        throw new functions.https.HttpsError(
          'not-found',
          `The user's data was not found`
        );
      } else if (checkTrx(trxId, '50.0000 ZANY')) {
        let cl = snapshot.val();
        if (cl === 0) {
          ref.set(cl + 5);
          return true;
        }
      }
    });
  }
});

exports.addNewUser = functions.https.onCall((data, context) => {
  const userId = data.user_id;
  const ref = admin.database().ref(`users/${userId}`);

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
            score: 0,
            high_score: 0,
            time_taken_high_score: 0,
            time_taken_score: 0,
            zany_pts_hscore: 0,
            zany_pts_score: 0
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

exports.updateLeaderboard = functions.database
  .ref(`/users`)
  .onWrite((snapshot, context) => {
    const ref = admin.database().ref(`leaderboard`);
    let usersData = snapshot.after.val();
    let userDataByRank = {};
    const usersDataKeys = Object.keys(usersData);
    let highScores = [];
    let scores = [];
    let timeTakenHighScores = [];
    let timeTakenScores = [];
    let rankScores = [];
    let rankTimeTaken = [];
    let rankPts = [];
    usersDataKeys.forEach(userKey => {
      highScores.push(usersData[userKey]['high_score']);
      scores.push(usersData[userKey]['score']);
      timeTakenHighScores.push(usersData[userKey][`time_taken_high_score`]);
      timeTakenScores.push(usersData[userKey]['time_taken_score']);
    });
    for (let i = 0; i < highScores.length; i++) {
      let rankPtsHighScore;
      let rankPtsScore;
      if (timeTakenHighScores[i] !== 0) {
        rankPtsHighScore = highScores[i] / timeTakenHighScores[i];
      } else {
        rankPtsHighScore = 0;
      }
      if (timeTakenScores[i] !== 0) {
        rankPtsScore = scores[i] / timeTakenScores[i];
      } else {
        rankPtsScore = 0;
      }
      if (highScores[i] > scores[i]) {
        rankScores.push(highScores[i]);
        rankTimeTaken.push(timeTakenHighScores[i]);
        rankPts.push(rankPtsHighScore);
      } else {
        rankScores.push(scores[i]);
        rankTimeTaken.push(timeTakenScores[i]);
        rankPts.push(rankPtsScore);
      }
    }
    let scoresOld = [];
    scoresOld.push(...rankScores);
    rankScores.sort(function(a, b) {
      return b - a;
    });

    rankScores.forEach(score => {
      let oldScoreIndex = scoresOld.indexOf(score);
      let user = usersDataKeys[oldScoreIndex];
      let userZanyPts = rankPts[oldScoreIndex];
      let userTimeTaken = rankTimeTaken[oldScoreIndex];
      userDataByRank[user] = {
        highScore: score,
        pts: userZanyPts.toFixed(3),
        timeTaken: changeValToTime(userTimeTaken)
      };
      scoresOld[oldScoreIndex] = '';
    });

    ref.update(userDataByRank).catch(error => {
      console.log(error);
    });
  });

exports.refreshGame = functions.pubsub
  .schedule('every 24 hours')
  .onRun(context => {
    const ref = admin.database().ref(`users`);

    ref.once(
      'value',
      snapshot => {
        snapshot.forEach(child => {
          child.ref.update({
            chances_left: 5,
            high_score: 0,
            score: 0,
            time_taken_high_score: 0,
            time_taken_score: 0,
            zany_pts_hscore: 0,
            zany_pts_score: 0
          });
        });
      },
      errorObject => {
        console.log(errorObject);
      }
    );

    return null;
  });

function changeValToTime(timeTaken) {
  let mins = `00`;
  let secs = `00`;
  let time = `00:00`;
  mins = Math.floor(timeTaken / 60);
  if (timeTaken >= 60) {
    secs = timeTaken % 60;
  } else {
    secs = timeTaken;
  }
  if (mins > 10 && secs > 10) {
    mins = `${mins}`;
    secs = `${secs}`;
  } else if (mins > 10 && secs < 10) {
    mins = `${mins}`;
    secs = `0${secs}`;
  } else if (mins < 10 && secs > 10) {
    mins = `0${mins}`;
    secs = `${secs}`;
  } else if (mins < 10 && secs < 10) {
    mins = `0${mins}`;
    secs = `0${secs}`;
  }
  time = `${mins}:${secs}`;
  return time;
}

async function checkTrx(id, quantity) {
  const client = createDfuseClient({
    apiKey: DFUSE_API_KEY,
    network: 'wax.dfuse.eosnation.io'
  });

  await client
    .fetchTransaction(id)
    .then(res => {
      if (
        (res.transaction.actions[0].data.to =
          'zanygumplays' &&
          (res.transaction.actions[0].data.quantity = quantity))
      ) {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.log(error);
      return false;
    });
}
