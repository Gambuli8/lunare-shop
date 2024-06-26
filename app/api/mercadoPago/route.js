import { Preference, MercadoPagoConfig } from 'mercadopago'

const Client = new MercadoPagoConfig({
  access_token: process.env.MP_ACCESS_TOKEN
})

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { productos } = req.body
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
      res.status(200).json({ url: response.init_point })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
