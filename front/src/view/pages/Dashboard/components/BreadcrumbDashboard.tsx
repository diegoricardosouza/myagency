import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/view/components/ui/breadcrumb"
import { Link } from "react-router-dom"

export function BreadcrumbDashboard() {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
