/* -------------
1. Here in getAllCards the cards with status true will fetch 
2. and in deleteCard will not delete from database 
here only changing the values to false. 
If status is true not deleted and if status false deleted.
  ----------------------- */

module.exports.getAllCards = `select * from tbl_cards 
    where status = true 
    order by card_order`;

module.exports.deleteCard = `update tbl_cards 
    set status = false 
    where card_id = $1 
    returning card_id`;

