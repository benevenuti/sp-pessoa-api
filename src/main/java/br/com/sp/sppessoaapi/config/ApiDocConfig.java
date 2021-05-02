package br.com.sp.sppessoaapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.BasicAuth;
import springfox.documentation.service.Contact;
import springfox.documentation.service.SecurityScheme;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


/**
 * Habilita o Swagger e configura os dados do dev / empresa a serem exibidos na UI
 */
@Configuration
@EnableSwagger2
public class ApiDocConfig {

    @Bean
    public Docket apiDocket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .apiInfo(getApiInfo())
                .securitySchemes(basicScheme());

    }

    private List<SecurityScheme> basicScheme() {
        List<SecurityScheme> schemeList = new ArrayList<>();
        schemeList.add(new BasicAuth("basicAuth"));
        return schemeList;
    }


    public ApiInfo getApiInfo() {
        return new ApiInfo(
                "sp-pessoa-api",
                "SP - API CRUD Pessoa",
                "0.0.1",
                // ouvi muito essa playlist enquanto codificava, fica o registro :)
                "https://open.spotify.com/playlist/37i9dQZF1EQn4jwNIohw50?si=8IMuIYMORlS-7A3QU_korQ",
                new Contact("Filipe Benevenuti",
                        "https://github.com/benevenuti",
                        "benevenuti@gmail.com"),
                "MIT",
                "https://github.com/benevenuti/sp-pessoa-api/blob/main/LICENSE",
                Collections.emptyList()
        );
    }
}
