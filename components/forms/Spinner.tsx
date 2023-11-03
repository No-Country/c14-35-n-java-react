import { useEffect } from "react";

const Spinner = () => {
  useEffect(() => {
    // scroll to the top of the page when the spinner is displayed
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <span className="loading loading-spinner text-info mx-auto mt-10 w-10"></span>
  );
};
export default Spinner;
