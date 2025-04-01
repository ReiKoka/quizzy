import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type SingleInfographicBoxProps = {
  value: number | string;
  title: string;
  description?: string;
  className?: string;
};

function SingleInfographicBox({
  value,
  title,
  description,
  className,
}: SingleInfographicBoxProps) {
  const baseStyles = `stat place-items-center px-4 py-2 px-6 py-3`;
  const style = twMerge(clsx(baseStyles, className));

  return (
    <div className={style}>
      <div className="stat-title text-xs lg:text-sm">{title}</div>
      <div className="stat-value text-primary text-sm capitalize lg:text-2xl">
        {value}
      </div>
      <div className="stat-desc text-xs lg:text-sm">{description}</div>
    </div>
  );
}

export default SingleInfographicBox;
