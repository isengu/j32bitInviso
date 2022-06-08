package com.j32bit.inviso.dto.request;

import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginRequestDto implements Serializable {

    @Serial
    private static final long serialVersionUID = -1L;

    private String username;
    private String password;

}
