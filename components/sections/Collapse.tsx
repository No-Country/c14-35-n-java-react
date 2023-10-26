import { Section } from "@/types/section.types";

interface Props {
  title: any;
  children: React.ReactNode;
  openByDefault?: boolean;
}

const Collapse: React.FC<Props> = ({
  title,
  children,
  openByDefault = false,
}) => {
  return (
    <details
      className="border-2 rounded-none collapse collapse-plus border-neutral transition-all"
      open={openByDefault}
    >
      <summary className="text-lg font-medium collapse-title transition-all">
        {title}
      </summary>
      <div className="space-y-4 collapse-content transition-all">
        {children}
      </div>
    </details>
  );
};

export default Collapse;
