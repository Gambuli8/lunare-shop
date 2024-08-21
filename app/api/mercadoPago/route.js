import { Preference, MercadoPagoConfig } from 'mercadopago'

const Client = new MercadoPagoConfig({
  access_token: process.env.MP_ACCESS_TOKEN
})

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { productos } = req.body.items
    const URL = 'http://localhost:3000'
    try {
      const preference = new Preference(Client).create({
        body: {
          items: [
            productos.map(product => ({
              title: product.name,
              unit_price: product.price,
              quantity: product.quantity
            }))
          ],
          auto_return: 'approved',
          back_urls: {
            success: `${URL}/success`,
            failure: `${URL}/failure`,
            pending: `${URL}/pending`
          },
          notification_url: `${URL}/api/notifications`
        }
      })
      const response = await preference
      res.status(200).json({ id: response.id })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

// axios.post('/api/mercadoPago', async (req, res) => {
//   try {
//     const products = req.body
//     const body = {
//       items: [
//         {
//           title: products.name,
//           unit_price: Number(products.price),
//           quantity: Number(products.quantity)
//         }
//       ],
//       auto_return: 'approved',
//       back_urls: {
//         success: 'http://localhost:3000/success',
//         failure: 'http://localhost:3000/failure',
//         pending: 'http://localhost:3000/pending'
//       },
//       notification_url: 'http://localhost:3000/api/notifications'
//     }

//     const preference = new Preference(Client)
//     const response = await preference.create({ body })
//     res.json({
//       id: response.id
//     })
//   } catch (error) {
//     console.log(error)
//   }
// })

export default handler
