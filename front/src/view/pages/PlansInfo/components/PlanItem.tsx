import { Whatsapp2 } from "@/view/components/icons/Whatsapp2";
import { Button } from "@/view/components/ui/button";
import { TableCell, TableRow } from "@/view/components/ui/table";
import { Link } from "react-router-dom";

interface PlanItemProps {
  name: string;
  updates: string;
  digital_midia: string;
  printed: string;
  presentations: string;
  videos: string;
}

export function PlanItem({ name, updates, digital_midia, printed, presentations, videos }: PlanItemProps) {
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          {name}
        </TableCell>
        <TableCell className="font-medium">
          {String(updates) === "-1" ? 'ilimitado' : updates}
        </TableCell>
        <TableCell className="font-medium">
          {String(digital_midia) === "-1" ? 'ilimitado' : digital_midia}
        </TableCell>
        <TableCell className="font-medium">
          {String(printed) === "-1" ? 'ilimitado' : printed}
        </TableCell>
        <TableCell className="font-medium">
          {String(presentations) === "-1" ? 'ilimitado' : presentations}
        </TableCell>
        <TableCell className="font-medium">
          {String(videos) === "-1" ? 'ilimitado' : videos}
        </TableCell>

        <TableCell>
          <Button className="bg-green-500 hover:bg-green-600">
            <Link
              to={`https://api.whatsapp.com/send/?phone=5541996777195&text=Quero contratar o plano ${name}, quero mais informações.&type=phone_number&app_absent=0`}
              className="flex items-center gap-1"
              target="_blank"
            >
              <Whatsapp2 className="w-6 h-6" /> Contratar
            </Link>
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}
