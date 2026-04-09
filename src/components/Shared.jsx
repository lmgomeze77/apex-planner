import{useState}from"react"
import{CheckCircle2,Circle,Plus,X,Check,Edit3,Trash2,GripVertical,Sparkles}from"lucide-react"
import{C,PRIORITY,CATS,TODAY}from"../lib/constants.js"

export function Tag({label,color}){return<span style={{fontSize:10,padding:"2px 7px",borderRadius:4,background:color+"18",color,fontWeight:500,flexShrink:0}}>{label}</span>}
export function Btn({children,onClick,gold,small,danger,disabled,style:sx={}}){return<button onClick={onClick}disabled={disabled}style={{display:"flex",alignItems:"center",gap:5,cursor:disabled?"not-allowed":"pointer",padding:small?"5px 10px":"8px 16px",fontSize:small?11:12,fontWeight:600,borderRadius:7,border:gold?"none":danger?`1px solid ${C.red}40`:`1px solid ${C.borderHi}`,background:gold?C.gold:danger?C.red+"15":"transparent",color:gold?"#07070F":danger?C.red:C.textSec,opacity:disabled?0.5:1,fontFamily:"inherit",...sx}}>{children}</button>}
export function ProgressRing({progress,size=56,stroke=4,color=C.gold}){const r=(size-stroke)/2,ci=2*Math.PI*r,of=ci-(progress/100)*ci;return<svg width={size}height={size}style={{transform:"rotate(-90deg)",flexShrink:0}}><circle cx={size/2}cy={size/2}r={r}fill="none"stroke={C.border}strokeWidth={stroke}/><circle cx={size/2}cy={size/2}r={r}fill="none"stroke={color}strokeWidth={stroke}strokeDasharray={ci}strokeDashoffset={of}strokeLinecap="round"style={{transition:"stroke-dashoffset 1s ease"}}/></svg>}

export function TaskEditModal({task,onSave,onDelete,onClose}){
  const[t,setT]=useState({...task});
  return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
    <div style={{width:420,background:C.card,border:`1px solid ${C.borderHi}`,borderRadius:14,overflow:"hidden"}}>
      <div style={{padding:"18px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}><Edit3 size={14}color={C.gold}/><span style={{fontSize:12,color:C.gold,fontWeight:600,letterSpacing:"1px",textTransform:"uppercase"}}>Edit Task</span></div>
        <button onClick={onClose}style={{border:"none",background:"none",color:C.textMut,cursor:"pointer",padding:0,display:"flex"}}><X size={15}/></button></div>
      <div style={{padding:"18px 20px",display:"flex",flexDirection:"column",gap:14}}>
        <div><div style={{fontSize:9,color:C.textMut,textTransform:"uppercase",letterSpacing:"1px",marginBottom:6}}>Title</div>
          <input value={t.title}onChange={e=>setT(p=>({...p,title:e.target.value}))}style={{width:"100%",background:C.elevated,border:`1px solid ${C.border}`,borderRadius:7,padding:"9px 12px",fontSize:13,color:C.text,outline:"none",fontFamily:"inherit"}}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><div style={{fontSize:9,color:C.textMut,textTransform:"uppercase",letterSpacing:"1px",marginBottom:6}}>Priority</div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>{["CRITICAL","HIGH","NORMAL"].map(p=><button key={p}onClick={()=>setT(pr=>({...pr,priority:p}))}style={{padding:"5px 10px",borderRadius:6,fontSize:10,cursor:"pointer",fontWeight:600,textAlign:"left",border:`1px solid ${t.priority===p?PRIORITY[p].color:C.border}`,background:t.priority===p?PRIORITY[p].color+"18":"transparent",color:t.priority===p?PRIORITY[p].color:C.textMut,fontFamily:"inherit"}}>{PRIORITY[p].label}</button>)}</div></div>
          <div><div style={{fontSize:9,color:C.textMut,textTransform:"uppercase",letterSpacing:"1px",marginBottom:6}}>Category</div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>{Object.entries(CATS).slice(0,5).map(([k,v])=><button key={k}onClick={()=>setT(p=>({...p,category:k}))}style={{padding:"5px 10px",borderRadius:6,fontSize:10,cursor:"pointer",textAlign:"left",border:`1px solid ${t.category===k?v.color:C.border}`,background:t.category===k?v.color+"18":"transparent",color:t.category===k?v.color:C.textMut,fontFamily:"inherit"}}>{v.label}</button>)}</div></div></div>
        <div><div style={{fontSize:9,color:C.textMut,textTransform:"uppercase",letterSpacing:"1px",marginBottom:6}}>Due Date</div>
          <input type="date"value={t.dueDate||""}onChange={e=>setT(p=>({...p,dueDate:e.target.value}))}style={{width:"100%",background:C.elevated,border:`1px solid ${C.border}`,borderRadius:7,padding:"9px 12px",fontSize:13,color:C.text,outline:"none",fontFamily:"inherit"}}/></div>
        <div><div style={{fontSize:9,color:C.textMut,textTransform:"uppercase",letterSpacing:"1px",marginBottom:6}}>Notes</div>
          <textarea value={t.notes||""}onChange={e=>setT(p=>({...p,notes:e.target.value}))}rows={3}placeholder="Context, blockers, outcome..."style={{width:"100%",background:C.elevated,border:`1px solid ${C.border}`,borderRadius:7,padding:"9px 12px",fontSize:12,color:C.text,outline:"none",resize:"none",fontFamily:"inherit"}}/></div>
        <div style={{display:"flex",justifyContent:"space-between",paddingTop:4}}>
          <Btn danger small onClick={()=>{onDelete(task.id);onClose()}}><Trash2 size={11}/>Delete</Btn>
          <div style={{display:"flex",gap:8}}><Btn onClick={onClose}>Cancel</Btn><Btn gold onClick={()=>{onSave(t);onClose()}}><Check size={12}/>Save</Btn></div></div>
      </div>
    </div>
  </div>)
}

export function DraggableTaskRow({task,onToggle,onDelete,onEdit,onDragStart,onDragEnd}){
  const[h,setH]=useState(false);const[dragging,setDragging]=useState(false);
  const pr=PRIORITY[task.priority];const cat=CATS[task.category]||CATS.work;
  return(<div draggable onDragStart={e=>{setDragging(true);onDragStart(e,task.id)}}onDragEnd={()=>{setDragging(false);if(onDragEnd)onDragEnd()}}
    onMouseEnter={()=>setH(true)}onMouseLeave={()=>setH(false)}
    style={{background:dragging?"transparent":h&&task.status!=="done"?C.elevated:C.card,border:`1px solid ${dragging?"transparent":C.border}`,borderLeft:`3px solid ${pr.color}`,borderRadius:8,padding:"9px 12px",display:"flex",alignItems:"center",gap:8,transition:"all 0.15s",opacity:dragging?0.3:task.status==="done"?0.45:1,cursor:"grab"}}>
    <GripVertical size={12}color={C.textMut}style={{flexShrink:0}}/>
    <button onClick={()=>onToggle(task.id)}style={{border:"none",background:"none",cursor:"pointer",color:task.status==="done"?C.green:C.textMut,padding:0,display:"flex",flexShrink:0}}>{task.status==="done"?<CheckCircle2 size={16}/>:<Circle size={16}/>}</button>
    <span onClick={()=>onEdit(task)}style={{flex:1,fontSize:13,color:C.text,textDecoration:task.status==="done"?"line-through":"none",cursor:"pointer"}}>{task.title}</span>
    {task.notes&&<div style={{width:6,height:6,borderRadius:"50%",background:C.gold,flexShrink:0}}/>}
    <Tag label={cat.label}color={cat.color}/>
    {task.dueDate&&task.dueDate!==TODAY&&<span style={{fontSize:9,color:C.textMut,flexShrink:0}}>{new Date(task.dueDate+"T12:00:00").toLocaleDateString("en-GB",{month:"short",day:"numeric"})}</span>}
    {h&&<button onClick={e=>{e.stopPropagation();onDelete(task.id)}}style={{border:"none",background:"none",cursor:"pointer",color:C.textMut,padding:0,display:"flex",flexShrink:0}}><X size={12}/></button>}
  </div>)
}

export function DayPanel({day,tasks,setTasks,notes,onNoteChange,onClose}){
  const[nt,setNt]=useState("");const[np,setNp]=useState("HIGH");const[nc,setNc]=useState("work");const[nd,setNd]=useState(day.date);const[sa,setSa]=useState(false);
  const[editTask,setEditTask]=useState(null);const[dragOver,setDragOver]=useState(false);
  const dt=tasks.filter(t=>t.dueDate===day.date);const dn=dt.filter(t=>t.status==="done").length;const pt=dt.length?Math.round(dn/dt.length*100):0;
  const gr={CRITICAL:dt.filter(t=>t.priority==="CRITICAL"&&t.status!=="done"),HIGH:dt.filter(t=>t.priority==="HIGH"&&t.status!=="done"),NORMAL:dt.filter(t=>t.priority==="NORMAL"&&t.status!=="done")};
  const doneT=dt.filter(t=>t.status==="done");
  const tog=id=>setTasks(p=>p.map(t=>t.id===id?{...t,status:t.status==="done"?"pending":"done"}:t));
  const del=id=>setTasks(p=>p.filter(t=>t.id!==id));
  const save=u=>setTasks(p=>p.map(t=>t.id===u.id?{...t,...u}:t));
  const add=()=>{if(!nt.trim())return;setTasks(p=>[...p,{id:Date.now(),title:nt,priority:np,status:"pending",category:nc,dueDate:nd}]);setNt("");setSa(false)};
  const onDS=(e,id)=>e.dataTransfer.setData("taskId",String(id));
  const onDrop=e=>{e.preventDefault();setDragOver(false);const id=Number(e.dataTransfer.getData("taskId"));if(id)setTasks(p=>p.map(t=>t.id===id?{...t,dueDate:day.date}:t))};
  return(<div style={{width:300,background:C.surface,borderLeft:`1px solid ${dragOver?C.gold:C.border}`,display:"flex",flexDirection:"column",flexShrink:0,overflow:"hidden",transition:"border-color 0.15s"}}
    onDragOver={e=>{e.preventDefault();setDragOver(true)}}onDragLeave={()=>setDragOver(false)}onDrop={onDrop}>
    {editTask&&<TaskEditModal task={editTask}onSave={save}onDelete={del}onClose={()=>setEditTask(null)}/>}
    <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div><div style={{fontSize:9,color:C.textMut,textTransform:"uppercase",letterSpacing:"1px"}}>{day.label}</div><div style={{fontSize:17,fontWeight:300,color:day.isToday?C.gold:C.text}}>{day.num} {day.month}</div></div>
      <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{textAlign:"right"}}><div style={{fontSize:18,fontWeight:200,color:C.text}}>{pt}<span style={{fontSize:10,color:C.textSec}}>%</span></div><div style={{fontSize:9,color:C.textMut}}>{dn}/{dt.length}</div></div>
        <button onClick={onClose}style={{border:"none",background:"none",color:C.textMut,cursor:"pointer",padding:0,display:"flex"}}><X size={15}/></button></div></div>
    <div style={{height:2,background:C.border}}><div style={{height:"100%",background:dragOver?C.gold:C.gold,width:`${pt}%`,transition:"width 0.5s"}}/></div>
    <div style={{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:10}}>
      {dt.length===0&&!sa&&<div style={{fontSize:11,color:dragOver?C.gold:C.textMut,fontStyle:"italic",textAlign:"center",marginTop:16}}>{dragOver?"Drop task here…":"No tasks — add one below."}</div>}
      {Object.entries(gr).map(([pri,items])=>items.length>0&&(<div key={pri}><div style={{fontSize:9,color:PRIORITY[pri].color,textTransform:"uppercase",letterSpacing:"1px",fontWeight:600,marginBottom:5}}>{PRIORITY[pri].label}</div>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>{items.map(t=><DraggableTaskRow key={t.id}task={t}onToggle={tog}onDelete={del}onEdit={setEditTask}onDragStart={onDS}/>)}</div></div>))}
      {doneT.length>0&&(<div><div style={{fontSize:9,color:C.green,textTransform:"uppercase",letterSpacing:"1px",fontWeight:600,marginBottom:5}}>Done ({doneT.length})</div>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>{doneT.map(t=><DraggableTaskRow key={t.id}task={t}onToggle={tog}onDelete={del}onEdit={setEditTask}onDragStart={onDS}/>)}</div></div>)}
      {sa?(<div style={{background:C.elevated,border:`1px solid ${C.borderHi}`,borderRadius:8,padding:12,display:"flex",flexDirection:"column",gap:8}}>
        <input value={nt}onChange={e=>setNt(e.target.value)}onKeyDown={e=>e.key==="Enter"&&add()}autoFocus placeholder="Task title..."style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:6,padding:"7px 10px",fontSize:12,color:C.text,outline:"none",fontFamily:"inherit"}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          <div><div style={{fontSize:8,color:C.textMut,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.8px"}}>Priority</div>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>{["CRITICAL","HIGH","NORMAL"].map(p=><button key={p}onClick={()=>setNp(p)}style={{padding:"3px 7px",borderRadius:5,fontSize:9,cursor:"pointer",fontWeight:600,textAlign:"left",border:`1px solid ${np===p?PRIORITY[p].color:C.border}`,background:np===p?PRIORITY[p].color+"18":"transparent",color:np===p?PRIORITY[p].color:C.textMut,fontFamily:"inherit"}}>{PRIORITY[p].label}</button>)}</div></div>
          <div><div style={{fontSize:8,color:C.textMut,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.8px"}}>Category</div>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>{Object.entries(CATS).slice(0,5).map(([k,v])=><button key={k}onClick={()=>setNc(k)}style={{padding:"3px 7px",borderRadius:5,fontSize:9,cursor:"pointer",textAlign:"left",border:`1px solid ${nc===k?v.color:C.border}`,background:nc===k?v.color+"18":"transparent",color:nc===k?v.color:C.textMut,fontFamily:"inherit"}}>{v.label}</button>)}</div></div></div>
        <div><div style={{fontSize:8,color:C.textMut,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.8px"}}>Due Date</div>
          <input type="date"value={nd}onChange={e=>setNd(e.target.value)}style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 8px",fontSize:11,color:C.text,outline:"none",fontFamily:"inherit"}}/></div>
        <div style={{display:"flex",gap:5,justifyContent:"flex-end"}}>
          <button onClick={()=>setSa(false)}style={{border:`1px solid ${C.border}`,background:"none",borderRadius:6,color:C.textSec,cursor:"pointer",padding:"4px 8px",fontSize:10,fontFamily:"inherit"}}>Cancel</button>
          <button onClick={add}style={{border:"none",background:C.gold,borderRadius:6,color:"#07070F",cursor:"pointer",padding:"4px 10px",fontSize:10,fontWeight:600,fontFamily:"inherit"}}>Add Task</button></div>
      </div>):(<button onClick={()=>{setSa(true);setNd(day.date)}}style={{display:"flex",alignItems:"center",gap:6,background:"transparent",border:`1px dashed ${C.border}`,borderRadius:6,color:C.textMut,cursor:"pointer",padding:"7px 10px",fontSize:12,fontFamily:"inherit"}}><Plus size={12}/>Add task…</button>)}
    </div>
    <div style={{padding:"10px 14px",borderTop:`1px solid ${C.border}`}}><div style={{fontSize:9,color:C.textMut,textTransform:"uppercase",letterSpacing:"1px",marginBottom:5}}>Notes & Outcomes</div>
      <textarea value={notes||""}onChange={e=>onNoteChange(e.target.value)}rows={3}placeholder="What happened, decisions, blockers..."style={{width:"100%",background:C.elevated,border:`1px solid ${C.border}`,borderRadius:6,padding:"6px 9px",fontSize:11,color:C.text,outline:"none",resize:"none",fontFamily:"inherit"}}/></div>
  </div>)
}
