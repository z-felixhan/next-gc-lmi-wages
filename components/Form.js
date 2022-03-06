import { LoadingButton } from "@mui/lab";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";

const Form = (props) => {
  const {
    loading,
    noc,
    nocList,
    nocSelected,
    pruidList,
    setLoading,
    setNocSelected,
    setWages,
  } = props;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  });

  // Returns wage in CAD
  const parseWage = (wage) => {
    return formatter.format(parseInt(wage));
  };

  // Gets the wage of the job and sets the state
  const getWage = async (e, noc) => {
    e.preventDefault();
    setLoading(true);
    setWages([]);

    const url = `https://orient.onrender.com/gc/wages/${noc}`;
    const response = await fetch(url);
    const data = await response.json();
    const add = await data.map((item) => {
      const name = pruidList.filter((x) => String(x.pruid) == item.pruid)[0]
        .name;
      return {
        ...item,
        med_wage: parseWage(item.med_wage),
        max_wage: parseWage(item.max_wage),
        min_wage: parseWage(item.min_wage),
        name,
      };
    });
    const result = await add.sort((a, b) => a.name.localeCompare(b.name));

    setWages(result);
    setLoading(false);
  };

  return (
    <form onSubmit={(e) => getWage(e, nocSelected)}>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <Autocomplete
            id="noc"
            getOptionLabel={(option) => `${option.noc} - ${option.title}`}
            inputValue={noc}
            onChange={(e, value) => {
              if (value) {
                setNocSelected(value.noc);
              } else {
                setNocSelected("");
              }
            }}
            options={nocList}
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{ shrink: true }}
                label="NOC - Job Title"
                required
              />
            )}
            value={noc}
            autoHighlight
            autoComplete
            disablePortal
            fullWidth
          />
        </Grid>
        <Grid item>
          <LoadingButton
            loading={loading}
            loadingIndicator="Loading..."
            type="submit"
            sx={{ padding: "1rem" }}
            variant="contained"
          >
            Get Wage
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
