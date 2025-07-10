import {
  Calendar,
  ReceiptText,
  Users,
  Dumbbell,
  IndianRupee,
  ChartNoAxesCombined,
  type LucideIcon,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  // {
  //   id: 1,
  //   label: "Dashboards",
  //   items: [
  //     {
  //       title: "Dashboards",
  //       url: "/dashboard",
  //       icon: Home,
  //       subItems: [
  //         { title: "Default", url: "/dashboard/default", icon: ChartPie },
  //         { title: "CRM", url: "/dashboard", icon: Grid2X2, comingSoon: true },
  //         { title: "Analytics", url: "/dashboard/analytics", icon: ChartLine, comingSoon: true },
  //         { title: "eCommerce", url: "/dashboard/e-commerce", icon: ShoppingBag, comingSoon: true },
  //         { title: "Academy", url: "/dashboard/academy", icon: BookA, comingSoon: true },
  //         { title: "Logistics", url: "/dashboard/logistics", icon: Forklift, comingSoon: true },
  //       ],
  //     },
  //   ],
  // },
  {
    id: 1,
    label: "Quick Action",
    items: [
      // {
      //   title: "Authentication",
      //   url: "/auth",
      //   icon: Fingerprint,
      //   subItems: [
      //     { title: "Login v1", url: "/auth/v1/login", newTab: true },
      //     { title: "Register v1", url: "/auth/v1/register", newTab: true },
      //   ],
      // },
      {
        title: "Dashboard",
        url: "/dashboard/default",
        icon: Dumbbell,
        // comingSoon: true,
      },
      {
        title: "Members",
        url: "/members",
        icon: Users,
        // comingSoon: true,
      },
      {
        title: "Plan List",
        url: "/planList",
        icon: Calendar,
        // comingSoon: true,
      },
      {
        title: "Fees Payment",
        url: "/payment",
        icon: IndianRupee,
        // comingSoon: true,
      },
      {
        title: "Invoice",
        url: "/invoice",
        icon: ReceiptText,
        comingSoon: true,
      },
      {
        title: "Report",
        url: "/report",
        icon: ChartNoAxesCombined,
        // comingSoon: true,
      },
    ],
  },
  // {
  //   id: 3,
  //   label: "Misc",
  //   items: [
  //     {
  //       title: "Others",
  //       url: "/others",
  //       icon: SquareArrowUpRight,
  //       comingSoon: true,
  //     },
  //   ],
  // },
];
