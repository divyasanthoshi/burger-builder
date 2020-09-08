import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./burger.module.css";

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((bgKey) => {
      return [...Array(props.ingredients[bgKey])].map((_, i) => {
        return <BurgerIngredient key={bgKey + i} type={bgKey} />;
      });
    })
    .reduce((acc, e) => {
      return acc.concat(e);
    }, []);
  console.log(transformedIngredients);
  if (transformedIngredients.length === 0) {
    transformedIngredients = "please start adding some ingredients!";
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
