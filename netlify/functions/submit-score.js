const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID?.replace(/"/g, ''),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL?.replace(/"/g, ''),
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').replace(/"/g, '')
      })
    });
  } catch (error) {
    console.error('Firebase Admin init error:', error);
  }
}

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { token, score, username } = JSON.parse(event.body);

    if (typeof score !== 'number' || score < 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid score payload' }) };
    }
    
    // Sanity check for score (anti-tampering)
    if (score > 9999) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Score exceeds maximum allowed limits' }) };
    }

    let userId, finalUsername;
    if (token) {
      const decodedToken = await admin.auth().verifyIdToken(token);
      userId = decodedToken.uid;
      const userRecord = await admin.auth().getUser(userId);
      finalUsername = userRecord.displayName || 'Player';
    } else if (username) {
      userId = 'guest_' + username.replace(/[^a-zA-Z0-9]/g, '');
      finalUsername = username.substring(0, 16);
    } else {
      return { statusCode: 400, body: JSON.stringify({ error: 'Must provide token or username' }) };
    }

    const db = admin.firestore();
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    const d = new Date();
    const dateStr = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;

    let newHighest = score;
    let wasUpdated = false;

    if (!userDoc.exists) {
      await userRef.set({
        username: finalUsername,
        highestScore: score,
        date: dateStr
      });
      wasUpdated = true;
    } else {
      const currentData = userDoc.data();
      const currentHighest = currentData.highestScore || 0;

      newHighest = currentHighest;

      // Only update if the new score is strictly greater
      if (score > currentHighest) {
        await userRef.update({ highestScore: score, date: dateStr });
        newHighest = score;
        wasUpdated = true;
      }
    }

    // Calculate current rank roughly
    const higherScoresSnapshot = await db.collection('users')
      .where('highestScore', '>', newHighest)
      .count()
      .get();
      
    const rank = higherScoresSnapshot.data().count + 1;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        highestScore: newHighest, 
        wasUpdated: wasUpdated,
        rank: rank
      })
    };

  } catch (error) {
    console.error('Score submit error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
