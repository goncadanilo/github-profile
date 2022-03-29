/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';
import { auth } from 'src/service/github';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { code } = req.query;
  const response = await auth.post('/', null, {
    params: {
      client_id: process.env.GITHUB_APP_CLIENT_ID,
      client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
      code,
    },
  });

  const token = response.data.access_token;

  if (token) {
    setCookie({ res }, 'github-token', token, {
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });
    return res.redirect('/dashboard');
  }

  return res.redirect('/');
}
