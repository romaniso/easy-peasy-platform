import jwt from "jsonwebtoken";

export const jwtVerifyPromise = (
  token: string,
  secretOrPublicKey: jwt.Secret,
  options?: jwt.VerifyOptions
) => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, options, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as jwt.JwtPayload);
      }
    });
  });
};
