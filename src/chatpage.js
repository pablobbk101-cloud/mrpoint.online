export const CHAT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Study Rooms — live AI tutor chat | Mr Point Study Buddy</title>
<meta property="og:title" content="Study Rooms — chat live with an AI tutor for your subject" />
<meta property="og:description" content="Pick your subject, ask anything, get step-by-step help. Free, 24/7." />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;900&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --bg:#f7f9fc; --mint:#0d9668; --amber:#b45309; --blue:#0284c7;
    --glass:rgba(15,23,42,0.035); --line:rgba(15,23,42,0.10);
    --text:#0f172a; --dim:rgba(15,23,42,0.64); --faint:rgba(15,23,42,0.4);
    --card-shadow:0 1px 2px rgba(15,23,42,.04), 0 10px 28px rgba(15,23,42,.06);
  }
  html, body { height:100%; }
  body { background:radial-gradient(1200px 700px at 70% -10%, #e6f7f0 0%, var(--bg) 55%); font-family:'Space Grotesk',system-ui,sans-serif; color:var(--text); }
  .shell { position:relative; z-index:2; max-width:680px; margin:0 auto; height:100vh; height:100dvh; display:flex; flex-direction:column; padding:18px 16px 14px; }
  .topnav { display:flex; justify-content:center; gap:10px; margin-bottom:14px; flex-shrink:0; }
  .topnav a { font-family:'Unbounded'; font-weight:700; font-size:.66rem; letter-spacing:.1em; text-decoration:none;
    color:var(--dim); border:1px solid var(--line); border-radius:100px; padding:8px 16px; transition:all .15s ease; background:#fff; }
  .topnav a.on { color:#fff; background:linear-gradient(135deg,var(--mint),#0f7a56); border-color:transparent; }
  .topnav a:hover { color:var(--text); border-color:rgba(13,150,104,.5); }
  .topnav a.on:hover { color:#fff; }

  /* ---- Room blocks (compact, horizontal-scroll) ---- */
  .rooms { display:flex; gap:8px; overflow-x:auto; padding:2px 2px 10px; margin-bottom:8px; flex-shrink:0; scrollbar-width:thin; }
  .room {
    --ac:#0284c7; --ac-soft:#0284c714; --ac-mid:#0284c72a; --ac-glow:#0284c740;
    flex-shrink:0; display:flex; align-items:center; gap:8px; white-space:nowrap;
    border-radius:14px; padding:9px 14px 9px 9px; border:1px solid var(--line); cursor:pointer;
    background:linear-gradient(160deg, var(--ac-soft), #ffffff);
    color:var(--text); font-family:inherit; font-size:.8rem; font-weight:600;
    transition:transform .15s ease, border-color .15s ease, background .15s ease, box-shadow .15s ease;
    box-shadow:var(--card-shadow);
  }
  .room .ico {
    width:24px; height:24px; border-radius:7px; display:flex; align-items:center; justify-content:center; flex-shrink:0;
    font-family:'Unbounded'; font-weight:700; font-size:.62rem; color:#fff;
    background:linear-gradient(135deg, var(--ac), #0f172a);
  }
  .room:hover { border-color:var(--ac); transform:translateY(-1px); }
  .room:focus-visible { outline:2px solid var(--ac); outline-offset:2px; }
  .room.on { border-color:var(--ac); background:linear-gradient(160deg, var(--ac-mid), var(--ac-soft)); box-shadow:0 6px 18px var(--ac-glow); }
  .room:nth-child(1)  { --ac:#0d9668; --ac-soft:#0d966814; --ac-mid:#0d96682a; --ac-glow:#0d966840; }
  .room:nth-child(2)  { --ac:#0f9488; --ac-soft:#0f948814; --ac-mid:#0f94882a; --ac-glow:#0f948840; }
  .room:nth-child(3)  { --ac:#0284c7; --ac-soft:#0284c714; --ac-mid:#0284c72a; --ac-glow:#0284c740; }
  .room:nth-child(4)  { --ac:#16a34a; --ac-soft:#16a34a14; --ac-mid:#16a34a2a; --ac-glow:#16a34a40; }
  .room:nth-child(5)  { --ac:#b45309; --ac-soft:#b4530914; --ac-mid:#b453092a; --ac-glow:#b4530940; }
  .room:nth-child(6)  { --ac:#c2410c; --ac-soft:#c2410c14; --ac-mid:#c2410c2a; --ac-glow:#c2410c40; }
  .room:nth-child(7)  { --ac:#7c3aed; --ac-soft:#7c3aed14; --ac-mid:#7c3aed2a; --ac-glow:#7c3aed40; }
  .room:nth-child(8)  { --ac:#0891b2; --ac-soft:#0891b214; --ac-mid:#0891b22a; --ac-glow:#0891b240; }
  .room:nth-child(9)  { --ac:#e11d48; --ac-soft:#e11d4814; --ac-mid:#e11d482a; --ac-glow:#e11d4840; }
  .room:nth-child(10) { --ac:#4f46e5; --ac-soft:#4f46e514; --ac-mid:#4f46e52a; --ac-glow:#4f46e540; }

  .notice { flex-shrink:0; text-align:center; font-size:.72rem; color:var(--faint); margin-bottom:10px; line-height:1.5; }
  .notice b { color:var(--mint); font-weight:600; }
  .chat { flex:1; overflow-y:auto; background:#fff; border:1px solid var(--line); border-radius:18px;
    padding:16px; display:flex; flex-direction:column; gap:12px; box-shadow:var(--card-shadow); }
  .msg { max-width:85%; padding:12px 15px; border-radius:16px; line-height:1.6; font-size:.93rem; white-space:pre-wrap; animation:in .25s ease; }
  @keyframes in { 0%{opacity:0; transform:translateY(8px)} 100%{opacity:1; transform:translateY(0)} }
  .msg.me { align-self:flex-end; background:linear-gradient(135deg,rgba(13,150,104,.16),rgba(2,132,199,.12));
    border:1px solid rgba(13,150,104,.28); border-bottom-right-radius:6px; }
  .msg.bot { align-self:flex-start; background:rgba(15,23,42,.045); border:1px solid var(--line); border-bottom-left-radius:6px; color:var(--dim); }
  .msg.bot .who { display:block; font-family:'Unbounded'; font-weight:700; font-size:.6rem; letter-spacing:.12em; color:var(--mint); margin-bottom:6px; }
  .typing { align-self:flex-start; color:var(--faint); font-size:.82rem; padding:6px 4px; display:none; }
  .typing.show { display:block; }
  .inrow { display:flex; gap:10px; margin-top:12px; flex-shrink:0; }
  .inrow textarea { flex:1; resize:none; min-height:52px; max-height:120px; background:#fff; border:1px solid var(--line);
    border-radius:14px; padding:14px 16px; color:var(--text); font-family:inherit; font-size:.95rem; line-height:1.5; outline:none; box-shadow:var(--card-shadow); }
  .inrow textarea:focus { border-color:rgba(13,150,104,.5); }
  .inrow textarea::placeholder { color:var(--faint); }
  .send { font-family:'Unbounded'; font-weight:700; font-size:.75rem; color:#fff; border:none; cursor:pointer;
    border-radius:14px; padding:0 22px; background:linear-gradient(135deg,var(--mint),#0f7a56);
    box-shadow:0 6px 22px rgba(13,150,104,.28); transition:transform .15s ease; }
  .send:hover { transform:translateY(-1px); }
  .send:disabled { opacity:.5; cursor:wait; transform:none; }
  .send:focus-visible { outline:2px solid var(--text); outline-offset:2px; }
</style>
</head>
<body>
<div class="shell">
  <nav class="topnav">
    <a href="/">STUDY TOOLS</a>
    <a href="/chat" class="on">STUDY ROOMS &#128172;</a>
  </nav>
  <div class="rooms" id="rooms" role="group" aria-label="Subject room"></div>
  <div class="notice">You're chatting live with the <b>Study Buddy AI tutor</b> for this room &mdash; free, 24/7. Not a human, never tired, never judgy.</div>
  <div class="chat" id="chat" aria-live="polite"></div>
  <div class="typing" id="typing">Study Buddy is typing&hellip;</div>
  <div class="inrow">
    <textarea id="msg" placeholder="Ask anything about this subject&hellip;" rows="1"></textarea>
    <button class="send" id="send">SEND</button>
  </div>
</div>
<script>
(function(){
  var SUBJECTS = ["Maths","Maths Lit","Physical Sciences","Life Sciences","Accounting","Economics","Business Studies","Geography","History","English"];
  var ICONS = ["M","ML","PS","LS","Ac","Ec","BS","Ge","Hi","En"];
  var subject = "Maths";
  var history = [];
  var chat = document.getElementById('chat');
  var typing = document.getElementById('typing');
  var msgBox = document.getElementById('msg');
  var sendBtn = document.getElementById('send');
  var roomsEl = document.getElementById('rooms');

  SUBJECTS.forEach(function(s, i){
    var b = document.createElement('button');
    b.className = 'room' + (i === 0 ? ' on' : '');
    b.dataset.subject = s;
    var ico = document.createElement('span');
    ico.className = 'ico'; ico.textContent = ICONS[i];
    var lbl = document.createElement('span');
    lbl.textContent = s;
    b.appendChild(ico); b.appendChild(lbl);
    b.addEventListener('click', function(){
      roomsEl.querySelectorAll('.room').forEach(function(r){ r.classList.remove('on'); });
      b.classList.add('on');
      subject = s;
      history = [];
      chat.innerHTML = '';
      greet();
    });
    roomsEl.appendChild(b);
  });

  function bubble(role, text){
    var d = document.createElement('div');
    d.className = 'msg ' + (role === 'user' ? 'me' : 'bot');
    if(role !== 'user'){
      var w = document.createElement('span');
      w.className = 'who'; w.textContent = 'STUDY BUDDY';
      d.appendChild(w);
    }
    d.appendChild(document.createTextNode(text));
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
  }

  function greet(){
    bubble('assistant', "Welcome to the " + subject + " Room \\uD83D\\uDC4B Ask me anything \\u2014 a question from a past paper, something from class you didn't get, or just 'where do I start with [topic]?' I'll break it down step by step.");
  }
  greet();

  async function send(){
    var text = msgBox.value.trim();
    if(!text || sendBtn.disabled) return;
    msgBox.value = '';
    bubble('user', text);
    history.push({ role:'user', content: text });
    if(history.length > 12) history = history.slice(-12);
    sendBtn.disabled = true;
    typing.classList.add('show');
    try {
      var res = await fetch('/api/chat', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ subject: subject, messages: history })
      });
      var v = await res.json().catch(function(){ return { error:'bad_response' }; });
      if(!res.ok || v.error) throw new Error(v.detail || v.error || 'bad status');
      history.push({ role:'assistant', content: v.reply });
      bubble('assistant', v.reply);
    } catch(e){
      bubble('assistant', "Eish, I glitched (" + (e && e.message ? e.message : 'unknown') + "). Send that again?");
    } finally {
      typing.classList.remove('show');
      sendBtn.disabled = false;
      msgBox.focus();
    }
  }
  sendBtn.addEventListener('click', send);
  msgBox.addEventListener('keydown', function(e){
    if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); send(); }
  });
})();
<\/script>
</body>
</html>`;
