type Props = {
    title: string;
    children: React.ReactNode;
  };
  
  export function Section({ title, children }: Props) {
    return (
      <section className="space-y-4">
        <p className="t-title">{title}</p>
        <div className="space-y-6">
          {children}
        </div>
      </section>
    );
  }
  