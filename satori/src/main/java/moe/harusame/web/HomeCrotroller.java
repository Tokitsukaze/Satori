package moe.harusame.web;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import moe.harusame.dto.Result;
import moe.harusame.entity.Card;

/*@Controller
@RequestMapping("/home")
public class HomeCrotroller {
		
	@RequestMapping(
		value = "/{userId}/{type}",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<List<Card>> getCardList (@PathVariable("userId") String userId, @PathVariable("type") String type) {
		List<Card> list = new ArrayList<Card>();
		switch (type) {
			case "trend":
				list.add(new Card("denpa", "夕立酱", "夕立desu", "assets/images/poi.png"));
				list.add(new Card("denpa", "春雨酱", "春雨desu", "assets/images/poi.png"));
				list.add(new Card("denpa", "时雨酱", "时雨desu", "assets/images/poi.png"));
				break;
			
			case "project":
				list.add(new Card("project", "大学社团管理系统", "一个简单的社团管理系统", new Date()));
				list.add(new Card("project", "夕立酱", "夕立desu", new Date()));
				list.add(new Card("project", "夕立酱", "夕立desu", new Date()));
				break;
		}
		
		Result<List<Card>> result = new Result<List<Card>>("200", "获取成功", list);
		return result;
	}
}*/
