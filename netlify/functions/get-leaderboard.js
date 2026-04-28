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
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const db = admin.firestore();
    
    // Fetch top 50 users sorted by highestScore descending
    const snapshot = await db.collection('users')
      .orderBy('highestScore', 'desc')
      .limit(50)
      .get();

    const leaderboard = [];
    let rank = 1;
    
    snapshot.forEach(doc => {
      const data = doc.data();
      // Only include players who have actually played (score > 0)
      if (data.highestScore > 0) {
        leaderboard.push({
          rank: rank++,
          username: data.username,
          highestScore: data.highestScore,
          date: data.date || ''
        });
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(leaderboard)
    };

  } catch (error) {
    console.error('Leaderboard fetch error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
