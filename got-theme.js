// DeepSeek Harness — Game of Thrones "Iron & Gold" Theme
// =====================================================
// 一个纯客户端（Client-only）的动态 Cordis 插件，把 DeepSeek Harness 界面
// 换成《权力的游戏》铁金风格：铁灰近黑基底、古老金强调色、羊皮纸文字，
// 右侧竖排 "GAME OF THRONES"、右下角坦格利安三头龙徽章、四角铁艺纹饰。
//
// 使用方式见 README.md。此文件即插件的 `code.client` 函数体：
//   返回一个 { apply(ctx) {...} } 的 Cordis Plugin。

return {
  apply(ctx) {
    // 1) 铁金配色：在活动主题之上叠加令牌层（light/dark 双值）
    const theme = ctx.get('theme')
    if (theme !== undefined) {
      ctx.effect(() => theme.overrideTokens('game-of-thrones', {
        '--dsw-alias-bg-base': { light: '#e9e2d2', dark: '#0b0c0f' },
        '--dsw-alias-bg-layer-1': { light: '#f2edde', dark: '#141519' },
        '--dsw-alias-bg-layer-2': { light: '#f8f4e8', dark: '#1b1d23' },
        '--dsw-alias-bg-overlay': { light: '#ede6d3', dark: '#111217' },
        '--dsw-alias-border-l1': { light: '#d6cdb8', dark: '#262830' },
        '--dsw-alias-border-l2': { light: '#b3a684', dark: '#44423a' },
        '--dsw-alias-brand-primary': { light: '#8a6b14', dark: '#c9a227' },
        '--dsw-alias-label-primary': { light: '#2b2418', dark: '#e7e1d3' },
        '--dsw-alias-label-secondary': { light: '#6b6252', dark: '#9d9483' },
        '--dsw-alias-state-error-primary': { light: '#a32626', dark: '#c03939' },
        '--dsw-alias-state-success-primary': { light: '#3f6b46', dark: '#63995f' },
        '--dsw-alias-state-warn-primary': { light: '#9a5b16', dark: '#d1782f' },
        '--dsw-specific-sidebar-fill': { light: '#ded6c0', dark: '#0f1014' }
      }))
    }

    // 2) 全屏点击穿透装饰层（shell.overlay，不遮挡任何操作）
    const slots = ctx.get('slots')
    if (slots !== undefined) {
      slots.inject('shell.overlay', () => slots.register(
        { name: 'shell.overlay', id: 'got-frame' },
        () => React.createElement(
          'div',
          { className: 'dsh-got-frame', 'aria-hidden': true },
          React.createElement('div', { className: 'dsh-got-vignette' }),
          React.createElement('div', { className: 'dsh-got-corner dsh-got-corner--tl' }),
          React.createElement('div', { className: 'dsh-got-corner dsh-got-corner--tr' }),
          React.createElement('div', { className: 'dsh-got-corner dsh-got-corner--bl' }),
          React.createElement('div', { className: 'dsh-got-corner dsh-got-corner--br' }),
          React.createElement('div', { className: 'dsh-got-crest' },
            React.createElement('span', { className: 'dsh-got-crest-diamond' })
          ),
          React.createElement('div', { className: 'dsh-got-seal' },
            React.createElement('span', { className: 'dsh-got-seal-line' }),
            React.createElement('span', { className: 'dsh-got-seal-text' }, 'WINTER IS COMING'),
            React.createElement('span', { className: 'dsh-got-seal-line' })
          ),
          React.createElement('div', { className: 'dsh-got-title' },
            ['G','A','M','E', null,'O','F', null,'T','H','R','O','N','E','S'].map(function (ch, i) {
              if (ch === null) {
                return React.createElement('span', { key: i, className: 'dsh-got-title-space' })
              }
              return React.createElement('span', { key: i, className: 'dsh-got-title-letter' }, ch)
            })
          ),
          React.createElement('div', { className: 'dsh-got-sigil' })
        )
      ))
    }

    // 3) 包级样式表（徽章走 Wikimedia 远程直链，浏览器原生加载，零 Host 依赖）
    styles.insert(`
      .dsh-got-frame { position: fixed; inset: 0; pointer-events: none; }
      .dsh-got-vignette { position: absolute; inset: 0; background: radial-gradient(ellipse 120% 92% at 50% 40%, rgba(0,0,0,0) 58%, rgba(6,6,9,0.42) 100%); }
      @media (prefers-color-scheme: light) { .dsh-got-vignette { background: radial-gradient(ellipse 120% 92% at 50% 40%, rgba(0,0,0,0) 58%, rgba(43,36,24,0.2) 100%); } }
      .dsh-got-corner { position: absolute; width: 68px; height: 68px; border: 2px solid var(--dsw-alias-brand-primary, #c9a227); opacity: 0.55; }
      .dsh-got-corner--tl { top: 12px; left: 12px; border-right: none; border-bottom: none; }
      .dsh-got-corner--tr { top: 12px; right: 12px; border-left: none; border-bottom: none; }
      .dsh-got-corner--bl { bottom: 12px; left: 12px; border-right: none; border-top: none; }
      .dsh-got-corner--br { bottom: 12px; right: 12px; border-left: none; border-top: none; }
      .dsh-got-corner::after { content: ''; position: absolute; width: 40px; height: 40px; border: 1px solid var(--dsw-alias-brand-primary, #c9a227); opacity: 0.7; }
      .dsh-got-corner--tl::after { top: 7px; left: 7px; border-right: none; border-bottom: none; }
      .dsh-got-corner--tr::after { top: 7px; right: 7px; border-left: none; border-bottom: none; }
      .dsh-got-corner--bl::after { bottom: 7px; left: 7px; border-right: none; border-top: none; }
      .dsh-got-corner--br::after { bottom: 7px; right: 7px; border-left: none; border-top: none; }
      .dsh-got-crest { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; justify-content: center; width: 190px; opacity: 0.5; }
      .dsh-got-crest::before, .dsh-got-crest::after { content: ''; height: 1px; width: 70px; }
      .dsh-got-crest::before { background: linear-gradient(90deg, rgba(201,162,39,0), var(--dsw-alias-brand-primary, #c9a227)); }
      .dsh-got-crest::after { background: linear-gradient(90deg, var(--dsw-alias-brand-primary, #c9a227), rgba(201,162,39,0)); }
      .dsh-got-crest-diamond { width: 8px; height: 8px; margin: 0 12px; border: 1px solid var(--dsw-alias-brand-primary, #c9a227); transform: rotate(45deg); }
      .dsh-got-seal { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 10px; color: var(--dsw-alias-label-secondary, #9d9483); opacity: 0.55; user-select: none; }
      .dsh-got-seal-text { font-family: Georgia, 'Times New Roman', serif; font-size: 11px; letter-spacing: 0.4em; text-indent: 0.4em; text-transform: uppercase; white-space: nowrap; }
      .dsh-got-seal-line { width: 44px; height: 1px; background: currentColor; opacity: 0.8; }
      .dsh-got-title { position: absolute; top: 50%; right: 14px; transform: translateY(-50%); display: flex; flex-direction: column; align-items: center; gap: 2px; color: var(--dsw-alias-brand-primary, #c9a227); opacity: 0.55; user-select: none; }
      .dsh-got-title-letter { font-family: Georgia, 'Times New Roman', serif; font-weight: 700; font-size: 15px; line-height: 1.15; letter-spacing: 0.02em; text-shadow: 0 1px 1px rgba(0,0,0,0.6), 0 0 8px rgba(201,162,39,0.35); }
      .dsh-got-title-space { height: 14px; }
      .dsh-got-sigil {
        position: absolute;
        bottom: 16px;
        right: 16px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid var(--dsw-alias-brand-primary, #c9a227);
        box-shadow: 0 0 8px rgba(201, 162, 39, 0.45), inset 0 0 8px rgba(0,0,0,0.55);
        background-color: #0b0c0f;
        background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/House_Targaryen.png/330px-House_Targaryen.png');
        background-size: cover;
        background-position: center;
        opacity: 0.92;
      }
      :where(body) { font-family: Georgia, 'Times New Roman', 'Noto Serif CJK SC', 'Songti SC', 'SimSun', serif; }
      ::selection { background: rgba(201, 162, 39, 0.4); color: inherit; }
    `)
  }
}
