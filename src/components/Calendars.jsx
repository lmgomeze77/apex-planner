import{useState}from"react"
import{ChevronLeft,ChevronRight}from"lucide-react"
import{C,PRIORITY,TODAY}from"../lib/constants.js"
import{DayPanel}from"./Shared.jsx"

function getWeekDays(off){const now=new Date();const mon=new Date(now);mon.setDate(now.getDate()-now.getDay()+1+off*7);return Array.from({length:7},(_,i)=>{const d=new Date(mon);d.setDate(mon.getDate()+i);return{date:d.toISOString().split("T")[0],label:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],num:d.getDate(),month:d.toLocaleString("en-GB",{month:"short"}),isToday:d.toISOString().split("T")[0]===TODAY,fullDate:d}})}

export function WeekView({tasks,setTasks}){
  const[wOff,setWOff]=useState(0);const[selDay,setSelDay]=useState(null);const[dragOver,setDragOver]=useState(null);
  const[notes,setNotes]=useState(()=>{try{return JSON.parse(localStorage.getItem("apex:notes")||"{}")}catch{return{}}});
  const days=getWeekDays(wOff);const f=days[0];const l=days[6];
  const wLabel=f.month===l.month?`${f.month} ${f.num}–${l.num}, ${l.fullDate.getFullYear()}`:`${f.month} ${f.num} – ${l.month} ${l.num}, ${l.fullDate.getFullYear()}`;
  const updNote=(date,val)=>{const u={...notes,[date]:val};setNotes(u);localStorage.setItem("apex:notes",JSON.stringify(u))};
  const sd=selDay?days.find(d=>d.date===selDay)||{date:selDay,label:"",num:new Date(selDay+"T12:00:00").getDate(),month:new Date(selDay+"T12:00:00").toLocaleString("en-GB",{month:"short"}),isToday:selDay===TODAY}:null;
  const wT=tasks.filter(t=>days.some(d=>d.date===t.dueDate));const wD=wT.filter(t=>t.status==="done").length;
  const onDrop=(e,date)=>{e.preventDefault();setDragOver(null);const id=Number(e.dataTransfer.getData("taskId"));if(id)setTasks(p=>p.map(t=>t.id===id?{...t,dueDate:date}:t))};
  return(<div style={{flex:1,display:"flex",overflow:"hidden"}}>
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:"18px 24px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div><h2 style={{fontSize:20,fontWeight:400,color:C.text,margin:0}}>Week Overview</h2><p style={{fontSize:12,color:C.textSec,margin:"2px 0 0"}}>{wLabel} · {wD}/{wT.length} done · drag tasks between days</p></div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <button onClick={()=>setWOff(p=>p-1)}style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={15}/></button>
          {wOff!==0&&<button onClick={()=>setWOff(0)}style={{padding:"3px 9px",borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",fontSize:10,fontFamily:"inherit"}}>Today</button>}
          <button onClick={()=>setWOff(p=>p+1)}style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronRight size={15}/></button></div></div>
      <div style={{flex:1,padding:"0 24px 24px",display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:7,overflowY:"auto"}}>
        {days.map(day=>{const dt=tasks.filter(t=>t.dueDate===day.date);const dn=dt.filter(t=>t.status==="done").length;const isSel=selDay===day.date;const isDO=dragOver===day.date;
          return(<div key={day.date}
            onDragOver={e=>{e.preventDefault();setDragOver(day.date)}}onDragLeave={()=>setDragOver(null)}onDrop={e=>onDrop(e,day.date)}
            onClick={()=>setSelDay(isSel?null:day.date)}
            style={{background:isDO?C.goldGlow:isSel?"rgba(200,169,81,0.07)":day.isToday?"rgba(200,169,81,0.04)":C.card,border:`2px solid ${isDO?C.gold:isSel?C.gold+"80":day.isToday?C.gold+"30":C.border}`,borderRadius:10,padding:10,minHeight:190,cursor:"pointer",transition:"all 0.15s",display:"flex",flexDirection:"column"}}>
            <div style={{marginBottom:8}}><div style={{fontSize:9,color:day.isToday?C.gold:C.textMut,textTransform:"uppercase",letterSpacing:"1.2px",fontWeight:600}}>{day.label}</div><div style={{fontSize:21,fontWeight:200,color:day.isToday?C.gold:C.text,lineHeight:1.1}}>{day.num}</div><div style={{fontSize:9,color:C.textMut}}>{day.month}</div></div>
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>{dt.slice(0,5).map(t=><div key={t.id}style={{fontSize:9,padding:"2px 6px",borderRadius:3,lineHeight:1.4,background:PRIORITY[t.priority]?.color+"15",color:PRIORITY[t.priority]?.color,opacity:t.status==="done"?0.35:1,textDecoration:t.status==="done"?"line-through":"none",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.title}</div>)}{dt.length>5&&<div style={{fontSize:8,color:C.textMut}}>+{dt.length-5} more</div>}{dt.length===0&&<div style={{fontSize:9,color:isDO?C.gold:C.textMut,fontStyle:"italic"}}>{isDO?"Drop here":"No tasks"}</div>}</div>
            {dt.length>0&&<div style={{marginTop:8}}><div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:C.textMut,marginBottom:2}}><span>{dn}/{dt.length}</span><span>{Math.round(dn/dt.length*100)}%</span></div><div style={{height:2,background:C.border,borderRadius:1}}><div style={{height:"100%",borderRadius:1,background:dn===dt.length?C.green:C.gold,width:`${Math.round(dn/dt.length*100)}%`,transition:"width 0.5s"}}/></div></div>}
            {notes[day.date]&&<div style={{fontSize:8,color:C.textMut,marginTop:5}}>✎</div>}
          </div>)
        })}
      </div>
    </div>
    {sd&&<DayPanel day={sd}tasks={tasks}setTasks={setTasks}notes={notes[sd.date]}onNoteChange={val=>updNote(sd.date,val)}onClose={()=>setSelDay(null)}/>}
  </div>)
}

function getMonthData(off){const now=new Date();const t=new Date(now.getFullYear(),now.getMonth()+off,1);const y=t.getFullYear();const m=t.getMonth();const mn=t.toLocaleString("en-GB",{month:"long"});const fd=new Date(y,m,1);const ld=new Date(y,m+1,0);let sd=fd.getDay()-1;if(sd<0)sd=6;const days=[];for(let i=0;i<sd;i++){const d=new Date(y,m,i-sd+1);days.push({date:d.toISOString().split("T")[0],num:d.getDate(),cur:false})}for(let i=1;i<=ld.getDate();i++){const d=new Date(y,m,i);days.push({date:d.toISOString().split("T")[0],num:i,cur:true})}const rem=7-(days.length%7);if(rem<7){for(let i=1;i<=rem;i++){const d=new Date(y,m+1,i);days.push({date:d.toISOString().split("T")[0],num:i,cur:false})}}return{y,m,mn,days}}

export function MonthView({tasks,setTasks}){
  const[mOff,setMOff]=useState(0);const[selDay,setSelDay]=useState(null);const[dragOver,setDragOver]=useState(null);
  const[notes,setNotes]=useState(()=>{try{return JSON.parse(localStorage.getItem("apex:notes")||"{}")}catch{return{}}});
  const{y,m,mn,days}=getMonthData(mOff);const DOW=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const mT=tasks.filter(t=>{const d=new Date(t.dueDate);return d.getFullYear()===y&&d.getMonth()===m});const mD=mT.filter(t=>t.status==="done").length;const mP=mT.length?Math.round(mD/mT.length*100):0;
  const updNote=(date,val)=>{const u={...notes,[date]:val};setNotes(u);localStorage.setItem("apex:notes",JSON.stringify(u))};
  const sdObj=selDay?{date:selDay,num:new Date(selDay+"T12:00:00").getDate(),label:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(selDay+"T12:00:00").getDay()],month:new Date(selDay+"T12:00:00").toLocaleString("en-GB",{month:"short"}),isToday:selDay===TODAY}:null;
  const onDrop=(e,date)=>{e.preventDefault();setDragOver(null);const id=Number(e.dataTransfer.getData("taskId"));if(id)setTasks(p=>p.map(t=>t.id===id?{...t,dueDate:date}:t))};
  return(<div style={{flex:1,display:"flex",overflow:"hidden"}}>
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:"18px 24px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div><h2 style={{fontSize:20,fontWeight:400,color:C.text,margin:0}}>{mn} <span style={{color:C.textSec,fontWeight:300}}>{y}</span></h2><p style={{fontSize:12,color:C.textSec,margin:"2px 0 0"}}>{mT.length} tasks · {mP}% · click any day to open</p></div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <button onClick={()=>setMOff(p=>p-1)}style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={15}/></button>
          {mOff!==0&&<button onClick={()=>setMOff(0)}style={{padding:"3px 9px",borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",fontSize:10,fontFamily:"inherit"}}>This Month</button>}
          <button onClick={()=>setMOff(p=>p+1)}style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronRight size={15}/></button></div></div>
      <div style={{margin:"0 24px 12px",height:2,background:C.border,borderRadius:2}}><div style={{height:"100%",borderRadius:2,background:C.gold,width:`${mP}%`,transition:"width 0.8s"}}/></div>
      <div style={{flex:1,padding:"0 24px",display:"flex",flexDirection:"column",gap:4,overflow:"auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:4}}>{DOW.map(d=><div key={d}style={{textAlign:"center",fontSize:9,color:C.textMut,textTransform:"uppercase",letterSpacing:"1px",fontWeight:600,padding:"3px 0"}}>{d}</div>)}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
          {days.map((day,idx)=>{const dt=tasks.filter(t=>t.dueDate===day.date);const dn=dt.filter(t=>t.status==="done").length;const isT=day.date===TODAY;const isSel=selDay===day.date;const isDO=dragOver===day.date;
            return(<div key={idx}
              onDragOver={e=>{e.preventDefault();if(day.cur)setDragOver(day.date)}}onDragLeave={()=>setDragOver(null)}onDrop={e=>day.cur&&onDrop(e,day.date)}
              onClick={()=>day.cur&&setSelDay(isSel?null:day.date)}
              style={{background:isDO?C.goldGlow:isSel?C.goldGlow:isT?"rgba(200,169,81,0.07)":day.cur?C.card:"transparent",border:`1px solid ${isDO?C.gold:isSel?C.gold:isT?C.gold+"40":day.cur?C.border:"transparent"}`,borderRadius:7,padding:"6px 5px",minHeight:72,cursor:day.cur?"pointer":"default",opacity:day.cur?1:0.15,transition:"all 0.15s"}}>
              <div style={{width:20,height:20,borderRadius:"50%",background:isT?C.gold:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:isT?600:300,color:isT?"#07070F":day.cur?C.text:C.textMut,marginBottom:3}}>{day.num}</div>
              {day.cur&&dt.length>0&&<><div style={{display:"flex",flexWrap:"wrap",gap:2,marginBottom:3}}>{dt.slice(0,5).map(t=><div key={t.id}style={{width:5,height:5,borderRadius:"50%",background:t.status==="done"?C.green:PRIORITY[t.priority]?.color,opacity:t.status==="done"?0.4:1}}/>)}{dt.length>5&&<span style={{fontSize:7,color:C.textMut}}>+{dt.length-5}</span>}</div><div style={{height:1.5,background:C.border,borderRadius:1}}><div style={{height:"100%",borderRadius:1,background:dn===dt.length?C.green:C.gold,width:`${Math.round(dn/dt.length*100)}%`}}/></div></>}
              {notes[day.date]&&day.cur&&<div style={{fontSize:7,color:C.textMut,marginTop:2}}>✎</div>}
            </div>)})}
        </div>
      </div>
      <div style={{padding:"10px 24px",borderTop:`1px solid ${C.border}`,display:"flex",gap:20,flexShrink:0}}>
        {[{l:"Total",v:mT.length},{l:"Complete",v:mD},{l:"Pending",v:mT.length-mD},{l:"Critical",v:mT.filter(t=>t.priority==="CRITICAL").length}].map(s=><div key={s.l}><div style={{fontSize:17,fontWeight:200,color:C.text}}>{s.v}</div><div style={{fontSize:9,color:C.textMut}}>{s.l}</div></div>)}
      </div>
    </div>
    {sdObj&&<DayPanel day={sdObj}tasks={tasks}setTasks={setTasks}notes={notes[selDay]}onNoteChange={val=>updNote(selDay,val)}onClose={()=>setSelDay(null)}/>}
  </div>)
}

const MN=["January","February","March","April","May","June","July","August","September","October","November","December"]
export function YearView({tasks,goals}){
  const[yr,setYr]=useState(new Date().getFullYear());const[hov,setHov]=useState(null);const cy=new Date().getFullYear();const cm=new Date().getMonth();
  const yT=tasks.filter(t=>new Date(t.dueDate).getFullYear()===yr);const yD=yT.filter(t=>t.status==="done").length;const yP=yT.length?Math.round(yD/yT.length*100):0;
  const md=Array.from({length:12},(_,m)=>{const mt=tasks.filter(t=>{const d=new Date(t.dueDate);return d.getFullYear()===yr&&d.getMonth()===m});const d=mt.filter(t=>t.status==="done").length;const p=mt.length?Math.round(d/mt.length*100):0;const dim=new Date(yr,m+1,0).getDate();const act=Array.from({length:dim},(_,i)=>{const date=new Date(yr,m,i+1).toISOString().split("T")[0];return tasks.filter(t=>t.dueDate===date).length});return{m,name:MN[m],tasks:mt,done:d,pct:p,act}});
  const best=md.reduce((b,m)=>m.tasks.length>0&&m.pct>(b?.pct||0)?m:b,null);const busy=md.reduce((b,m)=>m.tasks.length>b.tasks.length?m:b,{tasks:[],m:0});
  return(<div style={{flex:1,overflowY:"auto",padding:24,display:"flex",flexDirection:"column",gap:18}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><h2 style={{fontSize:20,fontWeight:400,color:C.text,margin:0}}>Year at a Glance</h2><p style={{fontSize:12,color:C.textSec,margin:"2px 0 0"}}>{yT.length} tasks · {yP}% complete</p></div>
      <div style={{display:"flex",alignItems:"center",gap:8}}><button onClick={()=>setYr(p=>p-1)}style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={15}/></button><span style={{fontSize:20,fontWeight:200,color:yr===cy?C.gold:C.text,minWidth:48,textAlign:"center"}}>{yr}</span><button onClick={()=>setYr(p=>p+1)}style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronRight size={15}/></button></div></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>{[{l:"Total",v:yT.length,c:C.text},{l:"Completed",v:yD,c:C.green},{l:"Pending",v:yT.length-yD,c:C.orange},{l:"Rate",v:`${yP}%`,c:C.gold}].map(s=><div key={s.l}style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px"}}><div style={{fontSize:20,fontWeight:200,color:s.c}}>{s.v}</div><div style={{fontSize:9,color:C.textMut,marginTop:2}}>{s.l}</div></div>)}</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>{md.map(({m,name,tasks:mt,done,pct,act})=>{const isCur=yr===cy&&m===cm;const isFut=yr>cy||(yr===cy&&m>cm);return(<div key={m}onMouseEnter={()=>setHov(m)}onMouseLeave={()=>setHov(null)}style={{background:isCur?C.goldGlow:C.card,border:`1px solid ${isCur?C.gold+"50":hov===m?C.borderHi:C.border}`,borderRadius:11,padding:12,transition:"border-color 0.15s",opacity:isFut?0.45:1}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}><div><div style={{fontSize:12,fontWeight:500,color:isCur?C.gold:C.text}}>{name}</div><div style={{fontSize:9,color:C.textMut,marginTop:1}}>{mt.length} tasks</div></div><div style={{fontSize:15,fontWeight:200,color:pct>=80?C.green:pct>=50?C.gold:C.textSec}}>{mt.length>0?`${pct}%`:"—"}</div></div><div style={{display:"flex",gap:1.5,flexWrap:"wrap",marginBottom:8}}>{act.slice(0,31).map((count,i)=><div key={i}style={{width:6,height:6,borderRadius:1.5,background:count===0?C.border:count>=3?C.gold:count>=2?C.gold+"70":C.gold+"40"}}/>)}</div><div style={{height:2,background:C.border,borderRadius:1}}><div style={{height:"100%",borderRadius:1,background:pct>=80?C.green:C.gold,width:`${pct}%`,transition:"width 0.8s"}}/></div><div style={{display:"flex",justifyContent:"space-between",marginTop:7,fontSize:9,color:C.textMut}}><span>{done} done</span><span>{mt.length-done} left</span></div></div>)})}</div>
    {yT.length>0&&<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16}}><div style={{fontSize:9,color:C.textMut,textTransform:"uppercase",letterSpacing:"1px",marginBottom:12}}>Year Insights</div><div style={{display:"flex",gap:24,flexWrap:"wrap"}}>{best&&<div><div style={{fontSize:10,color:C.textSec}}>Best month</div><div style={{fontSize:13,color:C.green,fontWeight:500}}>{best.name} · {best.pct}%</div></div>}{busy.tasks.length>0&&<div><div style={{fontSize:10,color:C.textSec}}>Most active</div><div style={{fontSize:13,color:C.gold,fontWeight:500}}>{MN[busy.m]} · {busy.tasks.length} tasks</div></div>}<div><div style={{fontSize:10,color:C.textSec}}>Goals</div><div style={{fontSize:13,color:C.blue,fontWeight:500}}>{goals.length} tracked</div></div></div></div>}
  </div>)
}
