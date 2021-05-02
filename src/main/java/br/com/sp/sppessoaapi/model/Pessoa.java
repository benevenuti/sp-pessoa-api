package br.com.sp.sppessoaapi.model;


import br.com.caelum.stella.bean.validation.CPF;
import br.com.sp.sppessoaapi.meta.AuditMetadata;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.*;
import java.time.LocalDate;

//mongodb
@Document(collection = "pessoas")
// lombok
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pessoa implements Persistable<ObjectId> {

    @Id
    private ObjectId id;
    @Field("nome")
    @NotNull(message = "O campo 'Nome' deve ser informado (nulo).")
    @NotEmpty(message = "O campo 'Nome' deve ser informado (vazio).")
    @NotBlank(message = "O campo 'Nome' deve ser informado (branco).")
    private String nome;
    @Field("sexo")
    private SexoEnum sexo;
    @Field("email")
    @Email(message = "O valor do campo 'E-mail' é inválido (formato)")
    private String email;
    @Field("data_nascimento")
    @NotNull(message = "O campo 'Data de Nascimento' deve ser informado (nulo).")
    @PastOrPresent(message = "O valor do campo 'Data de Nascimento' é inválido (futuro)")
    private LocalDate dataNascimento;
    // a naturalidade é de uma cidade / estado, poderia ser dois campos ou um objeto simples (pensando no mongodb)
    // para efeitos de (kiss) simplicidade, fica somente uma string com a cidade
    // origem https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome
    @Field("naturalidade")
    private String naturalidade;
    // a nacionalidade poderia ser objeto (br nato, br naturalizado, estrangeiro) com outro campo com o pais
    // para efeitos de (kiss) simplicidade, fica somente string também (nome do país)
    // origem https://servicodados.ibge.gov.br/api/v1/localidades/paises?orderBy=nome
    @Field("nacionalidade")
    private String nacionalidade;
    @Field("cpf")
    @NotNull(message = "O campo 'CPF' deve ser informado (nulo).")
    @CPF(message = "O valor do campo 'CPF' é inválido (formato/tamanho/dígitos).")
    private String cpf;

    @Field("audit_metadata")
    private AuditMetadata auditMetadata = new AuditMetadata();

    // informa ao spring data auditing que o registro é novo ou não
    // e assim, deve setar o createdAt ou o lastModifiedAt
    @Override
    public boolean isNew() {
        return this.id == null;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        Pessoa pessoa = (Pessoa) o;

        return cpf.equals(pessoa.cpf);
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + cpf.hashCode();
        return result;
    }

}
