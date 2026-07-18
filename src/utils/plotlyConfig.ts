import type { Config } from "plotly.js";

export function getPlotlyConfig(filename: string): Partial<Config> {
    return {
        responsive: true,
        displaylogo: false,
      //  displayModeBar: true,
        modeBarButtonsToRemove: [
            "lasso2d",
            "select2d",
            "hoverClosestCartesian",
            "hoverCompareCartesian",
            "toggleSpikelines",
        ],
        toImageButtonOptions: {
            format: "png",
            filename,
            height: 500,
            width: 700,
            scale: 2,
        },
    };
}
