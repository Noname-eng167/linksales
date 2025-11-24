export function validateUser(req, res, next) {
    // 🟢 ALTERADO: Agora lê 'password' do corpo da requisição
    const { email, password, senha } = req.body; 
    const errors = [];

    // Aceita 'password' OU 'senha' (para compatibilidade)
    const senhaRecebida = password || senha;

    // 1. Validação de Email
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
        errors.push("O campo email é obrigatório.");
    } 

    // 2. Validação de Senha
    if (!senhaRecebida || typeof senhaRecebida !== 'string') {
        errors.push("O campo senha é obrigatório.");
    } else if (senhaRecebida.length < 6) { // Ajuste o tamanho conforme sua regra
        errors.push("A senha deve ter pelo menos 6 caracteres.");
    }

    // 3. Retorno de Erros
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors }); 
    }

    next();
};

// Validação de produto (Mantenha como está se não quiser mexer)
export function validateProduct(req, res, next) {
    const { nome_produto, preco, estoque } = req.body;
    const errors = [];

    if (!nome_produto) errors.push("Nome obrigatório.");
    if (typeof preco !== 'number' || preco <= 0) errors.push("Preço inválido.");
    if (typeof estoque !== 'number' || estoque < 0) errors.push("Estoque inválido.");

    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
    }

    next();
};