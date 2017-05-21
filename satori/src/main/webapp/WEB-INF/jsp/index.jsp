<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="common/tag.jsp"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html>
<head>
	<title>Satori</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<link rel="stylesheet" href="${ctx}/assets/style/normalize.css">
	<link rel="stylesheet" href="${ctx}/assets/style/satori.css">
<body>
	<div id="satori">
	</div>
</body>
<script>
	var SITE_SUFFIX = '${SITE_SUFFIX}'
	var SESSION_info = '${SESSION_info}'
	var SESSION_nickName = '${SESSION_nickName}'
	var SESSION_userAvatar = '${SESSION_userAvatar}'
	var SESSION_userImpression = '${SESSION_userImpression}'
	var SESSION_userId = '${SESSION_userId}'
	
	var CURRENT_PROJECT_ID
	var CURRENT_TAB_ID
</script>
<script src="${ctx}/assets/script/third-party/jquery-2.1.1.min.js"></script>
<script src="${ctx}/assets/script/third-party/jquery.form.js"></script>
<script src="${ctx}/assets/script/third-party/axios.min.js"></script>
<script src="${ctx}/assets/script/satori-scroller.js"></script>
<script src="${ctx}/assets/script/vd.js"></script>
<script src="${ctx}/assets/script/template.js"></script>
<script src="${ctx}/assets/script/request.js"></script>
<script src="${ctx}/assets/script/mask.js"></script>
<script src="${ctx}/assets/script/modal.js"></script>
<script src="${ctx}/assets/script/event.js"></script>
<script src="${ctx}/assets/script/view.js"></script>
<script src="${ctx}/assets/script/satori.js"></script>
<script src="${ctx}/assets/script/prototype.js"></script>
<script type="text/javascript">

</script>
</html>
