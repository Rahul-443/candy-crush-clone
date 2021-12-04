const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.saveScore = functions.https.onRequest(async (req, res) => {
  const user_id = req.body.user_id;
  const score = req.body.score;
  const ref = admin.database.ref(user_id);

  ref.update({
    score: score
  });

  res.json({ score: score });
});
