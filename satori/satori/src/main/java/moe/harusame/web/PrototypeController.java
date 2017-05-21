package moe.harusame.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import moe.harusame.dto.Result;
import moe.harusame.entity.Prototype;
import moe.harusame.entity.Tab;
import moe.harusame.service.PrototypeService;
import moe.harusame.service.TabService;

@Controller
public class PrototypeController {
	
	@Autowired
	private PrototypeService prototypeService;
	
	@Autowired
	private TabService tabService;
	
	/**
	 * 保存到当前branch_id & tab_id中
	 * @param projectId
	 * @param tabId
	 * @param prototypeModel
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	@RequestMapping(
		value = "/tab/{tabId}/branch/{branchId}/save",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<Integer> insertProject(@PathVariable("tabId") int tabId, @PathVariable("branchId") int branchId, @RequestParam("prototypeModel[]") List<String> prototypeModel) throws JsonParseException, JsonMappingException, IOException {
		int deleteNum = prototypeService.deleteBranchPrototype(tabId, branchId);
		System.out.println("删除数量:" + deleteNum);
		ObjectMapper mapper = new ObjectMapper();
		List<Prototype> prototypeList = new ArrayList<Prototype>();
		for (int i = 0; i < prototypeModel.size(); i++) {
			Prototype prototype = mapper.readValue(prototypeModel.get(i), Prototype.class);
			prototypeList.add(prototype);
		}
		int result = prototypeService.insertPrototype(prototypeList);
		return new Result<Integer>("200", "保存成功", result);
	}
	
	
	/**
	 * 获得一个tab_id中一个分支中的原型
	 * @param projectId
	 * @param tabId
	 * @param prototypeModel
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	@RequestMapping(
		value = "/tab/{tabId}/getDefaultBranchTabPrototype",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<List<Prototype>> getDefaultBranchTabPrototype(@PathVariable("tabId") int tabId) {
		Tab tab = tabService.getTabByTabId(tabId);
		System.out.println("tabResult" + tab);
		List<Prototype> prototypeList = prototypeService.getPrototype(tabId, tab.getBranch());
		return new Result<List<Prototype>>("200", "获取原型成功", prototypeList);
	}
	
	/**
	 * 分支保存
	 * @param tabId
	 * @return
	 */
	@RequestMapping(
			value = "/tab/{tabId}/saveAs",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<Integer> insertProject(@PathVariable("tabId") int tabId, @RequestParam("prototypeModel[]") List<String> prototypeModel) throws JsonParseException, JsonMappingException, IOException {
		// 将最大分支id ++
		tabService.branchAddOne(tabId);
		int newBranch = tabService.getNewBranch(tabId);
		ObjectMapper mapper = new ObjectMapper();
		List<Prototype> prototypeList = new ArrayList<Prototype>();
		for (int i = 0; i < prototypeModel.size(); i++) {
			Prototype prototype = mapper.readValue(prototypeModel.get(i), Prototype.class);
			prototype.setBranchId(newBranch);
			prototypeList.add(prototype);
		}
		int result = prototypeService.insertPrototype(prototypeList);
		return new Result<Integer>("200", "保存新分支成功", result);
	}
}
