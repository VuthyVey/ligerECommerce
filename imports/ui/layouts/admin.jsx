import React from 'react';
// import '/public/assets/scss/style.css';

const AdminLayout = ({content}) => (
<span>
<aside id="left-panel" className="left-panel">
  <nav className="navbar navbar-expand-sm navbar-default">

    <div className="navbar-header">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fa fa-bars"></i>
      </button>
      <a className="navbar-brand" href="./"><img src="/images/logo.png" alt="Logo" /></a>
      <a className="navbar-brand hidden" href="./"><img src="/images/logo2.png" alt="Logo" /></a>
    </div>

    <div id="main-menu" className="main-menu collapse navbar-collapse">
      <ul className="nav navbar-nav">
        <li className="active">
          <a href="index.html">
            <i className="menu-icon fa fa-dashboard"></i>Dashboard
          </a>
        </li>
        <h3 className="menu-title">PRODUCT</h3>

        <li className="menu-item-has-children dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="menu-icon fa fa-laptop"></i>Products</a>
          <ul className="sub-menu children dropdown-menu">
            <li>
              <i className="fa fa-puzzle-piece"></i>
              <a href="/admin/products/new">New Product</a>
            </li>
            <li>
              <i className="fa fa-id-badge"></i>
              <a href="/admin/products">All Products</a>
            </li>
            <li>
              <i className="fa fa-bars"></i>
              <a href="/admin/categories">Categories</a>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="menu-icon fa fa-table"></i>Tables</a>
          <ul className="sub-menu children dropdown-menu">
            <li>
              <i className="fa fa-table"></i>
              <a href="tables-basic.html">Basic Table</a>
            </li>
            <li>
              <i className="fa fa-table"></i>
              <a href="tables-data.html">Data Table</a>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="menu-icon fa fa-th"></i>Forms</a>
          <ul className="sub-menu children dropdown-menu">
            <li>
              <i className="menu-icon fa fa-th"></i>
              <a href="forms-basic.html">Basic Form</a>
            </li>
            <li>
              <i className="menu-icon fa fa-th"></i>
              <a href="forms-advanced.html">Advanced Form</a>
            </li>
          </ul>
        </li>

        <h3 className="menu-title">Icons</h3>

        <li className="menu-item-has-children dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="menu-icon fa fa-tasks"></i>Icons</a>
          <ul className="sub-menu children dropdown-menu">
            <li>
              <i className="menu-icon fa fa-fort-awesome"></i>
              <a href="font-fontawesome.html">Font Awesome</a>
            </li>
            <li>
              <i className="menu-icon ti-themify-logo"></i>
              <a href="font-themify.html">Themefy Icons</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="widgets.html">
            <i className="menu-icon ti-email"></i>Widgets
          </a>
        </li>
        <li className="menu-item-has-children dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="menu-icon fa fa-bar-chart"></i>Charts</a>
          <ul className="sub-menu children dropdown-menu">
            <li>
              <i className="menu-icon fa fa-line-chart"></i>
              <a href="charts-chartjs.html">Chart JS</a>
            </li>
            <li>
              <i className="menu-icon fa fa-area-chart"></i>
              <a href="charts-flot.html">Flot Chart</a>
            </li>
            <li>
              <i className="menu-icon fa fa-pie-chart"></i>
              <a href="charts-peity.html">Peity Chart</a>
            </li>
          </ul>
        </li>

        <li className="menu-item-has-children dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="menu-icon fa fa-area-chart"></i>Maps</a>
          <ul className="sub-menu children dropdown-menu">
            <li>
              <i className="menu-icon fa fa-map-o"></i>
              <a href="maps-gmap.html">Google Maps</a>
            </li>
            <li>
              <i className="menu-icon fa fa-street-view"></i>
              <a href="maps-vector.html">Vector Maps</a>
            </li>
          </ul>
        </li>
        <h3 className="menu-title">Extras</h3>

        <li className="menu-item-has-children dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="menu-icon fa fa-glass"></i>Pages</a>
          <ul className="sub-menu children dropdown-menu">
            <li>
              <i className="menu-icon fa fa-sign-in"></i>
              <a href="page-login.html">Login</a>
            </li>
            <li>
              <i className="menu-icon fa fa-sign-in"></i>
              <a href="page-register.html">Register</a>
            </li>
            <li>
              <i className="menu-icon fa fa-paper-plane"></i>
              <a href="pages-forget.html">Forget Pass</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</aside>

  <div id="right-panel" className="right-panel">
    <header id="header" className="header">

      <div className="header-menu">

        <div className="col-sm-7">
          <a id="menuToggle" className="menutoggle pull-left">
            <i className="fa fa fa-tasks"></i>
          </a>
          <div className="header-left">
            <button className="search-trigger">
              <i className="fa fa-search"></i>
            </button>
            <div className="form-inline">
              <form className="search-form">
                <input className="form-control mr-sm-2" type="text" placeholder="Search ..." aria-label="Search" />
                <button className="search-close" type="submit">
                  <i className="fa fa-close"></i>
                </button>
              </form>
            </div>

            <div className="dropdown for-notification">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="notification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-bell"></i>
                <span className="count bg-danger">5</span>
              </button>
              <div className="dropdown-menu" aria-labelledby="notification">
                <p className="red">You have 3 Notification</p>
                <a className="dropdown-item media bg-flat-color-1" href="#">
                  <i className="fa fa-check"></i>
                  <p>Server #1 overloaded.</p>
                </a>
                <a className="dropdown-item media bg-flat-color-4" href="#">
                  <i className="fa fa-info"></i>
                  <p>Server #2 overloaded.</p>
                </a>
                <a className="dropdown-item media bg-flat-color-5" href="#">
                  <i className="fa fa-warning"></i>
                  <p>Server #3 overloaded.</p>
                </a>
              </div>
            </div>

            <div className="dropdown for-message">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="message" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="ti-email"></i>
                <span className="count bg-primary">9</span>
              </button>
              <div className="dropdown-menu" aria-labelledby="message">
                <p className="red">You have 4 Mails</p>
                <a className="dropdown-item media bg-flat-color-1" href="#">
                  <span className="photo media-left"><img alt="avatar" src="images/avatar/1.jpg" /></span>
                  <span className="message media-body">
                    <span className="name float-left">Jonathan Smith</span>
                    <span className="time float-right">Just now</span>
                    <p>Hello, this is an example msg</p>
                  </span>
                </a>
                <a className="dropdown-item media bg-flat-color-4" href="#">
                  <span className="photo media-left"><img alt="avatar" src="images/avatar/2.jpg" /></span>
                  <span className="message media-body">
                    <span className="name float-left">Jack Sanders</span>
                    <span className="time float-right">5 minutes ago</span>
                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                  </span>
                </a>
                <a className="dropdown-item media bg-flat-color-5" href="#">
                  <span className="photo media-left"><img alt="avatar" src="images/avatar/3.jpg" /></span>
                  <span className="message media-body">
                    <span className="name float-left">Cheryl Wheeler</span>
                    <span className="time float-right">10 minutes ago</span>
                    <p>Hello, this is an example msg</p>
                  </span>
                </a>
                <a className="dropdown-item media bg-flat-color-3" href="#">
                  <span className="photo media-left"><img alt="avatar" src="images/avatar/4.jpg" /></span>
                  <span className="message media-body">
                    <span className="name float-left">Rachel Santos</span>
                    <span className="time float-right">15 minutes ago</span>
                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-5">
          <div className="user-area dropdown float-right">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img className="user-avatar rounded-circle" src="images/admin.jpg" alt="User Avatar" />
            </a>

            <div className="user-menu dropdown-menu">
              <a className="nav-link" href="#">
                <i className="fa fa- user"></i>My Profile</a>

              <a className="nav-link" href="#">
                <i className="fa fa- user"></i>Notifications
                <span className="count">13</span></a>

              <a className="nav-link" href="#">
                <i className="fa fa -cog"></i>Settings</a>

              <a className="nav-link" href="#">
                <i className="fa fa-power -off"></i>Logout</a>
            </div>
          </div>

          <div className="language-select dropdown" id="language-select">
            <a className="dropdown-toggle" href="#" data-toggle="dropdown" id="language" aria-haspopup="true" aria-expanded="true">
              <i className="flag-icon flag-icon-us"></i>
            </a>
            <div className="dropdown-menu" aria-labelledby="language">
              <div className="dropdown-item">
                <span className="flag-icon flag-icon-fr"></span>
              </div>
              <div className="dropdown-item">
                <i className="flag-icon flag-icon-es"></i>
              </div>
              <div className="dropdown-item">
                <i className="flag-icon flag-icon-us"></i>
              </div>
              <div className="dropdown-item">
                <i className="flag-icon flag-icon-it"></i>
              </div>
            </div>
          </div>

        </div>
      </div>

    </header>

    <div className="breadcrumbs">
      <div className="col-sm-4">
        <div className="page-header float-left">
          <div className="page-title">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>
      <div className="col-sm-8">
        <div className="page-header float-right">
          <div className="page-title">
            <ol className="breadcrumb text-right">
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>
                <a href="#">Forms</a>
              </li>
              <li className="active">Basic</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    {content}
  </div>
  </span>

);

export default AdminLayout;
