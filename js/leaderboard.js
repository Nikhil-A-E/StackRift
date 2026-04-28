export async function fetchGlobalLeaderboard() {
  try {
    const response = await fetch('/.netlify/functions/get-leaderboard?t=' + Date.now(), { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch global leaderboard');
    return await response.json();
  } catch (error) {
    console.error('Leaderboard error:', error);
    return [];
  }
}

export function renderGlobalLeaderboard(container, data, currentUsername = '') {
  if (!container) return;
  
  let html = '<div id="lb-title">Global Leaderboard</div>';

  if (!data || data.length === 0) {
    container.innerHTML = html + '<div style="text-align:center;color:rgba(255,255,255,.25);font-size:13px;padding:16px 0">No global scores yet. Be the first!</div>';
    return;
  }

  data.forEach((s) => {
    const rankClass = s.rank === 1 ? 'gold' : s.rank === 2 ? 'silver' : s.rank === 3 ? 'bronze' : '';
    const isMe = s.username === currentUsername;
    const hl = isMe ? 'highlight' : '';
    const dateStr = s.date ? `<span class="lb-date">${escHtml(s.date)}</span>` : '';
    
    html += `
      <div class="lb-row ${hl}">
        <span class="lb-rank ${rankClass}">${s.rank}</span>
        <span class="lb-name">${escHtml(s.username)}</span>
        <span class="lb-score">${s.highestScore}</span>
        ${dateStr}
      </div>`;
  });
  
  container.innerHTML = html;
}

function escHtml(s) { 
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); 
}
