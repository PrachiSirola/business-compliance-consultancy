import { NavLink } from "react-router-dom";

const ICONS = {
  dashboard: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="10" width="8" height="11" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/>',
  enquiries: '<path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4V6a1 1 0 0 1 1-1z"/>',
};

function NavIcon({ path }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" dangerouslySetInnerHTML={{ __html: path }} />
  );
}

export default function Sidebar({ open, onNavigate }) {
  return (
    <aside className={"sidebar" + (open ? " open" : "")}>
      <div className="sidebar__brand">
        Suits
        <span>Admin Dashboard</span>
      </div>
      <nav className="sidebar__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => "sidebar__link" + (isActive ? " active" : "")}
          onClick={onNavigate}
        >
          <NavIcon path={ICONS.dashboard} />
          Overview
        </NavLink>
        <NavLink
          to="/enquiries"
          className={({ isActive }) => "sidebar__link" + (isActive ? " active" : "")}
          onClick={onNavigate}
        >
          <NavIcon path={ICONS.enquiries} />
          Enquiries
        </NavLink>
      </nav>
      <div className="sidebar__foot">Suits Compliance</div>
    </aside>
  );
}
