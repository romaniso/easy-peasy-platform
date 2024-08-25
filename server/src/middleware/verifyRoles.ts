import { RoleName } from "../enums/role";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "./verifyJWT.js";

export function verifyRoles(roles: RoleName[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!(req as AuthenticatedRequest)?.roles) return res.sendStatus(401);
    const result = (req as AuthenticatedRequest).roles
      .map((role) => roles.includes(role))
      .some((val) => val);
    if (!result) return res.sendStatus(401);
    next();
  };
}
