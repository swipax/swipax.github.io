const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=d=>new Date(d).toLocaleDateString('tr-TR',{year:'numeric',month:'long',day:'numeric'});
fetch('posts.json').then(r=>r.json()).then(all=>{
  all.sort((a,b)=>b.date.localeCompare(a.date));
  const card=p=>`<a class="card" href="post.html?p=${esc(p.slug)}"><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><div class="chips"><span>${fmt(p.date)}</span>${(p.tags||[]).map(t=>`<span>${esc(t)}</span>`).join('')}</div></a>`;
  const latest=document.getElementById('latest');
  if(latest) latest.innerHTML=all.slice(0,3).map(card).join('');
  const list=document.getElementById('postlist');
  if(list) list.innerHTML=all.map(card).join('')||'<p>Henüz yazı yok.</p>';
  const body=document.getElementById('postbody');
  if(body){
    const slug=new URLSearchParams(location.search).get('p')||'';
    const meta=/^[a-z0-9-]+$/.test(slug)&&all.find(p=>p.slug===slug);
    if(!meta){body.textContent='Yazı bulunamadı.';return;}
    document.title=meta.title+' — Berke Bodur';
    document.getElementById('ptitle').textContent=meta.title;
    document.getElementById('pdate').textContent=fmt(meta.date);
    fetch('posts/'+slug+'.md').then(r=>r.text()).then(md=>{body.innerHTML=DOMPurify.sanitize(marked.parse(md));});
  }
}).catch(()=>{const s=document.getElementById('blog');if(s)s.remove();});
