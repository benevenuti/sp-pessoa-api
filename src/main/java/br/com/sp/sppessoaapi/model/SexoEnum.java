package br.com.sp.sppessoaapi.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum SexoEnum {

    M("Masculino"),
    F("Feminino"),
    I("Não informado");

    private final String value;

}
