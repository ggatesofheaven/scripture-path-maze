(function(){
"use strict";
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const places={
 antioch:{x:91,y:46,icon:"🏘️",en:"Syrian Antioch",ta:"சீரியா நாட்டிலுள்ள அந்தியோகியா"},
 seleucia:{x:88,y:66,icon:"⚓",en:"Seleucia",ta:"செலூக்கியா"},
 salamis:{x:64,y:67,icon:"🏛️",en:"Salamis",ta:"சலாமி"},
 paphos:{x:30,y:68,icon:"🏛️",en:"Paphos",ta:"பாப்போ"},
 perga:{x:29,y:32,icon:"🏛️",en:"Perga",ta:"பெர்கே"},
 pisidian:{x:27,y:13,icon:"🏘️",en:"Pisidian Antioch",ta:"பிசீதியா நாட்டிலுள்ள அந்தியோகியா"},
 iconium:{x:49,y:19,icon:"🏘️",en:"Iconium",ta:"இக்கோனியா"},
 lystra:{x:62,y:23,icon:"🏘️",en:"Lystra",ta:"லீஸ்திரா"},
 derbe:{x:75,y:18,icon:"🏘️",en:"Derbe",ta:"தெர்பை"},
 attalia:{x:24,y:34,icon:"⚓",en:"Attalia",ta:"அத்தலியா"}
};
const outward=["seleucia","salamis","paphos","perga","pisidian","iconium","lystra","derbe"];
const full=["seleucia","salamis","paphos","perga","pisidian","iconium","lystra","derbe","lystra","iconium","pisidian","perga","attalia","antioch"];
const facts={
 seleucia:{ref:"Acts 13:4",en:"Sent by the Holy Spirit, Barnabas and Saul went down to Seleucia and sailed from there to Cyprus.",ta:"பரிசுத்த ஆவியினால் அனுப்பப்பட்ட பர்னபாவும் சவுலும் செலூக்கியாவுக்குப் போய், அங்கிருந்து சீப்புரு தீவுக்குக் கப்பல் ஏறினார்கள்."},
 salamis:{ref:"Acts 13:5",en:"At Salamis they proclaimed the word of God in the Jewish synagogues. John Mark assisted them.",ta:"சலாமியில் அவர்கள் யூதருடைய ஜெப ஆலயங்களில் தேவவசனத்தைப் பிரசங்கித்தார்கள். யோவான் மாற்கு அவர்களுக்கு உதவியாளனாக இருந்தான்."},
 paphos:{ref:"Acts 13:6–12",en:"At Paphos Paul confronted Elymas, and the proconsul believed when he saw what happened.",ta:"பாப்போவில் பவுல் எலிமாவை எதிர்கொண்டார். நடந்ததைக் கண்ட அதிபதி விசுவாசித்தார்."},
 perga:{ref:"Acts 13:13; 14:24–25",en:"They reached Perga in Pamphylia. John Mark returned to Jerusalem; on the return journey Paul and Barnabas preached in Perga.",ta:"அவர்கள் பம்பிலியா நாட்டிலுள்ள பெர்கேவுக்கு வந்தார்கள். யோவான் மாற்கு எருசலேமுக்குத் திரும்பினார்; திரும்பும் பயணத்தில் பவுலும் பர்னபாவும் பெர்கேவில் வசனத்தைப் பிரசங்கித்தார்கள்."},
 pisidian:{ref:"Acts 13:14–52; 14:21–23",en:"Paul preached in the synagogue at Pisidian Antioch. On their return, they strengthened the disciples and appointed elders.",ta:"பிசீதியா நாட்டிலுள்ள அந்தியோகியாவின் ஜெப ஆலயத்தில் பவுல் பிரசங்கித்தார். திரும்பி வந்தபோது சீஷர்களைத் திடப்படுத்தி மூப்பர்களை ஏற்படுத்தினார்கள்."},
 iconium:{ref:"Acts 14:1–7, 21–23",en:"In Iconium many Jews and Greeks believed. Later Paul and Barnabas returned to strengthen the disciples.",ta:"இக்கோனியாவில் யூதரும் கிரேக்கரும் அநேகர் விசுவாசித்தார்கள். பின்னர் பவுலும் பர்னபாவும் சீஷர்களைத் திடப்படுத்தத் திரும்பி வந்தார்கள்."},
 lystra:{ref:"Acts 14:8–23",en:"At Lystra a man lame from birth was healed. Paul was later stoned, yet he rose and entered the city. They returned to strengthen the disciples.",ta:"லீஸ்திராவில் பிறவியிலிருந்தே நடக்கமுடியாத ஒருவர் சுகமடைந்தார். பின்னர் பவுல் கல்லெறியப்பட்டார்; ஆனாலும் எழுந்து நகரத்திற்குள் சென்றார். அவர்கள் மீண்டும் வந்து சீஷர்களைத் திடப்படுத்தினார்கள்."},
 derbe:{ref:"Acts 14:20–21",en:"Paul and Barnabas preached in Derbe and made many disciples. Then they began the return journey.",ta:"பவுலும் பர்னபாவும் தெர்பையில் சுவிசேஷத்தைப் பிரசங்கித்து அநேகரைச் சீஷர்களாக்கினார்கள். பின்னர் திரும்பும் பயணத்தைத் தொடங்கினார்கள்."},
 attalia:{ref:"Acts 14:25–26",en:"After preaching in Perga, they went down to Attalia and sailed back to Syrian Antioch.",ta:"பெர்கேவில் வசனத்தைப் பிரசங்கித்தபின் அத்தலியாவுக்குப் போய், அங்கிருந்து சீரியா நாட்டிலுள்ள அந்தியோகியாவுக்குக் கப்பல் ஏறினார்கள்."},
 antioch:{ref:"Acts 14:26–28",en:"Back in Syrian Antioch, they reported what God had done and how he had opened the door of faith to the Gentiles.",ta:"சீரியா நாட்டிலுள்ள அந்தியோகியாவுக்குத் திரும்பி, தேவன் செய்தவைகளையும் புறஜாதிகளுக்கு விசுவாசத்தின் கதவைத் திறந்ததையும் அறிவித்தார்கள்."}
};
const ui={
 en:{title:"Scripture Path Maze",subtitle:"Guide Paul and Barnabas through their first missionary journey.",language:"Language",level:"Choose a level",easy:"Easy",easyNote:"Follow the outward route",medium:"Medium",mediumNote:"Complete the return journey",hard:"Hard",hardNote:"Choose directly on the map",start:"Begin the Journey",source:"Journey sequence checked against Acts 13–14.",stops:"Stops",points:"Points",stars:"Stars",stop:"JOURNEY STOP",return:"RETURN STOP",q:"Where did they go next?",event:"Which place matches this Bible event?",choose:"Choose the destination on the map.",correct:"Correct! The journey continues.",wrong:"That is not the next destination. Try again.",continue:"Continue",complete:"Journey completed!",again:"Play Again",score:"Final score"},
 ta:{title:"வேதாகமப் பயணப் பாதை",subtitle:"பவுலும் பர்னபாவும் செய்த முதல் மிஷனரி பயணத்தைச் சரியான பாதையில் வழிநடத்துங்கள்.",language:"மொழி",level:"நிலையைத் தேர்ந்தெடுக்கவும்",easy:"எளிது",easyNote:"சென்ற பாதையைப் பின்தொடருங்கள்",medium:"நடுத்தரம்",mediumNote:"திரும்பும் பயணத்தையும் நிறைவு செய்யுங்கள்",hard:"கடினம்",hardNote:"வரைபடத்தில் நேரடியாகத் தேர்ந்தெடுக்கவும்",start:"பயணத்தைத் தொடங்கு",source:"பயண வரிசை அப்போஸ்தலர் 13–14 உடன் சரிபார்க்கப்பட்டது.",stops:"இடங்கள்",points:"மதிப்பெண்",stars:"நட்சத்திரங்கள்",stop:"பயண இடம்",return:"திரும்பும் இடம்",q:"அடுத்து அவர்கள் எங்கே சென்றார்கள்?",event:"இந்த வேதாகம நிகழ்வு எந்த இடத்தில் நடந்தது?",choose:"வரைபடத்தில் சரியான இடத்தைத் தேர்ந்தெடுக்கவும்.",correct:"சரி! பயணம் தொடர்கிறது.",wrong:"இது அடுத்த இடம் அல்ல. மீண்டும் முயற்சி செய்யுங்கள்.",continue:"தொடரவும்",complete:"பயணம் நிறைவடைந்தது!",again:"மீண்டும் விளையாடு",score:"மொத்த மதிப்பெண்"}
};
let lang="en",level="easy",route=[],step=0,score=0,mistakes=0,answered=false,visited=["antioch"];
function t(k){return ui[lang][k]}
function name(id){return places[id][lang]}
function setText(){
 $("#game-title").textContent=t("title"); $("#subtitle").textContent=t("subtitle"); $("#language-label").textContent=t("language"); $("#level-label").textContent=t("level");
 [["easy-name","easy"],["easy-note","easyNote"],["medium-name","medium"],["medium-note","mediumNote"],["hard-name","hard"],["hard-note","hardNote"]].forEach(a=>$("#"+a[0]).textContent=t(a[1]));
 $("#start-button").textContent=t("start"); $("#source-note").textContent=t("source"); $("#progress-label").textContent=t("stops"); $("#score-label").textContent=t("points"); $("#stars-label").textContent=t("stars"); $("#next-button").textContent=t("continue"); $("#again-button").textContent=t("again");
}
function renderMarkers(){
 const box=$("#markers"); box.innerHTML="";
 Object.entries(places).forEach(([id,p])=>{const b=document.createElement("button");b.className="marker";b.dataset.id=id;b.style.left=p.x+"%";b.style.top=p.y+"%";b.innerHTML='<span class="landmark">'+p.icon+'</span><span class="place-name">'+name(id)+'</span>';b.addEventListener("click",()=>{if(level==="hard"&&!answered)check(id,b)});box.appendChild(b)});
}
function optionsFor(target){return [target,...Object.keys(places).filter(x=>x!==target).sort(()=>Math.random()-.5).slice(0,3)].sort(()=>Math.random()-.5)}
function renderQuestion(){
 answered=false; const target=route[step],isReturn=level!=="easy"&&step>=8;
 $("#mission-number").textContent=(isReturn?t("return"):t("stop"))+" "+(step+1);
 $("#question").textContent=level==="easy"?t("q"):(level==="medium"?facts[target][lang]:t("choose"));
 $("#reference").textContent=level==="medium"?facts[target].ref:""; $("#feedback").textContent=""; $("#feedback").className="feedback"; $("#learning-card").classList.add("hidden");
 $$(".marker").forEach(m=>{const seen=visited.includes(m.dataset.id);m.classList.remove("current","wrong");m.classList.toggle("correct",seen);m.querySelector(".place-name").style.display=seen?"block":"none"});
 const answers=$("#answers");answers.innerHTML="";
 if(level!=="hard") optionsFor(target).forEach(id=>{const b=document.createElement("button");b.className="answer";b.textContent=name(id);b.addEventListener("click",()=>check(id,b));answers.appendChild(b)});
 updateHud();
}
function check(id,button){
 if(answered)return; const target=route[step];
 if(id!==target){mistakes++;button.classList.add("wrong");const marker=$('.marker[data-id="'+id+'"]');if(marker)marker.classList.add("wrong");$("#feedback").textContent=t("wrong");$("#feedback").className="feedback bad";updateHud();return}
 answered=true;score+=Math.max(40,100-mistakes*10);visited.push(target);button.classList.add("selected");const marker=$('.marker[data-id="'+target+'"]');marker.classList.add("current","correct");marker.querySelector(".place-name").style.display="block";moveTraveller(target);celebrate(places[target].x,places[target].y);$("#feedback").textContent=t("correct");$("#feedback").className="feedback good";$("#learning-title").textContent=name(target)+" · "+facts[target].ref;$("#learning-text").textContent=facts[target][lang];$("#learning-card").classList.remove("hidden");drawRoute();updateHud();
}
function moveTraveller(id){const p=places[id],prev=places[visited[visited.length-2]||"antioch"],sea=(prev.y>35||p.y>35)&&Math.abs(prev.x-p.x)>8;const el=$("#traveller");el.className="traveller "+(sea?"sea":"land");el.style.left=p.x+"%";el.style.top=p.y+"%"}
function drawRoute(){const ids=visited,p=ids.map(id=>places[id]);if(!p.length)return;$("#route-path").setAttribute("d",p.map((v,i)=>(i?"L":"M")+(v.x*10)+" "+(v.y*6.67)).join(" "))}
function celebrate(x,y){const c=$("#celebration");const f=document.createElement("span");f.className="flag";f.textContent="🚩";f.style.left=x+"%";f.style.top=y+"%";c.appendChild(f);for(let i=0;i<10;i++){const s=document.createElement("i");s.className="spark";s.textContent=i%2?"✦":"•";s.style.left=x+"%";s.style.top=y+"%";s.style.color=i%2?"#ffc43d":"#ec604d";s.style.setProperty("--dx",(Math.random()*150-75)+"px");s.style.setProperty("--dy",(Math.random()*-120-10)+"px");c.appendChild(s);setTimeout(()=>s.remove(),950)}}
function updateHud(){const done=visited.length-1,total=route.length;$("#progress-count").textContent=done+" / "+total;$("#score").textContent=score;const starCount=mistakes<2?3:mistakes<5?2:1;$("#stars").textContent="★".repeat(starCount)+"☆".repeat(3-starCount);$("#progress-bar").style.width=(done/total*100)+"%"}
function start(){route=level==="easy"?outward.slice():full.slice();step=0;score=0;mistakes=0;answered=false;visited=["antioch"];$("#start-screen").classList.add("hidden");$("#finish-screen").classList.add("hidden");$("#play-screen").classList.remove("hidden");renderMarkers();moveTraveller("antioch");drawRoute();renderQuestion();scrollTo({top:0,behavior:"smooth"})}
function next(){step++;if(step>=route.length){finish();return}renderQuestion();$("#play-screen").scrollIntoView({behavior:"smooth"})}
function finish(){const starCount=mistakes<2?3:mistakes<5?2:1;$("#play-screen").classList.add("hidden");$("#finish-screen").classList.remove("hidden");$("#finish-title").textContent=t("complete");$("#final-stars").textContent="★".repeat(starCount)+"☆".repeat(3-starCount);$("#finish-score").textContent=t("score")+": "+score;scrollTo({top:0,behavior:"smooth"})}
$("#language-buttons").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;lang=b.dataset.lang;$$('#language-buttons button').forEach(x=>x.classList.toggle("active",x===b));$("#game").dataset.lang=lang;setText()});
$("#level-buttons").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;level=b.dataset.level;$$('#level-buttons button').forEach(x=>x.classList.toggle("active",x===b))});
$("#start-button").addEventListener("click",start);$("#next-button").addEventListener("click",next);$("#again-button").addEventListener("click",()=>{$("#finish-screen").classList.add("hidden");$("#start-screen").classList.remove("hidden")});setText();
})();
