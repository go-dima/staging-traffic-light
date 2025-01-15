export enum IconState {
  GREEN = "green",
  RED = "red",
  GREY = "grey",
}

const COLORS = {
  [IconState.GREEN]: {
    icon: "#2da44e",
    badge: "#238636",
  },
  [IconState.RED]: {
    icon: "#cf222e",
    badge: "#a40e26",
  },
  [IconState.GREY]: {
    icon: "#8c959f",
    badge: "#6e7681",
  },
};

export class IconManager {
  static async setIcon(state: IconState, count: number = 0): Promise<void> {
    try {
      // Set badge text and color
      await chrome.action.setBadgeText({
        text: count > 0 ? count.toString() : "+",
      });

      await chrome.action.setBadgeBackgroundColor({
        color: COLORS[state].badge,
      });

      // console.log(`[${getFormattedTimestamp()}] Setting icon: ${state}`); // Debug log
      // const svgString = getColoredIcon(COLORS[state].icon);
      // const imageData = await convertSvgToImageData(svgString);
      // await chrome.action.setIcon({
      //   imageData,
      //   // path: { 32: `data:image/svg+xml;base64,${btoa(svgString)}` },
      // });
    } catch (error) {
      console.error("Error setting icon:", error);
      if (state !== IconState.GREY) {
        await this.setIcon(IconState.GREY);
      }
    }
  }
}
