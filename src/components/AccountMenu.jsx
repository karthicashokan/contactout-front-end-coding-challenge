import React from 'react'
import PropTypes from 'prop-types';
import ContextMenu from './ContextMenu';
import classNames from 'classnames';

/**
 * The menu and sub-menu lists to be shown within the account settings popover
 * @type {object}
 */
const MENU_TREE = {
    account: {
        label: 'Account',
        children: {
            personalData: {
                label: 'Personal data',
                routePath: ''
            },
            changeEmail: {
                label: 'Change Email',
                routePath: ''
            },
            changePassword: {
                label: 'Change Email',
                routePath: ''
            }
        }
    },
    exports: {
        label: 'Your Exports',
        children: {}
    },
    integrations: {
        label: 'Your Integrations',
        children: {}
    },
    logout: {
        label: 'Log out',
        routePath: '/logout'
    }
}

/**
 * Renders the Account settings popover
 */
class AccountMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: ''
        }
    }

    /**
     * Returns an individual menu item
     * @param menuItem
     * @param menuKey
     * @returns {JSX.Element}
     */
    renderMenuItem = (menuItem, menuKey) => {
        const { goToPage } = this.props;
        const { active } = this.state;
        const { label, routePath = null } = menuItem;
        const isActive = active === menuKey;

        const onClickAccountMenu = () => {
            // If routePath is present, navigate to it
            if (routePath) {
                goToPage(routePath)
            } else {
                // Else set the current menuKey to be the active key
                this.setState({ active: menuKey });
            }
        };

        return (
            <div className={classNames('account-menu-item', { active: isActive })} key={menuKey} onClick={onClickAccountMenu}>
                <div className="label clickable">
                    <span className="underlined">{label}</span>
                    {isActive && <span className="active-chevron">&#8250;</span>}
                </div>
            </div>
        );
    }

    render() {
        const { user } = this.props;
        const { active } = this.state;
        const menuItem = <img className="user-icon clickable" src={user.photoUrl} />;
        const currentActiveMenu = active && MENU_TREE[active]?.children;
        const hasRightMenu = currentActiveMenu && Object.keys(currentActiveMenu).length > 0;
        return (
            <ContextMenu menuItem={menuItem}>
                <div className="account-details">
                    <div className="account-name">
                        <img className="user-icon small" src={user.photoUrl} />&nbsp;&nbsp;<small><b>{`${user.firstName} ${user.lastName}`}</b></small>
                    </div>
                    <hr/>
                    <div className="account-actions">
                        <div className="left-menu">
                            {/* Account main menu items */}
                            {Object.keys(MENU_TREE).map((key) => this.renderMenuItem(MENU_TREE[key], key) )}
                        </div>
                        <div className={classNames('right-menu', { 'has-items': hasRightMenu })}>
                            {/* Account sub menu items, for the selected main menu item */}
                            {Object.keys(currentActiveMenu).map((key) => this.renderMenuItem(currentActiveMenu[key], key) )}
                        </div>
                    </div>
                </div>
            </ContextMenu>
        );
    }
}

AccountMenu.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        photoUrl: PropTypes.string
    }).isRequired,
};

export default AccountMenu;