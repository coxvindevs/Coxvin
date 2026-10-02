'use client';

import { useEffect, useRef, useState } from 'react';
import { DraggableWidgetGrid, type WidgetItem } from './draggable-widget-grid';
import styles from './business-systems-grid.module.css';

const widgets: WidgetItem[] = [
  { id: 'runs', size: 'wide', label: 'Runs today' },
  { id: 'status', size: 'sm', label: 'System status' },
  { id: 'cost', size: 'sm', label: 'Total cost' },
  { id: 'errors', size: 'sm', label: 'Errors' },
  { id: 'traces', size: 'wide', label: 'Recent traces' },
  { id: 'eval', size: 'sm', label: 'Eval score' },
  { id: 'tools', size: 'wide', label: 'Tool calls' },
  { id: 'tokens', size: 'wide', label: 'Token usage' },
];

const activityHistory = [
  [0,0,1,0,0,0,0,1,2,0,0,3,4,2,0,0,1,0,2,1,0,0,0,0],
  [0,0,0,0,1,0,0,0,0,1,0,0,0,2,1,0,0,0,3,1,0,0,0,0],
  [1,0,0,0,0,0,1,2,4,3,1,0,0,2,4,4,2,1,0,3,2,0,0,1],
  [0,1,0,0,0,1,0,3,2,4,4,1,0,0,1,3,4,2,0,0,1,2,0,0],
  [0,0,0,1,0,0,2,1,4,2,0,0,3,4,1,0,2,3,1,0,0,0,0,0],
];
const blues = ['#17263d','#1d3b65','#245c9f','#3287e6','#83bdff'];

function WidgetContent({ item, tick }: { item: WidgetItem; tick: number }) {
  const step = Math.floor(tick / (3 + widgets.findIndex(widget => widget.id === item.id) % 4));
  const calls = [421,275,201,145].map((value,i)=>value + step*(i+2));
  const errorCounts = [9+step%3,7,5+step%2];
  return <div className={styles.widget}>
    <div className={styles.widgetHeader}><span>{item.label}</span><span className={item.id==='traces'?styles.positive:''}>{item.id==='traces'?'● Live':item.id==='status'?'30d':item.id==='cost'?'↑ 8% MoM':item.id==='runs'?'↑ 12% vs yesterday':'24h'}</span></div>
    {item.id==='runs' && <><div className={styles.metric}>{(1320+step*7).toLocaleString('en-US')}</div><div className={styles.heatmap} aria-label="Workflow activity over five days">{['Sat','Sun','Mon','Tue','Today'].map((day,row)=><div className={styles.heatRow} key={day}><span>{day}</span>{activityHistory[row].map((value,col)=><i key={col} style={{background:blues[row===4&&col===18?Math.min(4,1+step%4):value]}} />)}</div>)}</div><div className={styles.axis}><span>12AM</span><span>6AM</span><span>12PM</span><span>6PM</span></div></>}
    {item.id==='status' && <><div className={styles.metric}>99.98<small>% uptime</small></div><p className={styles.status}><i />All systems operational</p><div className={styles.uptime}>{Array.from({length:30},(_,i)=><i key={i} data-warning={i===8||i===25} />)}</div></>}
    {item.id==='cost' && <><div className={styles.metric}>${184+step}<small>MTD</small></div><div className={styles.bars}>{Array.from({length:14},(_,i)=><i key={i} style={{height:`${35+Math.round((Math.sin(i*2.4+step*.4)+1)*16)}%`}} />)}</div></>}
    {item.id==='errors' && <><div className={styles.metric}>{errorCounts.reduce((a,b)=>a+b,0)}<small>1.8% rate</small></div><div className={styles.rows}>{['timeout','rate-limit','tool-error'].map((label,i)=><div key={label}><span><i className={i===0?styles.red:styles.gray} />{label}</span><span>{errorCounts[i]}</span></div>)}</div></>}
    {item.id==='traces' && <><div className={styles.metric}>{(1.84+Math.sin(step)*.3).toFixed(2)}s<small>p50</small></div><div className={styles.rows}>{['research_agent','support_agent','planner','reviewer'].map((agent,i)=><div key={agent} className={styles.trace}><span className={styles.traceId}><i />tr_{(30000+step*17+i*591).toString(16)}</span><span>{agent}</span><b><em style={{width:`${35+(i*17+step*9)%55}%`}} /></b><span>{(0.54+(i*.83+step*.12)%3).toFixed(2)}s</span></div>)}</div></>}
    {item.id==='eval' && <><div className={styles.metric}>{(.91+Math.sin(step)*.01).toFixed(2)}<small className={styles.positive}>↑ 0.03</small></div><div className={styles.rows}>{['Faithfulness','Relevancy','Correctness'].map((label,i)=><div key={label}><span>{label}</span><span>{[.94,.89,.91][i].toFixed(2)}</span></div>)}</div></>}
    {item.id==='tools' && <><div className={styles.metric}>{calls.reduce((a,b)=>a+b,0).toLocaleString('en-US')}</div><div className={styles.rows}>{['web_search','code_interpreter','sql_query','retrieve_docs'].map((name,i)=><div className={styles.tool} key={name}><span>{name}</span><b><em style={{width:`${calls[i]/500*100}%`}} /></b><span>{calls[i]}</span></div>)}</div></>}
    {item.id==='tokens' && <><div className={styles.metric}>{(12.3+step*.1).toFixed(1)}M<small>tokens</small></div><div className={styles.tokenLegend}>{['Primary model','Fast model','Reasoning model','Embeddings'].map((name,i)=><div key={name}><span><i style={{background:blues[4-i]}} />{name}</span><span>{[52,27,13,8][i]}%</span></div>)}</div><div className={styles.tokenBar}>{[52,27,13,8].map((value,i)=><i key={i} style={{flex:value,background:blues[4-i]}} />)}</div></>}
  </div>;
}

export default function BusinessSystemsGrid({ active }: { active: boolean }) {
  const [announcement, setAnnouncement] = useState('');
  const [tick, setTick] = useState(0);
  const surface = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active) return;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    if (surface.current) observer.observe(surface.current);
    const timer = window.setInterval(() => {
      if (visible && !document.hidden) setTick(value => value + 1);
    }, 2000);
    return () => { observer.disconnect(); window.clearInterval(timer); };
  }, [active]);
  return <div ref={surface} className={styles.surface} hidden={!active}>
    <div className={styles.header}><span className={styles.brand}>CX <span>OPERATIONS</span></span><span className={styles.demo}><i /> LIVE DEMO</span></div>
    <DraggableWidgetGrid items={widgets} maxColumns={4} cellSize={140} gap={10} radius={8}
      renderItem={(item) => <WidgetContent item={item} tick={tick} />}
      onChange={(items) => setAnnouncement(`Layout updated: ${items.map(item => item.label).join(', ')}.`)} />
    <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
  </div>;
}
