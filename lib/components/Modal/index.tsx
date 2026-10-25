import {
  Modal as ModalComponent,
  ModalBody,
  ModalDescription,
  ModalFooter,
  ModalHeader,
} from "./modal";

export type ModalType = typeof ModalComponent & {
  Header: typeof ModalHeader;
  Description: typeof ModalDescription;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
};

const Modal = ModalComponent as ModalType;
Modal.Header = ModalHeader;
Modal.Description = ModalDescription;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
export { ModalHeader, ModalDescription, ModalFooter, ModalBody };
