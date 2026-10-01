(function(){
"use strict";
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));

const places={
 antioch:{x:91,y:46,en:"Syrian Antioch",ta:"சீரியா நாட்டிலுள்ள அந்தியோகியா"},
 seleucia:{x:88,y:66,en:"Seleucia",ta:"செலூக்கியா"},
 salamis:{x:64,y:67,en:"Salamis",ta:"சலாமி"},
 paphos:{x:30,y:68,en:"Paphos",ta:"பாப்போ"},
 perga:{x:29,y:32,en:"Perga",ta:"பெர்கே"},
 pisidian:{x:27,y:13,en:"Pisidian Antioch",ta:"பிசீதியா நாட்டிலுள்ள அந்தியோகியா"},
 iconium:{x:49,y:19,en:"Iconium",ta:"இக்கோனியா"},
 lystra:{x:62,y:23,en:"Lystra",ta:"லீஸ்திரா"},
 derbe:{x:75,y:18,en:"Derbe",ta:"தெர்பை"},
 attalia:{x:24,y:34,en:"Attalia",ta:"அத்தலியா"}
};
const outward=["seleucia","salamis","paphos","perga","pisidian","iconium","lystra","derbe"];
const returnRoute=["lystra","iconium","pisidian","perga","attalia","antioch"];
const facts={
 seleucia:{ref:"Acts 13:4",en:"Sent by the Holy Spirit, Barnabas and Saul went down to Seleucia. From there they sailed to Cyprus.",ta:"பரிசுத்த ஆவியினால் அனுப்பப்பட்ட பர்னபாவும் சவுலும் செலூக்கியாவுக்குப் போனார்கள். அங்கிருந்து சீப்புரு தீவுக்குக் கப்பல் ஏறினார்கள்."},
 salamis:{ref:"Acts 13:5",en:"At Salamis they preached the word of God in the Jewish synagogues. John Mark helped them.",ta:"சலாமியில் அவர்கள் யூதருடைய ஜெப ஆலயங்களில் தேவவசனத்தைப் பிரசங்கித்தார்கள். யோவான் மாற்கு அவர்களுக்கு உதவியாளனாக இருந்தார்."},
 paphos:{ref:"Acts 13:6–12",en:"At Paphos Paul confronted Elymas. The deputy believed when he saw what had happened.",ta:"பாப்போவில் பவுல் எலிமாவை எதிர்கொண்டார். நடந்ததைக் கண்ட அதிபதி விசுவாசித்தார்."},
 perga:{ref:"Acts 13:13; 14:24–25",en:"They arrived at Perga in Pamphylia. John Mark returned to Jerusalem. On their return journey, Paul and Barnabas preached there.",ta:"அவர்கள் பம்பிலியா நாட்டிலுள்ள பெர்கேவுக்கு வந்தார்கள். யோவான் மாற்கு எருசலேமுக்குத் திரும்பினார். திரும்பும் பயணத்தில் பவுலும் பர்னபாவும் பெர்கேவில் வசனத்தைப் பிரசங்கித்தார்கள்."},
 pisidian:{ref:"Acts 13:14–52; 14:21–23",en:"Paul preached in the synagogue at Pisidian Antioch. Later they returned, strengthened the disciples and appointed elders.",ta:"பிசீதியா நாட்டிலுள்ள அந்தியோகியாவின் ஜெப ஆலயத்தில் பவுல் பிரசங்கித்தார். பின்னர் அவர்கள் திரும்பி வந்து சீஷர்களைத் திடப்படுத்தி மூப்பர்களை ஏற்படுத்தினார்கள்."},
 iconium:{ref:"Acts 14:1–7, 21–23",en:"In Iconium many Jews and Greeks believed. Later Paul and Barnabas returned to strengthen the disciples.",ta:"இக்கோனியாவில் யூதரும் கிரேக்கரும் அநேகர் விசுவாசித்தார்கள். பின்னர் பவுலும் பர்னபாவும் சீஷர்களைத் திடப்படுத்தத் திரும்பி வந்தார்கள்."},
 lystra:{ref:"Acts 14:8–23",en:"At Lystra a man lame from birth was healed. Paul was later stoned, yet he rose and entered the city.",ta:"லீஸ்திராவில் பிறவியிலிருந்தே நடக்க முடியாத ஒருவர் சுகமடைந்தார். பின்னர் பவுல் கல்லெறியப்பட்டார்; ஆனாலும் அவர் எழுந்து நகரத்திற்குள் சென்றார்."},
 derbe:{ref:"Acts 14:20–21",en:"Paul and Barnabas preached in Derbe and made many disciples. Then they began the return journey.",ta:"பவுலும் பர்னபாவும் தெர்பையில் சுவிசேஷத்தைப் பிரசங்கித்து அநேகரைச் சீஷர்களாக்கினார்கள். பின்னர் அவர்கள் திரும்பும் பயணத்தைத் தொடங்கினார்கள்."},
 attalia:{ref:"Acts 14:25–26",en:"After preaching in Perga, they went down to Attalia. From there they sailed to Syrian Antioch.",ta:"பெர்கேவில் வசனத்தைப் பிரசங்கித்தபின் அவர்கள் அத்தலியாவுக்குப் போனார்கள். அங்கிருந்து சீரியா நாட்டிலுள்ள அந்தியோகியாவுக்குக் கப்பல் ஏறினார்கள்."},
 antioch:{ref:"Acts 14:26–28",en:"Back in Syrian Antioch, they reported what God had done and how He had opened the door of faith to the Gentiles.",ta:"சீரியா நாட்டிலுள்ள அந்தியோகியாவுக்குத் திரும்பிய அவர்கள், தேவன் செய்தவைகளையும் புறஜாதிகளுக்கு விசுவாசத்தின் கதவைத் திறந்ததையும் அறிவித்தார்கள்."}
};
const ui={
 en:{title:"Journey Map",subtitle:"Guide Paul and Barnabas through their first missionary journey.",language:"Language",level:"Choose a level",easy:"Easy",easyNote:"Follow the outward route",medium:"Medium",mediumNote:"Match places and events",hard:"Hard",hardNote:"Complete the return route",start:"Begin the Journey",source:"Journey sequence checked against Acts 13–14.",stops:"Stops",points:"Points",stars:"Stars",stop:"JOURNEY STOP",return:"RETURN STOP",nextQ:"Where did they go next?",eventQ:"Which place matches this Bible event?",returnQ:"Which place came next on the return journey?",correct:"Correct! The ship has reached the right destination.",wrong:"Try another route",continue:"Continue",complete:"Journey completed!",again:"Play Again",score:"Final score"},
 ta:{title:"பயண வரைபடம்",subtitle:"பவுலும் பர்னபாவும் செய்த முதல் மிஷனரி பயணத்தைச் சரியான பாதையில் வழிநடத்துங்கள்.",language:"மொழி",level:"நிலையைத் தேர்ந்தெடுக்கவும்",easy:"எளிது",easyNote:"சென்ற பாதையைப் பின்தொடருங்கள்",medium:"நடுத்தரம்",mediumNote:"இடங்களையும் நிகழ்வுகளையும் பொருத்துங்கள்",hard:"கடினம்",hardNote:"திரும்பும் பாதையை நிறைவு செய்யுங்கள்",start:"பயணத்தைத் தொடங்கு",source:"பயண வரிசை அப்போஸ்தலர் 13–14 உடன் சரிபார்க்கப்பட்டது.",stops:"இடங்கள்",points:"மதிப்பெண்",stars:"நட்சத்திரங்கள்",stop:"பயண இடம்",return:"திரும்பும் இடம்",nextQ:"அடுத்து அவர்கள் எங்கே சென்றார்கள்?",eventQ:"இந்த வேதாகம நிகழ்வு எந்த இடத்தில் நடந்தது?",returnQ:"திரும்பும் பயணத்தில் அடுத்து அவர்கள் சென்ற இடம் எது?",correct:"சரியான இடம்! கப்பல் இலக்கை அடைந்தது.",wrong:"வேறு பாதையை முயற்சி செய்யுங்கள்",continue:"தொடரவும்",complete:"பயணம் நிறைவடைந்தது!",again:"மீண்டும் விளையாடு",score:"மொத்த மதிப்பெண்"}
};

let lang="en",level="easy",route=[],origin="antioch",step=0,score=0,mistakes=0,busy=false,visited=[];
const name=id=>places[id][lang], t=k=>ui[lang][k];
function setText(){
 document.documentElement.lang=lang; $("#game").dataset.lang=lang; $("#game-title").textContent=t("title"); $("#subtitle").textContent=t("subtitle"); $("#language-label").textContent=t("language"); $("#level-label").textContent=t("level");
 [["easy-name","easy"],["easy-note","easyNote"],["medium-name","medium"],["medium-note","mediumNote"],["hard-name","hard"],["hard-note","hardNote"]].forEach(([id,key])=>$("#"+id).textContent=t(key));
 $("#start-button").textContent=t("start"); $("#source-note").textContent=t("source"); $("#progress-label").textContent=t("stops"); $("#score-label").textContent=t("points"); $("#stars-label").textContent=t("stars"); $("#next-button").textContent=t("continue"); $("#again-button").textContent=t("again");
}
function shuffle(a){const copy=a.slice();for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}return copy}
function optionsFor(target){const count=level==="easy"?3:4;const pool=Object.keys(places).filter(id=>id!==target&&!visited.includes(id));return shuffle([target,...shuffle(pool).slice(0,count-1)])}
function setTraveller(id,previous){const p=places[id],from=places[previous||id],isSea=Math.abs(p.x-from.x)>16&&(p.y>38||from.y>38);const el=$("#traveller");el.className="traveller "+(isSea?"ship":"walk");el.style.left=p.x+"%";el.style.top=p.y+"%"}
function addFlag(id,number){const p=places[id],flag=document.createElement("span");flag.className="map-flag";flag.style.left=p.x+"%";flag.style.top=p.y+"%";flag.innerHTML="<b>"+number+"</b>";$("#flags").appendChild(flag)}
function pathFor(ids){return ids.map((id,i)=>{const p=places[id];return (i?"L":"M")+(p.x*10)+" "+(p.y*6.67)}).join(" ")}
function drawRoute(){$("#route-path").setAttribute("d",pathFor(visited))}
function starCount(){return mistakes<=1?3:mistakes<=4?2:1}
function paintStars(selector,count){$$(selector+" i").forEach((s,i)=>s.classList.toggle("on",i<count))}
function updateHud(){const reached=visited.length,total=route.length+1;$("#progress-count").textContent=reached+" / "+total;$("#score").textContent=score;paintStars("#stars",starCount());$("#progress-bar").style.width=((reached-1)/route.length*100)+"%"}
function questionText(target){if(level==="medium")return facts[target][lang];if(level==="hard")return t("returnQ");return t("nextQ")}
function thumbPosition(id){const p=places[id];return Math.round(p.x)+"% "+Math.round(p.y)+"%"}
function renderQuestion(){
 busy=false;const target=route[step];$("#mission-number").textContent=(level==="hard"?t("return"):t("stop"))+" "+(step+1);$("#question").textContent=questionText(target);$("#reference").textContent=level==="medium"?facts[target].ref:"";$("#feedback-ribbon").className="feedback-ribbon";$("#feedback-ribbon").textContent="";$("#learning-card").classList.add("hidden");
 const answers=$("#answers");answers.innerHTML="";optionsFor(target).forEach(id=>{const b=document.createElement("button");b.type="button";b.className="answer";b.dataset.id=id;b.textContent=name(id);b.style.setProperty("--thumb",'url("assets/journey-map-controlled.webp")');b.style.setProperty("--pos",thumbPosition(id));b.addEventListener("click",()=>choose(id,b));answers.appendChild(b)});updateHud()
}
async function wrongChoice(id,button){
 busy=true;mistakes++;const current=visited[visited.length-1],from=places[current],to=places[id],map=$("#map"),zone=$("#wrong-zone");button.classList.add("wrong");zone.style.left=to.x+"%";zone.style.top=to.y+"%";
 const mid={x:from.x+(to.x-from.x)*.36,y:from.y+(to.y-from.y)*.36};$("#attempt-path").setAttribute("d","M"+(from.x*10)+" "+(from.y*6.67)+" Q"+(mid.x*10)+" "+((mid.y-5)*6.67)+" "+(mid.x*10)+" "+(mid.y*6.67));map.classList.add("wrong-active","attempting");setTravellerAt(mid,current);showRibbon(t("wrong"),"bad");await delay(700);setTraveller(current,id);await delay(900);map.classList.remove("wrong-active","attempting");button.classList.remove("wrong");$("#attempt-path").setAttribute("d","");updateHud();busy=false
}
function setTravellerAt(p,previous){const el=$("#traveller"),from=places[previous]||p,isSea=Math.abs(p.x-from.x)>10&&(p.y>38||from.y>38);el.className="traveller "+(isSea?"ship":"walk");el.style.left=p.x+"%";el.style.top=p.y+"%"}
async function correctChoice(id,button){
 busy=true;$$('#answers button').forEach(b=>b.disabled=true);button.classList.add("selected");const previous=visited[visited.length-1];setTraveller(id,previous);await delay(1600);visited.push(id);score+=Math.max(50,100-mistakes*5);addFlag(id,visited.length);drawRoute();showRibbon(t("correct"),"good");launchFireworks(places[id].x,places[id].y);$("#learning-title").textContent=name(id)+" · "+facts[id].ref;$("#learning-text").textContent=facts[id][lang];$("#learning-card").classList.remove("hidden");updateHud();busy=false
}
function choose(id,button){if(busy)return;const target=route[step];if(id===target)correctChoice(id,button);else wrongChoice(id,button)}
function showRibbon(text,type){const r=$("#feedback-ribbon");r.textContent=text;r.className="feedback-ribbon "+type;$("#feedback").textContent=text}
function launchFireworks(xPercent,yPercent){
 const canvas=$("#fireworks"),map=$("#map"),rect=map.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);canvas.width=rect.width*dpr;canvas.height=rect.height*dpr;const ctx=canvas.getContext("2d");ctx.scale(dpr,dpr);const colors=["#ffd34f","#ff6655","#50e3c2","#fff7b0","#7fd8ff"],particles=[];
 function burst(cx,cy,delayMs){for(let i=0;i<42;i++){const a=Math.PI*2*i/42,s=1.2+Math.random()*2.8;particles.push({x:cx,y:cy,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,color:colors[i%colors.length],delay:delayMs})}}
 const baseX=rect.width*xPercent/100,baseY=rect.height*yPercent/100;burst(baseX-28,Math.max(55,baseY-82),0);burst(baseX+35,Math.max(45,baseY-110),260);let start=performance.now();
 function frame(now){ctx.clearRect(0,0,rect.width,rect.height);let alive=false;particles.forEach(p=>{if(now-start<p.delay){alive=true;return}if(p.life<=0)return;alive=true;p.x+=p.vx;p.y+=p.vy;p.vy+=.035;p.life-=.018;ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,2.2,0,Math.PI*2);ctx.fill()});ctx.globalAlpha=1;if(alive)requestAnimationFrame(frame);else ctx.clearRect(0,0,rect.width,rect.height)}requestAnimationFrame(frame)
}
function start(){
 origin=level==="hard"?"derbe":"antioch";route=level==="hard"?returnRoute.slice():outward.slice();step=0;score=0;mistakes=0;busy=false;visited=[origin];$("#flags").innerHTML="";addFlag(origin,1);drawRoute();setTraveller(origin,origin);$("#start-screen").classList.add("hidden");$("#finish-screen").classList.add("hidden");$("#play-screen").classList.remove("hidden");renderQuestion();scrollTo({top:0,behavior:"smooth"})
}
function next(){if(busy)return;step++;if(step>=route.length){finish();return}renderQuestion();$(".mission-sheet").scrollIntoView({behavior:"smooth",block:"start"})}
function finish(){const count=starCount();$("#play-screen").classList.add("hidden");$("#finish-screen").classList.remove("hidden");$("#finish-title").textContent=t("complete");$("#finish-score").textContent=t("score")+": "+score;$("#final-stars").innerHTML="<i></i><i></i><i></i>";paintStars("#final-stars",count);scrollTo({top:0,behavior:"smooth"})}

$("#language-buttons").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;lang=b.dataset.lang;$$('#language-buttons button').forEach(x=>x.classList.toggle("active",x===b));setText()});
$("#level-buttons").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;level=b.dataset.level;$$('#level-buttons button').forEach(x=>x.classList.toggle("active",x===b))});
$("#start-button").addEventListener("click",start);$("#next-button").addEventListener("click",next);$("#again-button").addEventListener("click",()=>{$("#finish-screen").classList.add("hidden");$("#start-screen").classList.remove("hidden")});setText();
})();
