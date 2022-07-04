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

-- Application Data --
INSERT INTO backend.application (created_at,created_by,updated_at,updated_by) VALUES
	 ('2022-07-04 10:20:53.160435','sau','2022-07-04 10:25:27.17768','sau');
INSERT INTO backend.application_version (created_at,created_by,updated_at,updated_by,description,"name",short_name,status,"version",application_id) VALUES
	 ('2022-07-04 10:20:53.275469','sau','2022-07-04 10:20:53.275469','sau','form 1','Form 1','App165691925297237',0,1.00,1),
	 ('2022-07-04 10:25:20.86702','sau','2022-07-04 10:25:20.86702','sau','form 1','Form 1','App165691925297237',0,1.10,1);
INSERT INTO backend.page (created_at,created_by,updated_at,updated_by,is_home_page,is_page_name_hidden,page_number,short_name,title,application_version_id) VALUES
	 ('2022-07-04 10:25:20.889051','sau','2022-07-04 10:25:20.889051','sau',true,NULL,1,'Page165691925646627','page1',2),
	 ('2022-07-04 10:25:21.110934','sau','2022-07-04 10:25:21.110934','sau',false,NULL,2,'Page165691929033414','page2',2);
INSERT INTO backend.form (created_at,created_by,updated_at,updated_by,short_name,title,page_id) VALUES
	 ('2022-07-04 10:25:20.907046','sau','2022-07-04 10:25:20.907046','sau','Form165691925646667','',1),
	 ('2022-07-04 10:25:21.026921','sau','2022-07-04 10:25:21.026921','sau','Form165691927046596','',1),
	 ('2022-07-04 10:25:21.115529','sau','2022-07-04 10:25:21.115529','sau','Form16569192903345','',2),
	 ('2022-07-04 10:25:21.190122','sau','2022-07-04 10:25:21.190122','sau','Form165691930853329','',2);
INSERT INTO backend.user_application (user_id,application_id) VALUES
	 (1,1);

-- Control Metadata --
INSERT INTO backend.control_metadata (barcode,control_date,coordinatex,coordinatey,state_code,application_version_id,user_id) VALUES
	 ('Form 11656919589609','2022-07-04 10:26:00.722',0,0,NULL,2,1);

-- Form Component Data --
INSERT INTO backend.form_component (created_at,created_by,updated_at,updated_by,col_align,col_number,col_size,"row_number",short_name,component_id,form_id) VALUES
	 ('2022-07-04 10:25:20.923047','sau','2022-07-04 10:25:20.923047','sau',NULL,0,'',0,'TextBox165691926045287',41,1),
	 ('2022-07-04 10:25:20.969036','sau','2022-07-04 10:25:20.969036','sau',NULL,0,'',0,'Button16569192619087',38,1),
	 ('2022-07-04 10:25:20.985046','sau','2022-07-04 10:25:20.985046','sau',NULL,0,'',1,'TextArea165691926465017',47,1),
	 ('2022-07-04 10:25:21.005926','sau','2022-07-04 10:25:21.005926','sau',NULL,0,'',1,'Text16569192658504',50,1),
	 ('2022-07-04 10:25:21.031944','sau','2022-07-04 10:25:21.031944','sau',NULL,0,'',0,'MultiSelectBox165691927571780',51,2),
	 ('2022-07-04 10:25:21.067952','sau','2022-07-04 10:25:21.067952','sau',NULL,0,'',0,'SelectBox165691927699039',45,2),
	 ('2022-07-04 10:25:21.081947','sau','2022-07-04 10:25:21.081947','sau',NULL,0,'',1,'CheckBox165691928224279',46,2),
	 ('2022-07-04 10:25:21.097938','sau','2022-07-04 10:25:21.097938','sau',NULL,0,'',1,'RadioButton165691928333016',48,2),
	 ('2022-07-04 10:25:21.12009','sau','2022-07-04 10:25:21.12009','sau',NULL,0,'',0,'Camera165691929554853',49,3),
	 ('2022-07-04 10:25:21.135096','sau','2022-07-04 10:25:21.135096','sau',NULL,0,'',0,'DetailCamera165691929723882',52,3);
INSERT INTO backend.form_component (created_at,created_by,updated_at,updated_by,col_align,col_number,col_size,"row_number",short_name,component_id,form_id) VALUES
	 ('2022-07-04 10:25:21.152117','sau','2022-07-04 10:25:21.152117','sau',NULL,0,'col-10',1,'Info165691930190710',43,3),
	 ('2022-07-04 10:25:21.164102','sau','2022-07-04 10:25:21.164102','sau',NULL,0,'col-90',1,'BarcodeReader165691930399981',2,3),
	 ('2022-07-04 10:25:21.198117','sau','2022-07-04 10:25:21.198117','sau',NULL,0,'',0,'Video16569193138679',55,4),
	 ('2022-07-04 10:25:21.217114','sau','2022-07-04 10:25:21.217114','sau',NULL,0,'',0,'Signature165691931485752',54,4),
	 ('2022-07-04 10:25:21.223124','sau','2022-07-04 10:25:21.223124','sau',NULL,0,'',1,'Image165691932360568',56,4);

-- Form Component Data Data --
INSERT INTO backend.form_component_data (value,form_component_id,control_metadata_id) VALUES
	 ('b',6,1),
	 ('deneme',1,1),
	 ('{"d":"d","c":"c","b":"b"}',5,1),
	 ('iki',8,1),
	 ('[{"name":"file1656919570244.png","description":"deneme resim yorum"}]',10,1),
	 ('deneme',3,1),
	 ('{"b":"b"}',7,1);

-- Form Component Validation Data --
INSERT INTO backend.form_component_validation (error_message,value,selectable,"type",validation_id,form_component_id) VALUES
	 ('Bu alan gerekli!','true',NULL,1,2,1),
	 ('En az iki tane secin!','2',NULL,1,5,5),
	 ('En fazla bir tane secin!','3',NULL,1,6,5);

-- Form Component Option Data --
INSERT INTO backend.form_component_option ("key","name",order_number,value,option_id,form_component_id) VALUES
	 ('','placeholder',0,'',2,1),
	 ('','textValue',1,'',2,1),
	 ('','alias',2,'',2,1),
	 ('text','type',3,'',2,1),
	 ('','isUnique',4,'',2,1),
	 ('','description',5,'',2,1),
	 ('false','readonly',6,'',2,1),
	 ('Button','value',0,'',1,2),
	 ('button-calm','color',0,'',1,2),
	 ('','size',0,'',1,2);
INSERT INTO backend.form_component_option ("key","name",order_number,value,option_id,form_component_id) VALUES
	 ('','style',0,'',1,2),
	 ('','placeholder',0,'',11,3),
	 ('','textValue',1,'',11,3),
	 ('','alias',2,'',2,3),
	 ('','cols',3,'',11,3),
	 ('','rows',4,'',11,3),
	 ('Text','label',0,'',10,4),
	 ('false','bold',1,'',10,4),
	 ('false','italic',2,'',10,4),
	 ('false','underline',3,'',10,4);
INSERT INTO backend.form_component_option ("key","name",order_number,value,option_id,form_component_id) VALUES
	 ('14','font-size',4,'',10,4),
	 ('Text','label',0,NULL,4,5),
	 ('','alias',1,'',12,5),
	 ('a','a',2,NULL,9,5),
	 ('b','b',3,NULL,9,5),
	 ('c','c',4,NULL,9,5),
	 ('d','d',5,NULL,9,5),
	 ('SECIN','label',0,NULL,4,6),
	 ('','alias',1,'',3,6),
	 ('a','a',2,NULL,9,6);
INSERT INTO backend.form_component_option ("key","name",order_number,value,option_id,form_component_id) VALUES
	 ('b','b',3,NULL,9,6),
	 ('CheckBox','label',0,NULL,4,7),
	 (NULL,'alias',1,'',8,7),
	 ('a','a',2,NULL,9,7),
	 ('b','b',3,NULL,9,7),
	 ('c','c',4,NULL,9,7),
	 ('RadioButton','label',0,NULL,4,8),
	 (NULL,'alias',1,'',7,8),
	 ('bir','bir',2,NULL,9,8),
	 ('iki','iki',3,NULL,9,8);
INSERT INTO backend.form_component_option ("key","name",order_number,value,option_id,form_component_id) VALUES
	 ('TAKE PHOTO','buttonName',0,'',14,9),
	 ('button-positive','color',1,'',14,9),
	 ('','style',2,'',14,9),
	 ('TAKE PHOTO','buttonName',0,'',15,10),
	 ('button-balanced','color',1,'',15,10),
	 ('','style',2,'',15,10),
	 ('<p>deneme info<img src="http://localhost:8081/file/file1656919384013.jpg" height="60"><br></p>','content',NULL,NULL,5,11),
	 ('true','isUnique',0,'',13,12),
	 ('Scan','buttonName',1,'',13,12),
	 ('','alias',2,'',2,12);
INSERT INTO backend.form_component_option ("key","name",order_number,value,option_id,form_component_id) VALUES
	 ('button-royal','color',3,'',13,12),
	 ('','style',4,'',13,12),
	 ('','description',5,'',13,12),
	 ('RECORD VIDEO','buttonName',0,'',18,13),
	 ('button-energized','color',1,'',18,13),
	 ('','style',2,'',18,13),
	 ('http://localhost:8081/file/file1656919330993.jpg','imageSource',0,NULL,21,15),
	 ('200','imageWidth',1,NULL,21,15),
	 ('','imageHeight',2,NULL,21,15);
