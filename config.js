/* 料金・時間・受付条件の設定。未確定項目は空欄のままにしてください。
 * 各 formUrl には、希望プランが選択済みのHTTPSフォームURL、
 * またはそのプラン専用のフォームURLを設定してください。
 */
window.LP_CONFIG = {
  consultant: '高梨 有子',
  role: '実店舗集客コンサルタント',
  acceptingApplications: false,
  privacyUrl: '', cancellationUrl: '', legalUrl: '', reservationMethod: '',
  plans: [
    {id:'spot', name:'スポットコンサルティング', price:11000,
     duration:'30分', report:false, startTiming:'', formUrl:''},
    {id:'strategy', name:'地域集客戦略コンサルティング', price:33000,
     duration:'90分', report:true, startTiming:'', reportDelivery:'', formUrl:''},
    {id:'support', name:'集客戦略・実行サポート', price:110000,
     duration:'90分 × 2回', report:true, startTiming:'', reportDelivery:'', formUrl:'',
     supportDays:30, supportMethod:'', supportScope:'', replyTime:'', supportStart:''}
  ]
};
