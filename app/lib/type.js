export var CartAction;
(function (CartAction) {
  CartAction['ADD_TO_CART'] = 'ADD_TO_CART';
  CartAction['REMOVE_FROM_CART'] = 'REMOVE_FROM_CART';
  CartAction['UPDATE_CART'] = 'UPDATE_CART';
  CartAction['UPDATE_DISCOUNT'] = 'UPDATE_DISCOUNT';
  CartAction['UPDATE_BUYER_IDENTITY'] = 'UPDATE_BUYER_IDENTITY';
})(CartAction || (CartAction = {}));

export var CustomerAction;
(function (CustomerAction) {
  CustomerAction['CUSTOMER_EMAIL_CONSENT'] = 'CUSTOMER_EMAIL_CONSENT';
})(CustomerAction || (CustomerAction = {}));