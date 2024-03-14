export default function Error ({message, onConfirm}) {
  return (
    <div className="error">
      <h1>An Error Occured</h1>
      <p>{message}</p>
      {onConfirm && (
        <div id="confirmation-actions">
          <button onClick={onConfirm} className="button">
            Okay
          </button>
        </div>
      )}
    </div>
  )
}