export interface ColorContextType {
  rgb: { r: number; g: number; b: number };
  setColor: (r: number, g: number, b: number) => void;
}
