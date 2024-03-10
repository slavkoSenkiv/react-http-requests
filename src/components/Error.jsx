export default function Error ({message, onConfirm}) {
  return (
    <div className="error">
      <h1>An Error Occured</h1>
      <p>{message}</p>
      <button onClick={onConfirm}>Ok</button>
    </div>
  )
}