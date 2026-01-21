import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from "react";

const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | null,
  handler: () => void
) => {
  useEffect(() => {
    const lisnHandler = (e: MouseEvent) => {
      if (
        ref &&
        ref.current &&
        ref.current?.contains &&
        !ref.current?.contains(e.target as Node)
      ) {
        handler();
      }
    };
    document.addEventListener("mousedown", lisnHandler);
    return () => document.removeEventListener("mousedown", lisnHandler);
  }, [ref, handler]);
};

export const TestForm = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descripRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLDialogElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleSendFormData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: FormEvent) => {
      console.log(e, "form event");
      e.preventDefault();
      console.log(nameRef.current?.value, "name");
      console.log(descripRef.current?.value, "descrip");
    },
    [nameRef, descripRef]
  );

  const onCallModal = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  }, [isOpen]);
  useEffect(() => {
    const escListener = (e: KeyboardEvent) => {
      if (e?.keyCode === 27) {
        onCallModal();
      }
    };
    window.addEventListener("keydown", escListener);
    return () => {
      window.removeEventListener("keydown", escListener);
    };
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useClickOutside<HTMLDialogElement>(formRef as any, onCallModal);
  return (
    <div
      style={{
        width: "600px",
        height: "600px",
      }}
    >
      <button>Open</button>
      <dialog open={isOpen} ref={formRef}>
        <form
          action="#"
          onSubmit={handleSendFormData}
          style={{
            width: "400px",
            display: "flex",
            flexDirection: "column",
            border: "1px olid red",
          }}
        >
          <input type="text" ref={nameRef} role="name_input" />
          <input type="text" ref={descripRef} role="descrip_input" />
          <button
            style={{
              background: "lightblue",
              width: "min-content",
              margin: "0 auto",
            }}
          >
            Send
          </button>
        </form>
      </dialog>
    </div>
  );
};
