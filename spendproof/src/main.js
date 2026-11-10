
import './style.css';
import { LANGS, T } from './i18n.js';
let lang = 'en';
let stock = 2, qty = 10, offer = 'good', payState = 'notStarted', proofApproved = false;
const daily = 1.6;
function t(k){ return (T[lang] && T[lang][k]) || T.en[k] || k; }
function score(){
  let s=0; const remaining = stock/daily; const cash = 500;
  if(remaining<2) s+=30; if(2<1) s+=0; else s+=25; // no waste history in demo, full points for simplicity
  if(35 < cash*0.1+35) s+=20; else s+=10;
  // total roughly 75-95 depending on stock
  if(remaining<1) s+=10;
  return Math.min(100, s + (remaining<2?15:0));
}
function render(){
  document.documentElement.dir = lang==='ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  const remaining = (stock/daily).toFixed(1);
  const rec = Math.max(1, Math.ceil(daily*3 - stock + 0.5));
  const sc = score();
  const scLabel = sc>=85? t('scoreBuy') : sc>=50? t('scoreWait') : t('scoreNo');
  const scColor = sc>=85?'green': sc>=50?'yellow':'red';
  const wasteA = Math.max(0, qty - daily*4); const wasteMoneyA = (wasteA*11.8).toFixed(1);
  const wasteB = Math.max(0, 3.2 - daily*4); const saved = ((qty*11.8)-(3.2*11)).toFixed(0);
  const gatesOk = offer==='good';
  const payLabel = payState==='notStarted'? t('notStarted') : payState==='authorized'? t('authorized') : payState==='captured'? t('captured') : t('voided');
  document.getElementById('app').innerHTML = `
  <header><div><b>${t('title')}</b> — ${t('sub')}<div style="font-size:13px;opacity:.8">${t('tag')}</div></div>
  <select id="langSel">${LANGS.map(l=>`<option value="${l.code}" ${l.code===lang?'selected':''}>${l.label}</option>`).join('')}</select></header>
  <div class="wrap">
    <div class="card"><h2>${t('need')}</h2>
      <div class="grid"><div><label>${t('what')}</label><input value="5 kg coffee beans"/></div><div><label>${t('why')}</label><input value="Stock finished"/></div><div><label>${t('where')}</label><input value="Cafe"/></div><div><label>${t('when')}</label><input value="Within 3 days"/></div><div><label>${t('who')}</label><input value="Barista / Customers"/></div><div><label>${t('how')}</label><input value="Direct / Wholesaler"/></div></div>
      <p>${t('stock')}: <b>${stock} kg</b> <input type="range" id="stockR" min="0" max="8" step="0.5" value="${stock}"/></p>
      <p>${t('daily')}: 1.6 kg | ${t('remaining')}: <b>${remaining} days</b> | ${t('recommended')}: <b>${rec} kg</b></p>
      <div class="kpi ${scColor}">${sc} / 100</div><div><span class="badge ${sc>=85?'badge-ok':sc>=50?'badge-warn':'badge-bad'}">${scLabel}</span></div>
    </div>
    <div class="card"><h2>${t('market')}</h2>
      <table><tr><th>${t('seller')}</th><th>${t('price')}</th><th>${t('trend')}</th></tr>
      <tr><td>Direct Seller</td><td>11.0 USD</td><td><span class="badge badge-ok">↓ Falling</span></td></tr>
      <tr><td>Marketplace</td><td>10.5 USD</td><td><span class="badge badge-warn">↑ Volatile, trend spike</span></td></tr>
      <tr><td>Wholesaler</td><td>9.8 USD</td><td><span class="badge badge-ok">→ Stable</span></td></tr></table>
      <h3>${t('channel')}</h3><table><tr><th>Channel</th><th>${t('total')}</th></tr><tr><td>Direct — 2 days</td><td><b>11.0 USD</b> ✅ Best for you</td></tr><tr><td>Marketplace — 4 days</td><td>12.5 USD</td></tr><tr><td>Wholesaler — 3 days, min 10 kg</td><td>9.8 USD but not suitable</td></tr></table>
      <p><b>${t('alt')}:</b> ${t('altDesc')}</p>
    </div>
    <div class="card"><h2>${t('sim')}</h2><label>${t('qty')}: ${qty} kg</label><input type="range" id="qtyR" min="3" max="12" step="0.5" value="${qty}"/>
      <div class="grid"><div style="background:#7f1d1d;padding:12px;border-radius:12px"><b>${t('scenarioA')}</b><p>${qty} kg × 11.8 = ${(qty*11.8).toFixed(1)} USD<br>${t('waste')}: ${wasteA.toFixed(1)} kg = ${wasteMoneyA} USD</p></div>
      <div style="background:#14532d;padding:12px;border-radius:12px"><b>${t('scenarioB')}</b><p>3.2 kg × 11 = 35.2 USD<br>${t('waste')}: 0 kg<br>${t('saved')}: ${saved} USD</p></div></div>
    </div>
    <div class="card"><h2>${t('gates')}</h2>
      <p><button id="badBtn" class="${offer==='bad'?'':'secondary'}">${t('bad')}</button> <button id="goodBtn" class="${offer==='good'?'':'secondary'}">${t('good')}</button></p>
      <p>Gate 1 Mandate: ${gatesOk?'<span class="badge badge-ok">PASS</span>':'<span class="badge badge-bad">FAIL — Price over cap</span>'} | Gate 2 Seller: ${gatesOk?'<span class="badge badge-ok">PASS</span>':'<span class="badge badge-bad">FAIL</span>'} | Gate 3 Stock: ${gatesOk?'<span class="badge badge-ok">PASS</span>':'<span class="badge badge-bad">FAIL — No stock</span>'}</p>
      <p><b>PayPal:</b> ${payLabel} ${payState==='notStarted' && gatesOk? `<button id="authBtn">${t('authorize')}</button>` : ''}</p>
      ${payState==='authorized' ? `<div><h3>${t('proof')}</h3><table><tr><td>5 kg beans</td><td>Photo + invoice</td><td><span class="badge badge-ok">PASS</span></td></tr><tr><td>Price ≤ 12 USD</td><td>Invoice 11 USD</td><td><span class="badge badge-ok">PASS</span></td></tr><tr><td>Payee matches</td><td>Account matches</td><td><span class="badge badge-ok">PASS</span></td></tr></table><button id="capBtn">${t('capture')}</button> <button id="voidBtn" class="secondary">${t('void')}</button></div>` : ''}
      ${payState==='captured' ? `<div style="background:#14532d;padding:14px;border-radius:12px"><h3>${t('receipt')}</h3><p>${t('saved')}: <b>83 USD</b> | ${t('waste')}: 2.8 kg prevented | Authorize → Capture | Time: ${new Date().toLocaleString()}</p></div>` : ''}
      ${payState==='voided' ? `<div style="background:#7f1d1d;padding:14px;border-radius:12px"><b>${t('voided')}</b></div>` : ''}
      <p><button id="resetBtn" class="secondary">${t('reset')}</button></p>
      <p style="font-size:12px;opacity:.7">${t('note')}</p>
    </div>
  </div>`;
  document.getElementById('langSel').onchange = e=>{ lang=e.target.value; render(); };
  const sr=document.getElementById('stockR'); if(sr) sr.oninput=e=>{ stock=parseFloat(e.target.value); render(); };
  const qr=document.getElementById('qtyR'); if(qr) qr.oninput=e=>{ qty=parseFloat(e.target.value); render(); };
  const bb=document.getElementById('badBtn'); if(bb) bb.onclick=()=>{ offer='bad'; payState='notStarted'; render(); };
  const gb=document.getElementById('goodBtn'); if(gb) gb.onclick=()=>{ offer='good'; payState='notStarted'; render(); };
  const ab=document.getElementById('authBtn'); if(ab) ab.onclick=()=>{ payState='authorized'; render(); };
  const cb=document.getElementById('capBtn'); if(cb) cb.onclick=()=>{ payState='captured'; render(); };
  const vb=document.getElementById('voidBtn'); if(vb) vb.onclick=()=>{ payState='voided'; render(); };
  const rb=document.getElementById('resetBtn'); if(rb) rb.onclick=()=>{ stock=2; qty=10; offer='good'; payState='notStarted'; render(); };
}
render();
