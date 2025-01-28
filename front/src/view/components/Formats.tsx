import { useAuth } from "@/app/hooks/useAuth";
import { cn, sanatizeLabelInfinite } from "@/lib/utils";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/view/components/ui/card";
import { CalendarHeart, ClapperboardIcon, Info, NotebookText, Presentation, RefreshCcw, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCountJobsController } from "../../lib/useCountJobsController";
import { ButtonFormat } from "./ButtonFormat";
import { Whatsapp2 } from "./icons/Whatsapp2";

export function Formats() {
  const { user } = useAuth();

  const formatCounts = {
    atualizacoes: useCountJobsController("atualizacoes"),
    midia: useCountJobsController("midia-digital"),
    impresso: useCountJobsController("impresso"),
    apresentacoes: useCountJobsController("apresentacoes"),
    videos: useCountJobsController("videos"),
  };

  return (
    <div>
      <div>
        <Card className="relative lg:grid grid-cols-3">
          <div className="col-span-2">
            <CardHeader>
              <CardTitle className="text-center">
                O que você precisa hoje?
              </CardTitle>
            </CardHeader>

            <CardContent className="lg:pr-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ButtonFormat
                  link="/solicitacoes/atualizacoes"
                  icon={<RefreshCcw className="w-9 h-9" />}
                  credits={sanatizeLabelInfinite(formatCounts.atualizacoes.nJobsAvailable)}
                  disabled={formatCounts.atualizacoes.exceeded}
                >
                  Atualizações<br /> de Site
                </ButtonFormat>

                <ButtonFormat
                  link="/solicitacoes/midia-digital"
                  icon={<Share2 className="w-9 h-9" />}
                  credits={sanatizeLabelInfinite(formatCounts.midia.nJobsAvailable)}
                  disabled={formatCounts.midia.exceeded}
                >
                  Mídia<br /> Digital
                </ButtonFormat>

                <ButtonFormat
                  link="/solicitacoes/impresso"
                  icon={<NotebookText className="w-9 h-9" />}
                  credits={sanatizeLabelInfinite(formatCounts.impresso.nJobsAvailable)}
                  disabled={formatCounts.impresso.exceeded}
                >
                  Materiais<br /> Impressos
                </ButtonFormat>

                <ButtonFormat
                  link="/solicitacoes/apresentacoes"
                  icon={<Presentation className="w-9 h-9" />}
                  credits={sanatizeLabelInfinite(formatCounts.apresentacoes.nJobsAvailable)}
                  disabled={formatCounts.apresentacoes.exceeded}
                >
                  Apresentações
                </ButtonFormat>

                <ButtonFormat
                  link="/solicitacoes/videos"
                  icon={<ClapperboardIcon className="w-9 h-9" />}
                  credits={sanatizeLabelInfinite(formatCounts.videos.nJobsAvailable)}
                  disabled={formatCounts.videos.exceeded}
                >
                  Vídeos<br />Reels
                </ButtonFormat>

                <Link
                  to="https://api.whatsapp.com/send/?phone=5541996777195&text&type=phone_number&app_absent=0"
                  target="_blank"
                  className={cn(
                    'h-[160px] px-5 rounded-xl flex flex-col justify-center items-center bg-green-600 text-white transition-all',
                    'hover:bg-green-700'
                  )}
                >
                  <Whatsapp2 className="w-9 h-9" />
                  <span className="text-[19px] font-semibold block leading-[20px] my-1 text-center">
                    Precisa de<br/> algum serviço<br/> adicional?
                  </span>

                  <small className="text-[12px] font-light">
                    FALE CONOSCO
                  </small>
                </Link>
              </div>
            </CardContent>
          </div>

          <div className="flex justify-center py-6">
            <div className="bg-gray-100 rounded-xl border border-gray-200 px-3">
              <CardHeader>
                <CardTitle className="text-center text-gray-400">
                  Seu plano Atual
                </CardTitle>
              </CardHeader>

              <CardContent>
                <h4 className="text-[33px] font-bold mb-3">
                  {user?.data.plan.name}
                </h4>

                <div className="space-y-1">
                  <p className="font-semibold text-[16px]">Atualizações: {sanatizeLabelInfinite(user?.data.plan.updates)}</p>
                  <p className="font-semibold text-[16px]">Mídia Digital: {sanatizeLabelInfinite(user?.data.plan.digital_midia)}</p>
                  <p className="font-semibold text-[16px]">Impresso: {sanatizeLabelInfinite(user?.data.plan.printed)}</p>
                  <p className="font-semibold text-[16px]">Apresentações: {sanatizeLabelInfinite(user?.data.plan.presentations)}</p>
                  <p className="font-semibold text-[16px]">Vídeos: {sanatizeLabelInfinite(user?.data.plan.videos)}</p>
                </div>

                <Button className="bg-green-600 hover:bg-green-500 rounded-full w-full text-[17px] font-semibold mt-8">
                  <Link to="/info">
                    Alterar Plano
                  </Link>
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col lg:grid grid-cols-2 gap-4 mt-4">
        <div>
          <div className="bg-gray-100 rounded-xl p-3 flex items-center gap-2 border border-gray-200">
            <CalendarHeart size={44} className="flex-[0_0_44px]" />
            <p className="text-xs font-medium text-gray-600 leading-[17px]">
              Atenção! Seus créditos são renovados todo dia <strong className="text-primary">{user?.data.day}</strong>.
              Lembre-se de utilizá-los dentro do período mensal pois eles
              não são acumulativos de um mês para o outro.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-gray-100 rounded-xl p-3 flex items-center gap-2 border border-gray-200">
            <Info size={44} className="flex-[0_0_44px]" />
            <p className="text-xs font-medium text-gray-600 leading-[17px]">
              Psiu, não se esqueça de que o prazo para as artes on-line é de até 24h exceto finais de semanas e feriados, mas faremos de tudo pra lhe apresentar o quanto antes tá.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
