import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(timeout);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Delete this place?</h2>
      <p>the place can be selected later again</p>
      <div id="confirmation-actions">
        <ProgressBar timer={TIMER}/>
        <button className="button" onClick={onCancel}>
          No
        </button>
        <button className="button" onClick={onConfirm}>
          Yes
        </button>
      </div>
    </div>
  );
}
