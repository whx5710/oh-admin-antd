export type {
  AlertProps,
  BeforeCloseScope,
  IconType,
  PromptProps,
} from './alert';
export { useAlertContext } from './alert';
export { default as Alert } from './alert.vue';
export {
  finnAlert as alert,
  clearAllAlerts,
  finnConfirm as confirm,
  finnPrompt as prompt,
} from './AlertBuilder';
