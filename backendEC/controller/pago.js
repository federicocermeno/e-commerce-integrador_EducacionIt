// SDK de Mercado Pago
import mercadopago from "mercadopago"

// Agrega credenciales
mercadopago.configure({
  access_token: "APP_USR-8130821918232057-020622-a313abcee827b3a4353403817313bf91-183526366",
});


console.log('configuracion de SDK de Mercadopago OK! ')


const feedBack = (req,res) => {
    let infoPago ={
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	};
    console.log(infoPago)

    res.redirect('/')
}



export default {
    feedBack
}