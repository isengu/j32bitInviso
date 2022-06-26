-- Component Data --
INSERT INTO backend.component
(id, "type")
VALUES(39, 'Label');
INSERT INTO backend.component
(id, "type")
VALUES(41, 'TextBox');
INSERT INTO backend.component
(id, "type")
VALUES(42, 'Paragraph');
INSERT INTO backend.component
(id, "type")
VALUES(40, 'Button');
INSERT INTO backend.component
(id, "type")
VALUES(43, 'Info');
INSERT INTO backend.component
(id, "type")
VALUES(44, 'Divider');
INSERT INTO backend.component
(id, "type")
VALUES(2, 'BarcodeReader');
INSERT INTO backend.component
(id, "type")
VALUES(45, 'SelectBox');
INSERT INTO backend.component
(id, "type")
VALUES(46, 'CheckBox');
INSERT INTO backend.component
(id, "type")
VALUES(34, 'Input');
INSERT INTO backend.component
(id, "type")
VALUES(38, 'Button');
INSERT INTO backend.component
(id, "type")
VALUES(47, 'TextArea');
INSERT INTO backend.component
(id, "type")
VALUES(48, 'RadioButton');
INSERT INTO backend.component
(id, "type")
VALUES(49, 'Camera');
INSERT INTO backend.component
(id, "type")
VALUES(50, 'Text');
INSERT INTO backend.component
(id, "type")
VALUES(51, 'MultiSelectBox');
INSERT INTO backend.component
(id, "type")
VALUES(52, 'DetailCamera');
INSERT INTO backend.component
(id, "type")
VALUES(53, 'EmptyComponent');
INSERT INTO backend.component
(id, "type")
VALUES(55, 'Video');
INSERT INTO backend.component
(id, "type")
VALUES(56, 'Image');
INSERT INTO backend.component
(id, "type")
VALUES(54, 'Signature');

-- Option Data --

INSERT INTO backend."option"
(id, "type")
VALUES(1, 'Button');
INSERT INTO backend."option"
(id, "type")
VALUES(2, 'TextBox');
INSERT INTO backend."option"
(id, "type")
VALUES(3, 'SelectBox');
INSERT INTO backend."option"
(id, "type")
VALUES(4, 'Label');
INSERT INTO backend."option"
(id, "type")
VALUES(5, 'Info');
INSERT INTO backend."option"
(id, "type")
VALUES(6, 'Paragraph');
INSERT INTO backend."option"
(id, "type")
VALUES(7, 'RadioButton');
INSERT INTO backend."option"
(id, "type")
VALUES(8, 'CheckBox');
INSERT INTO backend."option"
(id, "type")
VALUES(9, 'Option');
INSERT INTO backend."option"
(id, "type")
VALUES(10, 'Text');
INSERT INTO backend."option"
(id, "type")
VALUES(11, 'TextArea');
INSERT INTO backend."option"
(id, "type")
VALUES(12, 'MultiSelectBox');
INSERT INTO backend."option"
(id, "type")
VALUES(13, 'BarcodeReader');
INSERT INTO backend."option"
(id, "type")
VALUES(14, 'Camera');
INSERT INTO backend."option"
(id, "type")
VALUES(15, 'DetailCamera');
INSERT INTO backend."option"
(id, "type")
VALUES(16, 'EmptyComponent');
INSERT INTO backend."option"
(id, "type")
VALUES(17, 'Datasource');
INSERT INTO backend."option"
(id, "type")
VALUES(18, 'Video');
INSERT INTO backend."option"
(id, "type")
VALUES(19, 'Signature');
INSERT INTO backend."option"
(id, "type")
VALUES(20, 'Notify');
INSERT INTO backend."option"
(id, "type")
VALUES(21, 'Image');

-- Validation Data --
INSERT INTO backend.validation
(id, "name")
VALUES(1, 'ng-pattern');
INSERT INTO backend.validation
(id, "name")
VALUES(4, 'ng-minlength');
INSERT INTO backend.validation
(id, "name")
VALUES(3, 'ng-maxlength');
INSERT INTO backend.validation
(id, "name")
VALUES(5, 'min-choice-size');
INSERT INTO backend.validation
(id, "name")
VALUES(6, 'max-choice-size');
INSERT INTO backend.validation
(id, "name")
VALUES(7, 'min-number-size');
INSERT INTO backend.validation
(id, "name")
VALUES(8, 'max-number-size');
INSERT INTO backend.validation
(id, "name")
VALUES(2, 'required');
INSERT INTO backend.validation
(id, "name")
VALUES(9, 'matched-validation');
INSERT INTO backend.validation
(id, "name")
VALUES(10, 'required');

-- Role Data --
INSERT INTO backend."role"
(id, role_name, short_name)
VALUES(1, 'ADMIN', 'ADMN');
INSERT INTO backend."role"
(id, role_name, short_name)
VALUES(2, 'USER', 'USR');
INSERT INTO backend."role"
(id, role_name, short_name)
VALUES(3, 'SUPERVISOR', 'SPRVSR');
INSERT INTO backend."role"
(id, role_name, short_name)
VALUES(4, 'REPORTER', 'RPRTR');

-- User Data --
INSERT INTO backend."user"
(created_at, created_by, updated_at, updated_by, address, company_name, email, is_admin, "name", occupation, "password", phone, reset_key, status, surname, tc_number, username)
VALUES('2022-06-19 18:51:40.647', 'anonymousUser', '2022-06-19 18:51:40.647', 'anonymousUser', 'sau', 'sau', 'sau@sau.com', 0, 'sau', 'sau', '2405c79d70f52098b0647f79e96616d8', '(999) 999-9999', NULL, 0, 'sau', '11111111111', 'sau');
INSERT INTO backend.user_role
(user_id, role_id)
VALUES(1, 1);
INSERT INTO backend.user_role
(user_id, role_id)
VALUES(1, 2);
