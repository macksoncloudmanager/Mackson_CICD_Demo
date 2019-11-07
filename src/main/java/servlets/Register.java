package servlets;

import tools.BCrypt;
import tools.Tools;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.File;
import java.io.IOException;
import java.sql.*;

@WebServlet(name = "Register")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 10,    // 10 MB
        maxFileSize = 1024 * 1024 * 50,                    // 50 MB
        maxRequestSize = 1024 * 1024 * 100)            // 100 MB
public class Register extends HttpServlet {

    private static final long serialVersionUID = 205242440643911308L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        HttpSession session = request.getSession();

        if (session.getAttribute("error") != null) {
            session.removeAttribute("error");
        }
        if (session.getAttribute("success") != null) {
            session.removeAttribute("success");
        }

        String login = request.getParameter("login");
        String email = request.getParameter("email");
        String pass = request.getParameter("pass");

        Connection connection;
        PreparedStatement ps;
        String sql;
        try {
            Class.forName(Tools.DB_DRIVER).newInstance();
            connection = DriverManager.getConnection(Tools.DB_URL, Tools.DB_USER, Tools.DB_PASS);

            sql = "select * from users where login=? or email=?;";
            ps = connection.prepareStatement(sql);
            ps.setString(1, login);
            ps.setString(2, email);

            if (!ps.executeQuery().next()) {
                String fileName = Tools.saveFile(request);

                sql = "INSERT INTO users (login, email, pass, avatar) VALUE (?, ?, ?, ?);";
                ps = connection.prepareStatement(sql);
                ps.setString(1, login);
                ps.setString(2, email);
                ps.setString(3, BCrypt.hashpw(pass, BCrypt.gensalt()));
                ps.setString(4, fileName);

                ps.execute();

                session.setAttribute("success", "They recorded. You can login");
            } else {
                session.setAttribute("error", "Email or login busy.");
            }
            ps.close();
            connection.close();
        } catch (SQLException | ClassNotFoundException |
                IllegalAccessException | InstantiationException e) {
            session.setAttribute("error", "Login error");
        }

        if(session.getAttribute("error") != null){
            response.sendRedirect("../register_form.jsp");
        }else{
            response.sendRedirect("../index.jsp");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.sendRedirect("../index.jsp");
    }
}
