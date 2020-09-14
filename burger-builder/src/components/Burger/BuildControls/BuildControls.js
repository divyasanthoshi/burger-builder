import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const Controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Meat', type: 'meat' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
];

const BuildControls = (props) => {
	const buildControls = Controls.map((ctrl) => {
		return (
			<BuildControl
				key={ctrl.label}
				label={ctrl.label}
				added={() => props.addIngredient(ctrl.type)}
				removed={() => props.removeIngredient(ctrl.type)}
				disabled={props.disabled[ctrl.type]}
			/>
		);
	});

	return (
		<div className={classes.BuildControls}>
			<p>Current Price: {props.price.toFixed(2)}</p>
			{buildControls}
			<button disabled={!props.purchasable} className={classes.OrderButton} onClick={props.ordered}>
				ORDER NOW
			</button>
		</div>
	);
};

export default BuildControls;
