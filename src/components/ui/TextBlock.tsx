type Props = {
    accent?: string;
    children: React.ReactNode;
  };
  
  export function TextBlock({ accent, children }: Props) {
    return (
      <div className="space-y-3">
        {accent ? <p className="t-accent ty-body">{accent}</p> : null}
        <div className="t-body ty-body">{children}</div>
      </div>
    );
  }