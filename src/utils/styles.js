export const reactSelectStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#f2f2f2' : '#ffffff',
      color: "#48484a",
      // padding: "8pt",
    }),
    control: (provided) => ({
      // none of react-select's styles are passed to <Control />
      // width: 200,
      ...provided,
      borderRadius: 0,
      border: "none",
      borderBottom: "1px solid #ced4da",
      padding: "4pt 0",
      boxShadow: 'none'
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: 0,
      margin: 0,
      padding: 0,
      borderColor: "#ced4da",
      boxShadow: "rgba(0, 0, 0, 0.28) 0px 8px 28px"
    })
  }