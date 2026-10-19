'use strict';
const c = window.LP_CONFIG || {};
const plans = Array.isArray(c.plans) ? c.plans : [];
const safeUrl = value => {try {const u=new URL(value);return u.protocol==='https:'?u.href:'';}catch{return '';}};
const filled = value => typeof value === 'string' && Boolean(value.trim());
const legalKeys = ['privacyUrl','cancellationUrl','legalUrl'];
document.querySelectorAll('[data-name]').forEach(el=>el.textContent=c.consultant||'高梨 有子');
document.querySelectorAll('[data-role]').forEach(el=>el.textContent=c.role||'実店舗集客コンサルタント');
document.querySelectorAll('[data-plan-card]').forEach(card=>{
  const p=plans.find(p=>p.id===card.dataset.planCard);if(!p)return;
  card.querySelector('[data-plan-price]').textContent=Number.isFinite(p.price)&&p.price>0?p.price.toLocaleString('ja-JP')+'円':'料金設定待ち';
  card.querySelector('[data-plan-duration]').textContent=p.duration||'提供時間設定待ち';
  card.querySelector('[data-plan-start]').textContent=p.startTiming||'提供開始時期：公開前にご案内';
  const delivery=card.querySelector('[data-plan-delivery]');
  if(delivery)delivery.textContent=p.reportDelivery||'レポート納期：公開前にご案内';
});
document.querySelectorAll('[data-setting]').forEach(el=>{if(filled(c[el.dataset.setting]))el.textContent=c[el.dataset.setting];});
const support=plans.find(p=>p.id==='support');
if(support){
 document.querySelectorAll('[data-support-days]').forEach(el=>el.textContent=support.supportDays||30);
 document.querySelectorAll('[data-support-setting]').forEach(el=>{if(filled(support[el.dataset.supportSetting]))el.textContent=support[el.dataset.supportSetting];});
}
legalKeys.forEach(key=>{const el=document.querySelector('[data-legal="'+key+'"]');const url=safeUrl(c[key]);if(url){el.href=url;el.hidden=false;}});
if(legalKeys.every(k=>safeUrl(c[k])))document.getElementById('legal-pending').hidden=true;
const ready = p => Boolean(p && c.acceptingApplications===true && filled(c.reservationMethod) && legalKeys.every(k=>safeUrl(c[k])) && safeUrl(p.formUrl) && filled(p.startTiming) && Number.isFinite(p.price) && p.price>0 && filled(p.duration) && (!p.report||filled(p.reportDelivery)) && (p.id!=='support'||['supportMethod','supportScope','replyTime','supportStart'].every(k=>filled(p[k]))));
const select=document.getElementById('plan-choice');
const selection=document.getElementById('selected-plan');
const updateSelection = () => {
 const p=plans.find(p=>p.id===select.value);
 selection.textContent=p?p.name+' ／ '+p.price.toLocaleString('ja-JP')+'円（税込）':select.options[select.selectedIndex].text;
 const a=document.getElementById('apply-link');a.hidden=true;a.removeAttribute('href');
 document.getElementById('apply-heading').textContent='現在、受付準備中です';
 document.getElementById('apply-message').textContent='ご希望のプランを確認できます。提供条件・申込先の設定後に受付を開始します。';
 document.getElementById('apply-closed').hidden=false;
 if(ready(p)){
  a.href=safeUrl(p.formUrl);a.textContent='このプランの申込フォームへ進む ↗';a.hidden=false;
  document.getElementById('apply-heading').textContent='選択したプランのお申込み';
  document.getElementById('apply-message').textContent='内容と各規定をご確認のうえ、申込フォームへお進みください。フォームでも希望プランをご確認ください。送信後、メールで決済方法をご案内します。';
  document.getElementById('apply-closed').hidden=true;
 }
};
select.addEventListener('change',updateSelection);
document.querySelectorAll('[data-select-plan]').forEach(a=>a.addEventListener('click',()=>{select.value=a.dataset.selectPlan;updateSelection();}));
document.querySelectorAll('[data-plan-card]').forEach(card=>{const p=plans.find(p=>p.id===card.dataset.planCard);if(ready(p))card.querySelector('.plan-status').textContent='フォーム送信後、メールで決済方法をご案内します。';});
if(plans.some(ready))document.querySelector('.hero .availability').textContent='プランごとの提供条件・受付状況をご確認ください。';
updateSelection();
const dialog=document.getElementById('image-dialog');let opener;
document.querySelectorAll('.report-zoom').forEach(btn=>btn.addEventListener('click',()=>{opener=btn;const img=document.getElementById('dialog-image');img.src=btn.dataset.image;img.alt=btn.querySelector('img').alt;dialog.showModal();document.body.style.overflow='hidden';}));
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.style.overflow='';if(opener)opener.focus();});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
