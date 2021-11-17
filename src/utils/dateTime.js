export const toDate = (ts) => {
    const formatOptions = { day: 'numeric', month: 'short', year: 'numeric' }
    const date = new Date(ts * 1000)
    return date.toLocaleString('en-US', formatOptions)
  }
  