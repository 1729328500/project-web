package top.whyh.web.sys_user.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import top.whyh.web.sys_menu.entity.AssignTreeParm;
import top.whyh.web.sys_menu.entity.AssignTreeVo;
import top.whyh.web.sys_menu.entity.SysMenu;
import top.whyh.web.sys_menu.service.SysMenuService;
import top.whyh.web.sys_user.entity.SysUser;
import top.whyh.web.sys_user.mapper.SysUserMapper;
import top.whyh.web.sys_user.service.SysUserService;
import top.whyh.web.sys_user_role.entity.SysUserRole;
import top.whyh.web.sys_user_role.service.SysUserRoleService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {
    private final SysUserRoleService sysUserRoleService;
    private final SysMenuService sysMenuService;

    // 插入用户
    @Transactional
    @Override
    public void saveUser(SysUser sysUser) {
        int i = this.baseMapper.insert(sysUser);
        // 新增用户成功后，设置用户的角色
        if (i > 0) {
            String[] split = sysUser.getRoleId().split(",");
            if (split.length > 0) {
                List<SysUserRole> roles = new ArrayList<>();
                for (String s : split) {
                    SysUserRole userRole = new SysUserRole();
                    userRole.setUserId(sysUser.getUserId());
                    userRole.setRoleId(Long.parseLong(s));
                    roles.add(userRole);
                }
                // 保存用户角色表
                sysUserRoleService.saveBatch(roles);
            }
        }
    }

    // 编辑用户信息
    @Transactional
    @Override
    public void editUser(SysUser sysUser) {
        int i = this.baseMapper.updateById(sysUser);
        // 修改成功后，设置用户的角色
        if (i > 0) {
            String[] split = sysUser.getRoleId().split(",");
            // 删除用户原来的角色
            QueryWrapper<SysUserRole> query = new QueryWrapper<>();
            query.lambda().eq(SysUserRole::getUserId, sysUser.getUserId());
            sysUserRoleService.remove(query);
            // 重新插入
            if (split.length > 0) {
                List<SysUserRole> roles = new ArrayList<>();
                for (String s : split) {
                    SysUserRole userRole = new SysUserRole();
                    userRole.setUserId(sysUser.getUserId());
                    userRole.setRoleId(Long.parseLong(s));
                    roles.add(userRole);
                }
                // 保存用户角色表
                sysUserRoleService.saveBatch(roles);
            }
        }
    }

    // 删除用户
    @Transactional
    @Override
    public void deleteUser(Long userId) {
        int i = this.baseMapper.deleteById(userId);
        // 删除用户原来的角色
        if (i > 0) {
            QueryWrapper<SysUserRole> query = new QueryWrapper<>();
            query.lambda().eq(SysUserRole::getUserId, userId);
            sysUserRoleService.remove(query);
        }
    }

    @Override
    public AssignTreeVo getAssignTree(AssignTreeParm parm){
        //查询用户的信息
        SysUser user = this.baseMapper.selectById(parm.getUserId());
        List<SysMenu> menuList;
        //判断是否是超级管理员
        if(StringUtils.isNotEmpty(user.getIsAdmin()) && "1".equals(user.getIsAdmin())){
            //是超级管理员，查询所有的菜单
            menuList = sysMenuService.list();
        } else {
            menuList = sysMenuService.getMenuByUserId(parm.getUserId());
        }
        //查询角色原来的菜单
        List<SysMenu> roleList = sysMenuService.getMenuByRoleId(parm.getRoleId());
        List<Long> ids = new ArrayList<>();
        Optional.ofNullable(roleList).orElse(new ArrayList<>())
                .stream()
                .filter(Objects::nonNull)
                .forEach(item -> {
                    ids.add(item.getMenuId());
                });
        //组装返回数据
        AssignTreeVo vo = new AssignTreeVo();
        vo.setCheckList(ids.toArray());
        vo.setMenuList(menuList);
        return vo;
    }
}