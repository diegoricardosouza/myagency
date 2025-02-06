import { Whatsapp2 } from "@/view/components/icons/Whatsapp2";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Link } from "react-router-dom";
import { BreadcrumbPlan } from "./components/BreadcrumbPlan";

export default function PlansInfo() {
  return (
    <>
      <BreadcrumbPlan />

      <div>
        <Card className="min-h-[500px] relative">

          <CardContent>
            <div className="flex justify-center mt-10 mb-10">
              <Button size="lg" className="bg-green-500 hover:bg-green-600">
                <Link
                  to={`https://api.whatsapp.com/send/?phone=5541996777195&text=Quero quero mais informações sobre os planos.&type=phone_number&app_absent=0`}
                  className="flex items-center gap-1"
                  target="_blank"
                >
                  <Whatsapp2 className="w-6 h-6" /> Contratar
                </Link>
              </Button>
            </div>

            <div className="text-center mb-10">
              <p>
                Com a Inovasite, você tem o poder de escolher <strong>quando</strong> e <strong>como</strong> quer suas artes. Nossos pacotes oferecem total flexibilidade: você pode enviar suas solicitações sob demanda ou optar por planos onde cuidamos de toda a gestão e criação para você.
              </p><br/>

              <p>
                Artes <strong>100% exclusivas</strong>, criadas por profissionais talentosos, sem modelos prontos ou designs repetidos. Cada detalhe é pensado para atender às suas necessidades e superar suas expectativas.
              </p><br/>

              <p>
                Seja para sua marca, projetos pessoais ou campanhas especiais, nós transformamos suas ideias em realidade. 💡
              </p><br/>

              <p><strong>Pronto para elevar sua criatividade?</strong> Escolha seu plano e deixe a mágica acontecer! 😉</p>
            </div>

            <iframe
              src="https://inovasite.com/planos.pdf"
              className="w-full h-[1000px]"
            />

            <div className="flex justify-center mt-4">
              <Button size="lg" className="bg-green-500 hover:bg-green-600">
                <Link
                  to={`https://api.whatsapp.com/send/?phone=5541996777195&text=Quero quero mais informações sobre os planos.&type=phone_number&app_absent=0`}
                  className="flex items-center gap-1"
                  target="_blank"
                >
                  <Whatsapp2 className="w-6 h-6" /> Contratar
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
