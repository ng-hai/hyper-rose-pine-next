const PaletteNames = {
  Dark: "dark",
  Moon: "moon",
  Dawn: "dawn",
}

// https://github.com/rose-pine/palette/blob/main/source/index.ts
const PaletteColors = {
  [PaletteNames.Dark]: {
    base: '#191724',
    surface: '#1f1d2e',
    overlay: '#26233a',
    inactive: '#555169',
    subtle: '#6e6a86',
    text: '#e0def4',
    love: '#eb6f92',
    gold: '#f6c177',
    rose: '#ebbcba',
    pine: '#31748f',
    foam: '#9ccfd8',
    iris: '#c4a7e7',
    highlight: '#2a2837',
    highlightInactive: '#211f2d',
    highlightOverlay: '#3a384a',
  },
  [PaletteNames.Moon]: {
    base: '#232136',
    surface: '#2a273f',
    overlay: '#393552',
    inactive: '#59546d',
    subtle: '#817c9c',
    text: '#e0def4',
    love: '#eb6f92',
    gold: '#f6c177',
    rose: '#ea9a97',
    pine: '#3e8fb0',
    foam: '#9ccfd8',
    iris: '#c4a7e7',
    highlight: '#312f44',
    highlightInactive: '#2a283d',
    highlightOverlay: '#3f3c53',
  },
  [PaletteNames.Dawn]: {
    base: '#faf4ed',
    surface: '#fffaf3',
    overlay: '#f2e9de',
    inactive: '#9893a5',
    subtle: '#6e6a86',
    text: '#575279',
    love: '#b4637a',
    gold: '#ea9d34',
    rose: '#d7827e',
    pine: '#286983',
    foam: '#56949f',
    iris: '#907aa9',
    highlight: '#eee9e6',
    highlightInactive: '#f2ede9',
    highlightOverlay: '#e4dfde',
  },
}

const defaultConfig = {
  palette: PaletteNames.Dark,
  appearance: {
    dark: PaletteNames.Dark,
    light: PaletteNames.Dawn,
  },
  hideControls: false,
  hideNotifications: false,
  hideTabTitle: true,
  hideTabIcons: false,
}

const transformPaletteToConfig = (palette = RosePine.dark, hyperRosePine) => {
  return {
    // https://github.com/rose-pine/rose-pine-theme/blob/main/palette.md#terminals
    foregroundColor: palette.text,
    backgroundColor: palette.base,
    selectionColor: palette.highlight,
    cursorColor: palette.inactive,
    cursorAccentColor: palette.text,
    colors: {
      black: palette.overlay,
      lightBlack: palette.subtle,
      red: palette.love,
      lightRed: palette.love,
      green: palette.pine,
      lightGreen: palette.pine,
      yellow: palette.gold,
      lightYellow: palette.gold,
      blue: palette.foam,
      lightBlue: palette.foam,
      magenta: palette.iris,
      lightMagenta: palette.iris,
      cyan: palette.rose,
      lightCyan: palette.rose,
      white: palette.text,
      lightWhite: palette.text,
    },
    css: `
      .hyper_main {
        border: 0;
        background: ${palette.base};
      }

      .header_header {
        top: 0;
        left: 0;
        right: 0;
      }

      .tabs_list {
        background: ${palette.overlay};
        margin-left: 0;
        padding-left: ${hyperRosePine.hideControls ? "0" : "76px"};
        max-height: 38px;
      }

      .tab_text {
        height: 38px;
        display: flex;
        align-items: center;
      }

      .tab_textInner {
        position: initial;
        width: 100%;
      }

      .tabs_nav {
        color: ${palette.text};
        height: 38px;
      }

      .tab_tab, .tab_icon {
        color: ${palette.inactive};
      }

      .tab_icon {
        right: 8px;
        top: 11px;
        width: 16px;
        height: 16px;
      }

      .tab_shape {
        width: 8px;
        height: 8px;
      }

      .tab_tab, .tabs_borderShim {
        border-color: transparent !important;
      }

      .tab_tab.tab_active {
        background: ${palette.base};
      }

      .tab_active .tab_text, .tab_active .tab_icon {
        color: ${palette.text};
      }

      .xterm-viewport::-webkit-scrollbar-thumb {
        background: ${palette.highlightOverlay} !important;
      }

      .xterm-viewport::-webkit-scrollbar-thumb:window-inactive {
        background: ${palette.highlightOverlay} !important;
      }

      .splitpane_divider {
        background-color: ${palette.overlay} !important;
      }

      .rose-pine-title {
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${palette.text};
        height: 38px;
      }

      .rose-pine-title > svg {
        width: 14px;
        margin-right: 8px;
        display: ${hyperRosePine.hideTabIcons ? "none" : "block"};
      }

      .tabs_title .rose-pine-title > span {
        display: ${hyperRosePine.hideTabTitle ? "none" : "block"};
      }

      @keyframes fade-out {
        0% {
          opacity: 1;
          transform:translate(0);
        }
        90% {
          opacity: 0;
          transform:translate(0);
        }
        100% {
          opacity: 0;
          transform:translate(9999px);
        }
      }

      .notifications_view {
        animation: ${hyperRosePine.hideNotifications
        ? "fade-out 10s ease-out both"
        : "none"
      };
      }
    `,
  }
}

exports.decorateConfig = (config) => {
  const hyperRosePine = {
    ...defaultConfig,
    ...config.hyperRosePine,
    appearance: {
      ...defaultConfig.appearance,
      ...(config.hyperRosePine ? config.hyperRosePine.appearance : {}),
    },
  }

  if (hyperRosePine.hideControls === true) {
    exports.decorateBrowserOptions = (defaultOptions) => {
      return {
        ...defaultOptions,
        frame: false,
        transparent: true,
        titleBarStyle: "",
      }
    }
  }

  let palette = PaletteColors[PaletteNames.Dark]
  const selectedPalette = hyperRosePine.palette

  if (Object.values(PaletteNames).includes(selectedPalette)) {
    palette = PaletteColors[selectedPalette]
  }

  return { ...config, ...transformPaletteToConfig(palette, hyperRosePine) }
}

const generateTabIcon = (React, { palette, title }) => {
  return React.createElement("div", {
    className: "rose-pine-title",
    children: [
      React.createElement("svg", {
        key: "icon",
        viewBox: "0 0 198 187",
        children: [
          React.createElement("path", {
            key: "pine-0.5",
            fill: palette.pine,
            fillOpacity: "0.5",
            d: "M98.983 151.358C94.184 139.832 84.279 130.579 71.287 127.098L14.941 112C7.79401 138.673 23.623 166.09 50.296 173.237L90.543 184.021C93.382 184.782 96.27 183.981 98.298 182.146C100.3 184.672 103.68 185.909 106.99 185.021L147.237 174.237C173.911 167.09 189.74 139.673 182.593 113L126.247 128.098C113.632 131.478 103.928 140.298 98.983 151.358Z",
          }),
          React.createElement("path", {
            key: "pine",
            fill: palette.pine,
            d: "M99 177.001C94.368 154.178 74.19 137 50 137H0C0 164.614 22.386 187 50 187H98H100H148C175.614 187 198 164.614 198 137H148C123.81 137 103.632 154.178 99 177.001Z",
          }),
          React.createElement("path", {
            key: "rose",
            fill: palette.rose,
            d: "M95.918 0C105.118 5.312 111.991 13.106 116.181 22.048C128.154 12.575 144.298 8.68599 160.178 12.941L147.237 61.237C142.474 79.013 128.709 91.973 112.16 96.525L112.178 96.593C107.805 97.765 103.411 98.319 99.09 98.309C94.768 98.319 90.374 97.765 86 96.593L86.018 96.525C69.47 91.973 55.704 79.013 50.941 61.237L38 12.941C54.262 8.58399 70.801 12.766 82.853 22.74C83.217 22.036 83.599 21.336 84 20.642L95.918 0Z",
          }),
        ],
      }),
      React.createElement("span", {
        children: title,
        key: "text",
      }),
    ],
  })
}

const useAppearance = (window) => {
  let appearance = {
    isDarkMode: true,
    light: PaletteNames.Dawn,
    dark: PaletteNames.Dark,
  }

  if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches

    const config = window.config.getConfig()
    const hyperRosePine = {
      ...defaultConfig,
      ...config.hyperRosePine,
      appearance: {
        ...defaultConfig.appearance,
        ...(config.hyperRosePine ? config.hyperRosePine.appearance : {}),
      },
    }

    appearance = {
      isDarkMode,
      ...hyperRosePine.appearance,
    }
  }

  return appearance
}

exports.reduceUI = (state, action) => {
  if (
    action.type === "ROSE_PINE_THEME_CHANGE" ||
    action.type === "CONFIG_RELOAD"
  ) {
    const { config } = action

    const hyperRosePine = {
      ...defaultConfig,
      ...config.hyperRosePine,
      appearance: {
        ...defaultConfig.appearance,
        ...(config.hyperRosePine ? config.hyperRosePine.appearance : {}),
      },
    }

    const isDarkMode =
      action.type === "CONFIG_RELOAD" ? state.isDarkMode : action.isDarkMode

    const palette = Boolean(isDarkMode)
      ? PaletteColors[hyperRosePine.appearance.dark]
      : PaletteColors[hyperRosePine.appearance.light]

    const theme = transformPaletteToConfig(palette, hyperRosePine)

    return state
      .set("backgroundColor", theme.backgroundColor)
      .set("foregroundColor", theme.foregroundColor)
      .set("cursorColor", theme.cursorColor)
      .set("selectionColor", theme.selectionColor)
      .set("borderColor", theme.borderColor)
      .set("colors", theme.colors)
      .set("css", theme.css)
      .set("isDarkMode", isDarkMode)
  }
  return state
}

exports.decorateHyper = (Hyper, { React }) => {
  return class extends React.Component {
    componentDidMount () {
      if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
        const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)")

        window.store.dispatch({
          type: "ROSE_PINE_THEME_CHANGE",
          config: window.config.getConfig(),
          isDarkMode: darkModeQuery.matches,
        })

        darkModeQuery.addEventListener("change", (event) => {
          window.store.dispatch({
            type: "ROSE_PINE_THEME_CHANGE",
            config: window.config.getConfig(),
            isDarkMode: event.matches,
          })
        })
      }
    }

    render () {
      return React.createElement(Hyper, this.props)
    }
  }
}

exports.decorateTabs = (Tabs, { React }) => {
  return class extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        palette: PaletteColors[PaletteNames.Dark],
      }
    }

    componentDidMount () {
      const { isDarkMode, light, dark } = useAppearance(window)
      this.setState({
        palette: isDarkMode ? PaletteColors[dark] : PaletteColors[light],
      })
    }

    render () {
      let newProps = { ...this.props }

      const { tabs } = this.props

      if (tabs.length === 1 && this.state.palette !== undefined) {
        newProps = {
          ...this.props,
          tabs: [
            {
              ...tabs[0],
              title: generateTabIcon(React, {
                palette: this.state.palette,
                title: tabs[0].title,
              }),
            },
          ],
        }
      }

      return React.createElement(Tabs, newProps)
    }
  }
}

exports.decorateTab = (Tab, { React }) => {
  return class extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        palette: PaletteColors[PaletteNames.Dark],
      }
    }

    componentDidMount () {
      const { isDarkMode, light, dark } = useAppearance(window)
      this.setState({
        palette: isDarkMode ? PaletteColors[dark] : PaletteColors[light],
      })
    }

    render () {
      if (this.state.palette === undefined) {
        return React.createElement(Tab, this.props)
      }

      return React.createElement(Tab, {
        ...this.props,
        text: generateTabIcon(React, {
          palette: this.state.palette,
          title: this.props.text,
        }),
      })
    }
  }
}
