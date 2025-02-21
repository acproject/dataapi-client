import type React from 'react';
import { useStore } from '@/store/useStore';

interface DualCardIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<DualCardIconProps> = ({ 
  className = '', 
  width = 400, 
  height = 400 
}) => {
  const { isDarkMode } = useStore();
  const strokeColor = isDarkMode ? "#FFFFFF" : "#000000";
  const textColor = isDarkMode ? "#FFFFFF" : "#494848";
   const frontCardFill = isDarkMode ? "rgb(4,8,15)" : "#FFFFFF";

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 背景卡片 */}
      <g filter="url(#shadow)">
        <rect
          x="150"
          y="100"
          width="170"
          height="250"
          rx="20"
          fill="transparent"
          stroke={strokeColor}
          strokeWidth="15"
        />

        {/* 模拟内容线条 */}
        <line x1="170" y1="180" x2="300" y2="180" stroke={strokeColor} strokeWidth="10" />
        <line x1="170" y1="210" x2="300" y2="210" stroke={strokeColor} strokeWidth="10" />
        <line x1="170" y1="240" x2="300" y2="240" stroke={strokeColor} strokeWidth="10" />
      </g>

      {/* 前景卡片 */}
      <g filter="url(#shadow)">
        <rect
          x="80"
          y="50"
          width="170"
          height="300"
          rx="20"
          fill={frontCardFill}
          stroke={strokeColor}
          strokeWidth="15"
        />
        <text x="100" y="90" fill={textColor} fontSize="24" fontWeight="bold">
          Data API
        </text>
        {/* 模拟内容线条 */}
        <line x1="100" y1="130" x2="230" y2="130" stroke={strokeColor} strokeWidth="15" />
        <line x1="100" y1="160" x2="230" y2="160" stroke={strokeColor} strokeWidth="15" />
        <line x1="100" y1="190" x2="230" y2="190" stroke={strokeColor} strokeWidth="15" />
        <line x1="100" y1="220" x2="230" y2="220" stroke={strokeColor} strokeWidth="15" />
        <line x1="100" y1="250" x2="230" y2="250" stroke={strokeColor} strokeWidth="15" />
        <line x1="100" y1="280" x2="230" y2="280" stroke={strokeColor} strokeWidth="15" />
        <line x1="180" y1="320" x2="230" y2="320" stroke={strokeColor} strokeWidth="17" />
      </g>

      {/* 阴影滤镜定义 */}
      <defs>
        <filter
          id="shadow"
          x="-10"
          y="-10"
          width="420"
          height="420"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="2"
            dy="2"
            stdDeviation="3"
            floodOpacity="0.3"
            floodColor="#000000"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Logo;