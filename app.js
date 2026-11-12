const examples = [
 {home:"Arsenal",away:"Chelsea",league:"Premier League",time:"Demo fixture • 19:00",pick:"Home win",goals:"Over 1.5",btts:"Yes"},
 {home:"Real Madrid",away:"Valencia",league:"La Liga",time:"Demo fixture • 20:30",pick:"Home or draw (1X)",goals:"Over 1.5",btts:"Possible"},
 {home:"Bayern Munich",away:"Dortmund",league:"Bundesliga",time:"Demo fixture • 21:00",pick:"Home win",goals:"Over 2.5",btts:"Yes"}
];
const content=document.getElementById("content");
function card(m){return `<article class="match-card"><div class="meta"><span>${m.league}</span><span class="tag">DEMO</span></div><div class="teams"><span>${m.home}</span><span class="vs">VS</span><span>${m.away}</span></div><div class="kickoff">${m.time}</div><div class="divider"></div><div class="chips"><span class="chip">Pick: ${m.pick}</span><span class="chip">Goals: ${m.goals}</span><span class="chip">BTTS: ${m.btts}</span></div><p class="confidence">Confidence: Demo only</p></article>`}
function show(tab){
 document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));
 const title=document.getElementById("section-title"),sub=document.getElementById("section-subtitle");
 if(tab==="Home"){title.textContent="Featured predictions";sub.textContent="Illustrative examples — not live picks";content.innerHTML=examples.slice(0,2).map(card).join("")}
 else if(tab==="Matches"){title.textContent="Matches";sub.textContent="Live fixtures will appear after data connection";content.innerHTML=examples.map(card).join("")}
 else if(tab==="Predictions"){title.textContent="Prediction markets";sub.textContent="Markets planned for the first release";content.innerHTML=`<article class="match-card"><b>Match result (1X2)</b><p class="kickoff">Home win • Draw • Away win</p></article><article class="match-card"><b>Double chance</b><p class="kickoff">1X • X2 • 12</p></article><article class="match-card"><b>Goals over / under</b><p class="kickoff">Over or under 1.5, 2.5 and 3.5 goals</p></article><article class="match-card"><b>Both teams to score</b><p class="kickoff">Yes or No</p></article>`}
 else{title.textContent="Results";sub.textContent="Verified outcomes will appear here";content.innerHTML=`<div class="empty"><div style="font-size:32px">🏆</div><b>No verified results yet</b>Results will appear after a results data provider is connected.</div>`}
}
document.querySelectorAll(".bottom-nav button").forEach(b=>b.addEventListener("click",()=>show(b.dataset.tab)));
document.getElementById("notice").addEventListener("click",()=>alert("Notifications will be added in a later version."));
show("Home");
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));}
