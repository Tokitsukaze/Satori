package moe.harusame.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

public class IniFilter extends OncePerRequestFilter {
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// 不过滤的uri
		String index = "/index.jsp";
		String uri = request.getRequestURI();
		
		boolean doFilter = false;
		
		if (uri.indexOf(index) != -1) {  
			// 如果uri中包含过滤的uri，则进行过滤  
			System.out.println("first uri = " + uri);
			doFilter = true;  
		} 
        
        if (doFilter) {
        	System.out.println("doFirstFilter");
    		request.setCharacterEncoding("UTF-8");
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = response.getWriter();  
            String first = "/satori/index";  
            StringBuilder builder = new StringBuilder();  
            builder.append("<script type=\"text/javascript\">");  
            builder.append("window.top.location.href='");  
            builder.append(first);  
            builder.append("';");  
            builder.append("</script>");  
            out.print(builder.toString());  
        } else {
        	filterChain.doFilter(request, response);
        }
		
	}
}
