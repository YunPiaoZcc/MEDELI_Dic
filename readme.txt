

/*

    更新表格操作步骤

*/

1. 打开目录“./MEDELI_Dic/resources/database/”，把要最新的表格放到此目录下，

2. 打开“./MEDELI_Dic/js/main.js”文件，在第9行中，把"产品功能列表20180515.xlsx"替换成要更新的表格的名称，包括后缀，然后保存；

3. 打开命令行，按顺序输入以下命令：

	cd MEDELI_Dic文件夹的绝对路径
	git add *
	git commit -m "修改说明"
	git push -u origin master

	Ps: push之后可能会提示输入github的名称与登录密码才能上传；

4. 上传成功后，可能要等1-2分钟服务器那边更新，然后重新刷新连接即可看到效果。