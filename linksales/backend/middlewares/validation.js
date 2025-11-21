// Validação de login / cadastro de usuário
export function validateUser(req, res, next) {
    const { email, senha } = req.body;
    const errors = []; 

    // 1. Validação de Email
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
        errors.push("Email inválido ou obrigatório. Deve ser uma string não vazia.");
    }  else if (!/^\S+@\S+\.\S+$/.test(email)) {
       errors.push("O formato do email não é válido.");
    }

    // 2. Validação de Senha
    if (!senha || typeof senha !== 'string') {
        errors.push("O campo senha é obrigatório.");
    } else if (senha.length < 8) {
        errors.push("A senha deve ter pelo menos 8 caracteres.");
    }

    // 3. Retorno Único e Consolidado
    if (errors.length > 0) {
        // Retorna 400 com todos os erros encontrados
        return res.status(400).json({ errors: errors }); 
    }

    next();
};

// Validação de produto
export function validateProduct(req, res, next) {
    const { nome_produto, preco, estoque } = req.body;
    const errors = [];

    // 1. Validação do Nome
    if (!nome_produto || typeof nome_produto !== 'string' || nome_produto.trim().length === 0) {
        errors.push("Nome do produto é obrigatório e não pode ser vazio.");
    }

    // 2. Validação do Preço
    if (typeof preco !== 'number' || isNaN(preco) || preco <= 0) {
        errors.push("Preço deve ser um número válido maior que zero.");
    }

    // Foi ajustado para permitir estoque 0, se for o caso de um item esgotado.
    if (typeof estoque !== 'number' || isNaN(estoque) || estoque < 0) { 
        errors.push("Estoque deve ser um número inteiro não negativo.");
    }

    // Retorno Consolidado
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
    }

    next();
};

