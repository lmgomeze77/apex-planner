import{useState}from"react"
import{ChevronLeft,ChevronRight}from"lucide-react"
import{C,PRIORITY,TODAY}from"../lib/constants.js"
import DayPanel from"./DayPanel.jsx"
function getWeekDays(offset){
  const now=new Date();const mon=new Date(now);mon.setDate(now.getDate()-now.getDay()+1+offset*7);
  return Array.from({length:7},(_,i)=>{const d=new Date(mon);d.setDate(mon.getDate()+i);return{date:d.toISOString().split("T")[0],label:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],num:d.getDate(),month:d.toLocaleString("en-GB",{month:"short"}),isToday:d.toISOString().split("T")[0]===TODAY,fullDate:d}});
}
export default function WeekView({tasks,setTasks}){
  const[weekOffset,setWeekOffset]=useState(0);const[selectedDay,setSelectedDay]=useState(null);
  const[dayNotes,setDayNotes]=useState(()=>{try{return JSON.parse(localStorage.getItem("apex:day-notes")||"{}")}catch{return{}}});
  const days=getWeekDays(weekOffset);const first=days[0];const last=days[6];
  const weekLabel=first.month===last.month?`${first.month} ${first.num}–${last.num}, ${last.fullDate.getFullYear()}`:`${first.month} ${first.num} – ${last.month} ${last.num}, ${last.fullDate.getFullYear()}`;
  const updateNote=(date,val)=>{const u={...dayNotes,[date]:val};setDayNotes(u);localStorage.setItem("apex:day-notes",JSON.stringify(u))};
  const selDay=selectedDay?days.find(d=>d.date===selectedDay):null;
  const weekTasks=tasks.filter(t=>days.some(d=>d.date===t.dueDate));const weekDone=weekTasks.filter(t=>t.status==="done").length;
  return(<div style={{flex:1,display:"flex",overflow:"hidden"}}>
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:"18px 24px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div><h2 style={{fontSize:20,fontWeight:400,color:C.text,margin:0}}>Week Overview</h2>
          <p style={{fontSize:12,color:C.textSec,margin:"2px 0 0"}}>{weekLabel} · {weekDone}/{weekTasks.length} done</p></div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <button onClick={()=>setWeekOffset(p=>p-1)}style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={15}/></button>
          {weekOffset!==0&&<button onClick={()=>setWeekOffset(0)}style={{padding:"3px 9px",borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",fontSize:10,fontFamily:"inherit"}}>Today</button>}
          <button onClick={()=>setWeekOffset(p=>p+1)}style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronRight size={15}/></button></div></div>
      <div style={{flex:1,padding:"0 24px 24px",display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:7,overflowY:"auto"}}>
        {days.map(day=>{
          const dt=tasks.filter(t=>t.dueDate===day.date);const done=dt.filter(t=>t.status==="done").length;
          const isSel=selectedDay===day.date;const isPast=new Date(day.date)<new Date(TODAY)&&!day.isToday;
          return(<div key={day.date}onClick={()=>setSelectedDay(isSel?null:day.date)}style={{background:isSel?C.goldGlow:day.isToday?"rgba(200,169,81,0.05)":C.card,border:`1px solid ${isSel?C.gold:day.isToday?C.gold+"40":C.border}`,borderRadius:10,padding:10,minHeight:190,cursor:"pointer",transition:"all 0.15s",opacity:isPast?0.75:1,display:"flex",flexDirection:"column"}}>
            <div style={{marginBottom:8}}><div style={{fontSize:9,color:day.isToday?C.gold:C.textMut,textTransform:"uppercase",letterSpacing:"1.2px",fontWeight:600}}>{day.label}</div>
              <div style={{fontSize:21,fontWeight:200,color:day.isToday?C.gold:C.text,lineHeight:1.1}}>{day.num}</div>
              <div style={{fontSize:9,color:C.textMut}}>{day.month}</div></div>
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
              {dt.slice(0,5).map(t=><div key={t.id}style={{fontSize:9,padding:"2px 6px",borderRadius:3,lineHeight:1.4,background:PRIORITY[t.priority]?.color+"15",color:PRIORITY[t.priority]?.color,opacity:t.status==="done"?0.35:1,textDecoration:t.status==="done"?"line-through":"none",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.title}</div>)}
              {dt.length>5&&<div style={{fontSize:8,color:C.textMut}}>+{dt.length-5} more</div>}
              {dt.length===0&&<div style={{fontSize:9,color:C.textMut,fontStyle:"italic"}}>No tasks</div>}
            </div>
            {dt.length>0&&<div style={{marginTop:8}}><div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:C.textMut,marginBottom:2}}><span>{done}/{dt.length}</span><span>{Math.round(done/dt.length*100)}%</span></div>
              <div style={{height:2,background:C.border,borderRadius:1}}><div style={{height:"100%",borderRadius:1,background:done===dt.length?C.green:C.gold,width:`${Math.round(done/dt.length*100)}%`,transition:"width 0.5s"}}/></div></div>}
            {dayNotes[day.date]&&<div style={{fontSize:8,color:C.textMut,marginTop:5}}>✎ note</div>}
          </div>)
        })}
      </div>
    </div>
    {selDay&&<DayPanel day={selDay}tasks={tasks}setTasks={setTasks}notes={dayNotes[selDay.date]}onNoteChange={val=>updateNote(selDay.date,val)}onClose={()=>setSelectedDay(null)}/>}
  </div>)
}