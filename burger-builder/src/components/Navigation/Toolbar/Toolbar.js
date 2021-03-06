import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../../components/Logo/Logo';

const Toolbar = () => {
	return (
		<header className={classes.Toolbar}>
			<div>MENU</div>
			<Logo />
			<nav>...</nav>
		</header>
	);
};

export default Toolbar;
