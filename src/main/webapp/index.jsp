<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    String title = "Saper";
    String p = "index";
%>

<%@include file="parts/header.jsp" %>

<section class="index">

    <a href="api_debug.jsp">api_debug</a><br/>

    <div class="row">

        <div class="col-xs-12">
            <img src="res/Asaper.jpg"/>
        </div>

    </div>

    <div class="row">

        <div class="col-xs-12">
            <p>
                Minesweeper (original title Minesweeper) - a classic one-man computer game written in 1981 by Robert Donner, 
                <br>available as an accessory in any Microsoft Windows system up to version 7. From version 8 and RT available for 
                <br>download in the Windows store (there are also versions for other operating systems ).                 
                <br><br>The game consists in discovering individual fields on the board in such a way that you do not come across a mine. 
                <br>Each of the discovered fields has the number of mines that are in direct contact with the field (from zero to eight). 
                <br>If we mark a field with a flag, it is protected against unveiling, so that we will not accidentally reveal the mine.
            </p>
        </div>

    </div>

</section>

<%@include file="parts/footer.jsp" %>