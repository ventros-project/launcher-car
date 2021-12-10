import "./QuickSettingButton.sass";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

export interface QuickSettingButtonProps {
  icon: string;
  label: string;
  isEnabled: boolean;
  isUpdating: boolean;
  onClick: () => void;
}

export default function QuickSettingButton(props: QuickSettingButtonProps): JSX.Element {
  const backgroundColor = props.isEnabled ? "secondary" : "inherit";

  function renderIcon(): JSX.Element {
    if (props.isUpdating) {
      const color = props.isEnabled ? "inherit" : "secondary";
      return <CircularProgress color={color} />;
    } else {
      const className = props.isEnabled ? "quicksettingbutton-invert" : undefined;
      return <img src={props.icon} alt={props.label} draggable="false" className={className} />;
    }
  }

  return (
    <div className="quicksettingbutton">
      <Button
        className="quicksettingbutton-icon"
        color={backgroundColor}
        variant="contained"
        onClick={props.isUpdating ? undefined : props.onClick}
      >
        {renderIcon()}
      </Button>
      <Typography variant="caption">{props.label}</Typography>
    </div>
  );
}
