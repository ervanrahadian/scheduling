import React, { FunctionComponent, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { getErrorMessage } from "../helper/error/index";
import { deleteShiftById, getShifts } from "../helper/api/shift";
import DataTable from "react-data-table-component";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import moment from "moment";
import ConfirmDialog from "../components/ConfirmDialog";
import Alert from "@material-ui/lab/Alert";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import {
  getStartDate,
  getEndDate,
  updateStartAndEndDate,
} from "../helper/date";
import WeekPicker from "../components/WeekPicker";
import {
  createPublishedShifts,
  getPublishedShifts,
} from "../helper/api/publishedShift";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  errorAlert: {
    marginBottom: "20px",
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 40,
    backgroundColor: "white",
    color: theme.color.turquoise,
  },
  headerContainer: {
    marginBottom: "20px",
  },
  headerEnd: {
    textAlign: "end",
  },
  addShiftBtn: {
    marginLeft: "10px",
    backgroundColor: "white",
    border: `1px solid ${theme.color.turqouise}`,
    color: theme.color.turqouise,
    marginRight: "auto",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  publishBtn: {
    marginLeft: "10px",
    backgroundColor: theme.color.turqouise,
    border: `1px solid ${theme.color.turqouise}`,
    color: "white",
    marginRight: "auto",
    "&:hover": {
      backgroundColor: theme.color.turqouise,
    },
  },
  disabledBtn: {
    border: "none",
  },
  primaryColor: {
    color: theme.color.turqouise,
  },
}));

interface ActionButtonProps {
  id: string;
  onDelete: () => void;
  disabled: boolean;
}

const Shift = () => {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [isPublished, setIsPublished] = useState(false);
  const [publishedDate, setPublishedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const [orderBy, setOrderBy] = useState({
    date: "ASC",
    startTime: "ASC",
  });
  const [weekCounter, setWeekCounter] = useState<number>(0);
  const [date, setDate] = useState({
    startDate: getStartDate(new Date()),
    endDate: getEndDate(new Date()),
  });

  const ActionButton: FunctionComponent<ActionButtonProps> = ({
    id,
    onDelete,
    disabled,
  }) => {
    return (
      <div>
        <IconButton
          size="small"
          aria-label="delete"
          component={RouterLink}
          to={`/shift/${id}/edit?startDate=${moment(date.startDate).format(
            "YYYY-MM-DD"
          )}&endDate=${moment(date.endDate).format("YYYY-MM-DD")}`}
          disabled={disabled}
        >
          <EditIcon fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          aria-label="delete"
          onClick={() => onDelete()}
          disabled={disabled}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    );
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setErrMsg("");

        // get shift
        const { results: getShiftRes } = await getShifts(
          `startDate=${moment(date.startDate).format(
            "YYYY-MM-DD"
          )}&endDate=${moment(date.endDate).format("YYYY-MM-DD")}&orderDate=${
            orderBy.date
          }&orderStartTime=${orderBy.startTime}`
        );

        setRows(getShiftRes);

        // get published shift
        const { results: getPublishedShiftRes } = await getPublishedShifts(
          `startDate=${moment(date.startDate).format(
            "YYYY-MM-DD"
          )}&endDate=${moment(date.endDate).format("YYYY-MM-DD")}`
        );

        setIsPublished(getPublishedShiftRes.length ? true : false);
        setPublishedDate(getPublishedShiftRes[0]?.createdAt || "");
      } catch (error) {
        const message = getErrorMessage(error);
        setErrMsg(message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [date]);

  const onChangeWeek = (type: string) => {
    if (type === "prev") {
      updateStartAndEndDate(date.startDate, weekCounter - 1, setDate);
      setWeekCounter((prev) => prev - 1);
    } else {
      updateStartAndEndDate(date.startDate, weekCounter + 1, setDate);
      setWeekCounter((prev) => prev + 1);
    }
  };

  const onPublishClick = () => {
    setShowPublishConfirm(true);
  };

  const onClosePublishDialog = () => {
    setShowPublishConfirm(false);
  };

  const onPublish = async () => {
    try {
      setIsLoading(true);
      setErrMsg("");

      const payload = {
        startDate: moment(date.startDate).format("YYYY-MM-DD"),
        endDate: moment(date.endDate).format("YYYY-MM-DD"),
      };

      const { results: getPublishedShiftRes } = await createPublishedShifts(
        payload
      );

      setIsPublished(true);
      setPublishedDate(getPublishedShiftRes?.createdAt || "");
    } catch (error) {
      const message = getErrorMessage(error);
      setErrMsg(message);
    } finally {
      setIsLoading(false);
      onClosePublishDialog();
    }
  };

  const onDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowDeleteConfirm(true);
  };

  const onCloseDeleteDialog = () => {
    setSelectedId(null);
    setShowDeleteConfirm(false);
  };

  const deleteDataById = async () => {
    try {
      setDeleteLoading(true);
      setErrMsg("");

      if (selectedId === null) {
        throw new Error("ID is null");
      }

      await deleteShiftById(selectedId);

      const tempRows = [...rows];
      const idx = tempRows.findIndex((v: any) => v.id === selectedId);
      tempRows.splice(idx, 1);
      setRows(tempRows);
    } catch (error) {
      const message = getErrorMessage(error);
      setErrMsg(message);
    } finally {
      setDeleteLoading(false);
      onCloseDeleteDialog();
    }
  };

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Start Time",
      selector: "startTime",
      sortable: true,
    },
    {
      name: "End Time",
      selector: "endTime",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <ActionButton
          id={row.id}
          onDelete={() => onDeleteClick(row.id)}
          disabled={isPublished}
        />
      ),
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={classes.root}>
          <CardContent>
            {errMsg ? (
              <Alert severity="error" className={classes.errorAlert}>
                {errMsg}
              </Alert>
            ) : (
              <></>
            )}

            <Grid container className={classes.headerContainer}>
              <Grid item xs={6}>
                <WeekPicker
                  date={date}
                  onChangeWeek={onChangeWeek}
                  isPublished={isPublished}
                />
              </Grid>

              <Grid item xs={6} className={classes.headerEnd}>
                {isPublished && (
                  <>
                    <IconButton disabled={true}>
                      <TaskAltIcon
                        className={classes.primaryColor}
                        fontSize="small"
                      />
                    </IconButton>

                    <span className={classes.primaryColor}>
                      Week published on {moment(publishedDate).format("LLL")}
                    </span>
                  </>
                )}

                <Button
                  variant="contained"
                  classes={{
                    root: classes.addShiftBtn,
                    disabled: classes.disabledBtn,
                  }}
                  component={RouterLink}
                  to={`/shift/add?startDate=${moment(date.startDate).format(
                    "YYYY-MM-DD"
                  )}&endDate=${moment(date.endDate).format("YYYY-MM-DD")}`}
                  disabled={isPublished}
                >
                  ADD SHIFT
                </Button>

                <Button
                  variant="contained"
                  classes={{
                    root: classes.publishBtn,
                    disabled: classes.disabledBtn,
                  }}
                  onClick={onPublishClick}
                  disabled={isPublished}
                >
                  PUBLISH
                </Button>
              </Grid>
            </Grid>

            <DataTable
              noHeader
              columns={columns}
              data={rows}
              pagination
              progressPending={isLoading}
            />
          </CardContent>
        </Card>
      </Grid>

      <ConfirmDialog
        title="Publish Confirmation"
        description={`Do you want to publish this week data ?`}
        onClose={onClosePublishDialog}
        open={showPublishConfirm}
        onYes={onPublish}
        loading={isLoading}
      />

      <ConfirmDialog
        title="Delete Confirmation"
        description={`Do you want to delete this data ?`}
        onClose={onCloseDeleteDialog}
        open={showDeleteConfirm}
        onYes={deleteDataById}
        loading={deleteLoading}
      />
    </Grid>
  );
};

export default Shift;
