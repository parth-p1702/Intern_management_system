import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import Button from "./Button";
import ModalWrapper from "./ModalWrapper";

const DialogContent = ({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  confirmButtonClass,
}) => (
  <div className="flex flex-col items-center justify-center w-full gap-4 py-4">
    <Dialog.Title as="h3">
      <p className={clsx("p-3 rounded-full", confirmButtonClass)}>
        <FaQuestion size={60} />
      </p>
    </Dialog.Title>
    <p className="text-center text-gray-500">{message}</p>
    <div className="gap-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse">
      <Button
        type="button"
        className={clsx(
          "px-8 text-sm font-semibold text-white sm:w-auto",
          confirmButtonClass,
        )}
        onClick={onConfirm}
        label={confirmLabel}
      />
      <Button
        type="button"
        className="px-8 text-sm font-semibold text-gray-900 bg-white border sm:w-auto"
        onClick={onCancel}
        label={cancelLabel}
      />
    </div>
  </div>
);

export default function ConfirmationDialog({
  open,
  setOpen,
  msg,
  setMsg = () => {},
  onClick = () => {},
  type = "delete",
  setType = () => {},
}) {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };

  const confirmButtonClass =
    type === "restore" || type === "restoreAll"
      ? "bg-green-600"
      : "bg-red-600 hover:bg-red-500";

  return (
    <ModalWrapper open={open} setOpen={closeDialog}>
      <DialogContent
        title="Confirmation"
        message={msg ?? "Are you sure you want to delete the selected record?"}
        confirmLabel={type === "restore" ? "Restore" : "Delete"}
        cancelLabel="Cancel"
        onConfirm={onClick}
        onCancel={closeDialog}
        confirmButtonClass={confirmButtonClass}
      />
    </ModalWrapper>
  );
}

export function UserAction({ open, setOpen, onClick = () => {} }) {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} setOpen={closeDialog}>
      <DialogContent
        title="User  Action"
        message="Are you sure you want to activate or deactivate this account?"
        confirmLabel="Yes"
        cancelLabel="No"
        onConfirm={onClick}
        onCancel={closeDialog}
        confirmButtonClass="bg-red-600 hover:bg-red-500"
      />
    </ModalWrapper>
  );
}
