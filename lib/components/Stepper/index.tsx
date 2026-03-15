import { StepperContent, StepperItem } from "./StepperContent";

// Menggabungkan menjadi Compound Component
export const Stepper = Object.assign(StepperContent, {
  Item: StepperItem,
});