interface Props {
  title: any;
  children: React.ReactNode;
  openByDefault?: boolean;
}

const FluentCollapse: React.FC<Props> = ({
  title,
  openByDefault,
  children,
}) => {
  return (
    <div className="transition-all border-2 rounded-none collapse collapse-arrow border-neutral !border-t-0">
      <input
        type="radio"
        name="accordion"
        defaultChecked={openByDefault}
      />
      <div className="text-lg font-semibold transition-all collapse-title">
        {title}
      </div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};

export default FluentCollapse;
