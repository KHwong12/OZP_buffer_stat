import { geodesicBuffer } from "@arcgis/core/geometry/geometryEngine";
import Graphic from "@arcgis/core/Graphic";

// update graphic and size figure of buffer
export function updateBufferGraphic (buffer, sketchGeometry, bufferLayer) {
  // add a polygon graphic for the buffer
  if (buffer > 0) {
    const bufferGeometry = geodesicBuffer(
      sketchGeometry,
      buffer,
      "meters"
    );
    // graphic layer can contain multiple features (i.e. length > 1)
    if (bufferLayer.graphics.length === 0) {
      bufferLayer.add(
        new Graphic({
          geometry: bufferGeometry,
          // symbol: sketchViewModel.polygonSymbol,
          symbol: {
            type: "simple-fill",
            color: [151, 151, 204, 0.5],
            style: "solid",
            outline: {
              color: "white",
              width: 1
            }
          }
        })
      );
    } else {
      bufferLayer.graphics.getItemAt(0).geometry = bufferGeometry;
    }
  } else {
    bufferLayer.removeAll();
  }
}
