import { auth } from './firebase-config.js';

export async function submitGlobalScore(score, username = null) {
  let token = null;
  
  if (auth.currentUser) {
    try {
      token = await auth.currentUser.getIdToken(true);
    } catch (e) {
      console.warn("Could not get auth token, submitting as guest if username provided.");
    }
  }

  if (!token && !username) {
    throw new Error('Must be logged in or provide a username to submit a global score');
  }

  try {
    const payload = token ? { token, score } : { username, score };
    const response = await fetch('/.netlify/functions/submit-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit score');
    }
    
    return data; // { success, highestScore, wasUpdated, rank }
  } catch (error) {
    console.error('Score submission error:', error);
    throw error;
  }
}
