<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    String title = "Registration";
    String p = "index";
%>
<%@include file="parts/header.jsp" %>

<div class="row">
    <div class="col-md-12">
        <form method="post" action="servlet/register" enctype="multipart/form-data">

            <div class="form-group">
                <label for="login">Login</label>
                <input type="text" name="login" class="form-control" title="Login" id="login" placeholder="Login"
                       required autofocus>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" class="form-control" title="Email" id="email" placeholder="Email"
                       required>
            </div>

            <div class="form-group">
                <label for="pass">Password</label>
                <input type="password" name="pass" class="form-control" title="Password" id="pass" placeholder="Password"
                       required>
            </div>

            <div class="form-group">
                <label for="avatar">Avatar</label>
                <input type="file" name="avatar" class="form-control" title="Avatar" id="avatar" placeholder="Avatar">
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-default">Register</button>
            </div>

        </form>
    </div>
</div>

<%@include file="parts/footer.jsp" %>
