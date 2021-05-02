package br.com.sp.sppessoaapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

/**
 * Essa configuração conecta o validador com os eventos do spring data rest mongodb, tornando o
 * erro 500 em um erro 400 :D, assim usamos os verbos E os responses corretos
 */
@Configuration
@EnableMongoAuditing
public class CustomRepositoryRestConfigurerAdapter implements RepositoryRestConfigurer {


    @Bean
    public Validator validator() {
        return new LocalValidatorFactoryBean();
    }

    @Override
    public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener validatingListener) {
        validatingListener.addValidator("afterCreate", validator());
        validatingListener.addValidator("beforeCreate", validator());
        validatingListener.addValidator("afterSave", validator());
        validatingListener.addValidator("beforeSave", validator());
    }
}
