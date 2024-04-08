import db from '../db'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { accountname, address1, address2, address3 } = req.body
    //const create_time = new Date();
    try {
      const result = await db.query('INSERT INTO majime_accounts(accountname, address1, address2, address3) VALUES($1, $2, $3, $4) RETURNING *', [accountname, address1, address2, address3])
      res.status(200).json(result.rows[0])
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong.' })
    }
  } else {
    res.status(405).json({ message: 'We only accept POST' })
  }
}