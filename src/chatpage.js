// ================= STUDY ROOMS CHAT PAGE (/chat) =================
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
    --bg:#070c14; --mint:#34d399; --amber:#fbbf24; --blue:#38bdf8;
    --glass:rgba(255,255,255,0.045); --line:rgba(255,255,255,0.10);
    --text:#f3f6fb; --dim:rgba(243,246,251,0.6); --faint:rgba(243,246,251,0.35);
  }
  html, body { height:100%; }
  body { background:radial-gradient(1200px 700px at 70% -10%, #0e2233 0%, var(--bg) 55%); font-family:'Space Grotesk',system-ui,sans-serif; color:var(--text); }
  .shell { position:relative; z-index:2; max-width:680px; margin:0 auto; height:100vh; height:100dvh; display:flex; flex-direction:column; padding:18px 16px 14px; }
  .topnav { display:flex; justify-content:center; gap:10px; margin-bottom:14px; flex-shrink:0; }
  .topnav a { font-family:'Unbounded'; font-weight:700; font-size:.66rem; letter-spacing:.1em; text-decoration:none;
    color:var(--dim); border:1px solid var(--line); border-radius:100px; padding:8px 16px; transition:all .15s ease; }
  .topnav a.on { color:#08110c; background:linear-gradient(135deg,var(--mint),#6ee7b7); border-color:transparent; }
  .topnav a:hover { color:var(--text); border-color:rgba(52,211,153,.5); }
  .topnav a.on:hover { color:#08110c; }

  /* ---- Room blocks (compact, horizontal-scroll) ---- */
  .rooms { display:flex; gap:8px; overflow-x:auto; padding:2px 2px 10px; margin-bottom:8px; flex-shrink:0; scrollbar-width:thin; }
  .room {
    --ac:#38bdf8; --ac-soft:#38bdf824; --ac-mid:#38bdf84d; --ac-glow:#38bdf866;
    flex-shrink:0; display:flex; align-items:center; gap:8px; white-space:nowrap;
    border-radius:14px; padding:9px 14px 9px 9px; border:1px solid var(--line); cursor:pointer;
    background:linear-gradient(160deg, var(--ac-soft), rgba(255,255,255,.02));
    color:var(--text); font-family:inherit; font-size:.8rem; font-weight:600;
    transition:transform .15s ease, border-color .15s ease, background .15s ease, box-shadow .15s ease;
  }
  .room .ico {
    width:24px; height:24px; border-radius:7px; display:flex; align-items:center; justify-content:center; flex-shrink:0;
    font-family:'Unbounded'; font-weight:700; font-size:.62rem; color:#08110c;
    background:linear-gradient(135deg, var(--ac), #ffffff);
  }
  .room:hover { border-color:var(--ac); transform:translateY(-1px); }
  .room:focus-visible { outline:2px solid var(--ac); outline-offset:2px; }
  .room.on { border-color:var(--ac); background:linear-gradient(160deg, var(--ac-mid), var(--ac-soft)); box-shadow:0 6px 18px var(--ac-glow); }
  .room:nth-child(1)  { --ac:#34d399; --ac-soft:#34d39924; --ac-mid:#34d3994d; --ac-glow:#34d39966; }
  .room:nth-child(2)  { --ac:#2dd4bf; --ac-soft:#2dd4bf24; --ac-mid:#2dd4bf4d; --ac-glow:#2dd4bf66; }
  .room:nth-child(3)  { --ac:#38bdf8; --ac-soft:#38bdf824; --ac-mid:#38bdf84d; --ac-glow:#38bdf866; }
  .room:nth-child(4)  { --ac:#4ade80; --ac-soft:#4ade8024; --ac-mid:#4ade804d; --ac-glow:#4ade8066; }
  .room:nth-child(5)  { --ac:#fbbf24; --ac-soft:#fbbf2424; --ac-mid:#fbbf244d; --ac-glow:#fbbf2466; }
  .room:nth-child(6)  { --ac:#fb923c; --ac-soft:#fb923c24; --ac-mid:#fb923c4d; --ac-glow:#fb923c66; }
  .room:nth-child(7)  { --ac:#a78bfa; --ac-soft:#a78bfa24; --ac-mid:#a78bfa4d; --ac-glow:#a78bfa66; }
  .room:nth-child(8)  { --ac:#22d3ee; --ac-soft:#22d3ee24; --ac-mid:#22d3ee4d; --ac-glow:#22d3ee66; }
  .room:nth-child(9)  { --ac:#fb7185; --ac-soft:#fb718524; --ac-mid:#fb71854d; --ac-glow:#fb718566; }
  .room:nth-child(10) { --ac:#818cf8; --ac-soft:#818cf824; --ac-mid:#818cf84d; --ac-glow:#818cf866; }

  .notice { flex-shrink:0; text-align:center; font-size:.72rem; color:var(--faint); margin-bottom:10px; line-height:1.5; }
  .notice b { color:var(--mint); font-weight:600; }
  .chat { flex:1; overflow-y:auto; background:var(--glass); border:1px solid var(--line); border-radius:18px;
    padding:16px; display:flex; flex-direction:column; gap:12px; }
  .msg { max-width:85%; padding:12px 15px; border-radius:16px; line-height:1.6; font-size:.93rem; white-space:pre-wrap; animation:in .25s ease; }
  @keyframes in { 0%{opacity:0; transform:translateY(8px)} 100%{opacity:1; transform:translateY(0)} }
  .msg.me { align-self:flex-end; background:linear-gradient(135deg,rgba(52,211,153,.25),rgba(56,189,248,.18));
    border:1px solid rgba(52,211,153,.3); border-bottom-right-radius:6px; }
  .msg.bot { align-self:flex-start; background:rgba(255,255,255,.05); border:1px solid var(--line); border-bottom-left-radius:6px; color:var(--dim); }
  .msg.bot .who { display:block; font-family:'Unbounded'; font-weight:700; font-size:.6rem; letter-spacing:.12em; color:var(--mint); margin-bottom:6px; }
  .typing { align-self:flex-start; color:var(--faint); font-size:.82rem; padding:6px 4px; display:none; }
  .typing.show { display:block; }
  .inrow { display:flex; gap:10px; margin-top:12px; flex-shrink:0; }
  .inrow textarea { flex:1; resize:none; min-height:52px; max-height:120px; background:var(--glass); border:1px solid var(--line);
    border-radius:14px; padding:14px 16px; color:var(--text); font-family:inherit; font-size:.95rem; line-height:1.5; outline:none; }
  .inrow textarea:focus { border-color:rgba(52,211,153,.5); }
  .inrow textarea::placeholder { color:var(--faint); }
  .send { font-family:'Unbounded'; font-weight:700; font-size:.75rem; color:#08110c; border:none; cursor:pointer;
    border-radius:14px; padding:0 22px; background:linear-gradient(135deg,var(--mint),#6ee7b7);
    box-shadow:0 6px 22px rgba(52,211,153,.3); transition:transform .15s ease; }
  .send:hover { transform:translateY(-1px); }
  .send:disabled { opacity:.5; cursor:wait; transform:none; }
  .send:focus-visible { outline:2px solid #fff; outline-offset:2px; }
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
</script>
</body>
</html>`;
