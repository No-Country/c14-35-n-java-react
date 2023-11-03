import { HTMLAttributes, useEffect } from "react";

type Alert = "error" | "success" | "info" | "warning";
interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type?: Alert;
  dismissible?: boolean;
}

const FormAlert: React.FC<Props> = ({
  onClick = () => {},
  dismissible = false,
  type = "error",
  ...props
}) => {
  useEffect(() => {
    // scroll to the top of the page when the alert is displayed
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className={`alert alert-${type}`}>
      {/*//* Set the following div so tailwind doesn't purge the alert classes */}
      {/* <div className="hidden alert-info alert-success alert-warning alert-error" /> */}
      {dismissible && (
        <span
          onClick={onClick}
          className="hover:font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 stroke-black shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      )}
      <div {...props} />
    </div>
  );
};

export default FormAlert;