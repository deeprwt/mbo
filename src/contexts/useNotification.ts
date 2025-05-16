import { useContext } from "react";
import type { NotificationContextType } from "./NotificationContext";
import { NotificationContext } from "./NotificationContext";

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
