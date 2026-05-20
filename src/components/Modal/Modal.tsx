import css from "./Modal.module.css";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode
}

const Modal = ({ children}: ModalProps) => {
  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>{children}</div>
    </div>, document.body
  );
};

export default Modal;
