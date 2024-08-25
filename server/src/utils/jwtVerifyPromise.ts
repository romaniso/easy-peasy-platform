import jwt from "jsonwebtoken";

export const jwtVerifyPromise = async (
  token: string,
  secretOrPublicKey: jwt.Secret,
  options?: jwt.VerifyOptions
) =>
  new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, options, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as jwt.JwtPayload);
      }
    });
  });
