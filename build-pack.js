const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 辅助函数：递归复制文件夹
function copyFolderSync(from, to) {
    if (!fs.existsSync(from)) return;
    if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
    
    fs.readdirSync(from).forEach(element => {
        const stat = fs.lstatSync(path.join(from, element));
        if (stat.isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else if (stat.isDirectory()) {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

console.log('🚀 [1/4] 开始构建项目 (npm run build)...');

try {
    // 1. 执行构建命令
    execSync('npm run build', { stdio: 'inherit' });

    // 2. 准备输出目录
    const deployDir = path.join(__dirname, 'deploy-package');
    console.log(`📦 [2/4] 清理并创建输出目录: ${deployDir}`);
    
    if (fs.existsSync(deployDir)) {
        fs.rmSync(deployDir, { recursive: true, force: true });
    }
    fs.mkdirSync(deployDir);

    // 3. 复制核心运行文件 (standalone)
    console.log('📂 [3/4] 复制核心文件...');
    const standaloneDir = path.join(__dirname, '.next', 'standalone');
    
    if (!fs.existsSync(standaloneDir)) {
        throw new Error('找不到 .next/standalone 目录！请检查 next.config.mjs 中是否配置了 output: "standalone"');
    }
    copyFolderSync(standaloneDir, deployDir);

    // 4. 补全缺失的静态资源
    console.log('✨ [4/4] 补全静态资源和数据...');

    // 4.1 复制 public (图片等)
    copyFolderSync(path.join(__dirname, 'public'), path.join(deployDir, 'public'));

    // 4.2 复制 .next/static (CSS/JS) -> 放到 .next/static
    const targetStaticDir = path.join(deployDir, '.next', 'static');
    copyFolderSync(path.join(__dirname, '.next', 'static'), targetStaticDir);

    // 4.3 复制 src/content (文章数据) -> 放到 src/content
    // 注意：standalone 内部结构可能没有 src，需要手动创建
    const targetSrcDir = path.join(deployDir, 'src');
    if (!fs.existsSync(targetSrcDir)) fs.mkdirSync(targetSrcDir);
    
    copyFolderSync(path.join(__dirname, 'src', 'content'), path.join(targetSrcDir, 'content'));
    copyFolderSync(path.join(__dirname, 'src', 'data'), path.join(targetSrcDir, 'data'));

    console.log(`
✅ ========================================
🎉 打包成功！
📁 生成目录: ./deploy-package
👉 请将 [ deploy-package ] 文件夹内的【所有内容】上传到服务器网站根目录。
🚀 启动命令: node server.js
==========================================
    `);

} catch (error) {
    console.error('❌ 打包失败:', error.message);
    process.exit(1);
}