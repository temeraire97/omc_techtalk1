/**
 * @example 함수는 하나의 책임(리턴)을 갖는다.
 * 함수란? 매개변수를 받아 특정 작업을 수행하고 결과를 반환하는 코드 블록
 * 즉, 결과는 하나의 값(상태를 다룬다면 상태)이다.
 *
 * function get_item_by_name(item_name) {
 *   const item = shopping_cart.find(item => item.name === item_name);
 *   return item;
 * }
 *
 * @example 암묵적 리턴
 * 특정 상태/데이터 변화 or 다른 함수 호출
 * 암묵적 리턴은 함수내에 없어야 한다.(함수 호출 체인 방지)
 *
 * function remove_item_from_cart(item_name) {
 *   const item = get_item_by_name(item_name);
 *   const index = shopping_cart.indexOf(item);
 *
 *   shopping_cart.splice(index, 1); // 암묵적 리턴
 *   calc_cart_total(); // 암묵적 리턴
 * }
 *
 * @example let 사용 지양
 * let은 재할당이 가능하기 때문에 예측 불가능한 상태를 가질 수 있다.
 * 특히 전역 변수로 사용하는 것은 권장하지 않는다.(같은 스코프여도)
 *
 * !BAD
 * ! let shopping_cart_total = 0;
 * ! for (var i = 0; i < shopping_cart.length; i++) {
 * !   var item = shopping_cart[i];
 * !   shopping_cart_total += item.price;
 * ! }
 *
 * ?GOOD
 * ? const cart_total = shopping_cart.reduce((total, item) => total + item.price, 0);
 *
 */

/**
 * @description 장바구니에 아이템을 추가하는 함수
 */
var shopping_cart = [];
var shopping_cart_total = 0;

function add_item_to_cart(name, price) {
  shopping_cart.push({
    name: name,
    price: price,
  });
  calc_cart_total();
}

function update_shipping_icons() {
  var buy_buttons = get_buy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if (item.price + shopping_cart_total >= 20) button.show_free_shopping_icon();
    else button.hide_free_shopping_icon();
  }
}

function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.1);
}

function calc_cart_total() {
  shopping_cart_total = 0;
  for (var i = 0; i < shopping_cart.length; i++) {
    var item = shopping_cart[i];
    shopping_cart_total += item.price;
  }
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}
