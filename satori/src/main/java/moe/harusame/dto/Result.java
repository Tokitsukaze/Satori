package moe.harusame.dto;

/**
 * state 是否请求成功 
 * info 请求成功或者失败的信息 
 * data 请求数据
 * 
 * @author Colorful
 *
 */
public class Result<T> {
	private int state;
	private String info;
	private T data;

	public Result(int state, String info, T data) {
		super();
		this.state = state;
		this.info = info;
		this.data = data;
	}

	public int isState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "Result [state=" + state + ", info=" + info + ", data=" + data + "]";
	}

}
