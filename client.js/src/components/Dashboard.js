import React from "react";
import CountryDataTable from "./Table";
import { Box, Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

function Dashboard() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Container>
        <Typography
          //  component="h1"
          variant="h5"
          color="text.primary"
          gutterBottom
          sx={{ paddingTop: "4rem", fontWeight: 600 }}
        >
          Country Data
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          //   gutterBottom
          sx={{
            margin: "10px 0 20px 0",
            fontSize: ".875rem",
            lineHeight: "1.25rem",
          }}
        >
          A list of all the countries in with their name, dial code, and code.
        </Typography>
      </Container>
      <CountryDataTable />
    </Box>
  );
}

export default Dashboard;
