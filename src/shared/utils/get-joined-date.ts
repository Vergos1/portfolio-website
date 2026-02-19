export const getJoinedDate = (
  options: Intl.DateTimeFormatOptions[],
  separator: string = ' | ',
) => {
  function format(option: Intl.DateTimeFormatOptions) {
    let formatter = new Intl.DateTimeFormat('en', option);
    return formatter.format(new Date());
  }
  return options.map(format).join(separator);
};
