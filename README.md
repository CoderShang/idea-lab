# Idea Lab

> 一个轻量、纯静态的个人开源实验仓库，把日常脑洞落地成开箱即用的页面。

## 项目介绍

Idea Lab 是我的个人开源实验仓库，用来存放日常脑洞、实用小工具、知识百科、查询手册等纯静态 HTML 页面。

所有项目轻量化、无框架、开箱即用，支持 GitHub Pages 直接在线访问。

适合场景：

- 各类轻量在线工具
- 技术 / 生活百科知识库
- 个人灵感落地小项目
- 随手实现的极简 Demo

## 仓库特点

- **纯静态页面**：HTML / CSS / JS，零依赖，可直接双击本地打开
- **轻量化**：简洁实现，不冗余，不堆砌复杂框架
- **可公开查阅**：所有内容开源可浏览、可参考、可复用
- **持续更新**：持续新增工具、百科文档、创意 Demo

## 项目清单

| 项目 | 简介 |
| --- | --- |
| [囚徒健身 · 六艺十式打卡](ConvictConditioning/main.html) | 基于《囚徒健身》六艺十式体系的训练日志，包含动作要点、三级训练目标、每日打卡与长期统计，配实拍图例，数据保存在本机 |

### 囚徒健身 · 六艺十式打卡

- 覆盖六艺各十式：俯卧撑、深蹲、引体向上、举腿、桥、倒立撑，共 60 个动作
- 每一式配有原创整理的要点、常见错误与分批补齐的实拍动作图例
- 卡片内按原书展示初级 / 中级 / 升级三档训练目标（如 1×10、2×25、3×50）
- 卡片内用 `‹ ›` 切换相邻式，可设定当前阶梯、一键打卡
- 统计连续天数、累计训练天、总打卡次数，展示近一周与最近 30 天历史
- 记录仅保存在浏览器 localStorage，支持导出 / 导入 JSON 备份，不上传任何服务器

## 在线访问

开启 GitHub Pages 后，所有页面均可直接在线使用：

- 首页：https://codershang.github.io/idea-lab/
- 囚徒健身 · 六艺十式打卡：https://codershang.github.io/idea-lab/ConvictConditioning/main.html

## 本地使用

无需安装任何环境，克隆仓库后用浏览器打开任意 `.html` 文件即可：

```bash
git clone git@github.com:CoderShang/idea-lab.git
```

也可以直接下载单个 HTML 文件，双击打开使用。

## 目录结构

```text
idea-lab/
├── ConvictConditioning/
│   ├── main.html              # 囚徒健身 · 六艺十式打卡
│   └── img/                   # 动作图例（img_艺_式_序号.jpg）
├── LICENSE                    # Apache License 2.0
└── README.md
```

## 技术说明

- 原生 HTML / CSS / JavaScript，无第三方库、无构建步骤
- 数据存储：localStorage，同一浏览器、同一设备有效
- 清除浏览器数据会一并清空记录，建议定期使用页面内「导出备份」

## License

基于 [Apache License 2.0](./LICENSE) 开源。
