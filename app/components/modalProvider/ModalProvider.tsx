import classNames from "classnames";
import {
  FC,
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { XIcon } from "../icons/XIcon";

interface ModalContextProps {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  isModalOpen: boolean | undefined;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
    document.body.classList.add("overflow-hidden");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const contextValue: ModalContextProps = {
    openModal,
    closeModal,
    isModalOpen,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {isModalOpen && (
        <div
          className={classNames(
            "ModalOverlay",
            "flex items-center justify-center",
            "fixed top-0 z-50",
            "bg-black bg-opacity-75",
            "w-full h-full"
          )}
        >
          <div
            className={classNames(
              "absolute top-8 right-8 text-white",
              "hover:brightness-125 hover:cursor-pointer"
            )}
            onClick={() => closeModal()}
          >
            <XIcon />
          </div>
          <div className="ModalContent">{modalContent}</div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
