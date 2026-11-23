/* 工位伴侣 Service Worker
 * · 通知通道：Android Chrome 不支持 new Notification()，页面通知统一经由本 SW 显示
 * · 图片缓存：阿里云 OSS 按请求计费，两张二维码缓存优先，命中就不再出网
 * 以后换了二维码、想让所有人重新取图，把下面的 v1 改成 v2 即可。
 */
const IMG_HOST = 'testbucket5037.oss-cn-beijing.aliyuncs.com';
const OSS_CACHE = 'oss-img-sr-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    /* 只清自己前缀的旧版本缓存，别碰同源其它东西 */
    try{
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k.indexOf('oss-img-sr-') === 0 && k !== OSS_CACHE).map(k => caches.delete(k)));
    }catch(err){}
    await self.clients.claim();
  })());
});

/* 图片缓存优先：先查 CacheStorage，命中就直接返回，不进网络；没命中才去 OSS 取，
   取到后原样存一份长期复用。点「清空全部数据」才会把这层缓存删掉。 */
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  let url = null;
  try{ url = new URL(req.url); }catch(err){ return; }
  if(url.hostname !== IMG_HOST) return;
  e.respondWith((async () => {
    let cache = null;
    try{ cache = await caches.open(OSS_CACHE); }catch(err){}
    if(cache){
      const hit = await cache.match(req);
      if(hit) return hit;
    }
    let res;
    try{ res = await fetch(req); }
    catch(err){ return new Response('', {status: 504, statusText: 'offline'}); }
    /* 跨域图是 opaque 响应，看不到状态码，先存下来；
       页面那边解码失败（图还没传上去）会主动把这条缓存删掉，避免坏图被永久命中 */
    if(cache && (res.type === 'opaque' || res.status === 200)){
      try{ await cache.put(req, res.clone()); }catch(err){}
    }
    return res;
  })());
});

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
