import{useState}from"react"
import{ChevronLeft,ChevronRight}from"lucide-react"
import{C}from"../lib/constants.js"
const MN=["January","February","March","April","May","June","July","August","September","October","November","December"]
export default function YearView({tasks,goals}){
  const[year,setYear]=useState(new Date().getFullYear());const[hov,setHov]=useState(null);
  const cy=new Date().getFullYear();const cm=new Date().getMonth();
  const yT=tasks.filter(t=>new Date(t.dueDate).getFullYear()===year);const yD=yT.filter(t=>t.status==="done").length;const yP=yT.length?Math.round(yD/yT.length*100):0;
  const md=Array.from({length:12},(_,m)=>{
    const mt=tasks.filter(t=>{const d=new Date(t.dueDate);return d.getFullYear()===year&&d.getMonth()===m});
    const d=mt.filter(t=>t.status==="done").length;const p=mt.length?Math.round(d/mt.length*100):0;
    const dim=new Date(year,m+1,0).getDate();
    const act=Array.from({length:dim},(_,i)=>{const date=new Date(year,m,i+1).toISOString().split("T")[0];return tasks.filter(t=>t.dueDate===date).length});
    return{m,name:MN[m],tasks:mt,done:d,pct:p,act}
  });
  const best=md.reduce((b,m)=>m.tasks.length>0&&m.pct>(b?.pct||0)?m:b,null);
  const busy=md.reduce((b,m)=>m.tasks.length>b.tasks.length?m:b,{tasks:[],m:0});
  return(<div style={{flex:1,overflowY:"auto",padding:24,display:"flex",flexDirection:"column",gap:18}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div><h2 style={{fontSize:20,fontWeight:400,color:C.text,margin:0}}>Year at a Glance</h2>
        <p style={{fontSize:12,color:C.textSec,margin:"2px 0 0"}}>{yT.length} tasks · {yP}% complete</p></div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <button onClick={()=>setYear(p=>p-1)}style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={15}/></button>
        <span style={{fontSize:20,fontWeight:200,color:year===cy?C.gold:C.text,minWidth:48,textAlign:"center"}}>{year}</span>
        <button onClick={()=>setYear(p=>p+1)}style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.border}`,background:"transparent",color:C.textSec,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronRight size={15}/></button></div></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
      {[{l:"Total tasks",v:yT.length,c:C.text},{l:"Completed",v:yD,c:C.green},{l:"Pending",v:yT.length-yD,c:C.orange},{l:"Rate",v:`${yP}%`,c:C.gold}].map(s=><div key={s.l}style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px"}}><div style={{fontSize:20,fontWeight:200,color:s.c}}>{s.v}</div><div style={{fontSize:9,color:C.textMut,marginTop:2}}>{s.l}</div></div>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
      {md.map(({m,name,tasks:mt,done,pct,act})=>{
        const isCur=year===cy&&m===cm;const isFut=year>cy||(year===cy&&m>cm);
        return(<div key={m}onMouseEnter={()=>setHov(m)}onMouseLeave={()=>setHov(null)}style={{background:isCur?C.goldGlow:C.card,border:`1px solid ${isCur?C.gold+"50":hov===m?C.borderHi:C.border}`,borderRadius:11,padding:12,transition:"border-color 0.15s",opacity:isFut?0.45:1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div><div style={{fontSize:12,fontWeight:500,color:isCur?C.gold:C.text}}>{name}</div><div style={{fontSize:9,color:C.textMut,marginTop:1}}>{mt.length} tasks</div></div>
            <div style={{fontSize:15,fontWeight:200,color:pct>=80?C.green:pct>=50?C.gold:C.textSec}}>{mt.length>0?`${pct}%`:"—"}</div></div>
          <div style={{display:"flex",gap:1.5,flexWrap:"wrap",marginBottom:8}}>
            {act.slice(0,31).map((count,i)=><div key={i}style={{width:6,height:6,borderRadius:1.5,background:count===0?C.border:count>=3?C.gold:count>=2?C.gold+"70":C.gold+"40"}}/>)}</div>
          <div style={{height:2,background:C.border,borderRadius:1}}><div style={{height:"100%",borderRadius:1,background:pct>=80?C.green:C.gold,width:`${pct}%`,transition:"width 0.8s"}}/></div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:7,fontSize:9,color:C.textMut}}><span>{done} done</span><span>{mt.length-done} left</span></div>
        </div>)})}
    </div>
    {yT.length>0&&<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16}}>
      <div style={{fontSize:9,color:C.textMut,textTransform:"uppercase",letterSpacing:"1px",marginBottom:12}}>Year Insights</div>
      <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
        {best&&<div><div style={{fontSize:10,color:C.textSec}}>Best completion</div><div style={{fontSize:13,color:C.green,fontWeight:500}}>{best.name} · {best.pct}%</div></div>}
        {busy.tasks.length>0&&<div><div style={{fontSize:10,color:C.textSec}}>Most active</div><div style={{fontSize:13,color:C.gold,fontWeight:500}}>{MN[busy.m]} · {busy.tasks.length} tasks</div></div>}
        <div><div style={{fontSize:10,color:C.textSec}}>Goals tracked</div><div style={{fontSize:13,color:C.blue,fontWeight:500}}>{goals.length} active</div></div>
        <div><div style={{fontSize:10,color:C.textSec}}>Avg/month</div><div style={{fontSize:13,color:C.text,fontWeight:500}}>{Math.round(yT.length/12)} tasks</div></div>
      </div></div>}
  </div>)
}