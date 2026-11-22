/* 久坐提醒 Service Worker
 * Android Chrome 不支持 new Notification()，页面通知统一经由本 SW 显示。
 * 点击通知时优先聚焦已打开的主页面，否则新开一个。
 */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({type:'window', includeUncontrolled:true}).then(list => {
      for(const c of list){
        if('focus' in c) return c.focus();
      }
      return self.clients.openWindow('./main.html');
    })
  );
});
