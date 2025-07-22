import { Files } from "@/app/entities/Jobs";
import { cn } from "@/lib/utils";
import { FileViewJob } from "@/view/components/FileViewJob";
import { Avatar, AvatarImage } from "@/view/components/ui/avatar";
import { Card, CardContent } from "@/view/components/ui/card";
import { Label } from "@/view/components/ui/label";
import { format } from "date-fns";

interface CommentsProps {
  id: string;
  company: string;
  content: string;
  files?: Files[];
  userId: string;
  logo: string;
  date: string;
}

export function Comments({ id, company, content, files, userId, logo, date }: CommentsProps) {
  return (
    <div className="mt-4">
      <h3 className={cn(
        "font-semibold flex items-center gap-2 mb-2 text-sm lg:text-base justify-between ",
        // id !== userId && "justify-start"
      )}>
        {/* <CircleUser className="w-5 h-5" /> */}
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9 sm:flex border">
            <AvatarImage src={logo} alt={company} className="object-contain" />
          </Avatar>
          {company}
        </div>

        <div>
          <span className="text-xs font-normal text-gray-500">
            {format(date, "dd/MM/yyyy")} às {format(date, "HH:mm")}hrs
          </span>
        </div>
      </h3>
      <Card x-chunk="dashboard-07-chunk-3" className={cn(
          "pt-6 bg-primary text-white",
        id !== userId && "bg-muted text-gray-500"
        )
      }>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label>Comentário:</Label>
              {/* <p className="break-all">{content}</p> */}

              <div
                className="text-sm comments-content"
                dangerouslySetInnerHTML={{ __html: content as string }}
              />
            </div>

            {files?.length ? (
              <div className="grid gap-3">
                <Label>Arquivos:</Label>
                <div className="grid lg:grid-cols-3 gap-2">
                  {files?.map((file) => {
                    const nameConvert = file.name.replace("comments/", "jobs/")
                    return <FileViewJob key={file.id} id={file.id} url={file.url} name={nameConvert} />
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
