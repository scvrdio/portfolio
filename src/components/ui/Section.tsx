type Props = {
    title: string;
    children: React.ReactNode;
  };
  
  export function Section({ title, children }: Props) {
    return (
      <section className="space-y-4">
        <p className="t-title ty-title ">{title}</p>
        <div className="space-y-4">
          {children}
        </div>
      </section>
    );
  }
  