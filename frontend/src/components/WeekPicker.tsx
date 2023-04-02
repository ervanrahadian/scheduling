import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  mainFontStyle: {
    fontSize: "16px",
  },
  publishedFontStyle: {
    fontSize: "16px",
    color: theme.color.turqouise,
  },
}));

interface Prop {
  date: any;
  onChangeWeek: (type: string) => void;
  isPublished: boolean;
}

const WeekPicker: FunctionComponent<Prop> = ({
  date,
  onChangeWeek,
  isPublished,
}) => {
  const classes = useStyles();

  return (
    <>
      <IconButton
        size="medium"
        aria-label="prev"
        onClick={() => onChangeWeek("prev")}
      >
        <NavigateBefore fontSize="small" />
      </IconButton>

      <strong
        className={
          isPublished ? classes.publishedFontStyle : classes.mainFontStyle
        }
      >
        {date.startDate.toDateString().slice(4, 10)}
      </strong>

      <span
        className={
          isPublished ? classes.publishedFontStyle : classes.mainFontStyle
        }
      >
        {" "}
        -{" "}
      </span>

      <strong
        className={
          isPublished ? classes.publishedFontStyle : classes.mainFontStyle
        }
      >
        {date.endDate.toDateString().slice(4, 10)}
      </strong>

      <IconButton
        size="medium"
        aria-label="next"
        onClick={() => onChangeWeek("next")}
      >
        <NavigateNext fontSize="small" />
      </IconButton>
    </>
  );
};

export default WeekPicker;
