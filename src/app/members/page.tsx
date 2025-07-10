import { ReactNode } from "react";

import { cookies } from "next/headers";

import { AppSidebar } from "@/app/_components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { users } from "@/data/users";
import { getSidebarVariant, getSidebarCollapsible, getContentLayout } from "@/lib/layout-preferences";
import { cn } from "@/lib/utils";
import { LayoutControls } from "../_components/sidebar/layout-controls";
import { ThemeSwitcher } from "../_components/sidebar/theme-switcher";
import { AccountSwitcher } from "../_components/sidebar/account-switcher";
import { SearchDialog } from "../_components/sidebar/search-dialog";
import { MemberDetails } from "@/interface/common";
import RegistrationForm from "./registrationForm";

const sampleData: MemberDetails[] = [
  {
    _id: "684ffed0017b28f7fa14285d",
    memberName: "Sriganesh",
    bloodGroup: "AB+",
    mobileNo: "8344233713",
    emailId: "sri@gmail.com",
    advanceAmount: "500",
    dateOfJoin: "2025-06-01T11:23:00.439Z",
    dateOfBirth: "1997-11-04T11:23:00.439Z",
    lastpaymentDate: "2025-06-18T07:12:58.731Z",
    nextPaymentDate: "2025-08-30T11:23:00.439Z",
    address: "dhasampalayam",
    profileImage: "",
    memberID: "1750073040831",
    gender: "male",
    planDetails: {
      planName: "One_month_plan",
      planValue: 1000,
      duration: 30,
      planID: 1750093606057,
      dueAmount: 0,
      value: 0,
      // "paidAmount": 1000
    },
    dietPlanDetails: [],
  },
];

export default async function Members({ children }: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const sidebarVariant = await getSidebarVariant();
  const sidebarCollapsible = await getSidebarCollapsible();
  const contentLayout = await getContentLayout();
  const memberData: MemberDetails[] = sampleData;
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar variant={sidebarVariant} collapsible={sidebarCollapsible} />
      <SidebarInset
        className={cn(
          contentLayout === "centered" && "!mx-auto max-w-screen-2xl",
          "max-[113rem]:peer-data-[variant=inset]:!mr-2 min-[101rem]:peer-data-[variant=inset]:peer-data-[state=collapsed]:!mr-auto",
        )}
      >
        <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-1 lg:gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
              <SearchDialog />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <LayoutControls
                  contentLayout={contentLayout}
                  variant={sidebarVariant}
                  collapsible={sidebarCollapsible}
                />
                <ThemeSwitcher />
                <AccountSwitcher users={users} />
              </div>
            </div>
          </div>
        </header>
        <div className="p-4 md:p-6">
          <RegistrationForm />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
