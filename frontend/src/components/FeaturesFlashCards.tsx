import React from 'react';
import { motion } from 'motion/react';
import { Search, Send, PackageSearch, Handshake, ArrowRight } from 'lucide-react';

interface FeaturesFlashCardsProps {
  onSearchClick: () => void;
  onReportLostClick: () => void;
  onInventoryClick: () => void;
  onMakeADifferenceClick: () => void;
}

export const FeaturesFlashCards: React.FC<FeaturesFlashCardsProps> = ({
  onSearchClick,
  onReportLostClick,
  onInventoryClick,
  onMakeADifferenceClick
}) => {
  const cards = [
    {
      id: 'search',
      title: 'Search Items',
      subtitle: 'Find lost items near you across campus buildings',
      badge: 'Live Directory',
      icon: Search,
      actionText: 'Search Items',
      action: onSearchClick,
      gradient: 'from-[#ecf7f1] via-[#dff2e7] to-[#d0ecdb]',
      border: 'border-[#bfe3cd]',
      iconBg: 'bg-[#153931] text-[#c2eb8c]',
      textColor: 'text-[#112a24]',
      badgeBg: 'bg-[#153931]/10 text-[#153931]',
    },
    {
      id: 'lost',
      title: 'Report Lost',
      subtitle: 'Let the campus know what you lost to start recovery',
      badge: 'Instant Alert',
      icon: Send,
      actionText: 'Report Lost',
      action: onReportLostClick,
      gradient: 'from-[#fef6ea] via-[#faeed9] to-[#f4e2c6]',
      border: 'border-[#edd3af]',
      iconBg: 'bg-[#8c4b12] text-[#fed7aa]',
      textColor: 'text-[#452206]',
      badgeBg: 'bg-[#8c4b12]/10 text-[#8c4b12]',
    },
    {
      id: 'inventory',
      title: 'Campus Inventory',
      subtitle: 'Browse all reported items and posts across college buildings',
      badge: 'Public Feed',
      icon: PackageSearch,
      actionText: 'View Inventory',
      action: onInventoryClick,
      gradient: 'from-[#f2faed] via-[#e5f5dd] to-[#d3eed6]',
      border: 'border-[#c2e4bf]',
      iconBg: 'bg-[#1e4822] text-[#d4f2aa]',
      textColor: 'text-[#143318]',
      badgeBg: 'bg-[#1e4822]/10 text-[#1e4822]',
    },
    {
      id: 'community',
      title: 'About Community',
      subtitle: 'Participate in the campus volunteer item recovery network',
      badge: 'Community',
      icon: Handshake,
      actionText: 'Learn More',
      action: onMakeADifferenceClick,
      gradient: 'from-[#eef6fc] via-[#e1f0fa] to-[#d2e8f6]',
      border: 'border-[#bcdbf2]',
      iconBg: 'bg-[#1e496e] text-[#bae6fd]',
      textColor: 'text-[#0f283d]',
      badgeBg: 'bg-[#1e496e]/10 text-[#1e496e]',
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' as const }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={card.action}
            className={`relative rounded-3xl p-5 sm:p-6 bg-gradient-to-br ${card.gradient} border ${card.border} shadow-sm hover:shadow-xl transition-shadow cursor-pointer flex flex-col justify-between overflow-hidden group select-none`}
          >
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${card.badgeBg}`}>
                  {card.badge}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className={`text-lg font-extrabold font-display ${card.textColor} tracking-tight leading-snug`}>
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {card.subtitle}
                </p>
              </div>
            </div>

            <div className="pt-5 relative z-10 flex items-center justify-between">
              <span className={`text-xs font-bold ${card.textColor} flex items-center gap-1.5`}>
                <span>{card.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
