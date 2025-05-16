import React, { createContext, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import type { ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material/styles";

// Types
interface NotificationContextType {
  showSuccess: (message: string, options?: ToastOptions) => void;
  showError: (message: string, options?: ToastOptions) => void;
  showWarning: (message: string, options?: ToastOptions) => void;
  showInfo: (message: string, options?: ToastOptions) => void;
  showApiError: (error: unknown, defaultMessage?: string) => void;
}

// Default toast options
const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Create context
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

/**
 * Provider component for the notification system
 */
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useTheme();

  // Success notification
  const showSuccess = useCallback(
    (message: string, options?: ToastOptions) => {
      toast.success(message, {
        ...defaultToastOptions,
        style: {
          backgroundColor: theme.palette.success.light,
          color: theme.palette.success.contrastText,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
        },
        ...options,
      });
    },
    [theme]
  );

  // Error notification
  const showError = useCallback(
    (message: string, options?: ToastOptions) => {
      toast.error(message, {
        ...defaultToastOptions,
        style: {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.contrastText,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
        },
        ...options,
      });
    },
    [theme]
  );

  // Warning notification
  const showWarning = useCallback(
    (message: string, options?: ToastOptions) => {
      toast.warning(message, {
        ...defaultToastOptions,
        style: {
          backgroundColor: theme.palette.warning.light,
          color: theme.palette.warning.contrastText,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
        },
        ...options,
      });
    },
    [theme]
  );

  // Info notification
  const showInfo = useCallback(
    (message: string, options?: ToastOptions) => {
      toast.info(message, {
        ...defaultToastOptions,
        style: {
          backgroundColor: theme.palette.info.light,
          color: theme.palette.info.contrastText,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
        },
        ...options,
      });
    },
    [theme]
  );

  // API error handler
  const showApiError = useCallback(
    (
      error: unknown,
      defaultMessage: string = "An unexpected error occurred"
    ) => {
      let errorMessage = defaultMessage;

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string"
      ) {
        errorMessage = (error as { message: string }).message;
      }

      toast.error(errorMessage, {
        ...defaultToastOptions,
        style: {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.contrastText,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
        },
      });
    },
    [theme]
  );

  const value = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showApiError,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};

export type { NotificationContextType };
export { NotificationContext };
