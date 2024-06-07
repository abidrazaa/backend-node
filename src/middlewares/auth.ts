/* eslint-disable @typescript-eslint/ban-ts-comment */
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '@constants/app';

import UserModel from '@models/user';
import { WithAuthRequestMiddleware } from 'types/common';

type TokenQuery = {
  token: string;
  id: string;
};

export const isAdmin: WithAuthRequestMiddleware<TokenQuery, TokenQuery> = async (
  req,
  res,
  next,
) => {
  // const { email } = req.body;

  const tokenInReq = getAuthToken(req.headers?.authorization);

  // receiving token from the header
  const token = tokenInReq || req.body.token || req.query.token;

  if (token) {
    try {
      // decode token with TOKEN key to extract the user
      const decoded = jwt.verify(token, JWT_SECRET_KEY) as jwt.JwtPayload;

      // saving the current user in req.user
      req.user = decoded;

      // checking if the logged in user is ADMIN or not
      // @ts-ignore
      // const user = await UserModel.findOne({ _id: decoded?._id }).select('-password');
      const user = await UserModel.findOne({ _id: decoded?._id, userType: 'ADMIN' }).select(
        '-password',
      );

      if (!user) {
        // if not admin
        return res.status(403).json({ err: 'Not allowed to perform operation' });
      }

      // if admin, pass to the next function call
      return next();
    } catch (error) {
      return res.status(401).json({ msg: 'Invalid User Auth Token', err: error.message });
    }
  } else {
    return res.status(400).json({ err: 'No Auth Token Found' });
  }
};

export const checkAuth: WithAuthRequestMiddleware<TokenQuery, TokenQuery> = async (
  req,
  res,
  next,
) => {
  try {
    const tokenInReq = getAuthToken(req.headers?.authorization);

    // receiving token from the header
    const token = tokenInReq || req.body.token || req.query.token;

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY) as jwt.JwtPayload;
        req.user = decoded;

        // @ts-ignore
        const user = await UserModel.findOne({ _id: decoded?._id }).select('-password');

        if (!user) {
          return res.status(500).json({ err: 'Auth failed' });
        }
        return next();
      } catch (error) {
        return res.status(401).json({ msg: 'Invalid User Auth Token', err: error.message });
      }
    } else {
      return res.status(400).json({ err: 'No Auth Token Found' });
    }
  } catch (error) {
    return res.status(500).json({ err: 'Something went wrong!' });
  }
};

export const checkSameUser: WithAuthRequestMiddleware<TokenQuery, TokenQuery> = async (
  req,
  res,
  next,
) => {
  try {
    const { id: idFromQuery } = req.query;
    const { id: idFromParams } = req.params;
    const tokenInReq = getAuthToken(req.headers?.authorization);

    // receiving token from the header
    const token = tokenInReq || req.body.token || req.query.token;

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY) as jwt.JwtPayload;
        req.user = decoded;

        // @ts-ignore
        const tokenId = decoded?._id;

        const foundInQuery = idFromQuery === tokenId;
        const foundInParams = idFromParams === tokenId;

        const allowed = foundInQuery || foundInParams;

        if (!allowed) {
          return res.status(403).json({ err: 'Not allowed to perform operation' });
        }

        return next();
      } catch (error) {
        return res.status(401).json({ msg: 'Invalid User Auth Token', err: error.message });
      }
    } else {
      return res.status(400).json({ err: 'No Auth Token Found' });
    }
  } catch (error) {
    return res.status(500).json({ err: 'Something went wrong!' });
  }
};

export const checkSameUserOrAdmin: WithAuthRequestMiddleware<TokenQuery, TokenQuery> = async (
  req,
  res,
  next,
) => {
  try {
    const { id: idFromQuery } = req.query;
    const { id: idFromParams } = req.params;
    const tokenInReq = getAuthToken(req.headers?.authorization);

    // receiving token from the header
    const token = tokenInReq || req.body.token || req.query.token;

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY) as jwt.JwtPayload;
        req.user = decoded;

        // @ts-ignore
        const tokenId = decoded?._id;

        const foundInQuery = idFromQuery === tokenId;
        const foundInParams = idFromParams === tokenId;

        let allowed = foundInQuery || foundInParams;

        if (!allowed) {
          allowed = !!(await UserModel.findOne({ _id: tokenId, userType: 'ADMIN' }).select(
            '-password',
          ));
        }

        if (!allowed) {
          return res.status(403).json({ err: 'Not allowed to perform operation' });
        }

        return next();
      } catch (error) {
        return res.status(401).json({ msg: 'Invalid User Auth Token', err: error.message });
      }
    } else {
      return res.status(400).json({ err: 'No Auth Token Found' });
    }
  } catch (error) {
    return res.status(500).json({ err: 'Something went wrong!' });
  }
};

const getAuthToken = (authHeader?: string) => {
  if (!authHeader) {
    return '';
  }

  const [, tokenInReq] = authHeader.split('Bearer ');

  return tokenInReq;
};
