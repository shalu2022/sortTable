const express = require("express");
const cors = require("cors");
const app = express();
const countryData = require("./data/countryData.json");
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {});

app.post("/", (req, res) => {
  const { sort, state } = req.query;

  function descComparator(a, b, orderBy) {
    if (orderBy === "dial_code") {
      if (+b[orderBy].split("+")[1] < +a[orderBy].split("+")[1]) {
        return -1;
      }
      if (+b[orderBy].split("+")[1] > +a[orderBy].split("+")[1]) {
        return 1;
      }
      return 0;
    }
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(state, sort) {
    return state === "desc"
      ? (a, b) => descComparator(b, a, sort)
      : state === "asc"
      ? (a, b) => -descComparator(b, a, sort)
      : (a, b) => (a, b);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const finalData = stableSort(countryData, getComparator(state, sort));

  res.send(finalData);
});

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is running on PROT: ${PORT}`);
  } else {
    console.log("Error", err);
  }
});
