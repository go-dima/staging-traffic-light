export enum IconState {
  GREEN = "green",
  RED = "red",
  GREY = "grey",
}

const COLORS = {
  [IconState.GREEN]: {
    icon: "%232da44e",
    badge: "#238636",
  },
  [IconState.RED]: {
    icon: "%23cf222e",
    badge: "#a40e26",
  },
  [IconState.GREY]: {
    icon: "%238c959f",
    badge: "#6e7681",
  },
};
//
// const ICONS = {
//   [IconState.GREEN]: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="${
//     COLORS[IconState.GREEN].icon
//   }"/></svg>`,
//   [IconState.RED]: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="${
//     COLORS[IconState.RED].icon
//   }"/></svg>`,
//   [IconState.GREY]: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="${
//     COLORS[IconState.GREY].icon
//   }"/></svg>`,
// };

export class IconManager {
  static async setIcon(state: IconState, count: number = 0): Promise<void> {
    try {
      // await chrome.action.setIcon({
      //   imageData: await this.createImageData(ICONS[state]),
      // });

      // Set badge text and color
      await chrome.action.setBadgeText({
        text: count > 0 ? count.toString() : "",
      });

      await chrome.action.setBadgeBackgroundColor({
        color: COLORS[state].badge,
      });
    } catch (error) {
      console.error("Error setting icon:", error);
      if (state !== IconState.GREY) {
        await this.setIcon(IconState.GREY);
      }
    }
  }
  //
  //   private static async createImageData(svgUrl: string): Promise<ImageData> {
  //     const img = new Image();
  //     const canvas = new OffscreenCanvas(128, 128);
  //     const ctx = canvas.getContext("2d");
  //
  //     if (!ctx) {
  //       throw new Error("Could not get canvas context");
  //     }
  //
  //     return new Promise((resolve, reject) => {
  //       img.onload = () => {
  //         ctx.clearRect(0, 0, 128, 128);
  //         ctx.drawImage(img, 0, 0, 128, 128);
  //         resolve(ctx.getImageData(0, 0, 128, 128));
  //       };
  //       img.onerror = reject;
  //       img.src = svgUrl;
  //     });
  //   }
}
