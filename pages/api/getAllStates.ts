import { NextApiRequest, NextApiResponse } from 'next';
import executeQuery from '../../lib/db';

const GetAllStates = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        res.status(500).json({ message: "Sorry we only accept GET requests" });
    }

    console.log(req.body.content);
    const result = await executeQuery('SELECT * FROM acf_wp_dsg1l.acfc_states ORDER BY ID', req.body.content);

	res.status(200).json({ result, method: req.method })
}

export default GetAllStates;