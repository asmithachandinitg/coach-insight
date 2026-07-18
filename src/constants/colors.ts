export const CHART_COLORS = {
    primary: "#8B5CF6",
    primaryDark: "#7C3AED",
    primaryDarker: "#6D28D9",
    primaryLight: "#C4B5FD",
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#3B82F6",
    pink: "#EC4899",
};

export const GOAL_COLORS: Record<string, string> = {
    "Weight Loss": CHART_COLORS.primary,
    "Muscle Gain": CHART_COLORS.pink,
    Fitness: CHART_COLORS.info,
    Competition: CHART_COLORS.success,
};

export const STATUS_COLORS: Record<string, string> = {
    completed: CHART_COLORS.success,
    partial: CHART_COLORS.warning,
    missed: CHART_COLORS.danger,
};
