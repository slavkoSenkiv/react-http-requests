import { useEffect, useRef } from "react";
export default function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return (
    <dialog className="modal center" ref={dialog}>
      {children}
    </dialog>
  );
}
