import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // since state ingredients are an object, must find a way to transform
    // them into an array of igredients.  Object Object is a default javascript
    // object that has a keys method which extracts the keys of a given object
    // and turns them into an array
    // const test = Object.keys(props.ingredients);
    // console.log(test);
    // const test2 = test.map(igKey => {
    //     return [...Array(props.ingredients[igKey])];
    // })
    // console.log(test2);
    // const test3 = test.map(ingKey => {
    //         return [...Array(props.ingredients[ingKey])].map((_, i) => {
    //             return <BurgerIngredient key={ingKey + i} type={ingKey} />;
    //         });
    //     });
    // console.log(test3);

    // _ as an argument in the second .map() call is just a blank
    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])].map((_, i) => {
                // console.log([...Array(props.ingredients[ingKey])]);
                // console.log(ingKey);
                // console.log("value of i: " + i);
                return <BurgerIngredient key={ingKey + i} type={ingKey} />;
            });
        });
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;