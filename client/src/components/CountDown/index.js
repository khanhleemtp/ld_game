import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";

const CountDown = () => {
  const { timeRole } = useSocket();
  const [totalTimeRole, setTotalTimeRole] = useState(0);

  useEffect(() => {
    setTotalTimeRole(timeRole.time);
    return () => {};
  }, [timeRole]);

  useEffect(() => {
    const countDownCallBack = () => setTotalTimeRole(prev => (prev > 0 ? prev - 1 : 0));
    let interval = setInterval(countDownCallBack, 1000);
    if (totalTimeRole == 0) clearInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, [totalTimeRole]);

  return <div>Time: {totalTimeRole}</div>;
};

export default CountDown;
