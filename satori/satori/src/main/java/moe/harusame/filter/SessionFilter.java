package moe.harusame.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

public class SessionFilter extends OncePerRequestFilter {
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// 不过滤的uri
		String[] notFilter = new String[] {
			"/assets/", 
			"/index",
			"/home/"
		};
		
		String uri = request.getRequestURI();
		boolean doFilter = true;
		
        for (String s : notFilter) {  
            if (uri.indexOf(s) != -1) {  
                // 如果uri中包含不过滤的uri，则不进行过滤  
                doFilter = false;  
                break;  
            }  
        }
        
        if (doFilter) {
        	System.out.println("INFO DoFilter:" + uri);
        	String index = "/satori/index?suffix=" + uri;  
        	request.setCharacterEncoding("UTF-8");
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = response.getWriter(); 
            StringBuilder builder = new StringBuilder();  
            builder.append("<script type=\"text/javascript\">");  
            builder.append("window.top.location.href='");  
            builder.append(index);  
            builder.append("';");  
            builder.append("</script>");  
            out.print(builder.toString());  
            
        } else {
        	filterChain.doFilter(request, response);
        }
		
	}
}
