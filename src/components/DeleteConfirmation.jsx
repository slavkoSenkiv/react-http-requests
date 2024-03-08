import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Delete this place?</h2>
      <p>the place can be selected later again</p>
      <span id="confirmation-actions">
        <ProgressBar />
        <button className="button" onClick={onCancel}>
          No
        </button>
        <button className="button" onClick={onConfirm}>
          Yes
        </button>
      </span>
    </div>
  );
}
