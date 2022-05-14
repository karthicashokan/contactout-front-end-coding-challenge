import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Renders a context menu (popover menu)
 */
class ContextMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false // Determines if the context menu is currently open
        }
    }

    /**
     * toggles the menuOpen state attribute
     */
    toggleMenu = () => {
        const { menuOpen } = this.state;
        this.setState({ menuOpen: !menuOpen });
    }

    render() {
        const { menuOpen } = this.state;
        const { menuItem, className } = this.props;
        return (
            <div className="context-menu">
                <div className={classNames('context-menu-item', `context-menu-item-${className}`, { open: menuOpen })} onClick={this.toggleMenu}>
                    {/* This is the clickable area that will toggle the menu */}
                    {menuItem}
                </div>
                <div className={classNames('context-menu-content', `context-menu-content-${className}`, { open: menuOpen })}>
                    {/* This is content of the context menu */}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

ContextMenu.propTypes = {
    menuItem: PropTypes.any.isRequired,
    className: PropTypes.string
};

export default ContextMenu;