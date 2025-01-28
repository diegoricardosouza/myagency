import { Spinner } from "@/view/components/Spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/view/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/view/components/ui/table"
import { BreadcrumbPlan } from "./components/BreadcrumbPlan"
import { PlanItem } from "./components/PlanItem"
import { usePlansInfoController } from "./usePlansInfoController"

export default function PlansInfo() {
  const { plans, isLoading } = usePlansInfoController();

  return (
    <>
      <BreadcrumbPlan />

      <div>
        <Card className="min-h-[500px] relative">
          {isLoading && (
            <div className="w-full h-full flex justify-center items-center absolute top-0 left-0">
              <Spinner className="w-6 h-6 fill-primary" />
            </div>
          )}

          <CardHeader>
            <CardTitle>Planos</CardTitle>
          </CardHeader>
          <CardContent>
            {!isLoading && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[230px]">Nome</TableHead>
                    <TableHead>Atualizações</TableHead>
                    <TableHead>Mídia Digital</TableHead>
                    <TableHead>Impresso</TableHead>
                    <TableHead>Apresentações</TableHead>
                    <TableHead>Vídeos</TableHead>
                    <TableHead className="w-[130px]" />
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {plans?.map((plan) => (
                    <PlanItem key={plan.id} {...plan} />
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
