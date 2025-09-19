import * as React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TutorialHelpButton } from "@/features/tutorial"

interface BreadcrumbItem {
  title: string
  href?: string
}

interface AppLayoutProps {
  children: React.ReactNode
  breadcrumbs: BreadcrumbItem[]
  currentScreen?: string
}

export function AppLayout({ children, breadcrumbs, currentScreen }: AppLayoutProps) {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.title}>
                <BreadcrumbItem>
                  {item.href && index < breadcrumbs.length - 1 ? (
                    <BreadcrumbLink href={item.href}>
                      {item.title}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Botão de ajuda/tutorial */}
        <div className="ml-auto">
          <TutorialHelpButton currentScreen={currentScreen} />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {children}
      </div>
    </SidebarInset>
  )
}