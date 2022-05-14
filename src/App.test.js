import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import React from "react";

const content = render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

test('renders app with sidebar and content', () => {
    const sideBar = content.container.querySelector('.sidebar');
    const appContent = content.container.querySelector('.app-content');
    expect(appContent).toBeInTheDocument();
    expect(sideBar).toBeInTheDocument();
});