package moe.harusame.enums;

public enum ResultEnum {
	SUCCESS(1, "��ɱ�ɹ�"),
	END(0, "��ɱ����"),
	REPEAT_KILL(-1, "�ظ���ɱ"),
	INNER_ERROR(-2, "ϵͳ�쳣"),
	DATA_REWRITE(-3, "���ݴ۸�");

	private int state;

	private String stateInfo;

	private ResultEnum(int state, String stateInfo) {
		this.state = state;
		this.stateInfo = stateInfo;
	}

	public int getState() {
		return state;
	}

	public String getStateInfo() {
		return stateInfo;
	}
	
	public static ResultEnum stateOf(int index) {
		for (ResultEnum state : values ()) {
			if (state.getState() == index) {
				return state;
			}
		}
		return null;
	}
}
