<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    String title = "Login";
    String p = "index";
%>

<%@include file="parts/header.jsp" %>
<div class="row">
    <div class="col-xs-12">
        <form method="post"
              action="servlet/login<%= request.getParameter("back") != null ? "?back=" + request.getParameter("back") : "" %>">

            <div class="form-group">
                <label for="login">Login or email</label>
                <input type="text" name="login" class="form-control" title="Login or email" id="login"
                       placeholder="Login or email" required autofocus>
            </div>

            <div class="form-group">
                <label for="pass">Password</label>
                <input type="password" name="pass" class="form-control" title="password" id="pass" placeholder="password"
                       required>
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-default">Log In</button>
            </div>

        </form>
    </div>
</div>

<%@include file="parts/footer.jsp" %>