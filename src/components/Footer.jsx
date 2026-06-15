export default function Footer({ config }) {
  return (
    <footer className="site-footer">
      <div>
        <strong>SAMA</strong>
        <p>{config.footer}</p>
      </div>
      <div>
        <span>{config.brand.location}</span>
        <span>{config.brand.phone}</span>
        <span>{config.brand.instagram}</span>
      </div>
    </footer>
  );
}
