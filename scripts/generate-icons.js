import { writeFile, mkdir } from "fs/promises";

const COLORS = {
  green: "#2da44e",
  red: "#cf222e",
  grey: "#8c959f",
};

const SIZES = [16, 32, 48, 128];

function generateSVG(color, size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 2}" fill="${
    COLORS[color]
  }"/>
  </svg>`;
}

async function generateIcons() {
  // Ensure icons directory exists
  await mkdir("public/icons", { recursive: true }).catch(() => {});

  for (const color of Object.keys(COLORS)) {
    for (const size of SIZES) {
      const svg = generateSVG(color, size);
      const filename = `public/icons/icon-${color}-${size}.svg`;
      await writeFile(filename, svg);
      console.log(`Generated ${filename}`);
    }
  }
}

generateIcons().catch(console.error);
