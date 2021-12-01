import firebase from "../config";
import moment from "moment";

export const testTimestamp = () => {
  const timestamp = new firebase.firestore.Timestamp.fromDate(new Date());
  const timestamp1 = new firebase.firestore.Timestamp.fromMillis(new Date());
  const momentDate = moment(timestamp.toDate(), "HH:mm");
  console.log("Timestamp: ", timestamp);
  console.log("timeStamp1:", timestamp1);
  // console.log("momentDate: ", momentDate);
  // console.log("moment string format: ", moment("8-5-1997", "YYYY/MM/DD"));
};
