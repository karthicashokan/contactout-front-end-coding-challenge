import { render } from '@testing-library/react';
import ContextMenu from '../ContextMenu';
import React from "react";

const content = render(
    <ContextMenu
        className="test-menu"
        menuItem={(
            <div id="click-this">Click</div>
        )}
    >
        <div id="menu-item-1">Menu item 1</div>
        <div id="menu-item-1">Menu item 2</div>
    </ContextMenu>
);

test('Context menu: before click', () => {
    const contextMenuItem = content.container.querySelector('.context-menu-item-test-menu');
    const contextMenuContent = content.container.querySelector('.context-menu-content-test-menu');
    // Before click contextMenuItem should be present and contextMenuContent should not be present
    expect(contextMenuItem).toBeInTheDocument();
    !expect(contextMenuContent).toBeInTheDocument();
});