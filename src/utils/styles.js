export const reactSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#f2f2f2' : '#ffffff',
    color: '#48484a',
    // padding: "8pt",
  }),
  control: (provided) => ({
    // none of react-select's styles are passed to <Control />
    // width: 200,
    ...provided,
    borderRadius: 0,
    border: 'none',
    borderBottom: '1px solid #ced4da',
    padding: '4pt 0',
    boxShadow: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: 0,
    margin: 0,
    padding: 0,
    borderColor: '#ced4da',
    boxShadow: 'rgba(0, 0, 0, 0.28) 0px 8px 28px',
  }),
}

const borderRadius = '4pt'

export const owmSelectorStyle = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#f2f2f2' : '#ffffff',
    padding: '8pt',
    color: '#48484a',
    // padding: "8pt",
  }),
  control: (provided, state) => ({
    // none of react-select's styles are passed to <Control />
    // width: 200,
    ...provided,
    borderRadius,
    borderColor: '#f2f2f2 !important',
    border: '1px solid #f2f2f2',
    borderBottom: state.menuIsOpen ? 'none' : '1px solid #f2f2f2',
    borderBottomLeftRadius: state.menuIsOpen ? 0 : borderRadius,
    borderBottomRightRadius: state.menuIsOpen ? 0 : borderRadius,
    padding: borderRadius,
    boxShadow: 'none',
    minWidth: '200px',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: 0,
    margin: 0,
    padding: 0,
    border: '1px solid #f2f2f2',
    borderTop: 'none',
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    boxShadow: 'none',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
}

export const mapStyle = {
  height: '100%',
  width: '100%',
  minHeight: '350px',
}
