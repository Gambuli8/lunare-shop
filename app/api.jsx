const Productos = {
  getProducts: {
    list: async () => {
      return await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSpv9p-CMI9c3oTr1ywNcM400pZPZpoUeWTlYxhgb0LbI-ObM2MoHbDSVStiCOGkhIuWLsvoi2LcbEa/pub?output=tsv')
        .then(res => res.text())
        .then(text => {
          return text
            .split('\n')
            .slice(1)
            .map(row => {
              const [id, product, name, category, material, description, price_ind, price_par, stock, image] = row.split('\t')
              return { id, product, name, category, material, description, price_ind, price_par, stock: parseInt(stock), image }
            })
        })
        .catch(err => console.log(err))
    }
  }
}

export default Productos
