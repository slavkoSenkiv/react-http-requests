import ProgressBar from "./ProgressBar";
export default function DeleteConfirmation() {
  return (
    <div id="delete-confirmation">
      <h2>Delete this place?</h2>
      <p>the place can be selected later again</p>
      <span id="confirmation-actions">
        <ProgressBar />
        <button className="button">No</button>
        <button className="button">Yes</button>
      </span>
    </div>
  );
}
