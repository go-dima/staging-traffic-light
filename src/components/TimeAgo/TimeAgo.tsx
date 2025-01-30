import { useEffect, useState } from "react";
import { Tag } from "antd";
import "./TimeAgo.css";
import { JiraHistory } from "../../types/jira";

interface TimeAgoProps {
  history: JiraHistory[];
  updateInterval?: number;
}

const getStagingUpdate = (histories: JiraHistory[]) => {
  return (
    histories.find((history) => {
      return history.items.find(
        (i) => i.field === "status" && i.toString === "STAGING"
      );
    })?.created || ""
  );
};

export const TimeAgo: React.FC<TimeAgoProps> = ({
  history,
  updateInterval = 60000, // 1 minute default update
}) => {
  const date = getStagingUpdate(history);
  const [timeAgo, setTimeAgo] = useState<string>("");

  const getTimeAgo = (date: string): string => {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000
    );

    const intervals = {
      day: 60 * 60 * 24, // 86,400 seconds
      hour: 60 * 60, // 3,600 seconds
      minute: 60, // 60 seconds
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
      }
    }

    return "just now";
  };

  useEffect(() => {
    const updateTimeAgo = () => setTimeAgo(getTimeAgo(date));
    updateTimeAgo();

    const intervalId = setInterval(updateTimeAgo, updateInterval);
    return () => clearInterval(intervalId);
  }, [date, updateInterval]);

  return (
    <div className="time-ago">
      <Tag color="default">{timeAgo}</Tag>
    </div>
  );
};
