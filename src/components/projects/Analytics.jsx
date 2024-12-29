/* eslint-disable react/prop-types */
import { DottedSeparator } from "../DottedSeparator";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import AnalyticsCard from "./AnalyticsCard";

export default function Analytics({ data }) {
  return (
    <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Total tasks"
            value={data.totalTaskThisMonth}
            variant={data.taskDifference > 0 ? "up" : "down"}
            increaseValue={data.taskDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Assigned tasks"
            value={data.totalAssigneedTaskThisMonth}
            variant={data.taskAssigneeDifference > 0 ? "up" : "down"}
            increaseValue={data.taskAssigneeDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Incomplete tasks"
            value={data.totalInCompleteTaskThisMonth}
            variant={data.taskIncompleteDifference > 0 ? "up" : "down"}
            increaseValue={data.taskIncompleteDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Completed tasks"
            value={data.totalCompletedTaskThisMonth}
            variant={data.taskCompletedDifference > 0 ? "up" : "down"}
            increaseValue={data.taskCompletedDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Overdue tasks"
            value={data.totalOverDueTaskThisMonth}
            variant={data.taskOverDueDifference > 0 ? "up" : "down"}
            increaseValue={data.taskOverDueDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
