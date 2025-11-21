import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

//Verifica se o cabeçalho de Autorização existe e tem o formato correto
  if (!authHeader || !authHeader.startsWith("bearer")) {
    return res.status(401).json({ error: "Formato de token inválido. Use Beatet <token>" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ex: { id: 5, email: "...", role: "..."}
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }
};
