package com.j32bit.inviso.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable {

	@Serial
    private static final long serialVersionUID = -1L;

    private Long id;
	private String email;
	private String name;
	private String surname;
	@JsonProperty("userName")
	private String username;
	private String password;
	private String tcNumber;
	private String companyName;
	private String occupation;
	@JsonProperty("phoneNumber")
	private String phone;
	private String address;
	private byte isAdmin = 0;
	private byte status = 0;
	private List<RoleDto> roles;

}
