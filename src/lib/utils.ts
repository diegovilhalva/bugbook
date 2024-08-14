import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function formatRelativeDate(from: Date) {
  const currentDate = new Date();

  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, { addSuffix: true, locale: ptBR });
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return format(from, 'd MMM', { locale: ptBR });
    } else {
      return format(from, 'd MMM yyyy', { locale: ptBR });
    }
  }
}