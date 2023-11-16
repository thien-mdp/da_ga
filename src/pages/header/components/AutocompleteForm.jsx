import { Autocomplete, InputLabel, TextField } from "@mui/material";

const AutocompleteForm = ({ backgroundColor, lable, options }) => {
  return (
    <div className="relative z-0 w-full mb-6 group">
      <InputLabel className="peer-focus:font-medium absolute text-sm text-gray-500 \ duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        {lable}
      </InputLabel>
      <Autocomplete
        style={{
          backgroundColor: backgroundColor,
          borderRadius: "7px",
        }}
        options={options}
        getOptionLabel={(option) => option?.name}
        isOptionEqualToValue={(option, value) => option === value}
        renderInput={(params) => <TextField {...params} label="" />}
      />
    </div>
  );
};
export default AutocompleteForm;
