'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Zap, Database, Filter, BrainCircuit, GitBranch, Mail, Plug, ShieldCheck, Play, Pause, Info } from 'lucide-react';
import styles from './automation-orbit.module.css';

const nodes = [
  { label:'New enquiry', icon:Zap, x:28, y:18, detail:'New enquiry received' },
  { label:'Validate', icon:Filter, x:52, y:18, detail:'Check required fields and remove duplicate requests.' },
  { label:'Database', icon:Database, x:76, y:33, detail:'Retrieve the customer record and previous activity.' },
  { label:'AI agent', icon:BrainCircuit, x:52, y:44, detail:'Interpret intent and prepare a contextual response.' },
  { label:'Knowledge', icon:Database, x:25, y:44, detail:'Ground the response in trusted business knowledge.' },
  { label:'Router', icon:GitBranch, x:52, y:68, detail:'Route the request to the right business action.' },
  { label:'CRM', icon:Plug, x:25, y:73, detail:'Update the contact and create a follow-up task.' },
  { label:'Email', icon:Mail, x:78, y:65, detail:'Send the approved response to the customer.' },
  { label:'Audit log', icon:ShieldCheck, x:52, y:89, detail:'Record the result, then listen for the next event.' },
];
const sequence = [0,1,2,3,4,3,5,6,5,7,8];
const edges = [[0,1],[1,2],[2,3],[3,4],[3,5],[5,6],[5,7],[6,8],[7,8]];
const notifications = ['New enquiry received', 'Request validated', 'Customer record loaded', 'AI agent initiated', 'Knowledge retrieved', 'Action routed', 'CRM updated', 'Response sent', 'Run recorded'];

export default function AutomationOrbit() {
  const root = useRef<HTMLDivElement>(null);
  const [step,setStep] = useState(0);
  const [running,setRunning] = useState(false);
  const [visible,setVisible] = useState(false);
  const [foreground,setForeground] = useState(true);
  const reducedMotion = useReducedMotion();
  const current = sequence[step], previous = step ? sequence[step-1] : 8;
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if(root.current) observer.observe(root.current);
    const update = () => setForeground(!document.hidden);
    update(); document.addEventListener('visibilitychange',update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange',update); };
  },[]);
  useEffect(() => {
    if(!running || !visible || !foreground) return;
    const timer = window.setInterval(() => setStep(value => (value+1)%sequence.length),2800);
    return () => window.clearInterval(timer);
  },[running,visible,foreground]);
  return <div ref={root} className={styles.surface} onPointerEnter={e => { if(e.pointerType==='mouse') setRunning(true); }}>
    <header className={styles.header}><span>CX / ENQUIRY AUTOMATION</span><button type="button" aria-label={running?'Pause automation':'Run automation'} title={running?'Pause automation':'Run automation'} onClick={() => setRunning(v=>!v)}>{running?<Pause size={15}/>:<Play size={15}/>}</button></header>
    <div className={styles.toastSlot}><AnimatePresence initial={false} mode="wait">
      <motion.div key={`${step}-${running}`} className={styles.toast}
        initial={{opacity:0,y:reducedMotion?0:-50}} animate={{opacity:1,y:0}}
        exit={{opacity:0,y:reducedMotion?0:-50}} transition={{duration:reducedMotion?0:0.4,ease:'easeInOut'}}>
        <Info size={20} aria-hidden="true"/><p>{running?notifications[current]:'Automation ready'}</p>
      </motion.div>
    </AnimatePresence></div>
    <div className={styles.diagram}><svg className={styles.paths} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {edges.map(([a,b]) => {
        const start=nodes[a],end=nodes[b];
        const active=running && ((previous===a && current===b)||(previous===b && current===a));
        const d=`M${start.x} ${start.y} L${end.x} ${end.y}`;
        return <g key={`${a}-${b}`}><path d={d} className={styles.track}/><path key={step} d={d} className={styles.signal} data-active={active} data-reverse={previous===b}/></g>;
      })}</svg>
      {nodes.map(({label,icon:Icon,x,y,detail},i)=><button type="button" key={label} className={styles.node} style={{left:`${x}%`,top:`${y}%`}} data-active={current===i} aria-label={label} aria-describedby={`automation-node-${i}`} aria-pressed={current===i} onClick={()=>{setStep(sequence.indexOf(i));setRunning(true);}}><Icon size={23} strokeWidth={1.5}/><span>{label}</span><span id={`automation-node-${i}`} role="tooltip" className={styles.tooltip} data-side={x>65?'right':x<35?'left':'center'}>{detail}</span></button>)}
    </div>
    <div className={styles.detail}>
      <span>{running?'RUNNING':'READY'} / {String(step+1).padStart(2,'0')}</span>
    </div>
  </div>;
}
