import jwt from 'jsonwebtoken';

export const createToken = (
  JwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string,
): string => {
  // @ts-expect-error signin
  return jwt.sign(
    {
      ...JwtPayload, // Spread the payload properties
    },
    secret,
    { expiresIn },
  );
};
