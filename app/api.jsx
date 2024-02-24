const Productos = {
  getProducts: {
    method: 'get',
    url: '/productos'
  },
  getProduct: {
    method: 'get',
    url: '/productos/:id'
  },
  filteredProducts: {
    method: 'get',
    url: '/productos/:name'
  },

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
  },

  getProduct: {
    list: async id => {
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
            .find(product => product.id === id)
        })
        .catch(err => console.log(err))
    }
  },

  filteredProducts: {
    list: async name => {
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
            .filter(product => product.name === name)
        })
        .catch(err => console.log(err))
    }
  }
}

const ProductosDestacados = {
  getProducts: {
    list: async () => {
      return await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSecjYBbnptjnuVMG641pLNMVMArULxrBnqUn2AT3BwYP0e1uvkcXvRInQBAoj79_Yt7jOBVz0dXFBN/pub?output=tsv')
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

module.exports = { Productos, ProductosDestacados }
