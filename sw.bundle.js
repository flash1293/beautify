!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}({0:function(e,t,n){"use strict";var r=n(67),o=n(69);self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(e){return e.filter(function(e){return!e.startsWith(r.assetsKey)&&!e.startsWith(r.shellKey)})}).then(function(e){return e.forEach(function(e){return caches.delete(e)})}))}),o.options.cache.name=r.shellKey,o.router.get("assets/(.*)",o.cacheFirst,{cache:{name:r.assetsKey}}),o.router.get("/(.*)",o.cacheFirst),o.precache([".","bin/app.bundle.js","bin/runtime_simd.js","bin/runtime.js","bin/style.bundle.css"])},67:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.assetsKey="assets-v1",t.shellKey="shell-v1"},69:function(e,t,n){"use strict";var r=n(70),o=n(71),c=n(75),i=n(77),a=n(83);c.debug("Service Worker Toolbox is loading"),self.addEventListener("install",a.installListener),self.addEventListener("activate",a.activateListener),self.addEventListener("fetch",a.fetchListener),e.exports={networkOnly:i.networkOnly,networkFirst:i.networkFirst,cacheOnly:i.cacheOnly,cacheFirst:i.cacheFirst,fastest:i.fastest,router:o,options:r,cache:c.cache,uncache:c.uncache,precache:c.precache}},70:function(e,t){"use strict";var n;n=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,e.exports={cache:{name:"$$$toolbox-cache$$$"+n+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},71:function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=n(72),c=n(75),i=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var c=new RegExp(r.value[0]);c.test(t)&&o.push(r.value[1]),r=n.next()}return o},a=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){a.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),a.prototype.add=function(e,t,n,i){i=i||{};var a;t instanceof RegExp?a=RegExp:(a=i.origin||self.location.origin,a=a instanceof RegExp?a.source:r(a)),e=e.toLowerCase();var s=new o(e,t,n,i);this.routes.has(a)||this.routes.set(a,new Map);var u=this.routes.get(a);u.has(e)||u.set(e,new Map);var f=u.get(e),h=s.regexp||s.fullUrlRegExp;f.has(h.source)&&c.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,s)},a.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,i(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},a.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],c=o&&o.get(e.toLowerCase());if(c){var a=i(c,n);if(a.length>0)return a[0].makeHandler(n)}}return null},a.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},e.exports=new a},72:function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,c=n(73),i=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=c(t,this.keys)),this.method=e,this.options=r,this.handler=n};i.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},e.exports=i},73:function(e,t,n){function r(e,t){for(var n,r=[],o=0,c=0,i="",a=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],l=n.index;if(i+=e.slice(c,l),c=l+f.length,h)i+=h[1];else{var p=e[c],d=n[2],m=n[3],v=n[4],g=n[5],w=n[6],y=n[7];i&&(r.push(i),i="");var b=null!=d&&null!=p&&p!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,$=n[2]||a,k=v||g;r.push({name:m||o++,prefix:d||"",delimiter:$,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:k?u(k):y?".*":"[^"+s($)+"]+?"})}}return c<e.length&&(i+=e.substr(c)),i&&r.push(i),r}function o(e,t){return a(r(e,t))}function c(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function i(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function a(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",a=n||{},s=r||{},u=s.pretty?c:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var l,p=a[h.name];if(null==p){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(g(p)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(p)+"`");if(0===p.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<p.length;d++){if(l=u(p[d]),!t[f].test(l))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(l)+"`");o+=(0===d?h.prefix:h.delimiter)+l}}else{if(l=h.asterisk?i(p):u(p),!t[f].test(l))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+l+'"');o+=h.prefix+l}}else o+=h}return o}}function s(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function l(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function p(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(v(e[o],t,n).source);var c=new RegExp("(?:"+r.join("|")+")",h(n));return f(c,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){g(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,c="",i=0;i<e.length;i++){var a=e[i];if("string"==typeof a)c+=s(a);else{var u=s(a.prefix),l="(?:"+a.pattern+")";t.push(a),a.repeat&&(l+="(?:"+u+l+")*"),l=a.optional?a.partial?u+"("+l+")?":"(?:"+u+"("+l+"))?":u+"("+l+")",c+=l}}var p=s(n.delimiter||"/"),d=c.slice(-p.length)===p;return r||(c=(d?c.slice(0,-p.length):c)+"(?:"+p+"(?=$))?"),c+=o?"$":r&&d?"":"(?="+p+"|$)",f(new RegExp("^"+c,h(n)),t)}function v(e,t,n){return g(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?l(e,t):g(e)?p(e,t,n):d(e,t,n)}var g=n(74);e.exports=v,e.exports.parse=r,e.exports.compile=o,e.exports.tokensToFunction=a,e.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},74:function(e,t){e.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},75:function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||d.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||d.cache.name,caches.open(t)}function c(e,t){t=t||{};var n=t.successResponses||d.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||d.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&i(e,n,r)})}),r.clone()})}function i(e,t,n){var r=a.bind(null,e,t,n);p=p?p.then(r):r()}function a(e,t,n){var o=e.url,c=n.maxAgeSeconds,i=n.maxEntries,a=n.name,s=Date.now();return r("Updating LRU order for "+o+". Max entries is "+i+", max age is "+c),m.getDb(a).then(function(e){return m.setTimestampForUrl(e,o,s)}).then(function(e){return m.expireEntries(e,i,c,s)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function s(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||l(e),d.preCacheItems=d.preCacheItems.concat(e)}function l(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}var p,d=n(70),m=n(76);e.exports={debug:r,fetchAndCache:c,openCache:o,renameCache:s,cache:u,uncache:f,precache:h,validatePrecacheInput:l}},76:function(e,t){"use strict";function n(e){return new Promise(function(t,n){var r=indexedDB.open(s+e,u);r.onupgradeneeded=function(){var e=r.result.createObjectStore(f,{keyPath:h});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function r(e){return e in p||(p[e]=n(e)),p[e]}function o(e,t,n){return new Promise(function(r,o){var c=e.transaction(f,"readwrite"),i=c.objectStore(f);i.put({url:t,timestamp:n}),c.oncomplete=function(){r(e)},c.onabort=function(){o(c.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var c=1e3*t,i=[],a=e.transaction(f,"readwrite"),s=a.objectStore(f),u=s.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-c>t.value[l]){var r=t.value[h];i.push(r),s.delete(r),t.continue()}},a.oncomplete=function(){r(i)},a.onabort=o}):Promise.resolve([])}function i(e,t){return t?new Promise(function(n,r){var o=[],c=e.transaction(f,"readwrite"),i=c.objectStore(f),a=i.index(l),s=a.count();a.count().onsuccess=function(){var e=s.result;e>t&&(a.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var c=r.value[h];o.push(c),i.delete(c),e-o.length>t&&r.continue()}})},c.oncomplete=function(){n(o)},c.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return i(e,t).then(function(e){return n.concat(e)})})}var s="sw-toolbox-",u=1,f="store",h="url",l="timestamp",p={};e.exports={getDb:r,setTimestampForUrl:o,expireEntries:a}},77:function(e,t,n){e.exports={networkOnly:n(78),networkFirst:n(79),cacheOnly:n(80),cacheFirst:n(81),fastest:n(82)}},78:function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=n(75);e.exports=r},79:function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,i=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return c.debug("Strategy: network first ["+e.url+"]",n),c.openCache(n).then(function(t){var o,a,s=[];if(i){var u=new Promise(function(n){o=setTimeout(function(){t.match(e).then(function(e){e&&n(e)})},1e3*i)});s.push(u)}var f=c.fetchAndCache(e,n).then(function(e){if(o&&clearTimeout(o),r.test(e.status))return e;throw c.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return c.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return s.push(f),Promise.race(s)})}var o=n(70),c=n(75);e.exports=r},80:function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: cache only ["+e.url+"]",n),o.openCache(n).then(function(t){return t.match(e)})}var o=n(75);e.exports=r},81:function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: cache first ["+e.url+"]",n),o.openCache(n).then(function(t){return t.match(e).then(function(t){return t?t:o.fetchAndCache(e,n)})})}var o=n(75);e.exports=r},82:function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,i){var a=!1,s=[],u=function(e){s.push(e.toString()),a?i(new Error('Both cache and network failed: "'+s.join('", "')+'"')):a=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),c(e,t,n).then(f,u)})}var o=n(75),c=n(80);e.exports=r},83:function(e,t,n){"use strict";function r(e){var t=s.match(e.request);t?e.respondWith(t(e.request)):s.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(s.default(e.request))}function o(e){a.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(a.renameCache(t,u.cache.name))}function c(e){return e.reduce(function(e,t){return e.concat(t)},[])}function i(e){var t=u.cache.name+"$$$inactive$$$";a.debug("install event fired"),a.debug("creating cache ["+t+"]"),e.waitUntil(a.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(c).then(a.validatePrecacheInput).then(function(t){return a.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}n(84);var a=n(75),s=n(71),u=n(70);e.exports={fetchListener:r,activateListener:o,installListener:i}},84:function(e,t){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()}});