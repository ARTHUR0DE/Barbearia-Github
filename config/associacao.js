import ClienteModel from "../src/modules/cliente/models/cliente.model.js";
import AgendaModel from "../src/modules/agenda/models/agenda.model.js";
import ColaboradorModel from "../src/modules/colaboradores/models/colaborador.models.js";
import EstoqueModel from "../src/modules/estoque/models/estoque.model.js";
import Pagamento from "../src/modules/pagamentos/models/pagamento.model.js";
import RelatorioModel from "../src/modules/relatorios/models/relatorio.model.js";
import ServicoModel from "../src/modules/servicos/models/servico.model.js";
import UsuarioModel from "../src/modules/usuario/models/usuario.model.js";
import VendasModel from "../src/modules/vendas/models/vendas.model.js";


ClienteModel.hasMany(AgendaModel);
AgendaModel.belongsTo(ClienteModel);



