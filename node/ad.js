const pricePerItem = {
  products: {
    America: 1000,
    England: 2000,
    Germany: 1500,
    Portland: 1700,
  },
  options: 500,
};

const sale = {
  products: {
    Germany: 20,
    Portland: 20,
  },
};

function applyDiscount(orderType, orderCounts) {
  let subtotal = 0;
  const discountAdapter = {
    products: {
      applyDiscount: (country, count) => {
        subtotal += Math.floor(
          (count * pricePerItem[orderType][country]) /
            (100 - sale[orderType][country])
        );
      },
      NONDiscount: (country, count) => {
        subtotal += count * pricePerItem[orderType][country];
      },
    },
    options: {
      applyOption: (count, price) => {
        subtotal += price * count;
      },
    },
  };

  for (const [country, count] of orderCounts[orderType].entries()) {
    if (orderType === "options") {
      subtotal += discountAdapter[orderType].applyOption(
        count,
        pricePerItem[orderType]
      );
    } else if (
      orderType === "products" &&
      sale[orderType][country] !== undefined
    ) {
      discountAdapter[orderType].applyDiscount(country, count);
    } else {
      discountAdapter[orderType].NONDiscount(country, count);
    }
  }

  return subtotal;
}

const orderCounts = {
  products: new Map([
    ["Germany", 2],
    ["America", 3],
  ]),
  options: new Map([
    ["option1", 4],
    ["option2", 2],
  ]),
};

const productsSubtotal = applyDiscount("products", orderCounts);

console.log(orderCounts.products);
console.log(orderCounts.options);
console.log("orderCounts:", orderCounts);
console.log("Products Subtotal:", productsSubtotal);
console.log("Options Subtotal:", optionsSubtotal);
