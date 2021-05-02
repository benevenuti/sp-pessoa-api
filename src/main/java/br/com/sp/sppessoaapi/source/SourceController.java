package br.com.sp.sppessoaapi.source;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SourceController {

    @GetMapping(path = "/source", produces = {MediaType.APPLICATION_JSON_VALUE})
    public String getSource() {
        /* é vdd, quer dizer as vezes não */
        return "{ \"_links\": { \"source\": { \"href\": \"https://github.com/benevenuti/sp-pessoa-api\" } } }";
    }

}
