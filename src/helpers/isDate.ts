import * as moment from "moment";

const isDate = (value) => {
  if (!value) {
    return false;
  }     7                                            

  const date = moment(value);
  if (date.isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = { isDate };
