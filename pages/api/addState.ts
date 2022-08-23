import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import executeQuery, { executeInsert, executeQueryErrorCheck } from '../../lib/db';

const AddState: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(500).json({ message: "Sorry we only accept POST requests" });
    }

    const result = await executeQuery('INSERT INTO acf_wp_dsg1l.acfc_post_states (post_id, state_id) VALUES (?, ?)', [req.body.postId, req.body.stateId]);

	res.json({ result, method: req.method })
}

export default AddState;