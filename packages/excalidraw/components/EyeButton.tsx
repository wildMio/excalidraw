import { t } from "../i18n";

import { EyeOffIcon, EyeOnIcon } from "./icons";

type EyeButtonProps = {
  name?: string;
  id?: string;
  onClick?(): void;
  status?: "on" | "off";
};

export const EyeButton = (props: EyeButtonProps) => {
  const title = t("labels.toggleAnnotations");

  return (
    <button
      className="help-icon"
      onClick={props.onClick}
      type="button"
      title={title}
      aria-label={title}
    >
      {props.status === "off" ? EyeOffIcon : EyeOnIcon}
    </button>
  );
};
