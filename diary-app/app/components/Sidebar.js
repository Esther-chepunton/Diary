const Sidebar = () => {
  return (
    <div className="sidebar">
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <a href="/">All About Me!</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="#">Events</a>
          </li>
          <li>
            <a href="/DiaryList">Settings</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;