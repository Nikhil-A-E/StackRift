const admin = require('firebase-admin');

// Initialize Firebase Admin (handles both local dev and production Netlify)
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
    const { token, username, email } = JSON.parse(event.body);

    if (!token || !username || !email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    // Verify token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;
    const db = admin.firestore();

    // Check if username is already taken globally
    const usersRef = db.collection('users');
    const q = await usersRef.where('username', '==', username).get();
    
    if (!q.empty) {
      return { 
        statusCode: 409, 
        body: JSON.stringify({ error: 'Username is already taken' }) 
      };
    }

    // Create user document
    await usersRef.doc(userId).set({
      userId: userId,
      username: username,
      email: email,
      highestScore: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'User profile created' })
    };

  } catch (error) {
    console.error('Signup error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
