package moe.harusame.web;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public ModelAndView index(Model model, HttpSession session, @RequestParam(value = "suffix", required = false) String suffix) {
		System.out.println("SUFFIX:" + suffix);
		if (suffix == null) {
			suffix = "index";
		} else {
			suffix = suffix.split("/satori/")[1];
		}
		ModelAndView mav = new ModelAndView();
		mav.addObject("SESSION_userId", session.getAttribute("SESSION_userId"));
		mav.addObject("SITE_SUFFIX", suffix);
		mav.setViewName("index");
		return mav;
	}
}
