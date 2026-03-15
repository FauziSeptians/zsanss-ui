import { Modal as ModalComponent, ModalBody, ModalHeader, ModalFooter } from "./modal";


export type ModalType = typeof ModalComponent & {
    Header : typeof ModalHeader
    Body : typeof ModalBody
    Footer : typeof ModalFooter
}


const Modal = ModalComponent as ModalType;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;


export default Modal;
export {ModalHeader, ModalFooter, ModalBody}