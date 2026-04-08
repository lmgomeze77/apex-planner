import{useState}from"react"
import{CheckCircle2,Circle,Plus,X,Check}from"lucide-react"
import{C,PRIORITY}from"../lib/constants.js"
export default function DayPanel({day,tasks,setTasks,notes,onNoteChange,onClose}){
  const[newTitle,setNewTitle]=useState("");const[newPri,setNewPri]=useState("HIGH");const[showAdd,setShowAdd]=useState(false);
  const dt=tasks.filter(t=>t.dueDate===day.date);const done=dt.filter(t=>t.status==="done").length;const pct=dt.length?Math.round(done/dt.length*100):0;
  const grouped={CRITICAL:dt.filter(t=>t.priority==="CRITICAL"),HIGH:dt.filter(t=>t.priority==="HIGH"),NORMAL:dt.filter(t=>t.priority==="NORMAL")};
  const toggle=id=>setTasks(p=>p.map(t=>t.id===id?{...t,status:t.status==="done"?"pending":"done"}:t));
  const del=id=>setTasks(p=>p.filter(t=>t.id!==id));
  const add=()=>{if(!newTitle.trim())return;setTasks(p=>[...p,{id:Date.now(),title:newTitle,priority:newPri,status:"pending",category:"work",dueDate:day.date}]);setNewTitle("");setShowAdd(false)};
  return(<div style={{width:296,background:C.surface,borderLeft:`1px solid ${C.border}`,display:"flex",flexDirection:"column",flexShrink:0,overflow:"hidden"}}>
    <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div><div style={{fontSize:9,color:C.textMut,textTransform:"uppercase",letterSpacing:"1px"}}>{day.label}</div>
        <div style={{fontSize:17,fontWeight:300,color:day.isToday?C.gold:C.text}}>{day.num} {day.month}</div></div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{textAlign:"right"}}><div style={{fontSize:18,fontWeight:200,color:C.text}}>{pct}<span style={{fontSize:10,color:C.textSec}}>%</span></div>
          <div style={{fontSize:9,color:C.textMut}}>{done}/{dt.length} done</div></div>
        <button onClick={onClose}style={{border:"none",background:"none",color:C.textMut,cursor:"pointer",padding:0,display:"flex"}}><X size={15}/></button></div></div>
    <div style={{height:2,background:C.border}}><div style={{height:"100%",background:C.gold,width:`${pct}%`,transition:"width 0.5s"}}/></div>
    <div style={{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:10}}>
      {dt.length===0&&<div style={{fontSize:11,color:C.textMut,fontStyle:"italic",textAlign:"center",marginTop:16}}>No tasks — add one below.</div>}
      {Object.entries(grouped).map(([pri,items])=>items.length>0&&(<div key={pri}>
        <div style={{fontSize:9,color:PRIORITY[pri].color,textTransform:"uppercase",letterSpacing:"1px",fontWeight:600,marginBottom:5}}>{PRIORITY[pri].label}</div>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>{items.map(t=>(
          <div key={t.id}style={{display:"flex",alignItems:"center",gap:7,padding:"6px 9px",background:C.card,border:`1px solid ${C.border}`,borderLeft:`2px solid ${PRIORITY[t.priority].color}`,borderRadius:7,opacity:t.status==="done"?0.4:1}}>
            <button onClick={()=>toggle(t.id)}style={{border:"none",background:"none",cursor:"pointer",color:t.status==="done"?C.green:C.textMut,padding:0,display:"flex",flexShrink:0}}>{t.status==="done"?<CheckCircle2 size={13}/>:<Circle size={13}/>}</button>
            <span style={{flex:1,fontSize:11,color:C.text,textDecoration:t.status==="done"?"line-through":"none"}}>{t.title}</span>
            <button onClick={()=>del(t.id)}style={{border:"none",background:"none",cursor:"pointer",color:C.textMut,padding:0,display:"flex",flexShrink:0}}><X size={10}/></button></div>
        ))}</div></div>))}
      {showAdd?(<div style={{display:"flex",flexDirection:"column",gap:7}}>
        <input value={newTitle}onChange={e=>setNewTitle(e.target.value)}onKeyDown={e=>e.key==="Enter"&&add()}autoFocus placeholder="Task..."style={{background:C.elevated,border:`1px solid ${C.border}`,borderRadius:6,padding:"7px 9px",fontSize:11,color:C.text,outline:"none",fontFamily:"inherit"}}/>
        <div style={{display:"flex",gap:4}}>{["CRITICAL","HIGH","NORMAL"].map(p=><button key={p}onClick={()=>setNewPri(p)}style={{padding:"3px 7px",borderRadius:5,fontSize:9,cursor:"pointer",fontWeight:600,border:`1px solid ${newPri===p?PRIORITY[p].color:C.border}`,background:newPri===p?PRIORITY[p].color+"18":"transparent",color:newPri===p?PRIORITY[p].color:C.textMut,fontFamily:"inherit"}}>{PRIORITY[p].label}</button>)}</div>
        <div style={{display:"flex",gap:5,justifyContent:"flex-end"}}>
          <button onClick={()=>setShowAdd(false)}style={{border:`1px solid ${C.border}`,background:"none",borderRadius:6,color:C.textSec,cursor:"pointer",padding:"4px 8px",fontSize:10,fontFamily:"inherit"}}>Cancel</button>
          <button onClick={add}style={{border:"none",background:C.gold,borderRadius:6,color:"#07070F",cursor:"pointer",padding:"4px 10px",fontSize:10,fontWeight:600,fontFamily:"inherit"}}>Add</button></div>
      </div>):(
        <button onClick={()=>setShowAdd(true)}style={{display:"flex",alignItems:"center",gap:6,background:"transparent",border:`1px dashed ${C.border}`,borderRadius:6,color:C.textMut,cursor:"pointer",padding:"6px 9px",fontSize:11,fontFamily:"inherit"}}><Plus size={11}/>Add task for this day</button>)}
    </div>
    <div style={{padding:"10px 14px",borderTop:`1px solid ${C.border}`}}>
      <div style={{fontSize:9,color:C.textMut,textTransform:"uppercase",letterSpacing:"1px",marginBottom:5}}>Notes & Outcomes</div>
      <textarea value={notes||""}onChange={e=>onNoteChange(e.target.value)}rows={3}placeholder="What happened, decisions, blockers..."style={{width:"100%",background:C.elevated,border:`1px solid ${C.border}`,borderRadius:6,padding:"6px 9px",fontSize:11,color:C.text,outline:"none",resize:"none",fontFamily:"inherit"}}/></div>
  </div>)
}