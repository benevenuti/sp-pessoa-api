package br.com.sp.sppessoaapi.respository;

import br.com.sp.sppessoaapi.model.Pessoa;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.Description;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Essa interface habilita os métodos do repositório default (nessa caso os do mongodb) para Pessoa;
 * já a anotação @RepositoryRestResource habilita o spring data rest para o repositório;
 * uma das principais vantagens é que utiliza um bom - senão ótimo - nível de maturidade,
 * tanto de qualidade e suporte da comunidade, como em relação ao modelo de Richardson,
 * pois utiliza os verbos (GET, POST, PUT...) de forma mais adequada e traz a navegação com hypermedia
 */
@RepositoryRestResource(
        collectionResourceRel = "pessoa",
        path = "pessoa",
        collectionResourceDescription = @Description("Collection de Pessoas"))
@ApiOperation(value = "CRUD Api para Pessoas", authorizations = {@Authorization(value = "basicAuth")})
public interface PessoaRepository extends MongoRepository<Pessoa, ObjectId> {
    /* aqui poderíamos criar diversos métodos de consulta ao mongodb somente usando o padrão auto gerado do spring data
     * ou então criar o custom query habilitado com @Query no formato do mongodb, ex:
     *    @Query("{ 'nome' : ?0 }") // query do mongo, se fosse JPA aqui iria o SELECT
     *    List<Pessoa> findPessoaByNome(String nome); //
     * */


}
