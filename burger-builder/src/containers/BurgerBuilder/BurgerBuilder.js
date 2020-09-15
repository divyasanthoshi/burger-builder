import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal.js';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
	};

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((igKey) => ingredients[igKey])
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		this.setState({
			purchasable: sum > 0,
		});
	};

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const newCount = oldCount + 1;
		console.log(newCount);
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = newCount;
		const oldPrice = this.state.totalPrice;
		const priceAddition = INGREDIENT_PRICES[type];
		const updatedPrice = oldPrice + priceAddition;
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: updatedPrice,
		});
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		const updatedIngredients = {
			...this.state.ingredients,
		};
		const oldCount = this.state.ingredients[type];
		if (oldCount !== 0) {
			const newCount = oldCount - 1;
			updatedIngredients[type] = newCount;
			const oldPrice = this.state.totalPrice;
			const priceSubtraction = INGREDIENT_PRICES[type];
			const updatedPrice = oldPrice - priceSubtraction;
			this.setState({
				ingredients: updatedIngredients,
				totalPrice: updatedPrice,
			});
		}
		this.updatePurchaseState(updatedIngredients);
	};

	purchaseHandler = () => {
		this.setState({
			purchasing: true,
		});
	};
	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false,
		});
	};

	continueCheckoutHandler = () => {
		console.log('Checkout');
	};

	render() {
		const disabledInfo = { ...this.state.ingredients };
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} canceled={this.purchaseCancelHandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.continueCheckoutHandler}
            price={this.state.totalPrice}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredients={this.state.ingredients}
					addIngredient={this.addIngredientHandler}
					removeIngredient={this.removeIngredientHandler}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
					disabled={disabledInfo}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
