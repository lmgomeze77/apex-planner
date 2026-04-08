import{useState}from"react"
import{ChevronLeft,ChevronRight}from"lucide-react"
import{C,PRIORITY,TODAY}from"../lib/constants.js"
import DayPanel from"./DayPanel.jsx"
function getMonthData(offset){
  const now=new Date();const target=new Date(now.getFullYear(),now.getMonth()+offset,1);
  const year=target.getFullYear();const month=target.getMonth();
  const monthName=target.toLocaleString("en-GB",{month:"long"});
  const firstDay=new Date(year,month,1);const lastDay=new Date(year,month+1,0);
  let startDow=firstDay.getDay()-1;if(startDow<0)startDow=6;
  const days=[];
  for(let i=0;i<startDow;i++){const d=new Date(year,month,i-startDow+1);days.push({date:d.toISOString().split("T")[0],num:d.getDate(),current:false})}
  for(let i=1;i<=lastDay.getDate();i++){const d=new Date(year,month,i);days.push({date:d.toISOString().split("T")[0],num:i,current:true})}
  const rem=7-(days.length%7);if(rem<7){for(let i=1;i<=rem;i++){const d=new Date(year,month+1,i);days.push({date:d.toISOString().split("T")[0],num:i,current:false})}}
  return{year,month,monthName,days};
}
export default function MonthView({tasks,setTasks}){
  const[monthOffset,setMonthOffset]=useState(0);const[selectedDay,setSelectedDay]=useState(null);
  const[dayNotes,setDayNotes]=useState(()=>{try{return JSON.parse(localStorage.getItem("apex:day-notes")||"{}")}catch{return{}}});
  const{year,month,monthName,days}=getMonthData(monthOffset);
  const DOW=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const mTasks=tasks.filter(t=>{const d=new Date(t.dueDate);return d.getFullYear()===year&&d.getMonth()===month});
  const mDone=mTasks.filter(t=>t.status==="done").length;const mPct=mTasks.length?Math.round(mDone/mTasks.length*100):0;
  const updateNote=(date,val)=>{const u={...dayNotes,[date]:val};setDayNotes(u);localStorage.setItem("apex:day-notes",JSON.stringify(u))};
  const selDayObj=selectedDay?{date:selectedDay,num:new Date(selectedDay+"T12:00:00").getDate(),label:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(selectedDay+"T12:00:00").getDay()],month:new Date(selectedDay+"T12:00:00").toLocaleString("en-GB",{month:"short"}),isToday:selectedDay===TODAY}:null;
  return(<div style={{flex:1,display:"flex",overflow:"hidden"}}>
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:"18px 24px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div><h2 style={{fontSize:20,fontWeight:400,color:C.text,margin:0}}>{monthName} <span style={{color:C.textSec,fontWeight:300}}>{year}</span></h2>
          <p style={{fontSize:12,color:C.textSec,margin:"2px 0 0"}}>{mTasks.length} tasks · {mPct}% complete</p></div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <button onClick={()=>setMonthOffset(p=>p-1)}style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={15}/></button>
          {monthOffset!==0&&<button onClick={()=>setMonthOffset(0)}style={{padding:"3px 9px",borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",fontSize:10,fontFamily:"inherit"}}>This Month</button>}
          <button onClick={()=>setMonthOffset(p=>p+1)}style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronRight size={15}/></button></div></div>
      <div style={{margin:"0 24px 12px",height:2,background:C.border,borderRadius:2}}><div style={{height:"100%",borderRadius:2,background:C.gold,width:`${mPct}%`,transition:"width 0.8s"}}/></div>
      <div style={{flex:1,padding:"0 24px",display:"flex",flexDirection:"column",gap:4,overflow:"auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:4}}>
          {DOW.map(d=><div key={d}style={{textAlign:"center",fontSize:9,color:C.textMut,textTransform:"uppercase",letterSpacing:"1px",fontWeight:600,padding:"3px 0"}}>{d}</div>)}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
          {days.map((day,idx)=>{
            const dt=tasks.filter(t=>t.dueDate===day.date);const done=dt.filter(t=>t.status==="done").length;
            const isToday=day.date===TODAY;const isSel=selectedDay===day.date;
            return(<div key={idx}onClick={()=>day.current&&setSelectedDay(isSel?null:day.date)}style={{background:isSel?C.goldGlow:isToday?"rgba(200,169,81,0.07)":day.current?C.card:"transparent",border:`1px solid ${isSel?C.gold:isToday?C.gold+"40":day.current?C.border:"transparent"}`,borderRadius:7,padding:"6px 5px",minHeight:68,cursor:day.current?"pointer":"default",opacity:day.current?1:0.2,transition:"all 0.15s"}}>
              <div style={{width:20,height:20,borderRadius:"50%",background:isToday?C.gold:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:isToday?600:300,color:isToday?"#07070F":day.current?C.text:C.textMut,marginBottom:3}}>{day.num}</div>
              {day.current&&dt.length>0&&<><div style={{display:"flex",flexWrap:"wrap",gap:2,marginBottom:3}}>{dt.slice(0,5).map(t=><div key={t.id}style={{width:5,height:5,borderRadius:"50%",background:t.status==="done"?C.green:PRIORITY[t.priority]?.color,opacity:t.status==="done"?0.4:1}}/>)}{dt.length>5&&<span style={{fontSize:7,color:C.textMut}}>+{dt.length-5}</span>}</div>
              <div style={{height:1.5,background:C.border,borderRadius:1}}><div style={{height:"100%",borderRadius:1,background:done===dt.length?C.green:C.gold,width:`${Math.round(done/dt.length*100)}%`}}/></div></>}
              {dayNotes[day.date]&&day.current&&<div style={{fontSize:7,color:C.textMut,marginTop:2}}>✎</div>}
            </div>)
          })}
        </div>
      </div>
      <div style={{padding:"10px 24px",borderTop:`1px solid ${C.border}`,display:"flex",gap:20,flexShrink:0}}>
        {[{l:"Total",v:mTasks.length},{l:"Complete",v:mDone},{l:"Pending",v:mTasks.length-mDone},{l:"Critical",v:mTasks.filter(t=>t.priority==="CRITICAL").length}].map(s=><div key={s.l}><div style={{fontSize:17,fontWeight:200,color:C.text}}>{s.v}</div><div style={{fontSize:9,color:C.textMut}}>{s.l}</div></div>)}
      </div>
    </div>
    {selDayObj&&<DayPanel day={selDayObj}tasks={tasks}setTasks={setTasks}notes={dayNotes[selectedDay]}onNoteChange={val=>updateNote(selectedDay,val)}onClose={()=>setSelectedDay(null)}/>}
  </div>)
}