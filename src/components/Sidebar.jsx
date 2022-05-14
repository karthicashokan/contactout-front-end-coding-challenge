import React from 'react';
import PropTypes from 'prop-types';
import AccountMenu from './AccountMenu';
import searchIcon from '../assets/search-solid.svg';
import listsIcon from '../assets/th-list-solid.svg';
import menuIcon from '../assets/menu.svg';

/**
 * The menu items that will be rendered within the sidebar
 * @type {array}
 */
const MENU_ITEMS = [
    {
        icon: listsIcon,
        label: 'Lists',
        routePath: '/lists'
    },
    {
        icon: searchIcon,
        label: 'Search',
        routePath: '/search'
    }
];

/**
 * Renders the sidebar, which contains nav items
 */
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileMenuOpen: false
        }
    }

    /**
     * Returns a sidebar menu item
     * Consists of an menu icon and menu label
     * @param {object} menuItem
     * @returns {JSX.Element}
     */
    renderMenuItem = (menuItem) => {
        const { icon, label = '', routePath } = menuItem;
        const { goToPage } = this.props
        return (
            <li className="menu-item clickable" key={label.toLowerCase()} onClick={() => { goToPage(routePath) }}>
                <img className="menu-item-icon" alt={`icon-for-${label}`} src={icon} />
                <div className="menu-item-label small-text">{label}</div>
            </li>
        );
    }

    toggleMobileMenu = () => {
        this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen });
    }

    render() {
        const { user, goToPage } = this.props;
        const { mobileMenuOpen } = this.state;
        const menuItems = MENU_ITEMS.map((item, index) => this.renderMenuItem({
            key: `menu-item-${index}`,
            ...item
        }))
        return (
            <div className="sidebar">
                <div className="top-section">
                    <img className="contactout-logo clickable" alt="contactout-logo" src="logo-contactout.png" onClick={() => { goToPage('/') }} />
                    <ul className="nav-menu full-size">
                        {menuItems}
                    </ul>
                </div>
                <div className="bottom-section">
                    <div className="account-menu">
                        <AccountMenu user={user} goToPage={goToPage} />
                    </div>
                    <img className="header-menu mobile-size clickable" alt="menu-icon" src={menuIcon} onClick={this.toggleMobileMenu} />
                </div>
                { mobileMenuOpen && (
                    <ul className="nav-menu mobile-size">
                        {menuItems}
                    </ul>
                )}
            </div>
        );
    }
}

Sidebar.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        photoUrl: PropTypes.string
    }).isRequired,
    goToPage: PropTypes.func.isRequired
};

export default Sidebar;
