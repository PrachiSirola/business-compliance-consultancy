import IcoRaw from "../common/IcoRaw";

export default function FeatureItem({ iconPaths, title, children, style }) {
  return (
    <div className="feature" style={style}>
      <span className="feature__ico">
        <IcoRaw paths={iconPaths} strokeWidth={1.7} />
      </span>
      <div>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ margin: 0 }}>{children}</p>
      </div>
    </div>
  );
}
