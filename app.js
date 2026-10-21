let lang="th",cart=[];
const PRODUCTS={
  standard:{id:"standard",price:29900,image:"assets/360-view.jpeg",th:"Eco-Power Fit Station รุ่นมาตรฐาน",en:"Eco-Power Fit Station — Standard"},
  digital:{id:"digital",price:29900,image:"assets/eco-power-bike-new.png",th:"Eco-Power Fit Station รุ่นหน้าจอดิจิทัล",en:"Eco-Power Fit Station Digital"}
};
const $=id=>document.getElementById(id);
function t(th,en){return lang==="th"?th:en}
function money(n){return new Intl.NumberFormat(lang==="th"?"th-TH":"en-US",{style:"currency",currency:"THB",maximumFractionDigits:0}).format(n)}
function toast(s){$("toast").textContent=s;$("toast").classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>$("toast").classList.remove("show"),2600)}
$("lang").onclick=()=>{lang=lang==="th"?"en":"th";document.querySelectorAll("[data-th]").forEach(e=>e.innerHTML=e.dataset[lang]);$("lang").textContent=lang==="th"?"EN":"ไทย";$("openCart").innerHTML=t("ตะกร้า","Cart")+" <span id='count'>"+cart.reduce((a,x)=>a+x.qty,0)+"</span>";render()};
$("year")&&($("year").textContent=new Date().getFullYear());
function render(){
  $("count").textContent=cart.reduce((a,x)=>a+x.qty,0);
  $("items").innerHTML=cart.length?cart.map(x=>{const p=PRODUCTS[x.id];return `<div class="cart-item"><img src="${p.image}" alt=""><div class="cart-product-info"><b>${t(p.th,p.en)}</b><p>${money(p.price)} × ${x.qty}</p></div><button data-remove="${x.id}">${t("นำออก","Remove")}</button></div>`}).join(""):`<p>${t("ยังไม่มีสินค้าในตะกร้า","Your cart is empty")}</p>`;
  $("subtotal").textContent=money(cart.reduce((a,x)=>a+x.qty*PRODUCTS[x.id].price,0));
  document.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{cart=cart.filter(x=>x.id!==b.dataset.remove);render()});
}
function open(){document.body.classList.add("cart-open")}
function close(){document.body.classList.remove("cart-open")}
$("openCart").onclick=open;$("close").onclick=close;$("shade").onclick=close;
document.querySelectorAll(".minus").forEach(b=>b.onclick=()=>{const q=document.querySelector(`[data-qty="${b.dataset.qtyFor}"]`);q.value=Math.max(1,(+q.value||1)-1)});
document.querySelectorAll(".plus").forEach(b=>b.onclick=()=>{const q=document.querySelector(`[data-qty="${b.dataset.qtyFor}"]`);q.value=Math.min(10,(+q.value||1)+1)});
document.querySelectorAll(".add-to-cart").forEach(b=>b.onclick=()=>{const id=b.dataset.product;const q=Math.max(1,Math.min(10,+document.querySelector(`[data-qty="${id}"]`).value||1));let item=cart.find(x=>x.id===id);item?item.qty=Math.min(10,item.qty+q):cart.push({id,qty:q});render();open();toast(t("เพิ่มสินค้าแยกรุ่นลงตะกร้าแล้ว","Product model added to cart"))});
$("checkout").onclick=()=>toast(t("เว็บไซต์ต้นแบบยังไม่รับชำระเงินจริง ต้องเชื่อมต่อผู้ให้บริการชำระเงินก่อนเปิดขาย","Demo only: connect a payment provider before accepting real payments."));
$("emailForm").onsubmit=e=>{e.preventDefault();toast(t("ขอบคุณที่สนใจ (ตัวอย่างเท่านั้น ยังไม่ได้ส่งข้อมูลไปยังเซิร์ฟเวอร์)","Thanks! Demo only; no data was sent to a server."));$("email").value=""};
if($("quizQuestion")){document.querySelectorAll("[data-answer]").forEach(b=>b.addEventListener("click",()=>{$("quizFeedback").textContent=b.dataset.answer==="right"?t("ถูกต้อง! วอร์มอัพช่วยเตรียมร่างกายก่อนเริ่มกิจกรรม","Correct! Warming up prepares your body for activity."):t("ลองอีกครั้งนะ ควรวอร์มอัพก่อนเริ่ม","Try again—warm up before starting.")}))}
if($("challengeCheck"))$("challengeCheck").addEventListener("change",()=>{$("challengeFeedback").textContent=$("challengeCheck").checked?t("ทำภารกิจสำเร็จแล้ว เยี่ยมมาก!","Challenge complete—well done!"):""});
let seconds=120,timer=null;
function updateTimer(){if($("timerDisplay"))$("timerDisplay").textContent=String(Math.floor(seconds/60)).padStart(2,"0")+":"+String(seconds%60).padStart(2,"0")}
if($("timerStart"))$("timerStart").onclick=()=>{if(timer)return;timer=setInterval(()=>{seconds=Math.max(0,seconds-1);updateTimer();if(!seconds){clearInterval(timer);timer=null;toast(t("ครบเวลาแล้ว!","Time is up!"))}},1000)};
if($("timerPause"))$("timerPause").onclick=()=>{clearInterval(timer);timer=null};
if($("timerReset"))$("timerReset").onclick=()=>{clearInterval(timer);timer=null;seconds=120;updateTimer()};
function updateEnergy(){if(!$('powerRange'))return;const power=+$('powerRange').value,duration=+$('durationRange').value;$('powerValue').textContent=power+' W';$('durationValue').textContent=duration+' min';$('energyValue').textContent=(power*duration/60).toFixed(1)+' Wh'}
if($('powerRange'))$('powerRange').addEventListener('input',updateEnergy);if($('durationRange'))$('durationRange').addEventListener('input',updateEnergy);updateTimer();updateEnergy();render();
