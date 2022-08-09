import { Plugin } from "chart.js";

interface Comment {
  index: string;
  comment: string;
  color?: string;
}

export const CommentPlugin: Plugin = {
  id: "comments",
  // beforeDraw: function (chart: any, args: any, untypedOpts: any) {
  //   const options: Array<Comment> = untypedOpts;
  //   const ctx = chart.ctx;

  //   const area = chart.chartArea;

  //   if (
  //     chart.scales.x._gridLineItems &&
  //     chart.scales.x._gridLineItems.length >= 2 &&
  //     chart.config.type == "line"
  //   ) {
  //     const max_width =
  //       chart.scales.x._gridLineItems[1]?.x1 ??
  //       2000 - chart.scales.x._gridLineItems[0].x1;

  //     for (let { index, color, comment } of options) {
  //       const _index = chart.data.labels.findIndex((e: string) => e == index);
  //       const datapoint = chart.scales.x._gridLineItems[_index];
  //       if (datapoint !== undefined) {
  //         ctx.strokeStyle = color ?? "rgb(91, 142, 125)";
  //         ctx.fillStyle = color ?? "rgb(91, 142, 125)";
  //         ctx.lineWidth = 3;

  //         ctx.beginPath();
  //         ctx.moveTo(datapoint.x1, area.bottom);
  //         ctx.lineTo(datapoint.x1, area.top);
  //         ctx.closePath();
  //         ctx.stroke();

  //         ctx.fillStyle = "rgb(91, 142, 125)";
  //         ctx.font = "16px Nunito";
  //         const text_metrics = ctx.measureText(comment);
  //         if (text_metrics.width > max_width) {
  //           ctx.font = "12px Nunito";
  //           const text_metrics = ctx.measureText(comment);
  //           if (text_metrics.width > max_width) {
  //             comment = comment.slice(0, 10) + "...";
  //           }
  //         }

  //         const [x, y] =
  //           _index === chart.scales.x._gridLineItems.length - 1
  //             ? [datapoint.x1 - 10 - text_metrics.width, area.bottom - 150]
  //             : [datapoint.x1 + 10, area.bottom - 50];
  //         ctx.fillText(comment, x, y);
  //       }
  //     }
  //   }
  // },
  afterDraw: function (chart: any, args: any, options: any) {
    const ctx = chart.ctx;

    const area = chart.chartArea;

    if (
      chart.scales.x._gridLineItems &&
      chart.scales.x._gridLineItems.length >= 2 &&
      chart.config.type == "line"
    ) {
      const max_width =
        (chart.scales.x._gridLineItems[1]?.x1 ?? 2000) -
        chart.scales.x._gridLineItems[0].x1;

      for (let { index, comment } of options) {
        const _index = chart.data.labels.findIndex((e: string) => e == index);
        const datapoint = chart.scales.x._gridLineItems[_index];
        if (datapoint !== undefined) {
          ctx.fillStyle = "rgb(91, 142, 125)";
          ctx.strokeStyle = "rgba(91, 142, 125, 0.3)";
          ctx.lineWidth = 3;

          ctx.beginPath();
          ctx.moveTo(datapoint.x1, area.bottom);
          ctx.lineTo(datapoint.x1, area.top);
          ctx.closePath();
          ctx.stroke();
          ctx.font = "16px Nunito";
          const text_metrics = ctx.measureText(comment);
          if (text_metrics.width > max_width) {
            ctx.font = "12px Nunito";
            const text_metrics = ctx.measureText(comment);
            if (text_metrics.width > max_width) {
              comment = comment.slice(0, 10) + "...";
            }
          }

          const [x, y] =
            _index === chart.scales.x._gridLineItems.length - 1
              ? [datapoint.x1 - 10 - text_metrics.width, area.bottom - 150]
              : [datapoint.x1 + 10, area.bottom - 50];
          ctx.fillText(comment, x, y);
        }
      }
    }
  },
};
