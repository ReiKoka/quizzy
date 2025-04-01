import { toast } from "sonner";

import { ReactNode } from "react";
import Icon from "supercons";

type ToastType = "success" | "warning" | "error" | "info";

export const showToast = (type: ToastType, message: string): void => {
  const icons: Record<ToastType, ReactNode> = {
    success: (
      <Icon
        glyph="check-circle"
        className="h-6 min-h-6 w-6 min-w-6 text-green-600 dark:text-green-500"
      />
    ),
    warning: (
      <Icon
        glyph="important"
        className="h-6 min-h-6 w-6 min-w-6 text-amber-600 dark:text-amber-500"
      />
    ),
    error: <Icon glyph="bug" className="text-error h-6 min-h-6 w-6 min-w-6" />,
    info: <Icon glyph="info" className="text-info h-6 min-h-6 w-6 min-w-6" />,
  };

  const textColors = {
    success: "text-green-600 dark:text-green-500",
    warning: "text-amber-600 dark:text-amber-500",
    error: "text-error",
    info: "text-info",
  };

  toast.custom(() => (
    <div
      className={`bg-primary-content shadow-custom dark:bg-base-300 flex w-auto items-center gap-4 rounded-xl border border-none p-4 sm:min-w-80`}
    >
      {icons[type] || icons.info}
      <div>
        <p
          className={`font-secondary text-sm font-medium ${textColors[type] || textColors.info}`}
        >
          {message}
        </p>
      </div>
    </div>
  ));
};
