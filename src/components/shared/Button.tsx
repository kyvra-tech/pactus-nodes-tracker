import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  style?: string;
  variant: "primary" | "secondary";
}

const getThemeStyle = (variant: "primary" | "secondary") => {
  if (variant === "primary") {
    return "bg-primary text-white border-transparent relative after:bg-[#172554] hover:border-[#172554]";
  }
  return "text-primary";
};

const getTextColor = (variant: "primary" | "secondary") => {
  if (variant === "primary") {
    return "text-white";
  }
  return "text-primary";
};

const Button: React.FC<Props> = ({ children, style, variant }: Props) => {
  return (
    <button
      className={`px-6 py-3 outline-none relative overflow-hidden border duration-300 ease-linear
                    after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554]
                    ${getThemeStyle(
                      variant
                    )} hover:after:opacity-100 hover:after:scale-[2.5] ${style}`}
    >
      <span className={`relative ${getTextColor(variant)} z-10`}>
        {children}
      </span>
    </button>
  );
};

export default Button;
