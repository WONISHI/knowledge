# jekins+svn持续集成环境搭建

## 系统构建综述
- 创建虚拟机安装linux系统
- 版本控制子系统
  - subversion服务器
  - 项目对应版本库
  - 版本库中狗子程序
- 持续集成子系统
  - jdk
  - tomcat
  - maven
  - jekins
    - 主体程序
    - svn插件
    - maven插件
    - deploy to web container插件
  - 应用发布子系统
    - jdk
    - tomcat
    - 