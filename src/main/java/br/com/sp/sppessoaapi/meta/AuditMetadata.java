package br.com.sp.sppessoaapi.meta;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuditMetadata {

    @Field("created_at")
    @CreatedDate
    private LocalDateTime createdAt;

    @Field("modified_at")
    @LastModifiedDate
    private LocalDateTime modifiedAt;

    @Field("version")
    @Version
    private Long version;

}
