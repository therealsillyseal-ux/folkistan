'use strict';
const { isIP } = require('node:net');
const SEARCH_ENGINES = {duckduckgo:'https://duckduckgo.com/?q=',brave:'https://search.brave.com/search?q=',google:'https://www.google.com/search?q='};
function inputToURL(input, engine='duckduckgo') {
  const text = String(input || '').trim().slice(0, 8192);
  if (!text || text === 'folkistan://newtab') return 'folkistan://newtab';
  if (/^[a-z][a-z\d+.-]*:/i.test(text) && !/^[\w.-]+:\d+(?:\/|$)/.test(text)) {
    const url = new URL(text);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Only HTTP and HTTPS addresses are supported.');
    if (url.username || url.password) throw new Error('Addresses containing usernames or passwords are blocked.');
    return url.href;
  }
  if (!/\s/.test(text) && (/^[\w-]+(?:\.[\w-]+)+(?:[:/?#]|$)/.test(text) || /^localhost(?::\d+)?(?:\/|$)/.test(text) || /^\[.*\]/.test(text))) {
    return inputToURL('https://' + text, engine);
  }
  return (SEARCH_ENGINES[engine] || SEARCH_ENGINES.duckduckgo) + encodeURIComponent(text);
}
function allowedURL(url) {
  try { const u = new URL(url); return ['https:', 'http:'].includes(u.protocol) && !u.username && !u.password; } catch { return false; }
}
function riskReasons(url) {
  const u = new URL(url); const reasons = [];
  if (u.protocol === 'http:') reasons.push('This connection is not encrypted (HTTP).');
  if (u.hostname.split('.').some(p => p.startsWith('xn--'))) reasons.push('This internationalized domain uses punycode. Check its spelling carefully.');
  if (isIP(u.hostname.replace(/^\[|\]$/g, ''))) reasons.push('This address uses an IP address instead of a domain name.');
  return reasons;
}
function cleanBookmarks(items) {
  if (!Array.isArray(items)) return [];
  const seen = new Set(); return items.slice(0, 20000).filter(x => x && typeof x.url === 'string' && allowedURL(x.url) && !seen.has(x.url) && seen.add(x.url)).map(x => ({ title: String(x.title || x.url).slice(0, 300), url: x.url.slice(0,8192) }));
}
function chromiumBookmarks(root) {
  const out = []; function walk(n, depth=0) { if (!n || depth>40 || out.length>=20000) return; if (n.type==='url') out.push({title:n.name,url:n.url}); if(Array.isArray(n.children)) n.children.forEach(c=>walk(c,depth+1)); }
  Object.values(root.roots || {}).forEach(n=>walk(n)); return cleanBookmarks(out);
}
module.exports = { SEARCH_ENGINES, inputToURL, allowedURL, riskReasons, cleanBookmarks, chromiumBookmarks };
