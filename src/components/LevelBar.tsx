import "./LevelBar.sass";

import Typography from "@mui/material/Typography";

export interface LevelBarProps {
  title: string;
  subtitle: string;
  percentage: number;
  isDanger?: boolean;
}

export default function LevelBar(props: LevelBarProps): JSX.Element {
  const textColor = props.isDanger ? "red" : undefined;
  const backgroundColor = props.isDanger ? "#ffcccb" : "#e0e0e0";
  const indicatorColor = props.isDanger ? "#f44336" : "#666666";

  return (
    <div className="levelbar">
      <div className="levelbar-textbox">
        <Typography variant="h6" component="p" color={textColor}>
          {props.title}
        </Typography>
        {props.title ? <span /> : ""}
        <Typography variant="body2" component="p" color={textColor}>
          {props.subtitle}
        </Typography>
      </div>
      <div className="levelbar-indicator" style={{ backgroundColor }}>
        <div style={{ backgroundColor: indicatorColor, width: props.percentage + "%" }} />
      </div>
    </div>
  );
}
