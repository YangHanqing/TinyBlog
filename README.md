## TinyBlog有什么特性
1. 完全静态,以至于没有任何生成程序
2. 支持Markdown常用语法
3. 支持Github用户添加评论

## 为什么要写 TinyBlog
有时候只想简单的写一篇文章,WordPress毫无疑问过于臃肿,Jekyll需要安装,而我想要一种更简单的更新博客方式,受到开源项目[Simple](https://github.com/isnowfy/simple)的启发,我用几个晚上的时间写了一个极简的静态博客.

每次写文章只有一个步骤,push写好的md文章到`./blog`目录下, that's all .

## TinyBlog 教程
1. 从[TinyBlog的Github主页](https://github.com/YangHanqing/tinyblog)fork一份到你的仓库,更改项目名称为`your_name.github.io`,几分钟后Github会自动为你开通[your_name.github.io](yanghanqing.github.io)的个人主页

2. 修改`about me.md`文件作为你的个人介绍,为了更快的加载速度,也可以选择写死在`index.html`中

3. 写好markdown文件后,保存到`./blog`目录下,依次执行下面的语句即可.如果你不熟悉Git如何使用,请参考Github提供的相关教程.

	> git add .
	> git commit -m "Update blog"
	> git push
	
4. 如果修改了CNAME,记得core.js中把`user`改为自己的账户名,否则通过URL自动获取.

5. 分享文章给他人,可以通过在链接后加如下参数 `?title=文章名`

6. 建议新文章发布后,评论栏留空,并点击一下提交评论按钮,这样会用你自己的账户创建issue,以后如果comment有更新,不会打扰到第一个评论的人.

## 迭代方向
* 修复未知Bug(没有做测试,也没有考虑Github通讯不佳的情况)
* 支持响应式布局(第一次写前端,很手生)
* 基本上整个网站有交互就有AJAX,所以需要美化和增加相应的Loading提示
* 支持文章按发布时间排序(Github没有获取单独文件update时间的api,所有第一版没有处理,初步想法是通过 `001#TITLE`这样的命名规范来处理文章顺序)
* 做一个支持MD语法的Chrome扩展来更新博客,不过如果做了扩展,和Jekyll也没什么区别了,再议.
* 改成 ReactJS 驱动来练练手

## 评论功能
评论这个功能我是取巧了,利用Github API在项目issues下新建comment来存储,实现了原本需要第三方插件才能完成的功能.
## 许可
MIT
	




