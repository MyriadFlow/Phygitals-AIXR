import { ModelViewerElement } from "@google/model-viewer";
import { ExternalProvider } from "@ethersproject/providers";

export declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<Partial<ModelViewerElement>>;
    }
  }
}