# Week 1 Part 4

## Assignment

### Step 1: Complete Search Feature

Apply [Product Search API](https://github.com/AppWorks-School/API-Doc/blob/master/Stylish/README.md#product-search-api) to build search feature for our customers.

---

### Step 2: Complete Paging Feature

At the same time, we notice there is a `paging` feature supported by `Product List API`.  
We can get `paging` data from `Product List API` and set it as parameter of request for next page.

#### Infinite Scroll

Listen to scroll action of browser!  
If user almost scroll down to the bottom, we should load and show next page automatically.

Hints:
1. Check `scroll` event in the `window` object.
2. Check `getBoundingClientRect()` method.
