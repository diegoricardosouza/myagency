import { Button } from "@/view/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/view/components/ui/card";
import { ClapperboardIcon, NotebookText, Presentation, RefreshCcw, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

export function Formats() {
  return (
    <div>
      <div className="mx-auto grid w-full auto-rows-max gap-4">
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-center">
              Formatos
            </CardTitle>
          </CardHeader>

          <CardContent
            className="flex gap-3 flex-col lg:flex-row justify-center"
          >
            <Button type="submit" size="sm" asChild>
              <Link to="/solicitacoes/atualizacoes">
                <RefreshCcw className="w-5 h-5 mr-1" />
                ATUALIZAÇÕES SITE
              </Link>
            </Button>

            <Button type="submit" size="sm" asChild>
              <Link to="/solicitacoes/midia-digital">
                <Share2 className="w-5 h-5 mr-1" />
                MÍDIA DIGITAL
              </Link>
            </Button>

            <Button type="submit" size="sm" asChild>
              <Link to="/solicitacoes/impresso">
                <NotebookText className="w-5 h-5 mr-1" />
                IMPRESSO
              </Link>
            </Button>

            <Button type="submit" size="sm" asChild>
              <Link to="/solicitacoes/apresentacoes">
                <Presentation className="w-5 h-5 mr-1" />
                APRESENTAÇÕES
              </Link>
            </Button>

            <Button type="submit" size="sm" asChild>
              <Link to="/solicitacoes/videos">
                <ClapperboardIcon className="w-5 h-5 mr-1" />
                VÍDEOS
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <span className="text-xs text-center block mt-3 text-gray-500">
        Psiu, não se esqueça de que o prazo para as artes on-line é de até 24h exceto finais de semanas e feriados, mas faremos de tudo pra lhe apresentar o quanto antes tá.
      </span>
    </div>
  )
}
