import { ProductState } from "./product";

// Allow other modules to take what they need, eg action & selectors

export * from "./product";

// rolls up our states into one const
export const appState = [ProductState];
