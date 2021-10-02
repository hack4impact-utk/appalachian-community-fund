import { NextApiRequest, NextApiResponse } from 'next';

//https://morioh.com/p/654ca1516b32 Great tutorial

const TestDBCall = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        res.status(500).json({ message: "Sorry we only accept GET requests" });
    }

	res.json({ hello: 'world', method: req.method })
}

export default TestDBCall;