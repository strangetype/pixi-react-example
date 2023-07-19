export const iphonePositionSafeArea = (variable = '--sat-top') => +((getComputedStyle(document.documentElement).getPropertyValue(variable)).replace(/[^0-9,\s]/g, ''));
