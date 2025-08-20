import ClienteModel from "../models/cliente.model.js";

class ClienteController {
    static async criar(req, res) {
        try {
            const { nome, telefone, email, data_nascimento, endereco } = req.body;
            if(!nome || !telefone || !email || !data_nascimento || !endereco) {
                return res.status(400).json( { msg: "Os parâmetros da requisição estão incorretos ou ausentes."} ); 
            }

            const cliente = await ClienteModel.create({
                nome,
                telefone,
                email,
                data_nascimento,
                endereco
            });
            return res.status(201).json({ msg: "Cliente criado com sucesso!", cliente: cliente});
        } catch (error) {
            return res.status(400).json( { msg: "Os parâmetros da requisição estão incorretos ou ausentes." }, { error: error.message });
        }
    }

   static async listarTodos(req, res) {
        try {
            const clientes = await ClienteModel.findAll();
            if (clientes.length === 0) {
                return res.status(404).json({ msg: "Nenhum cliente encontrado!" });
            }

            return res.status(200).json(clientes);
        } catch (error) {
            return res.status(400).json({ msg: "Os parâmetros da requisição estão incorretos ou ausentes.", erro: error.message });
        }
    }

    static async ListarPorEmail(req, res) {
        try {
            const { email } = req.params;
            const cliente = await ClienteModel.findOne({ where: { email } });
            if(!cliente) {
                return res.status(404).json({ msg: "Nenhum cliente encontrado!" });
            }

            return res.status(200).json(cliente);

        } catch (error) {
            return res.status(400).json( { msg: "Os parâmetros da requisição estão incorretos ou ausentes.",  erro: error.message });
        }
    }

    static async ListarPorTelefone(req, res) {
        try {
            const { telefone } = req.params;
            const cliente = await ClienteModel.findOne({ where: { telefone } });

            if(!cliente) {
                return res.status(404).json({ msg: "Nenhum cliente encontrado!" });
            }

            return res.status(200).json(cliente);

        } catch (error) {
            return res.status(400).json( { msg: "Os parâmetros da requisição estão incorretos ou ausentes.",  erro: error.message });
        }
    }

   static async ListarPorId(req, res) {
        try {
            const { id } = req.params;
            const cliente = await ClienteModel.findByPk(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            return res.status(200).json(cliente);
        } catch (error) {
            return res.status(400).json( { msg: "Os parâmetros da requisição estão incorretos ou ausentes.",  erro: error.message });
        }
    }

   static async atualizar(req, res) {
        try {
            const id = (req.params.id);
            const { nome, telefone, email, data_nascimento, endereco } = req.body;
            const cliente = await ClienteModel.update({
                nome,
                telefone,
                email,
                data_nascimento,
                endereco
            }, { where: { id } });

            if (!cliente || cliente.length === 0) {
                return res.status(404).json({ msg: "Cliente não encontrado." });
            }

            cliente.nome = nome || cliente.nome;
            cliente.telefone = telefone || cliente.telefone;
            cliente.email = email || cliente.email;
            cliente.data_nascimento = data_nascimento || cliente.data_nascimento;
            cliente.endereco = endereco || cliente.endereco;

            return res.status(200).json({ msg: "Cliente atualizado com sucesso!" });

        } catch (error) {
            return res.status(400).json({ msg: "Os parâmetros da requisição estão incorretos ou ausentes.",  error: error.message });
        }
    }

   static async deletarPorId(req, res) {
        try {
            const  id  = (req.params.id);
            const cliente = await ClienteModel.destroy({ where: { id } });

            if (!cliente) {
                return res.status(404).json({ msg: "Cliente não encontrado." });
            }
            return res.status(200).json({ msg: "Operação concluída com sucesso!" });

        } catch (error) {
            return res.status(400).json({ msg: "Os parâmetros da requisição estão incorretos ou ausentes.", erro: error.message });
        }
    }

    static async TotalClientes(req, res) {
        try {
            const total = await ClienteModel.count();
            if(total === 0) {
                return res.status(404).json({ msg: "Nenhum cliente encontrado!" });
            }

            return res.status(200).json(total);

        } catch (error) {
            return res.status(400).json({ msg: "Os parâmetros da requisição estão incorretos ou ausentes.", erro: error.message });
        }
    }
}

export default ClienteController;