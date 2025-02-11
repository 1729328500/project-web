package top.whyh.web.sys_user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import top.whyh.web.sys_menu.entity.AssignTreeParm;
import top.whyh.web.sys_menu.entity.AssignTreeVo;
import top.whyh.web.sys_user.entity.SysUser;

public interface SysUserService extends IService<SysUser> {
    void saveUser(SysUser sysUser);
    void editUser(SysUser sysUser);
    void deleteUser(Long userId);
    //查询菜单树
    AssignTreeVo getAssignTree(AssignTreeParm parm);
}
