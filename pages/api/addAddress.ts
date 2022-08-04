import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import executeQuery, { executeInsert, executeQueryErrorCheck } from '../../lib/db';

const AddAddress: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        res.status(500).json({ message: "Sorry we only accept POST requests" });
    }

    const result = await executeQuery('SELECT * FROM acf_wp_dsg1l.acfc_post_addresses', req.body.content);
    //await executeQuery('INSERT INTO acf_wp_dsg1l.acfc_post_addresses (post_id, post_address, post_state, post_zipcode) VALUES ?', [req.body.postId, req.body.address, req.body.state || null, req.body.zip || null]);
    //For testing only, do not uncomment: await executeQuery(`INSERT INTO acf_wp_dsg1l.acfc_post_addresses (post_id, post_address, post_state, post_zipcode) VALUES ("${req.body.postId}", "${req.body.address}", ${req.body.state || 'null'}, ${req.body.zip || null})`, []);

	res.json({ result, method: req.method })
}

export default AddAddress;