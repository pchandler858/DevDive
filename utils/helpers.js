module.exports = {
  format_date: (date) => {
    console.log("format_date helper function", date);
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
};
