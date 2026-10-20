/* 料金・時間・受付条件の設定。未確定項目は空欄のままにしてください。
 * 各 formUrl は共通のGoogleフォームへ接続しています。
 * 希望プランはGoogleフォームでも選択してください。
 */
window.LP_CONFIG = {
  consultant: '高梨 有子',
  role: '実店舗集客コンサルタント',
  acceptingApplications: true,
  privacyUrl: '', cancellationUrl: '', legalUrl: '', reservationMethod: '',
  plans: [
    {id:'spot', name:'スポットコンサルティング', price:11000,
     duration:'30分', report:false, startTiming:'', formUrl:'https://forms.gle/yLKicMnk3ndTzZ2v9'},
    {id:'strategy', name:'地域集客戦略コンサルティング', price:33000,
     duration:'90分', report:true, startTiming:'', reportDelivery:'', formUrl:'https://forms.gle/yLKicMnk3ndTzZ2v9'},
    {id:'support', name:'集客戦略・実行サポート', price:120000,
     duration:'90分 × 4回', report:true, startTiming:'', reportDelivery:'', formUrl:'https://forms.gle/yLKicMnk3ndTzZ2v9',
     supportDays:30, supportMethod:'', supportScope:'', replyTime:'', supportStart:''}
  ]
};
