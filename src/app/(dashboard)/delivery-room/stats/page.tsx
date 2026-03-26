import * as React from "react";
import MetricPage from "@/components/dashboard/MetricPage";

export default function Page() {
  return (
    <MetricPage
      title="ห้องคลอด: สถิติ"
      description="ข้อมูลสถิติการรับบริการห้องคลอด"
      showTopCards={true}
    >
      {/* Content will be added later */}
    </MetricPage>
  );
}
