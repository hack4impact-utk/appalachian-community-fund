import { NextApiRequest, NextApiResponse } from 'next';
import executeQuery from '../../lib/db';

const GetAddresses = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        res.status(500).json({ message: "Sorry we only accept GET requests" });
    }

    const result = await executeQuery('SELECT * FROM acf_wp_dsg1l.acfc_post_addresses', req.body.content);

	res.json({ result, method: req.method })
}

export default GetAddresses;