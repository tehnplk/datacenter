import type { ReactNode } from "react";
import {
  Activity,
  BarChart3,
  ClipboardList,
  Smile,
  Scissors,
  Share2,
  Banknote,
  HeartPulse,
  Baby,
} from "lucide-react";

export type NavGroup = {
  id: string;
  label: string;
  icon: ReactNode;
  items: Array<{
    id: string;
    label: string;
    href: string;
  }>;
};

export const DASHBOARD_NAV: NavGroup[] = [
  {
    id: "drgs",
    label: "RW/CMI",
    icon: <BarChart3 className="h-4 w-4" />,
    items: [
      { id: "cmi", label: "RW/CMI", href: "/RW-CMI/rw-cmi" },
      {
        id: "top-adjrw",
        label: "TOP 10 AdjRW",
        href: "/RW-CMI/top-adjrw",
      },
    ],
  },
  {
    id: "er-refer",
    label: "ER/Refer",
    icon: <Share2 className="h-4 w-4" />,
    items: [
      {
        id: "paperless",
        label: "Paperless Refer (อิเล็กทรอนิกส์ 100%)",
        href: "/ER-Refer/paperless",
      },
      {
        id: "top10",
        label: "Refer Out 10 อันดับ",
        href: "/ER-Refer/top10-cause",
      },
    ],
  },
  {
    id: "icu",
    label: "ICU",
    icon: <Activity className="h-4 w-4" />,
    items: [
      {
        id: "occupancy",
        label: "อัตราครองเตียง ICU & semi ICU (ราย รพ.)",
        href: "/ICU/bed-occupancy",
      },
      {
        id: "wait-bed",
        label: "ระยะเวลารอเตียง ICU (เฉลี่ย)",
        href: "/ICU/wait-icu-bed",
      },
      {
        id: "critical-mortality",
        label: "อัตราตายโรควิกฤตสำคัญ (Sepsis, AMI)",
        href: "/ICU/critical-mortality",
      },
      {
        id: "ward-deaths",
        label: "การตายใน ward ธรรมดา (Top 10)",
        href: "/ICU/ward-death-analysis",
      },
      {
        id: "icu-deaths",
        label: "การตายใน ICU / semi ICU (Top 10)",
        href: "/ICU/icu-death-analysis",
      },
    ],
  },
  {
    id: "or",
    label: "OR",
    icon: <Scissors className="h-4 w-4" />,
    items: [
      {
        id: "utilization",
        label: "อัตราการใช้ห้องผ่าตัด",
        href: "/OR/utilization",
      },
      {
        id: "target-wait",
        label: "เวลารอผ่าตัด: ต้อกระจก, ไส้เลื่อน",
        href: "/OR/target-wait-time",
      },
    ],
  },
  {
    id: "beds",
    label: "Beds",
    icon: <ClipboardList className="h-4 w-4" />,
    items: [
      {
        id: "bed-count",
        label: "จำนวนเตียง",
        href: "/Beds/bed-count",
      },
      {
        id: "bed-summary",
        label: "อัตราครองเตียง",
        href: "/Beds/bed-summary",
      },
    ],
  },
  {
    id: "dental",
    label: "Dental",
    icon: <Smile className="h-4 w-4" />,
    items: [{ id: "dental", label: "ผู้รับบริการทันตกรรมรายเดือน", href: "/dental/monthly" }],
  },
  {
    id: "reimbursement",
    label: "Reimbursement",
    icon: <Banknote className="h-4 w-4" />,
    items: [
      { id: "reimbursement-nhso", label: "ข้อมูลโอนเงิน สปสช.", href: "/reimbursement" },
    ],
  },
  {
    id: "mini-thanyarak",
    label: "มินิธัญญารักษ์",
    icon: <HeartPulse className="h-4 w-4" />,
    items: [
      { id: "thanyarak-overview", label: "ภาพรวมมินิธัญญารักษ์", href: "/mini-thanyarak/overview" },
    ],
  },
  {
    id: "delivery-room",
    label: "ห้องคลอด",
    icon: <Baby className="h-4 w-4" />,
    items: [
      { id: "delivery-stats", label: "สถิติห้องคลอด", href: "/delivery-room/stats" },
    ],
  },
];
