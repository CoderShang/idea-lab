/* 囚徒健身 Service Worker
 * 只干一件事：把阿里云 OSS 上的图例与二维码缓存住。
 * OSS 按请求计费，图片一旦进了缓存就不再出网，只有页面里点「清空全部数据」才删。
 * 以后换了图例照片、想让所有人重新取图，把下面的 v1 改成 v2 即可。
 */
const IMG_HOST = 'testbucket5037.oss-cn-beijing.aliyuncs.com';
const OSS_CACHE = 'oss-img-cc-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    /* 只清自己前缀的旧版本缓存，别碰同源其它东西 */
    try{
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k.indexOf('oss-img-cc-') === 0 && k !== OSS_CACHE).map(k => caches.delete(k)));
    }catch(err){}
    await self.clients.claim();
  })());
});

/* 图片缓存优先：先查 CacheStorage，命中就直接返回，不进网络；没命中才去 OSS 取，
   取到后原样存一份长期复用。 */
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
