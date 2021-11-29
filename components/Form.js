import { Autocomplete, Button, Grid, TextField } from "@mui/material";

const Form = (props) => {
  const { noc, nocList, setNocSelected } = props;

  return (
    <>
      <Grid container>
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
              fullWidth
              required
            />
          )}
          sx={{ width: 920 }}
          value={noc}
          autoHighlight
          autoComplete
          disablePortal
        />
        <Button type="submit" variant="contained">
          Get Wage
        </Button>
      </Grid>
    </>
  );
};

export default Form;
