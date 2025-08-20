import ClienteModel from "../modules/clientes/models/cliente.model.js";
import AgendaModel from "../modules/agenda/models/agenda.model.js";
import ColaboradorModel from "../modules/colaboradores/models/colaborador.models.js";
import EstoqueModel from "../modules/estoque/models/estoque.model.js";
import Pagamento from "../modules/pagamentos/models/pagamento.model.js";
import ProdutosModel from "../modules/produto/models/model.js";
import RelatorioModel from "../modules/relatorios/models/relatorio.model.js";
import ServicoModel from "../modules/servicos/models/servico.model.js";
import UsuarioModel from "../modules/usuario/models/usuario.model.js";
import VendasModel from "../modules/vendas/models/vendas.model.js";


UsuarioModel.hasMany(RelatorioModel)
// Relacionamentos de Venda
VendasModel.belongsTo(ClienteModel, {
  foreignKey: "client_id",
  as: "cliente",
});
VendasModel.belongsTo(ColaboradorModel, {
  foreignKey: "colaborador_id",
  as: "colaborador",
});
VendasModel.belongsTo(Pagamento, {
  foreignKey: "pagamento_id",
  as: "pagamento",
});
ClienteModel.hasMany(VendasModel, {
  foreignKey: "client_id",
  as: "vendas",
});
ColaboradorModel.hasMany(VendasModel, {
  foreignKey: "colaborador_id",
  as: "vendas",
});
Pagamento.hasMany(VendasModel, {
  foreignKey: "pagamento_id",
  as: "vendas",
});
UsuarioModel.hasMany(RelatorioModel, {
})

