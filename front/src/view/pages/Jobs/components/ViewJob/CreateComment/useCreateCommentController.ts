/* eslint-disable @typescript-eslint/no-unused-vars */
import { Jobs } from "@/app/entities/Jobs";
import { useAuth } from "@/app/hooks/useAuth";
import { commentsService } from "@/app/services/commentsService";
import { CommentsParams } from "@/app/services/commentsService/create";
import { jobsService } from "@/app/services/jobs";
import { UpdateJobParams } from "@/app/services/jobs/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  content: z.string().min(1, 'Comentário é obrigatório'),
  files: z.array(z.any()).optional().nullable(),
});

type FormData = z.infer<typeof schema>

export function useCreateCommentController(whatsapp: string | undefined, job?: Jobs) {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [openModalComment, setOpenModalComment] = useState(false);
  const [sendWhats, setSendWhats] = useState(false);

  const {
    register,
    handleSubmit: hookFormSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const {
    isPending: isLoadingCreateComment,
    mutateAsync
  } = useMutation({
    mutationFn: async (data: CommentsParams) => {
      return commentsService.create(data);
    }
  });

  const {
    mutateAsync: mutateChangeStatus
  } = useMutation({
    mutationFn: async (data: UpdateJobParams) => {
      return jobsService.update(data);
    }
  });

  function closeCommentModal() {
    setOpenModalComment(false);
  }

  async function sendWhatsAppNotification() {
    try {
      setSendWhats(true);

      const numberFormated = whatsapp?.replace(/\D/g, '');

      // let msg = `⚠️ Olá ${jobData?.data.user.name} tudo bem?\n`;
      // msg += 'Sua espera acabou!\n';
      // msg += 'Acesse o link abaixo para conferir!\n';
      // msg += `https://minhaagencia.inovasite.com/solicitacoes/detalhes/${jobData?.data.id}`;
      let msg = `⚠️ Olá ${job?.user.name} tudo bem?\n`;
      msg += 'Sua espera acabou!\n';
      msg += 'Acesse o link abaixo para conferir!\n';
      msg += `https://minhaagencia.inovasite.com/solicitacoes/detalhes/${id}`;

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
      // toast.success('WhatsApp enviado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao enviar WhatsApp');
    } finally {
      setSendWhats(false);
    }
  }

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        job_id: id!,
        user_id: user!.data.id
      });

      if(user?.data.level === 'CLIENTE') {
        await mutateChangeStatus({
          id: id!,
          status: "changing"
        });
        queryClient.invalidateQueries({ queryKey: ['viewjob'] });
        reset();
      }

      if (user?.data.level === 'ADMIN') {
        await mutateChangeStatus({
          id: id!,
          status: "approving"
        });
        queryClient.invalidateQueries({ queryKey: ['viewjob'] });
        reset();
      }

      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      if (user?.data.level === 'CLIENTE') {
        toast.success('Comentário cadastrado com sucesso!');
      } else {
        // openCommentModal();
        sendWhatsAppNotification();
        toast.success('Comentário cadastrado com sucesso! O cliente será notificado via WhatsApp.');
      }

      reset();
      // navigate(0);
    } catch (error) {
      toast.error('Erro ao cadastrar o comentário!');
    }
  });

  return {
    control,
    isLoadingCreateComment,
    register,
    handleSubmit,
    errors,
    id,
    openModalComment,
    sendWhats,
    closeCommentModal,
    sendWhatsAppNotification
  }
}
