import React, { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout';
import NatureBackground from './components/NatureBackground';
import JournalEntryForm from './components/JournalEntryForm';
import EntryList from './components/EntryList';
import Garden from './components/Garden';
import api from './services/api';
import { parseDate } from './utils/dates';

const localInsights = (entries) => {
  const average = entries.length ? entries.reduce((n, entry) => n + entry.mood, 0) / entries.length : 0;
  return { average, trend: entries.length > 1 && entries[0].mood >= entries[entries.length - 1].mood ? 'gently rising' : 'changing with care', themes: ['reflection'], strength: 'You are creating space to listen to your inner world.', suggestion: 'Try ending one entry with: What did I need today?', response: entries[0]?.text ? 'Your reflection has begun to take root.' : '', entryInsights: [] };
};
const normalise = (entry) => ({ ...entry, date: entry.createdAt || entry.date });
const orbColor = (v) => { const n = Number(v); if (n >= 4) return 'radial-gradient(circle, #f4d99c, #bc9b5f 42%, transparent 70%)'; if (n >= 3) return 'radial-gradient(circle, #b8cfa0, #7da07a 42%, transparent 70%)'; if (n >= 2) return 'radial-gradient(circle, #aec4d4, #6090b0 42%, transparent 70%)'; return 'radial-gradient(circle, #c9b5b5, #9a7a7a 42%, transparent 70%)'; };
const barColor = (m) => m >= 4 ? 'linear-gradient(#e4c579, #84a779)' : m >= 3 ? 'linear-gradient(#b8cfa0, #6d8f6a)' : m >= 2 ? 'linear-gradient(#aec4d4, #6090b0)' : 'linear-gradient(#c9b5b5, #9a7a7a)';

export default function App() {
  const [session, setSession] = useState(() => { try { return JSON.parse(localStorage.getItem('aks-rooh-session')); } catch { return null; } });
  const [entries, setEntries] = useState([]);
  const [view, setView] = useState('journal');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [submittingEntry, setSubmittingEntry] = useState(false);
  const [loading, setLoading] = useState(Boolean(session));
  const [insight, setInsight] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('aks-rooh-theme') || 'night');
  const user = session?.user;
  const insights = useMemo(() => insight || localInsights(entries), [entries, insight]);

  const signOut = () => {
    localStorage.removeItem('aks-rooh-session');
    setSession(null);
    setEntries([]);
    setInsight(null);
    setView('journal');
  };
  const handleRequestError = (requestError) => {
    if (requestError.status === 401) {
      signOut();
      setError('Your session has expired. Please sign in again.');
      return;
    }
    setError(requestError.message);
  };
  const load = async (token) => {
    const [entryData, insightData] = await Promise.all([api.entries(token), api.insights(token)]);
    setEntries(entryData.entries.map(normalise));
    const value = insightData.insights;
    setInsight({ average: value.averageMood || 0, trend: value.moodRhythm, themes: value.themes, strength: value.strength, suggestion: value.suggestion, response: value.response, entryInsights: value.entryInsights || [] });
  };
  useEffect(() => {
    if (!session?.token) return;
    setLoading(true);
    load(session.token).catch(handleRequestError).finally(() => setLoading(false));
  }, [session?.token]);
  const authenticate = (result) => {
    localStorage.setItem('aks-rooh-session', JSON.stringify(result));
    setSession(result);
  };

  const add = async (entry) => {
    setSubmittingEntry(true);
    try {
      const result = await api.createEntry(session.token, entry);
      setEntries((current) => [normalise(result.entry), ...current]);
      setInsight(null);
      const refreshed = await api.insights(session.token);
      const value = refreshed.insights;
      setInsight({ average: value.averageMood || 0, trend: value.moodRhythm, themes: value.themes, strength: value.strength, suggestion: value.suggestion, response: value.response, entryInsights: value.entryInsights || [] });
      setNotice('Your reflection has been planted. The garden is listening.');
      setTimeout(() => setNotice(''), 4500);
      return true;
    } catch (e) { handleRequestError(e); return false; } finally { setSubmittingEntry(false); }
  };
  const remove = async (id) => {
    try {
      await api.deleteEntry(session.token, id);
      setEntries((current) => current.filter((entry) => entry.id !== id));
      setInsight(null);
    } catch (e) {
      handleRequestError(e);
    }
  };

  if (!user) return <Layout theme={theme}><NatureBackground showBloom={false} theme={theme} /><AuthScreen onAuthenticated={authenticate} /></Layout>;

  return (
    <Layout theme={theme}>
      <NatureBackground showBloom={entries.length > 0} theme={theme} />
      <div className="app-shell">
        <header className="topbar">
          <button className="brand" onClick={() => setView('journal')}><span className="brand-mark">*</span><span>Aks Rooh</span></button>
          <nav className="nav-tabs">
            {[['journal', 'Journal'], ['insights', 'Insights'], ['garden', 'Garden']].map(([key, label]) => (
              <button key={key} className={view === key ? 'active' : ''} onClick={() => setView(key)} aria-current={view === key ? 'page' : undefined}>{label}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button className="theme-toggle" onClick={() => { const t = theme === 'night' ? 'day' : 'night'; setTheme(t); localStorage.setItem('aks-rooh-theme', t); }} aria-label="Toggle theme" title={theme === 'night' ? 'Switch to forest day' : 'Switch to midnight purple'}>
              <span className={`toggle-track ${theme === 'day' ? 'day' : 'night'}`}>
                <span className="toggle-knob" />
              </span>
            </button>
            <button className="profile-button" onClick={() => setView('profile')}>{user.name.slice(0, 1).toUpperCase()}</button>
          </div>
        </header>
        <main className="content">
          {loading && <p className="page-loading">Tending your garden...</p>}
          {notice && <div className="notice">{notice}</div>}
          {error && <div className="form-error page-error">{error} <button onClick={() => setError('')}>x</button></div>}
          {view === 'journal' && <><JournalEntryForm onSubmit={add} onViewInsights={() => setView('insights')} response={insight?.response} submitting={submittingEntry} /><EntryList entries={entries} onDelete={remove} /></>}
          {view === 'insights' && <Insights entries={entries} insights={insights} user={user} />}
          {view === 'garden' && <Garden entries={entries} user={user} />}
          {view === 'profile' && <Profile user={user} entries={entries} token={session.token} onSignOut={signOut} onError={handleRequestError} />}
        </main>
        <footer>Private by design. Aks Rooh offers reflection, not medical or mental-health diagnosis.</footer>
      </div>
    </Layout>
  );
}

function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (password.length < 8) return setError('Use at least 8 characters for your password.');
    setBusy(true); setError('');
    try { const result = mode === 'register' ? await api.register({ name, email, password }) : await api.login({ email, password }); await onAuthenticated(result); }
    catch (requestError) { setError(requestError.message); } finally { setBusy(false); }
  };
  return (
    <main className="auth-wrap reveal">
      <section className="auth-card">
        <div className="auth-brand"><span>*</span> Aks Rooh</div>
        <p className="eyebrow">YOUR PRIVATE SOUL GARDEN</p>
        <h1>{mode === 'login' ? 'Welcome back.' : 'Begin your garden.'}</h1>
        <form onSubmit={submit}>
          {mode === 'register' && <label>Your name<input required value={name} onChange={(e) => setName(e.target.value)} /></label>}
          <label>Email address<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label>Password<input required type="password" minLength="8" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          {error && <div className="form-error">{error}</div>}
          <button disabled={busy} className="plant-button auth-submit">{busy ? 'Please wait...' : mode === 'login' ? 'Enter my garden' : 'Create my garden'}</button>
        </form>
        <button className="auth-switch" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'New here? Create an account' : 'Already have an account? Sign in'}</button>
        <small>Your password is secured by the API; this browser stores only your session token. Journal reflections stay on your server unless external AI processing is explicitly enabled.</small>
      </section>
    </main>
  );
}

function Profile({ user, entries, token, onSignOut, onError }) {
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const exportData = async () => {
    setExporting(true);
    try {
      const data = await api.exportData(token);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'aks-rooh-export.json';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      onError(error);
    } finally {
      setExporting(false);
    }
  };
  const deleteAccount = async () => {
    if (!window.confirm('Delete your account and every journal entry permanently? This cannot be undone.')) return;
    setDeleting(true);
    try {
      await api.deleteAccount(token);
      onSignOut();
    } catch (error) {
      onError(error);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <section className="page-section reveal">
      <p className="eyebrow">YOUR PROFILE</p>
      <div className="profile-avatar">{user.name.slice(0, 1).toUpperCase()}</div>
      <h1>{user.name}'s garden</h1>
      <p className="lede">{user.email}</p>
      <div className="profile-stats">
        <div><strong>{entries.length}</strong><span>reflections</span></div>
        <div><strong>Private</strong><span>server profile</span></div>
      </div>
      <div className="profile-actions">
        <button className="signout-button" onClick={exportData} disabled={exporting}>
          {exporting ? 'Preparing export...' : 'Download my journal'}
        </button>
        <button className="signout-button" onClick={onSignOut}>Sign out</button>
        <button className="signout-button" onClick={deleteAccount} disabled={deleting}>
          {deleting ? 'Deleting account...' : 'Delete account'}
        </button>
      </div>
    </section>
  );
}

function Insights({ entries, insights, user }) {
  const moodIcons = ['\u2601', '\u25D4', '\u263E', '\u2600', '\u2726'];
  const moodLabels = ['Heavy', 'Low', 'Steady', 'Light', 'Bright'];
  const count = entries.length;
  const name = user?.name?.split(' ')[0] || 'dear one';
  const greeting = (() => { const h = new Date().getHours(); if (h < 12) return 'Good morning,'; if (h < 18) return 'Good afternoon,'; return 'Good evening,'; })();
  const totalWords = entries.reduce((n, e) => n + (e.text?.split(/\s+/).filter(Boolean).length || 0), 0);
  const avgWords = count ? Math.round(totalWords / count) : 0;
  const sortedByDate = [...entries].sort((a, b) => {
    const first = parseDate(a.date)?.getTime() ?? Number.POSITIVE_INFINITY;
    const second = parseDate(b.date)?.getTime() ?? Number.POSITIVE_INFINITY;
    return first - second;
  });
  const dates = sortedByDate.map(e => parseDate(e.date)).filter(Boolean);
  const firstDate = dates[0]; const lastDate = dates[dates.length - 1];
  const daysActive = firstDate && lastDate ? Math.max(1, Math.round((lastDate - firstDate) / 86400000) + 1) : 0;
  const entriesPerWeek = daysActive ? (count / daysActive * 7).toFixed(1) : 0;
  const moodFreq = {}; entries.forEach(e => { moodFreq[e.mood] = (moodFreq[e.mood] || 0) + 1; });
  const mostFreqMood = count ? Object.entries(moodFreq).sort((a, b) => b[1] - a[1])[0][0] : null;
  const mostFreqLabel = mostFreqMood ? moodLabels[mostFreqMood - 1] : '-';
  const mostFreqPct = mostFreqMood ? Math.round((moodFreq[mostFreqMood] / count) * 100) : 0;
  const avgMoodDisplay = insights.average ? insights.average.toFixed(1) : (count ? (entries.reduce((s, e) => s + e.mood, 0) / count).toFixed(1) : '-');
  const last7 = sortedByDate.slice(-7);
  const last7Moods = last7.map(e => e.mood);
  const trend = last7Moods.length > 1 ? (last7Moods[last7Moods.length - 1] > last7Moods[0] ? 'gently rising' : last7Moods[last7Moods.length - 1] < last7Moods[0] ? 'gently declining' : 'steady') : '-';
  const trendArrow = trend.includes('rising') ? '\u2197' : trend.includes('declining') ? '\u2198' : '\u2192';

  let streak = 0;
  if (dates.length) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    for (let i = dates.length - 1; i >= 0; i--) {
      const diff = Math.round((today - dates[i]) / 86400000);
      if (diff === streak) streak++; else if (diff > streak) break;
    }
  }

  const hourCounts = {};
  dates.forEach(d => {
    const h = d.getHours();
    const period = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';
    hourCounts[period] = (hourCounts[period] || 0) + 1;
  });
  const preferredTime = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
  const shortEntryPct = count ? Math.round((entries.filter(e => (e.text?.split(/\s+/).filter(Boolean).length || 0) < 15).length / count) * 100) : 0;

  const getSuggestion = () => {
    if (count === 0) return 'Write your first reflection to see insights.';
    if (count < 3) return 'Try writing three entries this week.';
    if (shortEntryPct > 40) return 'Most entries are brief. Try expanding just one.';
    if (avgMoodDisplay < 2.5) return 'Write about one small comfort you reached for today.';
    if (insights.themes?.includes('restoration')) return 'Name one specific act of rest this week.';
    if (insights.themes?.includes('connection')) return 'Write about a conversation that stayed with you.';
    if (insights.themes?.includes('quiet growth')) return 'Re-read your earliest entry.';
    return 'End one entry with: What did I need today?';
  };

  return (
    <section className="page-section reveal">
      <p className="eyebrow">YOUR INNER WEATHER, {user?.name?.toUpperCase() || 'GENTLE ONE'}</p>
      <h1>{greeting} {name}.<br />A garden of small understandings.</h1>
      <p className="lede">A gentle reading of the {count} reflection{count !== 1 ? 's' : ''} you have planted.</p>
      {count === 0 ? (
        <article className="panel response-panel">
          <p className="panel-label">THE GARDEN IS QUIET</p>
          <h2>Your first seed awaits</h2>
          <p>No reflections yet, {name}. Return to Journal and write your first entry.</p>
        </article>
      ) : (
        <>
          {insights.response && (
            <article className="panel response-panel">
              <p className="panel-label">THE GARDEN WHISPERS</p>
              <h2>What the garden says to {name}</h2>
              <p className="response-text">{insights.response}</p>
            </article>
          )}
          <div className="stats-bar">
            <div className="stat-item"><span className="stat-value">{count}</span><span className="stat-label">reflections</span></div>
            <div className="stat-item"><span className="stat-value">{totalWords}</span><span className="stat-label">words</span></div>
            <div className="stat-item"><span className="stat-value">{avgWords}</span><span className="stat-label">avg words</span></div>
            <div className="stat-item"><span className="stat-value">{daysActive}</span><span className="stat-label">days</span></div>
            <div className="stat-item"><span className="stat-value">{entriesPerWeek}</span><span className="stat-label">per week</span></div>
            <div className="stat-item"><span className="stat-value">{streak}</span><span className="stat-label">streak</span></div>
          </div>
          <div className="insight-grid">
            <article className="panel mood-panel-wide">
              <p className="panel-label">MOOD RHYTHM</p>
              <div className="mood-header">
                <div className="mood-avg-orb" style={{ background: orbColor(avgMoodDisplay) }}><span className="avg-value">{avgMoodDisplay}</span></div>
                <div className="mood-details">
                  <h2>Your mood rhythm {trendArrow} {trend}</h2>
                  <p>Most common: {mostFreqLabel} ({mostFreqPct}%) | You write best in the {preferredTime}</p>
                </div>
              </div>
            </article>
            <article className="panel"><p className="panel-label">BLOOMING STRENGTH</p><h2>Self-awareness</h2><p>{insights.strength}</p></article>
            <article className="panel"><p className="panel-label">GENTLE INVITATION</p><h2>Make room</h2><p>{getSuggestion()}</p></article>
          </div>
          <div className="report-grid">
            <article className="panel chart-panel">
              <p className="panel-label">MOOD TREND</p>
              <h2>Your last seven check-ins</h2>
              <div className="chart">{entries.slice(0, 7).reverse().map((entry) => (
                <div className="bar-wrap" key={entry.id}><div className="bar" style={{ height: entry.mood * 17 + 'px', background: barColor(entry.mood) }} /><span>{entry.mood}/5</span></div>
              ))}</div>
            </article>
            <article className="panel">
              <p className="panel-label">RECURRING NOTES</p>
              <h2>What returns in {name}'s reflections</h2>
              {insights.themes?.length ? (
                <div className="theme-list">{insights.themes.map(theme => <span key={theme}>* {theme}</span>)}</div>
              ) : (
                <p>Themes emerge as you write more. Aim for 5+ entries.</p>
              )}
            </article>
          </div>
        </>
      )}
    </section>
  );
}
