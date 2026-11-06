import React, { useState } from 'react';
import { 
  Zap, 
  Heart, 
  TrendingUp, 
  Activity, 
  Moon, 
  ChevronDown, 
  MoreVertical,
  Clock,
  ShieldCheck,
  Building,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface BentoGridProps {
  onOpenReport: (type: 'lost' | 'found') => void;
  onBrowseClick: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onOpenReport, onBrowseClick }) => {
  const [chartPeriod, setChartPeriod] = useState<'Monthly' | 'Weekly' | 'Semester'>('Monthly');
  const [activeBar, setActiveBar] = useState<number>(3); // Sept highlighted

  const months = [
    { label: 'Jun', height: 42, activeHeight: 28 },
    { label: 'Jul', height: 58, activeHeight: 40 },
    { label: 'Aug', height: 48, activeHeight: 32 },
    { label: 'Sept', height: 92, activeHeight: 70, isPeak: true },
    { label: 'Oct', height: 50, activeHeight: 35 },
    { label: 'Nov', height: 62, activeHeight: 45 },
    { label: 'Dec', height: 55, activeHeight: 38 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      
      {/* ========================================================
          CARD 1: LEFT TALL CARD (Energy Used / Category Breakdown style)
         ======================================================== */}
      <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#e2ebd9] shadow-sm flex flex-col justify-between space-y-6">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#eef7ec] text-[#153931] flex items-center justify-center">
                <Zap className="w-4 h-4 fill-current text-[#153931]" />
              </div>
              <h3 className="text-base font-bold text-[#142d27] font-display">
                Items Distribution
              </h3>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1" aria-label="Options">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#112a24] font-display tabular-nums">
                4,3k
              </span>
              <span className="text-xs text-[#5f7a71] font-medium">reports total</span>
              <span className="ml-1 text-[11px] font-bold text-[#1e5c4d] bg-[#dcf3e2] px-2 py-0.5 rounded-full">
                +8% this term
              </span>
            </div>
          </div>

          {/* Overlapping Circles Cluster Graphic (Matching Screenshot exactly!) */}
          <div className="relative h-48 w-full flex items-center justify-center my-4 select-none">
            
            {/* Left Circle: 2,6k Found (Sage/Lavender Gradient) */}
            <div className="absolute left-6 sm:left-12 top-4 w-32 h-32 rounded-full bg-gradient-to-br from-[#c7dcc9] to-[#b3ceb6] text-[#153931] flex flex-col items-center justify-center shadow-md shadow-[#153931]/10 hover:scale-105 transition-transform cursor-pointer z-10">
              <span className="text-2xl font-extrabold font-display leading-tight">2,6k</span>
              <span className="text-[11px] font-semibold text-[#255246]">Found</span>
            </div>

            {/* Right Circle: 1,2k Lost (Dark Forest Green) */}
            <div className="absolute right-8 sm:right-14 top-8 w-28 h-28 rounded-full bg-[#153931] text-white flex flex-col items-center justify-center shadow-lg shadow-[#153931]/20 hover:scale-105 transition-transform cursor-pointer z-20">
              <span className="text-xl font-extrabold font-display leading-tight">1,2k</span>
              <span className="text-[11px] font-medium text-[#9fc7bc]">Lost</span>
            </div>

            {/* Bottom Intersecting Circle: 500 Claimed (Vibrant Mint/Lime) */}
            <div className="absolute left-24 sm:left-32 bottom-1 w-22 h-22 rounded-full bg-gradient-to-tr from-[#d4f2aa] to-[#c2eb8c] text-[#1a441e] flex flex-col items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer z-30 border-2 border-white">
              <span className="text-lg font-extrabold font-display leading-tight">500</span>
              <span className="text-[10px] font-bold text-[#235828]">Reunited</span>
            </div>

          </div>
        </div>

        {/* Bottom Horizontal Progress Bars (Matching Screenshot) */}
        <div className="space-y-3 pt-2 border-t border-[#f0f5ec]">
          
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-[#153931] text-sm tabular-nums">45%</span>
              <div className="flex items-center gap-1.5 text-xs text-[#5f7a71]">
                <span>Electronics &amp; Laptops</span>
                <span className="w-2 h-2 rounded-full bg-[#b8cebc]" />
              </div>
            </div>
            <div className="h-2 w-full bg-[#f1f6ed] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#98c59f] to-[#b8cebc] rounded-full w-[45%]" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-[#153931] text-sm tabular-nums">30%</span>
              <div className="flex items-center gap-1.5 text-xs text-[#5f7a71]">
                <span>Wallets, Bags &amp; Keys</span>
                <span className="w-2 h-2 rounded-full bg-[#153931]" />
              </div>
            </div>
            <div className="h-2 w-full bg-[#f1f6ed] rounded-full overflow-hidden">
              <div className="h-full bg-[#153931] rounded-full w-[30%]" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-[#153931] text-sm tabular-nums">25%</span>
              <div className="flex items-center gap-1.5 text-xs text-[#5f7a71]">
                <span>Supplies &amp; Accessories</span>
                <span className="w-2 h-2 rounded-full bg-[#c2eb8c]" />
              </div>
            </div>
            <div className="h-2 w-full bg-[#f1f6ed] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#c2eb8c] to-[#aee46f] rounded-full w-[25%]" />
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================
          RIGHT COLUMN: BENTO CARDS 2, 3, 4, 5
         ======================================================== */}
      <div className="lg:col-span-7 space-y-5">
        
        {/* Top Row: Small Card 2 + Small Card 3 + Medium Card 4 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Middle Stack: 2 Small Metric Cards */}
          <div className="md:col-span-5 space-y-5 flex flex-col justify-between">
            
            {/* Card 2: Average Turnaround Time (Heart Rate style) */}
            <div className="bg-white rounded-3xl p-5 border border-[#e2ebd9] shadow-sm flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#eef7ec] text-[#153931] flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-[#153931]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#142d27] font-display">
                    Avg Return Time
                  </h4>
                </div>
                <button className="text-slate-400 hover:text-slate-600" aria-label="More">
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#112a24] font-display tabular-nums">
                    4.2
                  </span>
                  <span className="text-xs text-[#637d74] font-semibold">hrs</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Peak:</span>
                  <span className="text-xs font-bold text-[#153931]">7.8 hrs</span>
                </div>
              </div>
            </div>

            {/* Card 3: Campus Desks (Activity style) */}
            <div className="bg-white rounded-3xl p-5 border border-[#e2ebd9] shadow-sm flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#eef7ec] text-[#153931] flex items-center justify-center">
                    <Building className="w-3.5 h-3.5 text-[#153931]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#142d27] font-display">
                    Campus Desks
                  </h4>
                </div>
                <button className="text-slate-400 hover:text-slate-600" aria-label="More">
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#112a24] font-display tabular-nums">
                    18
                  </span>
                  <span className="text-xs text-[#637d74] font-semibold">Hubs</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Open:</span>
                  <span className="text-xs font-bold text-emerald-700">14 Active</span>
                </div>
              </div>
            </div>

          </div>

          {/* Card 4: Recovery Success Rate & Dot Matrix (Wellness Index style) */}
          <div className="md:col-span-7 bg-white rounded-3xl p-5 border border-[#e2ebd9] shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#eef7ec] text-[#153931] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#153931]" />
                </div>
                <h4 className="text-xs font-bold text-[#142d27] font-display">
                  Recovery Success Rate
                </h4>
              </div>
              <button className="text-slate-400 hover:text-slate-600" aria-label="More">
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#112a24] font-display tabular-nums">
                  94.2
                </span>
                <span className="text-base font-bold text-[#153931]">%</span>
                <span className="ml-1 text-[10px] font-bold text-[#1e5c4d] bg-[#dcf3e2] px-2 py-0.5 rounded-full">
                  +10% verified
                </span>
              </div>
            </div>

            {/* Dot Matrix Heatmap Grid (Matching Screenshot!) */}
            <div className="pt-2 pb-1">
              <div className="grid grid-cols-12 gap-1.5 h-20 items-end">
                {[
                  [2, 3, 2],
                  [3, 4, 3],
                  [1, 2, 3],
                  [4, 3, 4],
                  [2, 1, 2],
                  [3, 2, 3],
                  [1, 4, 3],
                  [4, 3, 2],
                  [5, 4, 3],
                  [3, 2, 4],
                  [4, 5, 4],
                  [5, 4, 5]
                ].map((col, cIdx) => (
                  <div key={cIdx} className="flex flex-col gap-1 items-center justify-end h-full">
                    {col.map((intensity, rIdx) => {
                      const bg =
                        intensity >= 5
                          ? 'bg-[#153931]'
                          : intensity === 4
                          ? 'bg-[#407c6f]'
                          : intensity === 3
                          ? 'bg-[#8abfae]'
                          : 'bg-[#cfe7dc]';
                      return (
                        <span
                          key={rIdx}
                          className={`w-2.5 h-2.5 rounded-full transition-transform hover:scale-125 ${bg}`}
                          title={`Zone Activity: Level ${intensity}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 font-medium">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </div>

          </div>

        </div>

        {/* Card 5: Bottom Wide Dark Bento Card (Sleep Analysis / Bar Chart style) */}
        <div className="bg-[#112923] text-white rounded-3xl p-6 border border-[#1d4239] shadow-lg flex flex-col justify-between space-y-5">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                <Moon className="w-4 h-4 text-[#a7dfbe]" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Monthly Recovery Analytics
              </h3>
            </div>

            {/* Timeframe Dropdown */}
            <div className="relative">
              <button
                onClick={() => setChartPeriod(chartPeriod === 'Monthly' ? 'Weekly' : 'Monthly')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white/90 border border-white/10 transition-colors"
              >
                <span>{chartPeriod}</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/60" />
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-8 text-xs text-white/70">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-4 rounded-full bg-[#c2eb8c]" />
                <span className="text-2xl font-extrabold text-white font-display tabular-nums">
                  92%
                </span>
              </div>
              <span className="text-[11px] text-white/60">Match Accuracy</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-4 rounded-full bg-[#a3cbb5]" />
                <span className="text-2xl font-extrabold text-white font-display tabular-nums">
                  7h 15m
                </span>
              </div>
              <span className="text-[11px] text-white/60">Average Claim Speed</span>
            </div>
          </div>

          {/* Monthly Bar Chart (Matching Screenshot with active September peak!) */}
          <div className="pt-2">
            <div className="flex items-end justify-between h-36 gap-2 sm:gap-4 px-2">
              {months.map((m, idx) => {
                const isSelected = activeBar === idx;
                return (
                  <div
                    key={m.label}
                    onClick={() => setActiveBar(idx)}
                    className="flex-1 flex flex-col items-center gap-2 cursor-pointer group"
                  >
                    {/* Bar Columns Container */}
                    <div className="w-full max-w-[36px] flex items-end justify-center gap-1 h-28">
                      {/* Secondary Bar */}
                      <div
                        style={{ height: `${m.height}%` }}
                        className={`w-3.5 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#c2eb8c] shadow-lg shadow-[#c2eb8c]/30'
                            : 'bg-white/15 group-hover:bg-white/25'
                        }`}
                      />
                      {/* Tertiary Bar */}
                      <div
                        style={{ height: `${m.activeHeight}%` }}
                        className={`w-3.5 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#a3cbb5] shadow-lg shadow-[#a3cbb5]/30'
                            : 'bg-white/10 group-hover:bg-white/20'
                        }`}
                      />
                    </div>

                    {/* Month Label */}
                    <span
                      className={`text-xs font-semibold transition-colors flex items-center gap-0.5 ${
                        isSelected ? 'text-[#c2eb8c]' : 'text-white/50 group-hover:text-white/80'
                      }`}
                    >
                      {m.label}
                      {isSelected && <span className="text-[10px]">↗</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
