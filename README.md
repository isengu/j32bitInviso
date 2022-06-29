<!-- PROJECT LOGO -->
<br />
<div align="center">
<h2 align="center">Inviso Clone</h2>

  <p align="center">
    Field Data Collection Application
    <br />
    <a href="https://github.com/dolmushcu/j32bitInviso"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://inviso-spring.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/dolmushcu/j32bitInviso/issues">Report Bug</a>
    ·
    <a href="https://github.com/dolmushcu/j32bitInviso/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#running-locally">Running Locally</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]][demo-url]

[Inviso](https://invisoapp.com.tr/) is a data collection app so what that means is 
like google forms you can build custom forms and assign users to it and let the 
users collect data for you. This project built using Spring Boot, Spring Security 
with JWT Authentication, Spring Data JPA and Hibernate with PostgreSQL. The 
frontend side was not the aim of this project, so i've not built a frontend but i 
download all of the static content with [Httrack](https://www.httrack.com/) from 
the original site and modify it a little bit (just for the demonstration purpose 
for the backend i've build) and integrate it with the backend.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Java 17](https://www.java.com/tr/)
* [Spring Boot](https://spring.io/projects/spring-boot)
* [PostgreSQL](https://www.postgresql.org/)
* [Hibernate](https://hibernate.org/)
* [Log4j2](https://logging.apache.org/log4j/2.x/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Running Locally

This project is a [Spring Boot](https://spring.io/projects/spring-boot) application
built using [Maven](https://spring.io/guides/gs/maven/). You can clone it and run 
it locally on your machine as shown below or using an IDE like Intellij idea.

   ```sh
   $ git clone https://github.com/dolmushcu/j32bitInviso.git
   $ cd j32bitInviso
   $ ./mvnw spring-boot:run
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

You can try [deployed application][demo-url] with frontend [here][demo-url] or you
can try it on postman.

***Here are some of the endpoints:***

### {POST} Login `/api/authentication/token` 
* Send `username` and `password` as `application/x-www-form-urlencoded`.
* Return type is json containing JWT token.
### {POST} User Credentials `/api/user/getUserCredentials`
* Send the username as text. 
* Return type is json containing all of the info about given username
### {GET} Filled Form Count `/api/dashboard/filledFormCountWithoutTask`
Returns filled form counts last `n` day. According to given day number result will
be divided between intervals. e.g. for `day=7` filled form counts will be presented 
day to day, for `day=30` week to week.
* Send `day` parameter as 7, 30 or 90.
* Return type is json containing interval start date, end date and filled form count
between start and end date.
### {GET} Active User Count `/api/dashboard/activeUsers`
* Send request.
* Return type is json containing currently active user count.
### {GET} Active Form Count `/api/dashboard/activeForms`
* Send request.
* Return type is json containing currently active form count.
### {POST} Register New User `/api/user/create`
* Send json payload containing new user's information.
* Return type is json containing newly saved user.
### {POST} Get Users `/api/user/getAllWithSpec`
Returns users by filtering, sorting and pagination.
* Send json payload containing filter requests, sorting and pagination informations.
* Return type is json containing users that met requirements.
### {POST} Update User `/api/user/update`
This endpoint used both for user update and user authorisation.
* Send json payload containing user id and informations of the user.
* Return type is json containing updated user.
### {POST} Delete User `/api/user/delete`
* Send json payload containing user id of user to be deleted.
* Return null.
### {POST} Get Form Names `/api/structure/getStructureNamesBySpec`
Returns forms by filtering, sorting and pagination.
* Send json payload containing filter requests, sorting and pagination informations.
* Return type is json containing names and ids of forms that met requirements.
### {POST} Get Form Structure `/api/structure/getStructure`
* Send json payload containing form id you want to get structure of.
* Return type is json containing form structure.
### {POST} Get Specific Version Of Form `/api/structure/getApplicationStructure`
* Send json containing form id and verison.
* Return type is json containing structure of specific version of form.
### {POST} Create New Form `/api/structure/saveAnApplication`
* Send json payload containing structure of form.
* Return type is json containing newly saved forms structure.
### {POST} Delet Form `/api/structure/delete`
* Send json containing short name of the form.
* Return null.
### {POST} Assign Form `/api/userApplication/saveUserApplication`
* Send json containing form id and users that will assign to it.
* Return type is json containing some info about form and assigned users.
### {POST} Get Assigned Users To Form `/api/userApplication/getAssignedUsersOfApplication`
* Send id of the form.
* Return type is json containing list of the users.
### {POST} Get Forms Assigned To User `/api/structure/getStructureNamesOfUser`
* Send username.
* Return type is json containing list of form names and ids.
### {POST} Submit Form `/api/entry/sendFormData`
* Send json containing info about form and filled fields.
* Return type is json containing success message.
### {POST} Report `/api/entry/getAllControlMetadata`
Returns filled forms by filtering, sorting and pagination.
* Send json containing filter requests, sorting and pagination information.
* Return type is json containing filled form datas that met requirements.


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/dolmushcu/j32bitInviso.svg?style=for-the-badge
[contributors-url]: https://github.com/dolmushcu/j32bitInviso/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/dolmushcu/j32bitInviso.svg?style=for-the-badge
[forks-url]: https://github.com/dolmushcu/j32bitInviso/network/members
[stars-shield]: https://img.shields.io/github/stars/dolmushcu/j32bitInviso.svg?style=for-the-badge
[stars-url]: https://github.com/dolmushcu/j32bitInviso/stargazers
[issues-shield]: https://img.shields.io/github/issues/dolmushcu/j32bitInviso.svg?style=for-the-badge
[issues-url]: https://github.com/dolmushcu/j32bitInviso/issues
[license-shield]: https://img.shields.io/github/license/dolmushcu/j32bitInviso.svg?style=for-the-badge
[license-url]: https://github.com/dolmushcu/j32bitInviso/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: ScreenshotINVISO.png
[demo-url]: https://inviso-spring.herokuapp.com/
