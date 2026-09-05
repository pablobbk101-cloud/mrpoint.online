export const STUDY_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Mr Point Study Buddy — Matric prep that actually helps</title>
<meta property="og:title" content="Study Buddy — free AI matric prep" />
<meta property="og:description" content="Paste your notes or demarcation. Get exam questions, step-by-step explanations, honest marking, and live subject chat. Free." />
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
  body { min-height:100vh; background:radial-gradient(1200px 700px at 70% -10%, #e6f7f0 0%, var(--bg) 55%); font-family:'Space Grotesk',system-ui,sans-serif; color:var(--text); overflow-x:hidden; }
  .glow { position:fixed; inset:0; z-index:0; pointer-events:none; }
  .g1 { position:absolute; width:520px;height:520px; border-radius:50%; filter:blur(100px); opacity:.16;
    background:radial-gradient(circle,var(--mint),transparent 65%); top:-160px; right:-120px; }
  .g2 { position:absolute; width:420px;height:420px; border-radius:50%; filter:blur(100px); opacity:.14;
    background:radial-gradient(circle,var(--blue),transparent 65%); bottom:-140px; left:-120px; }
  .wrap { position:relative; z-index:2; max-width:680px; margin:0 auto; padding:34px 20px 90px; }
  .topnav { display:flex; justify-content:center; gap:10px; margin-bottom:30px; }
  .topnav a { font-family:'Unbounded'; font-weight:700; font-size:.68rem; letter-spacing:.1em; text-decoration:none;
    color:var(--dim); border:1px solid var(--line); border-radius:100px; padding:9px 18px; transition:all .15s ease; background:#fff; }
  .topnav a.on { color:#fff; background:linear-gradient(135deg,var(--mint),#0f7a56); border-color:transparent; }
  .topnav a:hover { color:var(--text); border-color:rgba(13,150,104,.5); }
  .topnav a.on:hover { color:#fff; }
  .brand { text-align:center; font-family:'Unbounded'; font-weight:900; font-size:12px; letter-spacing:.16em; text-transform:uppercase;
    background:linear-gradient(90deg,var(--mint),var(--blue));
    -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:10px; }
  h1 { font-family:'Unbounded'; font-weight:700; font-size:clamp(1.5rem,5.3vw,2.3rem); text-align:center; line-height:1.18; margin-bottom:12px; }
  h1 .hi { color:var(--mint); }
  .sub { text-align:center; color:var(--dim); font-size:.96rem; line-height:1.65; max-width:500px; margin:0 auto 28px; }

  .modes { display:flex; gap:8px; justify-content:center; margin-bottom:24px; flex-wrap:wrap; }
  .mode { font-family:'Unbounded'; font-weight:700; font-size:.68rem; letter-spacing:.05em;
    color:var(--dim); background:#fff; border:1px solid var(--line); border-radius:12px;
    padding:12px 15px; cursor:pointer; transition:all .16s ease; box-shadow:var(--card-shadow); }
  .mode:focus-visible { outline:2px solid var(--mint); outline-offset:2px; }
  .mode.on { color:#fff; background:linear-gradient(135deg,var(--mint),#0f7a56); border-color:transparent;
    box-shadow:0 6px 20px rgba(13,150,104,.28); }

  /* ---- Subject blocks ---- */
  .subjects-lab { text-align:center; font-size:.68rem; letter-spacing:.18em; text-transform:uppercase; color:var(--faint); margin-bottom:10px; }
  .subjects { display:grid; grid-template-columns:repeat(auto-fill,minmax(102px,1fr)); gap:10px; margin-bottom:22px; }
  .subj {
    --ac:#0284c7; --ac-soft:#0284c714; --ac-mid:#0284c72a; --ac-glow:#0284c740;
    position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;
    aspect-ratio:1/0.92; padding:12px 6px; border-radius:16px; border:1px solid var(--line);
    background:linear-gradient(160deg, var(--ac-soft), #ffffff);
    color:var(--text); font-family:inherit; font-size:.74rem; font-weight:600; line-height:1.2; text-align:center;
    cursor:pointer; transition:transform .15s ease, border-color .15s ease, background .15s ease, box-shadow .15s ease;
    box-shadow:var(--card-shadow);
  }
  .subj .ico {
    width:30px; height:30px; border-radius:9px; display:flex; align-items:center; justify-content:center;
    font-family:'Unbounded'; font-weight:700; font-size:.72rem; color:#fff;
    background:linear-gradient(135deg, var(--ac), #0f172a);
  }
  .subj:hover { border-color:var(--ac); transform:translateY(-2px); }
  .subj:focus-visible { outline:2px solid var(--ac); outline-offset:2px; }
  .subj.on {
    border-color:var(--ac);
    background:linear-gradient(160deg, var(--ac-mid), var(--ac-soft));
    box-shadow:0 10px 26px var(--ac-glow);
  }
  .subj.on::after {
    content:"\\2713"; position:absolute; top:7px; right:7px; width:16px; height:16px; border-radius:50%;
    background:var(--ac); color:#fff; font-size:.6rem; font-weight:700; display:flex; align-items:center; justify-content:center;
  }
  .subj:nth-child(1)  { --ac:#0d9668; --ac-soft:#0d966814; --ac-mid:#0d96682a; --ac-glow:#0d966840; }
  .subj:nth-child(2)  { --ac:#0f9488; --ac-soft:#0f948814; --ac-mid:#0f94882a; --ac-glow:#0f948840; }
  .subj:nth-child(3)  { --ac:#0284c7; --ac-soft:#0284c714; --ac-mid:#0284c72a; --ac-glow:#0284c740; }
  .subj:nth-child(4)  { --ac:#16a34a; --ac-soft:#16a34a14; --ac-mid:#16a34a2a; --ac-glow:#16a34a40; }
  .subj:nth-child(5)  { --ac:#b45309; --ac-soft:#b4530914; --ac-mid:#b453092a; --ac-glow:#b4530940; }
  .subj:nth-child(6)  { --ac:#c2410c; --ac-soft:#c2410c14; --ac-mid:#c2410c2a; --ac-glow:#c2410c40; }
  .subj:nth-child(7)  { --ac:#7c3aed; --ac-soft:#7c3aed14; --ac-mid:#7c3aed2a; --ac-glow:#7c3aed40; }
  .subj:nth-child(8)  { --ac:#0891b2; --ac-soft:#0891b214; --ac-mid:#0891b22a; --ac-glow:#0891b240; }
  .subj:nth-child(9)  { --ac:#e11d48; --ac-soft:#e11d4814; --ac-mid:#e11d482a; --ac-glow:#e11d4840; }
  .subj:nth-child(10) { --ac:#4f46e5; --ac-soft:#4f46e514; --ac-mid:#4f46e52a; --ac-glow:#4f46e540; }

  .panel { background:#fff; border:1px solid var(--line); border-radius:18px; padding:18px; box-shadow:var(--card-shadow); }
  textarea { width:100%; min-height:160px; resize:vertical; background:transparent; border:none; outline:none;
    color:var(--text); font-family:inherit; font-size:1rem; line-height:1.6; }
  textarea::placeholder { color:var(--faint); }
  .panel-foot { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-top:8px; }
  .count { font-size:.74rem; color:var(--faint); }
  .go { font-family:'Unbounded'; font-weight:700; font-size:.82rem; letter-spacing:.05em; color:#fff;
    border:none; cursor:pointer; border-radius:12px; padding:14px 26px;
    background:linear-gradient(135deg,var(--mint),#0f7a56);
    box-shadow:0 6px 26px rgba(13,150,104,.3); transition:transform .15s ease; }
  .go:hover { transform:translateY(-2px); }
  .go:focus-visible { outline:2px solid var(--text); outline-offset:3px; }
  .go:disabled { opacity:.5; cursor:wait; transform:none; }

  .loading { display:none; text-align:center; margin-top:34px; }
  .loading.show { display:block; }
  .spin { width:42px;height:42px; margin:0 auto 14px; border-radius:50%;
    border:3px solid rgba(15,23,42,.10); border-top-color:var(--mint); animation:rot .9s linear infinite; }
  @keyframes rot { to{transform:rotate(360deg)} }
  .loadmsg { color:var(--dim); font-size:.9rem; }

  .out { display:none; margin-top:36px; }
  .out.show { display:block; animation:rise .45s ease; }
  @keyframes rise { 0%{opacity:0; transform:translateY(14px)} 100%{opacity:1; transform:translateY(0)} }
  .out-title { font-family:'Unbounded'; font-weight:700; font-size:1.05rem; margin-bottom:18px; text-align:center; }
  .out-title .tag { display:block; font-size:.66rem; letter-spacing:.2em; text-transform:uppercase; color:var(--mint); margin-bottom:6px; }

  .qcard { background:#fff; border:1px solid var(--line); border-radius:16px; padding:18px; margin-bottom:14px; box-shadow:var(--card-shadow); }
  .qtop { display:flex; justify-content:space-between; gap:12px; align-items:baseline; margin-bottom:8px; }
  .qnum { font-family:'Unbounded'; font-weight:700; font-size:.72rem; color:var(--mint); letter-spacing:.08em; }
  .qmarks { font-size:.74rem; color:var(--amber); white-space:nowrap; }
  .qtext { line-height:1.6; font-size:.96rem; margin-bottom:12px; }
  .reveal { font-family:inherit; font-size:.78rem; font-weight:500; color:var(--mint); background:rgba(13,150,104,.08);
    border:1px solid rgba(13,150,104,.3); border-radius:10px; padding:8px 14px; cursor:pointer; }
  .reveal:focus-visible { outline:2px solid var(--mint); outline-offset:2px; }
  .ans { display:none; margin-top:12px; padding:14px; border-radius:12px; background:rgba(2,132,199,.06);
    border:1px solid rgba(2,132,199,.18); color:var(--dim); line-height:1.65; font-size:.92rem; white-space:pre-wrap; }
  .ans.show { display:block; }

  .prose { background:#fff; border:1px solid var(--line); border-radius:16px; padding:20px;
    color:var(--dim); line-height:1.75; font-size:.97rem; white-space:pre-wrap; box-shadow:var(--card-shadow); }
  .kps { margin-top:14px; }
  .kp { display:flex; gap:10px; font-size:.92rem; line-height:1.55; margin-bottom:10px;
    background:rgba(180,83,9,.06); border:1px solid rgba(180,83,9,.2); border-radius:12px; padding:12px 14px; }
  .kp::before { content:"\\2605"; color:var(--amber); flex-shrink:0; }

  .stepcard { background:#fff; border:1px solid var(--line); border-radius:16px; padding:18px; margin-bottom:14px; box-shadow:var(--card-shadow); }
  .stepnum { font-family:'Unbounded'; font-weight:900; font-size:.7rem; color:#fff; background:linear-gradient(135deg,var(--mint),#0f7a56);
    border-radius:8px; padding:4px 10px; display:inline-block; margin-bottom:10px; letter-spacing:.06em; }
  .steptopic { font-family:'Unbounded'; font-weight:700; font-size:.95rem; margin-bottom:10px; }
  .stepbody { color:var(--dim); line-height:1.7; font-size:.93rem; white-space:pre-wrap; margin-bottom:12px; }
  .mustknow { display:flex; gap:10px; font-size:.9rem; line-height:1.55;
    background:rgba(180,83,9,.07); border:1px solid rgba(180,83,9,.22); border-radius:12px; padding:12px 14px; }
  .mustknow::before { content:"\\26A0"; color:var(--amber); flex-shrink:0; }

  .markbox { text-align:center; background:#fff; border:1px solid var(--line); border-radius:16px; padding:24px 18px; margin-bottom:14px; box-shadow:var(--card-shadow); }
  .marks { font-family:'Unbounded'; font-weight:900; font-size:clamp(2.4rem,10vw,3.6rem); line-height:1; color:var(--mint); }
  .marks .of { font-size:.45em; color:var(--faint); font-weight:700; }
  .marks-lab { font-size:.7rem; letter-spacing:.22em; text-transform:uppercase; color:var(--faint); margin-top:4px; }

  .actions { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:20px; }
  .actions button, .actions a { font-family:inherit; font-size:.84rem; font-weight:500; text-decoration:none;
    color:var(--text); background:#fff; border:1px solid var(--line); border-radius:12px; padding:10px 16px;
    cursor:pointer; display:inline-flex; align-items:center; gap:7px; transition:all .15s ease; box-shadow:var(--card-shadow); }
  .actions button:hover, .actions a:hover { border-color:rgba(13,150,104,.5); transform:translateY(-1px); }

  .error { display:none; margin-top:22px; text-align:center; color:#92400e; background:rgba(180,83,9,.08);
    border:1px solid rgba(180,83,9,.28); border-radius:14px; padding:13px 18px; font-size:.9rem; }
  .error.show { display:block; }
  .foot { text-align:center; margin-top:44px; font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); }
</style>
</head>
<body>
<div class="glow"><div class="g1"></div><div class="g2"></div></div>
<div class="wrap">
  <nav class="topnav">
    <a href="/" class="on">STUDY TOOLS</a>
    <a href="/chat">STUDY ROOMS &#128172;</a>
  </nav>
  <div class="brand">Mr Point</div>
  <h1>Matric is hard.<br><span class="hi">Studying doesn't have to be.</span></h1>
  <p class="sub">Paste your notes, a topic, or your exam demarcation. Get exam questions, step-by-step breakdowns, and honest marking &mdash; free.</p>

  <div class="modes" id="modes" role="group" aria-label="Study mode">
    <button class="mode on" data-mode="quiz">QUIZ ME</button>
    <button class="mode" data-mode="explain">EXPLAIN IT</button>
    <button class="mode" data-mode="mark">MARK ME</button>
    <button class="mode" data-mode="plan">BREAK IT DOWN</button>
  </div>

  <div class="subjects-lab">Pick your subject</div>
  <div class="subjects" id="subjects" role="group" aria-label="Subject">
    <button class="subj on" data-subject="Maths"><span class="ico">M</span><span class="lbl">Maths</span></button>
    <button class="subj" data-subject="Maths Lit"><span class="ico">ML</span><span class="lbl">Maths Lit</span></button>
    <button class="subj" data-subject="Physical Sciences"><span class="ico">PS</span><span class="lbl">Physical Sciences</span></button>
    <button class="subj" data-subject="Life Sciences"><span class="ico">LS</span><span class="lbl">Life Sciences</span></button>
    <button class="subj" data-subject="Accounting"><span class="ico">Ac</span><span class="lbl">Accounting</span></button>
    <button class="subj" data-subject="Economics"><span class="ico">Ec</span><span class="lbl">Economics</span></button>
    <button class="subj" data-subject="Business Studies"><span class="ico">BS</span><span class="lbl">Business Studies</span></button>
    <button class="subj" data-subject="Geography"><span class="ico">Ge</span><span class="lbl">Geography</span></button>
    <button class="subj" data-subject="History"><span class="ico">Hi</span><span class="lbl">History</span></button>
    <button class="subj" data-subject="English"><span class="ico">En</span><span class="lbl">English</span></button>
  </div>

  <div class="panel">
    <textarea id="input" maxlength="6000"></textarea>
    <div class="panel-foot">
      <span class="count" id="count">0 / 6000</span>
      <button class="go" id="go">LET'S STUDY</button>
    </div>
  </div>

  <div class="loading" id="loading"><div class="spin"></div><div class="loadmsg" id="loadmsg">Working&hellip;</div></div>
  <div class="error" id="error"></div>

  <div class="out" id="out">
    <div class="out-title"><span class="tag" id="outtag"></span><span id="outtitle"></span></div>
    <div id="outbody"></div>
    <div class="actions">
      <a id="wa" target="_blank" rel="noopener">&#128172; Send to a study group</a>
      <button id="again">&#128257; New question</button>
    </div>
  </div>

  <div class="foot">Study Buddy &middot; mrpoint.online &middot; made for matrics</div>
</div>
<script>
(function(){
  var mode = "quiz";
  var subject = "Maths";
  var placeholders = {
    quiz: "Paste your notes or type the topic, e.g. 'Euclidean geometry: circle theorems' or paste a full page of your summaries\\u2026",
    explain: "What don't you get? e.g. 'I don't understand why we use the quadratic formula' \\u2014 you'll get a full step-by-step breakdown\\u2026",
    mark: "Paste the exam question AND your answer, e.g.\\nQ: Explain the term inflation. (4)\\nMy answer: it's when prices go up every year\\u2026",
    plan: "Paste your exam demarcation \\u2014 the scope or list of topics your teacher gave for the test \\u2014 and every topic gets broken down step by step\\u2026"
  };
  var input = document.getElementById('input');
  var count = document.getElementById('count');
  function setPlaceholder(){ input.placeholder = placeholders[mode]; }
  setPlaceholder();
  input.addEventListener('input', function(){ count.textContent = input.value.length + " / 6000"; });

  var modes = document.getElementById('modes');
  modes.addEventListener('click', function(e){
    var b = e.target.closest('.mode'); if(!b) return;
    modes.querySelectorAll('.mode').forEach(function(m){ m.classList.remove('on'); });
    b.classList.add('on'); mode = b.dataset.mode; setPlaceholder();
  });
  var subjects = document.getElementById('subjects');
  subjects.addEventListener('click', function(e){
    var b = e.target.closest('.subj'); if(!b) return;
    subjects.querySelectorAll('.subj').forEach(function(s){ s.classList.remove('on'); });
    b.classList.add('on'); subject = b.dataset.subject;
  });

  var go = document.getElementById('go');
  var loading = document.getElementById('loading');
  var loadmsg = document.getElementById('loadmsg');
  var out = document.getElementById('out');
  var outbody = document.getElementById('outbody');
  var errBox = document.getElementById('error');
  var loadMsgsByMode = {
    quiz: ["Reading your notes\\u2026","Setting exam-style questions\\u2026","Checking the mark allocations\\u2026"],
    explain: ["Reading it carefully\\u2026","Breaking it into steps\\u2026","Adding an example\\u2026"],
    mark: ["Reading your answer\\u2026","Marking against the memo\\u2026","Writing your feedback\\u2026"],
    plan: ["Reading your demarcation\\u2026","Mapping every topic\\u2026","Building your step-by-step plan\\u2026"]
  };
  var loadTimer = null;

  function el(tag, cls, text){
    var d = document.createElement(tag);
    if(cls) d.className = cls;
    if(text !== undefined) d.textContent = text;
    return d;
  }

  function renderQuiz(v){
    (v.questions || []).forEach(function(q, i){
      var card = el('div','qcard');
      var top = el('div','qtop');
      top.appendChild(el('span','qnum','QUESTION ' + (i+1)));
      top.appendChild(el('span','qmarks','(' + (q.marks || '?') + ' marks)'));
      card.appendChild(top);
      card.appendChild(el('div','qtext', q.q || ''));
      var btn = el('button','reveal','Show answer');
      var ans = el('div','ans', q.answer || '');
      btn.addEventListener('click', function(){
        var showing = ans.classList.toggle('show');
        btn.textContent = showing ? 'Hide answer' : 'Show answer';
      });
      card.appendChild(btn);
      card.appendChild(ans);
      outbody.appendChild(card);
    });
  }
  function renderExplain(v){
    outbody.appendChild(el('div','prose', v.explanation || ''));
    var kps = el('div','kps');
    (v.key_points || []).forEach(function(k){ kps.appendChild(el('div','kp', k)); });
    outbody.appendChild(kps);
  }
  function renderMark(v){
    var box = el('div','markbox');
    var m = el('div','marks');
    m.textContent = (v.awarded != null ? v.awarded : '?');
    var of = el('span','of',' / ' + (v.out_of != null ? v.out_of : '?'));
    m.appendChild(of);
    box.appendChild(m);
    box.appendChild(el('div','marks-lab','marks'));
    outbody.appendChild(box);
    outbody.appendChild(el('div','prose', v.feedback || ''));
    var card = el('div','qcard');
    card.style.marginTop = '14px';
    card.appendChild(el('span','qnum','FULL-MARKS ANSWER'));
    var btn = el('button','reveal','Show model answer');
    btn.style.marginTop = '10px'; btn.style.display = 'block';
    var ans = el('div','ans', v.model_answer || '');
    btn.addEventListener('click', function(){
      var showing = ans.classList.toggle('show');
      btn.textContent = showing ? 'Hide model answer' : 'Show model answer';
    });
    card.appendChild(btn); card.appendChild(ans);
    outbody.appendChild(card);
  }
  function renderPlan(v){
    if(v.overview) outbody.appendChild(el('div','prose', v.overview));
    (v.steps || []).forEach(function(s, i){
      var card = el('div','stepcard');
      if(i === 0) card.style.marginTop = '14px';
      card.appendChild(el('span','stepnum','STEP ' + (i+1)));
      card.appendChild(el('div','steptopic', s.topic || ''));
      card.appendChild(el('div','stepbody', s.breakdown || ''));
      if(s.must_know) card.appendChild(el('div','mustknow', s.must_know));
      outbody.appendChild(card);
    });
  }

  var tags = { quiz: 'Practice questions', explain: 'Step-by-step breakdown', mark: 'Marked', plan: 'Your demarcation, broken down' };

  document.getElementById('again').addEventListener('click', function(){
    out.classList.remove('show');
    input.value = ''; count.textContent = '0 / 6000';
    input.scrollIntoView({behavior:'smooth'}); input.focus();
  });

  go.addEventListener('click', async function(){
    var text = input.value.trim();
    errBox.classList.remove('show');
    if(text.length < 15){
      errBox.textContent = "Give me a bit more to work with \\u2014 paste your notes, topic, or demarcation.";
      errBox.classList.add('show'); return;
    }
    go.disabled = true;
    out.classList.remove('show');
    loading.classList.add('show');
    var msgs = loadMsgsByMode[mode]; var i = 0;
    loadmsg.textContent = msgs[0];
    loadTimer = setInterval(function(){ i=(i+1)%msgs.length; loadmsg.textContent = msgs[i]; }, 1500);
    try {
      var res = await fetch("/api/study", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ mode: mode, subject: subject, text: text })
      });
      var v = await res.json().catch(function(){ return { error: "bad_response" }; });
      if(!res.ok || v.error) throw new Error(v.detail || v.error || "bad status");
      outbody.innerHTML = "";
      document.getElementById('outtag').textContent = tags[v.mode] || '';
      document.getElementById('outtitle').textContent = v.title || subject;
      if(v.mode === 'quiz') renderQuiz(v);
      else if(v.mode === 'explain') renderExplain(v);
      else if(v.mode === 'plan') renderPlan(v);
      else renderMark(v);
      var txt = "Studying with Study Buddy \\uD83D\\uDCDA free AI matric prep \\u2014 " + location.origin;
      document.getElementById('wa').href = "https://wa.me/?text=" + encodeURIComponent(txt);
      out.classList.add('show');
      out.scrollIntoView({behavior:'smooth', block:'start'});
    } catch(e){
      errBox.textContent = "Something went wrong. (" + (e && e.message ? e.message : "unknown") + ") \\u2014 try again.";
      errBox.classList.add('show');
    } finally {
      clearInterval(loadTimer);
      loading.classList.remove('show');
      go.disabled = false;
    }
  });
})();
<\/script>
</body>
</html>`;
