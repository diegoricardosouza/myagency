import { Comments } from "@/app/entities/Comments";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateEllipsisPagination(
  currentPage: number,
  totalPages: number,
  surroundingPages = 1
) {
  const pages: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const isFirstPage = i === 1;
    const isLastPage = i === totalPages;
    const isWithinLowerBound = i >= (currentPage - surroundingPages);
    const isWithinUpperBound = i <= (currentPage + surroundingPages);
    const isEllipsisPosition = (
      i === currentPage - surroundingPages - 1 ||
      i === currentPage + surroundingPages + 1
    );

    if (isEllipsisPosition && !isFirstPage && !isLastPage) {
      pages.push('...');
      continue;
    }

    if ((isFirstPage || isLastPage) || (isWithinLowerBound && isWithinUpperBound)) {
      pages.push(i);
    }
  }

  return pages;
}

export function formatedDate(date: string) {
  const getDate = date.split("-")
  const day = getDate[2].split("T")
  const dateFormated = getDate[0] + '-' + getDate[1] + '-' + day[0];

  return dateFormated;
}

export function getImageCommentAdmin(comments: Comments[], userId: string, level: string){
  if (level === 'CLIENTE') {
    const commentFiltered = comments?.filter(c => c.user.id !== userId)

    if (commentFiltered && commentFiltered?.length > 0) {
      if (commentFiltered[0].files) {
        return commentFiltered[0]?.files[0]?.url;
      }
    }
  }

  if (level !== 'CLIENTE') {
    const commentFiltered = comments?.filter(c => c.user.level === 'ADMIN')

    if (commentFiltered && commentFiltered?.length > 0) {
      if (commentFiltered[0].files) {
        return commentFiltered[0]?.files[0]?.url;
      }
    }
  }
}

export function isImageUrl(url: string) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

  const urlLower = url.toLowerCase();
  for (let i = 0; i < imageExtensions.length; i++) {
    if (urlLower.endsWith(imageExtensions[i])) {
      return true; // É uma imagem
    }
  }
  return false; // Não é uma imagem
}

export function identifyFileExtension(urlImage: string) {
  const nameFile = urlImage?.split('/').pop();

  if (nameFile) {
    const extension = nameFile.split('.').pop()?.toLowerCase();

    if (extension === 'pdf') {
      return 'pdf';
    } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(extension!)) {
      return 'image';
    }
  }

  return 'unknown';
}

export function sanatizeLabelInfinite(value: string | number | undefined) {
  return value === -1 ? 'ilimitado' : value
}
