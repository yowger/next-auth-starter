import jwt, { JwtPayload } from "jsonwebtoken"

interface SignOption {
    expiresIn?: string | number
}

const DEFAULT_SIGN_OPTION: SignOption = {
    expiresIn: "1h",
}

export function signJwtAccessToken(
    payload: JwtPayload,
    options: SignOption = DEFAULT_SIGN_OPTION
): string {
    const secret_key = process.env.SECRET_KEY
    const token = jwt.sign(payload, secret_key!, options)

    return token
}

export function verifyJwt(token: string): JwtPayload | null {
    try {
        const secretKey = process.env.SECRET_KEY
        const decoded = jwt.verify(token, secretKey!) as JwtPayload

        return decoded
    } catch (error) {
        console.error("Error verifying JWT:", error)
        return null
    }
}

export function decodeJwt(token: string): JwtPayload | null {
    try {
        const secretKey = process.env.SECRET_KEY
        const decoded = jwt.verify(token, secretKey!) as JwtPayload

        return decoded
    } catch (error) {
        console.error("Error decoding JWT:", error)
        return null
    }
}
