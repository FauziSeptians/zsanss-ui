declare const _default: import("vite").UserConfig;
export default _default;

declare module '*.md?raw' {
  const content: string;
  export default content;
}