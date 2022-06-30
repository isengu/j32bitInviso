package com.j32bit.inviso.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PasswordChangeRequsetDto {

    private OldAndNewPassword password;
    private String userName;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OldAndNewPassword {
        @JsonProperty("key")
        private String oldPass;
        @JsonProperty("value")
        private String newPass;
    }

}
