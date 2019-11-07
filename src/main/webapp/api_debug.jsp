<%@ page import="com.google.gson.Gson" %>
<%@ page import="com.google.gson.GsonBuilder" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>debug</title>
    <style>
        body {
            background: black;
            color: white;
        }
    </style>
</head>
<body>
<div class="container">

    <h1>API test
        | <%=session.getAttribute("login") != null ? "Logged in as: " + session.getAttribute("login") : "Not logged in"%>
    </h1>

    <hr/>

    <a href="api/records">record</a><br/>
    <a href="api/records?page=0&limit=2">record</a><br/>
    <a href="api/records?page=1&limit=2">record</a><br/>
    <a href="api/records?board=8x8">record 8x8</a><br/>
    <br/>
    <a href="api/records_user">record_user</a><br/>

    <hr/>
    Registration:<br/>
    <form method="post" action="api/register" enctype="multipart/form-data">

        <div class="form-group">
            <label for="login2">Login</label>
            <input type="text" name="login" class="form-control" title="Login" id="login2" value="api" required>
        </div>

        <div class="form-group">
            <label for="email2">Email</label>
            <input type="email" name="email" class="form-control" title="Email" id="email2" value="api@ap.i" required>
        </div>

        <div class="form-group">
            <label for="pass2">Password</label>
            <input type="password" name="pass" class="form-control" title="Password" id="pass2" value="api" required>
        </div>

        <div class="form-group">
            <label for="avatar2">Avatar</label>
            <input type="file" name="avatar" class="form-control" title="Awatar" id="avatar2">
        </div>

        <div class="form-group">
            <button type="submit" class="btn btn-default">Register</button>
        </div>

    </form>

    <hr/>
    Login:<br/>
    <form method="post" action="api/login">

        <div class="form-group">
            <label for="login">Login or email</label>
            <input type="text" name="login" class="form-control" title="Login or email" id="login" value="api"
                   placeholder="Login or email" required>
        </div>

        <div class="form-group">
            <label for="pass">Password</label>
            <input type="password" name="pass" class="form-control" title="Password" id="pass" placeholder="Password"
                   value="api"
                   required>
        </div>

        <div class="form-group">
            <button type="submit" class="btn btn-default">Login</button>
        </div>

    </form>

    <hr/>
    Logout:<br/>
    <a href="api/logout">Logout</a>

    <hr/>
    Avatar:<br/>
    <form method="post" action="api/set_avatar" enctype="multipart/form-data">

        <div class="form-group" style="width: 50%;">
            <input type="file" name="avatar" class="form-control" title="To remove the avatar do not enter the picture">
        </div>

        <button class="btn btn-default" type="submit" style="display: inline-block;">Change</button>

    </form>

    <hr/>
    Adding a record:<br/>
    <form method="post" action="api/add_record">

        <div class="form-group" style="width: 50%;">
            Time:
            <input type="number" name="time" class="form-control" value="50">
        </div>

        <div class="form-group" style="width: 50%;">
            The board:
            <input type="text" name="board" class="form-control" value="20x20">
        </div>

        <button class="btn btn-default" type="submit" style="display: inline-block;">Add</button>

    </form>

    <hr/>
    Delete record:<br/>
    <form method="get" action="api/delete_record">

        <div class="form-group" style="width: 50%;">
            Id:
            <input type="text" name="id" class="form-control" value="58">
        </div>

        <button class="btn btn-default" type="submit" style="display: inline-block;">Delete</button>

    </form>

</div>
</body>
</html>
