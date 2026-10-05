const nav=document.querySelector(".nav"),menuBtn=document.querySelector(".menu-btn"),navLinks=document.querySelector(".nav-links");
window.addEventListener("scroll",()=>{nav.style.background=window.scrollY>30?"rgba(8,10,13,.9)":"rgba(12,14,18,.72)"});
menuBtn?.addEventListener("click",()=>{const open=menuBtn.getAttribute("aria-expanded")==="true";menuBtn.setAttribute("aria-expanded",String(!open));navLinks.classList.toggle("mobile-open",!open)});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",()=>{navLinks?.classList.remove("mobile-open");menuBtn?.setAttribute("aria-expanded","false")}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("revealed")}),{threshold:.12});
document.querySelectorAll(".frontier-card,.step,.timeline-item,.team-card,.founder-card,.principle-inner,.global-content,.apply").forEach(el=>{el.classList.add("reveal");observer.observe(el)});
document.getElementById("year").textContent=new Date().getFullYear();

document.querySelectorAll(".scroll-transition").forEach(el=>{
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){e.target.animate([{opacity:0,transform:"scaleX(.72)"},{opacity:1,transform:"scaleX(1)"}],{duration:900,easing:"cubic-bezier(.16,1,.3,1)",fill:"forwards"});io.unobserve(e.target)}
  }),{threshold:.15}); io.observe(el);
});

(function(){
 const selectors=['.section-label','.section-heading > *','.founder-statement > *','.founder-card > *','.trajectory-head > *','.timeline-item','.principle-inner > *','.frontier-card','.program-copy > *','.program-visual','.step','.community-copy > *','.team-card','.backing-stage > *','.faculty-note','.global-top > *','.global-content > *','.apply > *'];
 document.querySelectorAll(selectors.join(',')).forEach((el,i)=>{el.classList.add('reveal-seq'); el.style.setProperty('--delay',(i%8)*75+'ms')});
 const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -8% 0px'});
 document.querySelectorAll('.reveal-seq').forEach(el=>obs.observe(el));
 document.querySelectorAll('.hero .hero-inner > *').forEach((el,i)=>{el.animate([{opacity:0,transform:'translateY(26px)'},{opacity:1,transform:'translateY(0)'}],{duration:1100,delay:250+i*110,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'})});
})();
