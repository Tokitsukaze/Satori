package moe.harusame.dto;

/**
 * state �Ƿ�����ɹ� 
 * info ����ɹ�����ʧ�ܵ���Ϣ 
 * data ��������
 * 
 * @author Colorful
 *
 */
public class Result<T> {
	private String state;
	private String info;
	private T data;

	public Result(String state, String info, T data) {
		super();
		this.state = state;
		this.info = info;
		this.data = data;
	}

	public String isState() {
		return state;
	}

	public void setState(String state) {
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