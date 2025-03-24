// utils/tooltip.js
import TooltipLibrary from "kyeo-tip";

let tooltipInstance;

export const initTooltip = () => {
    if (!tooltipInstance) {
        tooltipInstance = new TooltipLibrary(
            {
                position: 'bottom',
                theme: 'light'
            }
        );
    }
    return tooltipInstance;
};

export default initTooltip;