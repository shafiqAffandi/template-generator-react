type Props = {
  children: any;
  className?: any;
};

export function Modal({ children, className }: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-zinc-900/50 backdrop-blur-sm">
      <div
        className={
          "fixed top-1/2 left-1/2 z-10 inline-block h-auto w-3/5 -translate-y-1/2 -translate-x-1/2 rounded bg-white p-2 " +
            className ?? ""
        }
      >
        {children}
      </div>
    </div>
  );
}
