import Product from "../models/product.js";

// Definição da classe de erro personalizada para 404
export class ProductNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ProductNotFoundError';
    this.status = 404; 
  }
}

class ProductService {

  // Listar todos os produtos (Adicionado do código anterior)
  async getAllProducts() {
    return await Product.findAll();
  }

  async createProduct(data) {
    const newProduct = await Product.create(data);
    return newProduct;
  }

  // Buscar produto por ID (show)
  async getProductsById(id) {
    const product = await Product.findByPk(id);
    return product; 
  }

  // Atualizar produto (update)
  async updateProduct(id, data) {

    // 1. Busca o produto para garantir que ele exista
    const product = await Product.findByPk(id);

    if (!product) {
      throw new ProductNotFoundError(`Produto com ID ${id} não encontrado.`);
    }

    if (data.preco !== undefined) {
      if (typeof data.preco !== 'number' || data.preco <= 0) {
        throw new Error("Preço inválido. Deve ser um número positivo.");
      }
    }

    if (data.estoque !== undefined) {
      // Estoque geralmente pode ser 0
      if (typeof data.estoque !== 'number' || data.estoque < 0) {
        throw new Error("Estoque inválido. Não pode ser negativo.");
      }
    }

    // 3. Atualiza no banco
    const updatedProduct = await product.update(data);
    return updatedProduct;
  }


  // Deletar produto
  async deleteProduct(id) {
    const result = await Product.destroy({
      where: { id_produto: id } // Garante que a deleção usa o campo correto
    });

    if (result === 0) {
      throw new ProductNotFoundError("Produto não encontrado para exclusão");
    }
    return true;
  }
}
 
export default new ProductService();