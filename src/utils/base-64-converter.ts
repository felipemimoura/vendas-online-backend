import { LoginPayload } from 'src/auth/dtos/loginPayload.dto';

export const authorizationToLoginPayload = (
  authorization: string,
): LoginPayload | undefined => {
  const authorizationSlited = authorization.split('.');

  if (authorizationSlited.length < 3 || !authorizationSlited[1]) {
    return undefined;
  }

  return JSON.parse(
    Buffer.from(authorizationSlited[1], 'base64').toString('ascii'),
  );
};
