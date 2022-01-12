class CarritoService {
    URL_CARRITO = 'https://61ba63c748df2f0017e5aaab.mockapi.io/carrito'

    async guardarCarritoService(carrito) {
        let carritoGuardado = await http.post(this.URL_CARRITO, carrito)
        return carritoGuardado
    }
}

const carritoService = new CarritoService()
