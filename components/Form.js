import { Autocomplete, Button, Grid, TextField } from "@mui/material";

const Form = (props) => {
  const { noc, nocList, nocSelected, pruidList, setNocSelected, setWages } =
    props;

  const getWage = async (e, noc) => {
    e.preventDefault();
    setWages([]);

    const url = `https://orient.onrender.com/gc/wages/${noc}`;
    const response = await fetch(url);
    const data = await response.json();
    const add = await data.map((item) => {
      const name = pruidList.filter((x) => String(x.pruid) == item.pruid)[0]
        .name;
      return { ...item, name };
    });
    const result = await add.sort((a, b) => a.name.localeCompare(b.name));

    console.log(result);
    setWages(result);
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
          <Button type="submit" sx={{ padding: "1rem" }} variant="contained">
            Get Wage
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
