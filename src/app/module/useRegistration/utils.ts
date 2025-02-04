import jwt from 'jsonwebtoken';

export const createToken = (
  JwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string,
): string => {
  return jwt.sign(
    {
      ...JwtPayload, // Spread the payload properties
    },
    secret,
    { expiresIn },
  );
};
