// src/global.d.ts
export {};

declare global {
  interface Window {
    experience: unknown;
  }
  declare module "*.glsl" {
    const value: string;
    export default value;
  }
}
