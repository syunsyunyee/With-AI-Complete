(()=>{
 'use strict';
 // Resolve the download from the account/repository hosting this Pages site.
 const projectDownload=document.getElementById('project-download');
 if(projectDownload&&location.hostname.endsWith('.github.io')){
  const owner=location.hostname.slice(0,-'.github.io'.length);
  const repository=location.pathname.split('/').filter(Boolean)[0]||owner+'.github.io';
  projectDownload.href='https://github.com/'+encodeURIComponent(owner)+'/'+encodeURIComponent(repository)+'/archive/HEAD.zip';
 }

 const status=document.getElementById('entry-status');
 let pending=false;
 async function launch(params){
  if(pending)return;
  pending=true;
  status.textContent='서비스에 연결하고 있습니다…';
  const query=new URLSearchParams(params);
  try{
   const response=await fetch('http://127.0.0.1:8766/bridge-info',{signal:AbortSignal.timeout(1500)});
   if(response.ok&&(await response.json()).bridge==='aigo-in-v1'){
    location.href='http://127.0.0.1:8766/start?'+query;return;
   }
  }catch{}
  location.href='aigo-in://open?port=AUTO'+(query.size?'&'+query:'');
  status.textContent='연결 도우미 실행을 허용해 주세요. 처음 사용하는 PC라면 아래 설치 안내를 펼쳐 주세요.';
  pending=false;
 }
 document.addEventListener('click',event=>{
  const button=event.target.closest('button[data-action="open_app"]');
  if(button)launch({app:button.dataset.value});
 });
 document.getElementById('in-robot-open').onclick=()=>launch({device:'robot'});
 document.getElementById('in-microbit-open').onclick=()=>launch({device:'microbit'});
})();
