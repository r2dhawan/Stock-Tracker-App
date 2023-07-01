import { toast } from "react-toastify";

const checkTime = () => {
  const today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  return (hours === 16 && minutes < 30) || (hours < 16 && hours > 9) || (hours === 9 && minutes >= 30);
};

const IsMarketOpen = () => {
  // if we are checking in before 16:00
  if (checkTime()) {
    console.log("1");
    toast.success("Market is open! Happy browsing! :)", {
      toastId: "open",
    });
    return true;
  }
  // if we are checking during 16:00 but not past 16:30
  // otherwise we are closed
  else {
    console.log("2");
    toast.error("Market is closed! :(", {
      toastId: "closed",
    });
    return false;
  }
};

export default IsMarketOpen;
