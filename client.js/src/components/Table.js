import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Container, Typography, makeStyles } from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import axios from "axios";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function CountryDataTable() {
  const [tableData, setTableData] = useState();
  const [sortBy, setSortBy] = React.useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const prevVal = "";
  const [state, setState] = React.useState(prevVal);

  const navigate = useNavigate();

  const prevStateRef = React.useRef(state);
  const params =
    state === "desc"
      ? `sort=${sortBy}%3A${state}`
      : state === "asc"
      ? `sort=${sortBy}`
      : "";

  useEffect(() => {
    axios
      .post(`http://localhost:5000/?sort=${sortBy}&&state=${state}`)
      .then((res) => setTableData(res.data));
    navigate({
      pathname: "/",
      search: `?${createSearchParams(params)}`,
    });
    prevStateRef.current = state;
  }, [state, sortBy]);

  const createSortHandler = (e, field) => {
    setSortBy(field);

    if (prevStateRef.current === "") {
      setState("asc");
    } else if (prevStateRef.current === "asc") {
      setState("desc");
    } else {
      setState("");
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortBy === "name" && state != ""}
                  direction={sortBy === "name" ? state : "desc"}
                  onClick={(e) => createSortHandler(e, "name")}
                  sx={{
                    "& .MuiTableSortLabel-icon": {
                      backgroundColor: "#e5e8ee",
                      borderRadius: "20%",
                    },
                  }}
                >
                  Name{" "}
                </TableSortLabel>
              </TableCell>

              <TableCell align="right" style={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortBy === "dial_code" && state != ""}
                  direction={sortBy === "dial_code" ? state : "desc"}
                  onClick={(e) => createSortHandler(e, "dial_code")}
                  sx={{
                    "& .MuiTableSortLabel-icon": {
                      backgroundColor: "#e5e8ee",
                      borderRadius: "20%",
                    },
                  }}
                >
                  Dial Code
                </TableSortLabel>
              </TableCell>

              <TableCell align="right" style={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortBy === "code" && state != ""}
                  direction={sortBy === "code" ? state : "desc"}
                  onClick={(e) => createSortHandler(e, "code")}
                  sx={{
                    "& .MuiTableSortLabel-icon": {
                      backgroundColor: "#e5e8ee",
                      borderRadius: "20%",
                    },
                  }}
                >
                  Code
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.dial_code}</TableCell>
                <TableCell align="right">{row.code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
