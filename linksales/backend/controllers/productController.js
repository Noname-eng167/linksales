import ProductService, { ProductNotFoundError } from '../service/productService.js';

const ProductController = {
  
  // Criar novo produto (Ajustado para erro genérico do Service)
  async create(req, res) {
    try {
      // Remoção da validação redundante do corpo (será feita no middleware/model)
      
      const newProduct = await ProductService.createProduct(req.body);
      return res.status(201).json(newProduct);
    } catch (error) {
      // Captura erros de validação do Service/Model (preco <= 0, estoque < 0)
      if (error.name === 'SequelizeValidationError' || error.message.includes('inválido')) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  },

  // Listar todos os produtos
  async list(_req, res) {
    try {
      const products = await ProductService.getAllProducts();
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Buscar produto por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductsById(id);
      
      // Se o Service retorna null, tratamos aqui:
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      return res.json(product);
      
    } catch (error) {
l:
      if (error.name === 'InvalidIdError' || error.name === 'SequelizeDatabaseError') {
        return res.status(400).json({ error: 'ID fornecido é inválido' });
      }
      
      return res.status(500).json({ error: error.message });
    }
  },

  // Atualizar produto 
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      
      const updatedProduct = await ProductService.updateProduct(id, data);
      
      return res.status(200).json(updatedProduct);

    } catch (error) {

      if (error instanceof ProductNotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      
      if (error.name === 'SequelizeValidationError' || error.message.includes('inválido')) {
        return res.status(400).json({ error: error.message });
      }
      
      return res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      // O service lançará ProductNotFoundError se não puder deletar
      await ProductService.deleteProduct(id);
      
      return res.status(204).send(); // 204 No Content

    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
};

export default ProductController;