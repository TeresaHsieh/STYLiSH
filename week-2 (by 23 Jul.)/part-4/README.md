# Week 2 Part 4

## Assignment

### Step 1: Shopping Cart Implementation

In the product page, we should handle `add to cart` action when user click on button. Before this, let's implement an universal structure and logic for shopping cart first.

Follow steps below to implement a shopping cart in the front-end:

1. Every page should get current shopping cart data from `localStorage` at start.
2. If there is no data in the `localStorage`, initialize it to an empty structure.
3. Show the number of items in cart icon.

### Step 2: Add to Cart Implementation

Now, when user click on `add to cart` button, add an item to our shopping cart structure. Never forget that we should always save latest shopping cart data back to `localStorage` for future use.

#### Special Reminder

Not now, but at the final, we will send our shopping cart data to [Check Out API](https://github.com/AppWorks-School/API-Doc/tree/master/Stylish#order-check-out-api) for checking out. So, it's important to give a look at [Check Out API](https://github.com/AppWorks-School/API-Doc/tree/master/Stylish#order-check-out-api) first.
