"use client";
import { useState, useEffect } from "react";

import dayjs from "dayjs";
const EventCountdown = ({ date, time, where }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = dayjs(`${date} ${time}`);

    const timer = setInterval(() => {
      const now = dayjs();
      const diff = targetDate.diff(now, "second");

      if (diff <= 0) {
        clearInterval(timer);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (3600 * 24));
        const hours = Math.floor((diff % (3600 * 24)) / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [date, time]);

  const formatNumber = (num) => num.toString().padStart(2, "0");

  return (
    <div>
      <div className="flex flex-col items-center md:flex-row gap-2">
        <p className="text-xl">{dayjs(date).format("D MMMM YYYY")}</p>
        <p>-</p>
        <p>{where}</p>
      </div>
      <br />
      <div className="text-3xl font-bold">
        {countdown.days !== 0 && `${countdown.days} days `}
        {formatNumber(countdown.hours)}:{formatNumber(countdown.minutes)}:
        {formatNumber(countdown.seconds)}
      </div>
    </div>
  );
};


export default EventCountdown;