import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonFormatProps {
  link: string;
  icon?: ReactNode;
  children: ReactNode;
  credits: string | number | undefined;
  disabled?: boolean;
}

export function ButtonFormat({ link, icon, children, credits, disabled }: ButtonFormatProps) {
  return (
    <>
      {disabled && (
        <span className={cn(
          'h-[160px] px-5 rounded-xl flex flex-col justify-center items-center bg-gray-200 cursor-not-allowed text-white'
        )}>
          {icon}
          <span className="text-[23px] font-semibold block leading-[26px] my-3 text-center">
            {children}
          </span>

          <small className="text-[12px] font-light">
            Créditos Dísponiveis: {credits}
          </small>
        </span>
      )}

      {!disabled && (
        <Link to={link}
          className={cn(
            'h-[160px] px-5 rounded-xl flex flex-col justify-center items-center bg-primary text-white transition-all',
            'hover:bg-blue-700'
          )}
        >
          {icon}
          <span className="text-[19px] font-semibold block leading-[21px] my-3 text-center min-h-[42px]">
            {children}
          </span>

          <small className="text-[12px] font-light">
            Créditos Dísponiveis: {credits}
          </small>
        </Link>
      )}
    </>
  )
}
