import { useAuth } from "@/app/hooks/useAuth";
import { jobsService } from "@/app/services/jobs";
import { UpdateJobParams } from "@/app/services/jobs/update";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";


export function useViewJobController() {
  const [changingStatus, setChangingStatus] = useState(false);
  const [approvingStatus, setApprovingStatus] = useState(false);
  const [approvedStatus, setApprovedStatus] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [sendWhats, setSendWhats] = useState(false);

  const {
    handleSubmit: hookFormSubmit
  } = useForm();

  const { data: jobData, isLoading } = useQuery({
    queryKey: ['viewjob', id],
    staleTime: 0,
    queryFn: async () => {
      try {
        const response = await jobsService.getById(id!);
        return response;
      } catch (error) {
        toast.error('Solicitação não encontrada');
        navigate("/solicitacoes");
      }
    }
  });

  const {
    isPending: isChangeStatus,
    mutateAsync
  } = useMutation({
    mutationFn: async (data: UpdateJobParams) => {
      return jobsService.update(data);
    }
  });

  // console.log("user:", user!.data.id);


  const handleChangingStatus = hookFormSubmit(async () => {
    try {
      setChangingStatus(true);
      await mutateAsync({
        id: id!,
        status: "changing"
      });
      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      toast.success('Enviado para alteração!');
      setChangingStatus(false);
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  });

  const handleApprovingStatus = hookFormSubmit(async () => {
    try {
      setApprovingStatus(true);
      await mutateAsync({
        id: id!,
        status: "approving"
      });
      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      toast.success('Enviado para aprovação!');
      setApprovingStatus(false);
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  });

  const handleApprovedStatus = hookFormSubmit(async () => {
    try {
      setApprovedStatus(true);
      await mutateAsync({
        id: id!,
        status: "approved"
      });
      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      toast.success('Solicitação aprovada!');
      setApprovedStatus(false);
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  });

  async function sendWhatsAppNotification() {
    try {
      setSendWhats(true);

      const whatsapp = jobData?.data.user.whatsapp;
      const numberFormated = whatsapp?.replace(/\D/g, '');

      let msg = `⚠️ Olá ${jobData?.data.user.name} tudo bem?\n`;
      msg += 'Sua espera acabou!\n';
      msg += 'Acesse o link abaixo para conferir!\n';
      msg += `https://minhaagencia.inovasite.com/solicitacoes/detalhes/${jobData?.data.id}`;

      const res = await axios.post(
        'https://dropestore.com/wp-json/wdm/v1/send/text',
        {
          number: `${numberFormated}`,
          text: msg
        },
        {
          headers: {
            Accept: 'application/json',
            token: import.meta.env.VITE_TOKEN_WHATSAPP,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(res.data);
      toast.success('WhatsApp enviado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao enviar WhatsApp');
    } finally {
      setSendWhats(false);
    }
  }

  return {
    jobData: jobData?.data,
    isLoading,
    isChangeStatus,
    user,
    sendWhats,
    handleChangingStatus,
    handleApprovingStatus,
    handleApprovedStatus,
    sendWhatsAppNotification,
    changingStatus,
    approvingStatus,
    approvedStatus,
    whatsapp: jobData?.data.user.whatsapp
  }
}
