'use client';

import { Activity, ArrowDownRight, Clock, ShieldCheck } from 'lucide-react';
import { GlobeCdn } from './cloud-globe';
import { PerformanceTrackerCard, type PerformanceData } from './performance-tracker-card';
import styles from './service-operations.module.css';

export function CloudInfrastructure() {
  return <div className={styles.cloud}>
    <header className={styles.header}><span>CX / CLOUD NETWORK</span><span>DEMO</span></header>
    <div className={styles.globe}><GlobeCdn /></div>
    <footer className={styles.cloudFooter}><span>DEPLOY. CONNECT. MAINTAIN.</span><span>10 REGIONS</span></footer>
  </div>;
}

const report: PerformanceData = {
  timeSlept: '142ms',
  quality: 99.98,
  changePercent: 18,
  startTime: '00:00',
  endTime: '23:59',
  stages: { Incident: 'Resolved', Recovery: 'Verified', Healthy: 'Operational', Maintenance: 'Complete' },
  graphData: [
    { stage: 'Healthy', duration: 2, height: 58 },
    { stage: 'Maintenance', duration: 1, height: 30 },
    { stage: 'Incident', duration: .4, height: 74 },
    { stage: 'Recovery', duration: 1.5, height: 48 },
    { stage: 'Healthy', duration: 3, height: 64 },
    { stage: 'Recovery', duration: 2, height: 54 },
    { stage: 'Healthy', duration: 4, height: 60 },
    { stage: 'Maintenance', duration: 1.6, height: 34 },
    { stage: 'Healthy', duration: 2, height: 58 },
    { stage: 'Recovery', duration: 1, height: 49 },
    { stage: 'Incident', duration: .4, height: 80 },
    { stage: 'Healthy', duration: 1, height: 59 },
  ],
};

export function SystemPerformance() {
  return <div className={styles.performance}>
    <header className={styles.header}><span>CX / OPERATIONS</span><span>DEMO REPORT</span></header>
    <div className="flex flex-1 items-center justify-center px-4 py-8">
      <PerformanceTrackerCard data={report} icons={{
        sleep: <Activity size={22} />,
        moon: <Clock size={14} />,
        sun: <ShieldCheck size={14} />,
        arrowUp: <ArrowDownRight size={18} />,
      }} />
    </div>
    <div className={styles.footer}>MONITORING / MAINTENANCE / CONTINUOUS IMPROVEMENT</div>
  </div>;
}
