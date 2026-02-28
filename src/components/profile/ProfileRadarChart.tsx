import { motion } from 'framer-motion';

import { cn } from '../../lib/cnUtils';
import {
  type RadarMetric,
  getRadarPoint,
  getRadarPointsString,
  RADAR_LEVELS,
  RADAR_SIZE,
} from '../../lib/profile/profile-stats';

type ProfileRadarChartProps = {
  metrics: RadarMetric[];
  className?: string;
};

const RADAR_CENTER = RADAR_SIZE / 2;

const ProfileRadarChart = ({ metrics, className }: ProfileRadarChartProps) => {
  if (metrics.length === 0) {
    return (
      <div
        className={cn(
          'flex h-72 w-full items-center justify-center rounded-xl border border-border/80 bg-muted/20 text-sm text-muted-foreground',
          className,
        )}
      >
        No radar data available yet.
      </div>
    );
  }

  const dataPolygonPoints = getRadarPointsString(
    metrics,
    (metric) => metric.score,
  );

  return (
    <motion.svg
      viewBox={`0 0 ${RADAR_SIZE} ${RADAR_SIZE}`}
      className={cn('h-[20rem] w-full max-w-[24rem]', className)}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      role="img"
      aria-label="Radar chart of profile capabilities"
    >
      {RADAR_LEVELS.map((level) => (
        <polygon
          key={`radar-level-${level}`}
          points={getRadarPointsString(metrics, () => level * 100)}
          fill="none"
          stroke="currentColor"
          className="text-foreground/20"
        />
      ))}

      {metrics.map((metric, index) => {
        const axisPoint = getRadarPoint(index, metrics.length, 100);

        return (
          <line
            key={`radar-axis-${metric.label}`}
            x1={RADAR_CENTER}
            y1={RADAR_CENTER}
            x2={axisPoint.x}
            y2={axisPoint.y}
            stroke="currentColor"
            className="text-foreground/25"
          />
        );
      })}

      <motion.polygon
        points={dataPolygonPoints}
        fill="rgba(16, 185, 129, 0.26)"
        stroke="rgba(6, 182, 212, 1)"
        strokeWidth={2}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.35 }}
      />

      {metrics.map((metric, index) => {
        const valuePoint = getRadarPoint(index, metrics.length, metric.score);
        const labelPoint = getRadarPoint(index, metrics.length, 118);

        return (
          <g key={`radar-label-${metric.label}`}>
            <circle
              cx={valuePoint.x}
              cy={valuePoint.y}
              r={4}
              fill="rgba(245, 158, 11, 1)"
            />
            <text
              x={labelPoint.x}
              y={labelPoint.y}
              fill="currentColor"
              fontSize="10"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {metric.label}
            </text>
            <text
              x={valuePoint.x}
              y={valuePoint.y - 10}
              fill="currentColor"
              fontSize="10"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {metric.score}
            </text>
          </g>
        );
      })}
    </motion.svg>
  );
};

export default ProfileRadarChart;
