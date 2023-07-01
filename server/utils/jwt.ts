import pkg from 'jsonwebtoken'
const { sign, decode, verify } = pkg;

const secret = 'secret'
const expiresIn = '1h'

// 生成JWT
export const generateJWT = (payload: object) => {
  return sign(payload, secret, { expiresIn });
}

// 解析JWT
export const decodeJWT = (token: string) => {
  return decode(token);
}

// 校验JWT
export const verifyJWT = (token: string) => {
  return verify(token, secret);
}

