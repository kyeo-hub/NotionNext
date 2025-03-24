import { useEffect } from 'react'
import initTooltip from '@/lib/tip';

/**
 * Kyeo-tip
 * @returns
 */
export default function Tip() {
    useEffect(() => {
        // 初始化Tooltip
        const tooltip = initTooltip();
        return () => {
            tooltip.destroy();
          };
      }, []);
}

