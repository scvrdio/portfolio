export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-[720px] px-4">{children}</div>;
}
